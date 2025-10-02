import { prisma } from "~/server/prisma";

export default defineEventHandler(async (event) => {
  const { city } = event.context.params;
  console.log("this is city", city);
  const { make, minPrice, maxPrice, page = 1, limit = 6 } = getQuery(event);

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

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where: filters,
      skip,
      take: limitNum,
    }),
    prisma.car.count({
      where: filters,
    }),
  ]);

  return {
    cars,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
});
