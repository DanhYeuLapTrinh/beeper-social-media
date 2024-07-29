import FormGenerator from '../_components/form-generator'
import { USER_SIGNIN_FORM } from '@/constants/forms'
import { LoginFormValues } from '@/hooks/auth/use-signin'
import { useFormContext } from 'react-hook-form'

export default function SigninForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LoginFormValues>()

  return (
    <div className='flex flex-col gap-3 w-full'>
      {USER_SIGNIN_FORM.map((field) => {
        return <FormGenerator key={field.id} register={register} errors={errors} {...field} />
      })}
    </div>
  )
}
