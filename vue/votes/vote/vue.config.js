module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3006',
        ws: true,
        changOrigin: true,
      },

    },
  },
  lintOnSave:false,
};
