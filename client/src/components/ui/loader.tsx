import { cn } from '@/lib/utils'
import { RefreshCcw } from 'lucide-react'

interface LoaderProps {
  isLoading: boolean
  content: any
  className?: string
}

export default function Loader({ isLoading, content, className }: LoaderProps) {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      {isLoading ? (
        <RefreshCcw className={cn('w-4 h-4 mr-2 animate-spin dark:text-muted-foreground', className)} />
      ) : (
        content
      )}
    </div>
  )
}
