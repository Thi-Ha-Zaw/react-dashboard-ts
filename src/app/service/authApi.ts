import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../api'




export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes : ['auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url : '/login',
                method: "POST",
                body: user,
                headers : {
                    'Content-type': 'application/json',
                    // 'Authorization' :  `Bearer ${token}`
                },
            }),
            invalidatesTags : ['auth']
        }),
        logout: builder.mutation({
            query: (token) => ({
                url : '/logout',
                method: "POST",
                headers : {
                    'Content-type': 'application/json',
                    'Authorization' :  `Bearer ${token}`
                },
            }),
            invalidatesTags : ['auth']
        }),
        register: builder.mutation({
            query: (user) => ({
                url : '/login',
                method: "POST",
                body: user,
                headers : {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags : ['auth']
        }),
        profile: builder.query({
            query: (token) => ({
                url : '/me',
                method: "GET",
                headers : {
                    'Content-type': 'application/json',
                    'Authorization' :  `Bearer ${token}`
                },
            }),
            providesTags : ['auth']
        }),
        changePassword: builder.mutation({
            query: ({ token, user }) => ({
                url: '/change-password',
                method: 'POST',
                body: user,
                headers : { 'Authorization' : `Bearer ${token}`}
            }),
            invalidatesTags : ['auth']
        }),
    })
})

export const {useLoginMutation,useRegisterMutation,useProfileQuery,useLogoutMutation,useChangePasswordMutation} = authApi