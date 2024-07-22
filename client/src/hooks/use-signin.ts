import { useToast } from '@/components/ui/use-toast'
import { ERROR_MESSAGES } from '@/constants'
import { ClerkError } from '@/models/error.model'
import { loginSchema } from '@/models/schemas/auth.schema'
import { ROUTES } from '@/router'
import { useSignIn } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginSchema>

export const useSignin = () => {
  const navigate = useNavigate()

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ identifier, password }) => {
    if (!isLoaded) {
      return
    }
    try {
      setIsLoading(true)
      const signInAttempt = await signIn.create({
        identifier,
        password
      })
      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        navigate(ROUTES.PRIVATE.EXPLORE)
      }
      setIsLoading(false)
      methods.reset()
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: err.errors[0].longMessage
      })
      setIsLoading(false)
      methods.resetField('password')
    }
  }

  return { methods, onSubmit, isLoading }
}
