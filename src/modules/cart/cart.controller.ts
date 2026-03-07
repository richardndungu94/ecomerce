import type {Response} from 'express';
import Cart from "./cart.model.js";
import type { AuthRequest } from '../../types/authRequest.js';


//GET cart

export const getMyCart = async (req: any, res: Response) => {
    const authReq = req as AuthRequest;
    const cart = await Cart.findOne({ user: authReq.user?.id }).populate("items.product");


res.json(cart || { items: [] });
};

//ADD to cart

export const addToCart = async (req: any, res: Response) => {
    const authReq = req as AuthRequest;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: authReq.user?.id });

    if (!cart) {
        cart =  await Cart.create({user:authReq.user?.id, items: []});
    }
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity || 1;
    }
    else {
     cart.items.push({ product: productId, quantity: quantity || 1 });   
    }
    await cart.save();

    res.json(cart);

};


//Remove from cart

export const removeFromCart = async (req: any, res: Response) => {
    const authReq = req as AuthRequest;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: authReq.user?.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.json(cart);
};

//clear cart

export const clearCart = async (req: any, res: Response) => {
   const authReq = req as AuthRequest;
   await Cart.findOneAndUpdate({ user: authReq.user?.id }, { items: [] }); 
   res.json({ message: "Cart cleared" });
};