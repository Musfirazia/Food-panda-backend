import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
import { User } from "../user/user.model"
import { Product } from "../products/product.model"
export const OrderSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  totalPrice: {
    type: Number,
    default: 0,
  },
  ordered_food: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  order_status:{
    type:String,
    default: "In Cart",
    enum: ["In Cart", "Processing", "Preparing", "Delivered", "Cancelled"] // enum means string objects
  },
  location_to:{
    addr1: String,
    addr2: String,
    city:String,
    streetNo:String,
    country:String,
  },
  location_from:{
    addr1: String,
    addr2: String,
    city:String,
    streetNo:String,
    country:String,
  },

  created: {
    type: Date,
    default: Date.now,
  }
  
})
interface FoodOrder {
  foodItem: Product,
  quantity: number,
}
interface Address{
    addr1: string,
    addr2: string,
    city:string,
    streetNo:string,
    country:string,
}
export interface Order extends mongoose.Document {
  customerId: User,
  totalPrice: number,
  ordered_food:FoodOrder[],
  order_status:string,
  location_to:Address,
  location_from:Address,
  created:Date,
}





