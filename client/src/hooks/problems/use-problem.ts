import { getProblem } from '@/services/problem.services'
import { useQueries, useQuery } from '@tanstack/react-query'

export const useProblem = (titleSlug: string, suffix?: string) => {
  return useQuery({
    queryKey: ['problem', titleSlug, suffix],
    queryFn: () => getProblem(titleSlug, suffix)
  })
}

export const useProblemQueries = (titleSlug: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ['problemHeader', titleSlug],
        queryFn: () => getProblem(titleSlug)
      },
      {
        queryKey: ['problemContent', titleSlug, 'content'],
        queryFn: () => getProblem(titleSlug, 'content')
      },
      {
        queryKey: ['problemTopic', titleSlug, 'topic'],
        queryFn: () => getProblem(titleSlug, 'topic')
      },
      {
        queryKey: ['problemHints', titleSlug, 'hints'],
        queryFn: () => getProblem(titleSlug, 'hints')
      },
      {
        queryKey: ['problemTestcase', titleSlug, 'testcase'],
        queryFn: () => getProblem(titleSlug, 'testcase')
      }
    ]
  })
}
