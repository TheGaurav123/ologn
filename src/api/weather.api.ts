import axios from "axios";
import { CoordinatesInterface } from "@/constants/interface";
import { AuthService } from "@/services/auth-header.service";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getWeatherInfo = async (coordinates: CoordinatesInterface) => {
    const URI = BASE_URL + "/get_weather_data";
    const result = await axios
        .get(URI, {
            headers: AuthService.getAPIHeader(),
            params: coordinates,
        })
        .then((res) => res.data)
        .catch((err) => {
            console.log("Error while getting weather data", err);
            return false;
        });

    return result;
};
