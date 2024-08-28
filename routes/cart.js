import { Router } from "express";
import * as controllers from "../controllers/cart.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.post("/:userId", verifyToken, identityCheck, controllers.createCart);
router.get("/:userId/:cartId", verifyToken, identityCheck, controllers.getCart);
router.put("/:userId/:cartId", verifyToken, identityCheck, controllers.updateCart);
router.delete("/:userId/:cartId", verifyToken, identityCheck, controllers.deleteItemFromCart);
// router.post("/:userId/items", controllers.addItemToCart);


export default router;