import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: "/payments/initiate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    uploadBankReceipt: builder.mutation({
      query: (data: { transactionId: string; receipt: File; externalReference?: string }) => {
        const formData = new FormData();
        formData.append("transactionId", data.transactionId);
        if (data.externalReference) {
           formData.append("externalReference", data.externalReference);
        }
        formData.append("receipt", data.receipt);
        return {
          url: "/payments/bank/upload-receipt", 
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useInitiatePaymentMutation, useUploadBankReceiptMutation } = paymentApi;
