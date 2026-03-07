import type {Request,Response} from "express";
import Category from "./category.model.js";

//create ADmin
export const createCategory = async (req:Request,res:Response)=> {
    const category = await Category.create(req.body);
    res.status(201).json(category);

};
//public
export const getCategories = async (req:Request, res:Response) => {
    const categories = await Category.find();
    res.json(categories);
};

//admin
export const deleteCategory = async (req:Request, res:Response) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
};