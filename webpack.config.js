
const path = require('path')
const webpack = require('webpack')
const { dependencies, name } = require('./package')

const externals = Object.keys(dependencies)

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

module.exports = {

  output: {
    library: name,
    libraryTarget: 'umd',
  },

  externals,

  module: {
    loaders: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },

  node: {
    Buffer: false,
  },

  plugins,

  resolve: {
    alias: {
      '#utils': path.resolve(__dirname, 'src', '_internal', 'utils'),
      '#styles': path.resolve(__dirname, 'src', '_internal', 'styles'),
      '#components': path.resolve(__dirname, 'src', '_internal', 'components'),
    },
  },

}
