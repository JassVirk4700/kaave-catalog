export type MainCategory = 'Ladies Wear' | 'Mens Wear';

export type SubCategory = 
  | 'Plain Belly' 
  | 'Boot' 
  | 'Lahori' 
  | 'Punjabi' 
  | 'Heel' 
  | 'Flat Mules' 
  | 'Flat Slippers';

export type ProductTag = 'NEW' | 'BEST SELLER' | 'LIMITED' | null;

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: MainCategory;
  subcategory: SubCategory;
  shortDescription: string;
  description: string;
  specs: string[];
  material: string;
  workType: string;
  tag: ProductTag;
  images: string[];
  featured: boolean;
  displayOrder: number;
}
