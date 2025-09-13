import { prisma } from "~/server/prisma";

export default defineEventHandler(async (event) => {
  const { city } = event.context.params;
  console.log("this is city", city);
  const { make, minPrice, maxPrice } = getQuery(event);

  const filters = {};

  if (city) {
    filters.city = { equals: city.toLowerCase(), mode: "insensitive" };
  }
  if (make) {
    filters.make = { equals: make.toLowerCase(), mode: "insensitive" };
  }
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.gte = parseFloat(minPrice);
    if (maxPrice) filters.price.lte = parseFloat(maxPrice);
  }

  return  prisma.car.findMany({
    where: filters,
  });
});
