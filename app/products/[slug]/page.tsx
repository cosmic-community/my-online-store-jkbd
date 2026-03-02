// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic';
import InventoryBadge from '@/components/InventoryBadge';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found | My Online Store' };
  }

  return {
    title: `${product.title} | My Online Store`,
    description: product.metadata?.description || `View details for ${product.title}`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.metadata?.category?.id === product.metadata?.category?.id)
    .slice(0, 3);

  const featuredImage = product.metadata?.featured_image;
  const gallery = product.metadata?.gallery;
  const price = product.metadata?.price;
  const description = product.metadata?.description;
  const inventoryStatus = product.metadata?.inventory_status;
  const category = product.metadata?.category;

  const averageRating = reviews.length > 0
    ? Math.round(reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            {featuredImage?.imgix_url ? (
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
                </svg>
              </div>
            )}
          </div>

          {/* Gallery thumbnails */}
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((img, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} gallery ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {category?.title && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2 hover:text-brand-700 transition-colors"
            >
              {category.title}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

          {/* Rating summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={averageRating} showNumber />
              <span className="text-sm text-gray-500">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {typeof price === 'number' && (
            <p className="text-3xl font-bold text-gray-900 mb-6">${price.toFixed(2)}</p>
          )}

          {/* Inventory Status */}
          {inventoryStatus && (
            <div className="mb-6">
              <InventoryBadge status={inventoryStatus} />
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Description</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</div>
            </div>
          )}

          {/* Product content (rich text) */}
          {product.content && (
            <div
              className="prose prose-gray max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => {
              const relImage = relProduct.metadata?.featured_image;
              const relPrice = relProduct.metadata?.price;
              return (
                <Link key={relProduct.id} href={`/products/${relProduct.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                      {relImage?.imgix_url ? (
                        <img
                          src={`${relImage.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                          alt={relProduct.title}
                          width={300}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{relProduct.title}</h3>
                      {typeof relPrice === 'number' && (
                        <p className="mt-1 text-lg font-bold text-gray-900">${relPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}