import Header from "./Header";
import SearchBar from "./SearchBar";
import {useState} from "react";
import {WeatherIcon} from "./WeatherIcon";
import {DayForecastHero} from "./DayForecastHero";


function WeatherDescriptors({weatherData}) {

    const cards = []
    for (let i = 0; i < 4 ; i++) {
        if (i === 0){
            cards.push(<WeatherDescriptorCard key={i} descriptor={"Feels Like"} value={`${weatherData.apparent_temperature}°`} />);
        } else if (i === 1){
            cards.push(<WeatherDescriptorCard key={i} descriptor={"Humidity"} value={`${weatherData.relative_humidity_2m}%`}/>);
        } else if (i === 2){
            cards.push(<WeatherDescriptorCard key={i} descriptor={"Wind"} value={`${weatherData.wind_speed_10m} km/h`} />);
        } else {
            cards.push(<WeatherDescriptorCard key={i} descriptor={"Precipitation"} value={`${weatherData.precipitation} mm`} />);
        }


    }
    return <div className="weather-descriptors-container">
        <div className="weather-descriptor-cards" >
            {cards}
        </div>


    </div>;
}

function WeatherDescriptorCard({descriptor, value}) {
    return <div className="weather-descriptor-card">
        <div className="weather-descriptor">
            {descriptor}
        </div>
        <div className="weather-descriptor-values">
            {value}
        </div>
    </div>
}

function DailyForecast({forecast, timeZone}) {

    const cards = []
    for (let i = 0; i < forecast.time.length; i++) {
        cards.push(<DailyForecastCard key={forecast.time[i]} date={new Date(forecast.time[i])}
                                      weatherCode={forecast.weather_code[i]} maxTemp={forecast.temperature_2m_max[i]}
                                      minTemp={forecast.temperature_2m_min[i]} timeZone={timeZone}/>)

    }

    return <div className="daily-forecast-container">
        <div className="daily-forecast-title">
            Daily Forecast
        </div>
        <div className="daily-forecast-cards">
            {cards}
        </div>

    </div>;
}

function DailyForecastCard({date, weatherCode, maxTemp, minTemp, timeZone}) {
    return <div className="daily-forecast-card">
        <div>
            {Intl.DateTimeFormat("en-US", {weekday: "short", timeZone}).format(date)}
        </div>
        <div className="daily-forecast-icon">
            <WeatherIcon weatherCode={weatherCode}/>
        </div>
        <div className="daily-forecast-temps">
            <div>
                {maxTemp}°
            </div>
            <div>
                {minTemp}°
            </div>
        </div>
    </div>
}

function HourlyForecast() {
    return <div></div>;
}

export default function App() {

    const [weatherData, setWeatherData] = useState();

    async function fetchWeather(lat, long, location) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=relative_humidity_2m,temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`;
        try {
            const response = await fetch(url);

            // Parse the response body as JSON
            const data = await response.json();
            data.location = location;
            setWeatherData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            return null; // Or handle the error as appropriate
        }
    }

    return <div className="app-container">
        <Header/>
        <SearchBar onLocationSelected={fetchWeather}/>
        {
            weatherData && <div className="main-container">
                <div className="left-column">
                    <DayForecastHero location={weatherData.location} date={new Date(weatherData.current.time)} timeZone={weatherData.timezone}
                                     weatherCode={weatherData.current.weather_code}
                                     temperature={weatherData.current.temperature_2m}/>
                    <WeatherDescriptors weatherData={weatherData.current} />
                    <DailyForecast forecast={weatherData.daily}  timeZone={weatherData.timezone}/>
                </div>

                <div className="right-column">
                    <HourlyForecast/>

                </div>
            </div>
        }
    </div>
}