const webpack = require('webpack');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './packages/index',
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  resolve: {
    extensions: ['js', '.less']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './packages',
    hot: true,
  },
  plugins: [
    new htmlPlugin({
      title: 'Custom template using Handlebars',
      template: path.resolve(__dirname, './packages/index.html')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.hotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}