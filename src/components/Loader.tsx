"use client";
import { SpinnerGif } from "@/assets/icons";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Loader() {
    const isLoading = useSelector(
        (state: { pageLoading: boolean }) => state.pageLoading,
    );
    if (isLoading) {
        return (
            <div className="pointer-events-none absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-85 z-[9999999]">
                <Image src={SpinnerGif} alt="loading" />
            </div>
        );
    }

    return <></>;
}
