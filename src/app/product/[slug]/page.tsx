import { notFound } from 'next/navigation';
import { products } from '../../../../data/products';
import { ProductPageView } from './ProductPageView';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductPageView product={product} />;
}
