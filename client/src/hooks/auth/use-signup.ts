import { useToast } from '../common/use-toast'
import { ERROR_MESSAGES } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { goToStep } from '@/lib/redux-toolkit/slices/auth.slice'
import { setIsLoading } from '@/lib/redux-toolkit/slices/loading.slice'
import { getClerkError } from '@/lib/utils'
import { ClerkError } from '@/models/error.model'
import { signupSchema } from '@/models/schemas/auth.schema'
import { ROUTES } from '@/router'
import { useSignUp } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export type SignupFormValues = z.infer<typeof signupSchema>

export const useSignup = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.loading.isLoading)
  const navigate = useNavigate()

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      type: 'owner'
    },
    mode: 'onChange'
  })

  const { setActive, isLoaded, signUp } = useSignUp()
  const { toast } = useToast()
  const { t } = useTranslation()

  const createEmailCode = async ({ email, password, lastName, firstName, username }: SignupFormValues) => {
    if (!isLoaded) {
      return
    }
    try {
      dispatch(setIsLoading(true))
      await signUp.create({
        emailAddress: email,
        password,
        lastName,
        firstName,
        username
      })
      await sendEmailCode()
      toast({
        title: t('email_sent'),
        description: t('email_sent_desc')
      })
      dispatch(goToStep(1))
      dispatch(setIsLoading(false))
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: t(getClerkError(err.errors[0].code))
      })
      dispatch(setIsLoading(false))
    }
  }

  const sendEmailCode = async () => {
    if (!isLoaded) {
      return
    }
    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
  }

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    if (!isLoaded) {
      return
    }
    try {
      dispatch(setIsLoading(true))
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code: data.otp
      })
      if (completeSignup.status === 'complete') {
        await setActive({ session: completeSignup.createdSessionId })
        navigate(ROUTES.PRIVATE.EXPLORE)
        toast({
          title: t('welcome_signup'),
          description: t('welcome_signup_desc')
        })
      }
      dispatch(setIsLoading(false))
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: t(getClerkError(err.errors[0].code))
      })
      dispatch(setIsLoading(false))
    }
  }

  return { methods, onSubmit, createEmailCode, sendEmailCode, isLoading }
}
