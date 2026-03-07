import {Router} from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";


import {
    getMyCart,
    addToCart,
    removeFromCart,
    clearCart,

} from "./cart.controller.js";

const router = Router();

// all routes will require log in

router.use(authMiddleware); // Instead of using authmiddle everywhere

router.get("/", getMyCart as any);
router.post("/add", addToCart as any);
router.delete("/remove/:productId", removeFromCart as any);
router.delete("/clear", clearCart as any);

export default router;