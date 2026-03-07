import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
