import express from 'express';
import cors from 'cors';
import productRouter from './src/routes/product-router.js';
import usersRouter from './src/routes/user-router.js';
import errorHandler from './src/errors/ErrorHandler.js';
import uploadRouter from './src/routes/upload-router.js';
import authRouter from './src/routes/auth-router.js';
import historyRouter from './src/routes/history-router.js';
import categoryRouter from './src/routes/category-router.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONT_URL].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/products', productRouter);
    this.app.use('/history', historyRouter);
    this.app.use('/users', usersRouter);
    this.app.use('/upload', uploadRouter);
    this.app.use('/login', authRouter);
    this.app.use('/categories', categoryRouter);
  }

  errorHandler() {
    this.app.use(errorHandler);
  }
}

export default new App().app;
