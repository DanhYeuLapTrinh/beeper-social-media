import parse from 'html-react-parser'
import { useProblemDetail } from '@/hooks/problems/use-problem-detail'
import { useParams } from 'react-router-dom'

type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  const { data } = useProblemDetail(String(workspaceId))
  return (
    <div className='flex flex-col gap-4 overflow-y-auto'>
      <h1 className='text-3xl font-semibold'>{data?.question.questionId + '.' + data?.question.questionTitle}</h1>
      <div>{parse(String(data?.question.content))}</div>
    </div>
  )
}
