import type { Review } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const rating = review.metadata?.rating ?? 0;
  const comment = review.metadata?.comment;
  const product = review.metadata?.product;

  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
            <span className="text-sm font-bold text-brand-700">
              {reviewerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{reviewerName}</p>
            {showProduct && product?.title && (
              <p className="text-xs text-gray-500">
                Reviewed <span className="font-medium text-brand-600">{product.title}</span>
              </p>
            )}
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      {comment && (
        <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>
      )}
    </article>
  );
}