const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

let htmlPlugins = [];

let entries = {};

const { pages } = config;

for(let key in pages) {
    const page = key;
    const { meta } = pages[key]; 
    const bootstrap = meta.bootstrapStyle ? ['bootstrap/dist/css/bootstrap'] : [];
    const htmlPlugin = new HTMLWebpackPlugin({
        meta,
        filename: `${page}.html`,
        template: path.resolve(__dirname, `./src/pages/${page}`),
        chunks: [page, 'commons'],
        minify: {
            "removeAttributeQuotes": true,
            "removeComments": true,
            "removeEmptyAttributes": true,
            "collapseWhitespace" :true
        }
    });
    htmlPlugins.push(htmlPlugin);
    entries[page] = [
        // logic scripts
        path.resolve(__dirname, `./src/logic/${page}`),
        
        // bootstrap
        ...bootstrap,

        // page style
        path.resolve(__dirname, `./src/styles/${page}`)

    ];     
}
module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        unknownContextCritical : false,
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname,"./node_modules"),
                include: path.resolve(__dirname, "./src"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            'babel-plugin-transform-class-properties',
                            'transform-async-to-generator',
                            'transform-regenerator',
                            'transform-decorators-legacy', 
                            'dynamic-import-webpack',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.ejs$/,
                exclude: path.resolve(__dirname,"./node_modules"),
                include: path.resolve(__dirname, "./src"),
                use: {
                    loader: 'ejs-loader'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.scss$/,
                //include: path.resolve(__dirname, "./src"),
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, { 
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                //include: path.resolve(__dirname, "./src"),
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    resolve: {
        alias: {
            'jquery': path.resolve(__dirname, './node_modules/jquery'),
            'backbone': path.resolve(__dirname, './node_modules/backbone'),
            'bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
            'layui':  path.resolve(__dirname, './node_modules/layui-src/dist'),
            '@layui': path.resolve(__dirname, './node_modules/layui-src/dist/lay/modules'),
            'underscore': path.resolve(__dirname, './node_modules/underscore'),
            '@': path.resolve(__dirname, './src')
        },
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: [
            '.js',
            '.json',
            '.ejs',
            '.css',
            '.scss'
        ],
    },
    optimization: {
        splitChunks: {
            minChunks: 3,
            name: 'commons'
        }
    },
    devServer: {
        proxy: {
            
        },
        open : true
    },
    plugins: [
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '_': 'underscore',
            '$': 'jquery',
            'jquery': 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        ...htmlPlugins,
        new ExtractTextWebpackPlugin("[name].[hash].css"),
    ]
}