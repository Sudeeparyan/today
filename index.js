let weather_data;
let weather;

fetch("../assets/data.json")
  .then((data) => data.json())
  .then((result) => {
    weather_data = result;
    create_dropdown();
  }); 

function initCity(){  
  weather = Object.keys(weather_data);
  document.querySelector("#datalist").value=weather[0];
  console.log(document.querySelector("#datalist").value); 
  callChange();
}

function create_dropdown() {
  weather = Object.keys(weather_data);
  let option = "";
  for (let i = 0; i < weather.length; i++) {
    option += `<option>${weather[i]}</option>`;
  }
  document.querySelector("#datalist_dropdown").innerHTML = option; 
}

function changeToFarenheit(temp) {
  let slicedTemp = temp.slice(0, -2);
  //console.log("this is fahrenheit" + slicedTemp);
  return ((9 / 5) * slicedTemp + 32).toFixed(0) + " F";
} 

function SetNullParams(){ 
    document.querySelector("#temp-c-bottom").innerHTML="-";
    document.querySelector("#farenheit").innerHTML="-";
    document.querySelector("#humidity").innerHTML="-";
    document.querySelector("#precipitation").innerHTML="-";
    document.querySelector("#date").innerHTML="";
    document.querySelector("#time").innerHTML="Enter a valid City"; 
    document.querySelector("#datalist").style.borderColor = "red";
    document.querySelector("#time").style.color = "red";
    document.querySelector("#logo").src="../assets/city-icons/weather-app.png";
    for(let i=0;i<6;i++){
      document.querySelector(`#hourly-time-${i + 1}`).innerHTML = "-"; 
      document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/sad.png"; 
      document.querySelector(`#temperature-${i + 1}`).innerHTML = "-";
    }
}

function changeparams() {    

  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //console.log(weather_data);
  weather = Object.keys(weather_data);

  //console.log(weather_data);
  let currentCity = document.querySelector("#datalist").value; 



  let imageSrc = document.querySelector("#logo");
  imageSrc.src = `../assets/city-icons/${currentCity}.svg`;

  let temperature = document.querySelector("#temp-c-bottom");
  let farenheit = document.querySelector("#farenheit");
  let humidity = document.querySelector("#humidity");
  let precipitation = document.querySelector("#precipitation");
  let date = document.querySelector("#date");
  let time = document.querySelector("#time");
  
  temperature.innerHTML = weather_data[`${currentCity}`].temperature;
  farenheit.innerHTML = changeToFarenheit(
    weather_data[`${currentCity}`].temperature
  );
  humidity.innerHTML = weather_data[`${currentCity}`].humidity;
  precipitation.innerHTML = weather_data[`${currentCity}`].precipitation;

  let dateAndTime = weather_data[`${currentCity}`].dateAndTime;
  let dateAndTimeArr = dateAndTime.split(",");
  let dateInMonth = dateAndTimeArr[0].split("/");
  let dateInMonths = String(dateInMonth[1].padStart(2, "0")) + "-" + monthArr[dateInMonth[0] - 1] + 
  "-" + dateInMonth[2]; 
  date.innerHTML = dateInMonths;
  time.innerHTML=dateAndTimeArr[1];
  let timeZone = weather_data[`${currentCity}`].timeZone; 
  var currTime = new Date().toLocaleString("en-US", {
        timeZone: timeZone,
        timeStyle: "medium",
        hourCycle: "h12",
      });
  time.innerHTML = currTime;  
  time.style.color = "#ffe5b4";
  let hour = parseInt(currTime.split(":")[0]);
  let noon = currTime.split(" ")[1]; 
  
  for(let i=0;i<6;i++){ 
    if(hour>12) 
    {
        hour=hour-12;
    }
    if (i==0){
      document.querySelector(`#hourly-time-${i + 1}`).innerHTML = 'NOW';
    } 
    else{
      document.querySelector(`#hourly-time-${i + 1}`).innerHTML = hour + " " + noon;
    }
    
    if(hour==11 && noon=='PM')
    {
        noon="AM"; 
        hour=12;
    }  
    else if(hour==11 && noon=='AM'){
        hour=12; 
        noon="PM";
    }
    else{ 
        hour++;
    } 
  }
    


  let sixHoursTemp = [parseInt(weather_data[`${currentCity}`].temperature.slice(0,-2)),
                        parseInt(weather_data[`${currentCity}`].temperature.slice(0,-2))]; 
  for(let i=0;i<4;i++){
    sixHoursTemp[i+2]=parseInt(weather_data[`${currentCity}`].nextFiveHrs[i].slice(0,-2));
  } 

  for(let i=0;i<6;i++){
    document.querySelector(`#temperature-${i+1}`).innerHTML=sixHoursTemp[i];
  }  

  for (let i = 0; i < 6; i++) { 
    if(sixHoursTemp[i]<0){
      document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/snowflakeIcon.svg";
    }
    else if(sixHoursTemp[i]<18 && sixHoursTemp[i]>0){
        document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/rainyIcon.svg";
    } 
    else if(sixHoursTemp[i]>=18 && sixHoursTemp[i]<=22){
        document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/windyIcon.svg";
    } 
    else if(sixHoursTemp[i]>=18 && sixHoursTemp[i]<=22){
        document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/windyIcon.svg";
    } 
    else if(sixHoursTemp[i]>=23 && sixHoursTemp[i]<=29){
        document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/cloudyIcon.svg";
    } 
    else if(sixHoursTemp[i]>29){
        document.querySelector(`#icon-weather-${i + 1}`).src = "../assets/weather-icons/sunnyIcon.svg"; 
    } 

  } 
}  

function callChange(){ 
  //console.log("came inside call change");
  weather = Object.keys(weather_data);   
  //console.log(weather);
  let currentCity = document.querySelector("#datalist").value;
  //console.log(currentCity); 
  let flag=0;
  for(let i=0;i<weather.length;i++){
    if(currentCity==weather[i]){ 
      changeparams(); 
      flag=1;
    }
  }   
  if(flag==0){
    SetNullParams();
  }
  
}

function setSunny(){
  let sunnyCities=[];
  //console.log(weather_data);
  weather = Object.keys(weather_data);  
  let parameters=Object.values(weather_data); 


  for(let i=0;i<parameters.length;i++){
    let currCityTemp = parameters[i]["temperature"].slice(0, -2);
    let currCityHumidity = parameters[i]["humidity"].slice(0, -1);
    let currCityPrecipitation = parameters[i]["precipitation"].slice(0, -1); 

    if(parseInt(currCityTemp)>29 && 
    parseInt(currCityHumidity)>50 && 
    parseInt(currCityPrecipitation)>=50){
      sunnyCities.push(parameters[i]);
    }
  } 
  console.log(sunnyCities);
} 

function setSnowy() {
  let snowyCities = [];
  weather = Object.keys(weather_data);
  let parameters = Object.values(weather_data);
  for (let i = 0; i < parameters.length; i++) {
    //console.log("hi");
    let currCityTemp = parameters[i]["temperature"].slice(0, -2);
    let currCityHumidity = parameters[i]["humidity"].slice(0, -1);
    let currCityPrecipitation = parameters[i]["precipitation"].slice(0, -1);

    if (
      parseInt(currCityTemp) >= 20 && 
      parseInt(currCityTemp) <=28 &&
      parseInt(currCityHumidity) > 50 &&
      parseInt(currCityPrecipitation) < 50
    ) {
      snowyCities.push(parameters[i]);
    }
  }
  console.log(snowyCities);
} 

function setRainy() {
  let rainyCities = [];
  weather = Object.keys(weather_data);
  let parameters = Object.values(weather_data);
  for (let i = 0; i < parameters.length; i++) {
    //console.log("hi");
    let currCityTemp = parameters[i]["temperature"].slice(0, -2);
    let currCityHumidity = parameters[i]["humidity"].slice(0, -1);
    let currCityPrecipitation = parameters[i]["precipitation"].slice(0, -1);

    if (
      parseInt(currCityTemp) <20 &&
      parseInt(currCityHumidity) >= 50 &&) { 

      rainyCities.push(parameters[i]);
    }
  }
  console.log(snowyCities);
}


