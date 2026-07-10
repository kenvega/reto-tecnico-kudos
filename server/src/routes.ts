import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const router = Router();

router.use("/api/", authRoutes);
router.use("/api/", uploadRoutes);

export default router;
