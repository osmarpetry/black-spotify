const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const packageFile = require('./package.json')

module.exports = (env, arg) => {
    const webpackPlugins = [
        new WebpackPwaManifest({
            filename: 'manifest.json',
            short_name: 'Black Spotify',
            name: 'Black Spotify',
            description: 'Black Spotify - Your black Spotify',
            theme_color: '#000000',
            background_color: '#000000',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            icons: [
                {
                    src: path.resolve('public/icon-512x512.png'),
                    sizes: [96, 128, 192, 256, 384, 512]
                }
            ]
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CompressionPlugin({
            cache: true,
            algorithm: 'gzip',
            compressionOptions: { level: 9 },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
        }),
        new GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true
        }),
        new webpack.EnvironmentPlugin({
            BLACK_SPOTIFY_ENV: arg.mode
        })
    ]

    if (arg.mode !== 'development') {
        webpackPlugins.push(
            new SentryCliPlugin({
                include: path.join(__dirname, 'dist'),
                ignore: ['node_modules', 'webpack.*.js'],
                release: packageFile.version,
                configFile: 'sentry.properties'
            })
        )
    }

    return {
        entry: ['./src/index.js'],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            sourceMapFilename: '[name].[contenthash].js.map',
            chunkFilename: '[name][chunkhash].js',
            publicPath: '/'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(j)sx?$/,
                    use: { loader: 'babel-loader' },
                    exclude: /node_modules/
                },
                {
                    test: /\.svg$/,
                    use: ['url-loader']
                },
                {
                    test: /\.html$/,
                    use: ['html-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        devServer: {
            compress: true,
            historyApiFallback: true,
            overlay: true,
            port: 8080
        },
        plugins: webpackPlugins,
        optimization: {
            minimizer: [new UglifyJsPlugin()],
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                maxInitialRequests: Infinity,
                minSize: 0
            }
        }
    }
}
