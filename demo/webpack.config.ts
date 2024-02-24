import path from "path";

function root(filename: string) {
  return path.resolve(__dirname + "/" + filename);
}

module.exports = {
  entry: "./playground/playground.tsx",
  output: {
    path: root("dist"),
    globalObject: "this",
    filename: "playground.bundle.js", // Output filename
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 39999,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "../tsconfig.json",
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
