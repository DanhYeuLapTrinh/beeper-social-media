import Loader from '@/components/ui/loader'
import parse from 'html-react-parser'
import styles from './get-problem-detail.module.scss'
import GetProblemAccordion from '../get-problem-accordion/get-problem-accordion'
import NotFound from '@/pages/not-found'
import { useParams } from 'react-router-dom'
import { useProblemDetail } from '@/hooks/problems/use-problem-detail'

export type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  const { '0': problemDetail, '1': problemTopics } = useProblemDetail(String(workspaceId))

  if (problemDetail.isLoading || problemTopics.isLoading) {
    return <Loader isLoading={problemDetail.isLoading || problemTopics.isLoading} content={null} className='w-6 h-6' />
  } else if (!problemDetail.data?.question || !problemTopics.data?.question) {
    return <NotFound />
  }

  const parsedContent = parse(problemDetail.data.question.content)

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 px-4 py-5 min-w-96'>
        <h1 className='text-3xl font-semibold'>
          {problemDetail.data?.question.questionId + '. ' + problemDetail.data.question.questionTitle}
        </h1>
        <div className={styles.content}>{parsedContent}</div>
        <GetProblemAccordion data={problemDetail.data} topics={problemTopics.data} />
      </div>
    </div>
  )
}
