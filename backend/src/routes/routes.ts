import { Router } from 'express';
import { Segments, celebrate } from 'celebrate';
import { getProducts, createProduct } from '../controllers/products-controller';
import orderProduct from '../controllers/orders-controller';
import { orderSchema } from '../models/models';
import validtateOrderBody from '../middlewares/validate-product-body';

const router = Router();
const orderRouter = Router();

const orderValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

router.get('/', getProducts);

router.post('/', createProduct);

orderRouter.post('/', orderValidator, validtateOrderBody, orderProduct);

export { router, orderRouter };
