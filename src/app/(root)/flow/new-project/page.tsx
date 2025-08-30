"use client"
import React from 'react'
import { useState, useCallback } from 'react';
import {
  ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Controls, Background, useNodesState,
  useEdgesState,
  NodeProps, type Edge,
  NodeResizer, type Node, Connection,
  EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowContext } from '@/context/FlowContext';
import { nodeTypes } from '@/lib/nodeTypes';


// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, type: 'sendMessage', data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, type: 'recipient', data: { label: 'Node 2' } },
// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const NewProject = () => {
 
  const {nodes, onNodesChange ,edges , onEdgesChange , onConnect} = useFlowContext();

  
  return (
    <div className='w-full h-[90vh]'>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <NodeResizer />
        <Background />
      </ReactFlow>
    </div>
  )
}

export default NewProject