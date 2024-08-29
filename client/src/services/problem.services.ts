import { clientAxios } from '@/lib/axios/axios'
import { GetProblemsResponseAPI } from '@/models/api/responses'
import { GetProblemsFilter } from '@/models/problem.model'

export const getProblem = async <T>(titleSlug: string, suffix?: string): Promise<T> => {
  const url = suffix ? `leet-code/${titleSlug}/${suffix}` : `leet-code/${titleSlug}`
  const { data } = await clientAxios.get<T>(url)
  return data
}

export const getProblems = async (variables?: Partial<GetProblemsFilter>): Promise<GetProblemsResponseAPI> => {
  const defaultVariables: GetProblemsFilter = {
    categorySlug: 'all-code-essentials',
    limit: 50,
    skip: 0,
    filters: {}
  }

  const finalVariables = { ...defaultVariables, ...variables }

  const { data } = await clientAxios.post<GetProblemsResponseAPI>('leet-code/all', finalVariables)
  return data
}
