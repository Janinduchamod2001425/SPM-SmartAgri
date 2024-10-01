import { apiSlice } from "./apiSlice";

const FERTILIZERFEEDBACK_URL = "/api/feedback";

export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (data) => ({
        url: `${FERTILIZERFEEDBACK_URL}/newfeedback`,
        method: 'POST',
        body: data,
      }),
    }),
    getFeedbackByCropManagerId: builder.query({
      query: (cropManagerId) => ({
        url: `${FERTILIZERFEEDBACK_URL}/getfeedback/${cropManagerId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateFeedbackMutation, useGetFeedbackByCropManagerIdQuery } = feedbackApiSlice;
