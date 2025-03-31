import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/api";
import { Todo } from "../../types/interfaces";

interface TodosApiResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

const limitPerLoad: number = 30;

export const todosApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl + "todos" }),
  reducerPath: "todos",
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    // infiniteQuery vs Query
    getTodos: build.infiniteQuery<
      TodosApiResponse,
      { limit: number; skip: number },
      { limit: number; skip: number }
    >({
      infiniteQueryOptions: {
        initialPageParam: { limit: limitPerLoad, skip: 0 },
        getNextPageParam: (e) => {
          return e.skip + limitPerLoad < e.total
            ? { limit: limitPerLoad, skip: e.skip + limitPerLoad }
            : undefined;
        },
      },
      query: ({ pageParam }) => {
        return `?limit=${pageParam.limit}&skip=${pageParam.skip}`;
      },
    }),
  }),
});

export const { useGetTodosInfiniteQuery } = todosApiSlice;
