"use server";
import { EdgeBE, NodeBE } from "@/types";
import { auth } from "@clerk/nextjs/server";
import db, { Prisma } from "@/db";
import { sendEmail } from "@/services/resend";

export const createWorkFlow = async (
  nodes: NodeBE[],
  edges: EdgeBE[],
  flowName: string
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "You are not logged in" };
    }
    console.log(userId);
    const userDetails = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!userDetails) {
      return { success: false, message: "Error, No user found!" };
    }

    const createTrx = await db.$transaction(async (tx) => {
      const wrkFlw = await tx.workflow.create({
        data: {
          name: flowName,
          userId: userDetails.id,
        },
        select: {
          id: true,
        },
      });
      await tx.node.createMany({
        data: nodes.map((nda) => ({
          nodeId: nda.id,
          type: nda.type ?? "",
          positionX: nda.position?.x ?? -1,
          positionY: nda.position?.y ?? -1,
          data: (nda.data ?? {}) as Prisma.InputJsonValue,
          measuredHeight: nda.measured?.height ?? -1,
          measuredWidth: nda.measured?.width ?? -1,
          workflowId: wrkFlw.id,
        })),
      });
      const createdNodeIds = await tx.node.findMany({
        where: {
          workflowId: wrkFlw.id,
          nodeId: {
            in: nodes.map((nda) => nda.id),
          },
        },
        select: {
          id: true,
          nodeId: true,
        },
      });
      const nodeIdMap = new Map<string, string>();
      for (let i = 0; i < createdNodeIds.length; i++) {
        nodeIdMap.set(createdNodeIds[i].nodeId, createdNodeIds[i].id);
      }

      await tx.edge.createMany({
        data: edges.map((edg) => ({
          edgeId: edg.id,
          workflowId: wrkFlw.id,
          sourceNodeId: nodeIdMap.get(edg.source)!,
          targetNodeId: nodeIdMap.get(edg.target)!,
        })),
      });
      return wrkFlw;
    });
    setImmediate(async () => {
      const orderOFExecution = getExecutionOrder(nodes, edges);
      console.log(orderOFExecution);
      let text = "";
      const emailsArr: string[] = [];
      for (let i = 0; i < orderOFExecution.length; i++) {
        if (orderOFExecution[i].type == "sendMessage") {
          text += orderOFExecution[i]?.data?.textVal as string;
        } else if (orderOFExecution[i].type == "recipient") {
          emailsArr.push(orderOFExecution[i]?.data?.textVal as string);
        }
      }
      await sendEmail(emailsArr, text);
    });
    return {
      success: true,
      message: "Workflow created successfully",
      data: createTrx,
    };
  } catch (error) {
    return { success: false, message: "Error creating workflow" };
  }
};

function getExecutionOrder(nodes: NodeBE[], edges: EdgeBE[]): NodeBE[] {
  // finds the correct execution order of the nodes in the workflow
  try {
    const graph = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    nodes.forEach((node) => {
      graph.set(node.id, []);
      inDegree.set(node.id, 0);
    });

    edges.forEach(({ source, target }) => {
      graph.get(source)!.push(target);
      inDegree.set(target, (inDegree.get(target) || 0) + 1);
    });

    const queue: string[] = [];
    const result: NodeBE[] = [];

    for (const [nodeId, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(nodeId);
    }

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentNode = nodes.find((n) => n.id === currentId)!;
      result.push(currentNode);

      for (const childId of graph.get(currentId)!) {
        inDegree.set(childId, inDegree.get(childId)! - 1);
        if (inDegree.get(childId) === 0) queue.push(childId);
      }
    }

    if (result.length !== nodes.length) {
      throw new Error(
        "Cycle detected in workflow! Cannot determine execution order."
      );
    }

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
