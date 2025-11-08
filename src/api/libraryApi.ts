import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, Borrow } from "../types";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-kappa-vert.vercel.app/api",
  }),
  tagTypes: ["Books", "Borrow"],
  
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Books"],
      transformResponse: (response: { success: boolean; message: string; data: Book[] }) =>
        response.data,
    }),

    // Get a single book by ID
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { success: boolean; message: string; data: Book }) => response.data,
    }),

    // Create a book (admin only)
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update a book
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete a book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // Borrow a book
    borrowBook: builder.mutation<
      Borrow,
      { book: string; quantity: number; borrowedDate: string; dueDate: string } 
    >({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow"],
    }),



    //  Get Borrow Summary
    getBorrowSummary: builder.query<Borrow[], void>({
      query: () => "/borrow",
      providesTags: ["Borrow"],
      transformResponse: (response: { success: boolean; message: string; data: Borrow[] }) =>
        response.data,
    }),
  }),
});

// Export hooks
export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = libraryApi;
