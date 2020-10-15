module.exports = {
  configureWebpack: {
    module: {
      rules: [
        { enforce: 'post', test: /unicode-properties[\/\\]index.js$/, loader: 'transform-loader?brfs' },
        { enforce: 'post', test: /fontkit[\/\\]index.js$/, loader: 'transform-loader?brfs' },
        { enforce: 'post', test: /linebreak[\/\\]src[\/\\]linebreaker.js/, loader: 'transform-loader?brfs' },
      ],
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          'github',
        ],
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
