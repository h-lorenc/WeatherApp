const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const getWeather = () => {
	const API_LINK = 'http://api.openweathermap.org/geo/1.0/direct?q=';
	const API_ID = '&appid=';
	const API_KEY = '901190213f28f336f82c7ca1b2e4d10d';
	const city = input.value || 'Warszawa';
	const URL = API_LINK + city + API_ID + API_KEY;

	axios
		.get(URL)
		.then(res => {
			const API_LAT = res.data[0].lat;
			const API_LON = res.data[0].lon;

			const API_LINK_2 = 'https://api.openweathermap.org/data/2.5/weather?';

			const URL2 =
				API_LINK_2 +
				'lat=' +
				API_LAT +
				'&lon=' +
				API_LON +
				'&lang=pl' +
				'&appid=' +
				API_KEY +
				'&units=metric';

			axios.get(URL2).then(res => {
				temperature.textContent = Math.floor(res.data.main.temp) + '°C';
				cityName.textContent = city;
				humidity.textContent = res.data.main.humidity + '%';
				weather.textContent = res.data.weather[0].description;
				warning.textContent = '';
				input.value = '';
				const iconId = res.data.weather[0].id;
				if (iconId >= 200 && iconId < 300) {
					photo.setAttribute('src', './img/thunderstorm.png');
				} else if (iconId >= 300 && iconId < 400) {
					photo.setAttribute('src', './img/drizzle.png');
				} else if (iconId >= 500 && iconId < 600) {
					photo.setAttribute('src', './img/rain.png');
				} else if (iconId >= 600 && iconId < 700) {
					photo.setAttribute('src', './img/ice.png');
				} else if (iconId >= 700 && iconId < 800) {
					photo.setAttribute('src', './img/fog.png');
				} else if (iconId === 800) {
					photo.setAttribute('src', './img/sun.png');
				} else if (iconId > 800 && iconId < 900) {
					photo.setAttribute('src', './img/cloud.png');
				} else {
					photo.setAttribute('src', './img/unknown.png');
				}
			});
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
};

const checkEnter = e => {
	if (e.key === 'Enter') {
		getWeather();
	}
};


input.addEventListener('keyup', checkEnter)
button.addEventListener('click', getWeather);
getWeather();
