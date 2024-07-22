import FormGenerator from '../_components/form-generator'
import { USER_LOGIN_FORM } from '@/constants/forms'
import { LoginFormValues } from '@/hooks/use-signin'
import { useFormContext } from 'react-hook-form'

export default function SigninForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LoginFormValues>()

  return (
    <div className='flex flex-col gap-3 w-full'>
      {USER_LOGIN_FORM.map((field) => {
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
    </div>
  )
}
