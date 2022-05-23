// @flow
// TODO(davidflanagan):
// This should probably be converted to use import and to export
// and object that maps rule names to rules. Also, maybe this should
// be an auto-generated file with a script that updates it any time
// we add a new rule?

import AbsoluteUrl from "./absolute-url.js";
import BlockquotedMath from "./blockquoted-math.js";
import BlockquotedWidget from "./blockquoted-widget.js";
import DoubleSpacingAfterTerminal from "./double-spacing-after-terminal.js";
import ExtraContentSpacing from "./extra-content-spacing.js";
import HeadingLevel1 from "./heading-level-1.js";
import HeadingLevelSkip from "./heading-level-skip.js";
import HeadingSentenceCase from "./heading-sentence-case.js";
import HeadingTitleCase from "./heading-title-case.js";
import ImageAltText from "./image-alt-text.js";
import ImageInTable from "./image-in-table.js";
import ImageSpacesAroundUrls from "./image-spaces-around-urls.js";
import ImageWidget from "./image-widget.js";
import LinkClickHere from "./link-click-here.js";
import LongParagraph from "./long-paragraph.js";
import MathAdjacent from "./math-adjacent.js";
import MathAlignExtraBreak from "./math-align-extra-break.js";
import MathAlignLinebreaks from "./math-align-linebreaks.js";
import MathEmpty from "./math-empty.js";
import MathFontSize from "./math-font-size.js";
import MathFrac from "./math-frac.js";
import MathNested from "./math-nested.js";
import MathStartsWithSpace from "./math-starts-with-space.js";
import MathTextEmpty from "./math-text-empty.js";
import MathWithoutDollars from "./math-without-dollars.js";
import NestedLists from "./nested-lists.js";
import Profanity from "./profanity.js";
import TableMissingCells from "./table-missing-cells.js";
import UnbalancedCodeDelimiters from "./unbalanced-code-delimiters.js";
import UnescapedDollar from "./unescaped-dollar.js";
import WidgetInTable from "./widget-in-table.js";

export default [
    AbsoluteUrl,
    BlockquotedMath,
    BlockquotedWidget,
    DoubleSpacingAfterTerminal,
    ExtraContentSpacing,
    HeadingLevel1,
    HeadingLevelSkip,
    HeadingSentenceCase,
    HeadingTitleCase,
    ImageAltText,
    ImageInTable,
    LinkClickHere,
    LongParagraph,
    MathAdjacent,
    MathAlignExtraBreak,
    MathAlignLinebreaks,
    MathEmpty,
    MathFontSize,
    MathFrac,
    MathNested,
    MathStartsWithSpace,
    MathTextEmpty,
    NestedLists,
    TableMissingCells,
    UnescapedDollar,
    WidgetInTable,
    Profanity,
    MathWithoutDollars,
    UnbalancedCodeDelimiters,
    ImageSpacesAroundUrls,
    ImageWidget,
];
