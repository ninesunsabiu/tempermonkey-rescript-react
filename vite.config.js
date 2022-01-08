import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

const tamperMonkeyPlugin = ({ name, namespace, match, description }) => {
  const meta = `\
// ==UserScript==
// @name         ${name} 
// @namespace    ${namespace}
// @version      0.1.0
// @description  ${description}
// @author       You
// @match        ${match} 
// @grant        GM_addStyle
// @noframes
// @require      https://unpkg.com/react@17/umd/react.development.js
// @require      https://unpkg.com/react-dom@17/umd/react-dom.development.js
// @require      https://greasyfork.org/scripts/372672-everything-hook/code/Everything-Hook.js?version=784972
// ==/UserScript==
`
  return {
    name: 'inject-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {
      const entryFileBundle = (() => {
        const entryFileName = options.entryFileNames
        const b = bundle[entryFileName]
        return b && b.type === 'chunk' ? b : null
      })()

      const cssFileBundle = (() => {
        const styleFileName = 'style.css'
        const b = bundle[styleFileName]
        return b && b.type === 'asset' ? b : null
      })();

      if (entryFileBundle && cssFileBundle) {
        entryFileBundle.code = `\
${meta}

(function() {
  'use strict';

  GM_addStyle(
    \`${cssFileBundle.source}\`
  )
${entryFileBundle.code}
})();
`
      }

    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tamperMonkeyPlugin({
    name: 'number-format',
    namespace: 'https://www.agilean.cn',
    description: 'format number for money',
    match: 'http://127.0.0.1:8089/*'
  })],
  server: {
    host: '127.0.0.1',
    hmr: {
      host: '127.0.0.1',
      protocol: 'ws'
    }
  },
  hmr: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.bs.js'),
      name: 'userscript',
      formats: ['iife'],
      fileName: format => `my-script.${format}.user.js`
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        },
        inlineDynamicImports: true
      }
    },
    minify: 'terser',
    terserOptions: {
      mangle: false,
      format: {
        beautify: true
      }
    }
  }
})
