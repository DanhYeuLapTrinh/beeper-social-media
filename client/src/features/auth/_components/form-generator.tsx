import FormError from './form-error'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FormGeneratorProps = {
  type: 'text' | 'password' | 'email'
  inputType: 'input' | 'select' | 'textarea' | 'checkbox'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  register: UseFormRegister<any>
  name: string
  errors: FieldErrors<FieldValues>
  form?: string
  defaultValue?: string
  autoFocus?: boolean
  optional?: boolean
}

export default function FormGenerator({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  form,
  defaultValue,
  autoFocus,
  optional
}: FormGeneratorProps) {
  const { t } = useTranslation()
  switch (inputType) {
    case 'checkbox':
      return (
        <Label className='flex items-center gap-2' htmlFor={`select-${label}`}>
          <Checkbox id={`select-${label}`} {...register(name)} />
          {label && t(label)}
        </Label>
      )
    case 'select':
      return (
        <Label htmlFor={`select-${label}`}>
          {label && t(label)}
          <Select>
            <SelectTrigger className='w-48'>
              <SelectValue placeholder={options && options.length > 0 && options[0].label} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormError errors={errors} identifier={name} />
        </Label>
      )
    default:
      return (
        <Label className='flex flex-col gap-2.5' htmlFor={`input-${label}`}>
          <div className='flex items-center gap-2'>
            {label && t(label)}
            {optional && <p className='text-xs font-normal text-muted-foreground'>({t('optional')})</p>}
          </div>
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
            defaultValue={defaultValue}
            {...register(name)}
            className='font-normal'
            autoFocus={autoFocus}
          />
          <FormError errors={errors} identifier={name} />
        </Label>
      )
  }
}
