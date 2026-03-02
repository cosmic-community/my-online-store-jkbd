# My Online Store

![My Online Store](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=300&fit=crop&auto=format)

A modern, fully-responsive e-commerce storefront built with Next.js 16 and Cosmic CMS. Browse products by category, view detailed product pages with customer reviews, and enjoy a beautiful shopping experience — all powered by content managed in your Cosmic dashboard.

## Features

- 🛍️ **Product Catalog** — Dynamic product listing with images, pricing, and inventory badges
- 🏷️ **Category Browsing** — Filter products by category with dedicated category pages
- ⭐ **Customer Reviews** — Star ratings and review comments on product detail pages
- 📱 **Fully Responsive** — Beautiful layouts on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js 16 App Router
- 🎨 **Modern UI** — Clean design with Tailwind CSS, smooth animations, and accessible components
- 🔗 **Cosmic CMS Integration** — All content managed through your Cosmic dashboard

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a5cf3cd7257d193dd769f9&clone_repository=69a5d07ad7257d193dd76a28)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [TypeScript 5](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching Products
```typescript
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug
```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three object types from your Cosmic bucket:

| Object Type | Fields | Description |
|---|---|---|
| **Products** | description, price, featured_image, gallery, inventory_status, category | Product listings with images and pricing |
| **Categories** | name, description, image | Product groupings for organized browsing |
| **Reviews** | reviewer_name, rating, comment, product | Customer feedback with star ratings |

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and output to `.next`
4. Add environment variables
5. Deploy

<!-- README_END -->