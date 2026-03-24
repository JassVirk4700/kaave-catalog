import { notFound } from 'next/navigation';
import { ProductPageView } from './ProductPageView';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { mapProductRowToProduct } from '@/utils/supabase/mapper';

// We optionally bypass generateStaticParams for dynamic fetching, or query Supabase to pre-build.
export async function generateStaticParams() {
  const supabase = await createSupabaseServerClient();
  const { data: products } = await supabase.from('products').select('slug');
  return (products || []).map((product: any) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const supabase = await createSupabaseServerClient();
  const { data: row } = await supabase
    .from('products')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!row) {
    notFound();
  }

  const product = mapProductRowToProduct(row);

  return <ProductPageView product={product} />;
}
