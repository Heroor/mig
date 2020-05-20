const { resolve } = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoader = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    popup: resolve(__dirname, 'src/app/popup'),
    inject: resolve(__dirname, 'src/app/inject'),
    options: resolve(__dirname, 'src/app/options'),
    background: resolve(__dirname, 'src/app/background'),
  },
  output: {
    path: resolve(__dirname, 'extension'),
    filename: '[name]/index.js',
  },
  watch: true,
  devtool: 'online-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: [resolve(__dirname, 'src/app')],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        include: [resolve(__dirname, 'src')],
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        include: [resolve(__dirname, 'src/app')],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  plugins: [
    new VueLoader(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtensionReloader({
      manifest: resolve(__dirname, 'src/app/manifest.json'),
    }),
    new HtmlWebpackPlugin({
      // minify: __DEV__ ? false : htmlMinifyOptions,
      chunks: ['options'],
      filename: 'options/dashboard.html',
      title: 'options page',
      template: resolve(__dirname, 'public/options.html'),
      inject: true,
    }),
    new HtmlWebpackPlugin({
      // minify: __DEV__ ? false : htmlMinifyOptions,
      chunks: ['popup'],
      filename: 'popup/index.html',
      title: 'popup page',
      template: resolve(__dirname, 'public/popup.html'),
    }),
    new CopyPlugin(
      [
        {
          from: './src/app/manifest.json',
          cache: true,
        },
      ],
      { copyUnmodified: true },
    ),
  ],
}
