function formatDate(timestamp) {
    let date = new Date(timestamp);
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
      let month = months[date.getMonth()];
    let year = date.getFullYear();
    let now=date.getDate();
    let hours = date.getHours();

    if (hours <10) {
        hours = `0${hours}`;
    } 

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     
    let day= days[date.getDay()];
    return `${day}, ${month} ${now} ${year}, ${hours}:${minutes}`;
      

}

function displayTemperature(response) {
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML=Math.round(response.data.main.temp);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML=response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML= response.data.weather[0].description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML= response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML= Math.round(response.data.wind.speed);

    let feelElement = document.querySelector("#feel");
    feelElement.innerHTML=Math.round(response.data.main.feels_like);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey="11c6b1943d69dd9ab2b79eb46ab8283b";
let city="Bamberg";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
