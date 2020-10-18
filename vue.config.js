module.exports = {
  configureWebpack: {
    module: {
      rules: [
        /* eslint-disable no-useless-escape */
        { enforce: 'post', test: /unicode-properties[\/\\]index.js$/, loader: 'transform-loader?brfs' },
        { enforce: 'post', test: /fontkit[\/\\]index.js$/, loader: 'transform-loader?brfs' },
        { enforce: 'post', test: /linebreak[\/\\]src[\/\\]linebreaker.js/, loader: 'transform-loader?brfs' },
        /* eslint-enable no-useless-escape */
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
