import { prisma } from "~/server/prisma"; // use singleton

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params; // match file name [userId]
  return await prisma.car.findMany({
    where: { listerId: userId },
    select:{
        image: true,
        id: true,
        name: true,
        price: true,
    }
  });
});
