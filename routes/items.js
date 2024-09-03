import { Router } from "express";
import * as controllers from "../controllers/items.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.post("/:userId", verifyToken, identityCheck, controllers.createItem);
router.get("/", controllers.getItems);
router.get("/:itemId", controllers.getItem);
router.put("/:userId/:itemId", verifyToken, identityCheck, controllers.updateItem);
router.delete("/:userId/:itemId", verifyToken, identityCheck, controllers.deleteItem);

export default router;