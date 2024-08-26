import { Router } from "express";
import * as controllers from "../controllers/users.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.get("/", controllers.getUsers);
router.get("/:id", verifyToken, controllers.getUser);
router.put("/:id", verifyToken, identityCheck, controllers.updateUser);
router.delete("/:id", verifyToken, identityCheck, controllers.deleteUser);

export default router;