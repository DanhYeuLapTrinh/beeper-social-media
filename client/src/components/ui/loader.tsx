import { RefreshCcw } from 'lucide-react'

interface LoaderProps {
  isLoading: boolean
  content: any
}

export default function Loader({ isLoading, content }: LoaderProps) {
  return <div>{isLoading ? <RefreshCcw className='w-4 h-4 mr-2 animate-spin dark:text-white' /> : content}</div>
}
