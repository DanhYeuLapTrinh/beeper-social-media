import { clientAxios } from '@/lib/axios/axios'
import { GetProblemResponseAPI, GetProblemsResponseAPI } from '@/models/api/responses'
import { Filter } from '@/models/base.model'

export const getProblem = async (titleSlug: string, suffix?: string): Promise<GetProblemResponseAPI> => {
  const url = suffix ? `leet-code/${titleSlug}/${suffix}` : `leet-code/${titleSlug}`
  const { data } = await clientAxios.get<GetProblemResponseAPI>(url)
  return data
}

export const getProblems = async (variables?: Filter): Promise<GetProblemsResponseAPI> => {
  const fitlers = variables || {
    categorySlug: 'all-code-essentials',
    limit: 100,
    skip: 0,
    filters: {}
  }
  const { data } = await clientAxios.post<GetProblemsResponseAPI>('leet-code/all', fitlers)

  return data
}
