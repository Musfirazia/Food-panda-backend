import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);


export const PaymentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },

  totalPrice: {
    type: Number,
    default: 0,
  },
  voucher: {
    type: String,
  },
  paymentType: {
    type: String,
    default: "In Cash",
    enum: ["In Cash", "Visa Card"] // enum means string objects
  }
  ,
  cardDetails: {
    CardNumber: String,
    cvcNumber: { type: Number, minlength: 6 }

  },
  expiryDate: {
    type: Date,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  }

})
interface CardDetails {
  CardNumber: String,
  cvcNumber: number,
}
export interface Payment extends mongoose.Document {
  _id: string,
  customerId: Object,
  orderId: Object,
  totalPrice: number,
  voucher: string,
  paymentType: string,
  cardDetails: CardDetails,
  expiryDate: Date,
  paymentDate: Date,
}





