export const AuthService = {
    getAPIHeader: () => {
        return {
            "X-Zomato-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
        };
    },
};
