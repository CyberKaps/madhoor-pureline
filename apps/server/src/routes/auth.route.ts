import { Router } from 'express';
import { getUser, login, logOutUser, signup } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';


const authRoutes: Router = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/me', protect, getUser);
authRoutes.post('/logout', protect, logOutUser);

export default authRoutes;