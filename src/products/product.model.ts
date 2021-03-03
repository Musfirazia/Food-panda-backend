

import * as mongoose from 'mongoose';
// import { User } from 'src/user/user.model';
export const ProductSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    created: {
        type: Date,
        default: Date.now,
    },
});
export interface Product extends mongoose.Document {
    owner: Object,
    title: string,
    description: string,
    category: string,
    price: number,
    created: Date,
}
