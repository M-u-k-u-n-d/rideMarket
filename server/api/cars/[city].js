import cars  from '@/data/cars';

export default defineEventHandler(async (event) => {
    const {city} = event.context.params;
    console.log("this is city",city);
    const {make,minPrice,maxPrice} = getQuery(event);
    let filteredCars = cars;
    if (city) {
        filteredCars = cars.filter(car => car.city.toLowerCase() === city.toLowerCase());
    }
    if (make) {
        filteredCars = filteredCars.filter(car => car.make.toLowerCase() === make.toLowerCase());
    }
    if (minPrice) {
        filteredCars = filteredCars.filter(car => car.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredCars = filteredCars.filter(car => car.price <= parseFloat(maxPrice));
    }
    
    return filteredCars;
});