import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
import { User } from "../user/user.model"
import { Product } from "../products/product.model"
export const OrderSchema = new mongoose.Schema({

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  }
})
interface ProductOrder {
  product: Product,
  quantity: number,
}
export interface Order extends mongoose.Document {
  owner: User,
  totalPrice: number,
  products:ProductOrder[],
  created:Date,
}





