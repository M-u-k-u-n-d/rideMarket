import cars from "@/data/cars.json";

export default defineEventHandler((event) => {
    const { id } = event.context.params;
    console.log( "this is id => ",id);
    const car = cars.find((car) => car.id === parseInt(id));

    if(!car) {
        throw createError({
            statusCode: 404,
            statusMessage: `Car with Id of ${id} does not exists.`
        });
    }
    return car;
});
