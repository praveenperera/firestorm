const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

// Change node process to the firestorm_web root
process.chdir(__dirname)

const staticDir = path.join(__dirname, 'web/static')
const destDir = path.join(__dirname, 'priv/static')
const publicPath = 'http://localhost:4000/'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: [staticDir + '/js/app.js', staticDir + '/css/app.scss'],
  output: {
    path: destDir,
    filename: 'js/app.js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader!sass-loader",
          fallback: "style-loader",
        }),
      },
    ],
  },
  devServer: {
    contentBase: staticDir,
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([{ from: './web/static/assets/images' }]),
  ],
}
