'use client';

import { memo, type ReactNode } from 'react';
import { type NodeProps, Position } from '@xyflow/react';
import { LucideIcon } from 'lucide-react';
import { WorkflowNode } from '@/components/workflow-node';
import { BaseNode, BaseNodeContent } from '@/components/react-flow/base-node';
import { BaseHandle } from '@/components/react-flow/base-handle';

interface BaseExecutionNodeProps extends NodeProps {
  icon?: LucideIcon | string | null;
  name: string;
  description: string;
  children?: ReactNode;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseExecutionNodeProps) => {
    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
      >
<BaseNode onDoubleClick={onDoubleClick}>
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

    <BaseHandle id="target-1" type="target" position={Position.Left} />
    <BaseHandle id="source-1" type="source" position={Position.Right} />
  </BaseNodeContent>
</BaseNode>

      </WorkflowNode>
    );
  },
);

BaseExecutionNode.displayName = 'BaseExecutionNode';
