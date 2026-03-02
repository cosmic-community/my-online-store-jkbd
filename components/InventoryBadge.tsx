import { getMetafieldValue } from '@/lib/cosmic';

interface InventoryBadgeProps {
  status: unknown;
}

export default function InventoryBadge({ status }: InventoryBadgeProps) {
  const statusText = getMetafieldValue(status);

  if (!statusText) return null;

  const normalizedStatus = statusText.toLowerCase();

  let colorClasses = 'bg-gray-100 text-gray-700';

  if (normalizedStatus.includes('in stock')) {
    colorClasses = 'bg-green-100 text-green-800';
  } else if (normalizedStatus.includes('out of stock')) {
    colorClasses = 'bg-red-100 text-red-800';
  } else if (normalizedStatus.includes('low stock')) {
    colorClasses = 'bg-amber-100 text-amber-800';
  } else if (normalizedStatus.includes('pre-order') || normalizedStatus.includes('preorder')) {
    colorClasses = 'bg-blue-100 text-blue-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {statusText}
    </span>
  );
}