import webpack from "webpack";
import glob from 'fast-glob';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aliases = {};
fs.readdirSync(path.join(__dirname, "./vendor")).forEach((name) => {
    aliases[name] = path.join(__dirname, "./vendor", name);
});

export default {
  mode: 'development',
  bail: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'perseus-[name].js',
    library: 'peruse',
    libraryTarget: 'umd', 
    globalObject: 'this',
  },
    devtool: 'source-map',
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
