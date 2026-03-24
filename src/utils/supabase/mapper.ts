import { Database } from '@/types/database.types';
import { Product } from '@/types/product';

export type ProductRow = Database['public']['Tables']['products']['Row'];

export function mapProductRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as any,
    subcategory: row.subcategory as any,
    shortDescription: row.short_description || '',
    description: row.description || '',
    specs: row.specs || [],
    material: row.material || '',
    workType: row.work_type || '',
    tag: row.tag as any,
    images: row.image_urls || [],
    featured: row.featured,
    displayOrder: row.display_order
  };
}
