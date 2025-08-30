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
  type? : string;
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