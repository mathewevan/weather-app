import {WeatherIcon} from "./WeatherIcon";

export function DayForecastHero({date, location, temperature, weatherCode, timeZone}) {
    return <div className="day-forecast-hero">
        <div>
            <div className="day-forecast-hero-location">
                {location}
            </div>

            <div className="day-forecast-hero-date">
                {Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone
                }).format(date)}
            </div>
        </div>

        <div className="day-forecast-hero-icon">
            <WeatherIcon weatherCode={weatherCode}/>
        </div>

        <div className="day-forecast-hero-temperature">
            <em>{temperature}</em>°
        </div>
    </div>
}