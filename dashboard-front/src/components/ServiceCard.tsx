import { IService } from "../react-app-env";

interface IServiceCardProps {
    service: IService;
    onSubscribe: () => void;
    onUnsubscribe: () => void;
    isSubscribed: boolean | undefined;
}

const ServiceCard = (props: IServiceCardProps) => {
    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg">
            <img className="rounded-t-lg h-36 w-full shadow-sm object-cover object-center" src={props.service.imageUrl}
                 alt={props.service.name}/>
            <div className="px-5 pt-3 pb-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.service.label}</h5>
                <p className="mb-3 font-normal text-justify text-gray-700">{props.service.description}</p>
                <div className="flex w-full justify-end mt-5">
                    {props.isSubscribed ? (
                        <button
                            onClick={props.onUnsubscribe}
                            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-text">
                            Unsubscribe
                        </button>
                    ) : (
                        <button
                            onClick={props.onSubscribe}
                            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-text">
                            Subscribe
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;
