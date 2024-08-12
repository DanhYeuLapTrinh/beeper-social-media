import { getProblemTopics } from '@/services/problem.services'
import { useQuery } from '@tanstack/react-query'

export const useProblemTopics = (titleSlug: string) => {
  return useQuery({
    queryKey: ['problemDetail', titleSlug],
    queryFn: () => getProblemTopics(titleSlug)
  })
}
