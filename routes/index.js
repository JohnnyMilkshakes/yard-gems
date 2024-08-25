import { Router } from "express";
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

export default router;