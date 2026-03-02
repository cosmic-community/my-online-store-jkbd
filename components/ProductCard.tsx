import Link from 'next/link';
import type { Product } from '@/types';
import InventoryBadge from '@/components/InventoryBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const featuredImage = product.metadata?.featured_image;
  const price = product.metadata?.price;
  const category = product.metadata?.category;
  const inventoryStatus = product.metadata?.inventory_status;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {featuredImage?.imgix_url ? (
            <img
              src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" />
              </svg>
            </div>
          )}

          {/* Inventory badge overlay */}
          {inventoryStatus && (
            <div className="absolute top-3 left-3">
              <InventoryBadge status={inventoryStatus} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {category?.title && (
            <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">
              {category.title}
            </p>
          )}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
          {typeof price === 'number' && (
            <p className="mt-2 text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}