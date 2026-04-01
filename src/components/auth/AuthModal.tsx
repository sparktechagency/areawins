"use client";

import { ReusableModal } from "@/components/shared/ReusableModal";
import { closeAuthModal } from "@/redux/features/authUiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";
import VerifyOtpForm from "./VerifyOtpForm";

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
      closeOnOutsideClick={false}
      maxWidth="md"
      padding="none"
    >
      <div className="flex flex-col h-full bg-card">{renderContent()}</div>
    </ReusableModal>
  );
};

export default AuthModal;
