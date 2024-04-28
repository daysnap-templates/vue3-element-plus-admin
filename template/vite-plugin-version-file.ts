import type { IndexHtmlTransformResult, Plugin } from 'vite'

export default function (): Plugin {
  return {
    name: 'vite-plugin-version-file',
  }
}
