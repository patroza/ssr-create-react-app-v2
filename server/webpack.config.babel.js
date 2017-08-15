import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'

const externals = {}
const excludes = ['.bin']
fs.readdirSync('node_modules')
  .filter((x) => excludes.indexOf(x) === -1)
  .forEach((mod) =>externals[mod] = 'commonjs ' + mod)

const config = {
  externals,
  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  entry: './server/index.js',

  output: {
    path: path.resolve('./build/public'),
    filename: '../server.js',
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [{
        test: /\.(jpe?g|png|gif)$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 1000,
          name: 'images/[hash].[ext]',
        }
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: ["es2015", "stage-2", "react", "flow"],
          plugins: [
            "transform-decorators-legacy",
            "transform-class-properties"
          ],
          // @remove-on-eject-end
          compact: true,
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: require.resolve('file-loader')
      },
      {
        test: /\.css$/,
        include: /index\.css/,
        loaders: [
          require.resolve('isomorphic-style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              //sourceMap: shouldUseSourceMap,
              localIdentName: "[local]___[hash:base64:5]",
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /index\.css/,
        loaders: [
          require.resolve('isomorphic-style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              //sourceMap: shouldUseSourceMap,
              localIdentName: "[local]___[hash:base64:5]",
              modules: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ]
      }
    ]
  },

  plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: false,
        options: {}
      })
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
}

export default config
