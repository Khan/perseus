/**
 * Configuration for Terser optimisation that's shared.
 *
 * To use, import as `terserOptions` and spread into the `optimize` section
 * in the webpack config.
 */
const TerserPlugin = require("terser-webpack-plugin");

const PRESERVED_IDENTIFIERS = [
    "i18n",
];

module.exports = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            // Enable caching to reduce time of subseqeuent builds
            cache: true,
            // Don't touch .css or .less files or any of the files
            // that we explicitly want to avoid compressing.
            // NOTE(jeresig): Changing this list may result in bundles
            // not being updated properly until their underlying
            // contents change (disabling minimization doesn't change
            // the hash). See: WEB-629.
            exclude: [/\.(css|less)$/],
            // Use ALL the cores (seriously)
            parallel: true,
            // Make it possible to generate source maps
            sourceMap: true,
            // Don't extract the comments/licenses
            extractComments: false,
            // Additional options passed to terser itself
            terserOptions: {
                // Make it use a modern ECMAScript release
                // NOTE(jeresig): If/when we change this there should be a
                // full QE pass to confirm that our supported browsers still
                // work as expected.
                ecma: 2018,
                // We want to compress as it reduces the gzipped filesize by
                // about 5%, which is not trivial!
                compress: true,
                mangle: {
                    // Retain some identifiers (see above)
                    reserved: PRESERVED_IDENTIFIERS,
                },
            },
        }),
    ],
};
