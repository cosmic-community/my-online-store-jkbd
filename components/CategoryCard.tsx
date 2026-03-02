import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = category.metadata?.image;
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <article className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Background image */}
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-700" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-200 transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-300 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}