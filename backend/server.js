import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, res) => {
  res.status(500).send({ message: err.message });
});

app.listen(5000, () => {
  console.log(`Serve at http://localhost:5000`);
});