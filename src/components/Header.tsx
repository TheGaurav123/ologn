import { ContainerIcon } from "@/assets/icons";
import { GoogleLogo } from "@/assets/logos";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header({ logo = true }: { logo?: boolean }) {
    const router = useRouter();
    return (
        <header
            className={`w-screen h-[20%] flex ${
                logo ? "justify-between" : "justify-end"
            } px-2 pt-2 md:px-4 md:pt-4`}
        >
            {logo && (
                <Image
                    onClick={() => router.push("/")}
                    src={GoogleLogo}
                    alt="google"
                    className="cursor-pointer w-14 md:w-32 ms-3"
                />
            )}
            <ul className="flex gap-7 items-center">
                <a href="" className="text-xs md:text-sm">
                    Gmail
                </a>
                <a href="" className="text-xs md:text-sm">
                    Images
                </a>
                <a href="" className="flex gap-[2.8px]">
                    <Image width={4} src={ContainerIcon} alt="container" />
                    <Image width={4} src={ContainerIcon} alt="container" />
                    <Image width={4} src={ContainerIcon} alt="container" />
                </a>
                <a href="">
                    <img
                        className=" w-9 h-9 md:w-10 md:h-10 rounded-full"
                        src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
                        alt="Rounded avatar"
                    />
                </a>
            </ul>
        </header>
    );
}
