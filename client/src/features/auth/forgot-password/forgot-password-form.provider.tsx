import Actions from '../_components/actions'
import AuthIcons from '../_components/icons'
import ForgotPasswordForm from './forgot-password-form'
import { useOAuthSignin } from '@/hooks/use-oauth-signin'
import { Label } from '@/components/ui/label'
import { usePassword } from '@/hooks/use-password'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { ROUTES } from '@/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

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
            <Actions type='forgot-password' isLoading={isLoading} />
          </form>
          <Label className='text-muted-foreground text-xs'>{t('or')}</Label>
          <Actions type='social' isLoading={false} googleFunction={() => handleSignin('oauth_apple')} />
        </div>
      </FormProvider>
    )
  }
}
