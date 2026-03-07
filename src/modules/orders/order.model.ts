import  mongoose,{Schema,Document} from "mongoose";

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status:"Pending"| "Paid" | "Shipped" | "Delivered" | "Cancelled";
}

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
       
     },

     items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:Number,
            price:Number,
        },
     ],
     totalAmount:{
        type:Number,
        required:true,
        },

        status: {
            type:String,
            enum:["Pending","Paid","Shipped","Delivered","Cancelled"],
            default:"Pending",
        },
    },
    {timestamps:true}
);

export default mongoose.model<IOrder>("Order",orderSchema);
