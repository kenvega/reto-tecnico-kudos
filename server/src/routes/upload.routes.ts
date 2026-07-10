import { Router } from "express";
import multer from "multer";
import { uploadController } from "@/controllers/upload.controller.js";

// memoryStorage keeps the file in memory as a Buffer instead of writing to disk
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// upload.single("file") expects one file under the form field named "file"
// after this middleware runs, the file is available at req.file
router.post("/upload", upload.single("file"), uploadController.upload);

export default router;
