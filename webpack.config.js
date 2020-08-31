const path = require("path");

module.exports = {
    entry: "./Server/client/src/index.js",
    output: {
        path: path.resolve(__dirname, "Server/client/public"),
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
    watch: true,
};
