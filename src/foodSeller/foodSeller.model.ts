import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
export const SellerSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    contactNumber: {
        type: String,
        minlength: 7,
    },
    businessName: {
        type: String,
        minlength: 5
    },
    pickup: {
        type: Boolean,
        default: false
    },
    foodDelivery: {
        type: Boolean,
        default: true
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
    },
    availableArea: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
    },

})
export interface Address {
    addr1: string,
    addr2: string,
    city: string
    state: string,
    country: string,
}

export interface Seller extends mongoose.Document {
    _id: string,
    name: string,
    email: string,
    password: string,
    contactNumber: string,
    BusinessName: string,
    Pickup: boolean,
    FoodDelivery: boolean,
    address: Address,
    availableArea: Address,

}


