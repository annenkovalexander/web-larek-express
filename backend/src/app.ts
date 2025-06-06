import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router, orderRouter } from './routes/routes';
import mongoose from 'mongoose';
import errorMiddleware  from './middlewares/errors-middleware';
import { notFoundHandler } from './errors/error-router';
import { errorLogger, requestLogger } from './middlewares/loggers';
import mev from 'mongoose-express-validator';
import Product from './models/models';


dotenv.config();
const DB_ADDRESS = process.env.DB_ADDRESS || '';
/* Создаём экземпляр MongoClient, передав URL для подключения к MongoDB */
mongoose.connect(DB_ADDRESS);

const path = require("path");

const { PORT = 3000, BASE_PATH = "none" } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(requestLogger);

app.use(mev('product', Product));
app.use('/product', router);
app.use('/order', orderRouter);
app.use(errorLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(notFoundHandler);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});