document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('form');
    const mess = document.querySelector('#mess');
    const search = document.querySelector("#loc");


    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const location = search.value

        document.querySelector("#mess").textContent = "Loading ..."

        fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error){
                    document.querySelector("#mess").innerHTML = data.error
                } else {
                    document.querySelector("#mess").innerHTML = 'Location: ' + data.location + ' ; Forecast: ' + data.forecast
                }
            })
        })

    })
})

