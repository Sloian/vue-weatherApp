
<template>
  <button @click="clock">
    Видалити
  </button>
  <form class="search-location" v-on:submit.prevent="fetchWeater">
    <input
      v-on:submit.prevent="fetchWeater"
      type="text"
      class="search"
      placeholder="search"
      v-model="citySearch"
      autocomplete="off"
    />
  </form>

    <div class="weather-wrapper">

      <div class="left-block-wrapper">
        <div class="info-block">
          <p id='city' class="city">{{weatherCity}}, {{weatherCountry}}</p>
          <img class='weather-img'>
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

    <div class="right-block-wrapper">
    </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      key: "d982b206b7125a363d94918d08ebf560",
      defaultCity: "ternopil",
      citySearch: "",
      weatherCity: "",
      weatherCountry: "",
      weatherImage: "",
      weatherTemp: "",
      weatherMain: "",
      weatherWind: null,

      weatherHourly: [],
    };
  },

  methods: {
    async fetchWeater () {
      const weatherNowURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch || this.defaultCity}&appid=${this.key}&units=metric`;
      //fetch weather
      try {
        const response = await axios.get(weatherNowURL);
        const weather = response.data;
        console.log(weather)
        this.weatherCity = weather.name;
        this.weatherCountry = weather.sys.country;
        this.weatherImage = weather.weather[0].icon;
        document.querySelector('.weather-img').src="http://openweathermap.org/img/w/" + this.weatherImage + ".png";
        this.weatherTemp = Math.round(weather.main.temp);
        this.weatherMain = weather.weather[0].main;
        this.weatherWind = Math.round(weather.wind.speed);
        this.citySearch = "";

      } catch (error) {
        alert(error)
      }
    },

    async fetchHourlyWeather(){
      const weatherHourlyURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.citySearch || this.defaultCity}&appid=${this.key}`
      
      try {
        const responce = await axios.get(weatherHourlyURL);
        this.weatherHourly = responce.data.list;
        console.log(this.weatherHourly[0])
        console.log(document.querySelector('.hourly-icon'))

      } catch (error) {
        alert(error)
      }
      }
    ,

    clock(){
      console.log(this.weatherHourly)
    }

  },

  mounted(){
    this.fetchWeater();
    this.fetchHourlyWeather();
  },
  
  computed:{
    weatherHourlyCl(){
      let weatherHourlyClipped = [];

      for (let i = 0; i < this.weatherHourly.length; i += 8) {
        weatherHourlyClipped.push(this.weatherHourly[i])
      }

      return weatherHourlyClipped;

    }
  }

};


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

  .right-block-wrapper{
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    padding-bottom: 50px;
  }


  .day-weather-wrapper{
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
    .right-block-wrapper{
      order: 1;
    }

    .search{
      min-width: 300px;
    }

    .right-block-wrapper{
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }

    .day-weather-wrapper{
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
