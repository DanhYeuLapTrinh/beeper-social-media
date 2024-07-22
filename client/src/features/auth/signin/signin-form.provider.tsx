import SigninForm from './signin-form'
import Actions from '../_components/actions'
import Loader from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Label, labelVariants } from '@/components/ui/label'
import { useOAuthSignin } from '@/hooks/use-oauth-signin'
import { useSignin } from '@/hooks/use-signin'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function SigninFormProvider() {
  const { methods, onSubmit, isLoading } = useSignin()
  const { handleSignin } = useOAuthSignin()
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
          <Button className='w-full mt-3' type='submit' disabled={isLoading}>
            <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t('sign_in')}</Label>} />
          </Button>
        </form>
        <Label className='text-muted-foreground text-xs'>{t('or')}</Label>
        {/* TODO: Login with Facebook*/}
        <Actions
          type='social'
          isLoading={false}
          firstTitle='continue_with_google'
          secondTitle='continue_with_facebook'
          firstFunction={() => handleSignin('oauth_apple')}
          secondFunction={() => handleSignin('oauth_facebook')}
        />
        <div className='flex items-center gap-1 mt-10 mb-4'>
          <Label className='font-normal'>{t('dont_have_an_account')}</Label>
          <Link
            to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_UP}
            className={cn(labelVariants(), 'text-primary font-semibold')}
          >
            {t('sign_up')}
          </Link>
        </div>
      </div>
    </FormProvider>
  )
}
