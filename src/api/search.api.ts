import axios from "axios";

export const GetSearchSuggestion = async (searchQuery: string) => {
    if (searchQuery) {
        const result = await axios
            .get("/api/v1/search", {
                params: { text: searchQuery },
            })
            .then((res) => res.data?.data)
            .catch((err) => {
                console.log("Error while getting search suggestions", err);
            });

        return result;
    }
};
