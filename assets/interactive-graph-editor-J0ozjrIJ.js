import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{U as ye}from"./util-_iDv4tVD.js";import{l as be,s as ke,e as Ke}from"./svg-image--maxZNcn.js";import{g as fe,f as ve,h as Ce,i as qe,j as Te,k as xe,n as Ae,o as Pe,q as Ne,r as $e,s as Be}from"./article-renderer-nb-Ygn5X.js";import{_ as A}from"./jquery-yG1GhClm.js";import"./phet-simulation-hVRVRfpl.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-ooj0_ZRv.js";import"./perseus-item-r8f_b4Ci.js";import"./hints-renderer-rFnohg-h.js";import{o as Xe,q as Ue}from"./renderer-AFQFCCCa.js";import"./base-radio-B-aOvhxE.js";import{c as Qe}from"./components-9-Pv2o0C.js";import{i as Ye}from"./constants-iPV6vHZm.js";import"./i18n-context-ei4f54eq.js";import{w as Le}from"./index-J2t_5nK1.js";import{i as p}from"./tiny-invariant-bHgPayXn.js";import"./index-smZ6iCr_.js";import{V as m}from"./index-CgfdZoMj.js";import{S as P,O as d}from"./answer-choices-HgSkCmGu.js";import{T as Ze,a as Je,C as G}from"./index-n_qhmlFr.js";import{s as o,c as g,f as $}from"./index-dmcq622U.js";import{a as Re,f as z,L as c,c as B,b as D}from"./index-6ID5EQ9c.js";import{l as f}from"./index-awljIyHI.js";import{r as I}from"./index-6oxdNXpR.js";import{H as X}from"./heading-ZiSKfWRf.js";import{S as h}from"./index-C1N8lBvx.js";import{L as T,I as en}from"./interactive-graph-settings-3bQHuskc.js";import{L as nn}from"./locked-figures-section-ixFBWhHb.js";import"./button-group-G5CZaedn.js";import"./graph-XirA6zBn.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-1hft2BpG.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-NBo1H9JC.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-T6lG2NEQ.js";import"./range-input-Gg2JKhNA.js";import"./text-input-uyhLZIJm.js";import"./text-list-editor-K49FGdd7.js";import{B as rn}from"./index-69t9pbsh.js";import{C as w,P as an}from"./locked-label-settings-Wi2joYZE.js";import{S as tn}from"./scrollless-number-text-field-9u0BIHxJ.js";const H="unlimited",Ie=r=>{const n=parseInt(r,10);return isNaN(n)||n===0?H:n},je=({numPoints:r=1,onChange:n})=>e.jsx(P,{selectedValue:`${r}`,onChange:a=>{n(Ie(a))},placeholder:"",style:on.singleSelectShort,children:[...[...Array(7).keys()].map(a=>e.jsx(d,{value:`${a}`,label:`${a} point${a>1?"s":""}`},a)),e.jsx(d,{value:H,label:"unlimited"},"unlimited")]}),on=f.StyleSheet.create({singleSelectShort:{height:26}});je.__docgenInfo={description:"",methods:[],displayName:"GraphPointsCountSelector",props:{numPoints:{required:!1,tsType:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(points: PointValue) => void",signature:{arguments:[{type:{name:"union",raw:"number | typeof UNLIMITED",elements:[{name:"number"},{name:"UNLIMITED"}]},name:"points"}],return:{name:"void"}}},description:""}}};const Se=r=>e.jsxs(P,{selectedValue:r.graphType,onChange:r.onChange,placeholder:"Select an answer type",style:ln.singleSelectShort,children:[r.showNoneOption&&e.jsx(d,{value:"none",label:"None"}),e.jsx(d,{value:"linear",label:"Linear function"}),e.jsx(d,{value:"quadratic",label:"Quadratic function"}),e.jsx(d,{value:"sinusoid",label:"Sinusoid function"}),e.jsx(d,{value:"circle",label:"Circle"}),e.jsx(d,{value:"point",label:"Point(s)"}),e.jsx(d,{value:"linear-system",label:"Linear System"}),e.jsx(d,{value:"polygon",label:"Polygon"}),e.jsx(d,{value:"segment",label:"Line Segment(s)"}),e.jsx(d,{value:"ray",label:"Ray"}),e.jsx(d,{value:"angle",label:"Angle"})]}),ln=f.StyleSheet.create({singleSelectShort:{height:26}});Se.__docgenInfo={description:"",methods:[],displayName:"GraphTypeSelector",props:{graphType:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(newGraphType: string) => void",signature:{arguments:[{type:{name:"string"},name:"newGraphType"}],return:{name:"void"}}},description:""},showNoneOption:{required:!0,tsType:{name:"boolean"},description:""}}};function Oe(r){return e.jsxs(e.Fragment,{children:[e.jsx(X,{title:"Correct Answer",isOpen:!0,isCollapsible:!1}),e.jsxs(m,{children:[e.jsxs(m,{children:[e.jsx(Re,{style:{paddingTop:o.xxSmall_6,paddingBottom:o.xxSmall_6,color:g.offBlack64},children:"Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer."}),e.jsx(z,{style:{fontSize:12,backgroundColor:"#eee",paddingInline:o.xxSmall_6,borderColor:"#ccc",borderStyle:"solid",borderWidth:1},children:r.equationString})]}),r.children]})]})}Oe.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphCorrectAnswer",props:{equationString:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function Fe(r){const{ariaLabelValue:n,ariaDescriptionValue:a,onChange:t}=r,[l,u]=I.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(X,{title:"Description",isCollapsible:!0,isOpen:l,onToggle:u}),l&&e.jsxs(m,{children:[e.jsx(Re,{style:_.caption,children:"Use these fields to describe the graph as a whole. These are used by screen readers to describe content to users who may be visually impaired."}),e.jsxs(c,{tag:"label",children:["Title",e.jsx(Ze,{value:n,onChange:s=>t({fullGraphAriaLabel:s||void 0}),style:_.spaceAbove})]}),e.jsx(h,{size:o.small_12}),e.jsxs(c,{tag:"label",children:["Description",e.jsx(Je,{rows:8,resizeType:"vertical",value:a,onChange:s=>t({fullGraphAriaDescription:s||void 0}),style:_.spaceAbove})]})]})]})}const _=f.StyleSheet.create({caption:{color:g.offBlack64,paddingTop:o.xxSmall_6,paddingBottom:o.xxSmall_6},spaceAbove:{marginTop:o.xxxSmall_4}});Fe.__docgenInfo={description:"",methods:[],displayName:"InteractiveGraphDescription",props:{ariaLabelValue:{required:!0,tsType:{name:"string"},description:""},ariaDescriptionValue:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(graphProps: Partial<EditorProps>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * The range of the graph in the x and y directions.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: string | boolean;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["graph"];
    onChange: (props: Partial<Props>) => void;
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,elements:[{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}`,signature:{properties:[{key:"isArticle",value:{name:"boolean",required:!1}},{key:"onFocusChange",value:{name:"signature",type:"function",raw:`(
    newFocusPath: FocusPath,
    oldFocusPath: FocusPath,
    keypadHeight?: number,
    focusedElement?: HTMLElement,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
answered correctly and should no longer be interactive.`},{key:"answerableCallback",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1}},{key:"getAnotherHint",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!1}},{key:"interactionCallback",value:{name:"signature",type:"function",raw:"(widgetData: {[widgetId: string]: any}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{[widgetId: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"widgetData"}],return:{name:"void"}},required:!1}},{key:"groupAnnotator",value:{name:"signature",type:"function",raw:"(groupNumber: number, widgetId: string) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"groupNumber"},{type:{name:"string"},name:"widgetId"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`A function that takes in the relative problem number (starts at
0 and is incremented for each group widget), and the ID of the
group widget, then returns a react component that will be added
immediately above the renderer in the group widget. If the
function returns null, no annotation will be added.`},{key:"imagePlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If imagePlaceholder is set, Perseus will render the placeholder instead
of the image node.`},{key:"widgetPlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If widgetPlaceholder is set, Perseus will render the placeholder instead
of the widget node.`},{key:"baseElements",value:{name:"signature",type:"object",raw:`{
    /**
     * The <Link /> component provided here must adhere to the same
     * interface as React's base <a /> component.
     */
    Link: React.ComponentType<any>;
}`,signature:{properties:[{key:"Link",value:{name:"ReactComponentType",raw:"React.ComponentType<any>",elements:[{name:"any"}],required:!0},description:`The <Link /> component provided here must adhere to the same
interface as React's base <a /> component.`}]},required:!1},description:`Base React elements that can be used in place of the standard DOM
DOM elements. For example, when provided, <Link /> will be used
in place of <a />. This allows clients to provide pre-styled
components or components with custom behavior.`},{key:"imagePreloader",value:{name:"signature",type:"function",raw:"(dimensions: Dimensions) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]}},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
to display while an image is loading.`},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(args: TrackInteractionArgs) => void",signature:{arguments:[{type:{name:"intersection",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
} & Partial<TrackingGradedGroupExtraArguments> &
    Partial<TrackingSequenceExtraArguments>`,elements:[{name:"signature",type:"object",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!1}}]}},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    status: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]}}],raw:"Partial<TrackingGradedGroupExtraArguments>"},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    visible: number;
}`,signature:{properties:[{key:"visible",value:{name:"number",required:!0}}]}}],raw:"Partial<TrackingSequenceExtraArguments>"}]},name:"args"}],return:{name:"void"}},required:!1},description:`A function that is called when the user has interacted with a widget. It
also includes any extra parameters that the originating widget provided.
This is used for keeping track of widget interactions.`},{key:"customKeypad",value:{name:"boolean",required:!1},description:`A boolean that indicates whether or not a custom keypad is
being used.  For mobile web this will be the ProvidedKeypad
component.  In this situation we use the MathInput component
from the math-input repo instead of the existing perseus math
input components.`},{key:"nativeKeypadProxy",value:{name:"signature",type:"function",raw:"(blur: () => void) => KeypadAPI",signature:{arguments:[{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"blur"}],return:{name:"KeypadAPI"}},required:!1},description:`If this is provided, it is called instead of appending an instance
of \`math-input\`'s keypad to the body. This is used by the native
apps so they can have the keypad be defined on the native side.
It is called with an function that, when called, blurs the input,
and is expected to return an object of the shape
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"crossOutEnabled",value:{name:"boolean",required:!1},description:`Whether to enable the cross-out feature on multiple-choice radio
widgets. This allows users to note which answers they believe to
be incorrect, to find the answer by process of elimination.

We plan to roll this out to all call sites eventually, but for
now we have this flag, to add it to Generalized Test Prep first.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"signature",type:"object",raw:`{
    /**
     * Flags related to the interactive-graph Mafs migration.
     *
     * Add values to the relevant array to create new flags.
     */
    mafs?:
        | false
        | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
              [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
          });
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:`| false
| ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
      [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
  })`,elements:[{name:"literal",value:"false"},{name:"unknown"}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.`}]}}],raw:`Readonly<{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"GroupMetadataEditor",value:{name:"NonNullable",elements:[{name:'Readonly["GroupMetadataEditor"]',raw:'APIOptions["GroupMetadataEditor"]'}],raw:'NonNullable<APIOptions["GroupMetadataEditor"]>',required:!0}},{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>`,required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<EditorProps>"},name:"graphProps"}],return:{name:"void"}}},description:""}}};const Ee=({numSegments:r=1,onChange:n})=>e.jsx(P,{selectedValue:`${r}`,placeholder:"",onChange:a=>{const t=+a;n(t)},style:sn.singleSelectShort,children:A.range(1,7).map(a=>e.jsx(d,{value:`${a}`,label:`${a} segment${a>1?"s":""}`},a))},"segment-select"),sn=f.StyleSheet.create({singleSelectShort:{height:26}});Ee.__docgenInfo={description:"",methods:[],displayName:"SegmentCountSelector",props:{numSegments:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(numSegments: number) => void",signature:{arguments:[{type:{name:"number"},name:"numSegments"}],return:{name:"void"}}},description:""}}};const un=""+new URL("arrow-counter-clockwise-bold-Zg1fUITb.svg",import.meta.url).href;function mn(r){if("startCoords"in r)return r.startCoords}function dn(r,n,a){switch(r.type){case"linear":case"ray":return Ne({...r,startCoords:void 0},n,a);case"segment":return Pe({...r,startCoords:void 0},n,a);case"linear-system":return Ae({...r,startCoords:void 0},n,a);case"circle":const t=xe({...r,startCoords:void 0}),l=be(ke(t.radiusPoint,t.center));return{center:t.center,radius:l};case"sinusoid":return Te({...r,startCoords:void 0},n,a);case"quadratic":return qe({...r,startCoords:void 0},n,a);case"point":return Ce({...r,startCoords:void 0},n,a);case"polygon":return ve({...r,startCoords:void 0},n,a);case"angle":return fe({graph:{...r,startCoords:void 0},range:n,step:a});default:return}}const pn=r=>{const n=r[0],a=r[1],t=a[1]-n[1],l=Math.PI/(2*(a[0]-n[0])),u=n[0]*l,s=n[1];return"y = "+t.toFixed(3)+"sin("+l.toFixed(3)+"x - "+u.toFixed(3)+") + "+s.toFixed(3)},cn=r=>{const n=r[0],a=r[1],t=r[2],l=(n[0]-a[0])*(n[0]-t[0])*(a[0]-t[0]);if(l===0)return"Division by zero error";const u=(t[0]*(a[1]-n[1])+a[0]*(n[1]-t[1])+n[0]*(t[1]-a[1]))/l,s=(t[0]*t[0]*(n[1]-a[1])+a[0]*a[0]*(t[1]-n[1])+n[0]*n[0]*(a[1]-t[1]))/l,C=(a[0]*t[0]*(a[0]-t[0])*n[1]+t[0]*n[0]*(t[0]-n[0])*a[1]+n[0]*a[0]*(n[0]-a[0])*t[1])/l;return"y = "+u.toFixed(3)+"x^2 + "+s.toFixed(3)+"x + "+C.toFixed(3)},hn=(r,n=!1)=>{const a=r[1];return`${$e(r,n).toFixed(0)}° angle at (${a[0]}, ${a[1]})`},yn=(r,n)=>{if(n)return!1;switch(r.type){case"point":return r.numPoints!=="unlimited";case"polygon":return r.numSides!=="unlimited"&&r.snapTo!=="angles"&&r.snapTo!=="sides";case"none":return!1;case"angle":case"circle":case"linear":case"linear-system":case"quadratic":case"ray":case"segment":case"sinusoid":return!0;default:throw new Le(r)}},Ge=r=>{const{startCoords:n,allowReflexAngles:a,onChange:t}=r;return e.jsxs(e.Fragment,{children:[e.jsxs(m,{style:N.equationSection,children:[e.jsx(B,{children:"Starting equation:"}),e.jsx(z,{style:N.equationBody,children:hn(n,a)})]}),e.jsxs(m,{style:N.tile,children:[e.jsx(c,{children:"Point 1:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[0],labels:["x","y"],onChange:l=>t([l,n[1],n[2]])})]}),e.jsxs(m,{style:N.tile,children:[e.jsx(c,{children:"Vertex:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[1],labels:["x","y"],onChange:l=>t([n[0],l,n[2]])})]}),e.jsxs(m,{style:N.tile,children:[e.jsx(c,{children:"Point 2:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[2],labels:["x","y"],onChange:l=>t([n[0],n[1],l])})]})]})},N=f.StyleSheet.create({tile:{backgroundColor:g.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:o.small_12},equationBody:{backgroundColor:g.fadedOffBlack8,border:`1px solid ${g.fadedOffBlack32}`,marginTop:o.xSmall_8,paddingLeft:o.xSmall_8,paddingRight:o.xSmall_8,fontSize:$.size.xSmall}});Ge.__docgenInfo={description:"",methods:[],displayName:"StartCoordsAngle",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: AngleCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const De=r=>{const{startCoords:n,onChange:a}=r,[t,l]=I.useState(n.radius.toString());I.useEffect(()=>{l(n.radius.toString())},[n.radius]);function u(s){l(s),!(isNaN(+s)||s===""||+s==0)&&a({center:n.center,radius:parseFloat(s)})}return e.jsxs(m,{style:M.tile,children:[e.jsxs(m,{style:M.row,children:[e.jsx(c,{children:"Center:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n.center,labels:["x","y"],onChange:s=>a({center:s,radius:n.radius})})]}),e.jsx(h,{size:o.small_12}),e.jsxs(c,{tag:"label",style:M.row,children:["Radius:",e.jsx(h,{size:o.small_12}),e.jsx(tn,{value:t,onChange:u,style:M.textField})]})]})},M=f.StyleSheet.create({tile:{backgroundColor:g.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8},row:{display:"flex",flexDirection:"row",alignItems:"center"},textField:{width:o.xxxLarge_64}});De.__docgenInfo={description:"",methods:[],displayName:"StartCoordsCircle",props:{startCoords:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CircleCoords) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]}},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Me=r=>{const{startCoords:n,onChange:a}=r;return e.jsxs(e.Fragment,{children:[e.jsxs(m,{style:ge.tile,children:[e.jsx(c,{children:"Point 1:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[0],labels:["x","y"],onChange:t=>a([t,n[1]])})]}),e.jsxs(m,{style:ge.tile,children:[e.jsx(c,{children:"Point 2:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[1],labels:["x","y"],onChange:t=>a([n[0],t])})]})]})},ge=f.StyleSheet.create({tile:{backgroundColor:g.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"}});Me.__docgenInfo={description:"",methods:[],displayName:"StartCoordsLine",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const Ve=r=>{const{startCoords:n,type:a,onChange:t}=r,l=a==="segment"?"Segment":"Line";return e.jsx(e.Fragment,{children:n.map((u,s)=>e.jsxs(an,{header:e.jsx(c,{children:`${l} ${s+1}`}),expanded:!0,children:[e.jsxs(m,{style:we.nestedTile,children:[e.jsx(c,{children:"Point 1:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:u[0],labels:["x","y"],onChange:C=>{const k=[...n];k[s]=[C,u[1]],t(k)}})]}),e.jsxs(m,{style:we.nestedTile,children:[e.jsx(c,{children:"Point 2:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:u[1],labels:["x","y"],onChange:C=>{const k=[...n];k[s]=[u[0],C],t(k)}})]})]},`segment-${s}-start-coords`))})},we=f.StyleSheet.create({nestedTile:{paddingBottom:o.small_12,flexDirection:"row",alignItems:"center"}});Ve.__docgenInfo={description:"",methods:[],displayName:"StartCoordsMultiline",props:{type:{required:!0,tsType:{name:"union",raw:'"linear-system" | "segment"',elements:[{name:"literal",value:'"linear-system"'},{name:"literal",value:'"segment"'}]},description:""},startCoords:{required:!0,tsType:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: CollinearTuple[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],raw:"CollinearTuple[]"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const We=r=>{const{startCoords:n,onChange:a}=r;return e.jsx(e.Fragment,{children:n.map((t,l)=>e.jsxs(m,{style:gn.tile,children:[e.jsx(c,{children:`Point ${l+1}:`}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:t,labels:["x","y"],onChange:u=>{const s=[...n];s[l]=u,a(s)}})]},l))})},gn=f.StyleSheet.create({tile:{backgroundColor:g.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"}});We.__docgenInfo={description:"",methods:[],displayName:"StartCoordsPoint",props:{startCoords:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"ReadonlyArray<Coord>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: ReadonlyArray<Coord>) => void",signature:{arguments:[{type:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],raw:"ReadonlyArray<Coord>"},name:"startCoords"}],return:{name:"void"}}},description:""}}};const ze=r=>{const{startCoords:n,onChange:a}=r;return e.jsxs(e.Fragment,{children:[e.jsxs(m,{style:L.equationSection,children:[e.jsx(B,{children:"Starting equation:"}),e.jsx(z,{style:L.equationBody,children:cn(n)})]}),e.jsxs(m,{style:L.tile,children:[e.jsx(c,{children:"Point 1:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[0],labels:["x","y"],onChange:t=>a([t,n[1],n[2]])})]}),e.jsxs(m,{style:L.tile,children:[e.jsx(c,{children:"Point 2:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[1],labels:["x","y"],onChange:t=>a([n[0],t,n[2]])})]}),e.jsxs(m,{style:L.tile,children:[e.jsx(c,{children:"Point 3:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[2],labels:["x","y"],onChange:t=>a([n[0],n[1],t])})]})]})},L=f.StyleSheet.create({tile:{backgroundColor:g.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:o.small_12},equationBody:{backgroundColor:g.fadedOffBlack8,border:`1px solid ${g.fadedOffBlack32}`,marginTop:o.xSmall_8,paddingLeft:o.xSmall_8,paddingRight:o.xSmall_8,fontSize:$.size.xSmall}});ze.__docgenInfo={description:"",methods:[],displayName:"StartCoordsQuadratic",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: [Coord, Coord, Coord]) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const _e=r=>{const{startCoords:n,onChange:a}=r;return e.jsxs(e.Fragment,{children:[e.jsxs(m,{style:V.equationSection,children:[e.jsx(B,{children:"Starting equation:"}),e.jsx(z,{style:V.equationBody,children:pn(n)})]}),e.jsxs(m,{style:V.tile,children:[e.jsx(c,{children:"Point 1:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[0],labels:["x","y"],onChange:t=>a([t,n[1]])})]}),e.jsxs(m,{style:V.tile,children:[e.jsx(c,{children:"Point 2:"}),e.jsx(h,{size:o.small_12}),e.jsx(w,{coord:n[1],labels:["x","y"],onChange:t=>a([n[0],t])})]})]})},V=f.StyleSheet.create({tile:{backgroundColor:g.fadedBlue8,marginTop:o.xSmall_8,padding:o.small_12,borderRadius:o.xSmall_8,flexDirection:"row",alignItems:"center"},equationSection:{marginTop:o.small_12},equationBody:{backgroundColor:g.fadedOffBlack8,border:`1px solid ${g.fadedOffBlack32}`,marginTop:o.xSmall_8,paddingLeft:o.xSmall_8,paddingRight:o.xSmall_8,fontSize:$.size.xSmall}});_e.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSinusoid",props:{startCoords:{required:!0,tsType:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: SinusoidCoords) => void",signature:{arguments:[{type:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}]},name:"startCoords"}],return:{name:"void"}}},description:""}}};const wn=r=>{const{type:n,range:a,step:t,allowReflexAngles:l,onChange:u}=r;switch(n){case"linear":case"ray":const s=Ne(r,a,t);return e.jsx(Me,{startCoords:s,onChange:u});case"linear-system":case"segment":const C=n==="segment"?Pe(r,a,t):Ae(r,a,t);return e.jsx(Ve,{type:n,startCoords:C,onChange:u});case"circle":const k=xe(r),j=be(ke(k.radiusPoint,k.center));return e.jsx(De,{startCoords:{center:k.center,radius:j},onChange:u});case"sinusoid":const S=Te(r,a,t);return e.jsx(_e,{startCoords:S,onChange:u});case"quadratic":const O=qe(r,a,t);return e.jsx(ze,{startCoords:O,onChange:u});case"point":case"polygon":const F=n==="point"?Ce(r,a,t):ve(r,a,t);return e.jsx(We,{startCoords:F,onChange:u});case"angle":const E=fe({graph:r,range:a,step:t});return e.jsx(Ge,{startCoords:E,allowReflexAngles:l,onChange:u});default:return null}},He=r=>{const{range:n,step:a,onChange:t}=r,[l,u]=I.useState(!0);return e.jsxs(m,{children:[e.jsx(X,{isCollapsible:!0,title:"Start coordinates",isOpen:l,onToggle:()=>u(!l)}),l&&e.jsxs(e.Fragment,{children:[e.jsx(wn,{...r}),e.jsx(h,{size:o.small_12}),e.jsx(rn,{startIcon:un,kind:"tertiary",size:"small",onClick:()=>{t(dn(r,n,a))},children:"Use default start coordinates"})]})]})};He.__docgenInfo={description:"",methods:[],displayName:"StartCoordsSettings",props:{range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},allowReflexAngles:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(startCoords: StartCoords) => void",signature:{arguments:[{type:{name:'Extract["startCoords"]',raw:`Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"]`},name:"startCoords"}],return:{name:"void"}}},description:""}}};const{InfoTip:x}=Qe,R=Be.widget,bn={url:null},kn=A.map(A.range(3,13),function(r){return e.jsx(d,{value:`${r}`,label:`${r} sides`},`polygon-sides-${r}`)}),W=class W extends I.Component{constructor(){super(...arguments),this.displayName="InteractiveGraphEditor",this.className="perseus-widget-interactive-graph",this.changeStartCoords=n=>{var t;if(!((t=this.props.graph)!=null&&t.type))return;const a={...this.props.graph,startCoords:n};this.props.onChange({graph:a})},this.getSaveWarnings=()=>{var a;const n=[];for(const t of this.props.lockedFigures??[])t.type==="line"&&Ke(t.points[0].coord,t.points[1].coord)&&n.push("The line cannot have length 0.");return((a=this.props.graph)==null?void 0:a.type)==="polygon"&&this.props.graph.numSides==="unlimited"&&this.props.graph.coords===null&&n.push("Polygon must be closed."),n}}serialize(){const n=A.pick(this.props,"step","backgroundImage","markings","labels","showProtractor","showTooltips","range","gridStep","snapStep","lockedFigures","fullGraphAriaLabel","fullGraphAriaDescription"),a=this.refs.graph;if(a){const t=a&&a.getUserInput();A.extend(n,{graph:{type:t.type,startCoords:this.props.graph&&mn(this.props.graph)},correct:t}),A.each(["allowReflexAngles","angleOffsetDeg","numPoints","numSides","numSegments","showAngles","showSides","snapTo","snapDegrees"],function(l){A.has(t,l)&&(n.graph[l]=t[l])})}return n}render(){var s,C,k,j,S,O,F,E,U,Q,Y,Z,J,ee,ne,re,ae,te,oe,le,ie,se,ue,me,de,pe,ce,he;let n,a;const t=this.props.gridStep||ye.getGridStep(this.props.range,this.props.step,Ye.defaultBoxSize),l=this.props.snapStep||ye.snapStepFromGridStep(t),u=Ue.SMALL;if(this.props.valid===!0){const i=this.props.correct,y={ref:"graph",box:this.props.box,range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:t,snapStep:l,graph:i,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,lockedFigures:this.props.lockedFigures,fullGraphAriaLabel:this.props.fullGraphAriaLabel,fullGraphAriaDescription:this.props.fullGraphAriaDescription,trackInteraction:function(){},onChange:({graph:b})=>{let v=this.props.correct;p(b!=null),v.type===b.type?v=fn(v,b):v=b,this.props.onChange({correct:v,graph:this.props.graph})}};n=e.jsx(R,{...y,containerSizeClass:u,apiOptions:{...this.props.apiOptions,isMobile:!1}}),a=R.getEquationString(y)}else n=e.jsx("div",{className:"perseus-error",children:this.props.valid});return e.jsxs(m,{children:[e.jsx(T,{label:"Answer type:",children:e.jsx(Se,{graphType:((s=this.props.graph)==null?void 0:s.type)??R.defaultProps.graph.type,onChange:i=>{this.props.onChange({graph:{type:i},correct:{type:i}})},showNoneOption:(j=(k=(C=this.props.apiOptions)==null?void 0:C.flags)==null?void 0:k.mafs)==null?void 0:j.none})}),this.props.graph&&((F=(O=(S=this.props.apiOptions)==null?void 0:S.flags)==null?void 0:O.mafs)==null?void 0:F[this.props.graph.type])&&e.jsx(Fe,{ariaLabelValue:this.props.fullGraphAriaLabel??"",ariaDescriptionValue:this.props.fullGraphAriaDescription??"",onChange:this.props.onChange}),e.jsx(Oe,{equationString:a,children:n}),((E=this.props.correct)==null?void 0:E.type)==="point"&&e.jsx(T,{label:"Number of Points:",children:e.jsx(je,{numPoints:(U=this.props.correct)==null?void 0:U.numPoints,onChange:i=>{this.props.onChange({correct:{type:"point",numPoints:i},graph:{type:"point",numPoints:i}})}})}),((Q=this.props.correct)==null?void 0:Q.type)==="angle"&&e.jsxs(e.Fragment,{children:[e.jsxs(m,{style:q.row,children:[e.jsx(G,{label:e.jsx(D,{children:"Show angle measures"}),checked:!!((Y=this.props.correct)!=null&&Y.showAngles),onChange:i=>{var y;((y=this.props.graph)==null?void 0:y.type)==="angle"&&(p(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:i},graph:{...this.props.graph,showAngles:i}}))}}),e.jsx(x,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(m,{style:q.row,children:[e.jsx(G,{label:e.jsx(D,{children:"Allow reflex angles"}),checked:!!((Z=this.props.correct)!=null&&Z.allowReflexAngles),onChange:i=>{var b,v;p(this.props.correct.type==="angle",`Expected graph type to be angle, but got ${this.props.correct.type}`),p(((b=this.props.graph)==null?void 0:b.type)==="angle",`Expected graph type to be angle, but got ${(v=this.props.graph)==null?void 0:v.type}`);const y={allowReflexAngles:i};this.props.onChange({correct:{...this.props.correct,...y},graph:{...this.props.graph,...y}})}}),e.jsx(x,{children:e.jsx("p",{children:"Allow students to be able to create reflex angles."})})]})]}),((J=this.props.correct)==null?void 0:J.type)==="polygon"&&e.jsxs(e.Fragment,{children:[e.jsx(T,{label:"Number of sides:",children:e.jsx(P,{selectedValue:(ee=this.props.correct)!=null&&ee.numSides?`${this.props.correct.numSides}`:"3",placeholder:"",onChange:i=>{var b;p(((b=this.props.graph)==null?void 0:b.type)==="polygon");const y={numSides:Ie(i),coords:null,snapTo:"grid"};this.props.onChange({correct:{...this.props.correct,...y},graph:{...this.props.graph,...y}})},style:q.singleSelectShort,children:[...kn,e.jsx(d,{value:"unlimited",label:"unlimited sides"},"unlimited")]},"polygon-select")}),e.jsxs(T,{label:"Snap to:",children:[e.jsxs(P,{selectedValue:((ne=this.props.correct)==null?void 0:ne.snapTo)||"grid",placeholder:"",onChange:i=>{var b,v;p(this.props.correct.type==="polygon",`Expected correct answer type to be polygon, but got ${this.props.correct.type}`),p(((b=this.props.graph)==null?void 0:b.type)==="polygon",`Expected graph type to be polygon, but got ${(v=this.props.graph)==null?void 0:v.type}`);const y={snapTo:i,coords:null};this.props.onChange({correct:{...this.props.correct,...y},graph:{...this.props.graph,...y}})},style:q.singleSelectShort,children:[e.jsx(d,{value:"grid",label:"grid"}),((re=this.props.correct)==null?void 0:re.numSides)!=="unlimited"&&e.jsx(d,{value:"angles",label:"interior angles"}),((ae=this.props.correct)==null?void 0:ae.numSides)!=="unlimited"&&e.jsx(d,{value:"sides",label:"side measures"})]}),e.jsxs(x,{children:[e.jsx("p",{children:"These options affect the movement of the vertex points. The grid option will guide the points to the nearest half step along the grid."}),e.jsx("p",{children:"The interior angle and side measure options guide the points to the nearest whole angle or side measure respectively."})]})]}),e.jsxs(m,{style:q.row,children:[e.jsx(G,{label:e.jsx(D,{children:"Show angle measures"}),checked:!!((te=this.props.correct)!=null&&te.showAngles),onChange:()=>{var i;((i=this.props.graph)==null?void 0:i.type)==="polygon"&&(p(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`),this.props.onChange({correct:{...this.props.correct,showAngles:!this.props.correct.showAngles},graph:{...this.props.graph,showAngles:!this.props.graph.showAngles}}))}}),e.jsx(x,{children:e.jsx("p",{children:"Displays the interior angle measures."})})]}),e.jsxs(m,{style:q.row,children:[e.jsx(G,{label:e.jsx(D,{children:"Show side measures"}),checked:!!((oe=this.props.correct)!=null&&oe.showSides),onChange:()=>{var i;((i=this.props.graph)==null?void 0:i.type)==="polygon"&&this.props.correct.type==="polygon"&&this.props.onChange({correct:{...this.props.correct,showSides:!this.props.correct.showSides},graph:{...this.props.graph,showSides:!this.props.graph.showSides}})}}),e.jsx(x,{children:e.jsx("p",{children:"Displays the side lengths."})})]})]}),((le=this.props.correct)==null?void 0:le.type)==="segment"&&e.jsx(T,{label:"Number of segments:",children:e.jsx(Ee,{numSegments:(ie=this.props.correct)==null?void 0:ie.numSegments,onChange:i=>{this.props.onChange({correct:{type:"segment",numSegments:i,coords:null},graph:{type:"segment",numSegments:i}})}})}),((se=this.props.graph)==null?void 0:se.type)&&yn(this.props.graph,this.props.static)&&e.jsx(He,{...this.props.graph,range:this.props.range,step:this.props.step,onChange:this.changeStartCoords}),e.jsx(en,{box:Xe(u),range:this.props.range,labels:this.props.labels,step:this.props.step,gridStep:t,snapStep:l,valid:this.props.valid,backgroundImage:this.props.backgroundImage,markings:this.props.markings,showProtractor:this.props.showProtractor,showTooltips:this.props.showTooltips,onChange:this.props.onChange}),this.props.correct.type==="polygon"&&e.jsxs(T,{label:"Student answer must",children:[e.jsxs(P,{selectedValue:this.props.correct.match||"exact",onChange:i=>{p(this.props.correct.type==="polygon",`Expected graph type to be polygon, but got ${this.props.correct.type}`);const y={...this.props.correct,match:i};this.props.onChange({correct:y})},placeholder:"",style:q.singleSelectShort,children:[e.jsx(d,{value:"exact",label:"match exactly"}),e.jsx(d,{value:"congruent",label:"be congruent"}),e.jsx(d,{value:"approx",label:"be approximately congruent"}),e.jsx(d,{value:"similar",label:"be similar"})]}),e.jsx(x,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Match Exactly:"})," Match exactly in size, orientation, and location on the grid even if it is not shown in the background."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Congruent:"})," Be congruent in size and shape, but can be located anywhere on the grid."]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Approximately Congruent:"})," Be exactly similar, and congruent in size and shape to within 0.1 units, but can be located anywhere on the grid."," ",e.jsx("em",{children:"Use this with snapping to angle measure."})]})}),e.jsx("li",{children:e.jsxs("p",{children:[e.jsx("b",{children:"Be Similar:"})," Be similar with matching interior angles, and side measures that are matching or a multiple of the correct side measures. The figure can be located anywhere on the grid."]})})]})})]}),this.props.correct.type==="angle"&&e.jsxs(T,{label:"Student answer must",children:[e.jsxs(P,{selectedValue:this.props.correct.match||"exact",onChange:i=>{this.props.onChange({correct:{...this.props.correct,match:i}})},placeholder:"",style:q.singleSelectShort,children:[e.jsx(d,{value:"exact",label:"match exactly"}),e.jsx(d,{value:"congruent",label:"be congruent"})]}),e.jsx(x,{children:e.jsx("p",{children:"Congruency requires only that the angle measures are the same. An exact match implies congruency, but also requires that the angles have the same orientation and that the vertices are in the same position."})})]}),this.props.graph&&((de=(me=(ue=this.props.apiOptions)==null?void 0:ue.flags)==null?void 0:me.mafs)==null?void 0:de[this.props.graph.type])&&e.jsx(nn,{flags:this.props.apiOptions.flags,showLabelsFlag:(he=(ce=(pe=this.props.apiOptions)==null?void 0:pe.flags)==null?void 0:ce.mafs)==null?void 0:he["interactive-graph-locked-features-labels"],figures:this.props.lockedFigures,onChange:this.props.onChange})]})}};W.widgetName="interactive-graph",W.defaultProps={...R.defaultProps,valid:!0,backgroundImage:bn,showTooltips:!1,correct:{type:R.defaultProps.graph.type,coords:null}};let K=W;function fn(r,n){if(r.type!==n.type)throw new Error(`Cannot merge graphs with different types (${r.type} and ${n.type})`);switch(r.type){case"angle":return p(n.type==="angle"),{...r,...n};case"circle":return p(n.type==="circle"),{...r,...n};case"linear":return p(n.type==="linear"),{...r,...n};case"linear-system":return p(n.type==="linear-system"),{...r,...n};case"none":return p(n.type==="none"),{...r,...n};case"point":return p(n.type==="point"),{...r,...n};case"polygon":return p(n.type==="polygon"),{...r,...n};case"quadratic":return p(n.type==="quadratic"),{...r,...n};case"ray":return p(n.type==="ray"),{...r,...n};case"segment":return p(n.type==="segment"),{...r,...n};case"sinusoid":return p(n.type==="sinusoid"),{...r,...n};default:throw new Le(r)}}const q=f.StyleSheet.create({singleSelectShort:{height:26},row:{flexDirection:"row",marginTop:o.xSmall_8,alignItems:"center"}});K.__docgenInfo={description:`An editor for the InteractiveGraph widget, which allows the user to
specify the graph's properties and the correct answer.

Used in the exercise editor.`,methods:[{name:"changeStartCoords",docblock:null,modifiers:[],params:[{name:"coords",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    // Where the little black axis lines & labels (ticks) should render.
    // Also known as the tick step. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    step: [number, number];
    // Where the grid lines on the graph will render. default [1, 1]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    gridStep?: [x: number, y: number];
    // Where the graph points will lock to when they are dragged. default [0.5, 0.5]
    // NOTE(kevinb): perseus_data.go defines this as Array<number>
    snapStep?: [x: number, y: number];
    // An optional image to use in the background
    backgroundImage?: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    // How to label the X and Y axis.  default: ["x", "y"]
    labels?: ReadonlyArray<string>;
    // Whether to show the Protractor tool overlayed on top of the graph
    showProtractor: boolean;
    /**
     * Whether to show the Ruler tool overlayed on top of the graph.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    showRuler?: boolean;
    // Whether to show tooltips on the graph
    showTooltips?: boolean;
    /**
     * The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
     * "yd", "mi".
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerLabel?: string;
    /**
     * How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
     * an integer.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerTicks?: number;
    // The X and Y coordinate ranges for the view of the graph.  default: [[-10, 10], [-10, 10]]
    // NOTE(kevinb): perseus_data.go defines this as Array<Array<number>>
    // TODO(kevinb): Add a transform function to interactive-graph.jsx to
    // rename \`range\` to \`ranges\` so that things are less confusing.
    range: GraphRange;
    // The type of graph
    graph: PerseusGraphType;
    // The correct kind of graph, if being used to select function type
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    // Shapes (points, chords, etc) displayed on the graph that cannot
    // be moved by the user.
    lockedFigures?: ReadonlyArray<LockedFigure>;
    // Aria label that applies to the entire graph.
    fullGraphAriaLabel?: string;
    // Aria description that applies to the entire graph.
    fullGraphAriaDescription?: string;
}`,signature:{properties:[{key:"step",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!1}},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showProtractor",value:{name:"boolean",required:!0}},{key:"showRuler",value:{name:"boolean",required:!1},description:`Whether to show the Ruler tool overlayed on top of the graph.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"showTooltips",value:{name:"boolean",required:!1}},{key:"rulerLabel",value:{name:"string",required:!1},description:`The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
"yd", "mi".
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"rulerTicks",value:{name:"number",required:!1},description:`How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
an integer.
@deprecated - no longer used by the InteractiveGraph widget. The
property is kept on this type to prevent its accidental reuse in future
features, since it may appear in production data.`},{key:"range",value:{name:"tuple",raw:`[
    x: [min: number, max: number],
    y: [min: number, max: number],
]`,elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!0}},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!0}},{key:"lockedFigures",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"ReadonlyArray<LockedFigure>",required:!1}},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}}]}}}},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null}],displayName:"InteractiveGraphEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,elements:[{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}`,signature:{properties:[{key:"isArticle",value:{name:"boolean",required:!1}},{key:"onFocusChange",value:{name:"signature",type:"function",raw:`(
    newFocusPath: FocusPath,
    oldFocusPath: FocusPath,
    keypadHeight?: number,
    focusedElement?: HTMLElement,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
answered correctly and should no longer be interactive.`},{key:"answerableCallback",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1}},{key:"getAnotherHint",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!1}},{key:"interactionCallback",value:{name:"signature",type:"function",raw:"(widgetData: {[widgetId: string]: any}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{[widgetId: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"widgetData"}],return:{name:"void"}},required:!1}},{key:"groupAnnotator",value:{name:"signature",type:"function",raw:"(groupNumber: number, widgetId: string) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"groupNumber"},{type:{name:"string"},name:"widgetId"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`A function that takes in the relative problem number (starts at
0 and is incremented for each group widget), and the ID of the
group widget, then returns a react component that will be added
immediately above the renderer in the group widget. If the
function returns null, no annotation will be added.`},{key:"imagePlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If imagePlaceholder is set, Perseus will render the placeholder instead
of the image node.`},{key:"widgetPlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If widgetPlaceholder is set, Perseus will render the placeholder instead
of the widget node.`},{key:"baseElements",value:{name:"signature",type:"object",raw:`{
    /**
     * The <Link /> component provided here must adhere to the same
     * interface as React's base <a /> component.
     */
    Link: React.ComponentType<any>;
}`,signature:{properties:[{key:"Link",value:{name:"ReactComponentType",raw:"React.ComponentType<any>",elements:[{name:"any"}],required:!0},description:`The <Link /> component provided here must adhere to the same
interface as React's base <a /> component.`}]},required:!1},description:`Base React elements that can be used in place of the standard DOM
DOM elements. For example, when provided, <Link /> will be used
in place of <a />. This allows clients to provide pre-styled
components or components with custom behavior.`},{key:"imagePreloader",value:{name:"signature",type:"function",raw:"(dimensions: Dimensions) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]}},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
to display while an image is loading.`},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(args: TrackInteractionArgs) => void",signature:{arguments:[{type:{name:"intersection",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
} & Partial<TrackingGradedGroupExtraArguments> &
    Partial<TrackingSequenceExtraArguments>`,elements:[{name:"signature",type:"object",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!1}}]}},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    status: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]}}],raw:"Partial<TrackingGradedGroupExtraArguments>"},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    visible: number;
}`,signature:{properties:[{key:"visible",value:{name:"number",required:!0}}]}}],raw:"Partial<TrackingSequenceExtraArguments>"}]},name:"args"}],return:{name:"void"}},required:!1},description:`A function that is called when the user has interacted with a widget. It
also includes any extra parameters that the originating widget provided.
This is used for keeping track of widget interactions.`},{key:"customKeypad",value:{name:"boolean",required:!1},description:`A boolean that indicates whether or not a custom keypad is
being used.  For mobile web this will be the ProvidedKeypad
component.  In this situation we use the MathInput component
from the math-input repo instead of the existing perseus math
input components.`},{key:"nativeKeypadProxy",value:{name:"signature",type:"function",raw:"(blur: () => void) => KeypadAPI",signature:{arguments:[{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"blur"}],return:{name:"KeypadAPI"}},required:!1},description:`If this is provided, it is called instead of appending an instance
of \`math-input\`'s keypad to the body. This is used by the native
apps so they can have the keypad be defined on the native side.
It is called with an function that, when called, blurs the input,
and is expected to return an object of the shape
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"crossOutEnabled",value:{name:"boolean",required:!1},description:`Whether to enable the cross-out feature on multiple-choice radio
widgets. This allows users to note which answers they believe to
be incorrect, to find the answer by process of elimination.

We plan to roll this out to all call sites eventually, but for
now we have this flag, to add it to Generalized Test Prep first.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"signature",type:"object",raw:`{
    /**
     * Flags related to the interactive-graph Mafs migration.
     *
     * Add values to the relevant array to create new flags.
     */
    mafs?:
        | false
        | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
              [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
          });
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:`| false
| ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
      [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
  })`,elements:[{name:"literal",value:"false"},{name:"unknown"}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.`}]}}],raw:`Readonly<{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"GroupMetadataEditor",value:{name:"NonNullable",elements:[{name:'Readonly["GroupMetadataEditor"]',raw:'APIOptions["GroupMetadataEditor"]'}],raw:'NonNullable<APIOptions["GroupMetadataEditor"]>',required:!0}},{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>`},description:""},labels:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"The labels for the x and y axes."},range:{required:!0,tsType:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The range of the graph in the x and y directions."},step:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:`How far apart the tick marks on the axes are in the x and y
directions.`},gridStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the grid lines are in the x and y directions."},snapStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"How far apart the snap-to points are in the x and y directions."},box:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The size of the graph in pixels."},valid:{required:!1,tsType:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}]},description:`An error message to display in the graph area, or true if the
graph is valid.`,defaultValue:{value:"true",computed:!1}},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:"The background image to display in the graph area and its properties.",defaultValue:{value:`{
    url: null,
}`,computed:!1}},markings:{required:!0,tsType:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},showProtractor:{required:!0,tsType:{name:"boolean"},description:"Whether to show the protractor on the graph."},showTooltips:{required:!1,tsType:{name:"boolean"},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`,defaultValue:{value:"false",computed:!1}},correct:{required:!1,tsType:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}]},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`,defaultValue:{value:`{
    type: InteractiveGraph.defaultProps.graph.type,
    coords: null,
}`,computed:!1}},lockedFigures:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>"},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},fullGraphAriaLabel:{required:!1,tsType:{name:"string"},description:""},fullGraphAriaDescription:{required:!1,tsType:{name:"string"},description:""},graph:{required:!0,tsType:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]'},description:"The graph to display in the graph area."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * The range of the graph in the x and y directions.
     */
    range: [x: Range, y: Range];
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: string | boolean;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: "graph" | "grid" | "none";
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    // TODO(LEMS-2344): make the type of \`correct\` more specific
    correct: PerseusGraphType;
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the \`aria-description\` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's \`aria-describedby\` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["graph"];
    onChange: (props: Partial<Props>) => void;
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,elements:[{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}`,signature:{properties:[{key:"isArticle",value:{name:"boolean",required:!1}},{key:"onFocusChange",value:{name:"signature",type:"function",raw:`(
    newFocusPath: FocusPath,
    oldFocusPath: FocusPath,
    keypadHeight?: number,
    focusedElement?: HTMLElement,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
answered correctly and should no longer be interactive.`},{key:"answerableCallback",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1}},{key:"getAnotherHint",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!1}},{key:"interactionCallback",value:{name:"signature",type:"function",raw:"(widgetData: {[widgetId: string]: any}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{[widgetId: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"widgetData"}],return:{name:"void"}},required:!1}},{key:"groupAnnotator",value:{name:"signature",type:"function",raw:"(groupNumber: number, widgetId: string) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"groupNumber"},{type:{name:"string"},name:"widgetId"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`A function that takes in the relative problem number (starts at
0 and is incremented for each group widget), and the ID of the
group widget, then returns a react component that will be added
immediately above the renderer in the group widget. If the
function returns null, no annotation will be added.`},{key:"imagePlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If imagePlaceholder is set, Perseus will render the placeholder instead
of the image node.`},{key:"widgetPlaceholder",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`If widgetPlaceholder is set, Perseus will render the placeholder instead
of the widget node.`},{key:"baseElements",value:{name:"signature",type:"object",raw:`{
    /**
     * The <Link /> component provided here must adhere to the same
     * interface as React's base <a /> component.
     */
    Link: React.ComponentType<any>;
}`,signature:{properties:[{key:"Link",value:{name:"ReactComponentType",raw:"React.ComponentType<any>",elements:[{name:"any"}],required:!0},description:`The <Link /> component provided here must adhere to the same
interface as React's base <a /> component.`}]},required:!1},description:`Base React elements that can be used in place of the standard DOM
DOM elements. For example, when provided, <Link /> will be used
in place of <a />. This allows clients to provide pre-styled
components or components with custom behavior.`},{key:"imagePreloader",value:{name:"signature",type:"function",raw:"(dimensions: Dimensions) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]}},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
to display while an image is loading.`},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(args: TrackInteractionArgs) => void",signature:{arguments:[{type:{name:"intersection",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
} & Partial<TrackingGradedGroupExtraArguments> &
    Partial<TrackingSequenceExtraArguments>`,elements:[{name:"signature",type:"object",raw:`{
    // The widget type that this interaction originates from
    type: string;
    // The widget id that this interaction originates from
    id: string;

    correct?: boolean;

    // Tracking args are all optional here because we don't know which
    // widgets originated the call, and thus can't know what extra
    // arguments will be included!
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"correct",value:{name:"boolean",required:!1}}]}},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    status: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]}}],raw:"Partial<TrackingGradedGroupExtraArguments>"},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
    visible: number;
}`,signature:{properties:[{key:"visible",value:{name:"number",required:!0}}]}}],raw:"Partial<TrackingSequenceExtraArguments>"}]},name:"args"}],return:{name:"void"}},required:!1},description:`A function that is called when the user has interacted with a widget. It
also includes any extra parameters that the originating widget provided.
This is used for keeping track of widget interactions.`},{key:"customKeypad",value:{name:"boolean",required:!1},description:`A boolean that indicates whether or not a custom keypad is
being used.  For mobile web this will be the ProvidedKeypad
component.  In this situation we use the MathInput component
from the math-input repo instead of the existing perseus math
input components.`},{key:"nativeKeypadProxy",value:{name:"signature",type:"function",raw:"(blur: () => void) => KeypadAPI",signature:{arguments:[{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"blur"}],return:{name:"KeypadAPI"}},required:!1},description:`If this is provided, it is called instead of appending an instance
of \`math-input\`'s keypad to the body. This is used by the native
apps so they can have the keypad be defined on the native side.
It is called with an function that, when called, blurs the input,
and is expected to return an object of the shape
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"crossOutEnabled",value:{name:"boolean",required:!1},description:`Whether to enable the cross-out feature on multiple-choice radio
widgets. This allows users to note which answers they believe to
be incorrect, to find the answer by process of elimination.

We plan to roll this out to all call sites eventually, but for
now we have this flag, to add it to Generalized Test Prep first.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"signature",type:"object",raw:`{
    /**
     * Flags related to the interactive-graph Mafs migration.
     *
     * Add values to the relevant array to create new flags.
     */
    mafs?:
        | false
        | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
              [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
          });
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:`| false
| ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
      [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
  })`,elements:[{name:"literal",value:"false"},{name:"unknown"}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.`}]}}],raw:`Readonly<{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
    /**
     * A boolean that indicates whether the associated problem has been
     * answered correctly and should no longer be interactive.
     */
    readOnly?: boolean;
    answerableCallback?: (arg1: boolean) => unknown;
    getAnotherHint?: () => unknown;
    interactionCallback?: (widgetData: {[widgetId: string]: any}) => void;
    /**
     * A function that takes in the relative problem number (starts at
     * 0 and is incremented for each group widget), and the ID of the
     * group widget, then returns a react component that will be added
     * immediately above the renderer in the group widget. If the
     * function returns null, no annotation will be added.
     */
    groupAnnotator?: (groupNumber: number, widgetId: string) => React.ReactNode;
    /**
     * If imagePlaceholder is set, Perseus will render the placeholder instead
     * of the image node.
     */
    imagePlaceholder?: React.ReactNode;
    /**
     * If widgetPlaceholder is set, Perseus will render the placeholder instead
     * of the widget node.
     */
    widgetPlaceholder?: React.ReactNode;
    /**
     * Base React elements that can be used in place of the standard DOM
     * DOM elements. For example, when provided, <Link /> will be used
     * in place of <a />. This allows clients to provide pre-styled
     * components or components with custom behavior.
     */
    baseElements?: {
        /**
         * The <Link /> component provided here must adhere to the same
         * interface as React's base <a /> component.
         */
        Link: React.ComponentType<any>;
    };
    /**
     * Function that takes dimensions and returns a React component
     * to display while an image is loading.
     */
    imagePreloader?: (dimensions: Dimensions) => React.ReactNode;
    /**
     * A function that is called when the user has interacted with a widget. It
     * also includes any extra parameters that the originating widget provided.
     * This is used for keeping track of widget interactions.
     */
    trackInteraction?: (args: TrackInteractionArgs) => void;
    /**
     * A boolean that indicates whether or not a custom keypad is
     * being used.  For mobile web this will be the ProvidedKeypad
     * component.  In this situation we use the MathInput component
     * from the math-input repo instead of the existing perseus math
     * input components.
     */
    customKeypad?: boolean;
    /**
     * If this is provided, it is called instead of appending an instance
     * of \`math-input\`'s keypad to the body. This is used by the native
     * apps so they can have the keypad be defined on the native side.
     * It is called with an function that, when called, blurs the input,
     * and is expected to return an object of the shape
     * keypadElementPropType from math-input/src/prop-types.js.
     */
    nativeKeypadProxy?: (blur: () => void) => KeypadAPI;
    /** Indicates whether or not to use mobile styling. */
    isMobile?: boolean;
    /** A function, called with a bool indicating whether use of the
     * drawing area (scratchpad) should be allowed/disallowed.
     *
     * Previously handled by \`Khan.scratchpad.enable/disable\`
     */
    setDrawingAreaAvailable?: (arg1: boolean) => unknown;
    /** The color used for the hint progress indicator (eg. 1 / 3) */
    hintProgressColor?: string;
    /**
     * Whether this Renderer is allowed to auto-scroll the rest of the
     * page. For example, if this is enabled, the most recently used
     * radio widget will attempt to keep the "selected" answer in view
     * after entering review mode.
     *
     * Defaults to \`false\`.
     */
    canScrollPage?: boolean;
    /**
     * Whether to enable the cross-out feature on multiple-choice radio
     * widgets. This allows users to note which answers they believe to
     * be incorrect, to find the answer by process of elimination.
     *
     * We plan to roll this out to all call sites eventually, but for
     * now we have this flag, to add it to Generalized Test Prep first.
     */
    crossOutEnabled?: boolean;
    /**
     * The value in milliseconds by which the local state of content
     * in a editor is delayed before propagated to a prop. For example,
     * when text is typed in the text area of an Editor component,
     * there will be a delay equal to the value of \`editorChangeDelay\`
     * before the change is propagated. This is added for better
     * responsiveness of the editor when used in certain contexts such
     * as StructuredItem exercises where constant re-rendering for each
     * keystroke caused text typed in the text area to appear in it
     * only after a good few seconds.
     */
    editorChangeDelay?: number;
    /** Feature flags that can be passed from consuming application. */
    flags?: {
        /**
         * Flags related to the interactive-graph Mafs migration.
         *
         * Add values to the relevant array to create new flags.
         */
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
    GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
    baseElements: NonNullable<APIOptions["baseElements"]>;
    canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
    crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
    editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
    groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
    isArticle: NonNullable<APIOptions["isArticle"]>;
    isMobile: NonNullable<APIOptions["isMobile"]>;
    onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
    readOnly: NonNullable<APIOptions["readOnly"]>;
    setDrawingAreaAvailable: NonNullable<
        APIOptions["setDrawingAreaAvailable"]
    >;
    showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
}`,signature:{properties:[{key:"GroupMetadataEditor",value:{name:"NonNullable",elements:[{name:'Readonly["GroupMetadataEditor"]',raw:'APIOptions["GroupMetadataEditor"]'}],raw:'NonNullable<APIOptions["GroupMetadataEditor"]>',required:!0}},{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
        GroupMetadataEditor: NonNullable<APIOptions["GroupMetadataEditor"]>;
        baseElements: NonNullable<APIOptions["baseElements"]>;
        canScrollPage: NonNullable<APIOptions["canScrollPage"]>;
        crossOutEnabled: NonNullable<APIOptions["crossOutEnabled"]>;
        editorChangeDelay: NonNullable<APIOptions["editorChangeDelay"]>;
        groupAnnotator: NonNullable<APIOptions["groupAnnotator"]>;
        isArticle: NonNullable<APIOptions["isArticle"]>;
        isMobile: NonNullable<APIOptions["isMobile"]>;
        onFocusChange: NonNullable<APIOptions["onFocusChange"]>;
        readOnly: NonNullable<APIOptions["readOnly"]>;
        setDrawingAreaAvailable: NonNullable<
            APIOptions["setDrawingAreaAvailable"]
        >;
        showAlignmentOptions: NonNullable<APIOptions["showAlignmentOptions"]>;
    }
>`,required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0},description:"The labels for the x and y axes."},{key:"range",value:{name:"tuple",raw:"[x: Range, y: Range]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The range of the graph in the x and y directions."},{key:"step",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:`How far apart the tick marks on the axes are in the x and y
directions.`},{key:"gridStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the grid lines are in the x and y directions."},{key:"snapStep",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"How far apart the snap-to points are in the x and y directions."},{key:"box",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The size of the graph in pixels."},{key:"valid",value:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}],required:!0},description:`An error message to display in the graph area, or true if the
graph is valid.`},{key:"backgroundImage",value:{name:"signature",type:"object",raw:`{
    // The URL of the image
    url: string | null | undefined;
    // The width of the image
    width?: number;
    // The height of the image
    height?: number;
    // The top offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    top?: number;
    // The left offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    left?: number;
    // The scale of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    // Yikes, production data as this as both a number (1) and string ("1")
    scale?: number | string;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"bottom",value:{name:"number",required:!1}}]},required:!0},description:"The background image to display in the graph area and its properties."},{key:"markings",value:{name:"union",raw:'"graph" | "grid" | "none"',elements:[{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}],required:!0},description:`The type of markings to display on the graph.
- graph: shows the axes and the grid lines
- grid: shows only the grid lines
- none: shows no markings`},{key:"showProtractor",value:{name:"boolean",required:!0},description:"Whether to show the protractor on the graph."},{key:"showTooltips",value:{name:"boolean",required:!0},description:`Whether to show tooltips on the graph.
(Currently not used, but will be in the future.)`},{key:"correct",value:{name:"union",raw:`| PerseusGraphTypeAngle
| PerseusGraphTypeCircle
| PerseusGraphTypeLinear
| PerseusGraphTypeLinearSystem
| PerseusGraphTypeNone
| PerseusGraphTypePoint
| PerseusGraphTypePolygon
| PerseusGraphTypeQuadratic
| PerseusGraphTypeRay
| PerseusGraphTypeSegment
| PerseusGraphTypeSinusoid`,elements:[{name:"signature",type:"object",raw:`{
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: true
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // How to match the answer. If missing, defaults to exact matching.
    match?: "congruent";
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"intersection",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "circle";
    center?: Coord;
    radius?: number;
    // The initial coordinates the graph renders with.
    startCoords?: {
        center: Coord;
        radius: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear";
    // expects 2 coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "linear-system";
    // expects 2 sets of 2 coords
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    type: "none";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"none"',required:!0}}]}},{name:"intersection",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    // The number of points if a "point" type.  default: 1.  "unlimited" if no limit
    numPoints?: number | "unlimited";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "polygon";
    // The number of sides.  default: 3. "unlimited" if no limit
    numSides?: number | "unlimited";
    // Whether to the angle measurements.  default: false
    showAngles?: boolean;
    // Whether to show side measurements. default: false
    showSides?: boolean;
    // How to snap points.  e.g. "grid", "angles", or "sides". default: grid
    snapTo?: "grid" | "angles" | "sides";
    // How to match the answer. If missing, defaults to exact matching.
    match?: "similar" | "congruent" | "approx";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // expects a list of 3 coords
    coords?: [Coord, Coord, Coord] | null;
    // The initial coordinates the graph renders with.
    startCoords?: [Coord, Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "ray";
    // Expects a list of 2 Coords
    coords?: CollinearTuple | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "segment";
    // The number of segments if a "segment" type. default: 1.  Max: 6
    numSegments?: number;
    // Expects a list of Coord tuples. Length should match the \`numSegments\` value.
    coords?: CollinearTuple[] | null;
    // The initial coordinates the graph renders with.
    startCoords?: CollinearTuple[];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[Vector2, Vector2]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]},{name:"intersection",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
} & PerseusGraphTypeCommon`,elements:[{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Expects a list of 2 Coords
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}}]}}]}],required:!0},description:`The current correct answer for the graph. Updated by this component
when the graph is changed.

Note that the "Correct answer:" textbox is not an interactive
element. Instead, it is a representation of the correct answer based
on the state of the interactive graph previewed at the bottom of the
editor page.`},{key:"lockedFigures",value:{name:"Array",elements:[{name:"union",raw:`| LockedPointType
| LockedLineType
| LockedVectorType
| LockedEllipseType
| LockedPolygonType
| LockedFunctionType
| LockedLabelType`,elements:[{name:"signature",type:"object",raw:`{
    type: "point";
    coord: Coord;
    color: LockedFigureColor;
    filled: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"filled",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "line";
    kind: "line" | "ray" | "segment";
    points: [point1: LockedPointType, point2: LockedPointType];
    color: LockedFigureColor;
    lineStyle: LockedLineStyle;
    showPoint1: boolean;
    showPoint2: boolean;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"line"',required:!0}},{key:"kind",value:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}],required:!0}},{key:"points",value:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"lineStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"showPoint1",value:{name:"boolean",required:!0}},{key:"showPoint2",value:{name:"boolean",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "vector";
    points: [tail: Coord, tip: Coord];
    color: LockedFigureColor;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"vector"',required:!0}},{key:"points",value:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "ellipse";
    center: Coord;
    radius: [x: number, y: number];
    angle: number;
    color: LockedFigureColor;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ellipse"',required:!0}},{key:"center",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"radius",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"angle",value:{name:"number",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "polygon";
    points: ReadonlyArray<Coord>;
    color: LockedFigureColor;
    showVertices: boolean;
    fillStyle: LockedFigureFillType;
    strokeStyle: LockedLineStyle;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"points",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}],raw:"ReadonlyArray<Coord>",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"showVertices",value:{name:"boolean",required:!0}},{key:"fillStyle",value:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}],required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "function";
    color: LockedFigureColor;
    strokeStyle: LockedLineStyle;
    equation: string; // This is the user-defined equation (as it was typed)
    directionalAxis: "x" | "y";
    domain?: Interval;
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0}},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0}},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]",required:!1}},{key:"ariaLabel",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"Array<LockedFigure>",required:!1},description:`The locked figures to display in the graph area.
Locked figures are graph elements (points, lines, line segmeents,
etc.) that are locked in place and not interactive.`},{key:"fullGraphAriaLabel",value:{name:"string",required:!1}},{key:"fullGraphAriaDescription",value:{name:"string",required:!1}},{key:"graph",value:{name:'PropsFor["graph"]',raw:'InteractiveGraphProps["graph"]',required:!0},description:"The graph to display in the graph area."},{key:"onChange",value:{name:"signature",type:"function",raw:"(props: Partial<Props>) => void",signature:{arguments:[{type:{name:"Partial",elements:[{name:"Props"}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}},required:!0}},{key:"static",value:{name:"boolean",required:!1}}]}}],raw:"Partial<Props>"},name:"props"}],return:{name:"void"}}},description:""},static:{required:!1,tsType:{name:"boolean"},description:""}}};export{K as I};
