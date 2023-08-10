import { isArray, isBoolean, isFunction, isObject, isString } from '@daysnap/utils'

export interface UseTablePagingStatus {
  pageIndex: number
  pageSize: number
  total: number
  loading: boolean
  error: string
}

export interface UseTablePagingTask<T = any> {
  (state: [number, number]): Promise<[T[], number]>
}

export interface UseTablePagingOptions {
  initialStatus?: Partial<UseTablePagingStatus>
  immediate?: boolean
  scrollSelector?: string
}

export function useTablePaging<T = any>(
  task: UseTablePagingTask<T>,
  options: UseTablePagingOptions = {},
) {
  const { initialStatus, immediate, scrollSelector } = options

  const status = reactive<UseTablePagingStatus>(
    Object.assign(
      {
        pageIndex: 0,
        pageSize: 10,
        total: 0,
        loading: false,
        error: '',
      },
      initialStatus,
    ),
  )

  // 滚动到顶部
  const scrollTop = () => {
    if (scrollSelector) {
      // 重置
      const els = document.querySelectorAll(scrollSelector)
      const el = els[els.length - 1]
      if (el) {
        el.scrollTop = 0
      }
    }
  }

  // 列表数据
  // https://github.com/vuejs/core/issues/2136
  const list = ref([]) as Ref<T[]>

  const trigger = (pageIndex?: number, pageSize?: number) => {
    const promise = task([pageIndex, pagingStatus.pagingSize]).then((res) => {
      const [data, total] = res
      list.value = data || []
      status.error = ''
      status.pageIndex = pageIndex
      status.total = total
    })

    // error
    ;(promise.toast
      ? promise.toast((_, msg) => {
          status.error = msg
          return true
        })
      : promise.catch((err) => {
          status.error = isString(err) ? err : JSON.stringify(err)
        })
    ).finally(() => {
      if (isFunction(options)) {
        options(status.error)
      }
      // first page error
      if (status.error) {
        status.total = -1
        list.value = []
      }
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
