
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          'src': resolve('src'),
        }
      },
      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ]
    }
  }
})
