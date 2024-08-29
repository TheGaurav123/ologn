import {
    CoordinatesInterface,
    SearchSuggestionsInterface,
} from "@/constants/interface";
import React, { useState, useRef, useEffect } from "react";

interface Props {
    type?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
    className?: string;
    required?: boolean;
    value?: string | number | readonly string[] | undefined;
    suggestions?: SearchSuggestionsInterface[];
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>> | any;
    setCoordinates?:
        | React.Dispatch<React.SetStateAction<CoordinatesInterface>>
        | any;
    placeholder?: string;
}

export default function Input({
    className,
    onChange,
    type = "text",
    required = false,
    value,
    suggestions,
    setSearchQuery,
    setCoordinates,
    placeholder,
}: Props) {
    const [activeSuggestionIndex, setActiveSuggestionIndex] =
        useState<number>(-1);
    const suggestionsRef = useRef<HTMLDivElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!suggestions || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0,
            );
        } else if (e.key === "ArrowUp") {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1,
            );
        } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
            setSearchQuery?.(suggestions[activeSuggestionIndex].label);
            setActiveSuggestionIndex(-1);
        }
    };

    useEffect(() => {
        setActiveSuggestionIndex(-1);
    }, [value, suggestions]);

    useEffect(() => {
        if (suggestionsRef.current && activeSuggestionIndex >= 0) {
            const item = suggestionsRef.current.children[
                activeSuggestionIndex
            ] as HTMLDivElement;
            if (item) {
                item.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    }, [activeSuggestionIndex]);

    return (
        <>
            <input
                value={value}
                required={required}
                type={type}
                className={`outline-none w-full border border-gray-300 px-4 py-2.5 rounded-full ${className}`}
                onChange={({ target: { value } }) => onChange(value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />

            {value && Array.isArray(suggestions) && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute w-full bg-gray-100 px-4 py-2 rounded-md mt-4 flex flex-col gap-3 max-h-52 overflow-auto"
                >
                    {suggestions.map((val, index) => (
                        <p
                            onClick={() => {
                                setSearchQuery?.(val.label);
                                setCoordinates?.({
                                    longitude: val?.longitude,
                                    latitude: val?.latitude,
                                });
                            }}
                            key={val.key}
                            className={`cursor-pointer hover:underline ${
                                activeSuggestionIndex === index
                                    ? "bg-gray-200"
                                    : ""
                            }`}
                        >
                            {val.label}
                        </p>
                    ))}
                </div>
            )}
        </>
    );
}
