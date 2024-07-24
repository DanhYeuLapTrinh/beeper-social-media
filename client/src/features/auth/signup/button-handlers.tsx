import ButtonWithLoader from '@/components/ui/button-with-loader'
import { SignupFormValues, useSignup } from '@/hooks/use-signup'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { goToStep } from '@/lib/redux-toolkit/slices/auth.slice'
import { useFormContext } from 'react-hook-form'

export default function ButtonHandlers() {
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector((state) => state.auth.currentStep)

  const { isLoading, createEmailCode } = useSignup()
  const {
    getValues,
    formState: { errors }
  } = useFormContext<SignupFormValues>()

  const goForward = () => {
    dispatch(goToStep(1))
  }

  const goBack = () => {
    dispatch(goToStep(-1))
  }

  const generateOTP = () => {
    createEmailCode(getValues())
  }

  const shouldAddGenerateOTP = Object.keys(errors).length === 1 && Object.prototype.hasOwnProperty.call(errors, 'otp')

  switch (currentStep) {
    case 1:
      return <ButtonWithLoader className='w-full mt-3' isLoading={false} text='continue' onClick={goForward} />
    case 2:
      return (
        <div className='flex flex-col gap-3 mt-4'>
          <ButtonWithLoader
            isLoading={isLoading}
            text='send_verification_code'
            type='submit'
            onClick={shouldAddGenerateOTP ? generateOTP : undefined}
          />
          <ButtonWithLoader variant='link' isLoading={false} text='back' onClick={goBack} />
        </div>
      )
    case 3:
      return <ButtonWithLoader className='w-full' isLoading={isLoading} text='continue' type='submit' />
  }
}
