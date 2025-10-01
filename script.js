const weatherBox = document.getElementById('weather');

document.getElementById('search').onclick = async () => {
  const city = document.getElementById('city').value.trim();
  if (!city) return alert("Enter a city name");

  try {
    // Using wttr.in free API (no API key required)
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather");
    const data = await res.json();

    const current = data.current_condition[0];
    const area = data.nearest_area[0];
    weatherBox.innerHTML = `
      <h2>${area.areaName[0].value}, ${area.country[0].value}</h2>
      <p>🌡 Temp: ${current.temp_C} °C</p>
      <p>💧 Humidity: ${current.humidity}%</p>
      <p>🌬 Wind: ${current.windspeedKmph} km/h</p>
      <p>☁ Condition: ${current.weatherDesc[0].value}</p>
    `;
  } catch (err) {
    weatherBox.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
};
