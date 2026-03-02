import Link from 'next/link';
import { getProducts, getCategories, getReviews } from '@/lib/cosmic';
import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 3);
  const latestReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <HeroBanner />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Our Products</p>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          </div>
          {products.length > 4 && (
            <Link href="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors hidden sm:inline-flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          )}
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No products available yet.</p>
        )}

        {products.length > 4 && (
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Categories */}
      {featuredCategories.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Browse By</p>
                <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
              </div>
              {categories.length > 3 && (
                <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors hidden sm:inline-flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {latestReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">What People Say</p>
              <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            </div>
            {reviews.length > 3 && (
              <Link href="/reviews" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors hidden sm:inline-flex items-center gap-1">
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}