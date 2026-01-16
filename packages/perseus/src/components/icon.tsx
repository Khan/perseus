/* eslint-disable @khanacademy/ts-no-error-suppressions */

import * as React from "react";

import type {CSSProperties} from "aphrodite";

// WARNING: This determines the *viewport* width and height, so a change here
//          requires scaling the values of every SVG path passed in as a string
//          without corresponding `width` and `height` values.
const BASE_ICON_SIZE = 10;

// If you pass in an object you need to specify an SVG path to
// render along with the width and height of the path (to ensure
// that it gets scaled correctly).
export type IconType = {
    height: number;
    path: string;
    width: number;
};

type Props = {
    // The className used for the SVG object (see the pathClassName prop as
    // well).
    className?: string;
    // If you don't want to use Aphrodite, you can pass a style to the
    // icon.
    style?: CSSProperties;
    // Accessible description for this icon. If omitted, icon will be
    // aria-hidden.
    title?: string;
    // The color of the icon. Defaults to "currentColor".
    color: string;
    // Whether the SVG can be focused on when tab-bing around in IE.
    focusable?: boolean;
    // The SVG icon
    icon: // If you pass in a string then it's assumed to be just an SVG
        // path with a default size of 10 pixels wide and tall.
        IconType | string;
    // To be used for custom styling of the component. If using with
    // Aphrodite you'll want to pre-compute the class string by calling
    // css(). Additionally you need to remember that many of the SVG
    // properties are similar, but different. If you want to change the
    // color of the path you'll need to set the `fill` property.
    pathClassName?: string;
    // The height of the icon. Defaults to 1em.
    size?: number;
    // Alt text set on SVG icon
    alt?: string;
};

/**
 * An SVG Icon
 *
 * This component is designed to take in SVG paths and render icons based upon
 * them. If you are looking for an icon that we've used before you should look
 * in `icon-paths.js` which is a reference file for all the SVG paths that
 * we've used. You'll need to copy the object from that file into whichever
 * file you're using the icon and explicitly pass it in to the <Icon/> React
 * component.
 *
 * Sample usage:
 *
 * ```
 * const dropdownIcon = `M5,6L0,0L10,0`;
 * <Icon icon={dropdownIcon} />
 * ```
 *
 * Or:
 *
 * ```
 *   const dropdownIcon = {
 *       path: `M5,6L0,0L10,0`,
 *       height: 10,
 *       width: 10,
 *   };
 *   <Icon icon={dropdownIcon} size={20} />
 * ```
 *
 * If you want to add an entirely new icon please read the note inside
 * the `icon-paths.ts` file.
 */
class Icon extends React.Component<Props> {
    static defaultProps: {
        color: string;
    } = {
        color: "currentColor",
    };

    render(): React.ReactNode {
        const {color, pathClassName, className, title, style, alt} = this.props;
        let {icon, size} = this.props;
        let units = "";

        // If the raw path was passed in, wrap it in the format that we expect.
        if (typeof icon === "string") {
            icon = {
                path: icon,
                width: BASE_ICON_SIZE,
                height: BASE_ICON_SIZE,
            };
        }

        // `size` defaults to 1em to mirror the behavior of Font Awesome.
        if (typeof size !== "number") {
            size = 1;
            units = "em";
        }

        const height = size;
        const width = (height / icon.height) * icon.width;

        // NOTE: We assume that the viewBox is cropped and aligned to (0, 0),
        //       but icons can be defined differently. At some point we might
        //       want to add these attributes to icon-paths.js, but for now
        //       this is a fairly safe assumption.
        const xMin = 0;
        const yMin = 0;

        const focusable = !!this.props.focusable;

        return (
            <svg
                role="img"
                alt={alt}
                aria-label={title}
                aria-hidden={title ? null : true}
                className={className}
                style={style}
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"auto" | Booleanish | undefined'.
                focusable={focusable.toString()}
                width={width + units}
                height={height + units}
                viewBox={`${xMin} ${yMin} ${icon.width} ${icon.height}`}
            >
                {!!title && <title>{title}</title>}
                <path className={pathClassName} fill={color} d={icon.path} />
            </svg>
        );
    }
}

export default Icon;
