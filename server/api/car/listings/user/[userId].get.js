import { prisma } from "~/server/prisma";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const { page = 1, limit = 6 } = getQuery(event);

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const [listings, total] = await Promise.all([
    prisma.car.findMany({
      where: { listerId: userId },
      select:{
        image: true,
        id: true,
        name: true,
        price: true,
      },
      skip,
      take: limitNum,
    }),
    prisma.car.count({
      where: { listerId: userId },
    }),
  ]);

  return {
    listings,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
});
