import { Router } from 'express';
import { getUser, login, logOutUser, signup, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validate.middleware';
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators';
import rateLimit from 'express-rate-limit';

const authRoutes: Router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { success: false, message: 'Too many login attempts from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

authRoutes.post('/signup', validateRequest(signupSchema), signup);
authRoutes.post('/login', loginLimiter, validateRequest(loginSchema), login);
authRoutes.get('/me', protect, getUser);
authRoutes.post('/logout', protect, logOutUser);
authRoutes.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);
authRoutes.patch('/reset-password/:token', validateRequest(resetPasswordSchema), resetPassword);

export default authRoutes;