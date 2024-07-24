import SignupForm from './signup-form'
import UserTypeForm from './user-type-form'
import VerifyEmailForm from './verify-email-form'
import { Label } from '@/components/ui/label'
import { SignupFormValues } from '@/hooks/use-signup'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { UserType } from '@/models'
import { ROUTES } from '@/router'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

export default function SignupStep() {
  const currentStep = useAppSelector((state) => state.auth.currentStep)
  const [userType, setUserType] = useState<UserType>('owner')
  const [otp, setOtp] = useState('')

  const { t } = useTranslation()
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
      return (
        <div className='flex flex-col gap-3'>
          <Label className='block text-2xl font-bold'>{t('account_details')}</Label>
          <Label className='block font-normal mb-10'>{t('account_details_desc')}</Label>
          <SignupForm register={register} errors={errors} />
        </div>
      )
    case 3:
      return <VerifyEmailForm otp={otp} setOtp={setOtp} />
    default:
      return <Navigate to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN} />
  }
}
