import Social from '@/features/auth/_components/social'
import Auth from '@/features/auth/auth'
import AuthHeader from '@/features/auth/_components/auth-header'
import { Label } from '@/components/ui/label'
import { useOAuthSignin } from '@/hooks/auth/use-oauth-signin'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setCurrentStep, setState } from '@/lib/redux-toolkit/slices/auth.slice'
import { useTranslation } from 'react-i18next'

export default function AuthLayout() {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth.state)
  const { handleSignin } = useOAuthSignin()
  const { t } = useTranslation()

  const isDisplaySignup = authState === 'signIn'
  const isDisplaySigin = authState === 'signUp'
  const isDisplaySocial = isDisplaySignup || authState === 'signUp'

  return (
    <div className='flex flex-col'>
      {isDisplaySigin && <AuthHeader title='sign_up' description='' />}
      {isDisplaySignup && <AuthHeader title='sign_in' description='' />}
      <div className='flex flex-col flex-1 flex-grow items-center gap-5'>
        {isDisplaySocial ? (
          <>
            <Social
              firstTitle='continue_with_google'
              firstFunction={() => handleSignin('oauth_google')}
              secondTitle='continue_with_facebook'
              secondFunction={() => handleSignin('oauth_facebook')}
            />
            <div className='flex items-center justify-center w-full'>
              <div className='w-full border-b bg-border' />
              <Label className='text-muted-foreground text-xs mx-3'>{t('or')}</Label>
              <div className='w-full border-b bg-border' />
            </div>
          </>
        ) : null}
        <Auth />
        {isDisplaySignup ? (
          <div className='flex items-center gap-1 mt-10 mb-4'>
            <Label className='font-normal'>{t('dont_have_an_account')}</Label>
            <Label onClick={() => dispatch(setState('signUp'))} className='text-primary font-semibold cursor-pointer'>
              {t('sign_up')}
            </Label>
          </div>
        ) : null}
        {isDisplaySigin ? (
          <div className='flex items-center gap-1 mt-10 mb-4'>
            <Label className='font-normal'>{t('already_have_an_account')}</Label>
            <Label
              className='text-primary font-semibold cursor-pointer'
              onClick={() => {
                dispatch(setState('signIn'))
                dispatch(setCurrentStep(1))
              }}
            >
              {t('sign_in')}
            </Label>
          </div>
        ) : null}
      </div>
    </div>
  )
}
