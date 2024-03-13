/* eslint-disable semi */
const path = require('path')
const slsw = require('serverless-webpack')
const TerserPlugin = require('terser-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const isLocal = slsw.lib.webpack.isLocal
module.exports = {
  devtool: isLocal ? 'cheap-source-map' : 'source-map',
  context: __dirname,
  entry: slsw.lib.entries,
  mode: isLocal ? 'development' : 'production',
  externalsPresets: { node: true },
  resolve: {
    extensions: ['.json', '.ts', '.js', '.mjs'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), '.webpack'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  optimization: {
    concatenateModules: false,
    minimize: !isLocal,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          keep_classnames: true,
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.json',
              experimentalWatchApi: true,
              projectReferences: true,
            },
          },
        ],
      },
    ],
  },
}
