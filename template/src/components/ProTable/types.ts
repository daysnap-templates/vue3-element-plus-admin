export interface ProTableRequest<T = any> {
  (state: [number, number], query: Record<string, any>): Promise<[T[], number]>
}
