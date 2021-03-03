export interface CreateProductDTO {
  title: string;
  image: string;
  description: string;
  price: number;
  owner:String;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
