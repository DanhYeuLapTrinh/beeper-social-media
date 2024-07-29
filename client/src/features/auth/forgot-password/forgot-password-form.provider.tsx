import AuthIcons from '../_components/icons'
import ForgotPasswordForm from './forgot-password-form'
import ButtonWithLoader from '@/components/ui/button-with-loader'
import { Label } from '@/components/ui/label'
import { usePassword } from '@/hooks/auth/use-password'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { ROUTES } from '@/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

export default function ForgotPasswordFormProvider() {
  const { createEmailCode, isLoading, forgotMethods } = usePassword()
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
            <ButtonWithLoader className='mt-2' isLoading={isLoading} text='send_verification_code' type='submit' />
          </form>
        </div>
      </FormProvider>
    )
  }
}
