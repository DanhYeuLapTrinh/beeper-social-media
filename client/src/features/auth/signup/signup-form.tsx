import FormGenerator from '../_components/form-generator'
import { USER_SIGNUP_FORM } from '@/constants/forms'
import { renderForm } from '@/lib/utils'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface SignupFormProps {
  register: UseFormRegister<any>
  errors: FieldErrors<FieldValues>
}

export default function SignupForm({ register, errors }: SignupFormProps) {
  return (
    <div className='w-full flex flex-col gap-4'>
      {renderForm(USER_SIGNUP_FORM).map((row, rowIndex) => {
        if (row.length > 1) {
          return (
            <div key={rowIndex} className='flex items-center gap-5'>
              {row.map((innerRow) => (
                <FormGenerator key={innerRow.id} register={register} errors={errors} {...innerRow} />
              ))}
            </div>
          )
        }
        return <FormGenerator key={row[0].id} register={register} errors={errors} {...row[0]} />
      })}
    </div>
  )
}
