export interface CreateMenuDTO {
    foodSeller: String;
    dishName: string;
    description: string;
    image: string;
    price: number;
    preperationTime: { type: String, required: true }
}

export type UpdateMenuDTO = Partial<CreateMenuDTO>;
