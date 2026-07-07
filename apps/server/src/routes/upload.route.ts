import { Router } from 'express';
import multer from 'multer';
import { protect, isAdmin } from '../middleware/auth';
import { uploadImage } from '../controllers/upload.controller';

const uploadRoutes: Router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

uploadRoutes.post('/', protect, isAdmin, upload.single('image'), uploadImage);

export default uploadRoutes;
