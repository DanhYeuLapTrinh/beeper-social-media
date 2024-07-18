import { ROUTES } from '@/router'
import { Boxes, CalendarFold, Home, ShoppingCart, TvMinimalPlay } from 'lucide-react'

export const SIDEBAR_MENU_ITEMS = [
  {
    id: 1,
    name: 'feed',
    icon: Home,
    url: ROUTES.PRIVATE.EXPLORE
  },
  {
    id: 2,
    name: 'community',
    icon: Boxes,
    url: ROUTES.PRIVATE.COMMUNITY
  },
  {
    id: 3,
    name: 'event',
    icon: CalendarFold,
    url: ROUTES.PRIVATE.EVENT
  },
  {
    id: 4,
    name: 'watch',
    icon: TvMinimalPlay,
    url: ROUTES.PRIVATE.WATCH
  },
  {
    id: 5,
    name: 'marketplace',
    icon: ShoppingCart,
    url: ROUTES.PRIVATE.MARKETPLACE
  }
]

export const HEADER_MENU_ITEMS = [
  {
    id: 1,
    name: 'explore',
    value: 'explore',
    icon: Home
  },
  {
    id: 2,
    name: 'community',
    value: 'by-communities',
    icon: Home
  },
  {
    id: 3,
    name: 'friends',
    value: 'by-friends',
    icon: Home
  }
]
