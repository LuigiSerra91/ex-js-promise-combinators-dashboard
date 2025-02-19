// Esercizio 1

//In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
//Nome completo della città e paese da  /destinations?search=[query]
//(result.name, result.country, nelle nuove proprietà city e country).
//Il meteo attuale da /weathers?search={query}
//(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
//Il nome dell’aeroporto principale da /airports?search={query}
//(result.name nella nuova proprietà airport).
//Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.






async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj

}

async function getDashboardData(query) {

    try {
        const destinationPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
        const weathersPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
        const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

        const promises = [destinationPromise, weathersPromise, airportsPromise];

        const [destinations, weathers, airports] = await Promise.all(promises)

        const destination = destinations[0]
        const weather = weathers[0]
        const airport = airports[0]

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


getDashboardData('london')
    .then(data => {
        console.log('Dashboard Data', data);
        console.log(`${data.city} is in ${data.country} 
        Today there are ${data.temperature} degrees and the weather is ${data.weather}
        The main airport is ${data.airport}
        `);


    }).catch(error => console.error(error))



