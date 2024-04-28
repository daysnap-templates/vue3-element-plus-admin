import Component from './ProTable.vue'

export * from './types'
export * from './useProTable'
export * from './useProTablePaging'

export const ProTable = Component
export default ProTable

export type ProTableInstance = InstanceType<typeof ProTable>
