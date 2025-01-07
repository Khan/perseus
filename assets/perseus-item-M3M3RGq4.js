import{a as he}from"./version-akiLXZts.js";import{w as we,F as be,B as fe,I as ke}from"./article-renderer-6DL34wtl.js";import{r as ve,t as qe,l as Ce,R as Re,p as se,v as Te}from"./renderer-GTfDWY1h.js";import{j as A}from"./jsx-runtime-63Ea5SlK.js";import{l as ue}from"./index-awljIyHI.js";import{r as Y}from"./index-6oxdNXpR.js";import{_ as z}from"./jquery-yG1GhClm.js";import{c as Ae}from"./asset-context-H6Iqp7Gi.js";import{P as Pe}from"./i18n-context-ei4f54eq.js";import{D as xe}from"./dependencies-CP7Uh8Kq.js";import{H as Ie}from"./hints-renderer-gQ8w2vuM.js";import{A as Se}from"./perseus-api-ooj0_ZRv.js";import{U as je}from"./util-_iDv4tVD.js";const Ne="@khanacademy/perseus",Oe="__lib_version__";he(Ne,Oe);const We={major:0,minor:1};ve(we);const Me=qe();Me["::renderer::"]=We;const Le={onRendered:t=>{}},Fe=Y.createContext(Le),V=class V extends Y.Component{constructor(r){super(r),this._handleFocusChange=(s,i)=>{s!=null?this._setCurrentFocus(s):this._onRendererBlur(i)},this.handleInteractWithWidget=s=>{var m,h;const i=z.difference(this.state.questionHighlightedWidgets,[s]);this.setState({questionCompleted:!1,questionHighlightedWidgets:i}),(h=(m=this.props.apiOptions)==null?void 0:m.interactionCallback)==null||h.call(m,this.questionRenderer.getUserInputMap())},this.setAssetStatus=(s,i)=>{const m={...this.state.assetStatuses,[s]:i};this.setState({assetStatuses:m})},this.state={questionCompleted:!1,questionHighlightedWidgets:[],assetStatuses:{}},this._fullyRendered=!1}componentDidMount(){this._currentFocus=null,this._fullyRendered=!1}UNSAFE_componentWillReceiveProps(r){this.setState({questionHighlightedWidgets:[]})}componentDidUpdate(r,s){const i=this.props.apiOptions.answerableCallback;if(i!=null){const m=this.questionRenderer.emptyWidgets().length===0;i(m)}if(this._fullyRendered||Object.values(this.state.assetStatuses).every(Boolean)&&(this._fullyRendered=!0,this.props.onRendered(!0)),this.props.score&&this.props.score!==r.score){const m=this.questionRenderer.emptyWidgets();this.setState({questionCompleted:this.props.score.correct,questionHighlightedWidgets:m})}}componentWillUnmount(){this.blurTimeoutID!=null&&(clearTimeout(this.blurTimeoutID),this.blurTimeoutID=null)}_setCurrentFocus(r){const{apiOptions:{isMobile:s,onFocusChange:i},keypadElement:m}=this.props,h=this._currentFocus;this._currentFocus=r;const p=this.getInputPaths(),c=this._currentFocus&&p.some(q=>je.inputPathsEqual(q,this._currentFocus));i!=null&&setTimeout(()=>{const q=m==null?void 0:m.getDOMNode(),P=q&&c?q.getBoundingClientRect().height:0;i(this._currentFocus,h,P,c&&this.questionRenderer.getDOMNodeForPath(r))},0),m&&s&&(c?m.activate():m.dismiss())}_onRendererBlur(r){const s=this._currentFocus;z.isEqual(r,s)&&(this.blurTimeoutID=setTimeout(()=>{z.isEqual(this._currentFocus,s)&&this._setCurrentFocus(null)},0))}_setWidgetProps(r,s,i){this.questionRenderer._setWidgetProps(r,s,i)}setInputValue(r,s,i){return this.questionRenderer.setInputValue(r,s,i)}focusPath(r){return this.questionRenderer.focusPath(r)}blurPath(r){return this.questionRenderer.blurPath(r)}getDOMNodeForPath(r){return this.questionRenderer.getDOMNodeForPath(r)}getInputPaths(){return this.questionRenderer.getInputPaths()}focus(){return this.questionRenderer.focus()}blur(){this._currentFocus&&this.blurPath(this._currentFocus)}getNumHints(){return this.props.item.hints.length}getPromptJSON(){return this.questionRenderer.getPromptJSON()}getUserInputLegacy(){return this.questionRenderer.getUserInput()}getUserInput(){return this.questionRenderer.getUserInputMap()}getWidgetIds(){return this.questionRenderer.getWidgetIds()}getSerializedState(){return{question:this.questionRenderer.getSerializedState(),hints:this.hintsRenderer.getSerializedState()}}restoreSerializedState(r,s){let i=2;const m=()=>{--i,s&&i===0&&s()};this.questionRenderer.restoreSerializedState(r.question,m),this.hintsRenderer.restoreSerializedState(r.hints,m)}showRationalesForCurrentlySelectedChoices(){this.questionRenderer.showRationalesForCurrentlySelectedChoices()}deselectIncorrectSelectedChoices(){this.questionRenderer.deselectIncorrectSelectedChoices()}render(){const r={...Se.defaults,...this.props.apiOptions,onFocusChange:this._handleFocusChange},s={assetStatuses:this.state.assetStatuses,setAssetStatus:this.setAssetStatus},i=A.jsx(Ae.Provider,{value:s,children:A.jsx(Re,{keypadElement:this.props.keypadElement,problemNum:this.props.problemNum,onInteractWithWidget:this.handleInteractWithWidget,highlightedWidgets:this.state.questionHighlightedWidgets,apiOptions:r,questionCompleted:this.state.questionCompleted,reviewMode:this.props.reviewMode,showSolutions:this.props.showSolutions,ref:h=>{h!=null&&(this.questionRenderer=h)},content:this.props.item.question.content,widgets:this.props.item.question.widgets,images:this.props.item.question.images,linterContext:se(this.props.linterContext,"question"),strings:this.context.strings,...this.props.dependencies})}),m=A.jsx(Ie,{hints:this.props.item.hints,hintsVisible:this.props.hintsVisible,apiOptions:r,ref:h=>this.hintsRenderer=h,linterContext:se(this.props.linterContext,"hints"),strings:this.context.strings});return A.jsx(xe.Provider,{value:this.props.dependencies,children:A.jsxs("div",{children:[A.jsx("div",{children:i}),A.jsx("div",{className:r.isMobile?void 0:ue.css(De.hintsContainer),children:m})]})})}};V.contextType=Pe,V.defaultProps={apiOptions:{},linterContext:Ce,onRendered:r=>{}};let E=V;const De=ue.StyleSheet.create({hintsContainer:{marginLeft:50}}),Ge=Y.forwardRef((t,r)=>A.jsx(Fe.Consumer,{children:({onRendered:s})=>A.jsx(E,{...t,onRendered:s,ref:r})}));E.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"oldFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setWidgetProps",docblock:`Accepts a question area widgetId, or an answer area widgetId of
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
    match?: "similar" | "congruent" | "approx" | "exact";
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
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
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
    match?: "similar" | "congruent" | "approx" | "exact";
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
    match?: "similar" | "congruent" | "approx" | "exact";
    coords?: ReadonlyArray<Coord> | null;
    // The initial coordinates the graph renders with.
    startCoords?: ReadonlyArray<Coord>;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx" | "exact"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'},{name:"literal",value:'"exact"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
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
}`,computed:!1},required:!1},onRendered:{defaultValue:{value:"(isRendered: boolean) => {}",computed:!1},required:!1}}};Ge.__docgenInfo={description:"",methods:[],displayName:"ref"};function le(t){return{type:"success",value:t}}function Q(t){return{type:"failure",detail:t}}function C(t){return t.type==="failure"}function U(t){return t.type==="success"}function Ee(t,r=s=>s){const s=[],i=[];for(const m of t)m.type==="success"?s.push(m.value):i.push(m.detail);return i.length>0?Q(i.reduce(r)):le(s)}const L=(t,r)=>r.success(t);function d(t){return(r,s)=>{if(!Array.isArray(r))return s.failure("array",r);const i=r.map((m,h)=>t(m,s.forSubtree(h)));return Ee(i,Ue)}}function Ue(t,r){return[...t,...r]}function u(t,r){return typeof t=="boolean"?r.success(t):r.failure("boolean",t)}function l(t){return(r,s)=>r!==t?s.failure(String(JSON.stringify(t)),r):s.success(t)}function b(...t){return(r,s)=>{if(typeof r=="string"){const m=t.indexOf(r);if(m>-1)return s.success(t[m])}const i=t.map(m=>JSON.stringify(m));return s.failure(i,r)}}function M(t){return t!=null&&Object.getPrototypeOf(t)===Object.prototype}function f(t){return(r,s)=>r===null?s.success(r):t(r,s)}const o=(t,r)=>typeof t=="number"?r.success(t):r.failure("number",t);function a(t){return(r,s)=>{if(!M(r))return s.failure("object",r);const i={...r},m=[];for(const[h,p]of Object.entries(t)){const c=p(r[h],s.forSubtree(h));U(c)?i[h]=c.value:m.push(...c.detail)}return m.length>0?Q(m):s.success(i)}}function e(t){return(r,s)=>r===void 0?s.success(r):t(r,s)}function k(t,r){return(s,i)=>{if(!Array.isArray(s))return i.failure("array",s);if(s.length!==2)return i.failure("array of length 2",s);const[m,h]=s,p=t(m,i.forSubtree(0));if(C(p))return p;const c=r(h,i.forSubtree(1));return C(c)?c:i.success([p.value,c.value])}}function R(t){return new Z(t)}class Z{constructor(r){this.parser=r}then(r){return new Z(Be(this.parser,r))}}function Be(t,r){return(s,i)=>{const m=t(s,i);return C(m)?m:r(m.value,i)}}function ee(t,r){return(s,i)=>{if(!M(s))return i.failure("object",s);const m={},h=[];for(const[p,c]of Object.entries(s)){const q=i.forSubtree(p),P=t(p,q);C(P)&&h.push(...P.detail);const x=r(c,q);C(x)&&h.push(...x.detail),U(P)&&U(x)&&(m[P.value]=x.value)}return h.length>0?Q(h):i.success(m)}}const n=(t,r)=>typeof t=="string"?r.success(t):r.failure("string",t);function B(t,r,s){return(i,m)=>{if(!Array.isArray(i))return m.failure("array",i);if(i.length!==3)return m.failure("array of length 3",i);const h=t(i[0],m.forSubtree(0));if(C(h))return h;const p=r(i[1],m.forSubtree(1));if(C(p))return p;const c=s(i[2],m.forSubtree(2));return C(c)?c:m.success([h.value,p.value,c.value])}}function v(t){return new ne(t)}class ne{constructor(r){this.parser=r}or(r){return new ne(Ve(this.parser,r))}}function Ve(t,r){return(s,i)=>{const m=t(s,i);return U(m)?m:r(s,i)}}function g(t,r){return(s,i)=>s==null?le(r(s)):t(s,i)}const me=g(ee(n,a({width:o,height:o})),()=>({}));function w(t,r){return a({type:t,static:e(u),graded:e(u),alignment:e(n),options:r,key:e(o),version:e(a({major:o,minor:o}))})}function de(t,r,s){return a({type:r,static:e(u),graded:e(u),alignment:e(n),options:s,key:e(o),version:t})}const $e=w(l("categorizer"),a({items:d(n),categories:d(n),randomizeItems:g(u,()=>!1),static:g(u,()=>!1),values:d(g(o,()=>0)),highlightLint:e(u),linterContext:e(a({contentType:n,paths:d(n),stack:d(n)}))})),Je=w(l("cs-program"),a({programID:n,programType:L,settings:d(a({name:n,value:n})),showEditor:u,showButtons:u,width:o,height:o,static:g(u,()=>!1)})),_e=w(l("definition"),a({togglePrompt:n,definition:n,static:g(u,()=>!1)})),ze=w(l("dropdown"),a({placeholder:g(n,()=>""),ariaLabel:e(n),visibleLabel:e(n),static:g(u,()=>!1),choices:d(a({content:n,correct:u}))})),He=w(l("explanation"),a({showPrompt:n,hidePrompt:n,explanation:n,widgets:g((t,r)=>F(t,r),()=>({})),static:g(u,()=>!1)}));function S(t){return(r,s)=>s.success(t(r))}function Ke(t,r){return new re(t,r,s=>s,(s,i)=>i.failure("widget options with a known version number",s))}class re{constructor(r,s,i,m){this.migrateToLatest=i,this.parseOtherVersions=m;const h=R(s).then(S(this.migrateToLatest)).parser;this.parser=(p,c)=>{if(!M(p))return c.failure("object",p);const q=Xe(p,c);return C(q)?q:q.value.version.major!==r?this.parseOtherVersions(p,c):h(p,c)}}withMigrationFrom(r,s,i){const m=this.parser,h=p=>this.migrateToLatest(i(p));return new re(r,s,h,m)}}const Xe=a({version:g(a({major:o,minor:o}),()=>({major:0,minor:0}))}),Ye=v(n).or(o).or(l(null)).or(l(void 0)).parser,Qe=a({value:e(n),form:g(u,()=>!1),simplify:g(u,()=>!1),considered:b("correct","wrong","ungraded"),key:R(Ye).then(S(String)).parser});function Ze(t){const r=[];for(const s of t){const{value:i}=s;i!=null&&r.push({...s,value:i})}return r}const pe=g(d(b("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),()=>["basic","trig","prealgebra","logarithms"]),en=a({major:l(1),minor:o}),nn=de(en,l("expression"),a({answerForms:R(d(Qe)).then(S(Ze)).parser,functions:d(n),times:u,visibleLabel:e(n),ariaLabel:e(n),buttonSets:pe,buttonsVisible:e(b("always","never","focused"))})),rn=e(a({major:l(0),minor:o})),tn=de(rn,l("expression"),a({functions:d(n),times:u,visibleLabel:e(n),ariaLabel:e(n),form:u,simplify:u,value:n,buttonSets:pe,buttonsVisible:e(b("always","never","focused"))}));function an(t){const{options:r}=t;return{...t,version:{major:1,minor:0},options:{times:r.times,buttonSets:r.buttonSets,functions:r.functions,buttonsVisible:r.buttonsVisible,visibleLabel:r.visibleLabel,ariaLabel:r.ariaLabel,answerForms:[{considered:"correct",form:r.form,simplify:r.simplify,value:r.value}]}}}const sn=Ke(1,nn).withMigrationFrom(0,tn,an).parser,$=g(a({content:g(n,()=>""),widgets:g((t,r)=>F(t,r),()=>({})),metadata:e(d(n)),images:me}),()=>({content:"",widgets:{},images:{}})),on=R(l(!1)).then(S(()=>null)).parser,ce=a({title:g(n,()=>""),hasHint:e(f(u)),hint:v(on).or(l(null)).or(l(void 0)).or((t,r)=>$(t,r)).parser,content:n,widgets:(t,r)=>F(t,r),widgetEnabled:e(f(u)),immutableWidgets:e(f(u)),images:ee(n,a({width:o,height:o}))}),un=w(l("graded-group"),ce),ln=w(l("graded-group-set"),a({gradedGroups:d(ce)}));function te(t){const r=(s,i)=>M(s)?i.forSubtree(t).failure("a valid value",s[t]):i.failure("object",s);return new ae(t,r)}class ae{constructor(r,s){this.discriminantKey=r,this.parser=s}withBranch(r,s){const i=mn(this.discriminantKey,r,s,this.parser);return new ae(this.discriminantKey,i)}}function mn(t,r,s,i){return(m,h)=>M(m)?m[t]===r?s(m,h):i(m,h):h.failure("object",m)}const I=k(o,o),T=k(I,I),dn=w(l("grapher"),a({availableTypes:d(b("absolute_value","exponential","linear","logarithm","quadratic","sinusoid","tangent")),correct:te("type").withBranch("absolute_value",a({type:l("absolute_value"),coords:T})).withBranch("exponential",a({type:l("exponential"),asymptote:T,coords:T})).withBranch("linear",a({type:l("linear"),coords:g(T,()=>[[-5,5],[5,5]])})).withBranch("logarithm",a({type:l("logarithm"),asymptote:T,coords:T})).withBranch("quadratic",a({type:l("quadratic"),coords:T})).withBranch("sinusoid",a({type:l("sinusoid"),coords:T})).withBranch("tangent",a({type:l("tangent"),coords:T})).parser,graph:a({backgroundImage:a({bottom:e(o),height:e(o),left:e(o),scale:e(o),url:e(f(n)),width:e(o)}),box:e(I),editableSettings:e(d(b("graph","snap","image","measure"))),gridStep:e(I),labels:k(n,n),markings:b("graph","none","grid"),range:k(I,I),rulerLabel:l(""),rulerTicks:o,showProtractor:e(u),showRuler:e(u),showTooltips:e(u),snapStep:e(I),step:I,valid:e(v(u).or(n).parser)})})),pn=w(l("group"),(t,r)=>$(t,r)),cn=w(l("iframe"),a({url:n,settings:d(a({name:n,value:n})),width:v(o).or(n).parser,height:v(o).or(n).parser,allowFullScreen:u,allowTopNavigation:e(u),static:g(u,()=>!1)})),ye=(t,r)=>{if(typeof t=="number")return r.success(t);const s=+t;return t===""||isNaN(s)?r.failure("a number or numeric string",t):r.success(s)};function yn(t){return t===""?0:t}const O=R(v(o).or(n).parser).then(S(yn)).then(ye).parser,J=a({url:e(f(n)),width:e(O),height:e(O),top:e(O),left:e(O),bottom:e(O),scale:e(O)}),H=k(o,o),gn=w(l("image"),a({title:e(n),caption:e(n),alt:e(n),backgroundImage:J,static:e(u),labels:e(d(a({content:n,alignment:n,coordinates:d(o)}))),range:e(k(H,H)),box:e(H)})),hn=(t,r)=>typeof t=="boolean"?r.success(String(t)):r.failure("boolean",t),wn=w(l("input-number"),a({answerType:e(b("number","decimal","integer","rational","improper","mixed","percent","pi")),inexact:e(u),maxError:e(v(o).or(n).parser),rightAlign:e(u),simplify:b("required","optional","enforced"),size:b("normal","small"),value:v(o).or(n).or(hn).parser,customKeypad:e(u)})),W=k(o,o),D=g(n,()=>""),bn=l("function"),fn=a({type:bn,key:n,options:a({value:n,funcName:n,rangeMin:n,rangeMax:n,color:n,strokeDasharray:n,strokeWidth:o})}),kn=l("label"),vn=a({type:kn,key:n,options:a({label:n,color:n,coordX:n,coordY:n})}),qn=l("line"),Cn=a({type:qn,key:n,options:a({color:n,startX:n,startY:n,endX:n,endY:n,strokeDasharray:n,strokeWidth:o,arrows:n})}),Rn=l("movable-line"),Tn=a({type:Rn,key:n,options:a({startX:n,startY:n,startSubscript:o,endX:n,endY:n,endSubscript:o,constraint:n,snap:o,constraintFn:n,constraintXMin:n,constraintXMax:n,constraintYMin:n,constraintYMax:n})}),An=l("movable-point"),Pn=a({type:An,key:n,options:a({startX:n,startY:n,varSubscript:o,constraint:n,snap:o,constraintFn:n,constraintXMin:D,constraintXMax:D,constraintYMin:D,constraintYMax:D})}),xn=l("parametric"),In=a({type:xn,key:n,options:a({x:n,y:n,rangeMin:n,rangeMax:n,color:n,strokeDasharray:n,strokeWidth:o})}),Sn=l("point"),jn=a({type:Sn,key:n,options:a({color:n,coordX:n,coordY:n})}),Nn=l("rectangle"),On=a({type:Nn,key:n,options:a({color:n,coordX:n,coordY:n,width:n,height:n})}),Wn=w(l("interaction"),a({static:g(u,()=>!1),graph:a({editableSettings:e(d(b("canvas","graph"))),box:W,labels:d(n),range:k(W,W),gridStep:W,markings:b("graph","grid","none"),snapStep:e(W),valid:e(v(u).or(n).parser),backgroundImage:e(J),showProtractor:e(u),showRuler:e(u),rulerLabel:e(n),rulerTicks:e(o),tickStep:W}),elements:d(te("type").withBranch("function",fn).withBranch("label",vn).withBranch("line",Cn).withBranch("movable-line",Tn).withBranch("movable-point",Pn).withBranch("parametric",In).withBranch("point",jn).withBranch("rectangle",On).parser)})),y=k(o,o),Mn=a({type:l("angle"),showAngles:e(u),allowReflexAngles:e(u),angleOffsetDeg:e(o),snapDegrees:e(o),match:e(l("congruent")),coords:e(B(y,y,y)),startCoords:e(B(y,y,y))}),Ln=a({type:l("circle"),center:e(y),radius:e(o),startCoords:e(a({center:y,radius:o})),coord:e(y)}),Fn=a({type:l("linear"),coords:e(f(k(y,y))),startCoords:e(k(y,y)),coord:e(y)}),Dn=a({type:l("linear-system"),coords:e(f(d(k(y,y)))),startCoords:e(d(k(y,y))),coord:e(y)}),Gn=a({type:l("none")}),En=a({type:l("point"),numPoints:e(v(o).or(l("unlimited")).parser),coords:e(f(d(y))),startCoords:e(d(y)),coord:e(y)}),Un=a({type:l("polygon"),numSides:e(v(o).or(l("unlimited")).parser),showAngles:e(u),showSides:e(u),snapTo:e(b("grid","angles","sides")),match:e(b("similar","congruent","approx","exact")),startCoords:e(d(y)),coord:e(y)}),Bn=a({type:l("quadratic"),coords:e(f(B(y,y,y))),startCoords:e(B(y,y,y)),coord:e(y)}),Vn=a({type:l("ray"),coords:e(f(k(y,y))),startCoords:e(k(y,y)),coord:e(y)}),$n=a({type:l("segment"),numSegments:e(o),coords:e(f(d(k(y,y)))),startCoords:e(d(k(y,y))),coord:e(y)}),Jn=a({type:l("sinusoid"),coords:e(f(d(y))),startCoords:e(d(y)),coord:e(y)}),oe=te("type").withBranch("angle",Mn).withBranch("circle",Ln).withBranch("linear",Fn).withBranch("linear-system",Dn).withBranch("none",Gn).withBranch("point",En).withBranch("polygon",Un).withBranch("quadratic",Bn).withBranch("ray",Vn).withBranch("segment",$n).withBranch("sinusoid",Jn).parser,j=b(...be),ge=b("none","white","translucent","solid"),_=b("solid","dashed"),N=a({type:l("label"),coord:y,text:n,color:j,size:b("small","medium","large")}),X=a({type:l("point"),coord:y,color:j,filled:u,labels:e(d(N)),ariaLabel:e(n)}),_n=a({type:l("line"),kind:b("line","ray","segment"),points:k(X,X),color:j,lineStyle:_,showPoint1:u,showPoint2:u,labels:e(d(N)),ariaLabel:e(n)}),zn=a({type:l("vector"),points:k(y,y),color:j,labels:e(d(N)),ariaLabel:e(n)}),Hn=a({type:l("ellipse"),center:y,radius:y,angle:o,color:j,fillStyle:ge,strokeStyle:_,labels:e(d(N)),ariaLabel:e(n)}),Kn=a({type:l("polygon"),points:d(y),color:j,showVertices:u,fillStyle:ge,strokeStyle:_,labels:e(d(N)),ariaLabel:e(n)}),Xn=a({type:l("function"),color:j,strokeStyle:_,equation:n,directionalAxis:b("x","y"),domain:e(y),labels:e(d(N)),ariaLabel:e(n)}),Yn=v(X).or(_n).or(zn).or(Hn).or(Kn).or(Xn).or(N).parser,Qn=w(l("interactive-graph"),a({step:y,gridStep:e(y),snapStep:e(y),backgroundImage:e(J),markings:b("graph","grid","none"),labels:e(d(n)),showProtractor:u,showRuler:e(u),showTooltips:e(u),rulerLabel:e(n),rulerTicks:e(o),range:k(y,y),graph:g(oe,()=>({type:"linear"})),correct:oe,lockedFigures:e(d(Yn)),fullGraphLabel:e(n),fullGraphAriaDescription:e(n)})),Zn=w(l("label-image"),a({choices:d(n),imageUrl:n,imageAlt:n,imageHeight:o,imageWidth:o,markers:d(a({answers:d(n),label:n,x:o,y:o})),hideChoicesFromInstructions:u,multipleAnswers:u,static:g(u,()=>!1)})),er=w(l("matcher"),a({labels:d(n),left:d(n),right:d(n),orderMatters:u,padding:u})),nr=v(o).or(n).parser,rr=R(g(nr,()=>NaN)).then(ye).parser,tr=w(g(l("matrix"),()=>"matrix"),a({prefix:e(n),suffix:e(n),answers:d(d(rr)),cursorPosition:e(d(o)),matrixBoardSize:d(o),static:e(u)})),ar=w(l("measurer"),a({image:J,showProtractor:u,showRuler:u,rulerLabel:n,rulerTicks:o,rulerPixels:o,rulerLength:o,box:k(o,o),static:g(u,()=>!1)})),sr=w(l("molecule-renderer"),a({widgetId:n,rotationAngle:e(o),smiles:e(n)})),or=R(l("")).then(S(()=>null)).parser,ir=w(l("number-line"),a({range:d(o),labelRange:d(f(v(o).or(or).parser)),labelStyle:n,labelTicks:u,isTickCtrl:e(f(u)),divisionRange:d(o),numDivisions:e(f(o)),snapDivisions:g(o,()=>2),tickStep:e(f(o)),correctRel:e(f(n)),correctX:f(o),initialX:e(f(o)),showTooltip:e(u),static:g(u,()=>!1)})),ie=b("integer","mixed","improper","proper","decimal","percent","pi"),ur=w(l("numeric-input"),a({answers:d(a({message:n,value:e(f(o)),status:n,answerForms:e(d(ie)),strict:u,maxError:e(f(o)),simplify:e(f(v(n).or(R(u).then(S(String)).parser).parser))})),labelText:e(n),size:n,coefficient:g(u,()=>!1),rightAlign:e(u),static:g(u,()=>!1),answerForms:e(d(a({name:ie,simplify:e(f(b("required","correct","enforced","optional")))})))}));function K(t,r){return $(t,r)}const lr=(t,r)=>t==="large"?r.success("auto"):r.success(t),mr=w(l("orderer"),a({options:g(d(K),()=>[]),correctOptions:d(K),otherOptions:d(K),height:R(b("normal","auto","large")).then(lr).parser,layout:g(b("horizontal","vertical"),()=>"horizontal")})),dr=w(l("passage-ref"),a({passageNumber:o,referenceNumber:o,summaryText:e(n)})),pr=w(l("passage"),a({footnotes:g(n,()=>""),passageText:n,passageTitle:g(n,()=>""),showLineNumbers:u,static:g(u,()=>!1)})),cr=w(l("phet-simulation"),a({url:n,description:n})),yr=w(l("plotter"),a({labels:d(n),categories:d(n),type:b(...fe),maxY:o,scaleY:o,labelInterval:e(f(o)),snapsPerLine:o,starting:d(o),correct:d(o),picUrl:e(f(n)),picSize:e(f(o)),picBoxHeight:e(f(o)),plotDimensions:g(d(o),()=>[380,300])})),gr=w(l("python-program"),a({programID:n,height:o})),hr=w(l("radio"),a({choices:d(a({content:g(n,()=>""),clue:e(n),correct:e(u),isNoneOfTheAbove:e(u),widgets:e((t,r)=>F(t,r))})),hasNoneOfTheAbove:e(u),countChoices:e(u),randomize:e(u),multipleSelect:e(u),deselectEnabled:e(u),onePerLine:e(u),displayCount:e(L),noneOfTheAbove:e(l(!1))})),wr=w(l("sorter"),a({correct:d(n),padding:u,layout:b("horizontal","vertical")})),br=w(l("table"),a({headers:d(n),rows:o,columns:o,answers:d(d(n))})),fr=w(l("video"),a({location:n,static:e(u)})),F=(t,r)=>{if(!M(t))return r.failure("PerseusWidgetsMap",t);const s={};for(const i of Object.keys(t)){const m=kr([i,t[i]],s,r.forSubtree(i));if(C(m))return m}return r.success(s)},kr=([t,r],s,i)=>{const m=qr(t.split(" "),i);if(C(m))return m;const[h,p]=m.value;function c(q,P){const x=P(r,i);return C(x)?x:(s[q]=x.value,i.success(void 0))}switch(h){case"categorizer":return c(`categorizer ${p}`,$e);case"cs-program":return c(`cs-program ${p}`,Je);case"definition":return c(`definition ${p}`,_e);case"dropdown":return c(`dropdown ${p}`,ze);case"explanation":return c(`explanation ${p}`,He);case"expression":return c(`expression ${p}`,sn);case"grapher":return c(`grapher ${p}`,dn);case"group":return c(`group ${p}`,pn);case"graded-group":return c(`graded-group ${p}`,un);case"graded-group-set":return c(`graded-group-set ${p}`,ln);case"iframe":return c(`iframe ${p}`,cn);case"image":return c(`image ${p}`,gn);case"input-number":return c(`input-number ${p}`,wn);case"interaction":return c(`interaction ${p}`,Wn);case"interactive-graph":return c(`interactive-graph ${p}`,Qn);case"label-image":return c(`label-image ${p}`,Zn);case"matcher":return c(`matcher ${p}`,er);case"matrix":return c(`matrix ${p}`,tr);case"measurer":return c(`measurer ${p}`,ar);case"molecule-renderer":return c(`molecule-renderer ${p}`,sr);case"number-line":return c(`number-line ${p}`,ir);case"numeric-input":return c(`numeric-input ${p}`,ur);case"orderer":return c(`orderer ${p}`,mr);case"passage":return c(`passage ${p}`,pr);case"passage-ref":return c(`passage-ref ${p}`,dr);case"passage-ref-target":return c(`passage-ref-target ${p}`,L);case"phet-simulation":return c(`phet-simulation ${p}`,cr);case"plotter":return c(`plotter ${p}`,yr);case"python-program":return c(`python-program ${p}`,gr);case"radio":return c(`radio ${p}`,hr);case"sorter":return c(`sorter ${p}`,wr);case"table":return c(`table ${p}`,br);case"video":return c(`video ${p}`,fr);case"sequence":return c(`sequence ${p}`,G);case"lights-puzzle":return c(`lights-puzzle ${p}`,G);case"simulator":return c(`simulator ${p}`,G);case"transformer":return c(`transformer ${p}`,G);default:return Te(h)?c(`${h} ${p}`,L):i.failure("a valid widget type",h)}},G=w((t,r)=>r.success("deprecated-standin"),a({})),vr=(t,r)=>typeof t!="string"||!/^[1-9][0-9]*$/.test(t)?r.failure("numeric string",t):r.success(+t),qr=k(n,vr),Cr=a({replace:e(u),content:n,widgets:g(F,()=>({})),metadata:e(d(n)),images:me});a({question:$,hints:g(d(Cr),()=>[]),answerArea:R(g(a({}),()=>({}))).then(Rr).then(ee(b(...ke),u)).parser,itemDataVersion:e(a({major:o,minor:o})),answer:L});function Rr(t,r){const{type:s,options:i,...m}=t;return r.success(m)}export{E as S,We as i,Ge as r};
