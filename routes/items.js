import { Router } from "express";
import * as controllers from "../controllers/items.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.post("/", controllers.createItem);
router.get("/", controllers.getItems);
router.get("/:itemId", controllers.getItem);
router.put("/:itemId", controllers.updateItem);
router.delete("/:itemId", controllers.deleteItem);

export default router;