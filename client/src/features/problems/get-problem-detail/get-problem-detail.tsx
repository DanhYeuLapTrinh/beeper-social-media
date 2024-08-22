import parse from 'html-react-parser'
import styles from './get-problem-detail.module.scss'
import Skeleton from '@/components/skeleton'
import ProblemAccordion from '@/components/workspace/problem-accordion'
import { useFetchCached } from '@/hooks/common/use-fetch-cached'
import { useProblemQueries } from '@/hooks/problems/use-problem'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { GetProblemHeaderResponseAPI } from '@/models/api/responses'

export type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  const {
    '0': { data: problemContent, isLoading: isLoadingContent },
    '1': { data: problemTopic, isLoading: isLoadingTopic },
    '2': { data: problemHints, isLoading: isLoadingHints },
    '3': { data: problemSimilarQuestions, isLoading: isLoadingSimilarQuestions }
  } = useProblemQueries(String(workspaceId))

  const problemHeader = useFetchCached<GetProblemHeaderResponseAPI>(['problem', String(workspaceId), null])
  const parsedContent = parse(problemContent?.data?.content || '')

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4 px-4 py-5 min-w-96'>
        <h1 className='text-3xl font-semibold'>
          {problemHeader?.data?.frontendQuestionId + '. ' + problemHeader?.data?.title}
        </h1>
        <div className='flex items-center gap-3'>
          <Badge>{problemHeader?.data?.difficulty}</Badge>
        </div>
        <Skeleton isLoading={isLoadingContent} className='w-full h-5' />
        <Skeleton isLoading={isLoadingContent} className='w-4/5 h-5' />
        <Skeleton isLoading={isLoadingContent} className='w-4/5 h-5' />
        <Skeleton isLoading={isLoadingContent} className='w-2/3 h-5'>
          <div className={styles.content}>{parsedContent}</div>
        </Skeleton>
        {isLoadingHints || isLoadingTopic || isLoadingSimilarQuestions ? null : (
          <ProblemAccordion
            topics={problemTopic?.data.topicTags}
            hints={problemHints?.data.hints}
            similarQuestions={problemSimilarQuestions?.data.similarQuestions}
          />
        )}
      </div>
    </div>
  )
}
