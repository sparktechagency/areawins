import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthView =
  | "LOGIN"
  | "REGISTER"
  | "FORGOT_PASSWORD"
  | "VERIFY_OTP"
  | "RESET_PASSWORD";

interface AuthUiState {
  isOpen: boolean;
  view: AuthView;
  email?: string;
  otp?: string;
  otpReason?: "REGISTER" | "FORGOT_PASSWORD";
}

const initialState: AuthUiState = {
  isOpen: false,
  view: "LOGIN",
};

const authUiSlice = createSlice({
  name: "authUi",
  initialState,
  reducers: {
    openAuthModal: (
      state,
      action: PayloadAction<
        | {
            view?: AuthView;
            email?: string;
            otpReason?: "REGISTER" | "FORGOT_PASSWORD";
          }
        | undefined
      >
    ) => {
      state.isOpen = true;
      state.view = action.payload?.view || "LOGIN";
      if (action.payload?.email) {
        state.email = action.payload.email;
      }
      if (action.payload?.otpReason) {
        state.otpReason = action.payload.otpReason;
      }
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
      // We can optionally reset view on close, but keeping last view might be better UX sometimes.
      // Resetting for safety:
      state.view = "LOGIN";
      state.email = undefined;
      state.otp = undefined;
      state.otpReason = undefined;
    },
    setAuthView: (state, action: PayloadAction<AuthView>) => {
      state.view = action.payload;
    },
    setAuthEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAuthOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setOtpReason: (
      state,
      action: PayloadAction<"REGISTER" | "FORGOT_PASSWORD">
    ) => {
      state.otpReason = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthView,
  setAuthEmail,
  setAuthOtp,
  setOtpReason,
} = authUiSlice.actions;
export default authUiSlice.reducer;
