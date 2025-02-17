const search = document.querySelector(".search");

search.addEventListener("click", () => {
  const city = document.querySelector(".city").value.trim();
  const image = document.querySelector(".image");
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".description");

  if (city === "") {
    image.style.display = "none";
    temperature.innerHTML = "";
    description.innerHTML = "";
    return;
  }

  const api_key = "api key here";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se encontró la ciudad");
      }
      return response.json();
    })
    .then((json) => {
      if (!json.weather || json.weather.length === 0) {
        console.error("No climate data available");
        return;
      }

      image.style.display = "block";

      switch (json.weather[0].main) {
        case "Clouds":
          image.src = "clouds.png";
          break;
        case "Haze":
        case "Mist":
          image.src = "mist.png";
          break;
        case "Rain":
          image.src = "rain.png";
          break;
        case "Snow":
          image.src = "snow.png";
          break;
        case "Clear":
          image.src = "sunny.png";
          break;
        default:
          image.src = "clouds.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
    })
    .catch((error) => {
      console.error("Error getting weather data", error);
      image.style.display = "none";
      temperature.innerHTML = "";
      description.innerHTML = "Place not found";
    });
});
