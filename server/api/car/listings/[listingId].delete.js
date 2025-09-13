import { prisma } from "~/server/prisma"; // use singleton

export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params; // match file name [userId]
  return await prisma.car.delete({
    where: { id: parseInt(listingId) },
  })
});
