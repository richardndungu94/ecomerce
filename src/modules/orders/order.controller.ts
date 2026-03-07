import type {Response,Request} from "express";
import type { AuthRequest } from "../../types/authRequest.js"; 
import Cart from "../cart/cart.model.js";
import Product from "../products/product.model.js";
import Order from "../orders/order.model.js";


export const checkoutCart=async(req:any,res:Response)=>{
    const authReq = req as AuthRequest;
    const cart = await Cart.findOne({user:authReq.user.id}).populate("items.product");

    if(!cart || cart.items.length===0){
        return res.status(400).json({message:"Cart is empty"});
    }

    let total = 0;

    const items = cart.items.map((item:any) => {
        const price = item.product.price;
        total += price * item.quantity;
        return {
            product:item.product._id,
            quantity:item.quantity,
            price:price,
        };
    });

    //create order
    const order = await Order.create({
        user: authReq.user.id,
        items: items,
        totalAmount: total,
        status: "Pending"
    });

    //clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({message:"Order placed successfully",order})

};

//view orders

export const getMyOrders=async(req:any,res:Response)=>{
    const authReq = req as AuthRequest;
    const orders = await Order.find({user:authReq.user.id}).populate("items.product");
    res.status(200).json({orders});
};

//admin to view all orders
export const getAllOrders=async(req:any,res:Response)=>{
    const orders = await Order.find().populate("items.product").populate("user","name email");
    res.status(200).json({orders});
};

//admin to update order status

export const updateOrderStatus=async(req:any,res:Response)=>{
    const order= await Order.findByIdAndUpdate(
        req.params.id,
        {status:req.body.status},
        {new:true}
    );

    res.json(order);

};