import { LOCALITY_LIST } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

interface Locality {
    cityName: string;
    localityName: string;
}

interface Response {
    message: string;
    data?: Locality[];
    statusCode: number;
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const text = String(searchParams.get("text")).toLowerCase();

        if (text) {
            const data: Locality[] = [];
            LOCALITY_LIST.forEach((item: Locality) => {
                if (
                    String(item.cityName).toLowerCase().includes(text) ||
                    String(item.localityName).toLowerCase().includes(text)
                ) {
                    data.push(item);
                }
            });
            const response: Response = {
                message: "Search successful",
                data,
                statusCode: 200,
            };
            return NextResponse.json(response);
        } else {
            const response: Response = {
                message: "No search text provided",
                statusCode: 400,
            };
            return NextResponse.json(response, { status: 400 });
        }
    } catch (error) {
        console.error("Error while searching:", error);
        const response: Response = {
            message: "Internal Server Error",
            statusCode: 500,
        };
        return NextResponse.json(response, { status: 500 });
    }
}
