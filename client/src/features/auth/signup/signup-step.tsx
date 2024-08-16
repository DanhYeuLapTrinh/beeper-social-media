import SignupForm from './signup-form'
import UserTypeForm from './user-type-form'
import VerifyEmailForm from './verify-email-form'
import { SignupFormValues } from '@/hooks/auth/use-signup'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setState } from '@/lib/redux-toolkit/slices/auth.slice'
import { UserType } from '@/models/schemas/auth.schema'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function SignupStep() {
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector((state) => state.auth.currentStep)

  const [userType, setUserType] = useState<UserType>('owner')
  const [otp, setOtp] = useState('')

  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext<SignupFormValues>()

  setValue('otp', otp)

  switch (currentStep) {
    case 1:
      return <UserTypeForm userType={userType} setUserType={setUserType} register={register} />
    case 2:
      return <SignupForm register={register} errors={errors} />
    case 3:
      return <VerifyEmailForm otp={otp} setOtp={setOtp} />
    default:
      dispatch(setState('signUp'))
  }
}
