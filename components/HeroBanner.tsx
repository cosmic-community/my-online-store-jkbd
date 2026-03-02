import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-4">
            Welcome to My Online Store
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Discover quality{' '}
            <span className="text-brand-400">products</span>{' '}
            you&apos;ll love.
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
            Browse our curated collection of exceptional products. Trusted by customers and backed by genuine reviews.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
            >
              Shop Now
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}