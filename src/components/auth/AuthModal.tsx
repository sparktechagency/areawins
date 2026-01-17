"use client";

import { ReusableModal } from "@/components/shared/ReusableModal";
import { closeAuthModal } from "@/lib/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import VerifyOtpForm from "./forms/VerifyOtpForm";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, view } = useAppSelector((state) => state.authUi);

  const renderContent = () => {
    switch (view) {
      case "LOGIN":
        return <LoginForm />;
      case "REGISTER":
        return <RegisterForm />;
      case "FORGOT_PASSWORD":
        return <ForgotPasswordForm />;
      case "VERIFY_OTP":
        return <VerifyOtpForm />;
      case "RESET_PASSWORD":
        return <ResetPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={() => dispatch(closeAuthModal())}
      maxWidth="md"
      padding="none"
    >
      <div className="flex flex-col h-full bg-card">{renderContent()}</div>
    </ReusableModal>
  );
};

export default AuthModal;
