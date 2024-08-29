export interface SearchSuggestionsInterface {
    key: number | string;
    value: any;
    label: string;
    [key: string]: any;
}

export interface CoordinatesInterface {
    longitude?: string;
    latitude?: string;
}

export interface WeatherDataInterface {
    humidity: string;
    rain_accumulation: string;
    rain_intensity: string;
    temperature: string;
    wind_direction: string;
    wind_speed: string;
}
