export type Product = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  name: string;
  price: number;
  fullPrice: number;
  year: number;
  itemId: string;
  image: string;
  imageUrl?: string;
  namespaceId: string;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
};
