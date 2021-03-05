import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
export const riderSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
})

export interface Rider extends mongoose.Document {
    _id: string,
    userId: Object,
    vehiclePlate: string,
    vehicle: string,
    vehicleColor:string,
}


