import { Router } from 'express';
import { getUser, login, logOutUser, signup } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';


const authRoutes: Router = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/me', protect, getUser);
authRoutes.get('/logout', logOutUser);
// authRoutes.post("/users/me/addresses", protect, addUserAddresses);
// authRoutes.get("/users/me/addresses", protect, getUserAddresses);

export default authRoutes;