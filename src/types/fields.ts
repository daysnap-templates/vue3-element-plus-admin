export interface QueryFormField {
  is?: any
  label?: string
  value?: any
  defaultValue?: any
  get?: (...args: any[]) => any
  hidden?: any
  props?: Record<string, any>
  options?: any
}

export type QueryFormMetadata = Record<string, QueryFormField>
