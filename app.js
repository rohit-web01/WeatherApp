let container = document.querySelector(".container")
let search = document.querySelector(".search");
let weatherBox = document.querySelector(".weather-box");
let weatherDetails = document.querySelector(".weather-details");
let error404 = document.querySelector(".not-found");

search.addEventListener("click", ()=>{
    let city = document.querySelector(".city").value;
    if(city == ''){
        alert("Enter A City Name First...");
    }else{
        getWeather(city);
    }
});

async function getWeather(city){
    const API_KEY = "477f97aa29fe574f916f1e41d1296603";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    updateUI(data);
}

function updateUI(data){
    if(data.cod == '404'){
        container.style.height = '450px';
        error404.classList.remove('hidden');
        weatherBox.classList.add("hidden");
        weatherDetails.classList.add("hidden");
        return;
    }

    error404.classList.add('hidden');
    container.style.height = '530px'; 
    weatherBox.classList.remove("hidden");
    weatherDetails.classList.remove("hidden");
    

    let image = document.querySelector('.weather-box img');
    let temperature = document.querySelector('.weather-box .temperature .temp');
    let description = document.querySelector('.weather-box .description');
    let humidity = document.querySelector('.humidity .humi');
    let wind = document.querySelector('.wind .wi');

    switch (data.weather[0].main){
        case 'Clear':
            image.src = 'images/clear.png';
            break;

        case 'Clouds':
            image.src = 'images/cloud.png';
            break;

        case 'Mist':
            image.src = 'images/mist.png';
            break;

        case 'Rain':
            image.src = 'images/rain.png';
            break;
    
        case 'Snow':
            image.src = 'images/snow.png';
            break;

        case 'Haze':
            image.src = 'images/mist.png';

        default:
            image.src = 'images/cloud.png';
            break;
    }

    temperature.textContent = Math.floor(data.main.temp);
    description.innerHTML = data.weather[0].description;
    humidity.textContent = data.main.humidity+'%';
    wind.textContent = data.wind.speed+' Km/h';

}