export interface QueryFormField {
  key: string
  is: any
  label?: string
  value?: any
  initialValue?: any
  props?: {
    //
  }
  options?: any
}

export type QueryFormMetadata = (QueryFormField | (() => QueryFormField[]))[]
