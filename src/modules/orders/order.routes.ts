import {Router} from "express";
import authMiddleware  from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";


import {
    checkoutCart,
    getMyOrders,
    getAllOrders,
    updateOrderStatus} from "./order.controller.js";
const router = Router();


//the user

router.post("/checkout",authMiddleware,checkoutCart);
router.get("/my-orders",authMiddleware,getMyOrders);


//admin routes

router.get("/",authMiddleware,authorize("ADMIN"),getAllOrders);
router.put("/:id/status",authMiddleware,authorize("ADMIN"),
updateOrderStatus);


export default router;
