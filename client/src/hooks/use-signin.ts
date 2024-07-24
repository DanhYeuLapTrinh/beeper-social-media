import { useToast } from '@/components/ui/use-toast'
import { ERROR_MESSAGES } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setIsLoading } from '@/lib/redux-toolkit/slices/loading.slice'
import { getClerkError } from '@/lib/utils'
import { ClerkError } from '@/models/error.model'
import { loginSchema } from '@/models/schemas/auth.schema'
import { ROUTES } from '@/router'
import { useSignIn } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginSchema>

export const useSignin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.loading.isLoading)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const { isLoaded, signIn, setActive } = useSignIn()
  const { toast } = useToast()
  const { t } = useTranslation()

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ identifier, password }) => {
    if (!isLoaded) {
      return
    }
    try {
      dispatch(setIsLoading(true))
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
      dispatch(setIsLoading(false))
      methods.reset()
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: t(getClerkError(err.errors[0].code))
      })
      dispatch(setIsLoading(false))
      methods.resetField('password')
    }
  }

  return { methods, onSubmit, isLoading }
}
