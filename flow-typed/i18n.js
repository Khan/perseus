/**
 * A declaration that the i18n library, defined in `lib/i18n.js`, is available
 * globally throughout Perseus.
 *
 * Because this file is in the `flow-typed` directory, its declarations are
 * available as globals throughout all Perseus modules.
 */
declare var i18n: {
    _: (text: string, interpolations?: {[k: string]: string}) => string,
    // TODO(mdr): There are more functions in the library, but I haven't
    //     written type annotations for them.
};
