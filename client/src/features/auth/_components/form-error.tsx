import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormErrorProps<T> {
  errors: FieldErrors
  identifier: keyof T
  className?: string
}

export default function FormError<T>({ errors, identifier, className }: FormErrorProps<T>) {
  const errorMsg = errors[identifier as string]?.message
  const { t } = useTranslation()

  return (
    <>
      {errors[identifier as string] && (
        <Label className={cn('text-red-500 text-xs font-normal', className)}>{t(errorMsg as string)}</Label>
      )}
    </>
  )
}
