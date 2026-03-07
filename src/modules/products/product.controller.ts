import type{Request,Response} from "express";
import Product from "./product.model.js";
import asyncHandler from "../../utils/asyncHandler.js";


export const createProduct = asyncHandler(async (req:Request, res:Response) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);

});


export const getProducts = async (req:Request, res:Response) => {
    const products = await Product.find().populate("category");
    res.json(products);
};

export const getProductById = async (req:Request, res:Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
};
export const updateProduct = async (req:Request, res:Response)=> {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(product);
};
export const deleteProduct = async (req:Request, res:Response)=> {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};
