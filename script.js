const apiKey = 'V6WW2UCQDJ3WU8WGJWSKGBS6X';
const searchBtn = document.querySelector('#search-button');
const searchBox = document.querySelector('#search-box');
const loader = document.querySelector('.loader');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (searchBox.value !== ''){
    loader.style.display = 'block'
    createCards(searchBox.value);
  }
});


async function getWeather(location='bristol') {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return processWeatherData(data);
  }
  catch (error) {
    console.error(error.message);
  }
}

function processWeatherData (weatherData) {
  const lat = weatherData.latitude;
  const long = weatherData.longitude;
  const fullLocation = weatherData.resolvedAddress;
  const weatherDescription = weatherData.description;
  const currentConditions = weatherData.currentConditions;

  const dailyWeather = weatherData.days;
  
  console.log(`Forcast for ${fullLocation} at Longitude: ${long}, Latitude: ${lat}`);
  return {lat, long, fullLocation, weatherDescription, currentConditions, dailyWeather};
}

function createWeatherCard (data, index) {
  const date = document.createElement('div');
  const conditions = document.createElement('div');
  const highTemp = document.createElement('div');
  const lowTemp = document.createElement('div');
  const precip = document.createElement('div');

  date.className = 'date';
  conditions.className = 'conditions';
  highTemp.className = 'high-temp';
  lowTemp.className = 'low-temp';
  precip.className = 'precip';

  date.textContent = new Date(data.datetime).toDateString().slice(0, -5);
  conditions.textContent = data.conditions;
  highTemp.textContent = 'High ' + data.tempmax + '°C';
  lowTemp.textContent = 'Low ' + data.tempmin + '°C';
  precip.textContent = data.precipprob + '%'

  const img = document.createElement('img');
  img.src = selectWeatherGif(data.conditions);

  const card = document.createElement('div');
  card.className = 'card day-' + index;
  card.append(date, conditions, highTemp, lowTemp, precip, img);
  return card;
}

function selectWeatherGif (conditions) {
  const rainGif = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjNseDBuemlzZHRyMDhoZXZxOTN5cDhzbWw0bzV1dW5weDNnZmx1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9DPAG03SyJ3LEwwM/giphy.webp';
  const sunGif = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjNpa3F0cHJtY2VmemU5ZnhtZjV4NXd0aG5vcmZicnlmaTNsemJvcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3RXuSbpXER4hCeX5F/giphy.webp';
  const overcastGif = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3dhaTN0NXFhaDFpMGN4YW81bGl4dzhiNDAycWVsMHNxaWtzOGFxaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBXNPw0XBdF1n82BBf/giphy.webp';
  const whoKnowsGif = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmxlOWZweGkwdTRscmZoZXd2d295OHB2emxsYnNwYWpvaW9oZzRzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4HnRkHk77nStQSGxgi/giphy.webp';
  if (conditions.toLowerCase().includes('clear')){
    return sunGif;
  }
  else if (conditions.toLowerCase().includes('rain')){
    return rainGif;
  }
  else if (conditions.toLowerCase().includes('cloud') 
          || conditions.toLowerCase().includes('overcast')){
    return overcastGif;
  }
  else {
    return whoKnowsGif;
  }
}

function updateLocationCard (weatherData) {
  const card = document.querySelector('#location-card');
  const location = document.querySelector('#city-name');
  const longLat = document.querySelector('#long-lat');
  const sunrise = document.querySelector('#sunrise');
  const sunset = document.querySelector('#sunset');
  const description = document.querySelector('#description');

  const sunriseImg = document.createElement('img');
  const sunsetImg = document.createElement('img');
  sunriseImg.src = './images/sunrise.png';
  sunsetImg.src = './images/sunset.png';
  
  location.textContent = 'Location: ' + weatherData.fullLocation;
  longLat.textContent = 'Coordinates: ' + weatherData.long + ',' + weatherData.lat;

  sunrise.innerHTML = '';
  sunrise.appendChild(sunriseImg);
  sunset.innerHTML = '';
  sunset.appendChild(sunsetImg);
  sunrise.innerHTML += " " + weatherData.currentConditions.sunrise;
  sunset.innerHTML += " " + weatherData.currentConditions.sunset;

  description.textContent = weatherData.weatherDescription;

  card.append(location, longLat, sunrise, sunset, description);
}

async function createCards (city) {
  const weatherCards = document.querySelector('#weather-cards');
  weatherCards.textContent = '';

  const weatherData = await getWeather(city);
  console.log(weatherData);
  updateLocationCard(weatherData);

  weatherData.dailyWeather.forEach((element, index) => {
    console.log(index, element);
    weatherCards.append(createWeatherCard(element, index));
  });
  loader.style.display = 'none';
}

