import { useToast } from '../common/use-toast'
import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setState } from '@/lib/redux-toolkit/slices/auth.slice'
import { setIsLoading } from '@/lib/redux-toolkit/slices/loading.slice'
import { setSuccessfulCreation, setSuccessfulFirstFactor } from '@/lib/redux-toolkit/slices/auth.slice'
import { getClerkError } from '@/lib/utils'
import { ClerkError } from '@/models/error.model'
import { forgotPasswordSchema, resetPasswordSchema } from '@/models/schemas/auth.schema'
import { useSignIn } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const isLoading = useAppSelector((state) => state.loading.isLoading)

  const [value, setValue, removeValue] = useLocalStorage(LOCAL_STORAGE_KEYS.EMAIL_TEMP, '')
  const { isLoaded, signIn, setActive } = useSignIn()
  const { toast } = useToast()
  const { t } = useTranslation()

  const createEmailCode: SubmitHandler<ForgotPasswordFormValues> = async ({ email }) => {
    if (!isLoaded) {
      return
    }
    try {
      dispatch(setIsLoading(true))
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email
      })
      dispatch(setIsLoading(false))
      dispatch(setState('otpVerification'))
      dispatch(setSuccessfulCreation(true))
      toast({
        title: t('email_sent'),
        description: t('email_sent_desc')
      })
      setValue(email)
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: t(getClerkError(err.errors[0].code))
      })
      dispatch(setIsLoading(false))
      forgotMethods.reset()
    }
  }

  const verifyEmailCode = async (code: string) => {
    if (!isLoaded) {
      return
    }
    try {
      dispatch(setIsLoading(true))
      await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code
      })
      dispatch(setIsLoading(false))
      dispatch(setState('resetPassword'))
      dispatch(setSuccessfulFirstFactor(true))
      removeValue()
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: t(getClerkError(err.errors[0].code))
      })
      dispatch(setIsLoading(false))
    }
  }

  const resetPassword: SubmitHandler<ResetPasswordFormValues> = async ({ password, isSignoutAll }) => {
    if (!isLoaded) {
      return
    }
    try {
      dispatch(setIsLoading(true))
      const result = await signIn.resetPassword({
        password,
        signOutOfOtherSessions: isSignoutAll === 'off' ? false : true
      })
      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId })
      }
      dispatch(setIsLoading(false))
    } catch (error) {
      const err = JSON.parse(JSON.stringify(error)) as ClerkError
      toast({
        title: ERROR_MESSAGES.OOPS,
        description: t(getClerkError(err.errors[0].code))
      })
      dispatch(setIsLoading(false))
      resetMethods.reset()
    } finally {
      dispatch(setState('forgotPassword'))
      dispatch(setSuccessfulCreation(false))
      dispatch(setSuccessfulFirstFactor(false))
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
