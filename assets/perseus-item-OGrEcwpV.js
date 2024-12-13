import{a as le}from"./version-akiLXZts.js";import{w as me,F as de,B as pe,I as ce}from"./article-renderer-77dhfJJP.js";import{r as ye,t as ge,l as he,R as we,p as Z,v as be}from"./renderer-HQbCSkSp.js";import{j as A}from"./jsx-runtime-63Ea5SlK.js";import{l as te}from"./index-awljIyHI.js";import{r as H}from"./index-6oxdNXpR.js";import{_ as $}from"./jquery-yG1GhClm.js";import{c as fe}from"./asset-context-H6Iqp7Gi.js";import{P as ke}from"./i18n-context-8x3SvuMF.js";import{D as ve}from"./dependencies-CP7Uh8Kq.js";import{H as qe}from"./hints-renderer-y6zo0Tdm.js";import{A as Ce}from"./perseus-api-1-ethIrW.js";import{U as Re}from"./util-_iDv4tVD.js";const Ae="@khanacademy/perseus",Te="__lib_version__";le(Ae,Te);const Pe={major:0,minor:1};ye(me);const xe=ge();xe["::renderer::"]=Pe;const Ie={onRendered:t=>{}},Se=H.createContext(Ie),D=class D extends H.Component{constructor(r){super(r),this._handleFocusChange=(o,m)=>{o!=null?this._setCurrentFocus(o):this._onRendererBlur(m)},this.handleInteractWithWidget=o=>{var d,h;const m=$.difference(this.state.questionHighlightedWidgets,[o]);this.setState({questionCompleted:!1,questionHighlightedWidgets:m}),(h=(d=this.props.apiOptions)==null?void 0:d.interactionCallback)==null||h.call(d,this.questionRenderer.getUserInputMap())},this.setAssetStatus=(o,m)=>{const d={...this.state.assetStatuses,[o]:m};this.setState({assetStatuses:d})},this.state={questionCompleted:!1,questionHighlightedWidgets:[],assetStatuses:{}},this._fullyRendered=!1}componentDidMount(){this._currentFocus=null,this._fullyRendered=!1}UNSAFE_componentWillReceiveProps(r){this.setState({questionHighlightedWidgets:[]})}componentDidUpdate(r,o){const m=this.props.apiOptions.answerableCallback;if(m!=null){const d=this.questionRenderer.emptyWidgets().length===0;m(d)}if(this._fullyRendered||Object.values(this.state.assetStatuses).every(Boolean)&&(this._fullyRendered=!0,this.props.onRendered(!0)),this.props.score&&this.props.score!==r.score){const d=this.questionRenderer.emptyWidgets();this.setState({questionCompleted:this.props.score.correct,questionHighlightedWidgets:d})}}componentWillUnmount(){this.blurTimeoutID!=null&&(clearTimeout(this.blurTimeoutID),this.blurTimeoutID=null)}_setCurrentFocus(r){const{apiOptions:{isMobile:o,onFocusChange:m},keypadElement:d}=this.props,h=this._currentFocus;this._currentFocus=r;const y=this.getInputPaths(),c=this._currentFocus&&y.some(C=>Re.inputPathsEqual(C,this._currentFocus));m!=null&&setTimeout(()=>{const C=d==null?void 0:d.getDOMNode(),T=C&&c?C.getBoundingClientRect().height:0;m(this._currentFocus,h,T,c&&this.questionRenderer.getDOMNodeForPath(r))},0),d&&o&&(c?d.activate():d.dismiss())}_onRendererBlur(r){const o=this._currentFocus;$.isEqual(r,o)&&(this.blurTimeoutID=setTimeout(()=>{$.isEqual(this._currentFocus,o)&&this._setCurrentFocus(null)},0))}_setWidgetProps(r,o,m){this.questionRenderer._setWidgetProps(r,o,m)}setInputValue(r,o,m){return this.questionRenderer.setInputValue(r,o,m)}focusPath(r){return this.questionRenderer.focusPath(r)}blurPath(r){return this.questionRenderer.blurPath(r)}getDOMNodeForPath(r){return this.questionRenderer.getDOMNodeForPath(r)}getInputPaths(){return this.questionRenderer.getInputPaths()}focus(){return this.questionRenderer.focus()}blur(){this._currentFocus&&this.blurPath(this._currentFocus)}getNumHints(){return this.props.item.hints.length}getPromptJSON(){return this.questionRenderer.getPromptJSON()}getUserInputLegacy(){return this.questionRenderer.getUserInput()}getUserInput(){return this.questionRenderer.getUserInputMap()}getWidgetIds(){return this.questionRenderer.getWidgetIds()}getSerializedState(){return{question:this.questionRenderer.getSerializedState(),hints:this.hintsRenderer.getSerializedState()}}restoreSerializedState(r,o){let m=2;const d=()=>{--m,o&&m===0&&o()};this.questionRenderer.restoreSerializedState(r.question,d),this.hintsRenderer.restoreSerializedState(r.hints,d)}showRationalesForCurrentlySelectedChoices(){this.questionRenderer.showRationalesForCurrentlySelectedChoices()}deselectIncorrectSelectedChoices(){this.questionRenderer.deselectIncorrectSelectedChoices()}render(){const r={...Ce.defaults,...this.props.apiOptions,onFocusChange:this._handleFocusChange},o={assetStatuses:this.state.assetStatuses,setAssetStatus:this.setAssetStatus},m=A.jsx(fe.Provider,{value:o,children:A.jsx(we,{keypadElement:this.props.keypadElement,problemNum:this.props.problemNum,onInteractWithWidget:this.handleInteractWithWidget,highlightedWidgets:this.state.questionHighlightedWidgets,apiOptions:r,questionCompleted:this.state.questionCompleted,reviewMode:this.props.reviewMode,showSolutions:this.props.showSolutions,ref:h=>{h!=null&&(this.questionRenderer=h)},content:this.props.item.question.content,widgets:this.props.item.question.widgets,images:this.props.item.question.images,linterContext:Z(this.props.linterContext,"question"),strings:this.context.strings,...this.props.dependencies})}),d=A.jsx(qe,{hints:this.props.item.hints,hintsVisible:this.props.hintsVisible,apiOptions:r,ref:h=>this.hintsRenderer=h,linterContext:Z(this.props.linterContext,"hints"),strings:this.context.strings});return A.jsx(ve.Provider,{value:this.props.dependencies,children:A.jsxs("div",{children:[A.jsx("div",{children:m}),A.jsx("div",{className:r.isMobile?void 0:te.css(je.hintsContainer),children:d})]})})}};D.contextType=ke,D.defaultProps={apiOptions:{},linterContext:he,onRendered:r=>{}};let L=D;const je=te.StyleSheet.create({hintsContainer:{marginLeft:50}}),Ne=H.forwardRef((t,r)=>A.jsx(Se.Consumer,{children:({onRendered:o})=>A.jsx(L,{...t,onRendered:o,ref:r})}));L.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"oldFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setWidgetProps",docblock:`Accepts a question area widgetId, or an answer area widgetId of
the form "answer-input-number 1", or the string "answer-area"
for the whole answer area (if the answer area is a single widget).`,modifiers:[],params:[{name:"widgetId",optional:!1,type:{name:"string"}},{name:"newProps",optional:!1,type:{name:"intersection",raw:"SharedRendererProps & OwnProps & HOCProps",elements:[{name:"signature",type:"object",raw:`{
    apiOptions: APIOptions;
    linterContext: LinterContextProps;
}`,signature:{properties:[{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`,required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    hintsVisible?: number;
    item: PerseusItem;
    score?: KEScore | null;
    problemNum?: number;
    reviewMode?: boolean;
    keypadElement?: KeypadAPI | null | undefined;
    dependencies: PerseusDependenciesV2;
    showSolutions?: ShowSolutions;
}`,signature:{properties:[{key:"hintsVisible",value:{name:"number",required:!1}},{key:"item",value:{name:"signature",type:"object",raw:`{
    // The details of the question being asked to the user.
    question: PerseusRenderer;
    // A collection of hints to be offered to the user that support answering the question.
    hints: ReadonlyArray<Hint>;
    // Details about the tools the user might need to answer the question
    answerArea: PerseusAnswerArea | null | undefined;
    /**
     * The version of the item.
     * @deprecated Not used.
     */
    itemDataVersion: any;
    /**
     * @deprecated Superseded by per-widget answers.
     */
    answer: any;
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
    // Used in the PerseusGradedGroup widget.  A list of "tags" that are keys
    // that represent other content in the system.  Not rendered to the user.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    metadata?: ReadonlyArray<string>;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]},required:!0}},{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
    // Used in the PerseusGradedGroup widget.  A list of "tags" that are keys
    // that represent other content in the system.  Not rendered to the user.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    metadata?: ReadonlyArray<string>;
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!0}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null | undefined",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"},{name:"undefined"}],required:!0}},{key:"itemDataVersion",value:{name:"any",required:!0},description:`The version of the item.
@deprecated Not used.`},{key:"answer",value:{name:"any",required:!0},description:"@deprecated Superseded by per-widget answers."}]},required:!0}},{key:"score",value:{name:"union",raw:"KEScore | null",elements:[{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}},{name:"null"}],required:!1}},{key:"problemNum",value:{name:"number",required:!1}},{key:"reviewMode",value:{name:"boolean",required:!1}},{key:"keypadElement",value:{name:"union",raw:"KeypadAPI | null | undefined",elements:[{name:"KeypadAPI"},{name:"null"},{name:"undefined"}],required:!1}},{key:"dependencies",value:{name:"PerseusDependenciesV2",required:!0}},{key:"showSolutions",value:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    onRendered: (isRendered: boolean) => void;
}`,signature:{properties:[{key:"onRendered",value:{name:"signature",type:"function",raw:"(isRendered: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isRendered"}],return:{name:"void"}},required:!0}}]}}],alias:"Props"}},{name:"callback",optional:!1,type:{name:"any"}}],returns:null,description:`Accepts a question area widgetId, or an answer area widgetId of
the form "answer-input-number 1", or the string "answer-area"
for the whole answer area (if the answer area is a single widget).`},{name:"setInputValue",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"newValue",optional:!1,type:{name:"any"}},{name:"focus",optional:!1,type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}}}],returns:{type:{name:"void"}}},{name:"focusPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:{type:{name:"void"}}},{name:"blurPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:{type:{name:"void"}}},{name:"getDOMNodeForPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:{type:{name:"union",raw:"Element | Text | null | undefined",elements:[{name:"Element"},{name:"Text"},{name:"null"},{name:"undefined"}]}}},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<FocusPath>"}}},{name:"handleInteractWithWidget",docblock:null,modifiers:[],params:[{name:"widgetId",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]}}},{name:"blur",docblock:null,modifiers:[],params:[],returns:{type:{name:"void"}}},{name:"getNumHints",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    content: string;
    widgets: {
        [widgetId: string]: WidgetPromptJSON;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"widgets",value:{name:"signature",type:"object",raw:`{
    [widgetId: string]: WidgetPromptJSON;
}`,signature:{properties:[{key:{name:"string"},value:{name:"union",raw:`| CategorizerPromptJSON
| DefinitionPromptJSON
| DropdownPromptJSON
| ExplanationPromptJSON
| ExpressionPromptJSON
| GradedGroupPromptJSON
| GradedGroupSetPromptJSON
| GrapherPromptJSON
| GroupPromptJSON
| ImagePromptJSON
| InputNumberPromptJSON
| LabelImagePromptJSON
| MatcherPromptJSON
| MatrixPromptJSON
| NumberLinePromptJSON
| NumericInputPromptJSON
| OrdererPromptJSON
| PassagePromptJSON
| PassageRefPromptJSON
| RadioPromptJSON
| SorterPromptJSON
| UnsupportedWidgetPromptJSON`,elements:[{name:"signature",type:"object",raw:`{
    type: "categorizer";
    options: {
        items: ReadonlyArray<string>;
        categories: ReadonlyArray<string>;
    };
    userInput: {
        itemToCategoryMapping: ReadonlyArray<number>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"categorizer"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    items: ReadonlyArray<string>;
    categories: ReadonlyArray<string>;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    itemToCategoryMapping: ReadonlyArray<number>;
}`,signature:{properties:[{key:"itemToCategoryMapping",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "definition";
    definition: string;
    togglePrompt: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"definition"',required:!0}},{key:"definition",value:{name:"string",required:!0}},{key:"togglePrompt",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "dropdown";
    options: {
        items: ReadonlyArray<string>;
    };
    userInput: {
        selectedIndex: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"dropdown"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    items: ReadonlyArray<string>;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    selectedIndex: number;
}`,signature:{properties:[{key:"selectedIndex",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "explanation";
    showPrompt: string;
    explanation: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"explanation"',required:!0}},{key:"showPrompt",value:{name:"string",required:!0}},{key:"explanation",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "expression";
    label?: string;
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"expression"',required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,elements:[{name:"RendererPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"hint",value:{name:"union",raw:"RendererPromptJSON | string",elements:[{name:"RendererPromptJSON"},{name:"string"}],required:!0}}]}}],required:!0},{name:"signature",type:"object",raw:`{
    type: "graded-group-set";
    options: {
        groupCount: number;
        currentGroup: GradedGroupPromptJSON;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group-set"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    groupCount: number;
    currentGroup: GradedGroupPromptJSON;
}`,signature:{properties:[{key:"groupCount",value:{name:"number",required:!0}},{key:"currentGroup",value:{name:"intersection",raw:`RendererPromptJSON & {
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,elements:[{name:"RendererPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"hint",value:{name:"union",raw:"RendererPromptJSON | string",elements:[{name:"RendererPromptJSON"},{name:"string"}],required:!0}}]}}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "grapher";
    options: {
        availableTypes: ReadonlyArray<string>;
        range: [x: [min: number, max: number], y: [min: number, max: number]];
        labels: ReadonlyArray<string>;
        tickStep: [number, number];
        gridStep?: [number, number];
        snapStep?: [number, number];
        backgroundImageUrl?: string | null;
    };
    userInput: GrapherAnswerTypes;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"grapher"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    availableTypes: ReadonlyArray<string>;
    range: [x: [min: number, max: number], y: [min: number, max: number]];
    labels: ReadonlyArray<string>;
    tickStep: [number, number];
    gridStep?: [number, number];
    snapStep?: [number, number];
    backgroundImageUrl?: string | null;
}`,signature:{properties:[{key:"availableTypes",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"range",value:{name:"tuple",raw:"[x: [min: number, max: number], y: [min: number, max: number]]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"tickStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!0}},{key:"gridStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"snapStep",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"backgroundImageUrl",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}}]},required:!0}},{key:"userInput",value:{name:"union",raw:`| {
      type: "absolute_value";
      coords: [
          // The vertex
          Coord, // A point along one line of the absolute value "V" lines
          Coord,
      ];
  }
| {
      type: "exponential";
      // Two points along the asymptote line. Usually (always?) a
      // horizontal or vertical line.
      asymptote: [Coord, Coord];
      // Two points along the exponential curve. One end of the curve
      // trends towards the asymptote.
      coords: [Coord, Coord];
  }
| {
      type: "linear";
      // Two points along the straight line
      coords: [Coord, Coord];
  }
| {
      type: "logarithm";
      // Two points along the asymptote line.
      asymptote: [Coord, Coord];
      // Two points along the logarithmic curve. One end of the curve
      // trends towards the asymptote.
      coords: [Coord, Coord];
  }
| {
      type: "quadratic";
      coords: [
          // The vertex of the parabola
          Coord, // A point along the parabola
          Coord,
      ];
  }
| {
      type: "sinusoid";
      // Two points on the same slope in the sinusoid wave line.
      coords: [Coord, Coord];
  }
| {
      type: "tangent";
      // Two points on the same slope in the tangent wave line.
      coords: [Coord, Coord];
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "absolute_value";
    coords: [
        // The vertex
        Coord, // A point along one line of the absolute value "V" lines
        Coord,
    ];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"absolute_value"',required:!0}},{key:"coords",value:{name:"tuple",raw:`[
    // The vertex
    Coord, // A point along one line of the absolute value "V" lines
    Coord,
]`,elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "exponential";
    // Two points along the asymptote line. Usually (always?) a
    // horizontal or vertical line.
    asymptote: [Coord, Coord];
    // Two points along the exponential curve. One end of the curve
    // trends towards the asymptote.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"exponential"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // Two points along the straight line
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "logarithm";
    // Two points along the asymptote line.
    asymptote: [Coord, Coord];
    // Two points along the logarithmic curve. One end of the curve
    // trends towards the asymptote.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"logarithm"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    coords: [
        // The vertex of the parabola
        Coord, // A point along the parabola
        Coord,
    ];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"tuple",raw:`[
    // The vertex of the parabola
    Coord, // A point along the parabola
    Coord,
]`,elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Two points on the same slope in the sinusoid wave line.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tangent";
    // Two points on the same slope in the tangent wave line.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tangent"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}}],required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
    type: "group";
}`,elements:[{name:"RendererPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "group";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"group"',required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    type: "image";
    options: {
        altText: string;
        title: string;
        caption: string;
        imageUrl: string | null | undefined;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"image"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    altText: string;
    title: string;
    caption: string;
    imageUrl: string | null | undefined;
}`,signature:{properties:[{key:"altText",value:{name:"string",required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"caption",value:{name:"string",required:!0}},{key:"imageUrl",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "input-number";
    options: {
        simplify: string;
        answerType: string;
    };
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"input-number"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    simplify: string;
    answerType: string;
}`,signature:{properties:[{key:"simplify",value:{name:"string",required:!0}},{key:"answerType",value:{name:"string",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "label-image";
    options: {
        choices: ReadonlyArray<string>;
        imageUrl: string;
        imageAlt: string;
        markers: BaseMarker[];
    };
    userInput: {
        markers: UserInputMarker[];
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label-image"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    choices: ReadonlyArray<string>;
    imageUrl: string;
    imageAlt: string;
    markers: BaseMarker[];
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"imageUrl",value:{name:"string",required:!0}},{key:"imageAlt",value:{name:"string",required:!0}},{key:"markers",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    label: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}}]}}],raw:"BaseMarker[]",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    markers: UserInputMarker[];
}`,signature:{properties:[{key:"markers",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    selected?: ReadonlyArray<string>;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}}]}}],raw:"UserInputMarker[]",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "matcher";
    options: {
        labels: ReadonlyArray<string>;
        left: ReadonlyArray<string>;
        right: ReadonlyArray<string>;
        orderMatters: boolean;
    };
    userInput: {
        left: ReadonlyArray<string>;
        right: ReadonlyArray<string>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"matcher"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    labels: ReadonlyArray<string>;
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
    orderMatters: boolean;
}`,signature:{properties:[{key:"labels",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"orderMatters",value:{name:"boolean",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "matrix";
    options: {
        height: number;
        width: number;
    };
    userInput: {
        answerRows: ReadonlyArray<ReadonlyArray<number>>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"matrix"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    height: number;
    width: number;
}`,signature:{properties:[{key:"height",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    answerRows: ReadonlyArray<ReadonlyArray<number>>;
}`,signature:{properties:[{key:"answerRows",value:{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}],raw:"ReadonlyArray<ReadonlyArray<number>>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "number-line";
    options: {
        range: ReadonlyArray<number>;
        numDivisions: number;
        snapDivisions: number;
    };
    userInput: {
        numLinePosition: number;
        numDivisions: number;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"number-line"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    range: ReadonlyArray<number>;
    numDivisions: number;
    snapDivisions: number;
}`,signature:{properties:[{key:"range",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"numDivisions",value:{name:"number",required:!0}},{key:"snapDivisions",value:{name:"number",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    numLinePosition: number;
    numDivisions: number;
}`,signature:{properties:[{key:"numLinePosition",value:{name:"number",required:!0}},{key:"numDivisions",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "numeric-input";
    label: string;
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"numeric-input"',required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "orderer";
    options: {
        options: ReadonlyArray<string>;
    };
    userInput: {
        values: ReadonlyArray<string>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"orderer"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    options: ReadonlyArray<string>;
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    values: ReadonlyArray<string>;
}`,signature:{properties:[{key:"values",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "passage";
    options: {
        passageTitle: string;
        passageText: string;
        footnotes: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"passage"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    passageTitle: string;
    passageText: string;
    footnotes: string;
}`,signature:{properties:[{key:"passageTitle",value:{name:"string",required:!0}},{key:"passageText",value:{name:"string",required:!0}},{key:"footnotes",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "passage-ref";
    options: {
        passageNumber: number;
        referenceNumber: number;
        summaryText: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"passage-ref"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    passageNumber: number;
    referenceNumber: number;
    summaryText: string;
}`,signature:{properties:[{key:"passageNumber",value:{name:"number",required:!0}},{key:"referenceNumber",value:{name:"number",required:!0}},{key:"summaryText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "radio";
    hasNoneOfTheAbove: boolean;
    options: BasicOption[];
    userInput: {
        selectedOptions: ReadonlyArray<boolean>;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"radio"',required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!0}},{key:"options",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]}}],raw:"BasicOption[]",required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    selectedOptions: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"selectedOptions",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sorter";
    userInput: {
        values: ReadonlyArray<string>;
        changed: boolean;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sorter"',required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    values: ReadonlyArray<string>;
    changed: boolean;
}`,signature:{properties:[{key:"values",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: UnsupportedWidget;
    message?: string;
    isSupported: boolean;
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| "cs-program"
| "iframe"
| "interaction"
| "interactive-graph-unsupported"
| "measurer"
| "phet-simulation"
| "plotter"
| "python-program"
| "video"`,elements:[{name:"literal",value:'"cs-program"'},{name:"literal",value:'"iframe"'},{name:"literal",value:'"interaction"'},{name:"literal",value:'"interactive-graph-unsupported"'},{name:"literal",value:'"measurer"'},{name:"literal",value:'"phet-simulation"'},{name:"literal",value:'"plotter"'},{name:"literal",value:'"python-program"'},{name:"literal",value:'"video"'}],required:!0}},{key:"message",value:{name:"string",required:!1}},{key:"isSupported",value:{name:"boolean",required:!0}}]}}],required:!0}}]},required:!0}}]}}}},{name:"getUserInputLegacy",docblock:`Returns an array of the widget \`.getUserInput()\` results

TODO: can we remove this? Seems to be just for backwards
compatibility with old Perseus Chrome logging
@deprecated use getUserInput`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"UserInputArray | UserInput | null | undefined",elements:[{name:"UserInputArray"},{name:"union",raw:`| PerseusCategorizerUserInput
| PerseusCSProgramUserInput
| PerseusDropdownUserInput
| PerseusExpressionUserInput
| PerseusGrapherUserInput
| PerseusIFrameUserInput
| PerseusInputNumberUserInput
| PerseusInteractiveGraphUserInput
| PerseusLabelImageUserInput
| PerseusMatcherUserInput
| PerseusMatrixUserInput
| PerseusNumberLineUserInput
| PerseusNumericInputUserInput
| PerseusOrdererUserInput
| PerseusPlotterUserInput
| PerseusRadioUserInput
| PerseusSorterUserInput
| PerseusTableUserInput`,elements:[{name:"signature",type:"object",raw:`{
    values: PerseusCategorizerScoringData["values"];
}`,signature:{properties:[{key:"values",value:{name:'intersection["values"]',raw:'PerseusCategorizerScoringData["values"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    value: number;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}}]}},{name:"string"},{name:"union",raw:'PerseusGrapherRubric["correct"]'},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}]},{name:"signature",type:"object",raw:`{
    markers: ReadonlyArray<InteractiveMarkerType>;
}`,signature:{properties:[{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`MarkerType & {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    // The list of correct answers expected for the marker.
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showCorrectness",value:{name:"union",raw:'"correct" | "incorrect"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'}],required:!1}},{key:"focused",value:{name:"boolean",required:!1}}]}}]}],raw:"ReadonlyArray<InteractiveMarkerType>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    answers: PerseusMatrixRubric["answers"];
}`,signature:{properties:[{key:"answers",value:{name:'intersection["answers"]',raw:'PerseusMatrixRubric["answers"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    isTickCrtl?: boolean;
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
}`,signature:{properties:[{key:"isTickCrtl",value:{name:"boolean",required:!1}},{key:"numLinePosition",value:{name:"number",required:!0}},{key:"rel",value:{name:"union",raw:'Relationship | "eq"',elements:[{name:"union",raw:'"lt" | "gt" | "le" | "ge"',elements:[{name:"literal",value:'"lt"'},{name:"literal",value:'"gt"'},{name:"literal",value:'"le"'},{name:"literal",value:'"ge"'}]},{name:"literal",value:'"eq"'}],required:!0}},{key:"numDivisions",value:{name:"number",required:!0}},{key:"divisionRange",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    current: ReadonlyArray<string>;
}`,signature:{properties:[{key:"current",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},{name:"signature",type:"object",raw:`{
    choicesSelected: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"choicesSelected",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    options: ReadonlyArray<string>;
    changed: boolean;
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>"}]},{name:"null"},{name:"undefined"}]}],raw:`ReadonlyArray<
    UserInputArray | UserInput | null | undefined
>`}},description:`Returns an array of the widget \`.getUserInput()\` results

TODO: can we remove this? Seems to be just for backwards
compatibility with old Perseus Chrome logging`},{name:"getUserInput",docblock:"Returns an object of the widget `.getUserInput()` results",modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:"{[widgetId: string]: UserInput | UserInputMap}",signature:{properties:[{key:{name:"string"},value:{name:"union",raw:"UserInput | UserInputMap",elements:[{name:"union",raw:`| PerseusCategorizerUserInput
| PerseusCSProgramUserInput
| PerseusDropdownUserInput
| PerseusExpressionUserInput
| PerseusGrapherUserInput
| PerseusIFrameUserInput
| PerseusInputNumberUserInput
| PerseusInteractiveGraphUserInput
| PerseusLabelImageUserInput
| PerseusMatcherUserInput
| PerseusMatrixUserInput
| PerseusNumberLineUserInput
| PerseusNumericInputUserInput
| PerseusOrdererUserInput
| PerseusPlotterUserInput
| PerseusRadioUserInput
| PerseusSorterUserInput
| PerseusTableUserInput`,elements:[{name:"signature",type:"object",raw:`{
    values: PerseusCategorizerScoringData["values"];
}`,signature:{properties:[{key:"values",value:{name:'intersection["values"]',raw:'PerseusCategorizerScoringData["values"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    value: number;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}}]}},{name:"string"},{name:"union",raw:'PerseusGrapherRubric["correct"]'},{name:"signature",type:"object",raw:`{
    status: UserInputStatus;
    message: string | null;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:'"correct" | "incorrect" | "incomplete"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"incomplete"'}],required:!0}},{key:"message",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}]},{name:"signature",type:"object",raw:`{
    markers: ReadonlyArray<InteractiveMarkerType>;
}`,signature:{properties:[{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`MarkerType & {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    // The list of correct answers expected for the marker.
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"showCorrectness",value:{name:"union",raw:'"correct" | "incorrect"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'}],required:!1}},{key:"focused",value:{name:"boolean",required:!1}}]}}]}],raw:"ReadonlyArray<InteractiveMarkerType>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    answers: PerseusMatrixRubric["answers"];
}`,signature:{properties:[{key:"answers",value:{name:'intersection["answers"]',raw:'PerseusMatrixRubric["answers"]',required:!0}}]}},{name:"signature",type:"object",raw:`{
    isTickCrtl?: boolean;
    numLinePosition: number;
    rel: Relationship | "eq";
    numDivisions: number;
    divisionRange: ReadonlyArray<number>;
}`,signature:{properties:[{key:"isTickCrtl",value:{name:"boolean",required:!1}},{key:"numLinePosition",value:{name:"number",required:!0}},{key:"rel",value:{name:"union",raw:'Relationship | "eq"',elements:[{name:"union",raw:'"lt" | "gt" | "le" | "ge"',elements:[{name:"literal",value:'"lt"'},{name:"literal",value:'"gt"'},{name:"literal",value:'"le"'},{name:"literal",value:'"ge"'}]},{name:"literal",value:'"eq"'}],required:!0}},{key:"numDivisions",value:{name:"number",required:!0}},{key:"divisionRange",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    current: ReadonlyArray<string>;
}`,signature:{properties:[{key:"current",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},{name:"signature",type:"object",raw:`{
    choicesSelected: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"choicesSelected",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    options: ReadonlyArray<string>;
    changed: boolean;
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>"}]},{name:"UserInputMap"}],required:!0}}]}}},description:"Returns an object of the widget `.getUserInput()` results"},{name:"getWidgetIds",docblock:`Returns an array of all widget IDs in the order they occur in
the question content.`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}},description:`Returns an array of all widget IDs in the order they occur in
the question content.`},{name:"getSerializedState",docblock:"Get a representation of the current state of the item.",modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    question: any;
    hints: any;
}`,signature:{properties:[{key:"question",value:{name:"any",required:!0}},{key:"hints",value:{name:"any",required:!0}}]}}},description:"Get a representation of the current state of the item."},{name:"restoreSerializedState",docblock:null,modifiers:[],params:[{name:"state",optional:!1,type:{name:"signature",type:"object",raw:`{
    question: any;
    hints: any;
}`,signature:{properties:[{key:"question",value:{name:"any",required:!0}},{key:"hints",value:{name:"any",required:!0}}]},alias:"SerializedState"}},{name:"callback",optional:!0,type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}}}],returns:null},{name:"showRationalesForCurrentlySelectedChoices",docblock:null,modifiers:[],params:[],returns:null},{name:"deselectIncorrectSelectedChoices",docblock:null,modifiers:[],params:[],returns:null},{name:"setAssetStatus",docblock:null,modifiers:[],params:[{name:"assetKey",optional:!1,type:null},{name:"status",optional:!1,type:null}],returns:null}],displayName:"ServerItemRenderer",props:{apiOptions:{defaultValue:{value:"{}",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1},onRendered:{defaultValue:{value:"(isRendered: boolean) => {}",computed:!1},required:!1}}};Ne.__docgenInfo={description:"",methods:[],displayName:"ref"};function ae(t){return{type:"success",value:t}}function K(t){return{type:"failure",detail:t}}function q(t){return t.type==="failure"}function M(t){return t.type==="success"}function Oe(t,r=o=>o){const o=[],m=[];for(const d of t)d.type==="success"?o.push(d.value):m.push(d.detail);return m.length>0?K(m.reduce(r)):ae(o)}const O=(t,r)=>r.success(t);function l(t){return(r,o)=>{if(!Array.isArray(r))return o.failure("array",r);const m=r.map((d,h)=>t(d,o.forSubtree(h)));return Oe(m,We)}}function We(t,r){return[...t,...r]}function i(t,r){return typeof t=="boolean"?r.success(t):r.failure("boolean",t)}function u(t){return(r,o)=>r!==t?o.failure(String(JSON.stringify(t)),r):o.success(t)}function w(...t){return(r,o)=>{if(typeof r=="string"){const d=t.indexOf(r);if(d>-1)return o.success(t[d])}const m=t.map(d=>JSON.stringify(d));return o.failure(m,r)}}function B(t){return t!=null&&Object.getPrototypeOf(t)===Object.prototype}function b(t){return(r,o)=>r===null?o.success(r):t(r,o)}const s=(t,r)=>typeof t=="number"?r.success(t):r.failure("number",t);function a(t){return(r,o)=>{if(!B(r))return o.failure("object",r);const m={...r},d=[];for(const[h,y]of Object.entries(t)){const c=y(r[h],o.forSubtree(h));M(c)?m[h]=c.value:d.push(...c.detail)}return d.length>0?K(d):o.success(m)}}function e(t){return(r,o)=>r===void 0?o.success(r):t(r,o)}function f(t,r){return(o,m)=>{if(!Array.isArray(o))return m.failure("array",o);if(o.length!==2)return m.failure("array of length 2",o);const[d,h]=o,y=t(d,m.forSubtree(0));if(q(y))return y;const c=r(h,m.forSubtree(1));return q(c)?c:m.success([y.value,c.value])}}function W(t){return new X(t)}class X{constructor(r){this.parser=r}then(r){return new X(Fe(this.parser,r))}}function Fe(t,r){return(o,m)=>{const d=t(o,m);return q(d)?d:r(d.value,m)}}function Y(t,r){return(o,m)=>{if(!B(o))return m.failure("object",o);const d={},h=[];for(const[y,c]of Object.entries(o)){const C=m.forSubtree(y),T=t(y,C);q(T)&&h.push(...T.detail);const P=r(c,C);q(P)&&h.push(...P.detail),M(T)&&M(P)&&(d[T.value]=P.value)}return h.length>0?K(h):m.success(d)}}const n=(t,r)=>typeof t=="string"?r.success(t):r.failure("string",t);function G(t,r,o){return(m,d)=>{if(!Array.isArray(m))return d.failure("array",m);if(m.length!==3)return d.failure("array of length 3",m);const h=t(m[0],d.forSubtree(0));if(q(h))return h;const y=r(m[1],d.forSubtree(1));if(q(y))return y;const c=o(m[2],d.forSubtree(2));return q(c)?c:d.success([h.value,y.value,c.value])}}function v(t){return new Q(t)}class Q{constructor(r){this.parser=r}or(r){return new Q(Le(this.parser,r))}}function Le(t,r){return(o,m)=>{const d=t(o,m);return M(d)?d:r(o,m)}}function k(t,r){return(o,m)=>o==null?ae(r(o)):t(o,m)}const se=k(Y(n,a({width:s,height:s})),()=>({}));function g(t,r){return a({type:t,static:e(i),graded:e(i),alignment:e(n),options:r,key:e(s),version:e(a({major:s,minor:s}))})}function oe(t,r,o){return a({type:r,static:e(i),graded:e(i),alignment:e(n),options:o,key:e(s),version:t})}const Me=g(u("categorizer"),a({items:l(n),categories:l(n),randomizeItems:i,static:k(i,()=>!1),values:l(s),highlightLint:e(i),linterContext:e(a({contentType:n,paths:l(n),stack:l(n)}))})),Ge=g(u("cs-program"),a({programID:n,programType:O,settings:l(a({name:n,value:n})),showEditor:i,showButtons:i,width:s,height:s,static:i})),De=g(u("definition"),a({togglePrompt:n,definition:n,static:k(i,()=>!1)})),Ee=g(u("dropdown"),a({placeholder:n,ariaLabel:e(n),visibleLabel:e(n),static:k(i,()=>!1),choices:l(a({content:n,correct:i}))})),Ue=g(u("explanation"),a({showPrompt:n,hidePrompt:n,explanation:n,widgets:(t,r)=>F(t,r),static:i})),Ve=a({value:n,form:i,simplify:i,considered:w("correct","wrong","ungraded"),key:W(e(v(n).or(s).parser)).then((t,r)=>r.success(String(t))).parser}),$e=oe(a({major:u(1),minor:s}),u("expression"),a({answerForms:l(Ve),functions:l(n),times:i,visibleLabel:e(n),ariaLabel:e(n),buttonSets:l(w("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),buttonsVisible:e(w("always","never","focused"))})),Je=oe(e(a({major:u(0),minor:s})),u("expression"),a({functions:l(n),times:i,visibleLabel:e(n),ariaLabel:e(n),form:i,simplify:i,value:n,buttonSets:l(w("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),buttonsVisible:e(w("always","never","focused"))}));function _e(t,r){const{options:o}=t;return r.success({...t,version:{major:1,minor:0},options:{times:o.times,buttonSets:o.buttonSets,functions:o.functions,buttonsVisible:o.buttonsVisible,visibleLabel:o.visibleLabel,ariaLabel:o.ariaLabel,answerForms:[{considered:"correct",form:o.form,simplify:o.simplify,value:o.value}]}})}const ze=v($e).or(W(Je).then(_e).parser).parser,E=k(a({content:k(n,()=>""),widgets:k((t,r)=>F(t,r),()=>({})),metadata:e(l(n)),images:se}),()=>({content:"",widgets:{},images:{}})),ie=a({title:k(n,()=>""),hasHint:e(b(i)),hint:e(b((t,r)=>E(t,r))),content:n,widgets:(t,r)=>F(t,r),widgetEnabled:e(b(i)),immutableWidgets:e(b(i)),images:Y(n,a({width:s,height:s}))}),He=g(u("graded-group"),ie),Ke=g(u("graded-group-set"),a({gradedGroups:l(ie)})),x=f(s,s),R=f(x,x),Be=g(u("grapher"),a({availableTypes:l(w("absolute_value","exponential","linear","logarithm","quadratic","sinusoid","tangent")),correct:v(a({type:u("absolute_value"),coords:R})).or(a({type:u("exponential"),asymptote:R,coords:R})).or(a({type:u("linear"),coords:R})).or(a({type:u("logarithm"),asymptote:R,coords:R})).or(a({type:u("quadratic"),coords:R})).or(a({type:u("sinusoid"),coords:R})).or(a({type:u("tangent"),coords:R})).parser,graph:a({backgroundImage:a({bottom:e(s),height:e(s),left:e(s),scale:e(s),url:e(b(n)),width:e(s)}),box:e(x),editableSettings:e(l(w("graph","snap","image","measure"))),gridStep:e(x),labels:f(n,n),markings:w("graph","none","grid"),range:f(x,x),rulerLabel:u(""),rulerTicks:s,showProtractor:e(i),showRuler:e(i),showTooltips:e(i),snapStep:e(x),step:x,valid:e(v(i).or(n).parser)})})),Xe=g(u("group"),(t,r)=>E(t,r)),Ye=g(u("iframe"),a({url:n,settings:l(a({name:n,value:n})),width:v(s).or(n).parser,height:v(s).or(n).parser,allowFullScreen:i,allowTopNavigation:e(i),static:k(i,()=>!1)})),Qe=(t,r)=>{if(typeof t=="number")return r.success(t);const o=+t;return t===""||isNaN(o)?r.failure("a number or numeric string",t):r.success(o)},j=W(v(s).or(n).parser).then(Qe).parser,U=a({url:e(b(n)),width:e(j),height:e(j),top:e(j),left:e(j),bottom:e(j),scale:e(j)}),J=f(s,s),Ze=g(u("image"),a({title:e(n),caption:e(n),alt:e(n),backgroundImage:U,static:e(i),labels:e(l(a({content:n,alignment:n,coordinates:l(s)}))),range:e(f(J,J)),box:e(J)})),en=(t,r)=>typeof t=="boolean"?r.success(String(t)):r.failure("boolean",t),nn=g(u("input-number"),a({answerType:e(w("number","decimal","integer","rational","improper","mixed","percent","pi")),inexact:e(i),maxError:e(v(s).or(n).parser),rightAlign:e(i),simplify:w("required","optional","enforced"),size:w("normal","small"),value:v(s).or(n).or(en).parser,customKeypad:e(i)})),N=f(s,s),rn=a({type:u("function"),key:n,options:a({value:n,funcName:n,rangeMin:n,rangeMax:n,color:n,strokeDasharray:n,strokeWidth:s})}),tn=a({type:u("label"),key:n,options:a({label:n,color:n,coordX:n,coordY:n})}),an=a({type:u("line"),key:n,options:a({color:n,startX:n,startY:n,endX:n,endY:n,strokeDasharray:n,strokeWidth:s,arrows:n})}),sn=a({type:u("movable-line"),key:n,options:a({startX:n,startY:n,startSubscript:s,endX:n,endY:n,endSubscript:s,constraint:n,snap:s,constraintFn:n,constraintXMin:n,constraintXMax:n,constraintYMin:n,constraintYMax:n})}),on=a({type:u("movable-point"),key:n,options:a({startX:n,startY:n,varSubscript:s,constraint:n,snap:s,constraintFn:n,constraintXMin:n,constraintXMax:n,constraintYMin:n,constraintYMax:n})}),un=a({type:u("parametric"),key:n,options:a({x:n,y:n,rangeMin:n,rangeMax:n,color:n,strokeDasharray:n,strokeWidth:s})}),ln=a({type:u("point"),key:n,options:a({color:n,coordX:n,coordY:n})}),mn=a({type:u("rectangle"),key:n,options:a({color:n,coordX:n,coordY:n,width:n,height:n})}),dn=g(u("interaction"),a({static:i,graph:a({editableSettings:e(l(w("canvas","graph"))),box:N,labels:l(n),range:f(N,N),gridStep:N,markings:w("graph","grid","none"),snapStep:e(N),valid:e(v(i).or(n).parser),backgroundImage:e(U),showProtractor:e(i),showRuler:e(i),rulerLabel:e(n),rulerTicks:e(s),tickStep:N}),elements:l(v(rn).or(tn).or(an).or(sn).or(on).or(un).or(ln).or(mn).parser)})),p=f(s,s),ee=a({type:u("angle"),showAngles:e(i),allowReflexAngles:e(i),angleOffsetDeg:e(s),snapDegrees:e(s),match:e(u("congruent")),coords:e(G(p,p,p)),startCoords:e(G(p,p,p))}),pn=a({type:u("circle"),center:e(p),radius:e(s),startCoords:e(a({center:p,radius:s})),coord:e(p)}),cn=a({type:u("linear"),coords:e(b(f(p,p))),startCoords:e(f(p,p)),coord:e(p)}),yn=a({type:u("linear-system"),coords:e(b(l(f(p,p)))),startCoords:e(l(f(p,p))),coord:e(p)}),gn=a({type:u("none")}),hn=a({type:u("point"),numPoints:e(v(s).or(u("unlimited")).parser),coords:e(b(l(p))),startCoords:e(l(p)),coord:e(p)}),wn=a({type:u("polygon"),numSides:e(v(s).or(u("unlimited")).parser),showAngles:e(i),showSides:e(i),snapTo:e(w("grid","angles","sides")),match:e(w("similar","congruent","approx")),startCoords:e(l(p)),coord:e(p)}),bn=a({type:u("quadratic"),coords:e(b(G(p,p,p))),startCoords:e(G(p,p,p)),coord:e(p)}),fn=a({type:u("ray"),coords:e(b(f(p,p))),startCoords:e(f(p,p)),coord:e(p)}),kn=a({type:u("segment"),numSegments:e(s),coords:e(b(l(f(p,p)))),startCoords:e(l(f(p,p))),coord:e(p)}),vn=a({type:u("sinusoid"),coords:e(b(l(p))),startCoords:e(l(p)),coord:e(p)}),ne=v(ee).or(ee).or(pn).or(cn).or(yn).or(gn).or(hn).or(wn).or(bn).or(fn).or(kn).or(vn).parser,I=w(...de),ue=w("none","white","translucent","solid"),V=w("solid","dashed"),S=a({type:u("label"),coord:p,text:n,color:I,size:w("small","medium","large")}),z=a({type:u("point"),coord:p,color:I,filled:i,labels:e(l(S)),ariaLabel:e(n)}),qn=a({type:u("line"),kind:w("line","ray","segment"),points:f(z,z),color:I,lineStyle:V,showPoint1:i,showPoint2:i,labels:e(l(S)),ariaLabel:e(n)}),Cn=a({type:u("vector"),points:f(p,p),color:I,labels:e(l(S)),ariaLabel:e(n)}),Rn=a({type:u("ellipse"),center:p,radius:p,angle:s,color:I,fillStyle:ue,strokeStyle:V,labels:e(l(S)),ariaLabel:e(n)}),An=a({type:u("polygon"),points:l(p),color:I,showVertices:i,fillStyle:ue,strokeStyle:V,labels:e(l(S)),ariaLabel:e(n)}),Tn=a({type:u("function"),color:I,strokeStyle:V,equation:n,directionalAxis:w("x","y"),domain:e(p),labels:e(l(S)),ariaLabel:e(n)}),Pn=v(z).or(qn).or(Cn).or(Rn).or(An).or(Tn).or(S).parser,xn=g(u("interactive-graph"),a({step:p,gridStep:e(p),snapStep:e(p),backgroundImage:e(U),markings:w("graph","grid","none"),labels:e(l(n)),showProtractor:i,showRuler:e(i),showTooltips:e(i),rulerLabel:e(n),rulerTicks:e(s),range:f(p,p),graph:k(ne,()=>({type:"linear"})),correct:ne,lockedFigures:e(l(Pn)),fullGraphLabel:e(n),fullGraphAriaDescription:e(n)})),In=g(u("label-image"),a({choices:l(n),imageUrl:n,imageAlt:n,imageHeight:s,imageWidth:s,markers:l(a({answers:l(n),label:n,x:s,y:s})),hideChoicesFromInstructions:i,multipleAnswers:i,static:i})),Sn=g(u("matcher"),a({labels:l(n),left:l(n),right:l(n),orderMatters:i,padding:i})),jn=g(k(u("matrix"),()=>"matrix"),a({prefix:e(n),suffix:e(n),answers:l(l(s)),cursorPosition:e(l(s)),matrixBoardSize:l(s),static:e(i)})),Nn=g(u("measurer"),a({image:U,showProtractor:i,showRuler:i,rulerLabel:n,rulerTicks:s,rulerPixels:s,rulerLength:s,box:f(s,s),static:i})),On=g(u("molecule-renderer"),a({widgetId:n,rotationAngle:e(s),smiles:e(n)})),Wn=g(u("number-line"),a({range:l(s),labelRange:l(b(s)),labelStyle:n,labelTicks:i,isTickCtrl:e(b(i)),divisionRange:l(s),numDivisions:e(b(s)),snapDivisions:k(s,()=>2),tickStep:e(b(s)),correctRel:e(b(n)),correctX:s,initialX:e(b(s)),showTooltip:e(i),static:i})),re=w("integer","mixed","improper","proper","decimal","percent","pi"),Fn=g(u("numeric-input"),a({answers:l(a({message:n,value:e(s),status:n,answerForms:e(l(re)),strict:i,maxError:e(b(s)),simplify:e(b(n))})),labelText:e(n),size:n,coefficient:i,rightAlign:e(i),static:k(i,()=>!1),answerForms:e(l(a({name:re,simplify:e(b(w("required","correct","enforced","optional")))})))}));function _(t,r){return E(t,r)}const Ln=(t,r)=>t==="large"?r.success("auto"):r.success(t),Mn=g(u("orderer"),a({options:k(l(_),()=>[]),correctOptions:l(_),otherOptions:l(_),height:W(w("normal","auto","large")).then(Ln).parser,layout:k(w("horizontal","vertical"),()=>"horizontal")})),Gn=g(u("passage-ref"),a({passageNumber:s,referenceNumber:s,summaryText:n})),Dn=g(u("passage"),a({footnotes:n,passageText:n,passageTitle:n,showLineNumbers:i,static:k(i,()=>!1)})),En=g(u("phet-simulation"),a({url:n,description:n})),Un=g(u("plotter"),a({labels:l(n),categories:l(n),type:w(...pe),maxY:s,scaleY:s,labelInterval:e(b(s)),snapsPerLine:s,starting:l(s),correct:l(s),picUrl:e(b(n)),picSize:e(b(s)),picBoxHeight:e(b(s)),plotDimensions:k(l(s),()=>[380,300])})),Vn=g(u("python-program"),a({programID:n,height:s})),$n=g(u("radio"),a({choices:l(a({content:k(n,()=>""),clue:e(n),correct:e(i),isNoneOfTheAbove:e(i),widgets:e((t,r)=>F(t,r))})),hasNoneOfTheAbove:e(i),countChoices:e(i),randomize:e(i),multipleSelect:e(i),deselectEnabled:e(i),onePerLine:e(i),displayCount:e(O),noneOfTheAbove:e(u(!1))})),Jn=g(u("sorter"),a({correct:l(n),padding:i,layout:w("horizontal","vertical")})),_n=g(u("table"),a({headers:l(n),rows:s,columns:s,answers:l(l(n))})),zn=g(u("video"),a({location:n,static:e(i)})),F=(t,r)=>{if(!B(t))return r.failure("PerseusWidgetsMap",t);const o={};for(const m of Object.keys(t)){const d=Hn([m,t[m]],o,r.forSubtree(m));if(q(d))return d}return r.success(o)},Hn=([t,r],o,m)=>{const d=Xn(t.split(" "),m);if(q(d))return d;const[h,y]=d.value;function c(C,T){const P=T(r,m);return q(P)?P:(o[C]=P.value,m.success(void 0))}switch(h){case"categorizer":return c(`categorizer ${y}`,Me);case"cs-program":return c(`cs-program ${y}`,Ge);case"definition":return c(`definition ${y}`,De);case"dropdown":return c(`dropdown ${y}`,Ee);case"explanation":return c(`explanation ${y}`,Ue);case"expression":return c(`expression ${y}`,ze);case"grapher":return c(`grapher ${y}`,Be);case"group":return c(`group ${y}`,Xe);case"graded-group":return c(`graded-group ${y}`,He);case"graded-group-set":return c(`graded-group-set ${y}`,Ke);case"iframe":return c(`iframe ${y}`,Ye);case"image":return c(`image ${y}`,Ze);case"input-number":return c(`input-number ${y}`,nn);case"interaction":return c(`interaction ${y}`,dn);case"interactive-graph":return c(`interactive-graph ${y}`,xn);case"label-image":return c(`label-image ${y}`,In);case"matcher":return c(`matcher ${y}`,Sn);case"matrix":return c(`matrix ${y}`,jn);case"measurer":return c(`measurer ${y}`,Nn);case"molecule-renderer":return c(`molecule-renderer ${y}`,On);case"number-line":return c(`number-line ${y}`,Wn);case"numeric-input":return c(`numeric-input ${y}`,Fn);case"orderer":return c(`orderer ${y}`,Mn);case"passage":return c(`passage ${y}`,Dn);case"passage-ref":return c(`passage-ref ${y}`,Gn);case"passage-ref-target":return c(`passage-ref-target ${y}`,O);case"phet-simulation":return c(`phet-simulation ${y}`,En);case"plotter":return c(`plotter ${y}`,Un);case"python-program":return c(`python-program ${y}`,Vn);case"radio":return c(`radio ${y}`,$n);case"sorter":return c(`sorter ${y}`,Jn);case"table":return c(`table ${y}`,_n);case"video":return c(`video ${y}`,zn);case"sequence":return c(`sequence ${y}`,Kn);default:return be(h)?c(`${h} ${y}`,O):m.failure("a valid widget type",h)}},Kn=g((t,r)=>r.success("deprecated-standin"),a({})),Bn=(t,r)=>typeof t!="string"||!/^[1-9][0-9]*$/.test(t)?r.failure("numeric string",t):r.success(+t),Xn=f(n,Bn),Yn=a({replace:e(i),content:n,widgets:k(F,()=>({})),metadata:e(l(n)),images:se});a({question:E,hints:k(l(Yn),()=>[]),answerArea:W(k(a({}),()=>({}))).then(Qn).then(Y(w(...ce),i)).parser,itemDataVersion:e(a({major:s,minor:s})),answer:O});function Qn(t,r){const{type:o,options:m,...d}=t;return r.success(d)}export{L as S,Pe as i,Ne as r};
