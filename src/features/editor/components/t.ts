import { Edge, type Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 0, y: 0 },
    data: { label: 'Start' },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 200, y: 100 },
    data: { label: 'Process' },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 250, y: 150 },
    data: { label: 'Process' },
  },
];


export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'default',
  },
  {
    id: 'e2-3',
    source: '3',
    target: '2',
    type: 'default',
  },
];