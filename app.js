import express from 'express';
import productRouter from './src/routes/product-router.js';
import categoryRouter from './src/routes/category-router.js';
import usersRouter from './src/routes/user-router.js';
import errorHandler from './src/errors/ErrorHandler.js';
import uploadRouter from './src/routes/upload-router.js';
import tokenRouter from './src/routes/token-router.js';

import dotenv from 'dotenv';
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/products', productRouter);
    this.app.use('/users', usersRouter);
    this.app.use('/category', categoryRouter);
    this.app.use('/upload', uploadRouter);
    this.app.use('/login', tokenRouter);
  }

  errorHandler() {
    this.app.use(errorHandler);
  }
}

export default new App().app;
