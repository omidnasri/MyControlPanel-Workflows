const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob")

module.exports = {
  entry: {
    "bundle.js": glob.sync("build/static/?(js)/main.*.?(js)").map(f => path.resolve(__dirname, f)),
  },
  output: {
    filename: "build/static/js/bundle.min.js",
  },
  plugins: [new UglifyJsPlugin()],
  mode: "production"
}