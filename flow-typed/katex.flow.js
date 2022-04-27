// @flow
type SettingsOptions = {
    colorIsTextColor?: boolean,
    ...
};

declare module "katex" {
    import type {Node} from "react";

    declare module.exports: {|
        version: string,

        render(
            expression: string,
            baseNode: Node,
            options: SettingsOptions,
        ): void,

        renderToString(expression: string, options: SettingsOptions): string,

        ParseError: Error,
    |};
}

declare module "katex/dist/katex.css" {
    declare var exports: {[string]: string, ...};
}

declare module "katex/dist/contrib/render-a11y-string.js" {
    declare export default function renderA11yString(
        text: string,
        settings?: SettingsOptions,
    ): string;
}

declare module "katex/dist/contrib/mhchem.js" {
    // intentionally empty
}
