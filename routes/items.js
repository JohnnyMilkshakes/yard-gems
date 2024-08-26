import { Router } from "express";
import * as controllers from "../controllers/items.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.post("/", controllers.createItem);
router.get("/", controllers.getItems);
router.get("/:id", controllers.getItem);
router.put("/:id", controllers.updateItem);
router.delete("/:id", controllers.deleteItem);

export default router;