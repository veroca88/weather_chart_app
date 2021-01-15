const axios = require('axios')

const geoCode = (address, callback) => {
    const key = process.env.API_MAPBOX
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`

    axios.get(geoUrl)
        .then(response => {
            response.data.features[0] === undefined || response.data.query[0] === 'undefined'? 
                callback('Unable to find location, try another search!', undefined)
            : 
                callback(undefined, {
                location: response.data.features[0].text
            })
        })
        .catch(error => {
            if(error) {
                callback('Unable to connect to location services!', undefined)
            }})
}

module.exports = geoCode
