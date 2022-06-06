/// <reference types="vite/client" />
/// <reference types="unplugin-vue-define-options" />
import 'vue-router'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
  }
}
