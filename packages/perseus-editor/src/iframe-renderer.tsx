/* eslint-disable no-console */
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

import type {CSSProperties, PropsWithChildren} from "react";

type Props = PropsWithChildren<{style: CSSProperties; styleSelector: string}>;

function copyStyleIntoIframe(target: HTMLHeadElement, node: Node) {
    if (
        !(node instanceof HTMLLinkElement || node instanceof HTMLStyleElement)
    ) {
        console.log("[copyStyleIntoIframe] Ignoring invalid node:", node);
        return;
    }

    console.log("Copying:", node.outerHTML);
    target.appendChild(node);
}

/**
 * A component that renders its children into an `<iframe />` element. Styles
 * from the current page are copied into the iframe automatically.
 */
function IFrameRenderer({children, style, styleSelector}: Props) {
    const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);
    const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
    const observer = useRef<MutationObserver | null>(null);

    const mountNode = iframeRef?.contentWindow?.document.body;

    useEffect(() => {
        console.log("useEffect running", iframeRef, contentRef);

        const targetWindow = iframeRef?.contentWindow;
        if (targetWindow == null || contentRef == null) {
            return;
        }

        console.log(
            `[${targetWindow.parent.document.title}] Running selector query: ${styleSelector}`,
            targetWindow.parent.document.head.outerHTML,
        );
        for (const node of targetWindow.parent.document.querySelectorAll(
            styleSelector,
        )) {
            copyStyleIntoIframe(targetWindow.document.head, node);
        }

        if (observer.current == null) {
            observer.current = new MutationObserver((mutationList) => {
                for (const record of mutationList) {
                    console.log(record);
                    [...record.addedNodes]
                        .filter((n) => ["LINK", "STYLE"].includes(n.nodeName))
                        .forEach((node) => {
                            copyStyleIntoIframe(
                                targetWindow.document.head,
                                node,
                            );
                        });

                    [...record.removedNodes]
                        .filter((n) => ["LINK", "STYLE"].includes(n.nodeName))
                        .forEach((node) => {});
                }
            });

            // Now start observing the current (parent) document so we can
            // copy/remove matching style nodes in the iframe.
            observer.current.observe(targetWindow.parent.document, {
                attributes: false,
                childList: true,
            });
        }

        return () => {
            observer.current?.disconnect();
        };
    }, [iframeRef, contentRef, styleSelector]);

    return (
        <iframe ref={setIframeRef} style={style} title="Preview Frame">
            {mountNode &&
                createPortal(
                    <div className="framework-perseus" ref={setContentRef}>
                        {children}
                    </div>,
                    mountNode,
                )}
        </iframe>
    );
}

export default IFrameRenderer;
