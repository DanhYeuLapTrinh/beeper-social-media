import AuthIcons from '../_components/icons'
import OTPForm from './otp-form'
import ButtonWithLoader from '@/components/ui/button-with-loader'
import { Label } from '@/components/ui/label'
import { LOCAL_STORAGE_KEYS } from '@/constants'
import { usePassword } from '@/hooks/auth/use-password'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setState, setSuccessfulCreation } from '@/lib/redux-toolkit/slices/auth.slice'
import { maskEmail } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'

export default function OTPFormProvider() {
  const dispatch = useAppDispatch()
  const [value, setValue, removeValue] = useLocalStorage(LOCAL_STORAGE_KEYS.EMAIL_TEMP, '')
  const [otp, setOtp] = useState('')
  const { verifyEmailCode, createEmailCode, isLoading } = usePassword()
  const { successfulFirstFactor, successfulCreation } = useAppSelector((state) => state.auth)
  const { t } = useTranslation()

  useEffect(() => {
    if (otp.length === 6) {
      verifyEmailCode(otp)
    }
    if (!successfulFirstFactor && !successfulCreation) {
      removeValue()
    }
  }, [otp])

  if (!successfulFirstFactor && successfulCreation) {
    return (
      <div className='flex flex-col items-center w-full gap-3 px-2'>
        <AuthIcons type='mail' />
        <Label className='block text-2xl font-bold'>{t('otp')}</Label>
        <div className='flex flex-col gap-1'>
          <Label className='font-normal text-xs text-center'>{t('otp_desc')}</Label>
          <Label className='font-normal text-xs text-center mb-8'>{maskEmail(value)}</Label>
        </div>
        <form className='w-full flex flex-col items-center'>
          <OTPForm otp={otp} setOtp={setOtp} createEmailCode={() => createEmailCode({ email: value })} />
          <ButtonWithLoader
            className='w-full mt-2'
            onClick={() => verifyEmailCode(otp)}
            isLoading={isLoading}
            text='send_verification_code'
            type='submit'
            disabled={isLoading || !(otp.length === 6)}
          />
        </form>
      </div>
    )
  } else {
    dispatch(setState('forgotPassword'))
    dispatch(setSuccessfulCreation(false))
  }
}
