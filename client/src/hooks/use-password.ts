import { useToast } from '@/components/ui/use-toast'
import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from '@/constants'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { setSuccessfulCreation, setSuccessfulFirstFactor } from '@/lib/redux-toolkit/slices/password.slice'
import { ClerkError } from '@/models/error.model'
import { forgotPasswordSchema, resetPasswordSchema } from '@/models/schemas/auth.schema'
import { useSignIn } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export const usePassword = () => {
  const forgotMethods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  })
  const resetMethods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue, removeValue] = useLocalStorage(LOCAL_STORAGE_KEYS.EMAIL_TEMP, '')
  const { isLoaded, signIn, setActive } = useSignIn()
  const { toast } = useToast()
  const { t } = useTranslation()

  const createEmailCode: SubmitHandler<ForgotPasswordFormValues> = async ({ email }) => {
    if (!isLoaded) {
      return
    }
    try {
      setIsLoading(true)
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email
      })
      dispatch(setSuccessfulCreation(true))
      toast({
        title: t('email_sent'),
        description: t('email_sent_desc')
      })
      setIsLoading(false)
      setValue(email)
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: err.errors[0].longMessage
      })
      setIsLoading(false)
      forgotMethods.reset()
    }
  }

  const verifyEmailCode = async (code: string) => {
    if (!isLoaded) {
      return
    }
    try {
      setIsLoading(true)
      await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code
      })
      setIsLoading(false)
      removeValue()
      dispatch(setSuccessfulFirstFactor(true))
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: err.errors[0].longMessage
      })
      setIsLoading(false)
    }
  }

  const resetPassword: SubmitHandler<ResetPasswordFormValues> = async ({ password, isSignoutAll }) => {
    if (!isLoaded) {
      return
    }
    try {
      setIsLoading(true)
      const result = await signIn.resetPassword({
        password,
        signOutOfOtherSessions: isSignoutAll === 'off' ? false : true
      })
      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId })
      }
      setIsLoading(false)
      dispatch(setSuccessfulCreation(false))
      dispatch(setSuccessfulFirstFactor(false))
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: err.errors[0].longMessage
      })
      setIsLoading(false)
      resetMethods.reset()
    }
  }

  return {
    createEmailCode,
    verifyEmailCode,
    resetPassword,
    isLoading,
    forgotMethods,
    resetMethods,
    value,
    toast
  }
}
