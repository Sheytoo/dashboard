import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { IWeather } from "../../react-app-env";
import { getWeatherIcon } from "../../utils";

type CurrentWeatherWidgetProps = {
    city: string;
    id: number;
    isEditing: boolean;
    refreshInterval: number;
    deleteWidget: (id: number) => void;
    openWidgetConfig: (id: number) => void;
}

const CurrentWeatherWidget = (props: CurrentWeatherWidgetProps) => {
    const [cookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState(props.city);
    const [weather, setWeather] = useState<IWeather>();
    const [isDay, setIsDay] = useState(true);


    const fetchWeather = async (city: string) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch(`http://localhost:8080/api/weather/current?city=${city}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 500) {
                    toast.error("Invalid city name.", { position: "bottom-right" });
                    props.openWidgetConfig(props.id);
                } else {
                    console.log(response);
                }
            })
            .then(data => {
                setWeather(data);
                setIsDay(data.icon.includes("d"));
                setIsLoading(false);
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchWeather(city).then();
        }, (props.refreshInterval ?? 30) * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchWeather(city).then();
    }, [city]);

    return (
        <div
            className={`bg-gradient-to-br ${isDay ? "from-sky-600 to-sky-700" : "from-neutral-800 to-neutral-900"} text-white px-7 pt-4 pb-6 rounded-3xl shadow-lg w-80 h-fit`}>
            {isLoading ? (
                <div className={"flex flex-col items-center justify-center h-80"}>
                    <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-white"}/>
                </div>
            ) : (
                <>
                    <Toaster/>
                    <div className={"flex flex-nowrap justify-between"}>
                        <div className={"font-medium"}>Weather - {isDay ? "Day" : "Night"}</div>
                        {props.isEditing ? (
                            <button className={"hover:scale-125 text-red-500 transition-all duration-200 ease-in-out"}
                                    onClick={() => props.deleteWidget(props.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                            </button>
                        ) : (
                            <button className={"hover:scale-125 transition-all duration-200 ease-in-out"}
                                    onClick={() => props.openWidgetConfig(props.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className={"w-6 h-6"}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className={"flex flex-col justify-center items-center mt-8"}>
                        <img src={getWeatherIcon(weather?.icon)} alt={"weather icon"} className={"h-28 mx-auto"}/>
                        <div className={"text-6xl font-bold text-center mt-4"}>
                            {Math.round(weather?.temp as number)}
                            <span className={"align-top font-semibold text-4xl text-blue-50"}>°</span>
                        </div>
                        <div
                            className={"text-2xl font-semibold mt-2"}>{city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</div>
                    </div>
                    <div className={"grid grid-cols-3 gap-4 mt-8"}>
                        <div className={"flex flex-col items-center"}>
                            <div className={"text-sm font-medium"}>Rain</div>
                            <div className={"text-3xl font-bold mt-2"}>
                                {Math.round(weather?.rain as number * 10) / 10}
                                <span className={"text-sm font-semibold"}>mm</span>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <div className={"text-sm font-medium"}>Humidity</div>
                            <div className={"text-3xl font-bold mt-2"}>
                                {Math.round(weather?.humidity as number)}
                                <span className={"text-sm font-semibold"}>%</span>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <div className={"text-sm font-medium"}>Wind</div>
                            <div className={"text-3xl font-bold mt-2"}>
                                {Math.round(weather?.windSpeed as number)}
                                <span className={"text-sm font-semibold"}>km/h</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CurrentWeatherWidget;
