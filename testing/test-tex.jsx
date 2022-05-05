// @flow
import {useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import katex from "katex";
import renderA11yString from "katex/dist/contrib/render-a11y-string.js";
import * as React from "react";
import "katex/dist/katex.css";

import type {PerseusDependencies} from "../packages/perseus/src/types.js";

type Props = React.ElementConfig<PerseusDependencies["TeX"]>;

/**
 * A test version of TeX that can be used in tests and doesn't rely on
 * any webapp/mobile dependencies.  Math is rendered synchronously using
 * renderToString/renderA11yString.  If KaTeX can't process `children`
 * an empty string is rendered instead.
 */
export const TestTeX = (props: Props): React.Node => {
    const {children, katexOptions, onRender} = props;

    const katexHtml = React.useMemo(() => {
        try {
            return katex.renderToString(children, katexOptions || {});
        } catch (e) {
            return "";
        }
    }, [children, katexOptions]);
    const katexA11yHtml = React.useMemo(() => {
        try {
            return renderA11yString(children);
        } catch (e) {
            return "";
        }
    }, [children]);

    const ids = useUniqueIdWithMock();
    const describedById = `katex-${ids.get("described-by-id")}`;

    React.useEffect(() => {
        if (onRender) {
            onRender();
        }
    }, []);

    return (
        <span style={props.style} onClick={props.onClick}>
            <span
                style={{
                    // Disabling wrapping allows to measure the full
                    // width of the rendered expression. Enabling to
                    // scale it to fit to screen, see: zoomable-tex.jsx
                    whiteSpace: "nowrap",
                }}
                dangerouslySetInnerHTML={{
                    __html: katexHtml,
                }}
                aria-hidden={!!katexA11yHtml}
                aria-describedby={describedById}
            />
            {/*
             * If we generated readable english text, it goes here.
             * The srOnly styles will prevent it from being displayed
             * visually.
             */}
            <span
                dangerouslySetInnerHTML={{
                    __html: katexA11yHtml,
                }}
                id={describedById}
                style={srOnly}
            />
        </span>
    );
};

const srOnly = {
    border: 0,
    clip: "rect(0,0,0,0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px",
};
