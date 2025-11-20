// TODO(davidflanagan):
// This should probably be converted to use import and to export
// and object that maps rule names to rules. Also, maybe this should
// be an auto-generated file with a script that updates it any time
// we add a new rule?

import AbsoluteUrl from "./absolute-url";
import DoubleSpacingAfterTerminal from "./double-spacing-after-terminal";
import ExpressionWidget from "./expression-widget";
import ExpressionWidgetError from "./expression-widget-error";
import ExtraContentSpacing from "./extra-content-spacing";
import FreeResponseWidgetError from "./free-response-widget-error";
import HeadingLevel1 from "./heading-level-1";
import HeadingLevelSkip from "./heading-level-skip";
import HeadingSentenceCase from "./heading-sentence-case";
import HeadingTitleCase from "./heading-title-case";
import ImageAltText from "./image-alt-text";
import ImageInTable from "./image-in-table";
import ImageMarkdown from "./image-markdown";
import ImageSpacesAroundUrls from "./image-spaces-around-urls";
import ImageUrlEmpty from "./image-url-empty";
import ImageWidget from "./image-widget";
import InaccessibleWidget from "./inaccessible-widget";
import LinkClickHere from "./link-click-here";
import LongParagraph from "./long-paragraph";
import MatcherWidgetError from "./matcher-widget-error";
import MathAdjacent from "./math-adjacent";
import MathAlignExtraBreak from "./math-align-extra-break";
import MathAlignLinebreaks from "./math-align-linebreaks";
import MathEmpty from "./math-empty";
import MathFrac from "./math-frac";
import MathNested from "./math-nested";
import MathStartsWithSpace from "./math-starts-with-space";
import MathTextEmpty from "./math-text-empty";
import MathWithoutDollars from "./math-without-dollars";
import NestedLists from "./nested-lists";
import NumericInputWidgetError from "./numeric-input-widget-error";
import PhetSimulationWidgetError from "./phet-simulation-widget-error";
import RadioWidgetError from "./radio-widget-error";
import StaticWidgetInQuestionStem from "./static-widget-in-question-stem";
import TableMissingCells from "./table-missing-cells";
import UnbalancedCodeDelimiters from "./unbalanced-code-delimiters";
import UnescapedDollar from "./unescaped-dollar";
import WidgetInTable from "./widget-in-table";

export default [
    AbsoluteUrl,
    DoubleSpacingAfterTerminal,
    ImageUrlEmpty,
    ExpressionWidget,
    ExtraContentSpacing,
    HeadingLevel1,
    HeadingLevelSkip,
    HeadingSentenceCase,
    HeadingTitleCase,
    ImageAltText,
    ImageMarkdown,
    ImageInTable,
    LinkClickHere,
    LongParagraph,
    MathAdjacent,
    MathAlignExtraBreak,
    MathAlignLinebreaks,
    MathEmpty,
    MathFrac,
    MathNested,
    MathStartsWithSpace,
    MathTextEmpty,
    NestedLists,
    StaticWidgetInQuestionStem,
    TableMissingCells,
    UnescapedDollar,
    WidgetInTable,
    MathWithoutDollars,
    UnbalancedCodeDelimiters,
    ImageSpacesAroundUrls,
    ImageWidget,
    InaccessibleWidget,
    RadioWidgetError,
    ExpressionWidgetError,
    FreeResponseWidgetError,
    MatcherWidgetError,
    NumericInputWidgetError,
    PhetSimulationWidgetError,
];
