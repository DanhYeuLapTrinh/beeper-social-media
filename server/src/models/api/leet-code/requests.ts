import { Filter } from '@/models/base.model'

export interface TitleSlugParamsAPI {
  titleSlug: string
}

export interface LeetCodeFiltersBodyAPI {
  categorySlug: string
  limit: number
  skip: number
  filters: Filter
}
