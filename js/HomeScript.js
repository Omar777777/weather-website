const navList = document.querySelectorAll('.nav-item a');
const searchLocation = document.getElementById('searchLocation');
let http = new XMLHttpRequest();
let locationFromSearch;
let finallocation;


let nowdate;
let nextdate;
let afternextdate;
const dayarray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const montharray = ['January','February','March','April','May','June','July','August','September','October','November','December'];



let cityName = document.getElementById('cityName');
let currenttemp = document.getElementById('currenttemp');
let weatherdesc = document.getElementById('weatherdesc');
let currentweathericon = document.getElementById('currentweathericon');
let currentdayName = document.getElementById('currentdayName');
let currentdayinmonth = document.getElementById('currentdayinmonth');
let currentmonth = document.getElementById('currentmonth');



let nextdayinweek = document.getElementById('nextdayinweek');
let nextDayWeatherIcon = document.getElementById('nextDayWeatherIcon');
let nextDayWeatherStatus = document.getElementById('nextDayWeatherStatus');
let nextDayMaxTemp = document.getElementById('nextDayMaxTemp');
let nextDayMinTemp = document.getElementById('nextDayMinTemp');



let afterNextDayInWeek = document.getElementById('afterNextDayInWeek');
let afterNextDayWeatherIcon = document.getElementById('afterNextDayWeatherIcon');
let afterNextDayWeatherStatus = document.getElementById('afterNextDayWeatherStatus');
let afterNextDayMaxTemp = document.getElementById('afterNextDayMaxTemp');
let afterNextDayMinTemp = document.getElementById('afterNextDayMinTemp');

window.addEventListener('load', function () {

  http.open('get', `https://api.weatherapi.com/v1//forecast.json?key=07078a18d5784a4a8b753124241512&q=cairo&days=3`);
    http.send();
});



http.addEventListener('readystatechange', function () {   
    if (http.status == 200 && http.readyState == 4) {
        finallocation = JSON.parse(http.response);
        console.log(finallocation);
        ReplaceAPIValues();   

    }
});


searchLocation.addEventListener('input', function () {

locationFromSearch = searchLocation.value;
http.open('get', `https://api.weatherapi.com/v1//forecast.json?key=07078a18d5784a4a8b753124241512&q=${locationFromSearch}&days=3`);
    http.send();
    
    
});


function ReplaceAPIValues() {

    cityName.innerText = finallocation.location.name;
    currenttemp.innerText = finallocation.current.temp_c;
    weatherdesc.innerText = finallocation.current.condition.text;
    currentweathericon.src = `https://${finallocation.current.condition.icon}`;
    nowdate = new Date(finallocation.location.localtime);
    currentdayName.innerText = dayarray[nowdate.getDay()];
    currentdayinmonth.innerText = nowdate.getDate();
    currentmonth.innerText = montharray[nowdate.getMonth()];


    nextdate = new Date(finallocation.forecast.forecastday[1].date);
    nextdayinweek.innerText = dayarray[nextdate.getDay()];
    nextDayWeatherIcon.src = `https://${finallocation.forecast.forecastday[1].day.condition.icon}`;
    nextDayWeatherStatus.innerText = finallocation.forecast.forecastday[1].day.condition.text;
    nextDayMaxTemp.innerText = finallocation.forecast.forecastday[1].day.maxtemp_c;
    nextDayMinTemp.innerText = finallocation.forecast.forecastday[1].day.mintemp_c;
    
    

    afternextdate = new Date(finallocation.forecast.forecastday[2].date);
    afterNextDayInWeek.innerText = dayarray[afternextdate.getDay()];
    afterNextDayWeatherIcon.src = `https://${finallocation.forecast.forecastday[2].day.condition.icon}`;
    afterNextDayWeatherStatus.innerText = finallocation.forecast.forecastday[2].day.condition.text;
    afterNextDayMaxTemp.innerText = finallocation.forecast.forecastday[2].day.maxtemp_c;
    afterNextDayMinTemp.innerText = finallocation.forecast.forecastday[2].day.mintemp_c;

}




//To Remove Active Class From anchor Tages
function RemoveActiveFromNavList() {

    for (let i = 0; i < navList.length; i++){
        navList[i].classList.remove('active');
    }
    
}

// To Add Active Class To Clicked anchor Tages
navList.forEach((navigationList) => {
    navigationList.addEventListener('click', function (e) {

        RemoveActiveFromNavList();
        let navigationItem = e.target;
        navigationItem.classList.add('active');
    })
});

