(function(){"use strict";var e={5989:function(e,t,a){var r=a(9242),i=a(3396),n=a(7139);const h={class:"weather-wrapper"},s={class:"left-block-wrapper"},o={class:"info-block"},c={id:"city",class:"city"},l=["src"],u={id:"temp",class:"temperature"},w={id:"main-weather",class:"main-weather"},p={class:"wind-wrapper"},d=(0,i._)("p",null,"Wind",-1),y=(0,i._)("i",{class:"bi bi-wind"},null,-1),f={class:"wind-speed"},m={class:"hourly-forecast-wrapper"},g={class:"hourly-time"},v={class:"hourly-wrapper-time"},_=["src"],b={class:"hourly-temp"},D={class:"daily-weather-wrapper"},H={class:"data-time"},C=["src"],W={class:"temp-wrapper"},k={class:"max-temp"};function S(e,t,a,S,M,O){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.wy)((0,i._)("input",{onKeydown:t[0]||(t[0]=(0,r.D2)(((...e)=>O.WeatherCallFunc&&O.WeatherCallFunc(...e)),["enter"])),"onUpdate:modelValue":t[1]||(t[1]=e=>M.citySearch=e),class:"search"},null,544),[[r.nr,M.citySearch]]),(0,i._)("div",h,[(0,i._)("div",s,[(0,i._)("div",o,[(0,i._)("p",c,(0,n.zw)(M.weatherCity)+", "+(0,n.zw)(M.weatherCountry),1),(0,i._)("img",{class:"weather-img",src:`http://openweathermap.org/img/w/${this.weatherImage}.png`},null,8,l),(0,i._)("h1",u,(0,n.zw)(M.weatherTemp),1),(0,i._)("p",w,(0,n.zw)(M.weatherMain),1),(0,i._)("div",p,[d,(0,i._)("p",null,[y,(0,i._)("span",f,(0,n.zw)(M.weatherWind)+"m/s",1)])])])]),(0,i._)("div",m,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(O.weatherHourlyCl,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{class:"hourly-forecast-item",key:t},[(0,i._)("div",g,(0,n.zw)(e.dt_txt.slice(11,16)),1),(0,i._)("div",v,[(0,i._)("img",{class:"hourly-icon",src:`http://openweathermap.org/img/w/${this.weatherHourly[t].weather[0].icon}.png`},null,8,_),(0,i._)("div",b,(0,n.zw)(Math.floor(e.main.temp-273))+"°",1)])])))),128))])]),(0,i._)("div",D,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(O.weatherDaily,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{class:"daily-element",key:t},[(0,i._)("div",H,(0,n.zw)(M.DAYS[new Date(e.dt_txt).getDay()]),1),(0,i._)("img",{class:"weather-img",src:`http://openweathermap.org/img/w/${e.weather[0].icon}.png`},null,8,C),(0,i._)("div",W,[(0,i._)("div",k,(0,n.zw)(Math.floor(e.main.temp_max-273))+"°",1)])])))),128))])],64)}a(7658);var M=a(70),O={data(){return{key:"ca16aa945ebdea4f126db5ca6372a64d",cityDefault:"ternopil",weather:[],citySearch:"",weatherCity:"",weatherCountry:"",weatherImage:"",weatherTemp:"",weatherMain:"",weatherWind:null,weatherHourly:[],DAYS:{0:"Tusday",1:"Monaday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"}}},methods:{async fetchWeater(){let e=await M.ZP.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch||this.cityDefault}&appid=${this.key}&units=metric`).catch((e=>{alert(e)}));if(e){this.citySearch="";const t=e.data;this.weatherCity=t.name,this.weatherCountry=t.sys.country,this.weatherImage=t.weather[0].icon,this.weatherTemp=Math.round(t.main.temp),this.weatherMain=t.weather[0].main,this.weatherWind=Math.round(t.wind.speed),this.citySearch=""}else{this.citySearch="",e=await M.ZP.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.cityDefault}&appid=${this.key}`);const t=e.data;this.weatherCity=t.name,this.weatherCountry=t.sys.country,this.weatherImage=t.weather[0].icon,this.weatherTemp=Math.round(t.main.temp-273),this.weatherMain=t.weather[0].main,this.weatherWind=Math.round(t.wind.speed)}},async fetchHourlyWeather(){const e=await M.ZP.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.citySearch||this.cityDefault}&appid=${this.key}`).catch();if(e)this.weatherHourly=e.data.list,this.citySearch="";else{const e=await M.ZP.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.cityDefault}&appid=${this.key}`);this.weatherHourly=e.data.list,this.citySearch=""}},WeatherCallFunc(){this.fetchWeater(),this.fetchHourlyWeather()}},mounted(){this.fetchWeater(),this.fetchHourlyWeather()},computed:{weatherHourlyCl(){let e=[];console.log(this.weatherHourly);for(let t=0;t<this.weatherHourly.length;t+=4)e.push(this.weatherHourly[t]);return e},weatherDaily(){let e=[];for(let t=0;t<this.weatherHourly.length;t+=8)e.push(this.weatherHourly[t]);return e}}},$=a(89);const z=(0,$.Z)(O,[["render",S]]);var T=z;(0,r.ri)(T).mount("#app")}},t={};function a(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(t,r,i,n){if(!r){var h=1/0;for(l=0;l<e.length;l++){r=e[l][0],i=e[l][1],n=e[l][2];for(var s=!0,o=0;o<r.length;o++)(!1&n||h>=n)&&Object.keys(a.O).every((function(e){return a.O[e](r[o])}))?r.splice(o--,1):(s=!1,n<h&&(h=n));if(s){e.splice(l--,1);var c=i();void 0!==c&&(t=c)}}return t}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[r,i,n]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,n,h=r[0],s=r[1],o=r[2],c=0;if(h.some((function(t){return 0!==e[t]}))){for(i in s)a.o(s,i)&&(a.m[i]=s[i]);if(o)var l=o(a)}for(t&&t(r);c<h.length;c++)n=h[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(l)},r=self["webpackChunkvue_weather_app"]=self["webpackChunkvue_weather_app"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(5989)}));r=a.O(r)})();
//# sourceMappingURL=app.0671dfde.js.map