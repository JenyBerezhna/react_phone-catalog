export interface Product {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;

  price: number;
  fullPrice: number;

  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;

  image: string;
}
