import ButtonWithLoader from '@/components/ui/button-with-loader'
import AuthIcons from '../_components/icons'
import ForgotPasswordForm from './forgot-password-form'
import { Label } from '@/components/ui/label'
import { usePassword } from '@/hooks/auth/use-password'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { setState } from '@/lib/redux-toolkit/slices/auth.slice'

export default function ForgotPasswordFormProvider() {
  const dispatch = useAppDispatch()
  const { createEmailCode, isLoading, forgotMethods } = usePassword()
  const { t } = useTranslation()

  return (
    <FormProvider {...forgotMethods}>
      <div className='flex flex-col w-full items-center gap-3'>
        <AuthIcons type='key' />
        <Label className='block text-3xl font-bold'>{t('forgot_password')}</Label>
        <Label className='font-normal text-xs text-center mb-10'>{t('forgot_password_desc')}</Label>
        <form
          className='w-full flex flex-col gap-2'
          onSubmit={forgotMethods.handleSubmit((data) => createEmailCode(data))}
        >
          <ForgotPasswordForm />
          <ButtonWithLoader className='mt-2' isLoading={isLoading} text='send_verification_code' type='submit' />
          <ButtonWithLoader
            variant='link'
            onClick={() => dispatch(setState('signIn'))}
            isLoading={false}
            text='back'
            type='submit'
            className='mt-2'
          />
        </form>
      </div>
    </FormProvider>
  )
}
