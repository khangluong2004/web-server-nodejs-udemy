const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const { Http2ServerRequest } = require('http2')


const app = express()

//Define paths
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")


//Define handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setting up statics
app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html'],
}));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Khang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Khang"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Need helps?",
        title: "Help Page",
        name: "Khang"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "No Address"
        })
    }

    geocode(address, (error, {latitude: lat, longitude: long, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast: forecastData, 
                location: location,
                address: address
            })
          })
    
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "Must provide a search term"
        })
    }

    res.send({
        products: []
    })
})

//Catch all other invalid url
app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: "404 PAGE",
        name: 'Khang',
        message: 'Help article not found'})
})

app.get('*', (req, res) => {
    res.render('404_page', {
        title: "404 PAGE",
        name: 'Khang',
        message: 'Page not found'})
})

// Setting up server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})