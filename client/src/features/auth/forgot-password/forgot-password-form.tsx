import FormGenerator from '../_components/form-generator'
import { USER_FORGOT_PASSWORD_FORM } from '@/constants/forms'
import { ForgotPasswordFormValues } from '@/hooks/auth/use-password'
import { useFormContext } from 'react-hook-form'

export default function ForgotPasswordForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ForgotPasswordFormValues>()

  return (
    <>
      {USER_FORGOT_PASSWORD_FORM.map((field) => {
        return <FormGenerator key={field.id} register={register} errors={errors} {...field} />
      })}
    </>
  )
}
