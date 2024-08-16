import { clientAxios } from '@/lib/axios/axios'
import {
  LeetCodeFilters,
  ProblemDetailResponseAPI,
  ProblemsResponseAPI,
  ProblemsWithPagination,
  ProblemTopicsResponseAPI
} from '@/models/problem.model'

export const getProblemDetail = async (titleSlug: string): Promise<ProblemDetailResponseAPI> => {
  const { data } = await clientAxios.get<ProblemDetailResponseAPI>(`leet-code/${titleSlug}`)
  return data
}

export const getProblemTopics = async (titleSlug: string) => {
  const { data } = await clientAxios.get<ProblemTopicsResponseAPI>(`leet-code/${titleSlug}/topic`)
  return data
}

export const getProblems = async (variables?: LeetCodeFilters): Promise<ProblemsWithPagination> => {
  const fitlers = variables || {
    categorySlug: 'all-code-essentials',
    limit: 100,
    skip: 0,
    filters: {}
  }
  const { data } = await clientAxios.post<ProblemsResponseAPI>('leet-code/all', fitlers)

  return {
    problems: data.data.problemsetQuestionList.questions,
    total: data.data.problemsetQuestionList.total
  }
}
