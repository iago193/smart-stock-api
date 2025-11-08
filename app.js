import express from 'express';
import productRouter from './src/routes/product-router.js';
import dotenv from 'dotenv';
dotenv.config();

class App {
  constructor() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.use('/products', productRouter);
  }
}
export default new App().app;
