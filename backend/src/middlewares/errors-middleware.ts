import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = error.statusCode || 200;
  if (!error.statusCode && error.message && error.message.includes('Validation')) statusCode = 400;
  res.status(statusCode).send({ message: error.message });
};

export default errorMiddleware;
