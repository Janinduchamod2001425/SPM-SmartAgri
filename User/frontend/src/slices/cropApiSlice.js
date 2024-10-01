import { apiSlice } from "./apiSlice";

const CROPS_URL = "/api/crops";

export const cropApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCrops: builder.mutation({
      query: () => ({
        url: `${CROPS_URL}/getallcrops`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCropsMutation } = cropApiSlice;