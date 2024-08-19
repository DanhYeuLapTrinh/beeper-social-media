import NotFound from '@/pages/not-found'
import parse from 'html-react-parser'
import GetProblemAccordion from '../get-problem-accordion/get-problem-accordion'
import styles from './get-problem-detail.module.scss'
import { useProblemQueries } from '@/hooks/problems/use-problem'
import { useParams } from 'react-router-dom'

export type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  const {
    '0': { data: problemHeader },
    '1': { data: problemContent },
    '2': { data: problemTopic },
    '3': { data: problemHints },
    '4': { data: problemTestcase }
  } = useProblemQueries(String(workspaceId))

  if (!problemHeader || !problemContent || !problemTopic || !problemHints || !problemTestcase) {
    return <NotFound />
  }

  const parsedContent = parse(problemContent.data.content)

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 px-4 py-5 min-w-96'>
        <h1 className='text-3xl font-semibold'>
          {problemHeader.data?.frontendQuestionId + '. ' + problemHeader.data?.title}
        </h1>
        <div className={styles.content}>{parsedContent}</div>
        <GetProblemAccordion topics={problemTopic.data.topicTags} hints={problemHints.data.hints} />
      </div>
    </div>
  )
}
