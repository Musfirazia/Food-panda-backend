import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
export const riderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    vehicle: {
        type: String,
    },
    vehiclePlate: {
        type: String,
        minlength: 5,
        unique: 1
    },
    vehicleColor: {
        type: String,
    },
    currentLocation: {
        addr1: String,
        addr2: String,
        city: String,
        streetNo: String,
        country: String,
    },
    riderStatus:{
        type:String,
        default:'pending'
    }
})
interface Address {
    addr1: string,
    addr2: string,
    city: string,
    streetNo: string,
    country: string,
}
export interface Rider extends mongoose.Document {
    _id: string,
    userId: Object,
    orderId: Object,
    vehiclePlate: string,
    vehicle: string,
    vehicleColor: string,
    currentLocation:Address,
    riderStatus:string,
}


