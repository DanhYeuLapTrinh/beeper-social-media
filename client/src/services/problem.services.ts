import { clientAxios } from '@/lib/axios/axios'
import { ProblemDetailResponseAPI, ProblemResponseAPI, ProblemTopicsResponseAPI } from '@/models/problem.model'

export const getProblemDetail = async (titleSlug: string): Promise<ProblemDetailResponseAPI> => {
  const { data } = await clientAxios.get<ProblemDetailResponseAPI>(`leet-code/${titleSlug}`)
  return data
}

export const getProblemTopics = async (titleSlug: string) => {
  const { data } = await clientAxios.get<ProblemTopicsResponseAPI>(`leet-code/${titleSlug}/topic`)
  return data
}

export const getProblems = async () => {
  const { data } = await clientAxios.get<ProblemResponseAPI[]>('leet-code/all')
  return data
}
