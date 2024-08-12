import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { UserType } from '@/models/schemas/auth.schema'
import { ContactRound } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface UserTypeCardProps {
  value: 'owner' | 'student'
  title: string
  description: string
  userType: UserType
  setUserType: Dispatch<SetStateAction<UserType>>
  register: UseFormRegister<any>
}

export default function UserTypeCard({
  value,
  title,
  description,
  userType,
  setUserType,
  register
}: UserTypeCardProps) {
  const { t } = useTranslation()

  return (
    <Label htmlFor={value} className='w-full cursor-pointer'>
      <Card className={cn('p-2.5', userType === value ? 'border-primary' : '')}>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-2'>
            <Card className='p-2.5'>
              <ContactRound className='w-10 h-10 stroke-1' />
            </Card>
            <div>
              <CardDescription className={cn('font-bold', userType === value ? 'text-primary' : '')}>
                {t(title)}
              </CardDescription>
              <CardDescription className='font-normal text-xs'>{t(description)}</CardDescription>
            </div>
          </div>
          <div className={cn('w-4 h-4 rounded-full self-start ', userType == value ? 'bg-primary' : 'bg-transparent')}>
            <Input
              {...register('type', {
                onChange: (event) => setUserType(event.target.value)
              })}
              value={value}
              id={value}
              className='hidden'
              type='radio'
            />
          </div>
        </div>
      </Card>
    </Label>
  )
}
