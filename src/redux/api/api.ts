import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { URLSearchParams } from "url";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: `/tasks`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["todo"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation({
      query: (data) => {
        return {
          url: `/tasks/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = baseApi;
