import { useToast } from '@/components/ui/use-toast'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { goToStep } from '@/lib/redux-toolkit/slices/auth.slice'
import { signupSchema } from '@/models/schemas/auth.schema'
import { ROUTES } from '@/router'
import { useSignUp } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export const useSignup = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { signUp, isLoaded, setActive } = useSignUp()
  const methods = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      type: 'owner'
    },
    mode: 'onChange'
  })

  const generateOtp = async (email: string, password: string) => {
    if (!isLoaded) return
    try {
      // Start the sign-up process using the email and password provided
      await signUp.create({
        emailAddress: email,
        password
      })
      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      })
      // Move to the next step
      dispatch(goToStep(1))
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message
      })
    }
  }

  const handleSubmit = methods.handleSubmit(async (formData) => {
    if (!isLoaded) return
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: formData.otp
      })
      // If verification was completed, set the session to active
      // and redirect the user
      // TODO: Save to MongoDB and Clerk
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        navigate(ROUTES.PRIVATE.HOME)
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message
      })
    }
  })
}
