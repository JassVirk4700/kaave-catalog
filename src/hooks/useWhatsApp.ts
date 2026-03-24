import { Product } from '../types/product';

export const useWhatsApp = () => {
  const getWhatsAppUrl = (product: Product) => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kaave-catalog.vercel.app').replace(/\/$/, '');
    const productUrl = `${siteUrl}/product/${product.slug}`;

    const message = [
      `Hi KAAVE! I'm interested in the *${product.name}* from the KAAVE catalog.`,
      `• Product: ${productUrl}`,
    ].join('\n');

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppClick = (product: Product) => {
    window.open(getWhatsAppUrl(product), '_blank');
  };

  return { getWhatsAppUrl, handleWhatsAppClick };
};
