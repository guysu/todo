const path = require("path");

module.exports = {
    entry: "./client/src/index.js",
    output: {
        path: path.resolve(__dirname, "client/src/dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    devtool: "source-map",
};
