export interface IRole {
    id: number;
    name: string;
}

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: IRole[];
}

export interface IService {
    id: number;
    name: string;
    label: string;
    description: string;
    imageUrl: string;
}

export interface IWidgetType {
    id: number;
    name: string;
    label: string;
    service: IService;
}

export interface IWidget {
    id: number;
    parameters: string;
    type: IWidgetType;
    user: IUser;
}

export interface IWidgetType {
    id: number;
    name: string;
    service: IService;
}

export interface IWeather {
    icon: string;
    temp: number;
    rain: number;
    humidity: number;
    windSpeed: number;
}

export interface IForecast {
    date: string;
    icon: string;
    temp: number;
}

export interface ISteamLookup {
    avatar: string;
    createdTimestamp: number;
    lastLogOffTimestamp: number;
    profileUrl: string;
    steamId: string;
    steamId64: string;
    steamId3: string;
    username: string;
}

export interface ICryptoData {
    symbol: string;
    name: string;
    icon: string;
    price: number;
    priceChange24h: number;
    chartData: number[][];
}

export interface IAirport {
    code: string;
    name: string;
    city: string;
    countryCode: string;
}

export interface IFlightPoint {
    airport: IAirport;
    terminal: string;
    localTime: string;
    utcTime: string;
}

export interface IFlightStatus {
    flightNumber: string;
    airline: string;
    aircraftModel: string;
    departure: IFlightPoint;
    arrival: IFlightPoint;
}
