import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { ICryptoData } from "../../react-app-env";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    {
        id: 'uniqueid5',
        afterDraw: function (chart: any, easing: any) {
            if (chart.tooltip._active && chart.tooltip._active.length) {
                const activePoint = chart.tooltip._active[0];
                const ctx = chart.ctx;
                const x = activePoint.element.x;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(253,82,82,0.5)';
                ctx.stroke();
                ctx.restore();
            }
        }
    },
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false,
            }
        },
        y: {
            display: false,
            grid: {
                display: false,
            }
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
        title: {
            display: false,
        }
    },
    elements: {
        point: {
            radius: 0,
        },
        line: {
            tension: 0.4
        }
    }
};

interface ICryptoPriceWidgetProps {
    id: number;
    crypto: string;
    currency: string;
    days: number;
    isEditing: boolean;
    refreshInterval: number;
    deleteWidget: (id: number) => void;
    openWidgetConfig: (id: number) => void;
}

const CryptoPriceWidget = (props: ICryptoPriceWidgetProps) => {
    const [cookie] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cryptoData, setCryptoData] = useState<ICryptoData>();
    const [chartData, setChartData] = useState<any>();

    const fetchCryptoData = async (crypto: string, currency: string, days: number) => {
        if (!cookie.token || cookie.token === "") return;
        await fetch(`http://localhost:8080/api/crypto/currentmarket/${crypto}?currency=${currency}&days=${days}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookie.token
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
                setCryptoData(data);
                let labels: string[] = [];
                let dataPoints: number[] = [];
                if (data && data.length > 0) {
                    data.chartData.forEach((value: any, index: any) => {
                        if (index % 5 === 0) {
                            labels.push(new Date(value[0]).toLocaleString());
                            dataPoints.push(value[1]);
                        }
                    });
                    setChartData({
                        labels,
                        datasets: [
                            {
                                fill: true,
                                label: data.name,
                                data: dataPoints,
                                borderColor: '#009399',
                                backgroundColor: 'rgba(0, 147, 153, 0.5)',
                            },
                        ],
                    });
                    setIsLoading(false);
                }
            });
    }

    const formatPrice = (price: number) => {
        const locale = navigator.language;
        return price.toLocaleString(locale, {
            minimumFractionDigits: price < 1  && price > -1 ? 6 : 2,
            maximumFractionDigits: price < 1 && price > -1 ? 6 : 2,
        });
    }

    const getCurrencySymbol = (currency: string) => {
        let price = 0;
        let formattedPrice = price.toLocaleString(navigator.language, { style: 'currency', currency: currency });
        return formattedPrice.slice(0, 1);
    }


    useEffect(() => {
        const interval = setInterval(() => {
            fetchCryptoData(props.crypto, props.currency, props.days).then();
        }, (props.refreshInterval ?? 15) * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchCryptoData(props.crypto, props.currency, props.days).then();
    }, [props.crypto, props.currency, props.days]);

    return (
        <div
            className={`bg-gradient-to-br from-white to-gray-100 text-black px-7 pt-4 pb-6 rounded-3xl shadow-lg w-80 h-fit`}>
            {isLoading ? (
                <div className={"flex flex-col items-center justify-center h-80"}>
                    <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-black"}/>
                </div>
            ) : (
                <>
                    <div className={"flex flex-nowrap justify-between"}>
                        <div className={"font-medium"}>{cryptoData?.name}</div>
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
                    <div className={"flex flex-col justify-center items-center mt-6"}>
                        <div className={"flex flex-row space-x-3 justify-center items-center"}>
                            <img src={cryptoData?.icon} alt={cryptoData?.name} className={"w-12 h-12"}/>
                            <div className={"flex flex-col"}>
                                <div className={"text-2xl font-medium"}>{formatPrice(cryptoData?.price ?? 0)} {getCurrencySymbol(props.currency)}</div>
                                <div className={"text-sm"}>
                                    {cryptoData!.priceChange24h < 0 ? (
                                        <div className={"flex space-x-1 text-red-500"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                            </svg>
                                            <span>{formatPrice(cryptoData!.priceChange24h)} {getCurrencySymbol(props.currency)}</span>
                                        </div>
                                    ) : (
                                        <div className={"flex space-x-1 text-green-600"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                            </svg>
                                            <span>{formatPrice(cryptoData!.priceChange24h)} {getCurrencySymbol(props.currency)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col justify-center items-center"}>
                        <Line data={chartData} options={{
                            ...options,
                            interaction: {
                                mode: 'index',
                                intersect: false,
                            }}} />
                    </div>
                </>
            )}
        </div>
    );
}

export default CryptoPriceWidget;
