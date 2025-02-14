

async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj

}

async function getDashboardData(query) {

    try {
        const destinationPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
        const weathersPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
        console.log('Sto caricando la Dashboard', weathersPromise);


        const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

        const promises = [destinationPromise, weathersPromise, airportsPromise];

        const [destinations, weathers, airports] = await Promise.all(promises)

        const destination = destinations.find(dest => dest.name.toLowerCase() === query.toLowerCase())
        const weather = weathers.find(w => w.city.toLowerCase() === query.toLowerCase());
        const airport = airports.find(a => a.city.toLowerCase() === query.toLowerCase());

        return {
            city: destination?.name ?? null,
            country: destination?.country ?? null,
            temperature: weather?.temperature ?? null,
            weather: weather?.weather_description ?? null,
            airport: airport?.name ?? null
        }
    } catch (error) {
        throw new Error('Errore nel recupero dei dati :', error.message)
    }


}


getDashboardData('vienna')
    .then(data => {
        console.log('Dashboard Data', data);
        console.log(`${data.city} is in ${data.country} 
        Today there are ${data.temperature} degrees and the weather is ${data.weather}
        The main airport is ${data.airport}
        `);


    }).catch(error => console.error(error))