import Joi from "joi";
import { defineEventHandler, readBody, createError } from "h3";
import { prisma } from "~/server/prisma"; // import singleton

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().integer().min(1886).max(new Date().getFullYear() + 1).required(),
  miles: Joi.number().integer().min(0).required(),
  city: Joi.string().min(2).required(),
  numberOfSeats: Joi.number().integer().max(100).min(1).required(),
  description: Joi.string().min(10).required(),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().uri().required(),
  listerId: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().min(2).required(),
}).required();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { error, value } = schema.validate(body);

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message });
  }

  const car = await prisma.car.create({ data: value });
  return car;
});
