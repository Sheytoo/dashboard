import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { formatParamName } from "../utils";

interface IWidgetConfigProps {
    id: number;
    onClose: () => void;
    onUpdated: (city: string) => void;
}

const WidgetConfig = (props: IWidgetConfigProps) => {
    const [cookies] = useCookies(['token']);
    const [params, setParams] = useState<JSON>();

    const getWidgetConfig = async () => {
        if (!cookies.token || cookies.token === "") return;
        await fetch(`http://localhost:8080/api/widgets/${props.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setParams(JSON.parse(data.parameters));
            });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!cookies.token || cookies.token === "") return;
        let formData = new FormData(event.target);
        let object: any = {};
        formData.forEach((value, key) => {
            object[key] = value
        });
        await fetch(`http://localhost:8080/api/widgets/${props.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.token
            },
            body: JSON.stringify({
                parameters: JSON.stringify(object)
            })
        })
            .then(response => {
                if (response.status === 200) {
                    props.onUpdated(object.city);
                } else {
                    console.log(response);
                }
            });
    }

    useEffect(() => {
        getWidgetConfig().then();
    }, []);

    return (
        <div
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-49 md:inset-0 h-modal h-screen justify-center items-center flex bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button" onClick={props.onClose}
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <div className="py-9 px-6 lg:px-8">
                        <h3 className="mb-4 text-2xl font-semibold text-gray-900">Widget configuration</h3>
                        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
                            {params && Object.keys(params).map((key, index) => {
                                return (
                                    <div key={index}>
                                        <label htmlFor={key}
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            {formatParamName(key)} {key === "refresh_interval" && "(in seconds)"} {key === "date" && "(YYYY-MM-DD, max 7 days after or before today)"}
                                        </label>
                                        <input type={key === "refresh_interval" ? "number" : "text"}
                                               min={key === "refresh_interval" ? 5 : 0}
                                               name={key} id={key}
                                               value={params[key as keyof JSON] as string}
                                               onChange={e => setParams({ ...params, [key]: e.target.value })}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-50 focus:border-primary-50 focus:border-2 block w-full p-2.5 focus:outline-none"
                                               required/>
                                    </div>
                                )
                            })}
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
    )
}

export default WidgetConfig;
