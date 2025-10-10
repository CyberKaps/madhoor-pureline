import { Router } from 'express';
import { isAdmin, protect } from '../middleware/auth';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../controllers/product.controller';

const productRoutes: Router = Router();

// --- Public Routes ---
// Anyone can view products
productRoutes.get('/', getProducts);    
productRoutes.get('/:id', getOneProduct);


// --- Admin Routes ---
// Only logged-in admins can create, update, or delete products
productRoutes.post('/', protect, createProduct);
productRoutes.put('/:id', protect, isAdmin, updateProduct);
productRoutes.delete('/:id', protect, isAdmin, deleteProduct);

export default productRoutes;