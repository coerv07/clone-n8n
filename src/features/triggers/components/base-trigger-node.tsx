'use client';

import { memo, type ReactNode } from 'react';
import { type NodeProps, Position, useReactFlow } from '@xyflow/react';
import { LucideIcon } from 'lucide-react';
import { WorkflowNode } from '@/components/workflow-node';
import { BaseNode, BaseNodeContent } from '@/components/react-flow/base-node';
import { BaseHandle } from '@/components/react-flow/base-handle';
import {
  type NodeStatus,
  NodeStatusIndicator,
} from '@/components/react-flow/node-status-indicator';

interface BaseTriggerNodeProps extends NodeProps {
  icon?: LucideIcon | string | null;
  name: string;
  description: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    status = 'initial',
    onSettings,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((currentNodes) => {
        const updateNodes = currentNodes.filter((node) => node.id !== id);
        return updateNodes;
      });
      console.log('Deleting node id:', id);

      setEdges((currentEdges) => {
        const updateEdges = currentEdges.filter(
          (edge) => edge.source !== id && edge.target !== id,
        );
        return updateEdges;
      });
    };

    return (
      <WorkflowNode
        name={name}
        onDelete={handleDelete}
        description={description}
        onSettings={onSettings}
      >
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l-2xl"
        >
          <BaseNode
            status={status}
            onDoubleClick={onDoubleClick}
            className="rounded-l-2xl relative group"
          >
            <BaseNodeContent
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {Icon &&
                (typeof Icon === 'string' ? (
                  <img src={Icon} alt={name} width={16} height={16} />
                ) : (
                  <Icon className="size-4 text-muted-foreground" />
                ))}

              {children}
              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Right}
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  },
);

BaseTriggerNode.displayName = 'BaseTriggerNode';
