import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { IService, IWidgetType } from "../react-app-env";
import { toast, Toaster } from "react-hot-toast";
import { formatParamName } from "../utils";

interface IAddWidgetProps {
    onClosed: () => void;
    onAdded: () => void;
}

const AddWidget = (props: IAddWidgetProps) => {
    const [cookies] = useCookies(['token']);
    const [services, setServices] = useState<IService[]>([]);
    const [selectedService, setSelectedService] = useState<number>(0);
    const [widgetTypes, setWidgetTypes] = useState<IWidgetType[]>([]);
    const [selectedWidgetType, setSelectedWidgetType] = useState<number>(0);
    const [parameters, setParameters] = useState<JSON>();
    const [display, setDisplay] = useState<boolean>(false);

    const fetchServices = async () => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/me/services", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    toast.error("You don't have any services yet. Please subscribe to a service first.");
                } else {
                    setDisplay(true);
                    setServices(data);
                    setSelectedService(data[0].id);
                    fetchWidgetTypes(data[0].id).then();
                }
            });
    }

    const fetchWidgetTypes = async (serviceId: number) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/services/" + serviceId + "/widgetTypes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setWidgetTypes(data);
                setSelectedWidgetType(data[0].id);
                loadParameters(data[0].name);
            });
    }

    const loadParameters = async (serviceName: string) => {
        switch (serviceName) {
            case "current_weather_city":
                setParameters(JSON.parse('{"city": "Paris", "refresh_interval": 30}'));
                break;
            case "forecast_weather_city":
                setParameters(JSON.parse('{"city": "Paris", "refresh_interval": 30}'));
                break;
            case "last_played_game":
                setParameters(JSON.parse('{"steam_id": "76561198234875460", "refresh_interval": 300}'));
                break;
            case "lookup_steam_id":
                setParameters(JSON.parse('{"refresh_interval": 600}'));
                break;
            case "current_crypto_price":
                setParameters(JSON.parse('{"crypto_currency": "bitcoin", "currency": "EUR", "days": 1, "refresh_interval": 15}'));
                break;
            case "flight_status":
                let date = new Date();
                let dateString = date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() + 1);
                setParameters(JSON.parse('{"flight_number": "AF1234", "date": "' + dateString + '", "refresh_interval": 600}'));
                break;
            default:
                setParameters(JSON.parse('{}'));
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/me/widget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            },
            body: JSON.stringify({
                typeId: selectedWidgetType,
                parameters: JSON.stringify(parameters)
            })
        })
            .then(response => {
                if (response.status === 200) {
                    props.onAdded();
                }
            });
    }

    useEffect(() => {
        fetchServices().then();
    }, []);

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false}/>
            {display && (
                <div
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-49 md:inset-0 h-modal h-screen justify-center items-center flex bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow">
                            <button type="button" onClick={props.onClosed}
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className="py-9 px-6 lg:px-8">
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900">Add a widget</h3>
                                <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                                            Service
                                        </label>
                                        <select id="service" name="service" autoComplete="service" required
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-50 focus:border-primary-50 block w-full p-2.5"
                                                onChange={(e) => {
                                                    setSelectedService(parseInt(e.target.value));
                                                    fetchWidgetTypes(parseInt(e.target.value)).then();
                                                }}>
                                            {services.map(service => (
                                                <option key={service.id} value={service.id}>{service.label}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="widgetType" className="block text-sm font-medium text-gray-700">
                                            Widget type
                                        </label>
                                        <select id="widgetType" name="widgetType" autoComplete="widgetType" required
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-50 focus:border-primary-50 block w-full p-2.5"
                                                onChange={(e) => {
                                                    setSelectedWidgetType(parseInt(e.target.value));
                                                    loadParameters(widgetTypes.find(widgetType => widgetType.id === parseInt(e.target.value))!.name);
                                                }}>
                                            {widgetTypes.map(widgetType => (
                                                <option key={widgetType.id}
                                                        value={widgetType.id}>{widgetType.label}</option>
                                            ))}
                                        </select>
                                        {parameters && Object.keys(parameters).map((key, index) => (
                                            <div key={index}>
                                                <label htmlFor={key}
                                                       className="block text-sm font-medium text-gray-700">
                                                    {formatParamName(key)} {key === "refresh_interval" && "(in seconds)"} {key === "date" && "(YYYY-MM-DD)"}
                                                </label>
                                                <input
                                                    type={key === "refresh_interval" || key === "days" ? "number" : (key === "date" ? "date" : "text")}
                                                    min={key === "refresh_interval" ? "5" : (key === "days" ? "1" : "0")}
                                                    name={key} id={key} autoComplete={key} required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-50 focus:border-primary-50 block w-full p-2.5 focus:outline-none"
                                                    onChange={(e) => {
                                                        let value = e.target.value;
                                                        if (key === "date") {
                                                            let date = new Date(e.target.value);
                                                            value = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
                                                        }
                                                        setParameters({ ...parameters, [key]: value });
                                                    }}/>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit"
                                                className="text-white bg-primary-50 hover:bg-primary-100 font-semibold rounded-lg text-base px-5 py-2.5 text-center transition-colors duration-200">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddWidget;
