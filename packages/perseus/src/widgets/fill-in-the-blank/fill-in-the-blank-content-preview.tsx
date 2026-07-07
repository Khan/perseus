/**
 * SPIKE (LEMS-4311 — FITB editor prototype): validates the "Option 1" render
 * theory for the Fill in the Blank widget.
 *
 * The theory: we can render text, TeX, images, and "blanks" flowing inline
 * (wrapping like a paragraph) WITHOUT registering blanks as Perseus widgets and
 * WITHOUT writing a custom markdown renderer — by interleaving a real Perseus
 * <Renderer> for each run of markdown with our own inline blank/image elements.
 *
 * Key points this demonstrates:
 *  - The <Renderer> only ever receives PURE markdown (text + $…$ TeX). It never
 *    has to "recognize" a blank.
 *  - Blanks and images are placed by us, as siblings, BETWEEN the Renderers.
 *  - A single scoped CSS override makes each Renderer's block root flow inline.
 *
 * There is NO drag-and-drop and NO real widget here. Blanks are static, styled
 * placeholders — the real Blank component would be an interactive drop target
 * with full screen-reader labelling. This spike only tests content placement.
 */
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

import styles from "./fill-in-the-blank-content-preview.module.css";

// Local spike types. The real schema lives in perseus-core; it isn't needed to
// test the rendering theory.
export type FITBPreviewSegment =
    | {type: "markdown"; id: string; markdown: string}
    | {
          type: "blank";
          id: string;
          // How the blank sits relative to the baseline. Omit for "normal".
          displayType?: "normal" | "superscript" | "subscript";
      }
    | {type: "image"; id: string; url: string; alt: string};

type Props = {
    content: ReadonlyArray<FITBPreviewSegment>;
    // Optional width cap, to demonstrate reflow/wrapping at narrow sizes.
    maxWidth?: number;
    // Optional label to render inside each blank box (e.g. its number), given
    // the blank's 1-based position. Omit to render empty boxes (default).
    getBlankLabel?: (blankNumber: number) => React.ReactNode;
    // Optional inline style merged onto the root (e.g. to shrink font/line-height
    // when rendering a single segment as a compact choice tile).
    style?: React.CSSProperties;
};

export default function FillInTheBlankContentPreview({
    content,
    maxWidth,
    getBlankLabel,
    style,
}: Props): React.ReactElement {
    // The Renderer needs Perseus's translated strings. In Storybook/tests this
    // resolves to mockStrings via the context default; in the app it comes from
    // the surrounding PerseusI18nContextProvider.
    const {strings} = usePerseusI18n();
    let blankNumber = 0;
    return (
        <div
            className={styles.answerZone}
            style={{...(maxWidth != null ? {maxWidth} : {}), ...style}}
        >
            {content.map((segment) => {
                switch (segment.type) {
                    case "markdown":
                        // Pure markdown only — the Renderer never sees a blank.
                        return (
                            <Renderer
                                key={segment.id}
                                inline
                                content={segment.markdown}
                                strings={strings}
                            />
                        );
                    case "blank": {
                        blankNumber += 1;
                        const label = getBlankLabel?.(blankNumber);
                        // Fake, non-interactive placeholder. `aria-hidden` when
                        // empty because the real Blank component owns SR labelling.
                        const box = (
                            <span
                                className={styles.blank}
                                aria-hidden={label == null ? "true" : undefined}
                                data-blank-number={blankNumber}
                            >
                                {label == null ? null : (
                                    <span className={styles.blankLabel}>
                                        {label}
                                    </span>
                                )}
                            </span>
                        );
                        // A subscript/superscript blank (e.g. a coefficient or
                        // exponent slot) sits off the baseline.
                        if (segment.displayType === "superscript") {
                            return <sup key={segment.id}>{box}</sup>;
                        }
                        if (segment.displayType === "subscript") {
                            return <sub key={segment.id}>{box}</sub>;
                        }
                        return (
                            <React.Fragment key={segment.id}>
                                {box}
                            </React.Fragment>
                        );
                    }
                    case "image":
                        return (
                            <img
                                key={segment.id}
                                className={styles.tileImage}
                                src={segment.url}
                                alt={segment.alt}
                            />
                        );
                }
            })}
        </div>
    );
}
