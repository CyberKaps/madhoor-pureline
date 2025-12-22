import { Router } from 'express';
import { protect } from '../middleware/auth';
import { addToCart, getCart } from '../controllers/cart.controller';


const cartRoutes: Router = Router();

cartRoutes.post('/getCart',protect, getCart);
cartRoutes.post('/add',protect, addToCart);
// cartRoutes.put('/item/:itemId', protect, updateCartItem);
// cartRoutes.delete('/item/:itemId', removeFromCart);
// cartRoutes.delete('', clearCart);


export default cartRoutes;