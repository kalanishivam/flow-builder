import { Connection, type Edge, type Node } from "@xyflow/react";

export type FlowContextType = {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange<Node>;
  addNode: (type: string) => void;
  removeNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, newData: Record<string, unknown>) => void;

  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (params: Connection) => void
  isValidConnection: (connection: Connection | Edge) => boolean
};


export interface NodeBE {
  id: string;
  position?: {
    x: number;
    y: number;
  };
  data?: Record<string, unknown>;
  type? : string | undefined;
  measured?: {
    width?: number;
    height?: number;
  };
}

export interface EdgeBE {
  id: string;
  source: string;
  target: string;
}

enum TypeOfNode {
  sendMessage = "sendMessage",
  recipient = "recipient",
}

export interface WorkFlowType {
    userId: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export export interface FlowDetails {
  nodes: {
    id: string;
    data: JsonValue;
    nodeId: string;
    type: string;
    positionX: number;
    positionY: number;
    measuredWidth: number | null;
    measuredHeight: number | null;
    workflowId: string;
  }[];
  edges: {
    // id: string;
    // createdAt: Date;
    // updatedAt: Date;
    // workflowId: string;
    edgeId: string;
    sourceNode: {
            nodeId: string;
        };
        targetNode: {
            nodeId: string;
        };
  }[];
  userId: string;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NodeDb = {
    id: string;
    data: JsonValue;
    nodeId: string;
    type: string;
    positionX: number;
    positionY: number;
    measuredWidth: number | null;
    measuredHeight: number | null;
    workflowId: string;
}
export type EdgeRecord   = {
  edgeId: string;
  sourceNode: {
            nodeId: string;
        };
        targetNode: {
            nodeId: string;
        };
}