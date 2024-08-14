import Tooltip from '../tooltip'
import ButtonWithLoader from '../ui/button-with-loader'
import { ProblemDetailParams } from '@/features/problems/get-problem-detail/get-problem-detail'
import { cn } from '@/lib/utils'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md'

interface WorkspaceHeaderProps {
  isCollapse: boolean
  menuItems: any[]
  isExpand: boolean
  toggleAction: React.ReactNode
  expandPanel: () => void
}

export default function WorkspaceHeader({
  expandPanel,
  isCollapse,
  menuItems,
  isExpand,
  toggleAction
}: WorkspaceHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname.split('/').pop()

  const { workspaceId } = useParams<ProblemDetailParams>()

  const handleNavigate = (url: string) => {
    navigate(`/workspace/${workspaceId}/` + url)
  }

  return (
    <div className={cn('p-1 flex justify-between items-center', isCollapse ? 'py-2 flex flex-col h-full' : '')}>
      <div className={cn('flex flex-1 justify-start items-center gap-1.5', isCollapse ? 'flex flex-col gap-3' : '')}>
        {menuItems.map((item, index) => (
          <Tooltip text={item.name}>
            <div className='flex items-center gap-1' key={item.id}>
              <ButtonWithLoader
                size={isCollapse ? 'icon' : 'sm'}
                variant='ghost'
                isLoading={false}
                icon={item.icon(cn(isCollapse ? 'w-5 h-5' : 'w-5 h-4'))}
                text={isCollapse ? null : item.name}
                textClassName={cn(
                  'font-normal',
                  currentPath === item.url ? 'font-medium dark:text-white' : 'text-slate-400'
                )}
                onClick={() => {
                  if (item.url) {
                    handleNavigate(item.url)
                  } else {
                    // TODO: Perform some actions here...
                  }
                }}
              />
              {!isCollapse && index !== menuItems.length - 1 && (
                <Separator orientation='vertical' className='h-5 mx-1' />
              )}
            </div>
          </Tooltip>
        ))}
      </div>
      {!isExpand && toggleAction}
      <Button size='icon' variant='ghost' onClick={expandPanel}>
        {isExpand ? <MdOutlineFullscreenExit /> : <MdOutlineFullscreen />}
      </Button>
    </div>
  )
}
