import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authMiddleware from "./middlewares/auth.middleware.js";
import authorize from "./middlewares/role.middleware.js";
import productRoutes from "./modules/products/product.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import rateLimit from "express-rate-limit"
import errorHandler from "./middlewares/error.middleware.js";



const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})



app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/users", userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use(limiter);
app.use(errorHandler);

app.get("/protected", authMiddleware, (req: any, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/admin", authMiddleware, authorize("ADMIN"), (req,res) => { 
  res.json({message:"welcome admin"});
});

app.get("/user", authMiddleware, authorize("USER", "ADMIN"), (req,res) => { 
  res.json({message:"welcome user"});
});

  app.get("/", (_, res) => {
  res.send("App running ");
});

export default app;
