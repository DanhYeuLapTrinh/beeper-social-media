import Actions from '../_components/actions'
import AuthIcons from '../_components/icons'
import ForgotPasswordForm from './forgot-password-form'
import { useOAuthSignin } from '@/hooks/use-oauth-signin'
import { Label, labelVariants } from '@/components/ui/label'
import { usePassword } from '@/hooks/use-password'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { ROUTES } from '@/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function ForgotPasswordFormProvider() {
  const { createEmailCode, isLoading, forgotMethods } = usePassword()
  const { handleSignin } = useOAuthSignin()
  const { successfulCreation } = useAppSelector((state) => state.password)
  const { t } = useTranslation()

  if (successfulCreation) {
    return <Navigate to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.OTP_VERIFICATION} />
  } else {
    return (
      <FormProvider {...forgotMethods}>
        <div className='flex flex-col items-center w-96 gap-3 px-2'>
          <AuthIcons type='key' />
          <Label className='block text-3xl font-bold'>{t('forgot_password')}</Label>
          <Label className='font-normal text-xs text-center mb-10'>{t('forgot_password_desc')}</Label>
          <form
            className='w-full flex flex-col gap-2'
            onSubmit={forgotMethods.handleSubmit((data) => createEmailCode(data))}
          >
            <ForgotPasswordForm />
            <Actions type='1' isLoading={isLoading} firstTitle='send_verification_code' />
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
          <div className='flex items-center gap-1 mt-10 mb-4'>
            <Label className='font-normal'>{t('already_have_an_account')}</Label>
            <Link
              to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN}
              className={cn(labelVariants(), 'text-primary font-semibold')}
            >
              {t('sign_in')}
            </Link>
          </div>
        </div>
      </FormProvider>
    )
  }
}
