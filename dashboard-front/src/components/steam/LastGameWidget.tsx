import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

interface ILastGameWidgetProps {
    steamId: string;
    id: number;
    openWidgetConfig: (id: number) => void;
    deleteWidget: (id: number) => void;
    isEditing: boolean;
    refreshInterval: number;
}

export interface ILatestGame {
    appid: number;
    name: string;
    iconUrl: string;
    playtime2weeks: number;
    playtimeForever: number;
    username: string;
}

const LastGameWidget = (props: ILastGameWidgetProps) => {
    const [cookie] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lastGame, setLastGame] = useState<ILatestGame>();

    const fetchLastGame = async () => {
        if (!cookie.token || cookie.token === "") return;
        await fetch("http://localhost:8080/api/steam/lastgame/" + props.steamId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookie.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setLastGame(data);
                setIsLoading(false);
            });
    }

    const convertedPlaytime = (minutes: number) => {
        if (minutes < 60) {
            return minutes;
        } else {
            const hours = Math.round(minutes / 60);
            return hours.toLocaleString("en-US");
        }
    }


    useEffect(() => {
        fetchLastGame().then();
        const interval = setInterval(() => {
            fetchLastGame().then();
        }, (props.refreshInterval ?? 300) * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`bg-gradient-to-br from-[#2a475e] to-[#1b2838] text-white px-7 pt-4 pb-6 rounded-3xl shadow-lg w-fit h-fit`}>
            {isLoading ? (
                <div className={"flex flex-col items-center justify-center h-80"}>
                    <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-white"}/>
                </div>
            ) : (
                <>
                    <div className={"flex flex-nowrap justify-between"}>
                        <div className={"font-medium"}>Last played game</div>
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
                    <div className={"flex flex-col mt-7"}>
                        <div className={"flex flex-row items-center"}>
                            <img src={lastGame?.iconUrl} alt={lastGame?.name} className={"rounded-lg h-24 mr-4"}/>
                            <div className={"flex flex-col"}>
                                <div className={"font-semibold text-xl"}>{lastGame?.name}</div>
                                <div className={"text-sm text-gray-400"}>Played by {lastGame?.username}</div>
                            </div>
                        </div>
                        <div className={"grid grid-cols-2 gap-4 mt-8"}>
                            <div className={"flex flex-col items-center"}>
                                <div className={"text-sm font-medium text-gray-300"}>Playtime 2 weeks</div>
                                <div className={"text-3xl font-bold mt-2"}>
                                    {convertedPlaytime(lastGame!.playtime2weeks)}
                                    <span
                                        className={"text-sm font-medium"}>{lastGame!.playtime2weeks < 60 ? (lastGame!.playtime2weeks === 1 ? " minute" : " minutes") : (lastGame!.playtime2weeks < 120 ? " hour" : " hours")}</span>
                                </div>
                            </div>
                            <div className={"flex flex-col items-center"}>
                                <div className={"text-sm font-medium text-gray-300"}>Playtime all time</div>
                                <div className={"text-3xl font-bold mt-2"}>
                                    {convertedPlaytime(lastGame!.playtimeForever)}
                                    <span
                                        className={"text-sm font-medium"}>{lastGame!.playtimeForever < 60 ? (lastGame!.playtimeForever === 1 ? " minute" : " minutes") : (lastGame!.playtimeForever < 120 ? " hour" : " hours")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default LastGameWidget;
