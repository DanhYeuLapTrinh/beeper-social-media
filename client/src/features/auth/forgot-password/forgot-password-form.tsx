import FormGenerator from '../_components/form-generator'
import { USER_FORGOT_PASSWORD_FORM } from '@/constants/forms'
import { ForgotPasswordFormValues } from '@/hooks/use-password'
import { useFormContext } from 'react-hook-form'

export default function ForgotPasswordForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ForgotPasswordFormValues>()

  return (
    <>
      {USER_FORGOT_PASSWORD_FORM.map((field) => {
        return (
          <FormGenerator
            key={field.id}
            type={field.type}
            inputType={field.inputType}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            register={register}
            errors={errors}
            autoFocus={field.autoFocus}
          />
        )
      })}
    </>
  )
}
