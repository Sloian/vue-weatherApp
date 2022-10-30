
<template>
  <input
    @keydown.enter="WeatherCallFunc"
    v-model="citySearch"
    class="search"
  >

    <div class="weather-wrapper">

      <div class="left-block-wrapper">
        <div class="info-block">
          <p id='city' class="city">{{weatherCity}}, {{weatherCountry}}</p>
          <img class='weather-img' :src="`http://openweathermap.org/img/w/${this.weatherImage}.png`">
          <h1 id='temp' class="temperature">{{weatherTemp}}</h1>
          <p id="main-weather" class="main-weather">{{weatherMain}}</p>
          <div class="wind-wrapper">
            <p>Wind</p>
            <p><i class="bi bi-wind"></i><span class="wind-speed">{{weatherWind}}m/s</span></p>
          </div>
        </div>
      </div>

      <div class="hourly-forecast-wrapper">
        <div class="hourly-forecast-item" v-for="(item , index) in weatherHourlyCl" :key="index">
          <div class="hourly-time">{{item.dt_txt.slice(11,16)}}</div>
          <div class="hourly-wrapper-time">
            <img class='hourly-icon' :src="`http://openweathermap.org/img/w/${this.weatherHourly[index].weather[0].icon}.png`">
            <div class="hourly-temp">{{Math.floor(item.main.temp - 273)}}°</div>
          </div>
        </div>
      </div>

    </div>

    <div class="daily-weather-wrapper">
      <div class="daily-element" v-for="(item, index) in weatherDaily" :key="index">
        <div class="data-time">{{DAYS[new Date(item.dt_txt).getDay()]}}</div>
        <img class='weather-img' :src="`http://openweathermap.org/img/w/${item.weather[0].icon}.png`">
        <div class="temp-wrapper">
          <div class="max-temp">{{Math.floor(item.main.temp_max - 273)}}°</div>
        </div>

      </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      key: "ca16aa945ebdea4f126db5ca6372a64d",
      cityDefault: "ternopil",
      weather: [],
      citySearch: "",
      weatherCity: "",
      weatherCountry: "",
      weatherImage: "",
      weatherTemp: "",
      weatherMain: "",
      weatherWind: null,

      weatherHourly: [],
      DAYS: {
        0: "Tusday",
        1: "Monaday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      },
    };
  },

  methods: {
    async fetchWeater () {
      
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch || this.cityDefault}&appid=${this.key}&units=metric`)
      .catch(error => {
        alert(error)
      })

      if (response) {
        this.citySearch = "";
        const weather = response.data;
        this.weatherCity = weather.name;
        this.weatherCountry = weather.sys.country;
        this.weatherImage = weather.weather[0].icon;
        this.weatherTemp = Math.round(weather.main.temp);
        this.weatherMain = weather.weather[0].main;
        this.weatherWind = Math.round(weather.wind.speed);
        this.citySearch = "";
      } else {
        this.citySearch = "";
        response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.cityDefault}&appid=${this.key}`);
        const weather = response.data;
        this.weatherCity = weather.name;
        this.weatherCountry = weather.sys.country;
        this.weatherImage = weather.weather[0].icon;
        this.weatherTemp = Math.round(weather.main.temp - 273);
        this.weatherMain = weather.weather[0].main;
        this.weatherWind = Math.round(weather.wind.speed);
      }
      
    },

    async fetchHourlyWeather(){
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.citySearch || this.cityDefault}&appid=${this.key}`)
      .catch();

      if (response){
        this.weatherHourly = response.data.list;
        this.citySearch = "";
      } 
      else{
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.cityDefault}&appid=${this.key}`);
        this.weatherHourly = response.data.list;
        this.citySearch = "";
      }

    },

    WeatherCallFunc(){
      this.fetchWeater();
      this.fetchHourlyWeather();
    }
  },

  mounted(){
    this.fetchWeater();
    this.fetchHourlyWeather();
  },
  
  computed:{
    weatherHourlyCl(){
      let weatherHourlyClipped = [];
      console.log(this.weatherHourly)
      for (let i = 0; i < this.weatherHourly.length; i += 4) {
        weatherHourlyClipped.push(this.weatherHourly[i])
      }

      return weatherHourlyClipped;
    },

    weatherDaily(){
      let weatherDaily = [];
      for (let i = 0; i < this.weatherHourly.length; i += 8) {
        weatherDaily.push(this.weatherHourly[i]);
      }

      return weatherDaily;
    },
  }
}


</script>

<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");

  *{
    box-sizing: border-box;
    margin: 0;
  }

  html,body{
    height: 100%;
    background: #2f3543;

  }

  body{
    display: flex;
    justify-content: center;
  }

  .wrapper{
    display: flex;
    width: 1440px;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    gap: 80px;
    height: 100%;
    color: white;
  }


  .weather-wrapper{
    display: flex;
    align-items: center;
    gap: 170px;
    margin-bottom: 40px;
  }

  .search-location{
    display: flex;
    justify-content: center;
  }

  .search{
    min-width: 350px;
    font-size: 18px;
    line-height: 36px;
    border-radius: 12px;
    border: none;
    padding-left: 20px;
    outline: none;

  }

  .search:hover,
  .search:active{
    padding-left: 20px;
    outline: none;
  }

  .info-block{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 40px;
    padding-left: 100px;
    /* margin-bottom: 55px; */
  }

  .city{
    font-size: 28px;
    min-width: 150px;
  }

  .img-block{

  }

  .temperature{
    font-size: 100px;
  }

  .main-weather{
    font-size: 28px;
  }

  .wind-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .wind-speed{
    margin-left: 8px;
  }

  .hourly-forecast-wrapper{
    /* border: 1px solid black; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
    gap: 25px;
    flex-wrap: wrap;
    width: 350px;

  }

  .hourly-forecast-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 30px 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 20px;

  }

  .hourly-wrapper-time{
    display: flex;
    align-items: center;
  }

  .hourly-time{
  }

  .hourly-temp{
    min-width: 33px;
  }

  form{
    padding: 0;
    margin: 0;
  }

  /* right container */

  .daily-weather-wrapper{
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    padding-bottom: 50px;
  }


  .daily-element{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    gap: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    min-width: 205px;
  }




  /* hourly block */


  @media (min-width: 769px) and (max-width: 1052px) {
    .weather-wrapper{
      gap: 135px;
    }
    .info-block{
      padding-left: 40px;
    }

  }

  @media screen and (max-width: 768px) {

    .weather-wrapper{
      gap: 65px;
    }

    .info-block{
      padding-left: 20px;
    }

  }

  @media screen and (max-width: 580px) {

    .wrapper{
      padding-right: 50px;
    }

    .weather-wrapper{
      display: flex;
      flex-direction: column;
      margin-bottom: 0px;
    }

    .info-block{
      padding-left: 0;
    }

    .hourly-forecast-wrapper{
      order: 1;
    }
    .daily-weather-wrapper{
      order: 1;
    }

    .search{
      min-width: 300px;
    }

    .daily-weather-wrapper{
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }

    .daily-element{
      width: 280px;
      padding: 30px 15px;
      font-size: 120%;
    }



  }

  @media screen and (max-width: 389px){
    .wrapper{
      padding: 30px 5px 30px 12px;
    }

    .search{
      min-width: 150px;
    }

  }

</style>
