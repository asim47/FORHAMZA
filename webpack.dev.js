
module.exports = {
    mode: 'development',
    entry: [`${__dirname}/src/index.jsx`, "./src/css/styles.scss"],
    output: {
        path: `${__dirname}/dist/js`,
        filename: "bundle.js",
        publicPath: "/js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        "plugins": [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            },
            {
                test:/\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,

        watchOptions: {
            ignored: /node_modules/
        },

        proxy: {
            "/api":"http://localhost:3000",
        },
    },
    devtool: "eval",
    resolve: { extensions: [".js", ".jsx"] },
};

