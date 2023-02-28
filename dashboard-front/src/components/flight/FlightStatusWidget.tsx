import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { IFlightStatus } from "../../react-app-env";

interface IFlightStatusWidgetProps {
    id: number;
    flightNumber: string;
    date: string;
    isEditing: boolean;
    refreshInterval: number;
    deleteWidget: (id: number) => void;
    openWidgetConfig: (id: number) => void;
}

const FlightStatusWidget = (props: IFlightStatusWidgetProps) => {
    const [cookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(true);
    const [flightStatus, setFlightStatus] = useState<IFlightStatus>();

    const fetchFlightStatus = async (flightNumber: string, date: string) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch(`http://localhost:8080/api/flight/status?flightNumber=${flightNumber}&date=${date}`, {
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
                    console.log(response);
                } else {
                    console.log(response);
                }
            })
            .then(data => {
                setFlightStatus(data);
                setIsLoading(false);
            });
    }

    const getFlightDuration = (flightStatus: IFlightStatus) => {
        if (!flightStatus) return;
        const arrivalTime = new Date(flightStatus.arrival.utcTime);
        const departureTime = new Date(flightStatus.departure.utcTime);
        const duration = arrivalTime.getTime() - departureTime.getTime();
        const hours = Math.floor(duration / 1000 / 60 / 60);
        const minutes = Math.floor((duration / 1000 / 60 / 60 - hours) * 60);
        return hours + "h " + minutes + "m";
    }


    const getFlightPercentage = (flightStatus: IFlightStatus) => {
        if (new Date(flightStatus.departure.utcTime).getTime() > new Date().getTime()) return 0;
        if (new Date(flightStatus.arrival.utcTime).getTime() < new Date().getTime()) return 100;
        const departureTime = new Date(flightStatus?.departure.utcTime ?? 0);
        const arrivalTime = new Date(flightStatus?.arrival.utcTime ?? 0);
        const now = new Date();
        return (now.getTime() - departureTime.getTime()) / (arrivalTime.getTime() - departureTime.getTime()) * 100;
    }

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    const formatTime = (time: string) => {
        const timeObj = new Date(time);
        return timeObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchFlightStatus(props.flightNumber, props.date).then();
        }, (props.refreshInterval ?? 30) * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchFlightStatus(props.flightNumber, props.date).then();
    }, [props.flightNumber, props.date]);

    return (
        <div
            className={`bg-gradient-to-br from-sky-50 to-sky-100 text-sky-900 px-7 pt-4 pb-6 w-[500px] rounded-3xl shadow-lg h-fit`}>
            {isLoading ? (
                <div className={"flex flex-col items-center justify-center h-80"}>
                    <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-black"}/>
                </div>
            ) : (
                <>
                    <div className={"flex flex-nowrap justify-between"}>
                        <div className={"font-medium"}>{flightStatus?.flightNumber} - {flightStatus?.airline}</div>
                        {props.isEditing ? (
                            <button
                                className={"hover:scale-125 text-red-500 transition-all duration-200 ease-in-out"}
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
                    <div className={"flex flex-col justify-center items-center mt-5"}>
                        <div className={"flex flex-nowrap w-full justify-center items-center"}>
                            <div className={"flex-1 flex flex-col justify-center items-center"}>
                                <div className={"text-xl font-medium"}>{flightStatus?.departure.airport.code}</div>
                                <div
                                    className={"text-sm"}>{flightStatus?.departure.airport.city}, {flightStatus?.departure.airport.countryCode}</div>
                            </div>
                            <div className="shrink-0 mb-4 mx-4 w-56 h-4 bg-sky-200 rounded-full">
                                <div className="h-4 bg-sky-900 rounded-full"
                                     style={{ width: getFlightPercentage(flightStatus!) + "%" }}/>
                                <span
                                    className={"flex items-center justify-center text-sm mt-1"}>{getFlightDuration(flightStatus!)}</span>
                            </div>
                            <div className={"flex-1 flex flex-col justify-center items-center"}>
                                <div className={"text-xl font-medium"}>{flightStatus?.arrival.airport.code}</div>
                                <div
                                    className={"text-sm whitespace-nowrap"}>{flightStatus?.arrival.airport.city}, {flightStatus?.arrival.airport.countryCode}</div>
                            </div>
                        </div>
                        <div className={"flex flex-nowrap w-full justify-center items-center mt-7"}>
                            <div className={"flex-1 flex flex-col justify-start items-start"}>
                                <div className={"text-lg font-semibold mb-1"}>Departure</div>
                                <div className={"text-sm flex items-center align-top"}
                                     title={"Local time: " + formatDate(flightStatus?.arrival.localTime ?? "") + " at " + formatTime(flightStatus?.arrival.localTime ?? "")}>
                                    {formatDate(flightStatus?.departure.utcTime ?? "")} at {formatTime(flightStatus?.departure.utcTime ?? "")}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </div>
                                <div
                                    className={"text-sm"}>{flightStatus?.departure.airport.name} ({flightStatus?.departure.airport.code})
                                </div>
                                <div
                                    className={"text-sm"}>{flightStatus?.departure.airport.city}, {flightStatus?.departure.airport.countryCode}</div>
                                <div className={"text-sm"}>Terminal {flightStatus?.departure.terminal}</div>
                            </div>
                            <div className={"flex-1 flex flex-col justify-end items-end"}>
                                <div className={"text-lg font-semibold mb-1"}>Arrival</div>
                                <div className={"text-sm flex items-center align-top"}
                                     title={"Local time: " + formatDate(flightStatus?.arrival.localTime ?? "") + " at " + formatTime(flightStatus?.arrival.localTime ?? "")}>
                                    {formatDate(flightStatus?.arrival.utcTime ?? "")} at {formatTime(flightStatus?.arrival.utcTime ?? "")}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </div>
                                <div
                                    className={"text-sm"}>{flightStatus?.arrival.airport.name} ({flightStatus?.arrival.airport.code})
                                </div>
                                <div
                                    className={"text-sm"}>{flightStatus?.arrival.airport.city}, {flightStatus?.arrival.airport.countryCode}</div>
                                <div className={"text-sm"}>Terminal {flightStatus?.arrival.terminal}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default FlightStatusWidget;
