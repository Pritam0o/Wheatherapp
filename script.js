const apiKey = "5cb722eb37e04bd8cf72e3d6f9bb1447"; // Replace with your actual OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

// Add event listener
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector(".weather-info h2").innerHTML = data.name;
    document.querySelector(".weather-info p:nth-of-type(1)").innerHTML = `Temperature: ${data.main.temp}°C`;
    document.querySelector(".weather-info p:nth-of-type(2)").innerHTML = `Condition: ${data.weather[0].main}`;
    document.querySelector(".humidity p").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind p").innerHTML = `Wind speed: ${data.wind.speed} km/h`;

    
    const condition = data.weather[0]?.main?.toLowerCase() || "";

    switch (condition) {
      case "clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "haze":
         weatherIcon.src = "images/mist.png";
         break;
      case "tornado":
         weatherIcon.src = "images/tornado.png";
         break;
      case "dust":
         weatherIcon.src = "images/humidity.png";
          break;
      default:
        weatherIcon.src = "images/default.png"; // fallback
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}
