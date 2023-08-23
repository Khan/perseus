import {useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import katex from "katex";
import renderA11yString from "katex/dist/contrib/render-a11y-string";
import * as React from "react";
import "katex/dist/katex.css";

import type {PerseusDependencies} from "../packages/perseus/src/types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type Props = PropsFor<PerseusDependencies["TeX"]>;

/**
 * A test version of TeX that can be used in tests and doesn't rely on
 * any webapp/mobile dependencies.  Math is rendered synchronously using
 * renderToString/renderA11yString.  If KaTeX can't process `children`
 * an empty string is rendered instead.
 */
export const TestTeX = (props: Props): React.ReactElement => {
    const {children, katexOptions, onRender} = props;

    const katexHtml = React.useMemo(() => {
        try {
            return katex.renderToString(children, katexOptions || {});
        } catch (e: any) {
            return "";
        }
    }, [children, katexOptions]);
    const katexA11yHtml = React.useMemo(() => {
        try {
            return renderA11yString(children);
        } catch (e: any) {
            return "";
        }
    }, [children]);

    const ids = useUniqueIdWithMock();
    const describedById = `katex-${ids.get("described-by-id")}`;

    React.useEffect(() => {
        if (onRender) {
            onRender();
        }
        // NOTE(kevinb): We intentionally leave the deps list empty here
        // since we want this code to only run once on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
} as const;
