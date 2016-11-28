let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let appPath = path.resolve(__dirname, "..", "app");
let customerXPath = path.resolve(appPath, "customerX", "react", "index.js");

const plugins = [
    new ExtractTextPlugin("[name]/build/bundle.css", {allChunks: false}),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.Tether": 'tether'
    })
];

const stylesLoaders = (isProd) => {

    let loaders = {
        'css': '',
        'less': '!less-loader',
        'sass': '!sass-loader',
    };

    return Object.keys(loaders).map(ext => {
        let extLoaders = 'css-loader' + loaders[ext];
        return {
            loader: isProd ? ExtractTextPlugin.extract('style-loader', extLoaders) : `style-loader!${extLoaders}`,
            test: new RegExp(`\\.(${ext})$`)
        };
    });
};

const webpackConfig = {
    devtool: 'eval',
    entry: {
        customerX: [customerXPath],
    },
    output: {
        path: appPath,
        filename: "[name]/build/bundle.js",
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.svg/, loader: 'url-loader?limit=10000'},
            {test: /\.eot/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'},
            {test: /\.woff2/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2'},
            {test: /\.woff/, loader: 'url-loader?limit=100000&mimetype=application/font-woff'},
            {test: /\.ttf/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf'},
            {test: /\.(jpg|png)$/, loader: 'url?limit=25000'},
            {test: /\.json$/, loader: "json"},
        ]
    },
    plugins: plugins
};

module.exports = function (isProduction = true) {

    webpackConfig.module.loaders = webpackConfig.module.loaders.concat(stylesLoaders(isProduction));

    if (isProduction) {

        webpackConfig.plugins = webpackConfig.plugins.concat([
            // new webpack.optimize.CommonsChunkPlugin('common.js'),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ]);

    } else {

        webpackConfig.devtool = 'inline-source-map';
        webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
    }

    return webpackConfig;
};
