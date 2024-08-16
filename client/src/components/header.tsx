import AuthLayout from '@/layouts/auth.layout'
import Popup from './popup'
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { setCurrentStep, setState } from '@/lib/redux-toolkit/slices/auth.slice'

export default function Header() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { signOut } = useClerk()

  const handleClose = () => {
    dispatch(setState('signIn'))
    dispatch(setCurrentStep(1))
  }

  return (
    <header className='bg-background flex items-center justify-around p-3 border-b border-border '>
      <SignedIn>
        <Button onClick={() => signOut()} variant='destructive'>
          Sign out
        </Button>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className='flex items-center gap-2'>
          <Popup className='w-96' content={<AuthLayout />} timeOut={100} onClose={handleClose}>
            <Button size='sm' variant='secondary' className='dark:text-white'>
              {t('sign_in')}
            </Button>
          </Popup>
        </div>
      </SignedOut>
    </header>
  )
}
