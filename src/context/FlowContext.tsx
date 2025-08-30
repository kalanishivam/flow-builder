"use client"
import { FlowContextType } from "@/types";
import { addEdge, Connection, type Edge, EdgeChange, type Node, useEdgesState, useNodesState } from "@xyflow/react";
import { createContext, useCallback, useContext, } from "react";
import cuid from "cuid";


const FlowContext = createContext<FlowContextType | null>(null); // creating a context of the nodes so that they can be created within the app 

export const FlowContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges , onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [setEdges],
    );

    const addNode = useCallback((type: string) => {
        setNodes((prevNodes: Node[]) => {
            const yPos = prevNodes.length === 0 ? 50 : 50 + 50 * prevNodes.length;
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
        <FlowContext.Provider value={{ nodes, setNodes, onNodesChange, addNode, removeNode, updateNodeData , edges , setEdges , onEdgesChange , onConnect }}>
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