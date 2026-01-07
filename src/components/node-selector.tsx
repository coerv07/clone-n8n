'use client';

import { NodeType } from '@/generated/prisma';
import { createId } from '@paralleldrive/cuid2';
import { useReactFlow } from '@xyflow/react';
import { GlobeIcon, MousePointerIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { set } from 'zod';
import { se } from 'date-fns/locale';

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: 'Manual Trigger',
    description: 'Runs the flow on clicking a button. Good for getting',
    icon: MousePointerIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: 'HTTP REQUEST',
    description: 'Make an HTTP request',
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export function NodeSelector({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      setNodes((nodes) => {
        // regra especial só para MANUAL_TRIGGER
        if (selection.type === NodeType.MANUAL_TRIGGER) {
          const hasManualTrigger = nodes.some(
            (node) => node.type === NodeType.MANUAL_TRIGGER,
          );

          if (hasManualTrigger) {
            toast.error('Only one manual trigger is allowed per workflow');
            return nodes;
          }
        }

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          type: selection.type, // 👈 AGORA FUNCIONA PRA TODOS
          position: flowPosition,
          data: {}, // depois você personaliza por tipo
        };

        return [...nodes, newNode];
      });

      onOpenChange(false);
    },
    [setNodes, screenToFlowPosition, onOpenChange],
  );

  const renderNode = (nodeType: NodeTypeOption) => {
    const Icon = nodeType.icon;
    return (
      <div
        key={nodeType.type}
        className="w-full flex items-center gap-4 py-4 px-4 rounded-md cursor-pointer border-l-2 border-transparent hover:border-l-primary hover:bg-gray-50 transition-colors"
        onClick={() => {
          handleNodeSelect(nodeType);
        }}
      >
        {typeof Icon === 'string' ? (
          <img
            src={Icon}
            alt={nodeType.label}
            className="h-5 w-5 object-contain rounded-sm"
          />
        ) : (
          <Icon className="h-5 w-5" />
        )}
        <div className="flex flex-col text-left">
          <span className="font-medium text-sm">{nodeType.label}</span>
          <span className="text-xs text-muted-foreground">
            {nodeType.description}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Select Node Type</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts your workflow
          </SheetDescription>
        </SheetHeader>

        {/* Triggers */}
        <div className="mt-4">
          <div className="font-semibold text-sm px-4 mb-2">Triggers</div>
          {triggerNodes.map(renderNode)}
        </div>

        <Separator className="my-4" />

        {/* Execution Nodes */}
        <div>
          <div className="font-semibold text-sm px-4 mb-2">Actions</div>
          {executionNodes.map(renderNode)}
        </div>
      </SheetContent>
    </Sheet>
  );
}
