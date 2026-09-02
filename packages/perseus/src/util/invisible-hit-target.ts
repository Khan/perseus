import {semanticColor, tokenValue} from "@khanacademy/wonder-blocks-tokens";

/**
 * Fill used for invisible mouse/touch hit targets in graphie-based
 * interactives. These shapes are always rendered with `opacity: 0`, so the
 * fill is never painted — it only needs to be a valid color so the shape
 * participates in hit testing.
 *
 * We use the embedded-content background token because it is theme-invariant:
 * since nothing is displayed, the fill must not change with the theme, and
 * this is the token family Wonder Blocks provides for "stays one fixed color
 * in every theme". Any color would behave identically here.
 *
 * This is a function rather than a constant because tokenValue() resolves the
 * token's CSS variable via getComputedStyle, which only works at draw time in
 * a browser — graphie/Raphael requires raw CSS colors, not var() references.
 */
export function invisibleHitTargetFill(): string {
    // tokenValue resolves CSS variable tokens to raw hex — graphie only accepts raw CSS colors
    return tokenValue(
        semanticColor.learning.embeddedContent.background.default,
    );
}
