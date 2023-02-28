import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IRole, IService, IUser } from "../react-app-env";
import WeatherIcon from "../assets/service-icons/weather.svg";
import WeatherIconSelected from "../assets/service-icons/weather-selected.svg";
import CryptoIcon from "../assets/service-icons/crypto.svg";
import CryptoIconSelected from "../assets/service-icons/crypto-selected.svg";
import SteamIcon from "../assets/service-icons/steam.svg";
import SteamIconSelected from "../assets/service-icons/steam-selected.svg";
import FlightIcon from "../assets/service-icons/flight.png";
import FlightIconSelected from "../assets/service-icons/flight-selected.png";

const Sidebar = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);
    const [services, setServices] = useState<IService[]>([]);
    const [user, setUser] = useState<IUser>();

    const fetchUser = async () => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
    }

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
                setServices(data);
            });
    }

    const getIcon = (name: string) => {
        switch (name) {
            case "weather":
                if (window.location.pathname.includes("weather")) return WeatherIconSelected;
                return WeatherIcon;
            case "steam":
                if (window.location.pathname.includes("steam")) return SteamIconSelected;
                return SteamIcon;
            case "crypto":
                if (window.location.pathname.includes("crypto")) return CryptoIconSelected;
                return CryptoIcon;
            case "flight":
                if (window.location.pathname.includes("flight")) return FlightIconSelected;
                return FlightIcon;
            default:
                return CryptoIcon;
        }
    }

    const isAdministrator = () => {
        return !!user?.roles.find((role: IRole) => role.name === "ROLE_ADMIN");
    }

    const isActiveLink = (path: string) => {
        return window.location.pathname === path;
    }

    const logout = () => {
        setCookie("token", "", { path: "/" });
        navigate("/login");
    }

    useEffect(() => {
        fetchUser().then();
    }, []);

    useEffect(() => {
        fetchServices().then();
    }, []);

    return (
        <aside
            className={"flex-shrink-0 w-64 md:shadow transform -translate-x-full md:translate-x-0 sticky top-0 h-screen transition-transform duration-200 ease-in bg-background"}>
            <div className={"flex items-center justify-center py-4"}>
                <div className={"inline-flex"}>
                    <Link to={"/"} className={"inline-flex flex-row items-center"}>
                        <svg className={"w-8 h-8 text-primary-50"} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
                                  clipRule="evenodd"
                            />
                        </svg>
                        <span className="leading-10 text-text text-xl font-bold ml-1 uppercase">Dash<span
                            className={"text-primary-50"}>board</span></span>
                    </Link>
                </div>
            </div>
            <div className={"px-4 py-6"}>
                <ul className={"flex flex-col w-full"}>
                    <li className={"my-px"}>
                        <Link to={"/"}
                              className={`flex flex-row items-center h-10 px-3 rounded-lg ${isActiveLink("/") ? "active" : "text-gray-300 hover:bg-gray-700 hover:text-gray-200"} transition-colors duration-200`}>
                            <span
                                className={`flex items-center justify-center text-lg ${isActiveLink("/") ? "text-gray-200" : "text-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                </svg>
                            </span>
                            <span className={"ml-3 font-medium"}>Dashboard</span>
                        </Link>
                    </li>
                    <li className={"my-px"}>
                        <span className={"flex font-medium text-sm text-gray-300 px-4 my-4 uppercase"}>Services</span>
                    </li>
                    {services.map((service, index) => (
                        <li key={index} className={"my-px"}>
                            <Link to={"/service/" + service.name}
                                  className={`${isActiveLink(`/service/${service.name}`) ? "active" : "text-gray-300 hover:bg-gray-700 hover:text-gray-200"} flex flex-row items-center h-10 px-3 rounded-lg transition-colors duration-200`}>
                            <span className={"flex items-center justify-center text-lg"}>
                                <img src={getIcon(service.name)} alt={service.name.slice(0, 1)} className="w-6 h-6"/>
                            </span>
                                <span className={"ml-3"}>{service.label}</span>
                            </Link>
                        </li>
                    ))}
                    <li className="my-px">
                        <Link to={"/services"}
                              className={`${isActiveLink("/services") ? "active" : "text-gray-300 hover:bg-gray-700 hover:text-gray-200"} flex flex-row items-center h-10 px-3 rounded-lg  transition-colors duration-200`}>
                            <span
                                className={`flex items-center justify-center text-lg ${isActiveLink("/services") ? "text-gray-200" : "text-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
                                </svg>
                            </span>
                            <span className={"ml-3"}>Manage services</span>
                        </Link>
                    </li>
                    <li className={"my-px"}>
                        <span className={"flex font-medium text-sm text-gray-300 px-4 my-4 uppercase"}>Account</span>
                    </li>
                    <li className="my-px">
                        <Link to={"/"}
                              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-gray-200 transition-colors duration-200">
                            <span className="flex items-center justify-center text-lg text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                </svg>
                            </span>
                            <span className="ml-3">Profile</span>
                        </Link>
                    </li>
                    {isAdministrator() && (
                        <li className="my-px">
                            <Link to={"/admin"}
                                  className={`${isActiveLink("/admin") ? "active" : "text-gray-300 hover:bg-gray-700 hover:text-gray-200"} flex flex-row items-center h-10 px-3 rounded-lg transition-colors duration-200`}>
                            <span className={`flex items-center justify-center text-lg ${isActiveLink("/admin") ? "text-gray-200" : "text-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                                </svg>
                            </span>
                                <span className="ml-3">Admin</span>
                            </Link>
                        </li>
                    )}
                    <li className="my-px">
                        <button onClick={logout}
                                className="flex flex-row items-center h-10 px-3 w-full rounded-lg text-gray-300 hover:bg-gray-700 hover:text-gray-200 transition-colors duration-200">
                            <span className="flex items-center justify-center text-lg text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                </svg>
                            </span>
                            <span className="ml-3">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;
