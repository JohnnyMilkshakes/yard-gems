import { Router } from "express";
import * as controllers from "../controllers/yard-sales.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.post("/", controllers.createYardSale);
router.get("/", controllers.getYardSales);
router.get("/:id", controllers.getYardSale);
router.put("/:id", controllers.updateYardSale);
router.delete("/:id", controllers.deleteYardSale);

export default router;