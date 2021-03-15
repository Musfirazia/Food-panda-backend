import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
export const AdminSchema = new mongoose.Schema({
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
    admin: {
        type: Boolean,
        default: true
    },
    number:{
        type:String,
        minlength:7,
    },
   
    created: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
    },
    
})
// interface Address{
//     addr1: string,
//     addr2: string,
//     city:string
//     state:string,
//     country:string,
//     zip:number
// }

export interface Admin extends mongoose.Document {
    _id: string,
    name: string,
    email: string,
    password: string,
    number:string,
    token: string,
    admin: boolean,
    created:Date,  
}


