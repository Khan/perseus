/**
 * Common config options for the babel compiler
 */

module.exports = {
    whitelist: [
        'es6.arrowFunctions',
        'es6.blockScoping',
        'es6.classes',
        'es6.constants',
        'es6.destructuring',
        'es6.forOf',
        'es6.parameters.rest',

        // The non-loose code for for of uses computed properties... they might
        // be used elsewhere too.
        // TODO(kevinb) We can experiment with whether this is necessary
        'es6.properties.computed',
        'es6.properties.shorthand',
        'es6.templateLiterals',
        'es6.spread',
        'es7.objectRestSpread',
        'react',
    ],
    plugins: ['i18n-babel-plugin'],
    loose: 'all',
};
