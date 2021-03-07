

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
        type: String,
        required: true,
    },
    price: { type: Number, required: true },
    image: String,
    preperationTime: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now,
    },
});
// const categorySchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 32,
//             unique: true
//         }
//     },
//     { timestamps: true }
// );
// module.exports = mongoose.model("Category", categorySchema);

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
