import { Router } from "express";
import * as controllers from "../controllers/users.js";

const router = Router();

router.get("/", controllers.getUsers);
router.get("/:id", controllers.getUser);
router.put("/:id", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);

export default router;