
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
    dateElement.innerHTML =  `${day} ${month} ${date} ${year}, ${hours}:${minutes}`;
      
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
}
let apiKey="11c6b1943d69dd9ab2b79eb46ab8283b";
let city="auckland";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
