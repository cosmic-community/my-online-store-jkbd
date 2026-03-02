import type { Metadata } from 'next';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'Read genuine customer reviews and ratings for our products.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / totalReviews).toFixed(1)
    : '0';
  const fiveStarCount = reviews.filter((r) => (r.metadata?.rating ?? 0) === 5).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Testimonials</p>
        <h1 className="text-4xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="mt-2 text-gray-500">Hear what our customers have to say.</p>
      </div>

      {/* Stats */}
      {totalReviews > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
            <p className="text-sm text-gray-500 mt-1">Total Reviews</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900">{fiveStarCount}</p>
            <p className="text-sm text-gray-500 mt-1">5-Star Reviews</p>
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No reviews yet</h3>
          <p className="text-gray-500">Customer reviews will appear here once added to your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  );
}