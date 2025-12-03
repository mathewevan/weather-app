export function WeatherIcon({weatherCode}) {


    switch (weatherCode) {
        case 0:
        case 1:
            return <img src={"/images/icon-sunny.webp"}/>;
        case 2:
            return <img src={"/images/icon-partly-cloudy.webp"}/>;
        case 3:
            return <img src={"/images/icon-overcast.webp"}/>;
        case 45:
        case 48:
            return <img src={"/images/icon-fog.webp"}/>;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return <img src={"/images/icon-drizzle.webp"}/>;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return <img src={"/images/icon-rain.webp"}/>;
        case 71:
        case 73:
        case 75:
        case 77:
            return <img src={"/images/icon-snow.webp"}/>;
        case 80:
        case 81:
        case 82:
            return <img src={"/images/icon-rain.webp"}/>;
        case 85:
        case 86:
            return <img src={"/images/icon-snow.webp"}/>;
        case 95:
        case 96:
        case 99:
            return <img src={"/images/icon-storm.webp"}/>;


    }

}