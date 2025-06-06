import Joi from 'joi';
import mongoose from 'mongoose';

export interface IProduct {
  title: string;
  image: { fileName: string, originalName: string; };
  category: string;
  description: string;
  price: number | null;
}

export const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    unique: true,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
  },
  image: {
    type: Object,
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  category: {
    type: String,
    required: [true, 'Поле "categerory" должно быть заполнено'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);

export const orderSchema = Joi.object({
  total: Joi.number().required(),
  items: Joi.array().unique().required(),
  payment: Joi.string().allow('online', 'card').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required().messages({
    'string.base': '"title" should be a type of \'text\'',
    'string.empty': '"title" cannot be empty',
    'string.min': '"title" should have at least {#limit} characters',
    'string.max': '"title" should have at most {#limit} characters',
    'any.required': '"title" is required',
  }),
});
