import { useEffect, useState } from "react";
import { IService } from "../react-app-env";
import { useCookies } from "react-cookie";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
    const [cookies] = useCookies(['token']);
    const [services, setServices] = useState<IService[]>();
    const [subscribedServices, setSubscribedServices] = useState<IService[]>();

    const fetchServices = async () => {
        if (!cookies.token || cookies.token === "") return;
        await fetch("http://localhost:8080/api/services", {
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

    const fetchSubscribedServices = async () => {
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
                setSubscribedServices(data);
            });
    }

    const subscribe = async (id: number) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch(`http://localhost:8080/api/me/subscribe/${id}`, {
            method: "POST",
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

    const unsubscribe = async (id: number) => {
        if (!cookies.token || cookies.token === "") return;
        await fetch(`http://localhost:8080/api/me/unsubscribe/${id}`, {
            method: "DELETE",
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

    useEffect(() => {
        fetchServices().then();
        fetchSubscribedServices().then();
    }, [subscribedServices]);

    return (
        <div className={"flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-200 ease-in"}>
            <div className={"bg-gray-50 h-16 shadow py-4 px-4 sticky top-0"}>
                <div className={"flex items-center flex-row"}>
                    <h1 className="font-bold text-2xl text-gray-700">Services management</h1>
                </div>
            </div>
            <div className={"flex flex-col flex-grow p-4"}>
                <div className={"flex flex-wrap justify-center gap-6 mt-8"}>
                    {services?.map((service: IService) => (
                        <ServiceCard key={service.id}
                                     service={service}
                                     isSubscribed={subscribedServices?.some((subscribedService: IService) => subscribedService.id === service.id)}
                                     onSubscribe={() => {
                                         subscribe(service.id).then()
                                     }}
                                     onUnsubscribe={() => {
                                         unsubscribe(service.id).then();
                                     }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
