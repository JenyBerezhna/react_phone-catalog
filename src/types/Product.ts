export interface Product {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId: string;
  name: string;

  price: number;
  fullPrice: number;

  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;

  image: string;
  itemId: string;
}
