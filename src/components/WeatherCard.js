import { useEffect, useState } from "react";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

const WeatherCard = () => {
    let apiKey = "cf840572558c581d9197b33f03dc4d3e";
    const [input, setInput] = useState("");
    const [city, setCity] = useState("");
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [temp, setTemp] = useState(0);
  
    const handleChange = (event) => {
      setInput(event.target.value);
    };
  
    const search = async () => {
      if (input === "") {
        return 0;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${apiKey}`;
      let response = await fetch(url);
  
      if (response.status == 404) {
        return 0;
      }
      
      let data = await response.json();
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(data.main.temp);
      setCity(data.name);
      return data;
    };

    return (
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search..."
            onChange={handleChange}
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={searchIcon} />
          </div>
        </div>
        <div className="weather-image">
          <img src={cloudIcon} alt="" />
        </div>
        <div className="weather-temp">{temp}C</div>
        <div className="weather-location">{city}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{humidity} %</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">{wind} Km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default WeatherCard;