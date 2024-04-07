import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import banner from 'vite-plugin-banner'
import pkg from './package.json'

export default {
  plugins: [
    cssInjectedByJsPlugin({ styleId: "to-top-progress-style" }),
    banner(`/**\n * ToTopProgress ${pkg.version}\n * ${pkg.description}\n * Inspirado na template: sandbox-modern-multipurpose-vue-nuxtjs-3-template\n *\n * @license Copyright 2024, Rogério Castro (${pkg.license}).\n * @author: ${pkg.author}\n */`)
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      formats: ['umd'],
      name: 'ToTopProgress',
      fileName: () => `${pkg.name}.min.js`
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
}
