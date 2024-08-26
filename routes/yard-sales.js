import { Router } from "express";
import * as controllers from "../controllers/yard-sales.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.post("/:userId", verifyToken, identityCheck, controllers.createYardSale);
router.get("/", controllers.getYardSales);
router.get("/:yardId", controllers.getYardSale);
router.put("/:userId/:yardId", verifyToken, identityCheck, controllers.updateYardSale);
router.delete("/userId/:yardId", verifyToken, identityCheck, controllers.deleteYardSale);

export default router;