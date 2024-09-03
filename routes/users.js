import { Router } from "express";
import * as controllers from "../controllers/users.js";
import verifyToken from "../middleware/verify-token.js";
import identityCheck from "../middleware/identity-check.js";

const router = Router();

router.get("/", controllers.getUsers);
router.get("/:userId", controllers.getUser);
router.put("/:userId", verifyToken, identityCheck, controllers.updateUser);
router.delete("/:userId", verifyToken, identityCheck, controllers.deleteUser);

export default router;