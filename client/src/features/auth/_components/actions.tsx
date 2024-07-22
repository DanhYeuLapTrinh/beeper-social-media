import Loader from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface ActionsProps {
  type: '1' | '2' | 'social'
  isLoading: boolean
  firstTitle: string
  secondTitle?: string
  firstFunction?: () => void
  secondFunction?: () => void
  disabled?: boolean
  className?: string
}

export default function Actions({
  type,
  firstTitle,
  secondTitle,
  firstFunction,
  secondFunction,
  isLoading,
  disabled = isLoading,
  className
}: ActionsProps) {
  const { t } = useTranslation()

  // switch (type) {
  //   case 'forgot-password':
  //     return (
  //       <Wrapper>
  //         <Button className='w-full mt-2' type='submit' disabled={disabled}>
  //           <Loader
  //             isLoading={isLoading}
  //             content={<Label className='dark:text-white'>{t('send_verification_code')}</Label>}
  //           />
  //         </Button>
  //       </Wrapper>
  //     )
  //   case 'otp':
  //     return (
  //       <Wrapper>
  //         <Button type='submit' className='w-full mt-2' onClick={otpFunction} disabled={disabled}>
  //           <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t('continue')}</Label>} />
  //         </Button>
  //       </Wrapper>
  //     )
  //   case 'reset-password':
  //     return (
  //       <Wrapper>
  //         <Button type='submit' className='w-full mt-2' disabled={disabled}>
  //           <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t('reset_password')}</Label>} />
  //         </Button>
  //         <Button
  //           variant='link'
  //           className='w-full'
  //           onClick={() => navigate(ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN)}
  //           disabled={disabled}
  //         >
  //           <Label className='dark:text-white'>{t('back')}</Label>
  //         </Button>
  //       </Wrapper>
  //     )
  switch (type) {
    case '1':
      return (
        <Wrapper className={className}>
          <Button className='w-full mt-2' onClick={firstFunction} type='submit' disabled={disabled}>
            <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t(firstTitle)}</Label>} />
          </Button>
        </Wrapper>
      )
    case '2':
      return (
        <Wrapper className={className}>
          <Button type='submit' className='w-full mt-2' onClick={firstFunction} disabled={disabled}>
            <Loader isLoading={isLoading} content={<Label className='dark:text-white'>{t(firstTitle)}</Label>} />
          </Button>
          <Button variant='link' className='w-full' onClick={secondFunction} disabled={disabled}>
            <Label className='dark:text-white'>{t(secondTitle as string)}</Label>
          </Button>
        </Wrapper>
      )
    default:
      return (
        <Wrapper className='gap-3'>
          <Button variant='outline' className='w-full' onClick={firstFunction}>
            <div className='flex items-center w-full'>
              <Icons.google className='w-6 h-6 mr-1' />
              <Label className='flex-1 cursor-pointer'>{t(firstTitle)}</Label>
            </div>
          </Button>
          <Button variant='outline' className='w-full' onClick={secondFunction}>
            <div className='flex items-center w-full'>
              <Icons.facebook className='w-6 h-6 mr-1' />
              <Label className='flex-1'>{t(secondTitle as string)}</Label>
            </div>
          </Button>
        </Wrapper>
      )
  }
}

function Wrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col items-center w-full gap-1', className)}>{children}</div>
}
