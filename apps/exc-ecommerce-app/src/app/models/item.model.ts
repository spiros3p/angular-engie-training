export type Item = Readonly<{
  id: string;
  name: string;
  description?: string;
  quantity: number;
  pictureUrl?: string;
  dateAdded: Date | string;
  dateUpdated?: Date | string;
  price: number;
}>;
