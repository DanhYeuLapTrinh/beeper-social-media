import ButtonWithLoader from '@/components/ui/button-with-loader'
import SigninForm from './signin-form'
import { Icons } from '@/components/ui/icons'
import { Label, labelVariants } from '@/components/ui/label'
import { useSignin } from '@/hooks/auth/use-signin'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function SigninFormProvider() {
  const { methods, onSubmit, isLoading } = useSignin()
  const { t } = useTranslation()

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col items-center w-96 gap-3 px-2'>
        <Icons.beeper className='w-20 h-20 mb-3 mx-auto' />
        <Label className='block text-2xl font-bold'>{t('sign_in_to_beeper')}</Label>
        <Label className='block font-normal mb-10'>{t('welcome_signin')}</Label>
        <form className='w-full flex flex-col' onSubmit={methods.handleSubmit(onSubmit)}>
          <SigninForm />
          <Link
            to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.FORGOT_PASSWORD}
            className={cn(labelVariants(), 'text-xs text-primary ml-auto mt-2 cursor-pointer')}
          >
            {t('forgot_password')}
          </Link>
          <ButtonWithLoader type='submit' className='mt-3' text='sign_in' isLoading={isLoading} />
        </form>
      </div>
    </FormProvider>
  )
}
