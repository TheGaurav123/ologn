"use client";

import { getWeatherInfo } from "@/api/weather.api";
import {
    setCoordinates,
    setPageLoading,
    setSearchQuery,
    setWeatherInfo,
} from "@/app/redux/Slice";
import { CrossIcon, LoaderGif, SearchIcon } from "@/assets/icons";
import { Header, Ring, WeatherSearchInput } from "@/components";
import { TEMPORARILY_UNAVAILABLE } from "@/constants";
import {
    CoordinatesInterface,
    WeatherDataInterface,
} from "@/constants/interface";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
    const {
        humidity,
        rain_accumulation,
        rain_intensity,
        temperature,
        wind_direction,
        wind_speed,
    } = useSelector(
        (state: { weatherData: WeatherDataInterface }) => state.weatherData,
    );
    const dispatch = useDispatch();
    const searchQuery = useSelector(
        (state: { searchQuery: string }) => state.searchQuery,
    );
    const { latitude, longitude } = useSelector(
        ({ coordinates }: { coordinates: CoordinatesInterface }) => coordinates,
    );

    const handleGetWeatherInfo = async () => {
        try {
            if (longitude && latitude) {
                const result = await getWeatherInfo({ latitude, longitude });
                if (result) {
                    if (result?.message === TEMPORARILY_UNAVAILABLE) {
                        dispatch(
                            setCoordinates({ latitude: "", longitude: "" }),
                        );
                        alert("Service Unavailable");
                        return;
                    }
                    if (result?.locality_weather_data) {
                        const {
                            humidity,
                            rain_accumulation,
                            rain_intensity,
                            temperature,
                            wind_direction,
                            wind_speed,
                        }: WeatherDataInterface = result?.locality_weather_data;
                        dispatch(
                            setWeatherInfo({
                                humidity,
                                rain_accumulation,
                                rain_intensity,
                                temperature,
                                wind_direction,
                                wind_speed,
                            }),
                        );
                    }
                }
            }
        } catch (error) {
            console.log("UI ERROR: While getting weather info", error);
        }
    };

    const loadState = async () => {
        try {
            dispatch(setPageLoading(true));
            handleGetWeatherInfo();
        } catch (error) {
            console.log("UI ERROR in loadstate of weather page", error);
        } finally {
            dispatch(setPageLoading(false));
        }
    };

    useEffect(() => {
        if (!searchQuery) {
            dispatch(setCoordinates({ latitude: "", longitude: "" }));
        }
    }, [searchQuery]);

    useEffect(() => {
        loadState();
    }, [longitude, latitude]);
    console.log(latitude)

    return (
        <>
            <div
                className={`px-4 py-2 flex flex-col items-center gap-4 flex-1 bg-gradient-to-r from-gray-100 to-gray-300 text-gray-500`}
            >
                <Header />
                <div className="flex flex-1 flex-col justify-center items-center">
                    {/* SearchBar */}
                    <section className="max-w-lg mx-auto">
                        <div className="relative">
                            <WeatherSearchInput
                                className="pe-20"
                                placeholder="Search a city"
                            />
                            <Image
                                className="cursor-pointer w-4 absolute right-4 top-1/2 transform -translate-y-1/2"
                                src={SearchIcon}
                                alt="search"
                                onClick={handleGetWeatherInfo}
                            />
                            {searchQuery && (
                                <>
                                    <div className="absolute w-0.5 h-7 right-11 top-1/2 transform -translate-y-1/2 bg-gray-200" />
                                    <Image
                                        className="cursor-pointer w-3 absolute right-14 top-1/2 transform -translate-y-1/2"
                                        src={CrossIcon}
                                        alt="clear"
                                        onClick={() =>
                                            dispatch(setSearchQuery(""))
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </section>

                    {/* Weather Info */}
                    {longitude && latitude && (
                        <div>
                            <section className="w-1/3 mx-auto">
                                <Image
                                    src={LoaderGif}
                                    className="w-full"
                                    alt="loading"
                                />
                                <h2 className="text-center font-semibold font-sans mt-5">
                                    Raining
                                </h2>
                            </section>

                            {/* Infos */}
                            <section className="flex flex-col items-center gap-8">
                                <h4 className="mt-8 text-6xl font-semibold font-sans">
                                    {temperature ? `${temperature}` : "--"}&deg;
                                    C
                                </h4>
                                {/* Location */}
                                <p>{searchQuery}</p>
                                <div className="flex flex-wrap justify-center gap-10">
                                    {/* Humidity */}
                                    <Ring
                                        centerText={humidity || "--"}
                                        title="Humidity"
                                    />
                                    {/* Wind Speed */}
                                    <Ring
                                        centerText={
                                            wind_speed
                                                ? `${wind_speed} km/h`
                                                : "--"
                                        }
                                        title="Wind Speed"
                                    />
                                    {/* Wind Direction */}
                                    <Ring
                                        centerText={wind_direction || "--"}
                                        title="Wind Direction"
                                    />
                                    {/* Rain INtensity */}
                                    <Ring
                                        centerText={rain_intensity || "--"}
                                        title="Rain Intensity"
                                    />
                                    {/* Rain Accumulation */}
                                    <Ring
                                        centerText={rain_accumulation || "--"}
                                        title="Rain Accumulation"
                                    />
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
