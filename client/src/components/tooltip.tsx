import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from './ui/label'
import { useTranslation } from 'react-i18next'

export default function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <TooltipProvider>
      <ShadTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <Label>{t(text)}</Label>
        </TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  )
}
