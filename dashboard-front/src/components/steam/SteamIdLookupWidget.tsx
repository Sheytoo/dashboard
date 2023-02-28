import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ISteamLookup } from "../../react-app-env";
import { toast, Toaster } from "react-hot-toast";

interface ISteamIdLookupWidgetProps {
    id: number;
    openWidgetConfig: (id: number) => void;
    deleteWidget: (id: number) => void;
    isEditing: boolean;
    refreshInterval: number;
}

const SteamIdLookupWidget = (props: ISteamIdLookupWidgetProps) => {
    const [cookie] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [steamId, setSteamId] = useState<string>("");
    const [lookupResult, setLookupResult] = useState<ISteamLookup>();

    const fetchSteamId = async () => {
        if (!cookie.token || cookie.token === "") return;
        setIsLoading(true);
        await fetch("http://localhost:8080/api/steam/lookup/" + steamId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookie.token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 500) {
                    setLookupResult(undefined);
                    setIsLoading(false);
                } else {
                    setLookupResult(data);
                    setIsLoading(false);
                    const interval = setInterval(() => {
                        fetchSteamId().then();
                    }, (props.refreshInterval ?? 600) * 1000);
                    return () => clearInterval(interval);
                }
            });
    }

    const getTableItem = (name: string, value: string) => {
        return (
            <tr>
                <td className={"font-medium text-end text-gray-400"}>{name}</td>
                <td className={"text-gray-200 cursor-pointer select-all"}
                    onClick={() => {
                        navigator.clipboard.writeText(value).then(r => {
                            toast.success("Copied to clipboard", { position: "bottom-right" })
                        });
                    }}>
                    {value}
                </td>
            </tr>
        );
    }

    const timestampToDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en-US") + " at " + date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }

    return (
        <div
            className={`bg-gradient-to-br from-[#2a475e] to-[#1b2838] text-white px-7 pt-4 pb-6 rounded-3xl shadow-lg w-fit h-fit`}>
            <div className={"flex flex-nowrap justify-between"}>
                <div className={"font-medium"}>Steam ID Lookup</div>
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
            <div className={"flex flex-col items-center justify-center mt-6"}>
                <div className="w-full relative text-text">
                    <div className="absolute top-4 left-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth={2.5} stroke="currentColor"
                             className="w-5 h-5 text-gray-400 z-20 hover:text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </div>
                    <input type="text"
                           className="h-14 w-full pl-10 pr-20 rounded-lg z-0 bg-gradient-to-br from-gray-600 to-gray-700 focus:shadow focus:outline-none"
                           placeholder="SteamID, SteamID64, ..."
                           onInput={(e) => setSteamId(e.currentTarget.value)}
                    />
                    <div className="absolute top-2 right-2">
                        <button
                            className="h-10 w-20 text-white rounded-lg bg-sky-700 hover:bg-sky-800"
                            onClick={fetchSteamId}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className={"flex flex-col items-center justify-center h-80"}>
                    <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-white"}/>
                </div>
            ) : (
                (lookupResult !== undefined) && (
                    <div className={"flex flex-col items-center justify-center mt-6"}>
                        <div className={"flex flex-row items-center justify-start"}>
                            <img src={lookupResult?.avatar} alt={"profile avatar"} className={"rounded-lg h-20 w-20"}/>
                            <div className={"flex flex-col ml-4"}>
                                <div className={"font-medium text-2xl"}>{lookupResult?.username}</div>
                                <div className={"text-gray-400 text-sm"}>
                                    Last online: {timestampToDate(lookupResult!.lastLogOffTimestamp)}
                                </div>
                            </div>
                        </div>
                        <table className={"table-auto border-separate border-spacing-x-6 mt-5"}>
                            <tbody>
                            {getTableItem("SteamID", lookupResult!.steamId)}
                            {getTableItem("SteamID64", lookupResult!.steamId64)}
                            {getTableItem("SteamID3", lookupResult!.steamId3)}
                            {getTableItem("Profile URL", lookupResult!.profileUrl)}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
}

export default SteamIdLookupWidget;
