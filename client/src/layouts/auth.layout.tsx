import Wrapper from '@/components/wrapper'
import Social from '@/features/auth/_components/social'
import PageLoader from '@/components/page-loader'
import { Card } from '@/components/ui/card'
import { Label, labelVariants } from '@/components/ui/label'
import { useOAuthSignin } from '@/hooks/auth/use-oauth-signin'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/router'
import { useAuth } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { setCurrentStep } from '@/lib/redux-toolkit/slices/auth.slice'

export default function AuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { userId, isLoaded } = useAuth()
  const { handleSignin } = useOAuthSignin()
  const { t } = useTranslation()

  const currentPath = location.pathname.split('/')[2]
  const isDisplaySocial = ![ROUTES.PUBLIC.RESET_PASSWORD, ROUTES.PUBLIC.OTP_VERIFICATION].includes(currentPath)
  const isDisplaySigin = location.pathname.includes(ROUTES.PUBLIC.SIGN_UP)
  const isDisplaySignup = [ROUTES.PUBLIC.SIGN_IN, ROUTES.PUBLIC.FORGOT_PASSWORD].includes(currentPath)

  if (!isLoaded) {
    return <PageLoader />
  } else if (!userId) {
    return (
      <Wrapper className='flex items-center justify-center'>
        <Card className='flex flex-col items-center px-4 py-8 gap-5'>
          <Outlet />
          {/* TODO: Login with Facebook*/}
          {isDisplaySocial ? (
            <>
              <div className='flex items-center justify-center w-full'>
                <div className='w-full border-b bg-border' />
                <Label className='text-muted-foreground text-xs mx-3'>{t('or')}</Label>
                <div className='w-full border-b bg-border' />
              </div>
              <Social
                firstTitle='continue_with_google'
                firstFunction={() => handleSignin('oauth_google')}
                secondTitle='continue_with_facebook'
                secondFunction={() => handleSignin('oauth_facebook')}
              />
            </>
          ) : null}
          {isDisplaySignup ? (
            <div className='flex items-center gap-1 mt-10 mb-4'>
              <Label className='font-normal'>{t('dont_have_an_account')}</Label>
              <Link
                to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_UP}
                className={cn(labelVariants(), 'text-primary font-semibold')}
              >
                {t('sign_up')}
              </Link>
            </div>
          ) : isDisplaySigin ? (
            <div className='flex items-center gap-1 mt-10 mb-4'>
              <Label className='font-normal'>{t('already_have_an_account')}</Label>
              <Link
                to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN}
                className={cn(labelVariants(), 'text-primary font-semibold')}
                onClick={() => dispatch(setCurrentStep(1))}
              >
                {t('sign_in')}
              </Link>
            </div>
          ) : null}
        </Card>
      </Wrapper>
    )
  } else {
    navigate(ROUTES.PRIVATE.HOME, { replace: true })
  }
}
