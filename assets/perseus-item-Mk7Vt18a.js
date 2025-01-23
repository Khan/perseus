import{a as be}from"./version-zYAx5FCH.js";import{_ as X}from"./index-default-4_ZsnO94.js";import{w as fe,J as we,H as ve,I as ke}from"./article-renderer-qLicaD7K.js";import{r as Re,t as qe,l as Pe,R as Ae,p as ie,v as Te}from"./renderer-wMIfRMtJ.js";import{j as T}from"./jsx-runtime-63Ea5SlK.js";import{l as le}from"./index-awljIyHI.js";import{r as V}from"./index-6oxdNXpR.js";import{c as Ie}from"./asset-context-H6Iqp7Gi.js";import{P as Se}from"./i18n-context-QDJ9FYgZ.js";import{D as Ce}from"./dependencies-CP7Uh8Kq.js";import{H as xe}from"./hints-renderer-nfWPPow8.js";import{A as Ne}from"./perseus-api-_PWPZoDE.js";import{U as je}from"./util-FOHsj4WS.js";const Oe="@khanacademy/perseus",We="__lib_version__";be(Oe,We);const Fe={major:0,minor:1};Re(fe);const Me=qe();Me["::renderer::"]=Fe;const De={onRendered:t=>{}},Le=V.createContext(De),_=class _ extends V.Component{constructor(n){super(n),this._handleFocusChange=(s,o)=>{s!=null?this._setCurrentFocus(s):this._onRendererBlur(o)},this.handleInteractWithWidget=s=>{var d,y;const o=X.difference(this.state.questionHighlightedWidgets,[s]);this.setState({questionCompleted:!1,questionHighlightedWidgets:o}),(y=(d=this.props.apiOptions)==null?void 0:d.interactionCallback)==null||y.call(d,this.questionRenderer.getUserInputMap())},this.setAssetStatus=(s,o)=>{const d={...this.state.assetStatuses,[s]:o};this.setState({assetStatuses:d})},this.state={questionCompleted:!1,questionHighlightedWidgets:[],assetStatuses:{}},this._fullyRendered=!1}componentDidMount(){this._currentFocus=null,this._fullyRendered=!1}UNSAFE_componentWillReceiveProps(n){this.setState({questionHighlightedWidgets:[]})}componentDidUpdate(n,s){const o=this.props.apiOptions.answerableCallback;if(o!=null){const d=this.questionRenderer.emptyWidgets().length===0;o(d)}if(this._fullyRendered||Object.values(this.state.assetStatuses).every(Boolean)&&(this._fullyRendered=!0,this.props.onRendered(!0)),this.props.score&&this.props.score!==n.score){const d=this.questionRenderer.emptyWidgets();this.setState({questionCompleted:this.props.score.correct,questionHighlightedWidgets:d})}}componentWillUnmount(){this.blurTimeoutID!=null&&(clearTimeout(this.blurTimeoutID),this.blurTimeoutID=null)}_setCurrentFocus(n){const{apiOptions:{isMobile:s,onFocusChange:o},keypadElement:d}=this.props,y=this._currentFocus;this._currentFocus=n;const c=this.getInputPaths(),m=this._currentFocus&&c.some(R=>je.inputPathsEqual(R,this._currentFocus));o!=null&&setTimeout(()=>{const R=d==null?void 0:d.getDOMNode(),I=R&&m?R.getBoundingClientRect().height:0;o(this._currentFocus,y,I,m&&this.questionRenderer.getDOMNodeForPath(n))},0),d&&s&&(m?d.activate():d.dismiss())}_onRendererBlur(n){const s=this._currentFocus;X.isEqual(n,s)&&(this.blurTimeoutID=setTimeout(()=>{X.isEqual(this._currentFocus,s)&&this._setCurrentFocus(null)},0))}_setWidgetProps(n,s,o){this.questionRenderer._setWidgetProps(n,s,o)}setInputValue(n,s,o){return this.questionRenderer.setInputValue(n,s,o)}focusPath(n){return this.questionRenderer.focusPath(n)}blurPath(n){return this.questionRenderer.blurPath(n)}getDOMNodeForPath(n){return this.questionRenderer.getDOMNodeForPath(n)}getInputPaths(){return this.questionRenderer.getInputPaths()}focus(){return this.questionRenderer.focus()}blur(){this._currentFocus&&this.blurPath(this._currentFocus)}getNumHints(){return this.props.item.hints.length}getPromptJSON(){return this.questionRenderer.getPromptJSON()}getUserInputLegacy(){return this.questionRenderer.getUserInput()}getUserInput(){return this.questionRenderer.getUserInputMap()}getWidgetIds(){return this.questionRenderer.getWidgetIds()}getSerializedState(){return{question:this.questionRenderer.getSerializedState(),hints:this.hintsRenderer.getSerializedState()}}restoreSerializedState(n,s){let o=2;const d=()=>{--o,s&&o===0&&s()};this.questionRenderer.restoreSerializedState(n.question,d),this.hintsRenderer.restoreSerializedState(n.hints,d)}showRationalesForCurrentlySelectedChoices(){this.questionRenderer.showRationalesForCurrentlySelectedChoices()}deselectIncorrectSelectedChoices(){this.questionRenderer.deselectIncorrectSelectedChoices()}render(){const n={...Ne.defaults,...this.props.apiOptions,onFocusChange:this._handleFocusChange},s={assetStatuses:this.state.assetStatuses,setAssetStatus:this.setAssetStatus},o=T.jsx(Ie.Provider,{value:s,children:T.jsx(Ae,{keypadElement:this.props.keypadElement,problemNum:this.props.problemNum,onInteractWithWidget:this.handleInteractWithWidget,highlightedWidgets:this.state.questionHighlightedWidgets,apiOptions:n,questionCompleted:this.state.questionCompleted,reviewMode:this.props.reviewMode,showSolutions:this.props.showSolutions,ref:y=>{y!=null&&(this.questionRenderer=y)},content:this.props.item.question.content,widgets:this.props.item.question.widgets,images:this.props.item.question.images,linterContext:ie(this.props.linterContext,"question"),strings:this.context.strings,...this.props.dependencies})}),d=T.jsx(xe,{hints:this.props.item.hints,hintsVisible:this.props.hintsVisible,apiOptions:n,ref:y=>this.hintsRenderer=y,linterContext:ie(this.props.linterContext,"hints"),strings:this.context.strings});return T.jsx(Ce.Provider,{value:this.props.dependencies,children:T.jsxs("div",{children:[T.jsx("div",{children:o}),T.jsx("div",{className:n.isMobile?void 0:le.css(Ee.hintsContainer),children:d})]})})}};_.contextType=Se,_.defaultProps={apiOptions:{},linterContext:Pe,onRendered:n=>{}};let B=_;const Ee=le.StyleSheet.create({hintsContainer:{marginLeft:50}}),Ue=V.forwardRef((t,n)=>T.jsx(Le.Consumer,{children:({onRendered:s})=>T.jsx(B,{...t,onRendered:s,ref:n})}));B.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"oldFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setWidgetProps",docblock:`Accepts a question area widgetId, or an answer area widgetId of
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
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
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
    mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:"false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean}",elements:[{name:"literal",value:"false"},{name:"signature",type:"object",raw:"{[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean}",signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof MafsGraphTypeFlags)[number]",required:!1},value:{name:"boolean"}}]}}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
| MockWidgetPromptJSON
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
      // If \`coords\` is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [vertex: Coord, secondPoint: Coord];
  }
| {
      type: "exponential";
      // Two points along the asymptote line. Usually (always?) a
      // horizontal or vertical line.
      asymptote: [Coord, Coord];
      // Two points along the exponential curve. One end of the curve
      // trends towards the asymptote.
      // If \`coords\` is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "linear";
      // Two points along the straight line
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "logarithm";
      // Two points along the asymptote line.
      asymptote: [Coord, Coord];
      // Two points along the logarithmic curve. One end of the curve
      // trends towards the asymptote.
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "quadratic";
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [vertex: Coord, secondPoint: Coord];
  }
| {
      type: "sinusoid";
      // Two points on the same slope in the sinusoid wave line.
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }
| {
      type: "tangent";
      // Two points on the same slope in the tangent wave line.
      // If coords is null, the graph will not be gradable. All answers
      // will be scored as invalid.
      coords: null | [Coord, Coord];
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "absolute_value";
    // If \`coords\` is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [vertex: Coord, secondPoint: Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"absolute_value"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [vertex: Coord, secondPoint: Coord]",elements:[{name:"null"},{name:"tuple",raw:"[vertex: Coord, secondPoint: Coord]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "exponential";
    // Two points along the asymptote line. Usually (always?) a
    // horizontal or vertical line.
    asymptote: [Coord, Coord];
    // Two points along the exponential curve. One end of the curve
    // trends towards the asymptote.
    // If \`coords\` is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"exponential"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // Two points along the straight line
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "logarithm";
    // Two points along the asymptote line.
    asymptote: [Coord, Coord];
    // Two points along the logarithmic curve. One end of the curve
    // trends towards the asymptote.
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"logarithm"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "quadratic";
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [vertex: Coord, secondPoint: Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [vertex: Coord, secondPoint: Coord]",elements:[{name:"null"},{name:"tuple",raw:"[vertex: Coord, secondPoint: Coord]",elements:[{name:"unknown"},{name:"unknown"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Two points on the same slope in the sinusoid wave line.
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tangent";
    // Two points on the same slope in the tangent wave line.
    // If coords is null, the graph will not be gradable. All answers
    // will be scored as invalid.
    coords: null | [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tangent"',required:!0}},{key:"coords",value:{name:"union",raw:"null | [Coord, Coord]",elements:[{name:"null"},{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}]}],required:!0}}]}}],required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
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
    type: "mock-widget";
    options: {
        value: string;
    };
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"mock-widget"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
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
@deprecated use getUserInput`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"UserInputArray | UserInput | null | undefined",elements:[{name:"UserInputArray"},{name:"UserInputRegistry[UserInputRegistry]",raw:"UserInputRegistry[keyof UserInputRegistry]"},{name:"null"},{name:"undefined"}]}],raw:`ReadonlyArray<
    UserInputArray | UserInput | null | undefined
>`}},description:`Returns an array of the widget \`.getUserInput()\` results

TODO: can we remove this? Seems to be just for backwards
compatibility with old Perseus Chrome logging`},{name:"getUserInput",docblock:"Returns an object of the widget `.getUserInput()` results",modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"UserInputRegistry",required:!0},value:{name:"UserInputRegistry[Property]",raw:"TRegistry[Property]"}}]}}},description:"Returns an object of the widget `.getUserInput()` results"},{name:"getWidgetIds",docblock:`Returns an array of all widget IDs in the order they occur in
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
}`,computed:!1},required:!1},onRendered:{defaultValue:{value:"(isRendered: boolean) => {}",computed:!1},required:!1}}};Ue.__docgenInfo={description:"",methods:[],displayName:"ref"};function de(t){return{type:"success",value:t}}function ee(t){return{type:"failure",detail:t}}function q(t){return t.type==="failure"}function $(t){return t.type==="success"}function Ge(t,n=s=>s){const s=[],o=[];for(const d of t)d.type==="success"?s.push(d.value):o.push(d.detail);return o.length>0?ee(o.reduce(n)):de(s)}const L=(t,n)=>n.success(t);function p(t){return(n,s)=>{if(!Array.isArray(n))return s.failure("array",n);const o=n.map((d,y)=>t(d,s.forSubtree(y)));return Ge(o,Be)}}function Be(t,n){return[...t,...n]}function u(t,n){return typeof t=="boolean"?n.success(t):n.failure("boolean",t)}function l(t){return(n,s)=>n!==t?s.failure(String(JSON.stringify(t)),n):s.success(t)}function w(...t){return(n,s)=>{if(typeof n=="string"){const d=t.indexOf(n);if(d>-1)return s.success(t[d])}const o=t.map(d=>JSON.stringify(d));return s.failure(o,n)}}function D(t){return t!=null&&Object.getPrototypeOf(t)===Object.prototype}function b(t){return(n,s)=>n===null?s.success(n):t(n,s)}const i=(t,n)=>typeof t=="number"?n.success(t):n.failure("number",t);function a(t){return(n,s)=>{if(!D(n))return s.failure("object",n);const o={...n},d=[];for(const[y,c]of Object.entries(t)){const m=c(n[y],s.forSubtree(y));$(m)?(m.value!==void 0||y in n)&&(o[y]=m.value):d.push(...m.detail)}return d.length>0?ee(d):s.success(o)}}function e(t){return(n,s)=>n===void 0?s.success(n):t(n,s)}function v(t,n){return(s,o)=>{if(!Array.isArray(s))return o.failure("array",s);if(s.length!==2)return o.failure("array of length 2",s);const[d,y]=s,c=t(d,o.forSubtree(0));if(q(c))return c;const m=n(y,o.forSubtree(1));return q(m)?m:o.success([c.value,m.value])}}function P(t){return new ne(t)}class ne{constructor(n){this.parser=n}then(n){return new ne($e(this.parser,n))}}function $e(t,n){return(s,o)=>{const d=t(s,o);return q(d)?d:n(d.value,o)}}function re(t,n){return(s,o)=>{if(!D(s))return o.failure("object",s);const d={},y=[];for(const[c,m]of Object.entries(s)){const R=o.forSubtree(c),I=t(c,R);q(I)&&y.push(...I.detail);const S=n(m,R);q(S)&&y.push(...S.detail),$(I)&&$(S)&&(d[I.value]=S.value)}return y.length>0?ee(y):o.success(d)}}const r=(t,n)=>typeof t=="string"?n.success(t):n.failure("string",t);function J(t,n,s){return(o,d)=>{if(!Array.isArray(o))return d.failure("array",o);if(o.length!==3)return d.failure("array of length 3",o);const y=t(o[0],d.forSubtree(0));if(q(y))return y;const c=n(o[1],d.forSubtree(1));if(q(c))return c;const m=s(o[2],d.forSubtree(2));return q(m)?m:d.success([y.value,c.value,m.value])}}function k(t){return new te(t)}class te{constructor(n){this.parser=n}or(n){return new te(Je(this.parser,n))}}function Je(t,n){return(s,o)=>{const d=t(s,o);return $(d)?d:n(s,o)}}function h(t,n){return(s,o)=>s==null?de(n(s)):t(s,o)}const pe=h(re(r,a({width:i,height:i})),()=>({}));function f(t,n){return a({type:t,static:e(u),graded:e(u),alignment:e(r),options:n,key:e(i),version:e(a({major:i,minor:i}))})}function me(t,n,s){return a({type:n,static:e(u),graded:e(u),alignment:e(r),options:s,key:e(i),version:t})}const _e=f(l("categorizer"),a({items:p(r),categories:p(r),randomizeItems:h(u,()=>!1),static:h(u,()=>!1),values:p(h(i,()=>0)),highlightLint:e(u),linterContext:e(a({contentType:r,paths:p(r),stack:p(r)}))})),ze=f(l("cs-program"),a({programID:r,programType:L,settings:p(a({name:r,value:r})),showEditor:u,showButtons:u,height:i,static:h(u,()=>!1)})),He=f(l("definition"),a({togglePrompt:r,definition:r,static:h(u,()=>!1)})),Ke=f(l("dropdown"),a({placeholder:h(r,()=>""),ariaLabel:e(r),visibleLabel:e(r),static:h(u,()=>!1),choices:p(a({content:r,correct:u}))})),Xe=f(l("explanation"),a({showPrompt:r,hidePrompt:r,explanation:r,widgets:h((t,n)=>E(t,n),()=>({})),static:h(u,()=>!1)}));function x(t){return(n,s)=>s.success(t(n))}function Ye(t,n){return new ae(t,n,s=>s,(s,o)=>o.failure("widget options with a known version number",s))}class ae{constructor(n,s,o,d){this.migrateToLatest=o,this.parseOtherVersions=d;const y=P(s).then(x(this.migrateToLatest)).parser;this.parser=(c,m)=>{if(!D(c))return m.failure("object",c);const R=Qe(c,m);return q(R)?R:R.value.version.major!==n?this.parseOtherVersions(c,m):y(c,m)}}withMigrationFrom(n,s,o){const d=this.parser,y=c=>this.migrateToLatest(o(c));return new ae(n,s,y,d)}}const Qe=a({version:h(a({major:i,minor:i}),()=>({major:0,minor:0}))}),Ze=k(r).or(i).or(l(null)).or(l(void 0)).parser,Ve=a({value:e(r),form:h(u,()=>!1),simplify:h(u,()=>!1),considered:w("correct","wrong","ungraded"),key:P(Ze).then(x(String)).parser});function en(t){const n=[];for(const s of t){const{value:o}=s;o!=null&&n.push({...s,value:o})}return n}const ce=h(p(w("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),()=>["basic","trig","prealgebra","logarithms"]),nn=a({major:l(1),minor:i}),rn=me(nn,l("expression"),a({answerForms:P(p(Ve)).then(x(en)).parser,functions:p(r),times:u,visibleLabel:e(r),ariaLabel:e(r),buttonSets:ce,buttonsVisible:e(w("always","never","focused"))})),tn=e(a({major:l(0),minor:i})),an=me(tn,l("expression"),a({functions:p(r),times:u,visibleLabel:e(r),ariaLabel:e(r),form:u,simplify:u,value:r,buttonSets:ce,buttonsVisible:e(w("always","never","focused"))}));function sn(t){const{options:n}=t;return{...t,version:{major:1,minor:0},options:{times:n.times,buttonSets:n.buttonSets,functions:n.functions,buttonsVisible:n.buttonsVisible,visibleLabel:n.visibleLabel,ariaLabel:n.ariaLabel,answerForms:[{considered:"correct",form:n.form,simplify:n.simplify,value:n.value}]}}}const on=Ye(1,rn).withMigrationFrom(0,an,sn).parser,un=P(l(!1)).then(x(()=>null)).parser,ge=a({title:h(r,()=>""),hasHint:e(b(u)),hint:k(un).or(l(null)).or(l(void 0)).or((t,n)=>M(t,n)).parser,content:r,widgets:(t,n)=>E(t,n),widgetEnabled:e(b(u)),immutableWidgets:e(b(u)),images:re(r,a({width:i,height:i}))}),ln=f(l("graded-group"),ge),dn=f(l("graded-group-set"),a({gradedGroups:p(ge)}));function z(t){const n=(s,o)=>D(s)?o.forSubtree(t).failure("a valid value",s[t]):o.failure("object",s);return new se(t,n)}class se{constructor(n,s){this.discriminantKey=n,this.parser=s}withBranch(n,s){const o=pn(this.discriminantKey,n,s,this.parser);return new se(this.discriminantKey,o)}}function pn(t,n,s,o){return(d,y)=>D(d)?d[t]===n?s(d,y):o(d,y):y.failure("object",d)}const C=v(i,i),A=v(C,C),mn=f(l("grapher"),a({availableTypes:p(w("absolute_value","exponential","linear","logarithm","quadratic","sinusoid","tangent")),correct:z("type").withBranch("absolute_value",a({type:l("absolute_value"),coords:b(A)})).withBranch("exponential",a({type:l("exponential"),asymptote:A,coords:b(A)})).withBranch("linear",a({type:l("linear"),coords:b(A)})).withBranch("logarithm",a({type:l("logarithm"),asymptote:A,coords:b(A)})).withBranch("quadratic",a({type:l("quadratic"),coords:b(A)})).withBranch("sinusoid",a({type:l("sinusoid"),coords:b(A)})).withBranch("tangent",a({type:l("tangent"),coords:b(A)})).parser,graph:a({backgroundImage:a({bottom:e(i),height:e(i),left:e(i),scale:e(i),url:e(b(r)),width:e(i)}),box:e(C),editableSettings:e(p(w("graph","snap","image","measure"))),gridStep:e(C),labels:v(r,r),markings:w("graph","none","grid"),range:v(C,C),rulerLabel:l(""),rulerTicks:i,showProtractor:e(u),showRuler:e(u),showTooltips:e(u),snapStep:e(C),step:C,valid:e(k(u).or(r).parser)})})),cn=f(l("group"),(t,n)=>M(t,n)),gn=f(l("iframe"),a({url:r,settings:e(p(a({name:r,value:r}))),width:k(i).or(r).parser,height:k(i).or(r).parser,allowFullScreen:h(u,()=>!1),allowTopNavigation:e(u),static:h(u,()=>!1)})),he=(t,n)=>{if(typeof t=="number")return n.success(t);const s=+t;return t===""||isNaN(s)?n.failure("a number or numeric string",t):n.success(s)};function hn(t){return t===""?0:t}const W=P(k(i).or(r).parser).then(x(hn)).then(he).parser,H=a({url:e(b(r)),width:e(W),height:e(W),top:e(W),left:e(W),bottom:e(W),scale:e(W)}),Y=v(i,i),yn=f(l("image"),a({title:e(r),caption:e(r),alt:e(r),backgroundImage:H,static:e(u),labels:e(p(a({content:r,alignment:r,coordinates:p(i)}))),range:e(v(Y,Y)),box:e(Y)})),bn=(t,n)=>typeof t=="boolean"?n.success(String(t)):n.failure("boolean",t),fn=f(l("input-number"),a({answerType:e(w("number","decimal","integer","rational","improper","mixed","percent","pi")),inexact:e(u),maxError:e(k(i).or(r).parser),rightAlign:e(u),simplify:w("required","optional","enforced"),size:w("normal","small"),value:k(i).or(r).or(bn).parser,customKeypad:e(u)})),F=v(i,i),U=h(r,()=>""),N=P(e(r)).then(x(String)).parser,wn=a({type:l("function"),key:N,options:a({value:r,funcName:r,rangeMin:r,rangeMax:r,color:r,strokeDasharray:r,strokeWidth:i})}),vn=a({type:l("label"),key:N,options:a({label:r,color:r,coordX:r,coordY:r})}),kn=a({type:l("line"),key:N,options:a({color:r,startX:r,startY:r,endX:r,endY:r,strokeDasharray:r,strokeWidth:i,arrows:r})}),Rn=a({type:l("movable-line"),key:N,options:a({startX:r,startY:r,startSubscript:i,endX:r,endY:r,endSubscript:i,constraint:r,snap:i,constraintFn:r,constraintXMin:r,constraintXMax:r,constraintYMin:r,constraintYMax:r})}),qn=a({type:l("movable-point"),key:N,options:a({startX:r,startY:r,varSubscript:i,constraint:r,snap:i,constraintFn:r,constraintXMin:U,constraintXMax:U,constraintYMin:U,constraintYMax:U})}),Pn=a({type:l("parametric"),key:N,options:a({x:r,y:r,rangeMin:r,rangeMax:r,color:r,strokeDasharray:r,strokeWidth:i})}),An=a({type:l("point"),key:N,options:a({color:r,coordX:r,coordY:r})}),Tn=a({type:l("rectangle"),key:N,options:a({color:r,coordX:r,coordY:r,width:r,height:r})}),In=f(l("interaction"),a({static:h(u,()=>!1),graph:a({editableSettings:e(p(w("canvas","graph"))),box:F,labels:p(r),range:v(F,F),gridStep:F,markings:w("graph","grid","none"),snapStep:e(F),valid:e(k(u).or(r).parser),backgroundImage:e(H),showProtractor:e(u),showRuler:e(u),rulerLabel:e(r),rulerTicks:e(i),tickStep:F}),elements:p(z("type").withBranch("function",wn).withBranch("label",vn).withBranch("line",kn).withBranch("movable-line",Rn).withBranch("movable-point",qn).withBranch("parametric",Pn).withBranch("point",An).withBranch("rectangle",Tn).parser)})),g=v(i,i),Sn=a({type:l("angle"),showAngles:e(u),allowReflexAngles:e(u),angleOffsetDeg:e(i),snapDegrees:e(i),match:e(l("congruent")),coords:e(J(g,g,g)),startCoords:e(J(g,g,g))}),Cn=a({type:l("circle"),center:e(g),radius:e(i),startCoords:e(a({center:g,radius:i})),coord:e(g)}),xn=a({type:l("linear"),coords:e(b(v(g,g))),startCoords:e(v(g,g)),coord:e(g)}),Nn=a({type:l("linear-system"),coords:e(b(p(v(g,g)))),startCoords:e(p(v(g,g))),coord:e(g)}),jn=a({type:l("none")}),On=a({type:l("point"),numPoints:e(k(i).or(l("unlimited")).parser),coords:e(b(p(g))),startCoords:e(p(g)),coord:e(g)}),Wn=a({type:l("polygon"),numSides:e(k(i).or(l("unlimited")).parser),showAngles:e(u),showSides:e(u),snapTo:e(w("grid","angles","sides")),match:e(w("similar","congruent","approx","exact")),startCoords:e(p(g)),coord:e(g)}),Fn=a({type:l("quadratic"),coords:e(b(J(g,g,g))),startCoords:e(J(g,g,g)),coord:e(g)}),Mn=a({type:l("ray"),coords:e(b(v(g,g))),startCoords:e(v(g,g)),coord:e(g)}),Dn=a({type:l("segment"),numSegments:e(i),coords:e(b(p(v(g,g)))),startCoords:e(p(v(g,g))),coord:e(g)}),Ln=a({type:l("sinusoid"),coords:e(b(p(g))),startCoords:e(p(g)),coord:e(g)}),oe=z("type").withBranch("angle",Sn).withBranch("circle",Cn).withBranch("linear",xn).withBranch("linear-system",Nn).withBranch("none",jn).withBranch("point",On).withBranch("polygon",Wn).withBranch("quadratic",Fn).withBranch("ray",Mn).withBranch("segment",Dn).withBranch("sinusoid",Ln).parser,j=w(...we),ye=w("none","white","translucent","solid"),K=w("solid","dashed"),O=a({type:l("label"),coord:g,text:r,color:j,size:w("small","medium","large")}),Z=a({type:l("point"),coord:g,color:j,filled:u,labels:e(p(O)),ariaLabel:e(r)}),En=a({type:l("line"),kind:w("line","ray","segment"),points:v(Z,Z),color:j,lineStyle:K,showPoint1:h(u,()=>!1),showPoint2:h(u,()=>!1),labels:e(p(O)),ariaLabel:e(r)}),Un=a({type:l("vector"),points:v(g,g),color:j,labels:e(p(O)),ariaLabel:e(r)}),Gn=a({type:l("ellipse"),center:g,radius:g,angle:i,color:j,fillStyle:ye,strokeStyle:K,labels:e(p(O)),ariaLabel:e(r)}),Bn=a({type:l("polygon"),points:p(g),color:j,showVertices:u,fillStyle:ye,strokeStyle:K,labels:e(p(O)),ariaLabel:e(r)}),$n=a({type:l("function"),color:j,strokeStyle:K,equation:r,directionalAxis:w("x","y"),domain:e(g),labels:e(p(O)),ariaLabel:e(r)}),Jn=z("type").withBranch("point",Z).withBranch("line",En).withBranch("vector",Un).withBranch("ellipse",Gn).withBranch("polygon",Bn).withBranch("function",$n).withBranch("label",O).parser,_n=f(l("interactive-graph"),a({step:g,gridStep:e(g),snapStep:e(g),backgroundImage:e(H),markings:w("graph","grid","none"),labels:e(p(r)),showProtractor:u,showRuler:e(u),showTooltips:e(u),rulerLabel:e(r),rulerTicks:e(i),range:v(g,g),graph:h(oe,()=>({type:"linear"})),correct:oe,lockedFigures:e(p(Jn)),fullGraphLabel:e(r),fullGraphAriaDescription:e(r)})),zn=f(l("label-image"),a({choices:p(r),imageUrl:r,imageAlt:r,imageHeight:i,imageWidth:i,markers:p(a({answers:p(r),label:r,x:i,y:i})),hideChoicesFromInstructions:u,multipleAnswers:u,static:h(u,()=>!1)})),Hn=f(l("matcher"),a({labels:p(r),left:p(r),right:p(r),orderMatters:u,padding:u})),Kn=k(i).or(r).parser,Xn=P(h(Kn,()=>NaN)).then(he).parser,Yn=f(h(l("matrix"),()=>"matrix"),a({prefix:e(r),suffix:e(r),answers:p(p(Xn)),cursorPosition:e(p(i)),matrixBoardSize:p(i),static:e(u)})),Qn=f(l("measurer"),a({image:h(H,()=>({url:null,top:0,left:0})),showProtractor:u,showRuler:u,rulerLabel:r,rulerTicks:i,rulerPixels:i,rulerLength:i,box:v(i,i),static:h(u,()=>!1)})),Zn=f(l("molecule-renderer"),a({widgetId:r,rotationAngle:e(i),smiles:e(r)})),Vn=P(l("")).then(x(()=>null)).parser,er=f(l("number-line"),a({range:p(i),labelRange:p(b(k(i).or(Vn).parser)),labelStyle:r,labelTicks:u,isTickCtrl:e(b(u)),divisionRange:p(i),numDivisions:e(b(i)),snapDivisions:h(i,()=>2),tickStep:e(b(i)),correctRel:e(b(r)),correctX:b(i),initialX:e(b(i)),showTooltip:e(u),static:h(u,()=>!1)})),ue=w("integer","mixed","improper","proper","decimal","percent","pi"),nr=f(l("numeric-input"),a({answers:p(a({message:r,value:e(b(i)),status:r,answerForms:e(p(ue)),strict:u,maxError:e(b(i)),simplify:e(b(k(r).or(P(u).then(x(String)).parser).parser))})),labelText:e(r),size:r,coefficient:h(u,()=>!1),rightAlign:e(u),static:h(u,()=>!1),answerForms:e(p(a({name:ue,simplify:e(b(w("required","correct","enforced","optional")))})))}));function Q(t,n){return M(t,n)}const rr=(t,n)=>t==="large"?n.success("auto"):n.success(t),tr=f(l("orderer"),a({options:h(p(Q),()=>[]),correctOptions:p(Q),otherOptions:p(Q),height:P(w("normal","auto","large")).then(rr).parser,layout:h(w("horizontal","vertical"),()=>"horizontal")})),ar=f(l("passage-ref"),a({passageNumber:i,referenceNumber:i,summaryText:e(r)})),sr=f(l("passage"),a({footnotes:h(r,()=>""),passageText:r,passageTitle:h(r,()=>""),showLineNumbers:u,static:h(u,()=>!1)})),ir=f(l("phet-simulation"),a({url:r,description:r})),or=f(l("plotter"),a({labels:p(r),categories:p(r),type:w(...ve),maxY:i,scaleY:h(i,()=>1),labelInterval:e(b(i)),snapsPerLine:h(i,()=>2),starting:p(i),correct:p(i),picUrl:e(b(r)),picSize:e(b(i)),picBoxHeight:e(b(i)),plotDimensions:h(p(i),()=>[380,300])})),ur=f(l("python-program"),a({programID:r,height:i})),lr=f(l("radio"),a({choices:p(a({content:h(r,()=>""),clue:e(r),correct:e(u),isNoneOfTheAbove:e(u),widgets:e((t,n)=>E(t,n))})),hasNoneOfTheAbove:e(u),countChoices:e(u),randomize:e(u),multipleSelect:e(u),deselectEnabled:e(u),onePerLine:e(u),displayCount:e(L),noneOfTheAbove:e(l(!1))})),dr=f(l("sorter"),a({correct:p(r),padding:u,layout:w("horizontal","vertical")})),pr=f(l("table"),a({headers:p(r),rows:i,columns:i,answers:p(p(r))})),mr=f(l("video"),a({location:r,static:e(u)})),E=(t,n)=>{if(!D(t))return n.failure("PerseusWidgetsMap",t);const s={};for(const o of Object.keys(t)){const d=cr([o,t[o]],s,n.forSubtree(o));if(q(d))return d}return n.success(s)},cr=([t,n],s,o)=>{const d=hr(t.split(" "),o.forSubtree("(widget ID)"));if(q(d))return d;const[y,c]=d.value;function m(R,I){const S=I(n,o);return q(S)?S:(s[R]=S.value,o.success(void 0))}switch(y){case"categorizer":return m(`categorizer ${c}`,_e);case"cs-program":return m(`cs-program ${c}`,ze);case"definition":return m(`definition ${c}`,He);case"dropdown":return m(`dropdown ${c}`,Ke);case"explanation":return m(`explanation ${c}`,Xe);case"expression":return m(`expression ${c}`,on);case"grapher":return m(`grapher ${c}`,mn);case"group":return m(`group ${c}`,cn);case"graded-group":return m(`graded-group ${c}`,ln);case"graded-group-set":return m(`graded-group-set ${c}`,dn);case"iframe":return m(`iframe ${c}`,gn);case"image":return m(`image ${c}`,yn);case"input-number":return m(`input-number ${c}`,fn);case"interaction":return m(`interaction ${c}`,In);case"interactive-graph":return m(`interactive-graph ${c}`,_n);case"label-image":return m(`label-image ${c}`,zn);case"matcher":return m(`matcher ${c}`,Hn);case"matrix":return m(`matrix ${c}`,Yn);case"measurer":return m(`measurer ${c}`,Qn);case"molecule-renderer":return m(`molecule-renderer ${c}`,Zn);case"number-line":return m(`number-line ${c}`,er);case"numeric-input":return m(`numeric-input ${c}`,nr);case"orderer":return m(`orderer ${c}`,tr);case"passage":return m(`passage ${c}`,sr);case"passage-ref":return m(`passage-ref ${c}`,ar);case"passage-ref-target":return m(`passage-ref-target ${c}`,L);case"phet-simulation":return m(`phet-simulation ${c}`,ir);case"plotter":return m(`plotter ${c}`,or);case"python-program":return m(`python-program ${c}`,ur);case"radio":return m(`radio ${c}`,lr);case"sorter":return m(`sorter ${c}`,dr);case"table":return m(`table ${c}`,pr);case"video":return m(`video ${c}`,mr);case"sequence":return m(`sequence ${c}`,G);case"lights-puzzle":return m(`lights-puzzle ${c}`,G);case"simulator":return m(`simulator ${c}`,G);case"transformer":return m(`transformer ${c}`,G);default:return Te(y)?m(`${y} ${c}`,L):o.failure("a valid widget type",y)}},G=f((t,n)=>n.success("deprecated-standin"),a({})),gr=(t,n)=>typeof t!="string"||!/^[1-9][0-9]*$/.test(t)?n.failure("a string representing a positive integer",t):n.success(+t),hr=v(r,gr),M=h(a({content:h(r,()=>""),widgets:h((t,n)=>E(t,n),()=>({})),metadata:e(p(r)),images:pe}),()=>({content:"",widgets:{},images:{}}));k(M).or(p(M)).parser;const yr=a({replace:e(u),content:r,widgets:h(E,()=>({})),metadata:e(p(r)),images:pe});a({question:M,hints:h(p(yr),()=>[]),answerArea:P(h(a({}),()=>({}))).then(br).then(re(w(...ke),u)).parser,itemDataVersion:e(a({major:i,minor:i})),answer:L});function br(t,n){const{type:s,options:o,...d}=t;return n.success(d)}export{B as S,Fe as i,Ue as r};
