import { Router } from 'express';
import { isAdmin, protect } from '../middleware/auth';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../controllers/product.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { createProductSchema, updateProductSchema } from '../validators';

const productRoutes: Router = Router();

// Anyone can view products
productRoutes.get('/', getProducts);    
productRoutes.get('/:id', getOneProduct);


// Only logged-in admins can create, update, or delete products
productRoutes.post('/', protect, isAdmin, validateRequest(createProductSchema), createProduct);
productRoutes.patch('/:id', protect, isAdmin, validateRequest(updateProductSchema), updateProduct);
productRoutes.delete('/:id', protect, isAdmin, deleteProduct);

export default productRoutes;