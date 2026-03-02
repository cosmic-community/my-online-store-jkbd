import type { Metadata } from 'next';
import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse products by category.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Browse</p>
        <h1 className="text-4xl font-bold text-gray-900">All Categories</h1>
        <p className="mt-2 text-gray-500">
          {categories.length} {categories.length === 1 ? 'category' : 'categories'} to explore
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No categories yet</h3>
          <p className="text-gray-500">Add categories in your Cosmic dashboard to organize your products.</p>
        </div>
      )}
    </div>
  );
}