import fs from "node:fs";

import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

import type {KhanStyle} from "../../domain/graffiti/khan-style";

/**
 * The default theme's values of Wonder Blocks' CSS variables, from its
 * stylesheet: its JavaScript tokens are the variables' names, and only the
 * stylesheet has their values.
 */
function readThemeValues(css: string): Map<string, string> {
    const values = new Map<string, string>();
    // The default theme's variables are in several blocks.
    const blocks = /\[data-wb-theme='default'\]\s*\{([^}]*)\}/g;
    for (const [, body] of css.matchAll(blocks)) {
        for (const declaration of body.split(";")) {
            const colon = declaration.indexOf(":");
            if (colon > 0) {
                values.set(
                    declaration.slice(0, colon).trim(),
                    declaration.slice(colon + 1).trim(),
                );
            }
        }
    }
    return values;
}

/**
 * Khan's diagram colors from Wonder Blocks' tokens (its math colors, which
 * are TeX's, and the colors Perseus's graphs use), read from `cssPath`,
 * Wonder Blocks' stylesheet.
 */
export function readKhanStyle(cssPath: string): KhanStyle {
    const values = readThemeValues(fs.readFileSync(cssPath, "utf8"));
    function value(token: string): string {
        // A token is `var(--wb-…)`.
        const name = /^var\((--[\w-]+)\)$/.exec(token)?.[1];
        const found = name == null ? undefined : values.get(name);
        if (found == null) {
            throw new Error(`Wonder Blocks has no value for ${token}.`);
        }
        return found;
    }
    const math = semanticColor.learning.math.foreground;
    const core = semanticColor.core;
    return {
        colors: {
            blue: value(math.blue),
            green: value(math.green),
            gold: value(math.gold),
            red: value(math.red),
            pink: value(math.pink),
            purple: value(math.purple),
            purpleD: value(math.purpleD),
            gray: value(math.gray),
            grayH: value(math.grayH),
            grayI: value(math.grayI),
        },
        ui: {
            ink: value(core.foreground.neutral.strong),
            interactive: value(core.foreground.instructive.default),
            line: value(core.border.neutral.default),
            gridLine: value(core.border.neutral.subtle),
            background: value(core.background.base.default),
        },
        tints: {
            blue: value(core.background.instructive.subtle),
            green: value(core.background.success.subtle),
            gold: value(core.background.warning.subtle),
            red: value(core.background.critical.subtle),
            gray: value(core.background.neutral.subtle),
        },
    };
}
