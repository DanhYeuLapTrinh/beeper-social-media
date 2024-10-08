import SignupStep from './signup-step'
import ButtonHandlers from './button-handlers'
import { useSignup } from '@/hooks/auth/use-signup'
import { FormProvider } from 'react-hook-form'

export default function SignupFormProvider() {
  const { methods, onSubmit } = useSignup()

  return (
    <div className='flex flex-col items-center w-full gap-3'>
      <FormProvider {...methods}>
        <form className='w-full' onSubmit={methods.handleSubmit(onSubmit)}>
          <SignupStep />
          <ButtonHandlers />
        </form>
      </FormProvider>
    </div>
  )
}
