import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/Ecommerce', {
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/config/pa', (req, res) => {
  res.send('process.env.PAYPAL_CLIENT_ID' || 'sb');
});
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, res) => {
  res.status(500).send({ message: err.message });
});

app.listen(5000, () => {
  console.log(`Serve at http://localhost:5000`);
});