'use strict'





module.exports = {
  app: {
    devtool: 'source-map',

    entry: './js/index.js',

    output: {
      filename: 'dist/app.js',
      sourceMapFilename: 'dist/app.js.map'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    },

    stats: {
      colors: true,
      reasons: true
    }
  }
}
