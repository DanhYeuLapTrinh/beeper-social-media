import { getProblemDetail, getProblemTopics } from '@/services/problem.services'
import { useQueries } from '@tanstack/react-query'

export const useProblemDetail = (titleSlug: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ['problemDetail', titleSlug],
        queryFn: () => getProblemDetail(titleSlug)
      },
      {
        queryKey: ['problemTopics', titleSlug],
        queryFn: () => getProblemTopics(titleSlug)
      }
    ]
  })
}
