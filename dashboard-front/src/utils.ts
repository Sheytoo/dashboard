import ClearDay from "./assets/weather-icons/01d.svg";
import ClearNight from "./assets/weather-icons/01n.svg";
import FewCloudsDay from "./assets/weather-icons/02d.svg";
import FewCloudsNight from "./assets/weather-icons/02n.svg";
import ScatteredCloudsDay from "./assets/weather-icons/03d.svg";
import ScatteredCloudsNight from "./assets/weather-icons/03n.svg";
import BrokenCloudsDay from "./assets/weather-icons/04d.svg";
import BrokenCloudsNight from "./assets/weather-icons/04n.svg";
import ShowerRainDay from "./assets/weather-icons/09d.svg";
import ShowerRainNight from "./assets/weather-icons/09n.svg";
import RainDay from "./assets/weather-icons/10d.svg";
import RainNight from "./assets/weather-icons/10n.svg";
import ThunderstormDay from "./assets/weather-icons/11d.svg";
import ThunderstormNight from "./assets/weather-icons/11n.svg";
import SnowDay from "./assets/weather-icons/13d.svg";
import SnowNight from "./assets/weather-icons/13n.svg";
import MistDay from "./assets/weather-icons/50d.svg";
import MistNight from "./assets/weather-icons/50n.svg";

export const formatParamName = (name: string) => {
    let formatted = name.replace(/_/g, " ");
    formatted = formatted.replace(/id/g, "ID");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const getWeatherIcon = (icon: string | undefined) => {
    switch (icon) {
        case "01d":
            return ClearDay;
        case "01n":
            return ClearNight;
        case "02d":
            return FewCloudsDay;
        case "02n":
            return FewCloudsNight;
        case "03d":
            return ScatteredCloudsDay;
        case "03n":
            return ScatteredCloudsNight;
        case "04d":
            return BrokenCloudsDay;
        case "04n":
            return BrokenCloudsNight;
        case "09d":
            return ShowerRainDay;
        case "09n":
            return ShowerRainNight;
        case "10d":
            return RainDay;
        case "10n":
            return RainNight;
        case "11d":
            return ThunderstormDay;
        case "11n":
            return ThunderstormNight;
        case "13d":
            return SnowDay;
        case "13n":
            return SnowNight;
        case "50d":
            return MistDay;
        case "50n":
            return MistNight;
        default:
            return "";
    }
}
