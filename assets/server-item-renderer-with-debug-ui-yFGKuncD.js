import{j as e}from"./jsx-runtime-BT65X5dW.js";import{B as h}from"./index-CQe11mMd.js";import{V as l}from"./index-CskvhqFA.js";import{P as N}from"./index-CIHqsnLr.js";import{S as y}from"./index-CbIoTxL4.js";import{S}from"./all-widgets-BIjeVBLR.js";import{T as D,d as E}from"./test-keypad-context-wrapper-Cd1DCcz9.js";import{r as s}from"./index-C6mWTJJr.js";import"./underscore-U-AHniOr.js";import"./core-widget-registry-BDqK5cn0.js";import{s as C}from"./split-perseus-item-DPq5gkED.js";import{s as W}from"./util-CqRduJsD.js";import"./jquery-CkHB0_Mt.js";import{a as M}from"./mobile-keypad-DHry2vjf.js";import{S as O}from"./server-item-renderer-DnxVsFPe.js";import{P as K,E as G}from"./perseus-error-CSETqePQ.js";import{H as f}from"./index-CbNKSLRm.js";import{R as w,S as U}from"./split-view-ymrOLumz.js";import{s as L}from"./test-dependencies-BxK23p0A.js";function H(n){return n.type==="points"&&n.earned>=n.total}function V(n,t,r){if(n.type==="points")return{empty:!1,correct:H(n),message:n.message,guess:t,state:r};if(n.type==="invalid")return{empty:!0,correct:!1,message:n.message,suppressAlmostThere:n.suppressAlmostThere,guess:t,state:r};throw new K("Invalid score type: "+n.type,G.InvalidInput,{metadata:{score:JSON.stringify(n),guess:JSON.stringify(t),state:JSON.stringify(r)}})}function b({score:n}){return n==null?null:e.jsxs(e.Fragment,{children:[e.jsxs("table",{style:{marginTop:"20px"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{fontWeight:"bold"},children:[e.jsx("td",{children:"Empty"}),e.jsx("td",{children:"Correct"}),e.jsx("td",{style:{width:"100%"},children:"Message"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:n.empty.toString()}),e.jsx("td",{children:n.correct.toString()}),e.jsx("td",{children:n.message})]})})]}),e.jsx(f,{style:{marginTop:"10px"},children:"Guess"}),e.jsx(w,{quotesOnKeys:!1,enableClipboard:!1,src:n.guess}),e.jsx(f,{style:{marginTop:"10px"},children:"State"}),e.jsx(w,{quotesOnKeys:!1,enableClipboard:!1,src:n.state})]})}b.__docgenInfo={description:"",methods:[],displayName:"KEScoreUI",props:{score:{required:!0,tsType:{name:"union",raw:"KEScore | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}},{name:"null"},{name:"undefined"}]},description:""}}};const z=({title:n="Widget",item:t,apiOptions:r=Object.freeze({}),linterContext:v,reviewMode:c=!1,startAnswerless:k=!1,showSolutions:u})=>{const o=s.useRef(null),[m,P]=s.useState(null),[d,T]=s.useState(r.isMobile??!1),[i,x]=s.useState(0),[R,p]=s.useState(k),q={...r,isMobile:d,customKeypad:d},A=()=>{const a=o.current;if(!a)return;const I=a.getUserInput(),j=W(t.question,I,"en"),F=[a.getUserInputLegacy(),[]];return V(j,F,a.getSerializedState().question)},g=R&&!c&&(u==="none"||!u)?C(t):t;return e.jsx(D,{children:e.jsx(U,{rendererTitle:e.jsxs(l,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:[n,e.jsx(l,{style:{marginLeft:"auto"},children:e.jsx(S,{icon:e.jsx(N,{icon:E}),checked:d,onChange:T})})]}),renderer:e.jsxs(e.Fragment,{children:[e.jsx(l,{className:d?"perseus-mobile":"",children:e.jsx(M.Consumer,{children:({keypadElement:a})=>e.jsx(O,{ref:o,problemNum:0,score:m,apiOptions:q,item:g,dependencies:L,keypadElement:a,linterContext:v,reviewMode:c,showSolutions:u,hintsVisible:i})})}),e.jsxs(l,{style:{flexDirection:"row",alignItems:"center"},children:[e.jsx(h,{onClick:()=>{p(!1),o.current&&P(A())},children:"Check"}),e.jsx(y,{size:8}),e.jsx(h,{onClick:()=>{var a;p(!1),(a=o.current)==null||a.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"}),e.jsx(y,{size:8}),e.jsx(h,{disabled:i>=t.hints.length,onClick:()=>{x(i+1)},children:i>=t.hints.length?"No hints left":`Take Hint ${i+1}`})]}),e.jsx(b,{score:m})]}),jsonObject:g})})};z.__docgenInfo={description:"",methods:[],displayName:"ServerItemRendererWithDebugUI",props:{title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Widget"',computed:!1}},item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    // The details of the question being asked to the user.
    question: PerseusRenderer;
    // A collection of hints to be offered to the user that support answering the question.
    hints: Hint[];
    // Details about the tools the user might need to answer the question
    answerArea: PerseusAnswerArea | null | undefined;
}`,signature:{properties:[{key:"question",value:{name:"signature",type:"object",raw:`{
    /**
     * Translatable Markdown content to be rendered.  May include references to
     * widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
     * For each image found in this content, there can be an entry in the
     * \`images\` dict (below) with the key being the image's url which defines
     * additional attributes for the image.
     */
    content: string;
    /**
     * A dictionary of {[widgetName]: Widget} to be referenced from the content
     * field.
     */
    widgets: PerseusWidgetsMap;
    /**
     * Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
     * are keys that represent other content in the system.  Not rendered to
     * the user. NOTE: perseus_data.go says this is required even though it
     * isn't necessary.
     * @deprecated
     */
    metadata?: any;
    /**
     * A dictionary of {[imageUrl]: PerseusImageDetail}.
     */
    images: {
        [imageUrl: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0},description:`Translatable Markdown content to be rendered.  May include references to
widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
For each image found in this content, there can be an entry in the
\`images\` dict (below) with the key being the image's url which defines
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"any",required:!1},description:`Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
are keys that represent other content in the system.  Not rendered to
the user. NOTE: perseus_data.go says this is required even though it
isn't necessary.
@deprecated`},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]},required:!0}},{key:"hints",value:{name:"Array",elements:[{name:"intersection",raw:`PerseusRenderer & {
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    /**
     * Translatable Markdown content to be rendered.  May include references to
     * widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
     * For each image found in this content, there can be an entry in the
     * \`images\` dict (below) with the key being the image's url which defines
     * additional attributes for the image.
     */
    content: string;
    /**
     * A dictionary of {[widgetName]: Widget} to be referenced from the content
     * field.
     */
    widgets: PerseusWidgetsMap;
    /**
     * Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
     * are keys that represent other content in the system.  Not rendered to
     * the user. NOTE: perseus_data.go says this is required even though it
     * isn't necessary.
     * @deprecated
     */
    metadata?: any;
    /**
     * A dictionary of {[imageUrl]: PerseusImageDetail}.
     */
    images: {
        [imageUrl: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0},description:`Translatable Markdown content to be rendered.  May include references to
widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
For each image found in this content, there can be an entry in the
\`images\` dict (below) with the key being the image's url which defines
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"any",required:!1},description:`Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
are keys that represent other content in the system.  Not rendered to
the user. NOTE: perseus_data.go says this is required even though it
isn't necessary.
@deprecated`},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]},required:!0},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"Hint[]",required:!0}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null | undefined",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"},{name:"undefined"}],required:!0}}]}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    /**
     * @deprecated - metadata is no longer used by the Group widget
     */
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
    /**
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
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
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1},description:"@deprecated - metadata is no longer used by the Group widget"},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1},description:`A boolean that indicates whether the associated problem has been
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
only after a good few seconds.`},{key:"flags",value:{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof PerseusFeatureFlags)[number]"},{name:"boolean"}],raw:"Record<(typeof PerseusFeatureFlags)[number], boolean>",required:!1},description:`Feature flags that can be passed from consuming application.
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
    /**
     * @deprecated - metadata is no longer used by the Group widget
     */
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
    /**
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},description:"",defaultValue:{value:"Object.freeze({})",computed:!0}},linterContext:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},startAnswerless:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showSolutions:{required:!1,tsType:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}]},description:""}}};export{z as S,H as i};
