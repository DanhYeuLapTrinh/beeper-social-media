import OTPForm from '../otp/otp-form'
import AuthIcons from '../_components/icons'
import { Label } from '@/components/ui/label'
import { SignupFormValues, useSignup } from '@/hooks/use-signup'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface VerifyEmailFormProps {
  otp: string
  setOtp: Dispatch<SetStateAction<string>>
}

export default function VerifyEmailForm({ otp, setOtp }: VerifyEmailFormProps) {
  const { sendEmailCode, onSubmit } = useSignup()
  const { getValues } = useFormContext<SignupFormValues>()
  const { t } = useTranslation()

  const generateOTP = () => {
    sendEmailCode()
  }

  useEffect(() => {
    if (otp.length === 6) {
      onSubmit(getValues())
    }
  }, [otp])

  return (
    <div className='flex flex-col items-center w-96 gap-3 px-2'>
      <AuthIcons type='mail' />
      <Label className='block text-2xl font-bold'>{t('otp')}</Label>
      <Label className='block font-normal mb-10'>{t('otp_signup_desc')}</Label>
      <OTPForm otp={otp} setOtp={setOtp} createEmailCode={generateOTP} />
    </div>
  )
}
