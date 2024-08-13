import { ROUTES } from '@/router'
import { FaRegLightbulb } from 'react-icons/fa6'
import { HiOutlineRectangleGroup, HiRectangleGroup } from 'react-icons/hi2'
import { LuTag } from 'react-icons/lu'
import { MdOutlineChatBubbleOutline } from 'react-icons/md'
import { PiVideo, PiVideoFill, PiClockCounterClockwise } from 'react-icons/pi'
import {
  RiCalendarEventLine,
  RiCalendarFill,
  RiHome3Fill,
  RiHome3Line,
  RiShoppingBasketFill,
  RiShoppingBasketLine
} from 'react-icons/ri'
import { VscGroupByRefType } from 'react-icons/vsc'
import { BsFileText } from 'react-icons/bs'
import { GoBook } from 'react-icons/go'
import { SlChemistry } from 'react-icons/sl'

export const SIDEBAR_MENU_ITEMS = [
  {
    id: 1,
    name: 'feed',
    icon: (isChosen: boolean, className?: string) =>
      isChosen ? <RiHome3Fill className={className} /> : <RiHome3Line className={className} />,
    url: ROUTES.PRIVATE.EXPLORE
  },
  {
    id: 2,
    name: 'community',
    icon: (isChosen: boolean, className?: string) =>
      isChosen ? <HiRectangleGroup className={className} /> : <HiOutlineRectangleGroup className={className} />,
    url: ROUTES.PRIVATE.COMMUNITY
  },
  {
    id: 3,
    name: 'event',
    icon: (isChosen: boolean, className?: string) =>
      isChosen ? <RiCalendarFill className={className} /> : <RiCalendarEventLine className={className} />,
    url: ROUTES.PRIVATE.EVENT
  },
  {
    id: 4,
    name: 'watch',
    icon: (isChosen: boolean, className?: string) =>
      isChosen ? <PiVideoFill className={className} /> : <PiVideo className={className} />,
    url: ROUTES.PRIVATE.WATCH
  },
  {
    id: 5,
    name: 'marketplace',
    icon: (isChosen: boolean, className?: string) =>
      isChosen ? <RiShoppingBasketFill className={className} /> : <RiShoppingBasketLine className={className} />,
    url: ROUTES.PRIVATE.MARKETPLACE
  }
]

export const HEADER_MENU_ITEMS = [
  {
    id: 1,
    name: 'explore',
    value: 'explore'
  },
  {
    id: 2,
    name: 'community',
    value: 'by-communities'
  },
  {
    id: 3,
    name: 'friends',
    value: 'by-friends'
  }
]

export const WORKSPACE_HEADER_MENU_ITEMS = [
  {
    id: 1,
    name: 'description',
    url: 'description',
    icon: <BsFileText className='text-primary w-5 h-4' />
  },
  {
    id: 2,
    name: 'editorial',
    url: 'editorial',
    icon: <GoBook className='text-primary w-5 h-4' />
  },
  {
    id: 3,
    name: 'solutions',
    url: 'solutions',
    icon: <SlChemistry className='text-primary w-5 h-4' />
  },
  {
    id: 4,
    name: 'submissions',
    url: 'submissions',
    icon: <PiClockCounterClockwise className='text-primary w-5 h-4' />
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
