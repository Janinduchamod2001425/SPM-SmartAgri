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

    matchTraits: builder.mutation({
      query: (data) => ({
        url: `${TRAITS_URL}/match_traits`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePlanMutation, useGetGeneticPlanByFarmerIdMutation, useMatchTraitsMutation } = traitApiSlice;