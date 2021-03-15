

import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

export const MenuSchema = new mongoose.Schema({
    foodSeller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
    },
    dishName: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    price: { type: Number, required: true },
    image: String,
    preperationTime: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now,
    },
});

export interface Menu extends mongoose.Document {
    _id: string,
    foodSeller: Object,
    dishName: string,
    description: string,
    category: string,
    price: number,
    preperationTime: string,
    created: Date,
}
