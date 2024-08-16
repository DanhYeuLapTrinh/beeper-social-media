import ButtonWithLoader from '@/components/ui/button-with-loader'
import SigninForm from './signin-form'
import { Label } from '@/components/ui/label'
import { useSignin } from '@/hooks/auth/use-signin'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { setState } from '@/lib/redux-toolkit/slices/auth.slice'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function SigninFormProvider() {
  const dispatch = useAppDispatch()
  const { methods, onSubmit, isLoading } = useSignin()
  const { t } = useTranslation()

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col w-full gap-3'>
        <form className='w-full flex flex-col' onSubmit={methods.handleSubmit(onSubmit)}>
          <SigninForm />
          <Label
            onClick={() => dispatch(setState('forgotPassword'))}
            className='text-xs text-primary ml-auto mt-2 cursor-pointer'
          >
            {t('forgot_password')}
          </Label>
          <ButtonWithLoader type='submit' className='mt-3' text='sign_in' isLoading={isLoading} />
        </form>
      </div>
    </FormProvider>
  )
}
