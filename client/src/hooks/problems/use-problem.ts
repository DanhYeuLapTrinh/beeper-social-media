import {
  GetProblemContentResponseAPI,
  GetProblemHeaderResponseAPI,
  GetProblemHintsResponseAPI,
  GetProblemSimilarQuestionsResponseAPI,
  GetProblemTopicsResponseAPI
} from '@/models/api/responses'
import { getProblem } from '@/services/problem.services'
import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useProblemSuspense = (titleSlug: string, suffix?: string) => {
  return useSuspenseQuery({
    queryKey: ['problem', titleSlug, suffix],
    queryFn: () => getProblem<GetProblemHeaderResponseAPI>(titleSlug, suffix)
  })
}

export const useProblem = <T>(titleSlug: string, suffix?: string) => {
  return useQuery({
    queryKey: ['problem', titleSlug, suffix],
    queryFn: () => getProblem<T>(titleSlug, suffix)
  })
}

export const useProblemQueries = (titleSlug: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ['problemContent', titleSlug, 'content'],
        queryFn: () => getProblem<GetProblemContentResponseAPI>(titleSlug, 'content')
      },
      {
        queryKey: ['problemTopic', titleSlug, 'Topic'],
        queryFn: () => getProblem<GetProblemTopicsResponseAPI>(titleSlug, 'topic')
      },
      {
        queryKey: ['problemHints', titleSlug, 'Hints'],
        queryFn: () => getProblem<GetProblemHintsResponseAPI>(titleSlug, 'hints')
      },
      {
        queryKey: ['problemSimilarQuestions', titleSlug, 'similar-questions'],
        queryFn: () => getProblem<GetProblemSimilarQuestionsResponseAPI>(titleSlug, 'similar-questions')
      }
    ]
  })
}
