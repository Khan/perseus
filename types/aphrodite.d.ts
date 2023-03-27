declare module "aphrodite" {
    import * as React from "react";

    type _CSSProperties = React.CSSProperties & {
        /**
         * Browser Specific
         */
        MsFlexBasis?: React.CSSProperties["flexBasis"];
        MsFlexPreferredSize?: React.CSSProperties["flexBasis"];
        WebkitFlexBasis?: React.CSSProperties["flexBasis"];
        flexBasis?: React.CSSProperties["flexBasis"];
        "::-moz-focus-inner"?: React.CSSProperties;

        /**
         * Media queries
         */
        "@media (max-width: 1023px)"?: React.CSSProperties;
        "@media (min-width: 1024px)"?: React.CSSProperties;
        "@media (min-width: 1168px)"?: React.CSSProperties;
    };

    /**
     * A CSS property definition.
     */
    export type CSSProperties = _CSSProperties & {
        /**
         * Pseudo-selectors
         */
        "::placeholder"?: CSSProperties;
        ":after"?: CSSProperties;
        "::after"?: CSSProperties;
        ":before"?: CSSProperties;
        "::before"?: CSSProperties;
        ":focus-visible"?: CSSProperties;
        ":focus"?: CSSProperties;
        ":hover"?: CSSProperties;
        ":active"?: CSSProperties;
        ":not(:last-child)"?: CSSProperties;
        ":not(:first-child)"?: CSSProperties;
        ":first-child"?: CSSProperties;
        ":last-child"?: CSSProperties;
        ":hover > span"?: CSSProperties;
        ":hover > div"?: CSSProperties;
        ":hover ~ span"?: CSSProperties;
        ":hover ~ div"?: CSSProperties;
        ":hover div"?: CSSProperties;
        ":checked"?: CSSProperties;
        "::-ms-check"?: CSSProperties;
        ":link"?: CSSProperties;
    };

    /**
     * Aphrodite style declaration
     */
    export type StyleDeclaration = Record<string, CSSProperties>;

    export interface StyleSheetStatic {
        /**
         * Create style sheet
         */
        create(styles: StyleDeclaration): StyleDeclaration;
        /**
         * Rehydrate class names from server renderer
         */
        rehydrate(renderedClassNames: Array<string>): void;
    }

    export const StyleSheet: StyleSheetStatic;

    type Falsy = false | 0 | null | undefined;

    /**
     * Get class names from passed styles
     */
    export function css(...styles: Array<CSSProperties | Falsy>): string;
}
