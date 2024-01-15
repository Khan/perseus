const webpack = require("webpack");
const babelConfig = require("./babel.config");
const glob = require("fast-glob");
const path = require("path");
const fs = require("fs");

const aliases = {};
glob.sync(path.join(__dirname, "./packages/*/package.json")).forEach(
    (pkgPath) => {
        const pkgJson = require(pkgPath);
        aliases[pkgJson.name] = path.join(
            __dirname,
            "./packages",
            path.basename(path.dirname(pkgPath)),
            pkgJson.source,
        );
    },
);
fs.readdirSync(path.join(__dirname, "./vendor")).forEach((name) => {
    aliases[name] = path.join(__dirname, "./vendor", name);
});

module.exports = {
  mode: 'development',
  bail: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'perseus-[name].js',
    library: 'peruse',
    libraryTarget: 'umd', 
    globalObject: 'this'
  },
  externals: {
 'react': 'react', // Case matters here 
 'react-dom' : 'react-dom' // Case matters here 
},
    devtool: 'cheap-module-source-map',
    entry:  './packages/perseus/src/index.ts',
    resolve: {
        alias: {
            ...aliases,
        },
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
            {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    },
        {
          "test": /\.(tsx|ts|js|jsx)$/,
          "use": [
            {
              "loader": "babel-loader",
              "options": {
                "assumptions": {
                  "constantReexports": true
                },
                "presets": [
                  "@babel/preset-typescript",
                  [
                    "@babel/preset-env",
                    {
                      "targets": {
                        "browsers": [
                          "defaults",
                          "not IE 11"
                        ]
                      }
                    }
                  ],
                  "@babel/preset-react"
                ],
                "plugins": []
              }
            }
          ],
          "include": [
            path.resolve(__dirname)
          ],
            exclude: /node_modules/,
        },
          {
              test: /\.less$/,
              /**
               * We want to disable url processing in the css-loader so that images
               * are not processed. Images are handled as static assets outside of
               * webpack.
               */
              use: [
                  "style-loader",
                  {
                      loader: "css-loader",
                      options: {url: false},
                  },
                  {
                      loader: "less-loader",
                      options: {lessOptions: {math: "always"}},
                  },
              ],
          },
          {
              test: /\.css$/,
              use: [
                  "style-loader",
                  // We use `css-loader` to filter out imports for
                  // KaTeX fonts. These fonts are then emitted to the
                  // `fonts` output path by `file-loader` below.
                  {
                      loader: "css-loader",
                      options: {
                          url: {
                              filter: (url, resourcePath) =>
                                  /\.(woff|woff2|ttf|otf)$/.test(url),
                          },
                      },
                  },
              ],
          },
      ],
    },
    performance: { hints: 'warning' },
};
