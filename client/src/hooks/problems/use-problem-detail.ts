import { getProblemDetail } from '@/services/problem.services'
import { useQuery } from '@tanstack/react-query'

export const useProblemDetail = (titleSlug: string) => {
  return useQuery({
    queryKey: ['problemDetail', titleSlug],
    queryFn: () => getProblemDetail(titleSlug)
  })
}
