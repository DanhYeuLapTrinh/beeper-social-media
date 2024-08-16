import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useTranslation } from 'react-i18next'

interface PopupProps {
  children: React.ReactNode
  content: React.ReactNode
  title?: string
  description?: string
  className?: string
  onClose?: () => void
  timeOut?: number
}

export default function Popup({ children, content, title, description, className, timeOut, onClose }: PopupProps) {
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && onClose) {
          if (timeOut) {
            setTimeout(onClose, timeOut)
          } else {
            onClose()
          }
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={className}>
        <DialogTitle>{t(title || '')}</DialogTitle>
        <DialogDescription>{t(description || '')}</DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  )
}
