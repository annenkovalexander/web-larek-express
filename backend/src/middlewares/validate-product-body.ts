import { Request, Response, NextFunction } from 'express';
import DefaultError from '../errors/default-error';
import BadRequestError from '../errors/bad-request-error';
import Product, { IProduct } from '../models/models';

enum PaymentType {
  Online = 'online',
  Card = 'card'
}

const isValidPaymentType = (paymentValue: string) => {
  const objectValues = Object.values(PaymentType);
  const checkResult = objectValues.includes(paymentValue as PaymentType);
  return checkResult;
};

const checkProducts = (products: IProduct[] | undefined[]) => products.some((item) => !item);

const validtateOrderBody = (req: Request, _res: Response, next: NextFunction) => {
  const {
    payment, total,
  } = req.body;
  return Promise.all(req.body.items.map((item: string) => {
    const ProductPromise = Product.find({ _id: item });
    return ProductPromise
      .then((product) => product[0]);
  }))
    .then((products) => {
      if (checkProducts(products) || !isValidPaymentType(payment)) {
        next(new BadRequestError('Ошибка валидации данных при заказе'));
      } else if (!checkProducts(products)) {
        const orderSum = products.reduce((pv, cv) => (cv.price + pv), 0);
        if (orderSum !== total) next(new BadRequestError('Ошибка валидации данных при заказе'));
      }
      next();
    })
    .catch((err) => next(new DefaultError(err.message)));
};

export default validtateOrderBody;
