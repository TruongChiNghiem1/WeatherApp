import "./WeatherApp.css";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faMoon } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
// const element = <FontAwesomeIcon icon={faCoffee} />

function Title() {
  return (
    <div className="title">
      <h1>Simple Weather App</h1>
    </div>
  );
}

const Search = ({setSearch, txtSearch, handleClick}) => (
    <form>
        <div className="searchFather">
            <div className="search">
                <input type="search" value={txtSearch} onChange={(e) =>setSearch(e.target.value)}  placeholder="Search for a city" />
                <button onClick={handleClick}>SUBMIT</button>
            </div>
        </div>
    </form>
)

function Content({ city, temp, weather, weatherMain }) {
//   const iconWeather = this;
  const iconWeather = (
    <FontAwesomeIcon size="3x" className="center" icon={faCloud} />
  );
//   if(weatherMain === "Clounds"){
//     iconWeather = (
//         <FontAwesomeIcon size="3x" className="center" icon={faCloud} />
//       );
//   }else{
//     iconWeather = (
//         <FontAwesomeIcon size="3x" className="center" icon={faMoon} />
//       );
//   }
//   console.log(city);
  return (
    <div>
      <div className="content">
        <div className="fatherContent">
          <div className="chillContent">
            <row>{city}</row>
            <row1>FR</row1>
          </div>
          <div className="flex">
            <temperature>{temp}</temperature>
            <temperature className="doC">°C</temperature>
          </div>
          {iconWeather}
          <doc>{weather}</doc>
        </div>

        <div className="fatherContent">
          <div className="chillContent">
            <row>Melbourne</row>
            <row1>AU</row1>
          </div>
          <div className="flex">
            <temperature>15</temperature>
            <temperature className="doC">°C</temperature>
          </div>
          {}
          <doc>clear sky</doc>
        </div>
        <div className="fatherContent">
          <div className="chillContent">
            <row>Madrid</row>
            <row1>ES</row1>
          </div>
          <div className="flex">
            <temperature>9</temperature>
            <temperature className="doC">°C</temperature>
          </div>
          {}
          <doc>light intesity drizzle</doc>
        </div>
      </div>
    </div>
  );
}

function FatherConTent({cities}){
    // console.log(cities[0]?.weather);
    return (
        <div>
            {
                cities.map(city =>
                    <Content
                        key = {city.id}
                        city = {city.city}
                        temp = {Math.round(city.temp)}
                        weather = {city.weather}
                        weatherMain = {city.main}
                    />
                )
            }
        </div>
    )
}

const data1 = [
    {city: "Ca Mau", temp: 28, weather: "few clound", weatherMain: "Clounds"}
]

function App() {
    const [txtSearch, setSearch] = useState('')
  const [data, setData] = useState([]);
  useEffect(() => {
    function showLocation(data) {
      const lon = data.coords.longitude;
      const lat = data.coords.latitude;
      const url = process.env.REACT_APP_WEATHER_END_POINT;
      const key = process.env.REACT_APP_API_KEY;
      //const axios = require('axios'); // legacy way
      const url1 = `${url}?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
      // Make a request for a user with a given ID
      axios.get(url1).then((response) => {
        const cities = [];
        const city = {
          id: 1,
          city: response.data.name,
          temp: response.data.main.temp,
          weather: response.data.weather[0]?.description,
          weatherMain: response.data.weather[0]?.main,
        };
        // handle success
        cities.push(city);
        // console.log(city);
        setData(cities);
      });
    }
    navigator.geolocation.getCurrentPosition(showLocation);
  }, []);

    const handleClick = (e) => {
        e.preventDefault();
        const key = process.env.REACT_APP_API_KEY;
        const url = process.env.REACT_APP_WEATHER_END_POINT;
        const url2 = `${url}?q=${txtSearch}&appid=${key}`;
        axios.get(url2).then((response) => {
            const lon2 = response.data.coord.lon;
            const lat2 = response.data.coord.lat;
            const url3 = process.env.REACT_APP_WEATHER_SHOW_FIVE_DAY;
            const url4 = `${url3}?lat=${lat2}&lon=${lon2}&appid=${key}`;
            axios.get(url4).then((res) => {
                console.log(res);
                // const cities = [];
                // const city = {
                //   id: 1,
                //   city: response.data.name,
                //   temp: response.data.main.temp,
                //   weather: response.data.weather[0]?.description,
                //   weatherMain: response.data.weather[0]?.main,
                // };
                // // handle success
                // cities.push(city);
                // // console.log(city);
                // setData(cities);
              });
        });

    }
  return (
    <div className="father">
      <div className="padding_30">
        <Title />
        <Search txtSearch={txtSearch} setSearch={setSearch} handleClick={handleClick} />
        <FatherConTent cities={data} />
      </div>
    </div>
  );
}

export default App;
