import { getProblems } from '@/services/problem.services'
import { useMutation } from '@tanstack/react-query'

export const useProblems = () => {
  return useMutation({
    mutationFn: () => getProblems()
  })
}
