"use client"
import { FlowContextType } from "@/types";
import { addEdge, Connection, type Edge, type Node, useEdgesState, useNodesState,useReactFlow,getOutgoers,  } from "@xyflow/react";
import { createContext, useCallback, useContext,} from "react";
import cuid from "cuid";


const FlowContext = createContext<FlowContextType | null>(null); // creating a context of the nodes so that they can be created within the app 

export const FlowContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];
    const { getNodes, getEdges } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [setEdges],
    );

    const isValidConnection = useCallback(
    (connection : Connection | Edge) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node : Node) => node.id === connection.target);
      if (!target) return false;
      const hasCycle = (node : Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;
 
        visited.add(node.id);
 
        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
 
      if (target?.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges],
  );

    const addNode = useCallback((type: string) => {
        setNodes((prevNodes: Node[]) => {
            return [
                ...prevNodes,
                {
                    id: cuid(),
                    position: { x: 100, y: 50 + (50 * prevNodes.length) },
                    data: {},
                    type: type
                },
            ];
        });
    }, [setNodes]);

    const removeNode = useCallback((nodeId: string) => {
        setNodes((prevNodes: Node[]) => {
            return prevNodes.filter((prevNodes: Node) => prevNodes.id !== nodeId);
        })
    }, [setNodes])

    const updateNodeData = useCallback((nodeId: string, newData: Record<string, unknown>) => {
        setNodes((prevNodes: Node[]) =>
            prevNodes.map(node =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, ...newData } }
                    : node
            )
        );
    }, [setNodes]);

    return (
        <FlowContext.Provider value={{ nodes, setNodes, onNodesChange, addNode, removeNode, updateNodeData, edges, setEdges, onEdgesChange, onConnect , isValidConnection}}>
            {children}
        </FlowContext.Provider>
    )

}

export const useFlowContext = () => {
    const context = useContext(FlowContext);
    if (!context) {
        throw new Error("useFlowNodeContext must be used within a FlowNodeContextProvider");
    }
    return context;
}


// const wouldCreateCycle = (source: string, target: string): boolean => {
//             const visited = new Set<string>();
//             console.log(`source is ${source} and target is ${target}`);
//             const hasCycle = (current: string): boolean => {  // to detet if the flow has cycles, if it does then we will not allow the connection
//                 console.log(`in the has cycle function`)
//                 if (current === source) return true;
//                 if (visited.has(current)) return false;
//                 console.log(`the size of the visited set is ${visited.size}`);
//                 for(const ids in visited){
//                      console.log(ids);
//                 }
//                 visited.add(current);

//                 const outgoing = edges.filter(edge => edge.source === current);
//                 return outgoing.some(edge => hasCycle(edge.target));
//             };

//             return hasCycle(target);
//         };

// const onConnect = useCallback((params: Connection) => {
//         // if (params.source === params.target) return;  // to avoid self-loops

//        const wouldCreateCycle = (sourcee: string, targety: string): boolean => {
//   // Simulate adding the new edge
//   const tempEdges = [...edges, { source: sourcee, target: targety, id: 'temp' }];
//   console.log(tempEdges);
//   console.log(`these were the temp edges`)
//   // Get all unique nodes
//   const allNodes = new Set<string>();
//   tempEdges.forEach(edge => {
//     allNodes.add(edge.source);
//     allNodes.add(edge.target);
//   });
//   console.log(allNodes);
//   console.log(`there were`)
//   // Kahn's algorithm - if we can't process all nodes, there's a cycle
//   const inDegree = new Map<string, number>();
//   const adjList = new Map<string, string[]>();
  
//   // Initialize
//   allNodes.forEach(node => {
//     inDegree.set(node, 0);
//     adjList.set(node, []);
//   });
  
//   // Build graph and count in-degrees
//   tempEdges.forEach(edge => {
//     adjList.get(edge.source)!.push(edge.target);
//     inDegree.set(edge.target, inDegree.get(edge.target)! + 1);
//   });
  
//   // Process nodes with no incoming edges
//   const queue: string[] = [];
//   inDegree.forEach((degree, node) => {
//     if (degree === 0) queue.push(node);
//   });
  
//   let processed = 0;
//   while (queue.length > 0) {
//     const current = queue.shift()!;
//     processed++;
    
//     adjList.get(current)!.forEach(neighbor => {
//       const newDegree = inDegree.get(neighbor)! - 1;
//       inDegree.set(neighbor, newDegree);
      
//       if (newDegree === 0) {
//         queue.push(neighbor);
//       }
//     });
//   }
  
//   // If we couldn't process all nodes, there's a cycle
//   return processed !== allNodes.size;
// };
//         if (wouldCreateCycle(params.source, params.target)) {
//             alert("Cannot create cycle in workflow!");
//             return;
//         }
//         setEdges((eds) => addEdge(params, eds));
//     }, [setEdges]);