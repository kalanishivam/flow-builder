"use client"
import { FlowNodeContextType } from "@/types";
import { Node, useNodesState } from "@xyflow/react";
import { createContext, useCallback, useContext, } from "react";
import cuid from "cuid";  


const FlowNodeContext = createContext<FlowNodeContextType | null>(null); // creating a context of the nodes so that they can be created within the app 

export const FlowNodeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initialNodes: Node[] = [];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);


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

    return (
        <FlowNodeContext.Provider value={{ nodes, setNodes, onNodesChange, addNode, removeNode }}>
            {children}
        </FlowNodeContext.Provider>
    )

}

export const useFlowNodeContext = () => {
    const context = useContext(FlowNodeContext);
    if (!context) {
        throw new Error("useFlowNodeContext must be used within a FlowNodeContextProvider");
    }
    return context;
}