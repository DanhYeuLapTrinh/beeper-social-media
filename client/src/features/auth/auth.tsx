import SigninFormProvider from './signin/signin-form.provider'
import SignupFormProvider from './signup/signup-form.provider'
import ForgotPasswordFormProvider from './forgot-password/forgot-password-form.provider'
import OTPFormProvider from './otp/otp-form.provider'
import ResetPasswordFormProvider from './reset-password/reset-password-form.provider'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'

export default function Auth() {
  const authState = useAppSelector((state) => state.auth.state)

  switch (authState) {
    case 'signUp':
      return <SignupFormProvider />
    case 'forgotPassword':
      return <ForgotPasswordFormProvider />
    case 'otpVerification':
      return <OTPFormProvider />
    case 'resetPassword':
      return <ResetPasswordFormProvider />
    default:
      return <SigninFormProvider />
  }
}
