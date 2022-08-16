document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('form');
    const mess = document.querySelector('#mess');
    const search = document.querySelector("#loc");


    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const location = search.value

        document.querySelector("#mess").textContent = "Loading ..."
        console.log("Before")
        fetch('/weather?address=' + location)
        .then((response) => {
            console.log('After')
            console.log("Response", response)
            console.log(response.ok)
            if (response.ok == false){
                document.querySelector("#mess").innerHTML = data.status + ": " + data.statusText;
                return; 
            }
            response.json().then((data) => {
                console.log("Data")
                console.log(data)
                if (data.error){
                    document.querySelector("#mess").innerHTML = data.error
                }
                else {
                    document.querySelector("#mess").innerHTML = 'Location: ' + data.location + ' ; Forecast: ' + data.forecast
                }
            })
        })

    })
})

