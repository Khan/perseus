# Hubble

Source: https://github.com/joelburget/hubble
Commit: e485987

# How to build

Use the following `webpack.config.js` file:

```
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'hubble.js',
        library: 'hubble',
        libraryTarget: 'umd',
    },
};
```
