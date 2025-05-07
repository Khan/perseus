import {entries} from "@khanacademy/wonder-stuff-core";
import {StyleSheet, css} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {CSSProperties} from "aphrodite";

function flatten(list?: StyleType): ReadonlyArray<CSSProperties> {
    const result: Array<CSSProperties> = [];

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!list) {
        return result;
    }
    if (Array.isArray(list)) {
        for (const item of list) {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            result.push(...flatten(item));
        }
    } else {
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        result.push(list as any);
    }

    return result;
}

export function processStyleType(style?: StyleType): {
    className: string;
    style: Record<any, any>;
} {
    const stylesheetStyles: Array<CSSProperties> = [];
    const inlineStyles: Array<CSSProperties> = [];

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    // Check to see if we should inline all the styles for snapshot tests.
    const shouldInlineStyles =
        typeof globalThis !== "undefined" &&
        globalThis.SNAPSHOT_INLINE_APHRODITE;

    flatten(style).forEach((child) => {
        // Check for aphrodite internal property
        const _definition = (child as any)._definition;
        if (_definition != null) {
            if (shouldInlineStyles) {
                const def: Record<string, any> = {};
                // React 16 complains about invalid keys in inline styles.
                // It doesn't accept kebab-case in media queries and instead
                // prefers camelCase.
                for (const [key, value] of entries(_definition)) {
                    // This regex converts all instances of -{lowercaseLetter}
                    // to the uppercase version of that letter, without the
                    // leading dash.
                    // TODO(LEMS-3083): Remove eslint suppression
                    // eslint-disable-next-line functional/immutable-data
                    def[
                        key.replace(/-[a-z]/g, (match) =>
                            match[1].toUpperCase(),
                        )
                    ] = value;
                }
                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                inlineStyles.push(def);
            } else {
                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                stylesheetStyles.push(child);
            }
        } else {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            inlineStyles.push(child);
        }
    });

    const inlineStylesObject = Object.assign({}, ...inlineStyles);

    // TODO(somewhatabstract): When aphrodite no longer puts "!important" on
    // all the styles, remove this <ADD JIRA ISSUE HERE IF THIS PASSES REVIEW>
    // If we're not snapshotting styles, let's create a class for the inline
    // styles so that they can apply to the element even with aphrodite's
    // use of !important.
    if (inlineStyles.length > 0 && !shouldInlineStyles) {
        const inlineStylesStyleSheet = StyleSheet.create({
            inlineStyles: inlineStylesObject,
        });
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        stylesheetStyles.push(inlineStylesStyleSheet.inlineStyles);
    }

    return {
        style: shouldInlineStyles ? inlineStylesObject : {},
        className: css(...stylesheetStyles),
    };
}
