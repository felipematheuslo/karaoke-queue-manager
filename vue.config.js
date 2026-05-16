const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },

    // Home
    home: {
      entry: 'src/pages/home.js',
      template: 'public/pages/home.html',
      filename: 'karaoke/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'home'],
    },
    // Nosso Sistema
    sistema: {
      entry: 'src/pages/sistema.js',
      template: 'public/pages/sistema.html',
      filename: 'karaoke/sistema/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'sistema'],
    },
    // Login
    login: {
      entry: 'src/pages/login.js',
      template: 'public/pages/login.html',
      filename: 'karaoke/login/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'login'],
    },
    // Demonstração
    demo: {
      entry: 'src/pages/demo.js',
      template: 'public/pages/demo.html',
      filename: 'karaoke/demo/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'demo'],
    },
    demo_admin: {
      entry: 'src/pages/demo-admin.js',
      template: 'public/pages/demo-admin.html',
      filename: 'karaoke/demo/admin/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'demo_admin'],
    },
    // Pizza Pub
    pizzapub: {
      entry: 'src/pages/clients/pizzapub/pizzapub.js',
      template: 'public/pages/clients/pizzapub/pizzapub.html',
      filename: 'karaoke/pizzapub/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'pizzapub'],
    },
    pizzapub_admin: {
      entry: 'src/pages/clients/pizzapub/admin.js',
      template: 'public/pages/clients/pizzapub/admin.html',
      filename: 'karaoke/pizzapub/admin/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'pizzapub_admin'],
    },
    // Uatahell
    uatahell: {
      entry: 'src/pages/clients/uatahell/uatahell.js',
      template: 'public/pages/clients/uatahell/uatahell.html',
      filename: 'karaoke/uatahell/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'uatahell'],
    },
    uatahell_admin: {
      entry: 'src/pages/clients/uatahell/admin.js',
      template: 'public/pages/clients/uatahell/admin.html',
      filename: 'karaoke/uatahell/admin/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'uatahell_admin'],
    },
  },
});
