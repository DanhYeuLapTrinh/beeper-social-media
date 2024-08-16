import AuthIcons from '../_components/icons'
import ResetPasswordForm from './reset-password-form'
import ButtonWithLoader from '@/components/ui/button-with-loader'
import { Label } from '@/components/ui/label'
import { usePassword } from '@/hooks/auth/use-password'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setState, setSuccessfulCreation, setSuccessfulFirstFactor } from '@/lib/redux-toolkit/slices/auth.slice'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function ResetPasswordFormProvider() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { resetMethods, resetPassword, isLoading } = usePassword()
  const { successfulFirstFactor } = useAppSelector((state) => state.auth)

  const handleGoBack = () => {
    dispatch(setSuccessfulCreation(false))
    dispatch(setSuccessfulFirstFactor(false))
  }

  if (successfulFirstFactor) {
    return (
      <FormProvider {...resetMethods}>
        <div className='flex flex-col items-center w-full gap-3 px-2'>
          <AuthIcons type='reset' />
          <Label className='block text-2xl font-bold'>{t('set_new_password')}</Label>
          <Label className='block font-normal mb-7'>{t('set_new_password_desc')}</Label>
          <form className='w-full flex flex-col' onSubmit={resetMethods.handleSubmit((data) => resetPassword(data))}>
            <ResetPasswordForm />
            <ButtonWithLoader isLoading={isLoading} text='reset_password' type='submit' className='mt-2' />
            <ButtonWithLoader
              variant='link'
              onClick={handleGoBack}
              isLoading={false}
              text='back'
              type='submit'
              className='mt-2'
            />
          </form>
        </div>
      </FormProvider>
    )
  } else {
    dispatch(setState('forgotPassword'))
    dispatch(setSuccessfulCreation(false))
    dispatch(setSuccessfulFirstFactor(false))
  }
}
