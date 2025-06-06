import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';


export const orderProduct = (req: Request, res: Response) => {
  res.status(200).send({
    id: faker.string.uuid(),
    total: req.body.total,
  });
};