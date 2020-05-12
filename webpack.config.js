const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')

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
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: 'ts-loader',
        include: [resolve(__dirname, 'src')],
      },
      {
        test: /\.(css|less)$/,
        use: 'less-loader',
        include: [resolve(__dirname, 'src')],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.less'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtensionReloader({
      manifest: resolve(__dirname, 'src/app/manifest.json'),
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
