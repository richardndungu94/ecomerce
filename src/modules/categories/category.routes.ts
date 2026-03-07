import {Router} from "express";
import { createCategory,deleteCategory,getCategories } from "./category.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";


const router=Router();

// puplic routes
router.get("/", getCategories);

// admin routes
router.post("/", authMiddleware, authorize("ADMIN"),createCategory);
router.delete("/:id", authMiddleware, authorize("ADMIN"),deleteCategory);

export default router;
