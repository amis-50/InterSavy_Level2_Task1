// state
let currCity = "Maharashtra";
let units = "metric";

const weatherBackgrounds = {
    Clear: 'https://i.pinimg.com/originals/68/cd/7e/68cd7e953f4c828b4a4570bf86ee91d0.jpg',
    Haze: 'https://i0.wp.com/www.gamerfocus.co/wp-content/uploads/2021/12/MF-Ghost-anime-2023-gamerfocus-2.jpg?fit=1024%2C576&ssl=1',
    Clouds: 'https://w0.peakpx.com/wallpaper/307/9/HD-wallpaper-the-weathering-with-you-top-35-best-he-weathering-with-you-background-weathering-with-you-scenery.jpg',
    Rain: 'https://media.tenor.com/hL-Z4u6R_KgAAAAC/rain-weathering-with-you.gif',
};

//new 7 day weather
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weatherData = [
    { day: "Sunday", weather: "Clouds", temperature: "29°", icon: "04d" },
    { day: "Monday", weather: "Clear", temperature: "22°", icon: "01d" },
    { day: "Tuesday", weather: "Clouds", temperature: "20°", icon: "02d" },
    { day: "Wed...", weather: "Rain", temperature: "19°", icon: "10d" },
    { day: "Thursday", weather: "Rain", temperature: "26°", icon: "10d" },
    { day: "Friday", weather: "Haze", temperature: "27°", icon: "50d" },
    { day: "Saturday", weather: "Clouds", temperature: "29°", icon: "02d" },

];

const cardContainer = document.getElementById('cardContainer');

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric" 
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone) {
    const date = new Date(timestamp * 1000);
    const offsetHours = Math.floor(timezone / 3600);
    const offsetMinutes = Math.abs(timezone % 3600) === 0 ? 0 : (Math.abs(timezone % 3600) / 60); 
    
    date.setHours(date.getHours() + offsetHours);
    date.setMinutes(date.getMinutes() + offsetMinutes);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    return date.toLocaleString("en-US", options);
}


 

// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}


document.addEventListener('DOMContentLoaded', async () => {
    await getWeather();
});

async function getWeather() {
const API_KEY = '45139f1645aac766f6110375a37120a4'


    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`);
        if (response.ok) {
            const data = await response.json();
            // Update your DOM elements with data
            console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weather__humidity.innerHTML = `${data.main.humidity}%`
    weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
    weather__pressure.innerHTML = `${data.main.pressure} hPa`

    // Update the background image based on the weather condition
    const weatherCondition = data.weather[0].main;


    const backgroundImage = weatherBackgrounds[weatherCondition];
    if (backgroundImage) {
        const weatherContainer = document.querySelector('.containerr'); // Target the container with the class "container"
        weatherContainer.style.background = `url(${backgroundImage}) no-repeat center center`;
        weatherContainer.style.backgroundSize = 'cover';
        
    } 
        } else {
            console.error('API request failed:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


document.body.addEventListener('load', getWeather())


// .....................YOUTUBE VIDEO .........................

const apiKey = 'AIzaSyBYJv-M14swQJorLvTo6Vg2qIdJrdx5THk';
        const searchQuery = 'weather news of India';

        const videoContainer = document.getElementById('videoContainer');

     
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchQuery}&part=snippet&type=video&maxResults=10`)
            .then(response => response.json())
            .then(data => {
                const videos = data.items;

                videos.forEach(video => {
                    const videoCard = document.createElement('div');
                    videoCard.classList.add('video-card');

                    const thumbnail = video.snippet.thumbnails.medium.url;
                    const title = video.snippet.title.length > 40 ? video.snippet.title.substring(0, 40) + '...' : video.snippet.title;
                    const videoId = video.id.videoId;

                    videoCard.innerHTML = `
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${thumbnail}" alt="${title}" width="270" height="169">
                            <h3 class="video-title">${title}</h3>
                        </a>
                    `;

                    videoContainer.appendChild(videoCard);
                });
            })
            .catch(error => console.error('Error fetching videos:', error));

            //.......................new 7 day weather.........................

            
weatherData.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
    card.innerHTML = `
        <div class="card m-3 bg-color-card" style="width: 10rem;">
            <div class="card-body d-flex flex-column justify-content-between">
                <h4 class="card-title">${data.day}</h4>
                <h5 class="card-subtitle mb-2 text-body-secondary">${data.weather}</h5>
                <h3>${data.temperature}</h3>
                <div class="d-flex justify-content-center align-items-center">
                    <img src="http://openweathermap.org/img/wn/${data.icon}.png" alt="weather icon" class="img-fluid weather-icon">
                </div>
            </div>
        </div>
    `;
    cardContainer.appendChild(card);
});