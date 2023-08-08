export function useWithLoading<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const loading = ref(false)

  const trigger = async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    loading.value = true
    try {
      const result = await fn(...args)
      return result
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return [loading, trigger] as const
}
