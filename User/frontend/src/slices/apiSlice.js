import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Genetic_Plan'],
  tagTypes: ['Feedback','FertilizerFeedback'],
  endpoints: (builder) => ({}),
});
