import { prisma } from "~/server/prisma"; // singleton Prisma client

export default defineEventHandler(async (event) => {
    const listingId = getRouterParam(event, "listingId"); // safer way
  return await prisma.message.findMany({
    where : {
        listingId: parseInt(listingId)
    }
  });
});
