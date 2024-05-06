import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token || localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUser: builder.query({ query: () => ({ url: "/", method: "GET" }), providesTags: ["Users"] }),
    loginUser: builder.mutation({ query: (payload) => ({ url: "/login", method: "POST", body: payload }), invalidatesTags: ["Users"] }),
    registerUser: builder.mutation({ query: (payload) => ({ url: "/register", method: "POST", body: payload }), invalidatesTags: ["Users"] }),
    updateUser: builder.mutation({ query: (payload) => ({ url: "/", method: "PATCH", body: payload }), invalidatesTags: ["Users"] }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useUpdateUserMutation } = api;
