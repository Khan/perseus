/**
 * Common config options for the babel compiler
 */

module.exports = {
    whitelist: whitelist = [
        'es6.arrowFunctions',
        'es6.blockScoping',
        'es6.classes',
        'es6.destructuring',
        'es6.parameters',
        'es6.properties.shorthand',
        'es6.templateLiterals',
        'es6.spread',
        'es7.objectRestSpread',
        'react',
        'react.displayName',
    ],
    blacklist: [],
    plugins: ['i18n-babel-plugin']
};
