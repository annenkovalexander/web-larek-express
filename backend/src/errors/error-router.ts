import { Error as MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import BadRequestError from './bad-request-error';
import ConflictError from './conflict-error';
import NotFoundError from './not-found-error';

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Вы использовали не ту ссылку'));
};

export const errorRouter = (error: object, next: NextFunction) => {
  if (error instanceof MongooseError.ValidationError) {
    return next(new BadRequestError(error.message));
  } if (error instanceof Error && error.message.includes('E11000')) {
    return next(new ConflictError('Нельзя создать продукт с тем же названием'));
  } if (error instanceof Error && error.message.includes('Cannot POST')) {
    return next(new NotFoundError('Маршрут не найден'));
  }
  return next(error);
};
