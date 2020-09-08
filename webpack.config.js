const path = require("path");

module.exports = {
    entry: "./React/client/src/index.tsx",
    output: {
        path: path.resolve(__dirname, "React/client/public"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "source-map",
};
