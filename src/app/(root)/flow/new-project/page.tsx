"use client"
import React from 'react'
import { ReactFlow,  MiniMap, Controls, Background,NodeResizer   } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowContext } from '@/context/FlowContext';
import { nodeTypes } from '@/lib/nodeTypes';


// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, type: 'sendMessage', data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, type: 'recipient', data: { label: 'Node 2' } },
// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const NewProject = () => {
 
  const {nodes, onNodesChange ,edges , onEdgesChange , onConnect ,isValidConnection} = useFlowContext();

  
  return (
    <div className='w-full h-[90vh]'>
       {/* <ReactFlowProvider> */}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        fitView
      >
        <MiniMap />
        <Controls />
        <NodeResizer />
        <Background />
      </ReactFlow>
      {/* </ReactFlowProvider> */}
    </div>
  )
}

export default NewProject