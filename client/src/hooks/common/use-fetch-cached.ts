import { queryClient } from '@/components/providers/query.provider'

export const useFetchCached = (key: any) => {
  return queryClient.getQueryData(key)
}
