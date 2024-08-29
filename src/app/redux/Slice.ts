import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    CoordinatesInterface,
    WeatherDataInterface,
} from "../../constants/interface";

interface UserState {
    searchQuery: string;
    pageLoading: boolean;
    coordinates: CoordinatesInterface;
    weatherData: WeatherDataInterface;
}

const initialState: UserState = {
    searchQuery: "",
    pageLoading: false,
    coordinates: {
        latitude: "",
        longitude: "",
    },
    weatherData: {
        humidity: "",
        rain_accumulation: "",
        rain_intensity: "",
        temperature: "",
        wind_direction: "",
        wind_speed: "",
    },
};

const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setPageLoading: (state, action: PayloadAction<boolean>) => {
            state.pageLoading = action.payload;
        },
        setCoordinates: (
            state,
            action: PayloadAction<CoordinatesInterface>,
        ) => {
            state.coordinates = {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            };
        },
        setWeatherInfo: (
            state,
            action: PayloadAction<WeatherDataInterface>,
        ) => {
            state.weatherData = {
                humidity: action.payload.humidity,
                wind_direction: action.payload.wind_direction,
                wind_speed: action.payload.wind_speed,
                rain_accumulation: action.payload.humidity,
                temperature: action.payload.temperature,
                rain_intensity: action.payload.rain_intensity,
            };
        },
    },
});

export const {
    setSearchQuery,
    setPageLoading,
    setCoordinates,
    setWeatherInfo,
} = slice.actions;
export const reducer = slice.reducer;
