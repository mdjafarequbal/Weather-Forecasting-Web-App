const apiKey = "c1da303d2238ab45da341ca788934c4b";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("weatherResult");

  if (city === "") {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  // ✅ Fix: URL must be inside backticks (template string)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      resultBox.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      `;
    })
    .catch((error) => {
      // ✅ Fix: This line needs quotes around the HTML
      resultBox.innerHTML = ` <p>${error.message}</p> `;
    });
}