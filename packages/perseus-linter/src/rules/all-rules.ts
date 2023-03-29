// TODO(davidflanagan):
// This should probably be converted to use import and to export
// and object that maps rule names to rules. Also, maybe this should
// be an auto-generated file with a script that updates it any time
// we add a new rule?

import AbsoluteUrl from "./absolute-url";
import BlockquotedMath from "./blockquoted-math";
import BlockquotedWidget from "./blockquoted-widget";
import DoubleSpacingAfterTerminal from "./double-spacing-after-terminal";
import ExtraContentSpacing from "./extra-content-spacing";
import HeadingLevel1 from "./heading-level-1";
import HeadingLevelSkip from "./heading-level-skip";
import HeadingSentenceCase from "./heading-sentence-case";
import HeadingTitleCase from "./heading-title-case";
import ImageAltText from "./image-alt-text";
import ImageInTable from "./image-in-table";
import ImageSpacesAroundUrls from "./image-spaces-around-urls";
import ImageWidget from "./image-widget";
import LinkClickHere from "./link-click-here";
import LongParagraph from "./long-paragraph";
import MathAdjacent from "./math-adjacent";
import MathAlignExtraBreak from "./math-align-extra-break";
import MathAlignLinebreaks from "./math-align-linebreaks";
import MathEmpty from "./math-empty";
import MathFontSize from "./math-font-size";
import MathFrac from "./math-frac";
import MathNested from "./math-nested";
import MathStartsWithSpace from "./math-starts-with-space";
import MathTextEmpty from "./math-text-empty";
import MathWithoutDollars from "./math-without-dollars";
import NestedLists from "./nested-lists";
import Profanity from "./profanity";
import TableMissingCells from "./table-missing-cells";
import UnbalancedCodeDelimiters from "./unbalanced-code-delimiters";
import UnescapedDollar from "./unescaped-dollar";
import WidgetInTable from "./widget-in-table";

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
