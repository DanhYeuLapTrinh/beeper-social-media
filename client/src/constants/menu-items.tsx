import { cn } from '@/lib/utils'
import { BsFileText } from 'react-icons/bs'
import { FaRegLightbulb } from 'react-icons/fa6'
import { GoBook } from 'react-icons/go'
import { IoCodeSlash } from 'react-icons/io5'
import { LuTag } from 'react-icons/lu'
import { MdOutlineChatBubbleOutline } from 'react-icons/md'
import { PiCheckSquare, PiClockCounterClockwise } from 'react-icons/pi'
import { SlChemistry } from 'react-icons/sl'
import { VscGroupByRefType } from 'react-icons/vsc'

export const WORKSPACE_HEADER_MENU_ITEMS = [
  {
    id: 1,
    name: 'description',
    url: 'description',
    icon: (className?: string) => <BsFileText className={cn('text-primary', className)} />
  },
  {
    id: 2,
    name: 'editorial',
    url: 'editorial',
    icon: (className?: string) => <GoBook className={cn('text-primary', className)} />
  },
  {
    id: 3,
    name: 'solutions',
    url: 'solutions',
    icon: (className?: string) => <SlChemistry className={cn('text-primary', className)} />
  },
  {
    id: 4,
    name: 'submissions',
    url: 'submissions',
    icon: (className?: string) => <PiClockCounterClockwise className={cn('text-primary', className)} />
  }
]

export const CODE_EDITOR_HEADER_MENU_ITEMS = [
  {
    id: 1,
    name: 'code',
    icon: (className?: string) => <IoCodeSlash className={cn('text-green-500 ', className)} />
  }
]

export const TEST_CASE_HEADER_MENU_ITEMS = [
  {
    id: 1,
    name: 'test_case',
    icon: (className?: string) => <PiCheckSquare className={cn('text-green-500 ', className)} />
  }
]

export const PROBLEM_ACCORDION_ITEMS = [
  {
    id: 1,
    name: 'topics',
    value: 'topics',
    icon: <LuTag className='w-5 h-5' />
  },
  {
    id: 2,
    name: 'hints',
    value: 'hints',
    icon: <FaRegLightbulb className='w-5 h-5' />
  },
  {
    id: 3,
    name: 'similar_questions',
    value: 'similar_questions',
    icon: <VscGroupByRefType className='w-5 h-5' />
  },
  {
    id: 4,
    name: 'discussions',
    value: 'discussions',
    icon: <MdOutlineChatBubbleOutline className='w-5 h-5' />
  }
]
