
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import cartRoutes from './routes/cart.route';
import paymentRoutes from './routes/payment.route';
import orderRoutes from './routes/order.route';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Simple route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Madhoor Pureline Backend API!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

