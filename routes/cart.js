import { Router } from "express";
import * as controllers from "../controllers/cart.js";

const router = Router();

router.get("/:userId", controllers.getCart);
router.post("/:userId", controllers.createCart);
router.put("/:userId", controllers.updateCart);
router.delete("/:userId", controllers.deleteCart);

export default router;