import { Router } from 'express';
import { isAdmin, protect } from '../middleware/auth';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../controllers/product.controller';

const productRoutes: Router = Router();

// Anyone can view products
productRoutes.get('/', getProducts);    
productRoutes.get('/:id', getOneProduct);


// Only logged-in admins can create, update, or delete products
productRoutes.post('/', protect, isAdmin, createProduct);
productRoutes.patch('/:id', protect, isAdmin, updateProduct);
productRoutes.delete('/:id', protect, isAdmin, deleteProduct);

export default productRoutes;