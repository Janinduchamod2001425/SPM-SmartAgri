import { apiSlice } from "./apiSlice";

const DISEASES_URL = "/api/disease";

export const diseaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDisease: builder.mutation({
      query: (data) => ({
        url: `${DISEASES_URL}/newdisease`,
        method: "POST",
        body: data,
      }),
    }),

    getDiseaseByPestManagerId: builder.query({
      query: (pestManagerId) => ({
        url: `${DISEASES_URL}/getdisease/${pestManagerId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateDiseaseMutation, useGetDiseaseByPestManagerIdQuery } = diseaseApiSlice;
