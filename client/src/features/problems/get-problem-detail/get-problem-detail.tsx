import parse from 'html-react-parser'
import Loader from '@/components/ui/loader'
import { useProblemDetail } from '@/hooks/problems/use-problem-detail'
import { useParams } from 'react-router-dom'

type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  const { data, isLoading } = useProblemDetail(String(workspaceId))

  if (!data || isLoading) return <Loader isLoading={isLoading} content={null} className='w-6 h-6' />
  console.log(data.question.content)
  return (
    <div className='flex flex-col gap-4 min-w-96'>
      <h1 className='text-3xl font-semibold'>{data.question.questionId + '.' + data.question.questionTitle}</h1>
      <div>{parse(data.question.content)}</div>
    </div>
  )
}
