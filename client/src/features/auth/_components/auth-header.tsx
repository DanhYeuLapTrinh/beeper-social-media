import { Label } from '@/components/ui/label'
import { Trans, useTranslation } from 'react-i18next'

const className = 'text-primary cursor-pointer text-xs'

export default function AuthHeader({ title }: { title: string }) {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-2 mb-10'>
      <Label className='block text-2xl font-bold'>{t(title)}</Label>
      <Label className='text-xs font-normal'>
        <Trans i18nKey='agreement'>
          By continuing, you agree to our <Label className={className}>User Agreement</Label> and acknowledge that you
          understand the <Label className={className}>Privacy Policy</Label>.
        </Trans>
      </Label>
    </div>
  )
}
