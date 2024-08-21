import { PROBLEM_QUERIES } from '@/constants'
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
    queries: PROBLEM_QUERIES.map((query) => ({
      queryKey: [titleSlug, ...query.queryKey],
      queryFn: () => getProblem(titleSlug, query.params)
    }))
  })
}
