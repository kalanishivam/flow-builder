export type FlowNodeContextType = {
  nodes: NodeType[];
  setNodes: Dispatch<SetStateAction<NodeType[]>>;
  onNodesChange: OnNodesChange<NodeType>;
  addNode: (type: string) => void;
  removeNode: (nodeId: string) => void;
};
