import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./redux/Provider";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "OLogn | Weather",
    description: "Weather info app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Provider>
                <body
                    className={`${inter.className} flex flex-col min-h-screen`}
                >
                    <Loader />
                    {children}
                </body>
            </Provider>
        </html>
    );
}
