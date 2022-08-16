document.addEventListener('DOMContentLoaded', () => {
    console.log("Client side JS loaded")

    const weatherForm = document.querySelector('form')
    const search = document.querySelector("#loc")

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const location = search.value

        document.querySelector("#forecast").textContent = "Loading ..."

        fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error){
                    document.querySelector("#forecast").innerHTML = data.error
                } else {
                    document.querySelector("#forecast").innerHTML = 'Location: ' + data.location + ' ; Forecast: ' + data.forecast
                }
            })
        })

    })
})

