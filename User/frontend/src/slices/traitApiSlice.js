import { apiSlice } from "./apiSlice";

const TRAITS_URL = "/api/traits";

export const traitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation({
      query: (data) => ({
        url: `${TRAITS_URL}/newplan`,
        method: "POST",
        body: data,
      }),
    }),

    getGeneticPlanByFarmerId: builder.mutation({
      query: (data) => ({
        url: `${TRAITS_URL}/getplan/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePlanMutation, useGetGeneticPlanByFarmerIdMutation } = traitApiSlice;