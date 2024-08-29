import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import { setCoordinates, setSearchQuery } from "@/app/redux/Slice";
import { useEffect, useState } from "react";
import {
    CoordinatesInterface,
    SearchSuggestionsInterface,
} from "@/constants/interface";
import { GetSearchSuggestion } from "@/api/search.api";

interface Props {
    className?: string;
    onClick?: any;
    placeholder?: string;
}

export default function WeatherSearchInput({ className, placeholder }: Props) {
    const [searchSuggestions, setSearchSuggestions] = useState<
        SearchSuggestionsInterface[]
    >([]);
    const dispatch = useDispatch();
    const searchQuery = useSelector(
        (state: { searchQuery: string }) => state.searchQuery,
    );
    const onChange = (value: string) => {
        dispatch(setSearchQuery(value));
    };
    const handleGetSearchSuggestions = async () => {
        const options: SearchSuggestionsInterface[] = [];
        try {
            if (searchQuery) {
                const result = await GetSearchSuggestion(searchQuery);
                if (Array.isArray(result) && result.length > 0) {
                    result.map((val, index) => {
                        const payload: SearchSuggestionsInterface = {
                            key: index,
                            label: `${val.localityName} ${val.cityName}`,
                            value: val.localityId,
                            latitude: val.latitude,
                            longitude: val.longitude,
                        };
                        options.push(payload);
                    });
                    setSearchSuggestions(options);
                }
            }
        } catch (error) {
            console.log("UI ERROR : While getting search suggestions", error);
        } finally {
            setSearchSuggestions(options);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            handleGetSearchSuggestions();
        }
    }, [searchQuery]);

    return (
        <Input
            setCoordinates={({ latitude, longitude }: CoordinatesInterface) =>
                dispatch(setCoordinates({ latitude, longitude }))
            }
            placeholder={placeholder}
            suggestions={searchSuggestions}
            value={searchQuery}
            onChange={onChange}
            className={className}
            setSearchQuery={(value: string) => dispatch(setSearchQuery(value))}
            required
            type="text"
        />
    );
}
