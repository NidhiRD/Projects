// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}


const weatherApi = {
    key :"049842aadcf31182326a2ca3bf9bcb92",
    baseUrl :"http://api.openweathermap.org/data/2.5/weather"
}

const searchinputBox = document.getElementById('input-box');


//event listener function on keypress
searchinputBox.addEventListener('keypress',(event) => {

    if (event.keyCode == 13) {
        console.log(searchinputBox.value);
        getWeatherReport(searchinputBox.value);
        document.querySelector('.weather-body').style.display ="block";
    }

});

//get weather report 

function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//show weather report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;


    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML =`${Math.floor(weather.main.temp_min)}&deg;C(min)/${Math.ceil(weather.main.temp_max)}&deg;C(max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent =='Rainy'){
        document.body.style.backgroundImage ="url('weather_pic/rainy.jpg')";

    } else   if(weatherType.textContent =='Clouds'){
        document.body.style.backgroundImage ="url('weather_pic/cloudy.jpg')";

    } else   if(weatherType.textContent =='Clear'){
        document.body.style.backgroundImage ="url('weather_pic/summer.jpg')";

    } else   if(weatherType.textContent =='Winter'){
        document.body.style.backgroundImage ="url('weather_pic/winter.jpg')";

    }
}

//Date Manage

function dateManage(dateArg) {

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let months =['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}