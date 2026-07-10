import { Badge } from '@/components/ui/badge';
import { STATUS, STATUS_LABEL } from '@/lib/progress';

const STATUS_VARIANT = {
  [STATUS.NOT_STARTED]: 'default',
  [STATUS.IN_PROGRESS]: 'amber',
  [STATUS.COMPLETED]: 'forest',
  [STATUS.BLOCKED]: 'rose',
};

export function StatusBadge({ status, className }) {
  return (
    <Badge variant={STATUS_VARIANT[status] || 'default'} className={className}>
      {STATUS_LABEL[status] || status}
    </Badge>
  );
}

const ACTIVITY_VARIANT = {
  Training: 'default',
  Test: 'amber',
  Project: 'forest',
};

export function ActivityBadge({ type, className }) {
  return (
    <Badge variant={ACTIVITY_VARIANT[type] || 'default'} className={className}>
      {type}
    </Badge>
  );
}
