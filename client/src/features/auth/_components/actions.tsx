import Loader from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/router'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ActionsProps {
  type: 'forgot-password' | 'otp' | 'reset-password' | 'social'
  isLoading: boolean
  otpFunction?: () => void
  googleFunction?: () => void
  disabled?: boolean
}
export default function Actions({ type, isLoading, googleFunction, otpFunction, disabled = isLoading }: ActionsProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  switch (type) {
    case 'forgot-password':
      return (
        <Wrapper>
          <Button className='w-full mt-2' type='submit' disabled={disabled}>
            <Loader
              isLoading={isLoading}
              content={<Label className='dark:text-white'>{t('send_verification_code')}</Label>}
            />
          </Button>
        </Wrapper>
      )
    case 'otp':
      return (
        <Wrapper>
          <Button type='submit' className='w-full mt-2' onClick={otpFunction} disabled={disabled}>
            <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t('continue')}</Label>} />
          </Button>
        </Wrapper>
      )
    case 'reset-password':
      return (
        <Wrapper>
          <Button type='submit' className='w-full mt-2' disabled={disabled}>
            <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t('reset_password')}</Label>} />
          </Button>
          <Button
            variant='link'
            className='w-full'
            onClick={() => navigate(ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN)}
            disabled={disabled}
          >
            <Label className='dark:text-white'>{t('back')}</Label>
          </Button>
        </Wrapper>
      )
    default:
      return (
        <Wrapper className='gap-3'>
          <Button variant='outline' className='w-full' onClick={googleFunction}>
            <div className='flex items-center w-full'>
              <Icons.google className='w-6 h-6 mr-1' />
              <Label className='flex-1 cursor-pointer'>{t('continue_with_google')}</Label>
            </div>
          </Button>
          <Button variant='outline' className='w-full'>
            <div className='flex items-center w-full'>
              <Icons.facebook className='w-6 h-6 mr-1' />
              <Label className='flex-1'>{t('continue_with_facebook')}</Label>
            </div>
          </Button>
        </Wrapper>
      )
  }
}

function Wrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col items-center w-full gap-1', className)}>{children}</div>
}
