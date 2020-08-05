document.getElementById("green").style.backgroundColor = "green"
document.getElementById("yellow").style.backgroundColor = "yellow"
document.getElementById("red").style.backgroundColor = "red"


        let searches = JSON.parse(localStorage.getItem('searches')) || []
        let uvResulter = 0


       
        for (let i = 0; i< searches.length; i++) {
            let itemElem = document.createElement('li')
            itemElem.className = 'resultCity'
            itemElem.innerHTML = `
            ${searches[i].text}
            `
            document.getElementById('previous').append(itemElem)

        }

        document.getElementById('button').addEventListener('click', event => {
            event.preventDefault()
            console.log('clicked')
            

            let city = document.getElementById('input').value
            console.log(city)

            let cityObj = {
                        text: city
                    }
                    searches.push(cityObj)
                    localStorage.setItem('searches', JSON.stringify(searches))

                    let itemElem = document.createElement('li')
            itemElem.className = 'resultCity'
            itemElem.innerHTML = `
            ${city}
            `
            document.getElementById('previous').append(itemElem)


                    // let prev = JSON.parse(localStorage.getItem('searches'))
                    // document.getElementById('previous').innerHTML = `
                    // <li> ${prev} </li>
                    // `
                   
                    // location.reload()

                    

          

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1dd25ac798a84daed3b612ef4b3c9a3e`)
                .then(res => {
                    console.log(res.data)

                    let forecast = res.data.list

                   
                    document.getElementById('result').innerHTML = `
       <div>
            <h3 id="searchedCity" class="alert alert-primary" role="alert">${res.data.name}</h1>
            <h3 id="date">${moment().format('l')}</h2>
        </div>
<div>
<p id="today">
<ul class="list-group">
  <li id="today-weather">Weather: ${res.data.weather[0].description}</li>
  <li id="today-temp">Temperature: ${res.data.main.temp}</li>
  <li id="today-humidity">Humidity: ${res.data.main.humidity}</li>
  <li id="today-wind">Wind Speed: ${res.data.wind.speed}</li>
  <li id="today-coordinatesLon">Longitude: ${res.data.coord.lon}</li>
  <li id="today-coordinatesLat">Latitude: ${res.data.coord.lat}</li>
 </ul>
</p>
</div>
`
                    let lon = res.data.coord.lon
                    let lat = res.data.coord.lat
                   

                    axios.get(`https://api.openweathermap.org/data/2.5/uvi?appid=1dd25ac798a84daed3b612ef4b3c9a3e&lat=${lat}&lon=${lon}`)
                        .then(res => {
                            console.log(res.data)

                            event.preventDefault()
                            let uv = res.data.value
                            uvResulter = uv
                            document.getElementById('uvIndex').innerHTML = `
                           
                            <div>
<p id="today">
<ul class="list-group">
  <li id="today-weather">UV Index: ${res.data.value}</li>
 
 </ul>
</p>
</div>

                   
                    `
                            if (uv >= 0 && uv <= 2) { document.getElementById("uvIndex").style.backgroundColor = "green" }
                            else if (uv >= 3 && uv <= 5) { document.getElementById("uvIndex").style.backgroundColor = "yellow" }
                            else { document.getElementById("uvIndex").style.backgroundColor = "red" }

                  



                        })
                        .catch(err => { console.log(err) })





                })
                .catch(err => { console.log(err) })





            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=1dd25ac798a84daed3b612ef4b3c9a3e`)
                .then(res => {
                    let forecast = res.data.list
                   
                    document.getElementById('forecast').innerHTML = ''

           
                    for (let i = 5; i < forecast.length; i += 8) {

                        let forecastElem = document.createElement('div')
                        forecastElem.className = 'class="alert alert-warning" role="alert"'
                        forecastElem.id = `day${i}`

                        forecastElem.innerHTML = `
        <div class="alert alert-warning" role="alert">
          <h5 id="day${i}-day" class="card-title day${i}-day">${moment(forecast[i].dt_txt).format('dddd')}, ${moment(forecast[i].dt_txt).format('l')}</h5>
          <h6 id="day${i}-weather" class="card-subtitle mb-2 text-black">Weather: ${forecast[i].weather[0].description}</h6>
          <div class="card-text">
            <p id="day${i}-icon" class="text-center"><img src="http://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png"</p>
            <p id="day${i}-temp">Temperature: ${forecast[i].main.temp}</p>
            <p id="day${i}-humidity">Humidity: ${forecast[i].main.humidity}</p>
            <p id="day${i}-wind">Wind Speed: ${forecast[i].wind.speed}</p>
          </div>
        </div>
        <p> </p>
        `


                        document.getElementById('forecast').append(forecastElem)
                    }

                })
                .catch(err => { console.log(err) })
        })


