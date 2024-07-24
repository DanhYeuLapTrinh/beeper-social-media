import Loader from './loader'
import { Button, ButtonProps } from './button'
import { Label } from './label'
import { useTranslation } from 'react-i18next'

interface ButtonWithLoaderProps extends ButtonProps {
  isLoading: boolean
  className?: string
  text: string
}

export default function ButtonWithLoader({ isLoading, text, className, ...buttonProps }: ButtonWithLoaderProps) {
  const { t } = useTranslation()

  return (
    <Button type='button' disabled={isLoading} className={className} {...buttonProps}>
      <Loader isLoading={isLoading} content={<Label className='dark:text-white cursor-pointer'>{t(text)}</Label>} />
    </Button>
  )
}
