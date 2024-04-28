import { isNumber, isString } from '@daysnap/utils'

export interface UseProTablePagingStatus {
  pageIndex: number
  pageSize: number
  total: number
  loading: boolean
  error: string
}

export interface UseProTablePagingTask<T = any> {
  (state: [number, number]): Promise<[T[], number]>
}

export interface UseProTablePagingOptions {
  initialStatus?: Partial<UseProTablePagingStatus>
  immediate?: boolean
}

export type UseProTablePagingParams = { pageIndex?: number; pageSize?: number } | number

export function useProTablePaging<T = any>(
  task: UseProTablePagingTask<T>,
  options: UseProTablePagingOptions = {},
) {
  const { initialStatus, immediate } = options

  const status = reactive<UseProTablePagingStatus>(
    Object.assign(
      {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        error: '',
      },
      initialStatus,
    ),
  )
  // 列表数据
  // https://github.com/vuejs/core/issues/2136
  const list = ref([]) as Ref<T[]>

  const trigger = (params: UseProTablePagingParams = {}) => {
    if (isNumber(params)) {
      params = { pageIndex: params }
    }
    const { pageIndex, pageSize } = Object.assign({}, status, params)

    status.loading = true

    const promise = task([pageIndex, pageSize]).then((res) => {
      const [data, total] = res
      list.value = data || []
      status.error = ''
      status.total = total
    })

    // error
    ;(promise.toast
      ? promise.toast((_, msg) => {
          list.value = []
          status.error = msg
          return true
        })
      : promise.catch((err) => {
          list.value = []
          status.error = isString(err) ? err : JSON.stringify(err)
        })
    ).finally(() => {
      status.pageIndex = pageIndex
      status.pageSize = pageSize
      status.loading = false
    })
  }

  // 初始加载
  onBeforeMount(() => {
    if (immediate) {
      trigger()
    }
  })

  return [status, list, trigger] as const
}
