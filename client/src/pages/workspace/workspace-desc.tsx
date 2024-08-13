import GetProblemDetail from '@/features/problems/get-problem-detail/get-problem-detail'
import ProblemInteractions from '@/features/problems/problem-interactions/problem-interactions'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { cn } from '@/lib/utils'

export default function WorkspaceDesc() {
  const panelSize = useAppSelector((state) => state.panel.size)

  return (
    <>
      <div className={cn('max-h-full overflow-y-scroll flex-1', panelSize <= 2 ? 'hidden' : '')}>
        <GetProblemDetail />
      </div>
      <ProblemInteractions />
    </>
  )
}
