import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const actionApi = createApi({
  reducerPath: "actionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getFavoriteMovie: builder.query({
      query: () => "/actions",
      providesTags: ["Movies"],
    }),
    addFavoriteMovie: builder.mutation({
      query: (name) => ({
        url: "/actions",
        method: "POST",
        body: name,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Movies"],
    }),
    deleteFavoriteMovie: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Movies"],
    }),
  }),
});

export const {
  useAddFavoriteMovieMutation,
  useGetFavoriteMovieQuery,
  useDeleteFavoriteMovieMutation,
} = actionApi;
