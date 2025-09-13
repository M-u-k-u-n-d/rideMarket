import { prisma } from "~/server/prisma";


export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    console.log( "this is id => ",id);
    const car = await prisma.car.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if(!car) {
        throw createError({
            statusCode: 404,
            statusMessage: `Car with Id of ${id} does not exists.`
        });
    }
    return car;
});
