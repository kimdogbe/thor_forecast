const apiKey = 'V6WW2UCQDJ3WU8WGJWSKGBS6X';
const rainGif = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjNseDBuemlzZHRyMDhoZXZxOTN5cDhzbWw0bzV1dW5weDNnZmx1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9DPAG03SyJ3LEwwM/giphy.webp'
const sunGif = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjNpa3F0cHJtY2VmemU5ZnhtZjV4NXd0aG5vcmZicnlmaTNsemJvcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j3RXuSbpXER4hCeX5F/giphy.webp'
const overcastGif = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3dhaTN0NXFhaDFpMGN4YW81bGl4dzhiNDAycWVsMHNxaWtzOGFxaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBXNPw0XBdF1n82BBf/giphy.webp'


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

// getWeather();

