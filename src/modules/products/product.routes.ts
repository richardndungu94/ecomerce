import {Router} from "express";
import {validate} from "../../middlewares/validate.middleware.js"
import {createProductSchema} from "../../validators/product.validator.js";




import {
    createProduct, 
    getProducts,
    getProductById, 
    updateProduct, 
    deleteProduct} from "./product.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

const router=Router();

// puplic routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// admin routes

router.post("/", authMiddleware, authorize("ADMIN"),validate(createProductSchema),createProduct);
router.put("/:id", authMiddleware, authorize("ADMIN"),updateProduct);
router.delete("/:id", authMiddleware, authorize("ADMIN"),deleteProduct);


export default router;


