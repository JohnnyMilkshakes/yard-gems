import { Router } from "express";
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";
import cartRoutes from "./cart.js";
import yardSalesRoutes from "./yard-sales.js";
import verifyToken from "../middleware/verify-token.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/cart", verifyToken, cartRoutes);
router.use("/yard-sales", yardSalesRoutes);



export default router;