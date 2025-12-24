
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import cartRoutes from './routes/cart.route';
import paymentRoutes from './routes/payment.route';
import orderRoutes from './routes/order.route';
import adminOrderRoutes from './routes/admin.order.route';
import bodyParser from 'body-parser'
import { razorpayWebhook } from './controllers/webhook.controller';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.post( "/api/payment/razorpay/webhook", bodyParser.raw({ type: "application/json" }), razorpayWebhook );

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
app.use('/api/admin', adminOrderRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

