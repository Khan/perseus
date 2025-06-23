/**
 * Modern JavaScript bundlers support importing non-JavaScript files.  This
 * file adds placeholder types for each of these types so that TypeScript
 * doesn't complain about these imports.
 */
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.css";

// Support specific SVG paths from @phosphor-icons/core.
declare type PhosphorRegular = string & {weight: "PhosphorRegular"};
declare module "@phosphor-icons/core/regular/*.svg" {
    const icon: PhosphorRegular;
    export default icon;
}

declare type PhosphorBold = string & {weight: "PhosphorBold"};
declare module "@phosphor-icons/core/bold/*-bold.svg" {
    const icon: PhosphorBold;
    export default icon;
}

declare type PhosphorFill = string & {weight: "PhosphorFill"};
declare module "@phosphor-icons/core/fill/*-fill.svg" {
    const icon: PhosphorFill;
    export default icon;
}
