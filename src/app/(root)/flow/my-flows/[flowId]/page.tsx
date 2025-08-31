"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useCallback, useEffect, useState } from 'react'
import {
    ReactFlow, addEdge, MiniMap, Controls, Background, useNodesState, useEdgesState, NodeResizer, Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toast } from 'sonner';
import { nodeTypes } from '@/lib/nodeTypes';
import { EdgeRecord, NodeDb } from '@/types';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';


const ViewFlow = () => {
    const [loading , setLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [setEdges],
    );
    const params = useParams();
    useEffect(() => {
        const getFlowState = async () => {
            try {
                const flowState = await fetch("/api/flows/" + params.flowId, { method: "GET" });
                const flowData = await flowState.json();
                const nodesData = flowData?.nodes.map((n: NodeDb) => ({
                    data: n.data,
                    id: n.nodeId,
                    type: n.type ?? undefined,
                    position: {
                        x: n.positionX,
                        y: n.positionY,
                    },
                    draggable: true,
                    selectable: true,

                    measured: {
                        width: n.measuredWidth ?? 7,
                        height: n.measuredHeight ?? 7,
                    },
                }))

                const edgeData = flowData?.edges.map((e: EdgeRecord) => ({
                    id: e.edgeId,
                    source: e.sourceNode.nodeId,
                    target: e.targetNode.nodeId,
                }))
                console.log(nodesData);
                console.log(edgeData);
                setNodes(nodesData);
                setEdges(edgeData);
            } catch (error) {
                toast.error("Error fetching flow")
            }finally{
                setLoading(false);
            }
        }
        getFlowState();
    }, [params.flowId])
    return (
        <div className='w-full  '>
            <div className='bg-gray-200 p-4 max-md:p-2 flex justify-between items-center'>
                <h1 className="text-xl font-normal">bite<span className="font-bold">Speed</span></h1>
                <p>Current Flow</p>
                <UserButton />
            </div>
            {loading == true ? <div className='w-full h-[45vh] flex items-end justify-center'>
                <Loader2 className='animate-spin ' />
            </div> :
            <div className='w-full h-[90vh]  '>

                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}

                >
                    <Controls />
                    <NodeResizer />
                    <Background />
                    <MiniMap />
                </ReactFlow>
            </div>  }
        </div>
    )
}

export default ViewFlow