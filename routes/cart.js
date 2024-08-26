import { Router } from "express";
import * as controllers from "../controllers/cart.js";

const router = Router();

router.get("/:userId", controllers.getCart);
router.post("/:userId", controllers.createCart);
router.put("/:userId/items/:itemId", controllers.updateCart);
router.post("/:userId/items", controllers.addItemToCart);
router.delete("/:userId/items/:itemId", controllers.deleteItemFromCart);

export default router;