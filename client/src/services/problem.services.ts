import { clientAxios } from '@/lib/axios/axios'
import { ProblemDetailResponseAPI } from '@/models/problem.model'

export const getProblemDetail = async (titleSlug: string): Promise<ProblemDetailResponseAPI> => {
  const { data } = await clientAxios.get<ProblemDetailResponseAPI>(`leet-code/${titleSlug}`)
  return data
}

export const getProblemTopics = async (titleSlug: string) => {
  const {
    data: { data }
  } = await clientAxios.get<ProblemDetailResponseAPI>(`leet-code/${titleSlug}/topic`)
  return data
}
