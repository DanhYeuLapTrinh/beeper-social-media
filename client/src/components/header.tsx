import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { LOCAL_STORAGE_KEYS } from '@/constants'
import { HEADER_MENU_ITEMS } from '@/constants/menu-items'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'

export default function Header() {
  const [value, setValue] = useLocalStorage(LOCAL_STORAGE_KEYS.HEADER_OPTION, 'explore')
  const { t } = useTranslation()

  const isChosen = (option: string) => value === option

  return (
    <header className='bg-white flex items-center justify-around p-3 border-b border-mediumGray'>
      <Menubar>
        {HEADER_MENU_ITEMS.map((item) => (
          <MenubarMenu key={item.id}>
            <MenubarTrigger
              className='cursor-pointer'
              onClick={() => setValue(item.value)}
              data-state={isChosen(item.value) ? 'open' : 'closed'}
            >
              {t(item.name)}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
