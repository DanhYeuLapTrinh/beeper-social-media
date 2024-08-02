import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { useThrottle } from '@/hooks/common/use-throttle'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
interface OTPFormProps {
  otp: string
  setOtp: Dispatch<SetStateAction<string>>
  createEmailCode?: () => void
}

export default function OTPForm({ otp, setOtp, createEmailCode }: OTPFormProps) {
  const { handleClick, isDisabled, seconds } = useThrottle(30)
  const { t } = useTranslation()

  const resendCode = () => {
    handleClick()
    if (createEmailCode) {
      createEmailCode()
    }
  }

  return (
    <>
      <InputOTP maxLength={6} autoFocus={true} value={otp} onChange={(e) => setOtp(e)}>
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
    </>
  )
}
