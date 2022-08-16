const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=aba62589d0145f7f11f34f21c3eb727c&query=' + encodeURIComponent(address) + '&limit=1'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.data == undefined){
            callback('Error API', undefined)
        } 
        else if (response.body.data[0] == null) {
            callback("Invalid location", undefined)
        }
        else {
            const {latitude, longitude, label} = response.body.data[0]
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: label
            })
        }
    })
}

module.exports = geocode