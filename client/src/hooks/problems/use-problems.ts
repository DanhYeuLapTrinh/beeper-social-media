import { GetProblemsFilter } from '@/models/problem.model'
import { getProblems } from '@/services/problem.services'
import { useMutation } from '@tanstack/react-query'

export const useProblems = () => {
  return useMutation({
    mutationFn: (variables?: GetProblemsFilter) => getProblems(variables)
  })
}
