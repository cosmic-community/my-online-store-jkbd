// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | My Online Store' };
  }

  const name = category.metadata?.name || category.title;

  return {
    title: `${name} | My Online Store`,
    description: category.metadata?.description || `Browse products in the ${name} category.`,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;
  const image = category.metadata?.image;

  return (
    <div>
      {/* Category Header Banner */}
      <div className="relative bg-gray-900 overflow-hidden">
        {image?.imgix_url && (
          <img
            src={`${image.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={1000}
            height={300}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-white font-medium">{name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{name}</h1>
          {description && (
            <p className="text-lg text-gray-300 max-w-2xl">{description}</p>
          )}
          <p className="mt-4 text-sm text-gray-400">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No products in this category</h3>
            <p className="text-gray-500 mb-4">Check back later or browse our other categories.</p>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}