import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

interface ActionsProps {
  firstTitle: string
  secondTitle: string
  firstFunction: () => void
  secondFunction: () => void
}

export default function Social({ firstTitle, secondTitle, firstFunction, secondFunction }: ActionsProps) {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col items-center w-full gap-2'>
      <Button variant='outline' className='w-full' onClick={firstFunction}>
        <div className='flex items-center w-full'>
          <Icons.google className='w-6 h-6 mr-1' />
          <Label className='flex-1 cursor-pointer'>{t(firstTitle)}</Label>
        </div>
      </Button>
      <Button variant='outline' className='w-full' onClick={secondFunction}>
        <div className='flex items-center w-full'>
          <Icons.github className='w-6 h-6 mr-1 dark:fill-white' />
          <Label className='flex-1'>{t(secondTitle as string)}</Label>
        </div>
      </Button>
    </div>
  )
}
