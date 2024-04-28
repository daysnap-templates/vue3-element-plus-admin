import type { CreateAxiosDefaults } from 'axios'

export const baseURL = '//dealer.autostreets.com/'

export const DEFAULT_CONFIG: CreateAxiosDefaults = {
  baseURL,
  timeout: 60 * 1000,
  responseType: 'json',
  headers: {},
}
