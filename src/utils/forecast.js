const request = require('postman-request')


const forecast = (long, lat, callback) => {
    const insert = lat.toString() + ',' + long.toString()
    const url = 'http://api.weatherstack.com/current?access_key=9d524b0afa4c56288dcfbefbdc5b7ed4&query='+ insert +'&units=s'
    request({url, json:true}, (error, response) =>{
        if (error) {
            callback('Unable to connect', undefined)
        }
        else if (response.body.error){
            callback('Invalid coordinate', undefined)
        }
        else {
            const {weather_descriptions: weather, temperature: temp, feelslike: like, wind_speed} = response.body.current
            callback(undefined, response.body.location.name + ' : ' + weather[0] +  ". It is currently " + temp + 
            " degrees K out. It feels like " + like + " degrees K out. The wind speed is " + wind_speed + " km/h.")
        }
    })
}

module.exports = forecast