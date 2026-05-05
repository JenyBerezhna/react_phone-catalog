import { Product } from '../../types/Product';
import { Model } from '../../types/Model';

export const getModels = (products: Product[]): Model[] => {
  const map = new Map<string, Model>();

  for (const p of products) {
    const existing = map.get(p.namespaceId);

    if (!existing) {
      map.set(p.namespaceId, {
        namespaceId: p.namespaceId,
        name: p.name.replace(/\d+GB.*/, '').trim(),
        image: p.image,
        newestYear: p.year,
        lowestPrice: p.price,
      });
    } else {
      existing.newestYear = Math.max(existing.newestYear, p.year);
      existing.lowestPrice = Math.min(existing.lowestPrice, p.price);
    }
  }

  return Array.from(map.values());
};
