//Date 
      let now = new Date();

      let date = now.getDate();
      let hours = now.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = now.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      let year = now.getFullYear();
      let days = [
        `Sunday`,
        `Monday`,
        `Tuesday`,
        `Wednesday`,
        `Thursday`,
        `Friday`,
        `Saturday,`
      ];
      let day = days[now.getDay()];
      let months = [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`
      ];
      let month = months[now.getMonth()];

// Hours for Forecasts
function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${hours}:${minutes}`;

}
// Search Form

function displayTemperature(response) {
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature")
    celsiusTemperature=response.data.main.temp;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML=response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML= response.data.weather[0].description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML= response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML= Math.round(response.data.wind.speed);

    let feelElement = document.querySelector("#feel");
    celsiusFeels=response.data.main.feels_like;
    feelElement.innerHTML=Math.round(celsiusFeels);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML =  `${day} ${month} ${date} ${year}, ${hours}:${minutes}`;
      
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
}
function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
 
    forecastElement.innerHTML  += `
    <div class="col-2">
    <h3>
    ${formatHours(forecast.dt * 1000)}
    </h3>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
    <div class="weather-forecast-temperature">
    <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°    
    </div>
    </div> 
    `
}
}

function search(city) {
    let apiKey="11c6b1943d69dd9ab2b79eb46ab8283b";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);

    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();

    let cityInputElement= document.querySelector("#city-input");
    search(cityInputElement.value);
}
// Conversion to Fahrenheit | Celsius
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
   let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

   let fahrenheitFeelsElement = document.querySelector("#feel");
   let fahrenheitFeels = (celsiusFeels * 9/ 5) + 32;
   fahrenheitFeelsElement.innerHTML = Math.round(fahrenheitFeels);


}
 function displayCelsiusTemperature(event) {
     event.preventDefault();
     fahrenheitLink.classList.remove("active");
     celsiusLink.classList.add("active");
     let temperatureElement = document.querySelector("#temperature");
     temperatureElement.innerHTML = Math.round(celsiusTemperature);

     let fahrenheitFeelsElement = document.querySelector("#feel");
     fahrenheitFeelsElement.innerHTML = Math.round(celsiusFeels);
 }

// Global Variables
let celsiusTemperature = null;
let celsiusFeels = null;

let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Auckland");