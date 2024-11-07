const apiKey = 'V6WW2UCQDJ3WU8WGJWSKGBS6X';

async function getWeather(location='bristol') {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    // const gifUrl = data.data.images.preview_webp.url;

    console.log(data);
    processWeatherData(data);
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
}

getWeather();

