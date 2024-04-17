import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api";

// type User = {
//     id: number,
//     name: string,
//     role : string[],
// }
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["user"],
    endpoints: builder => ({
        getUsers: builder.query({
            query: ({ token, page, keyword, role, perPage }) => ({
                url: `/users?page=${page}&&search=${
                    keyword ? keyword : ""
                }&&role=${role ? role : ""}&&per_page=${
                    perPage ? perPage : "10"
                }`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["user"],
        }),
        getRoles: builder.query({
            query: token => ({
                url: `/roles`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["user"],
        }),
        getAllRepairers: builder.query({
            query: token => ({
                url: `/all-repairers`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["user"],
        }),
        createUser: builder.mutation({
            query: ({user, token}) => ({
                url: "/users",
                method: "POST",
                body: user,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["user"],
        }),
        deleteUser: builder.mutation({
            query: ({ user, token }) => ({
                url: `/users/${user?.id}`,
                method: "DELETE",
                body: user,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["user"],
        }),
        editUser: builder.mutation({
            query: ({ token, user, id }) => ({
                url: `/users/${id}?_method=PUT`,
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: user,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useDeleteUserMutation,
    useEditUserMutation,
    useCreateUserMutation,
    useGetRolesQuery,
    useGetAllRepairersQuery
} = userApi;
