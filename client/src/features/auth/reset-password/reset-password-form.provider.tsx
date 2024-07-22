import Actions from '../_components/actions'
import AuthIcons from '../_components/icons'
import ResetPasswordForm from './reset-password-form'
import { Label } from '@/components/ui/label'
import { usePassword } from '@/hooks/use-password'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setSuccessfulCreation, setSuccessfulFirstFactor } from '@/lib/redux-toolkit/slices/password.slice'
import { ROUTES } from '@/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ResetPasswordFormProvider() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { resetMethods, resetPassword, isLoading } = usePassword()
  const { successfulFirstFactor } = useAppSelector((state) => state.password)

  const handleGoBack = () => {
    dispatch(setSuccessfulCreation(false))
    dispatch(setSuccessfulFirstFactor(false))
    navigate(ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN, { replace: true })
  }

  if (successfulFirstFactor) {
    return (
      <FormProvider {...resetMethods}>
        <div className='flex flex-col items-center w-96 gap-3 px-2'>
          <AuthIcons type='reset' />
          <Label className='block text-2xl font-bold'>{t('set_new_password')}</Label>
          <Label className='block font-normal mb-7'>{t('set_new_password_desc')}</Label>
          <form className='w-full flex flex-col' onSubmit={resetMethods.handleSubmit((data) => resetPassword(data))}>
            <ResetPasswordForm />
            <Actions
              type='2'
              isLoading={isLoading}
              firstTitle='reset_password'
              secondTitle='back'
              secondFunction={handleGoBack}
              className='mt-2'
            />
          </form>
        </div>
      </FormProvider>
    )
  } else {
    return <Navigate to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.FORGOT_PASSWORD} />
  }
}
