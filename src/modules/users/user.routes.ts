import { Router } from "express";
import { registerUser ,loginUser, createAdminUser} from "./user.controller.js";

const router = Router();


router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/admin/create", createAdminUser);

export default router;