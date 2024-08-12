import parse from 'html-react-parser'
import Loader from '@/components/ui/loader'
import styles from './get-problem-detail.module.scss'
import GetProblemAccordion from '../get-problem-accordion/get-problem-accordion'
import { useProblemDetail } from '@/hooks/problems/use-problem-detail'
import { useParams } from 'react-router-dom'
import { useProblemTopics } from '@/hooks/problems/use-problem-topics'

type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  const { data, isLoading } = useProblemDetail(String(workspaceId))
  const { data: topics } = useProblemTopics(String(workspaceId))

  if (!data || isLoading) return <Loader isLoading={isLoading} content={null} className='w-6 h-6' />
  console.log(data)
  const parsedContent = parse(data.question.content)

  return (
    <div className='flex flex-col gap-4 min-w-96'>
      <h1 className='text-3xl font-semibold'>{data.question.questionId + '.' + data.question.questionTitle}</h1>
      <div className={styles.content}>{parsedContent}</div>
      <GetProblemAccordion data={data} topics={topics} />
    </div>
  )
}
