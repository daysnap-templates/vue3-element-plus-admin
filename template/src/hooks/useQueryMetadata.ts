import type { QueryFormMetadata } from '@/types'
import { banana } from '@daysnap/banana'
import { filterEmptyValue } from '@daysnap/utils'

export function useQueryMetadata(data: QueryFormMetadata) {
  const metadata = reactive(data)

  const query = ref(filterEmptyValue(banana.extract(data), true))

  return [query, metadata] as const
}
