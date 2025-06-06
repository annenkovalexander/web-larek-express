import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product, { IProduct } from '../models/models';
import { errorRouter } from '../errors/error-router';

export const getProducts = (_req: Request, res: Response) => Product.find({})
  .then((products) => res.send({ items: products, total: products.length || 0 }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

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

export const orderProduct = (req: Request, res: Response) => {
  res.status(200).send({
    id: faker.string.uuid(),
    total: req.body.total,
  });
};
