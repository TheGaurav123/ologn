import React from "react";

interface Props {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({ text, className, disabled, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer text-sm px-2.5 py-1.5 md:text-md md:px-4 shadow-sm md:py-2 rounded-md ${className}`}
        >
            {text}
        </button>
    );
}
