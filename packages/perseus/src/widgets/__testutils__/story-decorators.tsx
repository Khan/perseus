import * as React from "react";

import type {Decorator} from "@storybook/react-vite";

export const mobileDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-mobile">
        <Story />
    </div>
);

export const articleDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-article">
        <Story />
    </div>
);

export const mobileArticleDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-mobile perseus-article">
        <Story />
    </div>
);

// Set `dir="rtl"` on both the wrapper and `<html>` so portaled content
// (e.g. Wonder Blocks modal) inherits RTL.
// CSS `direction` inherits through the DOM tree, not the React tree, so
// portals don't properly inherit the RTL direction without the HTML mutation.
const RtlWrapper = ({children}: {children: React.ReactNode}) => {
    React.useEffect(() => {
        const html = document.documentElement;
        const prev = html.getAttribute("dir");
        html.setAttribute("dir", "rtl");

        // Cleanup function for the effect - reset the `dir` attribute
        // to the previous value.
        return () => {
            if (prev === null) {
                html.removeAttribute("dir");
            } else {
                html.setAttribute("dir", prev);
            }
        };
    }, []);
    return <div dir="rtl">{children}</div>;
};

export const rtlDecorator: Decorator = (Story) => (
    <RtlWrapper>
        <Story />
    </RtlWrapper>
);

const articleContent1 =
    "Prophase (sometimes divided into prophase and prometaphase):";
const articleContent2 =
    "Chromosomes: In prophase, the chromosomes condense, forming the characteristic “X” shape that is often shown in diagrams. Each “X” is a duplicated chromosome. The two sides of the “X” are called sister chromatids, and they are attached at a point called the centromere. Even though the chromosome has been copied at this point of the cell cycle, as long as the two copies (sister chromatids) are attached, they are considered a single chromosome.";
const articleContent3 =
    "The nucleolus (a structure inside the nucleus where ribosomes are made) disappears during prophase. The mitotic spindle begins to form during prophase, starting at regions called centrosomes. These regions contain the material needed for building the spindle, and also function to regulate the spindle throughout mitosis.";

export const mobileArticleFloatLeftDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-mobile perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-wrap-left">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

export const mobileArticleFloatRightDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-mobile perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-wrap-right">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

export const articleFloatLeftDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-wrap-left">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

export const articleFloatRightDecorator: Decorator = (Story) => (
    <div className="framework-perseus perseus-article">
        <div className="paragraph">
            <div className="perseus-widget-container widget-nohighlight widget-wrap-right">
                <Story />
            </div>
        </div>
        <div className="paragraph">{articleContent1}</div>
        <div className="paragraph">{articleContent2}</div>
        <div className="paragraph">{articleContent3}</div>
    </div>
);

// Force overflow so the radio widget’s scroll controls render in these stories.
export const narrowViewportDecorator: Decorator = (Story) => (
    <div style={{maxWidth: "400px"}}>
        <Story />
    </div>
);

// Forces `prefers-reduced-motion: reduce` for components that branch on it in
// JavaScript via `window.matchMedia` (rather than a CSS `@media` query, which
// Chromatic can emulate directly). We only override the reduced-motion query
// and delegate everything else to the real `matchMedia`, so unrelated queries
// (e.g. viewport-width checks) keep working.
//
// Multiple stories can be mounted on the same page (e.g. Chromatic's docs
// view), so we reference-count the mock instead of saving/restoring per
// instance.
let matchMediaMockReferences = 0;
let originalMatchMedia: typeof window.matchMedia | null = null;

const ReducedMotionWrapper = ({children}: {children: React.ReactNode}) => {
    React.useEffect(() => {
        if (matchMediaMockReferences === 0) {
            const original = window.matchMedia;
            originalMatchMedia = original;
            window.matchMedia = (query: string) => {
                if (query.includes("prefers-reduced-motion: reduce")) {
                    // Casts are needed here because we intentionally build a
                    // partial MediaQueryList stub for the reduced-motion query —
                    // this is an unsafe test-only boundary standing in for a
                    // browser API.
                    // eslint-disable-next-line no-restricted-syntax
                    return {
                        matches: true,
                    } as MediaQueryList;
                }
                return original.call(window, query);
            };
        }
        matchMediaMockReferences++;

        // Restore the original implementation once the last wrapper unmounts.
        return () => {
            matchMediaMockReferences--;
            if (matchMediaMockReferences === 0 && originalMatchMedia) {
                window.matchMedia = originalMatchMedia;
                originalMatchMedia = null;
            }
        };
    }, []);
    return <>{children}</>;
};

export const reducedMotionDecorator: Decorator = (Story) => (
    <ReducedMotionWrapper>
        <Story />
    </ReducedMotionWrapper>
);
