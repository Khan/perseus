// @flow
/**
 * NOTE(jeresig): This file is based on the following:
 * https://gist.github.com/aaronjensen/44251ed19c4b6635975925f3c7ca0463/87a317ddecb6885eefe6381bffa977922bd225f1
 *
 * It was then modified in a couple ways:
 *  1) The StyleDeclaration type was enforced on the input of create().
 *  2) The CSSProperties type was made strict to not allow any extra
 *     properties.
 *  3) Missing CSS properties were added to CSSProperties to support all
 *     the cases currently used in our stylesheets.
 */
 type _CSSProperties = {|
    alignContent?: any,
    alignItems?: any,
    alignSelf?: any,
    alignmentAdjust?: any,
    alignmentBaseline?: any,
    animationDelay?: any,
    animationDirection?: any,
    animationDuration?: any,
    animationFillMode?: any,
    animationIterationCount?: any,
    animationName?: any,
    animationPlayState?: any,
    animationTimingFunction?: any,
    appearance?: any,
    backfaceVisibility?: any,
    background?: any,
    backgroundAttachment?: "scroll" | "fixed" | "local",
    backgroundBlendMode?: any,
    backgroundClip?: any,
    backgroundColor?: any,
    backgroundComposite?: any,
    backgroundImage?: any,
    backgroundOrigin?: any,
    backgroundPosition?: any,
    backgroundRepeat?: any,
    baselineShift?: any,
    backgroundSize?: any,
    behavior?: any,
    border?: any,
    borderBottom?: any,
    borderBottomColor?: any,
    borderBottomLeftRadius?: any,
    borderBottomRightRadius?: any,
    borderBottomStyle?: any,
    borderBottomWidth?: any,
    borderCollapse?: any,
    borderColor?: any,
    borderCornerShape?: any,
    borderImageSource?: any,
    borderImageWidth?: any,
    borderLeft?: any,
    borderLeftColor?: any,
    borderLeftStyle?: any,
    borderLeftWidth?: any,
    borderRadius?: any,
    borderRight?: any,
    borderRightColor?: any,
    borderRightStyle?: any,
    borderRightWidth?: any,
    borderSpacing?: any,
    borderStyle?: any,
    borderTop?: any,
    borderTopColor?: any,
    borderTopLeftRadius?: any,
    borderTopRightRadius?: any,
    borderTopStyle?: any,
    borderTopWidth?: any,
    borderWidth?: any,
    bottom?: any,
    boxAlign?: any,
    boxDecorationBreak?: any,
    boxDirection?: any,
    boxLineProgression?: any,
    boxLines?: any,
    boxOrdinalGroup?: any,
    boxFlex?: number,
    boxFlexGroup?: number,
    boxShadow?: any,
    boxSizing?: any,
    breakAfter?: any,
    breakBefore?: any,
    breakInside?: any,
    clear?: any,
    clip?: any,
    clipRule?: any,
    color?: any,
    columnCount?: number,
    columnFill?: any,
    columnGap?: any,
    columnRule?: any,
    columnRuleColor?: any,
    columnRuleWidth?: any,
    columnSpan?: any,
    columnWidth?: any,
    columns?: any,
    content?: any,
    counterIncrement?: any,
    counterReset?: any,
    cue?: any,
    cueAfter?: any,
    cursor?: any,
    direction?: any,
    display?: any,
    fill?: any,
    fillOpacity?: number,
    fillRule?: any,
    filter?: any,
    flex?: number | string,
    flexAlign?: any,
    flexBasis?: any,
    flexDirection?: any,
    flexFlow?: any,
    flexGrow?: number,
    flexItemAlign?: any,
    flexLinePack?: any,
    flexOrder?: any,
    flexShrink?: number,
    flexWrap?: any,
    float?: any,
    flowFrom?: any,
    font?: any,
    fontFamily?: any,
    fontKerning?: any,
    fontSize?: number | string,
    fontSizeAdjust?: any,
    fontStretch?: any,
    fontStyle?: any,
    fontSynthesis?: any,
    fontVariant?: any,
    fontVariantAlternates?: any,
    fontWeight?: "normal" | "bold" | "lighter" | "bolder" | "inherit" | number,
    gridArea?: any,
    gridColumn?: any,
    gridColumnEnd?: any,
    gridColumnGap?: any,
    gridColumnStart?: any,
    gridRow?: any,
    gridRowEnd?: any,
    gridRowGap?: any,
    gridRowPosition?: any,
    gridRowSpan?: any,
    gridTemplateAreas?: any,
    gridTemplateColumns?: any,
    gridTemplateRows?: any,
    gridGap?: any,
    height?: any,
    hyphenateLimitChars?: any,
    hyphenateLimitLines?: any,
    hyphenateLimitZone?: any,
    hyphens?: any,
    imeMode?: any,
    justifyCenter?: any,
    justifyContent?: any,
    justifyItems?: any,
    layoutGrid?: any,
    layoutGridChar?: any,
    layoutGridLine?: any,
    layoutGridMode?: any,
    layoutGridType?: any,
    left?: any,
    letterSpacing?: any,
    lineBreak?: any,
    lineClamp?: number,
    lineHeight?: number | string,
    listStyle?: any,
    listStyleImage?: any,
    listStylePosition?: any,
    listStyleType?: any,
    margin?: any,
    marginBottom?: any,
    marginLeft?: any,
    marginRight?: any,
    marginTop?: any,
    marqueeDirection?: any,
    marqueeStyle?: any,
    mask?: any,
    maskBorder?: any,
    maskBorderRepeat?: any,
    maskBorderSlice?: any,
    maskBorderSource?: any,
    maskBorderWidth?: any,
    maskClip?: any,
    maskOrigin?: any,
    maxFontSize?: any,
    maxHeight?: any,
    maxWidth?: any,
    minHeight?: any,
    minWidth?: any,
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down",
    opacity?: number,
    order?: number,
    orphans?: number,
    outline?: any,
    outlineColor?: any,
    outlineOffset?: any,
    overflow?: any,
    overflowStyle?: any,
    overflowWrap?: any,
    overflowX?: any,
    overflowY?: any,
    padding?: any,
    paddingBottom?: any,
    paddingLeft?: any,
    paddingRight?: any,
    paddingTop?: any,
    pageBreakAfter?: any,
    pageBreakBefore?: any,
    pageBreakInside?: any,
    pause?: any,
    pauseAfter?: any,
    pauseBefore?: any,
    perspective?: any,
    perspectiveOrigin?: any,
    pointerEvents?: any,
    position?: any,
    punctuationTrim?: any,
    quotes?: any,
    regionFragment?: any,
    resize?: any,
    restAfter?: any,
    restBefore?: any,
    right?: any,
    rubyAlign?: any,
    rubyPosition?: any,
    shapeImageThreshold?: any,
    shapeInside?: any,
    shapeMargin?: any,
    shapeOutside?: any,
    speak?: any,
    speakAs?: any,
    stroke?: any,
    strokeOpacity?: number,
    strokeWidth?: number,
    tabSize?: any,
    tableLayout?: any,
    textAlign?: any,
    textAlignLast?: any,
    textDecoration?: any,
    textDecorationColor?: any,
    textDecorationLine?: any,
    textDecorationLineThrough?: any,
    textDecorationNone?: any,
    textDecorationOverline?: any,
    textDecorationSkip?: any,
    textDecorationStyle?: any,
    textDecorationUnderline?: any,
    textEmphasis?: any,
    textEmphasisColor?: any,
    textEmphasisStyle?: any,
    textHeight?: any,
    textIndent?: any,
    textJustifyTrim?: any,
    textKashidaSpace?: any,
    textLineThrough?: any,
    textLineThroughColor?: any,
    textLineThroughMode?: any,
    textLineThroughStyle?: any,
    textLineThroughWidth?: any,
    textOverflow?: any,
    textOverline?: any,
    textOverlineColor?: any,
    textOverlineMode?: any,
    textOverlineStyle?: any,
    textOverlineWidth?: any,
    textRendering?: any,
    textScript?: any,
    textShadow?: any,
    textTransform?: any,
    textUnderlinePosition?: any,
    textUnderlineStyle?: any,
    top?: any,
    touchAction?: any,
    transform?: any,
    transformOrigin?: any,
    transformOriginZ?: any,
    transformStyle?: any,
    transition?: any,
    transitionDelay?: any,
    transitionDuration?: any,
    transitionProperty?: any,
    transitionTimingFunction?: any,
    unicodeBidi?: any,
    unicodeRange?: any,
    userFocus?: any,
    userInput?: any,
    userSelect?: any,
    verticalAlign?: any,
    visibility?: any,
    voiceBalance?: any,
    voiceDuration?: any,
    voiceFamily?: any,
    voicePitch?: any,
    voiceRange?: any,
    voiceRate?: any,
    voiceStress?: any,
    voiceVolume?: any,
    whiteSpace?: any,
    whiteSpaceTreatment?: any,
    widows?: number,
    width?: any,
    willChange?: any,
    wordBreak?: any,
    wordSpacing?: any,
    wordWrap?: any,
    wrapFlow?: any,
    wrapMargin?: any,
    wrapOption?: any,
    writingMode?: any,
    zIndex?: "auto" | number,
    zoom?: "auto" | number,
    "-webkit-font-smoothing"?: string,
    "-moz-osx-font-smoothing"?: string,

    // NOTE(jeresig): What follows are all of the custom properties that we've
    // added to this file.

    // additional SVG properties
    strokeLinecap?: "butt" | "square" | "round",
    strokeLinejoin?: "bevel" | "round" | "fallback",
    strokeMiterlimit?: number,

    // Browser-specific properties that we allow
    // NOTE(jeresig): These should be removed once there is better browser
    // support and/or better support in Aphrodite.
    WebkitTapHighlightColor?: any,
    MozOsxFontSmoothing?: any,
    WebkitFontSmoothing?: any,
    WebkitBoxOrient?: string,
    WebkitLineClamp?: number,
    WebkitOverflowScrolling?: any,
    WebkitPrintColorAdjust?: any,
    msFlexPreferredSize?: number,
    MozAppearance?: any,
    WebkitAppearance?: any,
    MsFlexBasis?: any,
    MsFlexPreferredSize?: any,
    WebkitFlexBasis?: any,
    "::-ms-clear"?: _CSSProperties,
    "::-ms-expand"?: _CSSProperties,
    "::-webkit-scrollbar-thumb"?: _CSSProperties,
    "::-webkit-scrollbar"?: _CSSProperties,

    // States
    ":active"?: _CSSProperties,
    ":hover"?: _CSSProperties,
    ":focus"?: _CSSProperties,
    ":focus-within"?: _CSSProperties,
    ":link"?: _CSSProperties,
    ":visited"?: _CSSProperties,
    ":disabled"?: _CSSProperties,
    "::-moz-focus-inner"?: _CSSProperties,

    // Filters
    ":first-of-type"?: _CSSProperties,
    ":not(:first-of-type)"?: _CSSProperties,
    ":last-of-type"?: _CSSProperties,
    ":not(:last-of-type)"?: _CSSProperties,
    ":first-child"?: _CSSProperties,
    ":not(:first-child)"?: _CSSProperties,
    ":last-child"?: _CSSProperties,
    ":not(:last-child)"?: _CSSProperties,
    ":nth-of-type(odd)"?: _CSSProperties,

    // Contents
    ":first-letter"?: _CSSProperties,
    ":before"?: _CSSProperties,
    "::before"?: _CSSProperties,
    ":after"?: _CSSProperties,
    "::after"?: _CSSProperties,
    "::placeholder"?: _CSSProperties,

    // Media Queries
    // TODO(jeresig): We should make sure that these align with the queries
    // in media-queries.js (and delete all others)
    "@media"?: _CSSProperties,
    "@media (-webkit-min-device-pixel-ratio: 2.0)"?: _CSSProperties,
    "@media (max-width: 1023px)"?: _CSSProperties,
    "@media (max-width: 1024px)"?: _CSSProperties,
    "@media (max-width: 1144px)"?: _CSSProperties,
    "@media (max-width: 374px), (max-height: 351px)"?: _CSSProperties,
    "@media (max-width: 767px)"?: _CSSProperties,
    "@media (min-width: 768px)"?: _CSSProperties,
    "@media (min-width: 1024px)"?: _CSSProperties,
    "@media not all and (min-resolution:.001dpcm)"?: _CSSProperties,
    "@media screen and (max-height: 480px)"?: _CSSProperties,
    "@media screen and (max-height: 640px)"?: _CSSProperties,
    "@media screen and (max-height: 800px)"?: _CSSProperties,
    "@media screen and (max-width: 511px)"?: _CSSProperties,
    "@media screen and (max-width: 599px)"?: _CSSProperties,
    "@media screen and (min-color-index:0) and (-webkit-min-device-pixel-ratio:0)"?: _CSSProperties,
    "@media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0)"?: _CSSProperties,
    "@media print"?: _CSSProperties,
    "@media screen and (min-width: 511px)"?: _CSSProperties,
    "@media screen and (min-width: 600px)"?: _CSSProperties,

    // A media query from the WB Grid
    "@media (min-width: 1168px)"?: _CSSProperties,

    // Media query for high-contrast design solutions for edge
    "@media screen and (-ms-high-contrast: white-on-black)"?: _CSSProperties,
    "@media screen and (-ms-high-contrast: black-on-white)"?: _CSSProperties,
    "@media screen and (-ms-high-contrast: active)"?: _CSSProperties,

    // @rtl is a custom media query that allows us to target right-to-left language
    // versions of the product.
    "@rtl"?: _CSSProperties,

    // Hacks
    // NOTE(jeresig): All of these are hacks and abuses of Aphrodite and
    // should be removed.
    ":hover .chevron"?: _CSSProperties,
    ":hover span:first-child"?: _CSSProperties,

    // Aphrodite Internal
    _definition?: _CSSProperties,
|};

declare module "aphrodite" {
    /**
     * A CSS property definition.
     */
    declare type CSSProperties = _CSSProperties;

    /**
     * Aphrodite style declaration
     */
    declare type StyleDeclaration = {
        [key: string]: CSSProperties,
        ...
    };

    declare interface StyleSheetStatic {
        /**
         * Create style sheet
         */
        create<T: StyleDeclaration>(styles: T): T;
        /**
         * Rehydrate class names from server renderer
         */
        rehydrate(renderedClassNames: Array<string>): void;
    }

    declare var StyleSheet: StyleSheetStatic;

    /**
     * A style sheet as rendered during a `renderStatic` call.
     */
    declare type StaticRenderStyleSheet = {|
        /**
         * The style sheet as rendered during a `renderStatic` call.
         */
        content: string,
        /**
         * The names of classes generated during a `renderStatic` call.
         *
         * Pass this to `rehydrate` when rehydrating in the client.
         */
        renderedClassNames: Array<string>,
    |};

    declare type StaticRenderResult = {|
        /**
         * The result of the render function passed to `renderStatic`.
         */
        html: string,
        /**
         * The result of statically rendering the style sheet.
         */
        css: StaticRenderStyleSheet,
    |};

    declare interface StyleSheetServerStatic {
        /**
         * Render style sheet statically for given render function.
         */
        renderStatic(renderFunc: () => string): StaticRenderResult;
    }

    declare var StyleSheetServer: StyleSheetServerStatic;

    /**
     * Get class names from passed styles
     */
    declare function css(...styles: Array<any>): string;

    declare interface StyleSheetTestUtilsStatic {
        suppressStyleInjection(): void;
    }
    declare var StyleSheetTestUtils: StyleSheetTestUtilsStatic;
}
