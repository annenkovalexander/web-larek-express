import { NextFunction, Request, Response } from 'express';
import Product, { IProduct } from '../models/models';
import { errorRouter } from '../errors/error-router';
import DefaultError from '../errors/default-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({ items: products, total: products.length || 0 }))
  .catch(() => next(new DefaultError('Произошла неизвестная ошибка')));

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, description, category, price,
  } = req.body;
  Product.create({
    title, image, description, category, price,
  })
    .then((product: IProduct) => res.status(201).send({ data: product })).catch((err) => {
      errorRouter(err, next);
    });
};