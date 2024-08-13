import Loader from './loader'
import { Button, ButtonProps } from './button'
import { Label } from './label'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface ButtonWithLoaderProps extends ButtonProps {
  isLoading: boolean
  icon?: React.ReactNode
  className?: string
  textClassName?: string
  text?: string
}

export default function ButtonWithLoader({
  isLoading,
  text,
  className,
  icon,
  textClassName = 'dark:text-white',
  ...buttonProps
}: ButtonWithLoaderProps) {
  const { t } = useTranslation()

  return (
    <Button type='button' disabled={isLoading} className={className} {...buttonProps}>
      <Loader
        isLoading={isLoading}
        content={
          <div className='flex items-center gap-2'>
            {icon && icon}
            {text && <Label className={cn('cursor-pointer', textClassName)}>{t(text)}</Label>}
          </div>
        }
      />
    </Button>
  )
}
