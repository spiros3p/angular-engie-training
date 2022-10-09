export type CartItem = Readonly<{
  id: string;
  itemId: string;
  user: string;
  name: string;
  description?: string;
  quantity: number;
  pictureUrl?: string;
  price: number;
}>;
