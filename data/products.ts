import { Product } from '../types/product';

/*
<template>
  {
    id: '1',
    name: 'Sunheri Phool Flat Mules',
    slug: 'sunheri-phool-flat-mules',
    category: 'Ladies Wear',
    subcategory: 'Flat Mules',
    shortDescription: 'Velvet & Gold Zardosi',
    description: 'Flat mule style with intricate gold zardosi work on premium velvet. Built on a durable TRP sole with 3mm cushioning and soft Patava leather lining for all-day comfort.',
    specs: ['Style: Flat Mule', 'Sole: TRP', 'Cushion: 3mm', 'Fabric: Soft Leather Patava'],
    material: 'Velvet with Soft Leather Patava Lining',
    workType: 'Gold Zardosi',
    tag: 'NEW',
    images: [
      'images/products/womens/flat-mules/sunheri-phool-flat-mules/1.webp',
      'images/products/womens/flat-mules/sunheri-phool-flat-mules/2.webp',
      'images/products/womens/flat-mules/sunheri-phool-flat-mules/3.webp',
    ],
    featured: true,
    displayOrder: 1,
  },
*/

export const products: Product[] = [
  // Flat Mules
  {
    id: '1',
    name: 'Sunheri Phool Flat Mules',
    slug: 'sunheri-phool-flat-mules',
    category: 'Ladies Wear',
    subcategory: 'Flat Mules',
    shortDescription: 'Velvet & Gold Zardosi',
    description: 'Flat mule style with intricate gold zardosi work on premium velvet. Built on a durable TRP sole with 3mm cushioning and soft Patava leather lining for all-day comfort.',
    specs: ['Style: Flat Mule', 'Sole: TRP', 'Cushion: 3mm', 'Fabric: Soft Leather Patava'],
    material: 'Velvet with Soft Leather Patava Lining',
    workType: 'Gold Zardosi',
    tag: 'NEW',
    images: [
      'images/products/womens/flat-mules/sunheri-phool-flat-mules/1.webp',
      'images/products/womens/flat-mules/sunheri-phool-flat-mules/2.webp',
      'images/products/womens/flat-mules/sunheri-phool-flat-mules/3.webp',
    ],
    featured: true,
    displayOrder: 1,
  },
  {
    id: '2',
    name: 'Golden Gilded Flat Mules',
    slug: 'golden-gilded-flat-mules',
    category: 'Ladies Wear',
    subcategory: 'Flat Mules',
    shortDescription: 'Pearl Embroidery - Soft Leather',
    description: 'Flat mule with delicate pearl embroidery on soft leather Patava fabric. TRP sole with 3mm cushioning for lasting comfort across events.',
    specs: ['Style: Flat Mule', 'Sole: TRP', 'Cushion: 3mm', 'Fabric: Soft Leather Patava'],
    material: 'Soft Leather Patava',
    workType: 'Pearl Embroidery',
    tag: 'BEST SELLER',
    images: [
      'images/products/womens/flat-mules/golden-gilded-flat-mules/1.webp',
      'images/products/womens/flat-mules/golden-gilded-flat-mules/2.webp',
      'images/products/womens/flat-mules/golden-gilded-flat-mules/3.webp',
    ],
    featured: true,
    displayOrder: 2,
  },
  {
    id: '3',
    name: 'Mudra Flat Mules',
    slug: 'mudra-flat-mules',
    category: 'Ladies Wear',
    subcategory: 'Flat Mules',
    shortDescription: 'Pearl Embroidery - Soft Leather',
    description: 'Flat mule with delicate pearl embroidery on soft leather Patava fabric. TRP sole with 3mm cushioning for lasting comfort across events.',
    specs: ['Style: Flat Mule', 'Sole: TRP', 'Cushion: 3mm', 'Fabric: Soft Leather Patava'],
    material: 'Soft Leather Patava',
    workType: 'Pearl Embroidery',
    tag: 'BEST SELLER',
    images: [
      'images/products/womens/flat-mules/mudra-flat-mules/1.webp',
      'images/products/womens/flat-mules/mudra-flat-mules/2.webp'
    ],
    featured: true,
    displayOrder: 3,
  },
  {
    id: '4',
    name: 'Regal Bloom Flat Mules',
    slug: 'regal-bloom-flat-mules',
    category: 'Ladies Wear',
    subcategory: 'Flat Mules',
    shortDescription: 'Velvet & Gold Zardosi',
    description: 'Flat mule style with intricate gold zardosi work on premium velvet. Built on a durable TRP sole with 3mm cushioning and soft Patava leather lining for all-day comfort.',
    specs: ['Style: Flat Mule', 'Sole: TRP', 'Cushion: 3mm', 'Fabric: Soft Leather Patava'],
    material: 'Velvet with Soft Leather Patava Lining',
    workType: 'Gold Zardosi',
    tag: null,
    images: [
      'images/products/womens/flat-mules/regal-bloom-flat-mules/1.webp',
      'images/products/womens/flat-mules/regal-bloom-flat-mules/2.webp',
      'images/products/womens/flat-mules/regal-bloom-flat-mules/3.webp',
    ],
    featured: true,
    displayOrder: 4,
  },
  {
    id: '5',
    name: 'Gul-e-Zari Flat Mules',
    slug: 'gul-e-zari-flat-mules',
    category: 'Ladies Wear',
    subcategory: 'Flat Mules',
    shortDescription: 'Pearl Embroidery - Soft Leather',
    description: 'Flat mule with delicate pearl embroidery on soft leather Patava fabric. TRP sole with 3mm cushioning for lasting comfort across events.',
    specs: ['Style: Flat Mule', 'Sole: TRP', 'Cushion: 3mm', 'Fabric: Soft Leather Patava'],
    material: 'Soft Leather Patava',
    workType: 'Pearl Embroidery',
    tag: null,
    images: [
      'images/products/womens/flat-mules/gul-e-zari-flat-mules/1.webp',
      'images/products/womens/flat-mules/gul-e-zari-flat-mules/2.webp'
    ],
    featured: true,
    displayOrder: 5,
  },

  // Punjabi
];

export const getProducts = () => products;
export const getActiveCategories = () => ['Ladies Wear', 'Mens Wear'] as const;
export const getSubcategories = (category: 'Ladies Wear' | 'Mens Wear') => {
  if (category === 'Ladies Wear') return ['Plain Belly', 'Boot', 'Lahori', 'Punjabi', 'Heel', 'Flat Mules', 'Flat Slippers'];
  return [];
};
