import { useEffect, useState } from "react";
import { IWidget } from "../react-app-env";
import AddWidget from "../components/AddWidget";
import WidgetConfig from "../components/WidgetConfig";
import CurrentWeatherWidget from "../components/weather/CurrentWeatherWidget";
import LastGameWidget from "../components/steam/LastGameWidget";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ForecastWeatherWidget from "../components/weather/ForecastWeatherWidget";
import SteamIdLookupWidget from "../components/steam/SteamIdLookupWidget";
import CryptoPriceWidget from "../components/crypto/CryptoPriceWidget";
import FlightStatusWidget from "../components/flight/FlightStatusWidget";


const Dashboard = () => {
    const serviceName = useParams<{ serviceName: string }>().serviceName;
    const [cookies] = useCookies(['token']);
    const [widgets, setWidgets] = useState<IWidget[]>();
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [configWidgetId, setConfigWidgetId] = useState(0);

    const fetchWidgets = async () => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/me/widgets", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (serviceName !== undefined) {
                    setWidgets(data.filter((widget: IWidget) => widget.type.service.name === serviceName));
                } else {
                    setWidgets(data);
                }
            });
    }

    const deleteWidget = async (id: number) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/widgets/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setWidgets(widgets?.filter((widget: IWidget) => widget.id !== id));
                } else {
                    console.log(response);
                }
            });
    }

    const openConfig = (id: number) => {
        setConfigWidgetId(id);
        setIsConfigOpen(true);
    }

    const closeConfig = () => {
        setIsConfigOpen(false);
    }

    const getServiceName = () => {
        switch (serviceName) {
            case "weather":
                return "Weather service";
            case "steam":
                return "Steam service";
            case "crypto":
                return "Crypto service";
            case "flight":
                return "Flight service";
            default:
                return "Dashboard";
        }
    }

    useEffect(() => {
        fetchWidgets().then();
    }, [serviceName]);

    return (
        <div className={"flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-200 ease-in"}>
            <div className={"bg-gray-50 shadow py-4 px-4 sticky top-0"}>
                <div className={"flex items-center flex-row"}>
                    <h1 className="font-bold text-2xl text-gray-700">{getServiceName()}</h1>
                    {widgets && widgets.length > 0 && (
                        <button
                            className={"ml-auto border border-primary-50 hover:bg-primary-50 hover:text-text text-primary-50 font-medium uppercase py-1 px-4 rounded-lg"}
                            onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Done" : "Edit"}
                        </button>
                    )}
                </div>
            </div>
            {widgets?.length === 0 ? (
                <div className={"flex flex-col items-center justify-center flex-grow"}>
                    <h1 className={"text-2xl text-gray-700 font-bold"}>No widgets found</h1>
                    <button
                        className={"bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mt-4"}
                        onClick={() => setIsAdding(true)}>
                        Add widget
                    </button>
                </div>
            ) : (
                <div className={"flex flex-col flex-grow p-4"}>
                    <div className={"flex flex-wrap justify-center gap-6 mt-8"}>
                        {Array.isArray(widgets) && widgets.map((widget) => {
                            switch (widget.type.name) {
                                case "current_weather_city":
                                    return (
                                        <CurrentWeatherWidget
                                            key={widget.id}
                                            id={widget.id}
                                            city={JSON.parse(widget.parameters).city}
                                            refreshInterval={JSON.parse(widget.parameters).refresh_interval}
                                            isEditing={isEditing}
                                            deleteWidget={deleteWidget}
                                            openWidgetConfig={openConfig}
                                        />
                                    );
                                case "forecast_weather_city":
                                    return (
                                        <ForecastWeatherWidget key={widget.id}
                                                               id={widget.id}
                                                               city={JSON.parse(widget.parameters).city}
                                                               refreshInterval={JSON.parse(widget.parameters).refresh_interval}
                                                               isEditing={isEditing}
                                                               deleteWidget={deleteWidget}
                                                               openWidgetConfig={openConfig}
                                        />
                                    );
                                case "last_played_game":
                                    return (
                                        <LastGameWidget key={widget.id}
                                                        id={widget.id}
                                                        steamId={JSON.parse(widget.parameters).steam_id}
                                                        refreshInterval={JSON.parse(widget.parameters).refresh_interval}
                                                        isEditing={isEditing}
                                                        openWidgetConfig={openConfig}
                                                        deleteWidget={deleteWidget}
                                        />
                                    );
                                case "lookup_steam_id":
                                    return (
                                        <SteamIdLookupWidget key={widget.id}
                                                             id={widget.id}
                                                             refreshInterval={JSON.parse(widget.parameters).refresh_interval}
                                                             isEditing={isEditing}
                                                             openWidgetConfig={openConfig}
                                                             deleteWidget={deleteWidget}
                                        />
                                    );
                                case "current_crypto_price":
                                    return (
                                        <CryptoPriceWidget key={widget.id}
                                                           id={widget.id}
                                                           crypto={JSON.parse(widget.parameters).crypto_currency}
                                                           currency={JSON.parse(widget.parameters).currency}
                                                           days={JSON.parse(widget.parameters).days}
                                                           refreshInterval={JSON.parse(widget.parameters).refresh_interval}
                                                           isEditing={isEditing}
                                                           openWidgetConfig={openConfig}
                                                           deleteWidget={deleteWidget}
                                        />
                                    );
                                case "flight_status":
                                    return (
                                        <FlightStatusWidget key={widget.id}
                                                            id={widget.id}
                                                            flightNumber={JSON.parse(widget.parameters).flight_number}
                                                            date={JSON.parse(widget.parameters).date}
                                                            refreshInterval={JSON.parse(widget.parameters).refresh_interval}
                                                            isEditing={isEditing}
                                                            openWidgetConfig={openConfig}
                                                            deleteWidget={deleteWidget}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                        {isEditing && (
                            <button onClick={() => setIsAdding(true)}
                                    className={"flex flex-col justify-center items-center text-gray-400 rounded-3xl border-gray-400 border-2 border-dashed w-80 h-fit py-10 hover:bg-gray-200 hover:border-gray-400 hover:text-gray-400"}>
                                <div className={"flex flex-col justify-center items-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            )}
            {isAdding && (
                <AddWidget onClosed={() => setIsAdding(false)} onAdded={() => {
                    setIsAdding(false);
                    fetchWidgets().then();
                }}/>
            )}
            {isConfigOpen && (
                <WidgetConfig id={configWidgetId} onClose={closeConfig} onUpdated={() => {
                    closeConfig();
                    setWidgets(widgets?.filter((widget) => widget.id !== configWidgetId));
                    fetchWidgets().then();
                }}/>
            )}
        </div>
    )
}

export default Dashboard;
