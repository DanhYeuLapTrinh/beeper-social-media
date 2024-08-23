import { queryClient } from '@/components/providers/query.provider'

export const useFetchCached = <T>(key: any) => {
  return queryClient.getQueryData<T>(key)
}
