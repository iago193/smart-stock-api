import express from 'express';
import productRouter from './src/routes/product-router';

class App{
    constructor() {
        this.app = express();
        this.routes();
    }

    routes() {
        this.app.use('/products', productRouter);
    }
}
export default new App;