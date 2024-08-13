import ButtonWithLoader from './ui/button-with-loader'
import { WORKSPACE_HEADER_MENU_ITEMS } from '@/constants/menu-items'
import { Separator } from './ui/separator'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ProblemDetailParams } from '@/features/problems/get-problem-detail/get-problem-detail'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { Button } from './ui/button'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MIN_SIZE_PANEL } from '@/constants'
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md'

interface WorkspaceDescHeaderProps {
  togglePanel: () => void
  expandPanel: () => void
}

export default function WorkspaceDescHeader({ togglePanel, expandPanel }: WorkspaceDescHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname.split('/').pop()
  const panelSize = useAppSelector((state) => state.panel.size)

  const isCollapse = panelSize <= MIN_SIZE_PANEL
  const isExpand = panelSize === 100

  const { workspaceId } = useParams<ProblemDetailParams>()

  const handleNavigate = (url: string) => {
    navigate(`/workspace/${workspaceId}/` + url)
  }

  return (
    <div className={cn('p-1 flex items-center', isCollapse ? 'rotate-90' : '')}>
      <div className='flex flex-1 justify-start items-center gap-1.5'>
        {WORKSPACE_HEADER_MENU_ITEMS.map((item, index) => (
          <div className='flex items-center gap-1' key={item.id}>
            <ButtonWithLoader
              size='sm'
              variant='ghost'
              isLoading={false}
              icon={item.icon}
              text={item.name}
              textClassName={cn(
                'font-normal',
                currentPath === item.url ? 'font-medium dark:text-white' : 'text-slate-400'
              )}
              onClick={() => handleNavigate(item.url)}
            />
            {index !== WORKSPACE_HEADER_MENU_ITEMS.length - 1 && (
              <Separator orientation='vertical' className='h-5 mx-1' />
            )}
          </div>
        ))}
      </div>
      {!isExpand && (
        <Button variant='ghost' onClick={togglePanel}>
          {isCollapse ? <IoIosArrowForward className='-rotate-90 m-30' /> : <IoIosArrowBack />}
        </Button>
      )}
      <Button variant='ghost' onClick={expandPanel}>
        {isExpand ? <MdOutlineFullscreenExit /> : <MdOutlineFullscreen />}
      </Button>
    </div>
  )
}
