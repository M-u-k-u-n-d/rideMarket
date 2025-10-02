export default async function (city, filters, page = 1, limit = 10) {
    const {data, error, refresh} = await useFetch(`/api/cars/${city}`, {
        params: {...filters, page, limit}, 
    });

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: 'Failed to fetch cars'
        })
    }

    return {data, refresh};
}
