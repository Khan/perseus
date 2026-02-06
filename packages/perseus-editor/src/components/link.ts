/**
 * A generic link that removes common link styles.
 *
 * This is useful for wrapping many child components in a link and making sure
 * that "link" styles don't get applied to all you content.
 */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {CSSProperties} from "aphrodite";

const DEFAULT_HREF = "javascript:void(0)";

type DefaultProps = {
    element: React.ElementType;
    // Whether the link should appear in a 'highlighted' state. In
    // practice, this will apply the same styles that are applied on-hover.
    highlighted: boolean;
    href: string;
    // Pass through styles but also add our own to normalize
    style: CSSProperties | Array<CSSProperties>;
};

type Props = DefaultProps & {
    children?: React.ReactNode;
    // An additional class name to add. This is supported so-as to allow
    // Perseus to add class-based styles to links when using this
    // component as its base link class.
    className?: string;
    // Additional direct styles to add.
    inlineStyles?: {
        [key: string]: any;
    };
    // Optional referrer query parameter to add to the end of the URL, used
    // for analytics purposes.
    referrer?: string;
    // A target window to open a link in
    target?: string;
    // The relationship between the linked page and the current page.
    // Mostly used to prevent abuse from linked sites.
    rel?: string;
    // The data-testid attribute
    testId?: string;
    // Specify either an HTML tag (like "a") or a React component (like
    // React Router's `Link`) to be used as the underlying element.

    onClick?: (e: React.MouseEvent) => unknown;
    onMouseOver?: (e: React.MouseEvent) => unknown;
    onMouseLeave?: (e: React.MouseEvent) => unknown;
    onMouseEnter?: (e: React.MouseEvent) => unknown;
    onBlur?: (e: React.SyntheticEvent) => unknown;
    onFocus?: (e: React.SyntheticEvent) => unknown;
    onKeyDown?: (e: React.KeyboardEvent) => unknown;
    ["aria-label"]?: string;
    ["aria-selected"]?: boolean;
    ["aria-current"]?: boolean;
    role?: "tab";
    title?: string;
    id?: string;
    tabIndex?: number;
};

/**
 * A wrapper that creates an anchor tag with normalized styles
 */
class Link extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        highlighted: false,
        href: DEFAULT_HREF,
        style: [] as Array<CSSProperties>,
        element: "a",
    };

    render(): React.ReactNode {
        const {
            children,
            className,
            highlighted,
            href,
            inlineStyles,
            referrer,
            style,
            target,
            testId,
            element,
            ...otherProps
        } = this.props;

        // We need to make sure the hash goes at the end of the <a>'s href, so
        // we'll split for now and re-add after potentially adding ?ref=
        // Even though we have defined a default prop for href, if href is
        // set to null, we will still get the null, so we need to handle that.
        const [hrefWithoutHash, hash] = href ? href.split("#") : [DEFAULT_HREF];
        let url = hrefWithoutHash;

        if (referrer) {
            if (url.indexOf("?") > -1) {
                url += "&ref=" + referrer;
            } else {
                url += "?ref=" + referrer;
            }
        }

        if (hash) {
            url += "#" + hash;
        }

        const delegatedStyles = [
            styles.link,
            highlighted && styles.highlighted,
        ];

        if (Array.isArray(style)) {
            delegatedStyles.push(...style);
        } else {
            delegatedStyles.push(style);
        }

        const delegatedClassName = className ? " " + className : "";

        // When passing an anchor tag, we want to use the native `href`.
        // ReactRouter links, though, need a special `to` prop instead.
        const urlProp = element === "a" ? {href: url} : {to: url};

        // When the link is set to open in a new window, we want to append
        // some `rel` attributes. This is to ensure that the links we're
        // sending folks to can't hijack the existing page.
        // More info: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
        //
        // If `rel` is already defined, we assume the caller knows what they're
        // doing. In the future, we may wish to check what keywords are passed,
        // and add in `noopener` and `noreferrer`.
        let rel = otherProps.rel;
        if (target === "_blank" && !rel) {
            rel = "noopener noreferrer";
        }

        return React.createElement(
            element,
            {
                "data-testid": testId,
                ...otherProps,
                ...urlProp,
                className: css(...delegatedStyles) + delegatedClassName,
                style: inlineStyles,
                target,
                rel,
            },
            children,
        );
    }
}

const styles = StyleSheet.create({
    link: {
        // Remove the gray background color from active links in IE 10
        // https://necolas.github.io/normalize.css/3.0.2/normalize.css
        backgroundColor: "transparent",
        color: "inherit",
        textDecoration: "none",
        ":hover": {
            textDecoration: "underline",
        },
    },
    highlighted: {
        textDecoration: "underline",
    },
});

export default Link;
