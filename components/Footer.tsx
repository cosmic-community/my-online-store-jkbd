import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">My Online Store</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Discover our curated collection of quality products. Shop with confidence and enjoy a seamless experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-gray-400 hover:text-white transition-colors">Customer Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">About</h3>
            <p className="text-sm text-gray-400">
              Powered by Cosmic CMS. Built with Next.js, Tailwind CSS, and TypeScript.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} My Online Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}