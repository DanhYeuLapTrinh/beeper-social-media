import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { getDifficultyColor } from '@/lib/utils'
import { Problem } from '@/models/problem.model'
import { LuFileCheck, LuFileVideo } from 'react-icons/lu'
import { Link } from 'react-router-dom'

export interface ColumnDefinition<T> {
  accessorKey: keyof T
  header: string
  loadingComponent?: React.ReactNode
  customCell?: (data: T) => React.ReactNode
  meta?: {
    style: {
      textAlign: 'left' | 'center' | 'right'
    }
  }
}

export const PROBLEMS_TABLE_HEADERS: ColumnDefinition<Problem>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    loadingComponent: <Skeleton className='w-6 h-6 rounded-full' />
  },
  {
    accessorKey: 'title',
    header: 'Title',
    loadingComponent: <Skeleton className='w-20 h-6 rounded-full' />,
    customCell: (problem: Problem) => (
      <Link to={`/workspace/${problem.titleSlug}`}>
        <Label className='hover:text-primary cursor-pointer'>{problem.title}</Label>
      </Link>
    )
  },
  {
    accessorKey: 'hasSolution',
    header: 'Solution',
    loadingComponent: <Skeleton className='w-20 h-6 rounded-full' />,
    customCell: (problem: Problem) => (
      <div className='flex items-center'>
        {problem.hasSolution && problem.hasVideoSolution ? (
          <LuFileVideo className='text-purple-500 w-5 h-5' />
        ) : (
          <LuFileCheck className='text-primary w-5 h-5' />
        )}
      </div>
    )
  },
  {
    accessorKey: 'acRate',
    header: 'Acceptance',
    loadingComponent: <Skeleton className='w-6 h-6 rounded-full' />,
    customCell: (problem: Problem) => <p>{problem.acRate?.toFixed(1)}%</p>
  },
  {
    accessorKey: 'difficulty',
    header: 'Difficulty',
    loadingComponent: <Skeleton className='w-20 h-6 rounded-full' />,
    customCell: (problem: Problem) => <p className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</p>
  }
]
