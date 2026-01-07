import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { BaseTriggerNode } from '../base-trigger-node';
import { MousePointerIcon } from 'lucide-react';

export const ManualTriggerNode = memo((pros: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...pros}
        icon={MousePointerIcon}
        name="Manual Trigger"
        description="Triggers the workflow manually"
        //status = {NodeStatus}
        //onSettings={handleOpenSettings}
        
      />
    </>
  );
});
