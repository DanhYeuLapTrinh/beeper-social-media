import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ErrorPageProps {
  message?: string
  callbackFunc?: () => void
  text: string
}

export default function ErrorPage({ message, callbackFunc, text }: ErrorPageProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleNavigate = () => navigate(-1)

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-background z-50'>
      <div className='flex flex-col gap-4'>
        <Label>{message && message.toUpperCase()}</Label>
        <Button className='dark:text-white' onClick={callbackFunc ? callbackFunc : handleNavigate}>
          {t(text)}
        </Button>
      </div>
    </div>
  )
}
