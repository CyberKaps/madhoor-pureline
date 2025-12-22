import { Router } from 'express';
import { protect } from '../middleware/auth';
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controllers/cart.controller';


const cartRoutes: Router = Router();

cartRoutes.get('/',protect, getCart);
cartRoutes.post('/add',protect, addToCart);
cartRoutes.put('/item', protect, updateCartItem);
cartRoutes.delete('/item/:productId', protect, removeFromCart);
cartRoutes.delete('/', protect, clearCart);


export default cartRoutes;