import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl =
    process.env.NODE_ENV !== "production"
        ? "http://127.0.0.1:8080/"
        : import.meta.env.VITE_SERVER_URL;
console.log(baseUrl);
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.userToken;

            console.log(token);

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
                return headers;
            }
        },
    }),
    endpoints: (build) => ({
        getUserDetails: build.query({
            query: () => ({
                url: "users/me",
                method: "GET",
            }),
        }),
    }),
});

// export react hook
export const {useGetUserDetailsQuery} = authApi;
