import { useTranslation } from 'react-i18next'
import { Icons } from './ui/icons'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

export default function Sidebar() {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <div className='flex flex-col gap-5 bg-white border-r border-mediumGray w-[300px] py-6 px-4'>
      <div className='flex items-center gap-1'>
        <Icons.beeper className='w-14 h-14' />
        <Label className='font-bold text-primary text-3xl'>Beeper</Label>
      </div>
      <Input placeholder={t('search_placeholder')} />
      <div className='mt-2 flex flex-col gap-2'>
        {SIDEBAR_MENU_ITEMS.map((item) => {
          const isCurrentPath = location.pathname.split('/')[1] === item.url.split('/')[1]
          const isActive = isCurrentPath ? 'bg-primary hover:bg-primary' : ''
          return (
            <Link key={item.id} to={item.url} className={cn('hover:bg-secondary p-3 rounded-lg', isActive)}>
              <div className='flex items-center gap-3.5'>
                <item.icon className={cn('w-7 h-7 font-normal border-1', isCurrentPath ? 'text-white' : '')} />
                <Label className={cn('text-base font-medium cursor-pointer', isCurrentPath ? 'text-white' : '')}>
                  {t(item.name)}
                </Label>
              </div>
            </Link>
          )
        })}
      </div>
      <Separator className='mt-5' />
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <Label className='text-lg'>My community</Label>
          <Badge variant='outline'>29</Badge>
        </div>
        <Button variant='secondary'>
          <Plus className='w-5 h-5 mr-2' />
          Explore your community
        </Button>
      </div>
      <Separator className='mt-5' />
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <Label className='text-lg'>Upcomming event</Label>
          <Badge variant='outline'>29</Badge>
        </div>
        <Button variant='secondary'>
          <Plus className='w-5 h-5 mr-2' />
          Explore your community
        </Button>
      </div>
    </div>
  )
}
