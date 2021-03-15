import * as mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);


export const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, 
      required: true,
      maxlength: 32,
      unique: true
    },
    status: {
      type:String,
      enum: ["pending", "approved"] ,// enum means string objects
      default:"pending",
    },
  },
);

export interface Category extends mongoose.Document {
  _id: string,
  name:string,
  status:string
}





