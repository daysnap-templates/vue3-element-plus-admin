export interface QueryFormField {
  key: string
  is: any
  label?: string
  value?: any
  defaultValue?: any
  props?: {
    //
  }
  options?: any
}

export type QueryFormMetadataObject = Record<string, QueryFormField>

export type QueryFormMetadataArray = QueryFormField[]

export type QueryFormMetadata = QueryFormMetadataObject | QueryFormMetadataArray
