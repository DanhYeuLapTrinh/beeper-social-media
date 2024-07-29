import FormGenerator from '../_components/form-generator'
import { USER_RESET_PASSWORD_FORM } from '@/constants/forms'
import { ResetPasswordFormValues } from '@/hooks/auth/use-password'
import { useFormContext } from 'react-hook-form'

export default function ResetPasswordForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ResetPasswordFormValues>()

  return (
    <div className='flex flex-col gap-3 w-full mb-4'>
      {USER_RESET_PASSWORD_FORM.map((field) => {
        return <FormGenerator key={field.id} register={register} errors={errors} {...field} />
      })}
    </div>
  )
}
