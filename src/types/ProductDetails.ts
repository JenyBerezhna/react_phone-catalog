export interface ProductDetails {
  id: number;
  name: string;
  category: string;
  itemId: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  description: {
    title: string;
    text: string[];
  }[];
}
