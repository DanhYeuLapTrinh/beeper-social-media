import Actions from '../_components/actions'
import AuthIcons from '../_components/icons'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { LOCAL_STORAGE_KEYS } from '@/constants'
import { useOAuthSignin } from '@/hooks/use-oauth-signin'
import { usePassword } from '@/hooks/use-password'
import { useThrottle } from '@/hooks/use-throttle'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { maskEmail } from '@/lib/utils'
import { ROUTES } from '@/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export default function OTPForm() {
  const [otp, setOtp] = useState('')
  const [value, setValue, removeValue] = useLocalStorage(LOCAL_STORAGE_KEYS.EMAIL_TEMP, '')
  const { verifyEmailCode, createEmailCode, isLoading } = usePassword()
  const { handleSignin } = useOAuthSignin()
  const { successfulFirstFactor, successfulCreation } = useAppSelector((state) => state.password)
  const { t } = useTranslation()
  const { handleClick, isDisabled, seconds } = useThrottle(30)

  const resendCode = () => {
    handleClick()
    createEmailCode({ email: value })
  }

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
      <div className='flex flex-col items-center w-96 gap-3 px-2'>
        <AuthIcons type='mail' />
        <Label className='block text-2xl font-bold'>{t('otp')}</Label>
        <div className='flex flex-col gap-1'>
          <Label className='font-normal text-xs text-center'>{t('otp_desc')}</Label>
          <Label className='font-normal text-xs text-center mb-8'>{maskEmail(value)}</Label>
        </div>
        <form className='w-full flex flex-col items-center'>
          <InputOTP maxLength={6} onChange={(e: string) => setOtp(e)} autoFocus={true}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button className='mb-4' variant='link' onClick={resendCode} disabled={isDisabled}>
            <Label className='text-xs'>{isDisabled ? t('resend_code') + ` (${seconds})` : t('resend_code')}</Label>
          </Button>
          <Actions
            type='1'
            firstTitle='continue'
            firstFunction={() => verifyEmailCode(otp)}
            isLoading={isLoading}
            disabled={isLoading || !(otp.length === 6)}
          />
        </form>
        <Label className='text-muted-foreground text-xs'>{t('or')}</Label>
        <Actions
          type='social'
          isLoading={false}
          firstTitle='continue_with_google'
          secondTitle='continue_with_facebook'
          firstFunction={() => handleSignin('oauth_apple')}
          secondFunction={() => handleSignin('oauth_facebook')}
        />
      </div>
    )
  } else {
    return <Navigate to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.RESET_PASSWORD} />
  }
}
