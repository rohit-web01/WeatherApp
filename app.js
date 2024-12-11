let search = document.querySelector(".search");

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
    let image = document.querySelector('.weather-box img');
    let temperature = document.querySelector('.weather-box .temperature .temp');
    let description = document.querySelector('.weather-box .description');
    let humidity = document.querySelector('.humidity .humi');
    let wind = document.querySelector('.wind .wi');

    switch (data.weather[0].main){
        case 'Clear':
            image.src = 'images/clear.png';
            break;

        case 'Cloud':
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

        default:
            break;
    }

    temperature.textContent = Math.floor(data.main.temp);
    description.textContent = data.weather[0].main;
    humidity.textContent = data.main.humidity+'%';
    wind.textContent = data.wind.speed+' Km/h';

}