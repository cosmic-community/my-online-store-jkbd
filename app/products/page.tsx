import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Products | My Online Store',
  description: 'Browse our full collection of quality products.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Shop</p>
        <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-500">
          {products.length} {products.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      {/* Category quick-links */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              {cat.metadata?.name || cat.title}
            </a>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No products yet</h3>
          <p className="text-gray-500">Add products in your Cosmic dashboard to see them here.</p>
        </div>
      )}
    </div>
  );
}