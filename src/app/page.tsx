"use client";
import Image from "next/image";
import { GoogleLogo } from "@/assets/logos";
import { CrossIcon, MicIcon, SearchIcon } from "@/assets/icons";
import { Button, Footer, Header, WeatherSearchInput } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "./redux/Slice";
import { useRouter } from "next/navigation";

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchQuery = useSelector(
        (state: { searchQuery: string }) => state.searchQuery,
    );
    const handleSearch = () => {
        if (searchQuery) {
            router.push("/weather-info");
        }
    };

    return (
        <>
            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header logo={false} />

                {/* Middle */}
                <div className="flex flex-1 flex-col gap-14 justify-center items-center">
                    {/* Logo */}
                    <Image
                        src={GoogleLogo}
                        alt="google"
                        className="w-1/2 md:w-1/4 lg:w-2/12"
                    />
                    {/* Search Box */}
                    <section className="w-10/12 md:w-1/2 lg:w-4/12">
                        {/* Input Box */}
                        <div className="relative">
                            <WeatherSearchInput className="ps-11 pe-[25%] md:pe-[16%] lg:pe-[12%]" />
                            <Image
                                className="cursor-pointer w-4 absolute left-4 top-1/2 transform -translate-y-1/2"
                                src={SearchIcon}
                                alt="search"
                                onClick={handleSearch}
                            />
                            <Image
                                className="w-4 absolute right-4 top-1/2 transform -translate-y-1/2"
                                src={MicIcon}
                                alt="voice-search"
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
                        {/* Action Buttons */}
                        <div className="flex justify-center gap-6 mt-7">
                            <Button
                                text="Google Search"
                                className="bg-[#F8F9FA]"
                                onClick={handleSearch}
                            />
                            <Button
                                text="I'm Feeling Lucky"
                                className="bg-[#F8F9FA]"
                            />
                        </div>
                    </section>
                    <section className="flex gap-1.5 text-sm md:text-md">
                        <p>Google offered in:</p>
                        <ul className="flex gap-3 text-blue-600">
                            <li>
                                <a href="" target="_self">
                                    हिन्दी
                                </a>
                            </li>
                            <li>
                                <a href="" target="_self">
                                    বাংলা
                                </a>
                            </li>
                            <li>
                                <a href="" target="_self">
                                    తెలుగు
                                </a>
                            </li>
                            <li>
                                <a href="" target="_self">
                                    मराठी
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
