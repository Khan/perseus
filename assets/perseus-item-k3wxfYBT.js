import{a as Ne}from"./version-akiLXZts.js";import{w as Fe,F as De,B as Oe,I as Me}from"./article-renderer-jzdHncLR.js";import{r as _e,o as He,l as Le,s as Ge,R as ke,p as fe,q as Ue}from"./renderer-YHYhEo5S.js";import{j as q}from"./jsx-runtime-63Ea5SlK.js";import{l as Y}from"./index-awljIyHI.js";import{r as Q}from"./index-6oxdNXpR.js";import{_ as te}from"./jquery-yG1GhClm.js";import{c as ze}from"./asset-context-H6Iqp7Gi.js";import{P as Te}from"./i18n-context-fsWEgybQ.js";import{D as Re}from"./dependencies-CP7Uh8Kq.js";import{H as se}from"./hints-renderer-qloNP0O2.js";import{A as $e}from"./perseus-api-1-ethIrW.js";import{U as O}from"./util-AYeX86gl.js";import{P as x,E as j}from"./perseus-error-l3K_anoI.js";import{L as Ve}from"./svg-image-ZjoZQGiG.js";const Ke="@khanacademy/perseus",Je="__lib_version__";Ne(Ke,Je);const Be={major:0,minor:1};_e(Fe);const Xe=He();Xe["::renderer::"]=Be;const Ye={onRendered:n=>{}},Qe=Q.createContext(Ye),X=class X extends Q.Component{constructor(e){super(e),this._handleFocusChange=(r,i)=>{r!=null?this._setCurrentFocus(r):this._onRendererBlur(i)},this.handleInteractWithWidget=r=>{var s,g;const i=te.difference(this.state.questionHighlightedWidgets,[r]);this.setState({questionCompleted:!1,questionHighlightedWidgets:i}),(g=(s=this.props.apiOptions)==null?void 0:s.interactionCallback)==null||g.call(s,this.questionRenderer.getUserInputMap())},this.setAssetStatus=(r,i)=>{const s={...this.state.assetStatuses,[r]:i};this.setState({assetStatuses:s})},this.state={questionCompleted:!1,questionHighlightedWidgets:[],assetStatuses:{}},this._fullyRendered=!1}componentDidMount(){this._currentFocus=null,this._fullyRendered=!1}UNSAFE_componentWillReceiveProps(e){this.setState({questionHighlightedWidgets:[]})}componentDidUpdate(e,r){const i=this.props.apiOptions.answerableCallback;if(i!=null){const s=this.questionRenderer.emptyWidgets().length===0;i(s)}if(this._fullyRendered||Object.values(this.state.assetStatuses).every(Boolean)&&(this._fullyRendered=!0,this.props.onRendered(!0)),this.props.score&&this.props.score!==e.score){const s=this.questionRenderer.emptyWidgets();this.setState({questionCompleted:this.props.score.correct,questionHighlightedWidgets:s})}}componentWillUnmount(){this.blurTimeoutID!=null&&(clearTimeout(this.blurTimeoutID),this.blurTimeoutID=null)}_setCurrentFocus(e){const{apiOptions:{isMobile:r,onFocusChange:i},keypadElement:s}=this.props,g=this._currentFocus;this._currentFocus=e;const c=this.getInputPaths(),p=this._currentFocus&&c.some(R=>O.inputPathsEqual(R,this._currentFocus));i!=null&&setTimeout(()=>{const R=s==null?void 0:s.getDOMNode(),P=R&&p?R.getBoundingClientRect().height:0;i(this._currentFocus,g,P,p&&this.questionRenderer.getDOMNodeForPath(e))},0),s&&r&&(p?s.activate():s.dismiss())}_onRendererBlur(e){const r=this._currentFocus;te.isEqual(e,r)&&(this.blurTimeoutID=setTimeout(()=>{te.isEqual(this._currentFocus,r)&&this._setCurrentFocus(null)},0))}_setWidgetProps(e,r,i){this.questionRenderer._setWidgetProps(e,r,i)}setInputValue(e,r,i){return this.questionRenderer.setInputValue(e,r,i)}focusPath(e){return this.questionRenderer.focusPath(e)}blurPath(e){return this.questionRenderer.blurPath(e)}getDOMNodeForPath(e){return this.questionRenderer.getDOMNodeForPath(e)}getInputPaths(){return this.questionRenderer.getInputPaths()}focus(){return this.questionRenderer.focus()}blur(){this._currentFocus&&this.blurPath(this._currentFocus)}getNumHints(){return this.props.item.hints.length}getPromptJSON(){return this.questionRenderer.getPromptJSON()}getUserInputLegacy(){return this.questionRenderer.getUserInput()}getUserInput(){return this.questionRenderer.getUserInputMap()}scoreInput(){const e=this.getUserInput(),r=Ge(this.props.item.question,e,this.context.strings,this.context.locale),i=[this.questionRenderer.getUserInput(),[]],s=O.keScoreFromPerseusScore(r,i,this.questionRenderer.getSerializedState()),g=this.questionRenderer.emptyWidgets();return this.setState({questionCompleted:s.correct,questionHighlightedWidgets:g}),s}getWidgetIds(){return this.questionRenderer.getWidgetIds()}getSerializedState(){return{question:this.questionRenderer.getSerializedState(),hints:this.hintsRenderer.getSerializedState()}}restoreSerializedState(e,r){let i=2;const s=()=>{--i,r&&i===0&&r()};this.questionRenderer.restoreSerializedState(e.question,s),this.hintsRenderer.restoreSerializedState(e.hints,s)}showRationalesForCurrentlySelectedChoices(){this.questionRenderer.showRationalesForCurrentlySelectedChoices()}deselectIncorrectSelectedChoices(){this.questionRenderer.deselectIncorrectSelectedChoices()}render(){const e={...$e.defaults,...this.props.apiOptions,onFocusChange:this._handleFocusChange},r={assetStatuses:this.state.assetStatuses,setAssetStatus:this.setAssetStatus},i=q.jsx(ze.Provider,{value:r,children:q.jsx(ke,{keypadElement:this.props.keypadElement,problemNum:this.props.problemNum,onInteractWithWidget:this.handleInteractWithWidget,highlightedWidgets:this.state.questionHighlightedWidgets,apiOptions:e,questionCompleted:this.state.questionCompleted,reviewMode:this.props.reviewMode,showSolutions:this.props.showSolutions,ref:g=>{g!=null&&(this.questionRenderer=g)},content:this.props.item.question.content,widgets:this.props.item.question.widgets,images:this.props.item.question.images,linterContext:fe(this.props.linterContext,"question"),strings:this.context.strings,...this.props.dependencies})}),s=q.jsx(se,{hints:this.props.item.hints,hintsVisible:this.props.hintsVisible,apiOptions:e,ref:g=>this.hintsRenderer=g,linterContext:fe(this.props.linterContext,"hints"),strings:this.context.strings});return q.jsx(Re.Provider,{value:this.props.dependencies,children:q.jsxs("div",{children:[q.jsx("div",{children:i}),q.jsx("div",{className:e.isMobile?void 0:Y.css(Ze.hintsContainer),children:s})]})})}};X.contextType=Te,X.defaultProps={apiOptions:{},linterContext:Le,onRendered:e=>{}};let V=X;const Ze=Y.StyleSheet.create({hintsContainer:{marginLeft:50}}),en=Q.forwardRef((n,e)=>q.jsx(Qe.Consumer,{children:({onRendered:r})=>q.jsx(V,{...n,onRendered:r,ref:e})}));V.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"oldFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setWidgetProps",docblock:`Accepts a question area widgetId, or an answer area widgetId of
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
]`,elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "exponential";
    // Two points along the asymptote line. Usually (always?) a
    // horizontal or vertical line.
    asymptote: [Coord, Coord];
    // Two points along the exponential curve. One end of the curve
    // trends towards the asymptote.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"exponential"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "linear";
    // Two points along the straight line
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "logarithm";
    // Two points along the asymptote line.
    asymptote: [Coord, Coord];
    // Two points along the logarithmic curve. One end of the curve
    // trends towards the asymptote.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"logarithm"',required:!0}},{key:"asymptote",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
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
]`,elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "sinusoid";
    // Two points on the same slope in the sinusoid wave line.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tangent";
    // Two points on the same slope in the tangent wave line.
    coords: [Coord, Coord];
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tangent"',required:!0}},{key:"coords",value:{name:"tuple",raw:"[Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]}],required:!0}}]}}],required:!0}}]}},{name:"intersection",raw:`RendererPromptJSON & {
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"angle"',required:!0}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"allowReflexAngles",value:{name:"boolean",required:!1}},{key:"angleOffsetDeg",value:{name:"number",required:!1}},{key:"snapDegrees",value:{name:"number",required:!1}},{key:"match",value:{name:"literal",value:'"congruent"',required:!1}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],required:!1}}]}},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"circle"',required:!0}},{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"radius",value:{name:"number",required:!1}},{key:"startCoords",value:{name:"signature",type:"object",raw:`{
    center: Coord;
    radius: number;
}`,signature:{properties:[{key:"center",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"radius",value:{name:"number",required:!0}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"linear-system"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"point"',required:!0}},{key:"numPoints",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"polygon"',required:!0}},{key:"numSides",value:{name:"union",raw:'number | "unlimited"',elements:[{name:"number"},{name:"literal",value:'"unlimited"'}],required:!1}},{key:"showAngles",value:{name:"boolean",required:!1}},{key:"showSides",value:{name:"boolean",required:!1}},{key:"snapTo",value:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}],required:!1}},{key:"match",value:{name:"union",raw:'"similar" | "congruent" | "approx"',elements:[{name:"literal",value:'"similar"'},{name:"literal",value:'"congruent"'},{name:"literal",value:'"approx"'}],required:!1}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"quadratic"',required:!0}},{key:"coords",value:{name:"union",raw:"[Coord, Coord, Coord] | null",elements:[{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}]},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[Coord, Coord, Coord]",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1},{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"ray"',required:!0}},{key:"coords",value:{name:"union",raw:"CollinearTuple | null",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"segment"',required:!0}},{key:"numSegments",value:{name:"number",required:!1}},{key:"coords",value:{name:"union",raw:"CollinearTuple[] | null",elements:[{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"Array",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}],required:!1}],raw:"CollinearTuple[]",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]},{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"sinusoid"',required:!0}},{key:"coords",value:{name:"union",raw:"ReadonlyArray<Coord> | null",elements:[{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>"},{name:"null"}],required:!1}},{key:"startCoords",value:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}],raw:"ReadonlyArray<Coord>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // NOTE(jeremy): This is referenced in the component. Verify if there's any
    // production data that still has this.
    coord?: Coord; // Legacy!
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}}]}}]}]},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"options",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"changed",value:{name:"boolean",required:!0}}]}},{name:"ReadonlyArray",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"}],raw:"ReadonlyArray<ReadonlyArray<string>>"}]},{name:"UserInputMap"}],required:!0}}]}}},description:"Returns an object of the widget `.getUserInput()` results"},{name:"scoreInput",docblock:`Grades the item.

@deprecated use scorePerseusItem`,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
}`,signature:{properties:[{key:"empty",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"message",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"suppressAlmostThere",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"guess",value:{name:"any",required:!0}},{key:"state",value:{name:"any",required:!0}}]}}},description:"Grades the item."},{name:"getWidgetIds",docblock:`Returns an array of all widget IDs in the order they occur in
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
}`,computed:!1},required:!1},onRendered:{defaultValue:{value:"(isRendered: boolean) => {}",computed:!1},required:!1}}};en.__docgenInfo={description:"",methods:[],displayName:"ref"};const nn={type:"content"},qe={type:"hint"},rn={type:"tags"},Pe=n=>({type:"array",elementShape:n}),tn=n=>({type:"object",shape:n}),an=Pe(qe),W={content:nn,hint:qe,hints:an,tags:rn,arrayOf:Pe,shape:tn};class M{constructor(e,r,i){this.content=e,this.hint=r,this.tags=i,this.array=$}setContentMapper(e){return new M(e,this.hint,this.tags)}setHintMapper(e){return new M(this.content,e,this.tags)}setTagsMapper(e){return new M(this.content,this.hint,e)}setArrayMapper(e){return new de(this.content,this.hint,this.tags,e)}mapTree(e,r){return K(e,r,[],this)}}class de{constructor(e,r,i,s){this.content=e,this.hint=r,this.tags=i,this.array=s}setArrayMapper(e){return new de(this.content,this.hint,this.tags,e)}mapTree(e,r){return K(e,r,[],this)}}function $(n){return n}function _(){return new M($,$,$)}function K(n,e,r,i){if(e.type==="content"){const s=n;return i.content(s,e,r)}if(e.type==="hint"){const s=n;return i.hint(s,e,r)}if(e.type==="tags"){const s=n;return i.tags(s,e,r)}if(e.type==="array"){const s=n;if(!Array.isArray(s))throw new x(`Invalid object of type "${typeof s}" found at path ${["<root>"].concat(r).join(".")}. Expected array.`,j.Internal);const g=e.elementShape,c=s.map((p,R)=>K(p,g,r.concat(R),i));return i.array(c,s,e,r)}if(e.type==="object"){const s=n;if(s&&typeof s!="object")throw new x(`Invalid object of type "${typeof s}" found at path ${["<root>"].concat(r).join(".")}. Expected "object" type.`,j.InvalidInput);const g=e.shape;if(!g)throw new x(`Unexpected shape ${JSON.stringify(e)} at path ${["<root>"].concat(r).join(".")}.`,j.InvalidInput);const c={};return Object.keys(g).forEach(p=>{if(!(p in s))throw new x(`Key "${p}" is missing from shape at path ${["<root>"].concat(r).join(".")}.`,j.InvalidInput);c[p]=K(s[p],g[p],r.concat(p),i)}),c}throw new x(`unexpected shape type ${e.type}`,j.InvalidInput)}function Ce(n){if(n.type==="content")return{__type:"content",content:"",images:{},widgets:{}};if(n.type==="hint")return{__type:"hint",replace:!1,content:"",images:{},widgets:{}};if(n.type==="tags")return[];if(n.type==="array")return[];if(n.type==="object"){const e=n.shape,r={};return Object.keys(e).forEach(i=>{r[i]=Ce(e[i])}),r}throw new x(`unexpected shape type ${n.type}`,j.InvalidInput)}function $r(n){return sn(Ce(n))}function Vr(n,e,r){const i=Z(n);_().setContentMapper(r).mapTree(i,e)}function Kr(n,e,r){const i=Z(n);_().setHintMapper(r).mapTree(i,e)}function Jr(n){const e=Z(n);return oe(e)}function oe(n){if(Array.isArray(n))return n.length?typeof n[0]=="string"?W.tags:W.arrayOf(oe(n[0])):W.arrayOf(W.content);if(typeof n=="object"&&(n.__type==="content"||n.__type==="item"))return W.content;if(typeof n=="object"&&n.__type==="hint")return W.hint;if(typeof n=="object"){const e={};return Object.keys(n).forEach(r=>{e[r]=oe(n[r])}),W.shape(e)}throw new x(`unexpected multi-item node ${JSON.stringify(n)}`,j.InvalidInput)}function Z(n){return n._multi}function sn(n){return{_multi:n}}var Ae=function(n){return n===Object(n)},Se=function(){for(var n={},e=0;e<arguments.length;e++){var r=arguments[e];if(r)for(var i in r)n[i]=r[i]}return n},H=function(n){return Ae(n)?Array.isArray(n)?n.slice():Se(n):n},G=function(n){if(Array.isArray(n))return on;if(Ae(n))return un;if(typeof n=="string")return ln},k=function(n){if(n instanceof k)return n;if(!(this instanceof k))return new k(n);var e=G(n);this._wrapped=e.thaw?e.thaw(n):n};k.prototype.freeze=function(){var n=this._wrapped,e=G(n);return e.freeze?e.freeze(n):n};k.prototype.zoom=function(n){return this._zoomStack===void 0&&(this._zoomStack=[]),this._zoomStack.push({zoom:n,wrapped:this._wrapped}),this._wrapped=k(this._wrapped).get(n),this};k.prototype.deZoom=function(){var n=this._zoomStack.pop();return this._wrapped=k(n.wrapped).set(n.zoom,this._wrapped).freeze(),this};k.prototype.get=function(n){for(var e=this._wrapped,r=0;r<n.length;r++)e=G(e).get(e,n[r]);return e};k.prototype.mod=function(n,e){var r=this._wrapped,i=H(r),s=G(r);if(n.length===0)this._wrapped=e(this._wrapped);else if(n.length===1)this._wrapped=s.mod(i,n[0],e);else{var g=n[0],c=n.slice(1);i[g]=k(r[g]).mod(c,e).freeze(),this._wrapped=i}return this};k.prototype.merge=function(n,e){return this._wrapped=k(this._wrapped).mod(n,function(r){return Se(r,e)}).freeze(),this};k.prototype.del=function(n){var e=this._wrapped,r=G(e);if(n.length===1)this._wrapped=r.del(e,n[0]);else{var i=n[0],s=n.slice(1),g=H(e);g[i]=k(e[i]).del(s).freeze(),this._wrapped=g}return this};k.prototype.set=function(n,e){return this.mod(n,function(){return e})};const on={get:function(n,e){return n[e]},set:function(n,e,r){var i=n.splice();return i[e]=r,i},mod:function(n,e,r){var i=n.slice();return i[e]=r(n[e]),i},del:function(n,e){var r=n.slice();return r.splice(e,1),r}},un={get:function(n,e){return n[e]},set:function(n,e,r){var i=H(n);return i[e]=r,i},mod:function(n,e,r){var i=H(n);return i[e]=r(n[e]),i},del:function(n,e){var r=H(n);return delete r[e],r}},ln={get:function(n,e){return n[e]},set:function(n,e,r){var i=n.splice();return i[e]=r,i},mod:function(n,e,r){var i=n.splice();return i[e]=r(n[e]),i},del:function(n,e){var r=n.slice();return r.splice(e),r}},he=class he extends Q.Component{constructor(e){super(e),this._handleSerializedStateUpdated=(r,i)=>{const{onSerializedStateUpdated:s}=this.props;if(s){const g=this._getSerializedState(this.props.serializedState);s(k(g).set(r,i).freeze())}},this.rendererDataTreeMapper=_().setContentMapper((r,i,s)=>this._makeContentRendererData(r,s)).setHintMapper(r=>this._makeHintRendererData(r)).setTagsMapper(r=>null),this.getRenderersMapper=_().setContentMapper(r=>r.makeRenderer()).setHintMapper(r=>r.makeRenderer()).setArrayMapper((r,i,s)=>this._annotateRendererArray(r,i,s)),this.state=this._tryMakeRendererState(this.props)}UNSAFE_componentWillReceiveProps(e){e.item!==this.props.item&&this.setState(this._tryMakeRendererState(e))}_tryMakeRendererState(e){try{return{rendererDataTree:this._makeRendererDataTree(e.item,e.shape),renderError:null}}catch(r){return Ve.error("Error building tree state",j.Internal,{cause:r}),{rendererDataTree:null,renderError:r}}}_getRendererProps(){const{item:e,children:r,shape:i,serializedState:s,onSerializedStateUpdated:g,...c}=this.props;return{...c,strings:this.context.strings}}_makeContentRendererData(e,r){const i={ref:null,makeRenderer:null},s=p=>i.ref=p,g=p=>this._findWidgets(i,p),c=p=>this._handleSerializedStateUpdated(r,p);return i.makeRenderer=()=>q.jsx(ke,{...this._getRendererProps(),...e,ref:s,findExternalWidgets:g,serializedState:this.props.serializedState?k(this.props.serializedState).get(r):null,onSerializedStateUpdated:c}),i}_makeHintRendererData(e){const r=i=>this._findWidgets({},i);return{hint:e,findExternalWidgets:r,ref:null,makeRenderer:()=>q.jsx(se,{...this._getRendererProps(),findExternalWidgets:r,hints:[e]})}}_makeRendererDataTree(e,r){const i=Z(e);return this.rendererDataTreeMapper.mapTree(i,r)}_findWidgets(e,r){const i=[];return this._mapRenderers(s=>{e!==s&&s.ref&&i.push(...s.ref.findInternalWidgets(r))}),i}_mapRenderers(e){const{rendererDataTree:r}=this.state;return r?_().setContentMapper(e).setHintMapper(e).mapTree(r,this.props.shape):null}_scoreFromRef(e){if(!e)return null;const[r,i]=e.guessAndScore();let s;return e.getSerializedState&&(s=e.getSerializedState()),O.keScoreFromPerseusScore(i,r,s)}getScores(){return this._mapRenderers(e=>this._scoreFromRef(e.ref))}score(){const e=[],r=[],i=this._mapRenderers(g=>{var c;return g.ref?(g.ref.getSerializedState&&r.push(g.ref.getSerializedState()),e.push(g.ref.score()),(c=g.ref)==null?void 0:c.getUserInput()):null}),s=e.reduce(O.combineScores);return O.keScoreFromPerseusScore(s,i,r)}_getSerializedState(e){return this._mapRenderers((r,i,s)=>r.ref?r.ref.getSerializedState():e?k(e).get(s):null)}restoreSerializedState(e,r){let i=0;const s=()=>{i--,r&&i===0&&r()};this._mapRenderers((g,c,p)=>{var P;if(!g.ref)return;const R=k(e).get(p);R&&(i++,(P=g.ref)==null||P.restoreSerializedState(R,s))})}_annotateRendererArray(e,r,i){if(i.elementShape.type==="hint"){const s=r;e=[...e],e.firstN=g=>q.jsx(se,{...this._getRendererProps(),findExternalWidgets:s[0]?s[0].findExternalWidgets:void 0,hints:s.map(c=>c.hint),hintsVisible:g})}return e}_getRenderers(){return this.getRenderersMapper.mapTree(this.state.rendererDataTree,this.props.shape)}render(){return this.state.renderError?q.jsx("div",{className:Y.css(dn.error),children:this.context.strings.errorRendering({error:String(this.state.renderError)})}):q.jsx(Re.Provider,{value:this.props.dependencies,children:this.props.children({renderers:this._getRenderers()})})}};he.contextType=Te;let ue=he;const dn=Y.StyleSheet.create({error:{color:"red"}});ue.__docgenInfo={description:"",methods:[{name:"_tryMakeRendererState",docblock:"Attempt to build a State that includes a renderer tree corresponding to\nthe item provided in props. On error, return a state with `renderError`\nset instead.",modifiers:[],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
    item: Item;
    shape: Shape;
    children: (tree: {renderers: RendererTree}) => React.ReactElement<any>;
    serializedState?: SerializedStateTree | null | undefined;
    onSerializedStateUpdated?: (state: SerializedStateTree) => void;
    onInteractWithWidget?: (id: string) => void;
    apiOptions?: APIOptions;
    reviewMode?: boolean | null | undefined;

    dependencies: PerseusDependenciesV2;
}`,signature:{properties:[{key:"item",value:{name:"signature",type:"object",raw:`{
    _multi: ItemTree;
}`,signature:{properties:[{key:"_multi",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]},required:!0}},{key:"shape",value:{name:"union",raw:`| ContentShape
| HintShape
| TagsShape
| ArrayShape
| ObjectShape`,elements:[{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tags";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tags"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "array";
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the \`elementShape\` property.
     */
    elementShape: Shape;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"array"',required:!0}},{key:"elementShape",value:{name:"Shape",required:!0},description:"Each element of an ArrayNode has the same shape, which is specified by\nthe `elementShape` property."}]}},{name:"signature",type:"object",raw:`{
    type: "object";
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the \`shape\` property.
     */
    shape: {
        [k: string]: Shape;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"object"',required:!0}},{key:"shape",value:{name:"signature",type:"object",raw:`{
    [k: string]: Shape;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}],required:!0}},{key:"children",value:{name:"signature",type:"function",raw:"(tree: {renderers: RendererTree}) => React.ReactElement<any>",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{renderers: RendererTree}",signature:{properties:[{key:"renderers",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]}},name:"tree"}],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"serializedState",value:{name:"union",raw:"SerializedStateTree | null | undefined",elements:[{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0},{name:"null"},{name:"undefined"}],required:!1}},{key:"onSerializedStateUpdated",value:{name:"signature",type:"function",raw:"(state: SerializedStateTree) => void",signature:{arguments:[{type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0},name:"state"}],return:{name:"void"}},required:!1}},{key:"onInteractWithWidget",value:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}},required:!1}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0},name:"dimensions"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`Function that takes dimensions and returns a React component
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
}>`,required:!1}},{key:"reviewMode",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:"dependencies",value:{name:"PerseusDependenciesV2",required:!0}}]},alias:"Props"}}],returns:{type:{name:"signature",type:"object",raw:`{
    // We cache functions to generate renderers and refs in \`rendererDataTree\`,
    // and change them every time content changes. This isn't just a performance
    // optimization; see \`_makeContentRendererData\` for more discussion.
    rendererDataTree: RendererDataTree | null | undefined;
    // But, if traversing the tree fails, we store the Error in \`renderError\`.
    renderError: Error | null | undefined;
}`,signature:{properties:[{key:"rendererDataTree",value:{name:"union",raw:"RendererDataTree | null | undefined",elements:[{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]},{name:"null"},{name:"undefined"}],required:!0}},{key:"renderError",value:{name:"union",raw:"Error | null | undefined",elements:[{name:"Error"},{name:"null"},{name:"undefined"}],required:!0}}]}}},description:"Attempt to build a State that includes a renderer tree corresponding to\nthe item provided in props. On error, return a state with `renderError`\nset instead."},{name:"_handleSerializedStateUpdated",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:null},{name:"newState",optional:!1,type:null}],returns:null},{name:"_getRendererProps",docblock:`Props that aren't directly used by the MultiRenderer are delegated to
the underlying Renderers.`,modifiers:[],params:[],returns:{type:{name:"PropsFor",elements:[{name:"Renderer"}],raw:"PropsFor<typeof Renderer>"}},description:`Props that aren't directly used by the MultiRenderer are delegated to
the underlying Renderers.`},{name:"_makeContentRendererData",docblock:"Construct a Renderer and a ref placeholder for the given ContentNode.",modifiers:[],params:[{name:"content",optional:!1,type:{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]},alias:"ContentNode"}},{name:"path",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>",alias:"Path"}}],returns:{type:{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}}},description:"Construct a Renderer and a ref placeholder for the given ContentNode."},{name:"_makeHintRendererData",docblock:`Construct a Renderer for the given HintNode, and keep track of the hint
itself for future use, too.`,modifiers:[],params:[{name:"hint",optional:!1,type:{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]},alias:"HintNode"}}],returns:{type:{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}}},description:`Construct a Renderer for the given HintNode, and keep track of the hint
itself for future use, too.`},{name:"_makeRendererDataTree",docblock:"Construct a tree of interconnected RendererDatas, corresponding to the\ngiven item. Called in `_tryMakeRendererState`, in order to store this\ntree in the component state.",modifiers:[],params:[{name:"item",optional:!1,type:{name:"signature",type:"object",raw:`{
    _multi: ItemTree;
}`,signature:{properties:[{key:"_multi",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]},alias:"Item"}},{name:"shape",optional:!1,type:{name:"union",raw:`| ContentShape
| HintShape
| TagsShape
| ArrayShape
| ObjectShape`,elements:[{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tags";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tags"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "array";
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the \`elementShape\` property.
     */
    elementShape: Shape;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"array"',required:!0}},{key:"elementShape",value:{name:"Shape",required:!0},description:"Each element of an ArrayNode has the same shape, which is specified by\nthe `elementShape` property."}]}},{name:"signature",type:"object",raw:`{
    type: "object";
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the \`shape\` property.
     */
    shape: {
        [k: string]: Shape;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"object"',required:!0}},{key:"shape",value:{name:"signature",type:"object",raw:`{
    [k: string]: Shape;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}],alias:"Shape"}}],returns:{type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]}},description:"Construct a tree of interconnected RendererDatas, corresponding to the\ngiven item. Called in `_tryMakeRendererState`, in order to store this\ntree in the component state."},{name:"_findWidgets",docblock:`Return all widgets that meet the given criterion, from all Renderers
except the Renderer that triggered this call.

This function is provided to each Renderer's \`findExternalWidgets\` prop,
which enables widgets in different Renderers to discover each other and
communicate.`,modifiers:[],params:[{name:"callingData",optional:!1,type:{name:"union",raw:"ContentRendererData | HintRendererData",elements:[{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}}],alias:"RendererData"}},{name:"filterCriterion",optional:!1,type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}],alias:"FilterCriterion"}}],returns:{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}},description:`Return all widgets that meet the given criterion, from all Renderers
except the Renderer that triggered this call.

This function is provided to each Renderer's \`findExternalWidgets\` prop,
which enables widgets in different Renderers to discover each other and
communicate.`},{name:"_mapRenderers",docblock:`Copy the renderer tree, apply the given transformation to the leaf nodes
and the optional given transformation to the array nodes, and return the
result.

Used to provide structured data to the call site (the Renderer tree on
\`render\`, the Score tree on \`getScores\`, etc.), and to traverse the
renderer tree even when we disregard the output (like in
\`_findWidgets\`).`,modifiers:[],params:[{name:"leafMapper",optional:!1,type:{name:"intersection",raw:`ContentMapper<RendererData, O> &
HintMapper<RendererData, O>`,elements:[{name:"signature",type:"function",raw:`(
    content: CI,
    shape: ContentShape,
    path: Path,
) => CO`,signature:{arguments:[{type:{name:"union",raw:"ContentRendererData | HintRendererData",elements:[{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}}]},name:"content"},{type:{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},name:"shape"},{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"},name:"path"}],return:{name:"O"}}},{name:"signature",type:"function",raw:"(hint: HI, shape: HintShape, path: Path) => HO",signature:{arguments:[{type:{name:"union",raw:"ContentRendererData | HintRendererData",elements:[{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}}]},name:"hint"},{type:{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},name:"shape"},{type:{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"},name:"path"}],return:{name:"O"}}}]}}],returns:{type:{name:"union",raw:"Tree<O, O, null> | null | undefined",elements:[{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"O"},{name:"O"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]},{name:"null"},{name:"undefined"}]}},description:`Copy the renderer tree, apply the given transformation to the leaf nodes
and the optional given transformation to the array nodes, and return the
result.

Used to provide structured data to the call site (the Renderer tree on
\`render\`, the Score tree on \`getScores\`, etc.), and to traverse the
renderer tree even when we disregard the output (like in
\`_findWidgets\`).`},{name:"_scoreFromRef",docblock:null,modifiers:[],params:[{name:"ref",optional:!0,type:{name:"union",raw:"Renderer | null",elements:[{name:"Renderer"},{name:"null"}]}}],returns:{type:{name:"any"}}},{name:"getScores",docblock:"Return a tree in the shape of the multi-item, with scores at each of\nthe content nodes and `null` at the other leaf nodes.",modifiers:[],params:[],returns:{type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"any"},{name:"null"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]}},description:"Return a tree in the shape of the multi-item, with scores at each of\nthe content nodes and `null` at the other leaf nodes."},{name:"score",docblock:"Return a single composite score for all rendered content nodes.\nThe `guess` is a tree in the shape of the multi-item, with an individual\nguess at each content node and `null` at the other leaf nodes.",modifiers:[],params:[],returns:{type:{name:"any"}},description:"Return a single composite score for all rendered content nodes.\nThe `guess` is a tree in the shape of the multi-item, with an individual\nguess at each content node and `null` at the other leaf nodes."},{name:"_getSerializedState",docblock:`Return a tree in the shape of the multi-item, with serialized state at
each of the content nodes and \`null\` at the other leaf nodes.

If the lastSerializedState argument is supplied, this function will fill
in the state of not-currently-rendered content and hint nodes with the
values from the previous serialized state. If no lastSerializedState is
supplied, \`null\` will be returned for not-currently-rendered content and
hint nodes.`,modifiers:[],params:[{name:"lastSerializedState",optional:!0,type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"any"},{name:"null"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],alias:"SerializedStateTree"}}],returns:{type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"any"},{name:"null"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]}},description:`Return a tree in the shape of the multi-item, with serialized state at
each of the content nodes and \`null\` at the other leaf nodes.

If the lastSerializedState argument is supplied, this function will fill
in the state of not-currently-rendered content and hint nodes with the
values from the previous serialized state. If no lastSerializedState is
supplied, \`null\` will be returned for not-currently-rendered content and
hint nodes.`},{name:"restoreSerializedState",docblock:`Given a tree in the shape of the multi-item, with serialized state at
each of the content nodes, restore each state to the corresponding
renderer if currently mounted.`,modifiers:[],params:[{name:"serializedState",optional:!1,type:{name:"any",alias:"SerializedState"}},{name:"callback",optional:!0,type:{name:"signature",type:"function",raw:"() => any",signature:{arguments:[],return:{name:"any"}}}}],returns:null,description:`Given a tree in the shape of the multi-item, with serialized state at
each of the content nodes, restore each state to the corresponding
renderer if currently mounted.`},{name:"_annotateRendererArray",docblock:"Given an array of renderers, if it happens to be an array of *hint*\nrenderers, then attach a `firstN` method to the array, which allows the\nlayout to render the hints together in one HintsRenderer.",modifiers:[],params:[{name:"renderers",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"Renderer"}],raw:"ReadonlyArray<Renderer>",alias:"ReadonlyArray"}},{name:"rendererDatas",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"union",raw:"ContentRendererData | HintRendererData",elements:[{name:"signature",type:"object",raw:`{
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => ContentRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"ref",value:{name:"union",raw:"Renderer | null | undefined",elements:[{name:"Renderer"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
}`,signature:{properties:[{key:"makeRenderer",value:{name:"signature",type:"function",raw:"() => HintRendererElement",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},required:!0}},{key:"findExternalWidgets",value:{name:"union",raw:"FindWidgetsFunc | null | undefined",elements:[{name:"signature",type:"function",raw:`(
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>`,signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"union",raw:"Widget | null | undefined",elements:[{name:"Widget"},{name:"null"},{name:"undefined"}]}],raw:"ReadonlyArray<Widget | null | undefined>"}}},{name:"null"},{name:"undefined"}],required:!0}},{key:"ref",value:{name:"null",required:!0}},{key:"hint",value:{name:"any",required:!0}}]}}]}],raw:"ReadonlyArray<RendererData>",alias:"ReadonlyArray"}},{name:"shape",optional:!1,type:{name:"signature",type:"object",raw:`{
    type: "array";
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the \`elementShape\` property.
     */
    elementShape: Shape;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"array"',required:!0}},{key:"elementShape",value:{name:"union",raw:`| ContentShape
| HintShape
| TagsShape
| ArrayShape
| ObjectShape`,elements:[{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tags";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tags"',required:!0}}]}},{name:"ArrayShape"},{name:"signature",type:"object",raw:`{
    type: "object";
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the \`shape\` property.
     */
    shape: {
        [k: string]: Shape;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"object"',required:!0}},{key:"shape",value:{name:"signature",type:"object",raw:`{
    [k: string]: Shape;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}],required:!0},description:"Each element of an ArrayNode has the same shape, which is specified by\nthe `elementShape` property."}]},alias:"ArrayShape"}}],returns:{type:{name:"ReadonlyArray",elements:[{name:"Renderer"}],raw:"ReadonlyArray<Renderer>"}},description:"Given an array of renderers, if it happens to be an array of *hint*\nrenderers, then attach a `firstN` method to the array, which allows the\nlayout to render the hints together in one HintsRenderer."},{name:"_getRenderers",docblock:`Return a tree in the shape of the multi-item, with a Renderer at each
content node and a HintRenderer at each hint node.

This is generated by running each of the \`makeRenderer\` functions at the
leaf nodes.`,modifiers:[],params:[],returns:{type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"unknown"},{name:"unknown"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]}},description:`Return a tree in the shape of the multi-item, with a Renderer at each
content node and a HintRenderer at each hint node.

This is generated by running each of the \`makeRenderer\` functions at the
leaf nodes.`}],displayName:"MultiRenderer",props:{item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    _multi: ItemTree;
}`,signature:{properties:[{key:"_multi",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"signature",type:"object",raw:`{
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"union",raw:'"content" | "item"',elements:[{name:"literal",value:'"content"'},{name:"literal",value:'"item"'}],required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
}`,signature:{properties:[{key:"__type",value:{name:"literal",value:'"hint"',required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!1}},{key:"images",value:{name:"union",raw:"ImageDict | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"widgets",value:{name:"union",raw:"PerseusWidgetsMap | null | undefined",elements:[{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"replace",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]}},description:""},shape:{required:!0,tsType:{name:"union",raw:`| ContentShape
| HintShape
| TagsShape
| ArrayShape
| ObjectShape`,elements:[{name:"signature",type:"object",raw:`{
    type: "content";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"content"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "hint";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"hint"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "tags";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"tags"',required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "array";
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the \`elementShape\` property.
     */
    elementShape: Shape;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"array"',required:!0}},{key:"elementShape",value:{name:"Shape",required:!0},description:"Each element of an ArrayNode has the same shape, which is specified by\nthe `elementShape` property."}]}},{name:"signature",type:"object",raw:`{
    type: "object";
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the \`shape\` property.
     */
    shape: {
        [k: string]: Shape;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"object"',required:!0}},{key:"shape",value:{name:"signature",type:"object",raw:`{
    [k: string]: Shape;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Shape",required:!0}}]},required:!0},description:"Each property of an ObjectNode has its own shape, which is specified\nunder the corresponding key in the `shape` property."}]}}]},description:""},children:{required:!0,tsType:{name:"signature",type:"function",raw:"(tree: {renderers: RendererTree}) => React.ReactElement<any>",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{renderers: RendererTree}",signature:{properties:[{key:"renderers",value:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"unknown"},{name:"unknown"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}],required:!0}}]}},name:"tree"}],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},serializedState:{required:!1,tsType:{name:"union",raw:"SerializedStateTree | null | undefined",elements:[{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"any"},{name:"null"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]},{name:"null"},{name:"undefined"}]},description:""},onSerializedStateUpdated:{required:!1,tsType:{name:"signature",type:"function",raw:"(state: SerializedStateTree) => void",signature:{arguments:[{type:{name:"union",raw:`| C
| H
| T
// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
| ArrayNode<C, H, T>
| ObjectNode<C, H, T>`,elements:[{name:"any"},{name:"null"},{name:"null"},{name:"Tree"},{name:"signature",type:"object",raw:`{
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
}`,signature:{properties:[{key:{name:"string"},value:{name:"Tree",required:!0}}]}}]},name:"state"}],return:{name:"void"}}},description:""},onInteractWithWidget:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},reviewMode:{required:!1,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},dependencies:{required:!0,tsType:{name:"PerseusDependenciesV2"},description:""}}};function Ie(n){return{type:"success",value:n}}function me(n){return{type:"failure",detail:n}}function C(n){return n.type==="failure"}function J(n){return n.type==="success"}function mn(n,e=r=>r){const r=[],i=[];for(const s of n)s.type==="success"?r.push(s.value):i.push(s.detail);return i.length>0?me(i.reduce(e)):Ie(r)}const L=(n,e)=>e.success(n);function m(n){return(e,r)=>{if(!Array.isArray(e))return r.failure("array",e);const i=e.map((s,g)=>n(s,r.forSubtree(g)));return mn(i,pn)}}function pn(n,e){return[...n,...e]}function l(n,e){return typeof n=="boolean"?e.success(n):e.failure("boolean",n)}function d(n){return(e,r)=>e!==n?r.failure(String(JSON.stringify(n)),e):r.success(n)}function f(...n){return(e,r)=>{if(typeof e=="string"){const s=n.indexOf(e);if(s>-1)return r.success(n[s])}const i=n.map(s=>JSON.stringify(s));return r.failure(i,e)}}function pe(n){return n!=null&&Object.getPrototypeOf(n)===Object.prototype}function w(n){return(e,r)=>e===null?r.success(e):n(e,r)}const u=(n,e)=>typeof n=="number"?e.success(n):e.failure("number",n);function o(n){return(e,r)=>{if(!pe(e))return r.failure("object",e);const i={...e},s=[];for(const[g,c]of Object.entries(n)){const p=c(e[g],r.forSubtree(g));J(p)?i[g]=p.value:s.push(...p.detail)}return s.length>0?me(s):r.success(i)}}function t(n){return(e,r)=>e===void 0?r.success(e):n(e,r)}function b(n,e){return(r,i)=>{if(!Array.isArray(r))return i.failure("array",r);if(r.length!==2)return i.failure("array of length 2",r);const[s,g]=r,c=n(s,i.forSubtree(0));if(C(c))return c;const p=e(g,i.forSubtree(1));return C(p)?p:i.success([c.value,p.value])}}function U(n){return new ce(n)}class ce{constructor(e){this.parser=e}then(e){return new ce(cn(this.parser,e))}}function cn(n,e){return(r,i)=>{const s=n(r,i);return C(s)?s:e(s.value,i)}}function ge(n,e){return(r,i)=>{if(!pe(r))return i.failure("object",r);const s={},g=[];for(const[c,p]of Object.entries(r)){const R=i.forSubtree(c),P=n(c,R);C(P)&&g.push(...P.detail);const S=e(p,R);C(S)&&g.push(...S.detail),J(P)&&J(S)&&(s[P.value]=S.value)}return g.length>0?me(g):i.success(s)}}const a=(n,e)=>typeof n=="string"?e.success(n):e.failure("string",n);function B(n,e,r){return(i,s)=>{if(!Array.isArray(i))return s.failure("array",i);if(i.length!==3)return s.failure("array of length 3",i);const g=n(i[0],s.forSubtree(0));if(C(g))return g;const c=e(i[1],s.forSubtree(1));if(C(c))return c;const p=r(i[2],s.forSubtree(2));return C(p)?p:s.success([g.value,c.value,p.value])}}function T(n){return new ye(n)}class ye{constructor(e){this.parser=e}or(e){return new ye(gn(this.parser,e))}}function gn(n,e){return(r,i)=>{const s=n(r,i);return J(s)?s:e(r,i)}}function v(n,e){return(r,i)=>r==null?Ie(e(r)):n(r,i)}const je=v(ge(a,o({width:u,height:u})),()=>({}));function h(n,e){return o({type:n,static:t(l),graded:t(l),alignment:t(a),options:e,key:t(u),version:t(o({major:u,minor:u}))})}function We(n,e,r){return o({type:e,static:t(l),graded:t(l),alignment:t(a),options:r,key:t(u),version:n})}const yn=h(d("categorizer"),o({items:m(a),categories:m(a),randomizeItems:l,static:v(l,()=>!1),values:m(u),highlightLint:t(l),linterContext:t(o({contentType:a,paths:m(a),stack:m(a)}))})),hn=h(d("cs-program"),o({programID:a,programType:L,settings:m(o({name:a,value:a})),showEditor:l,showButtons:l,width:u,height:u,static:l})),fn=h(d("definition"),o({togglePrompt:a,definition:a,static:v(l,()=>!1)})),wn=h(d("dropdown"),o({placeholder:a,ariaLabel:t(a),visibleLabel:t(a),static:v(l,()=>!1),choices:m(o({content:a,correct:l}))})),bn=h(d("explanation"),o({showPrompt:a,hidePrompt:a,explanation:a,widgets:(n,e)=>z(n,e),static:l})),vn=o({value:a,form:l,simplify:l,considered:f("correct","wrong","ungraded"),key:U(t(T(a).or(u).parser)).then((n,e)=>e.success(String(n))).parser}),kn=We(o({major:d(1),minor:u}),d("expression"),o({answerForms:m(vn),functions:m(a),times:l,visibleLabel:t(a),ariaLabel:t(a),buttonSets:m(f("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),buttonsVisible:t(f("always","never","focused"))})),Tn=We(t(o({major:d(0),minor:u})),d("expression"),o({functions:m(a),times:l,visibleLabel:t(a),ariaLabel:t(a),form:l,simplify:l,value:a,buttonSets:m(f("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),buttonsVisible:t(f("always","never","focused"))}));function Rn(n,e){const{options:r}=n;return e.success({...n,version:{major:1,minor:0},options:{times:r.times,buttonSets:r.buttonSets,functions:r.functions,buttonsVisible:r.buttonsVisible,visibleLabel:r.visibleLabel,ariaLabel:r.ariaLabel,answerForms:[{considered:"correct",form:r.form,simplify:r.simplify,value:r.value}]}})}const qn=T(kn).or(U(Tn).then(Rn).parser).parser,ee=v(o({content:v(a,()=>""),widgets:v((n,e)=>z(n,e),()=>({})),metadata:t(m(a)),images:je}),()=>({content:"",widgets:{},images:{}})),xe=o({title:v(a,()=>""),hasHint:t(w(l)),hint:t(w((n,e)=>ee(n,e))),content:a,widgets:(n,e)=>z(n,e),widgetEnabled:t(w(l)),immutableWidgets:t(w(l)),images:ge(a,o({width:u,height:u}))}),Pn=h(d("graded-group"),xe),Cn=h(d("graded-group-set"),o({gradedGroups:m(xe)})),I=b(u,u),A=b(I,I),An=h(d("grapher"),o({availableTypes:m(f("absolute_value","exponential","linear","logarithm","quadratic","sinusoid","tangent")),correct:T(o({type:d("absolute_value"),coords:A})).or(o({type:d("exponential"),asymptote:A,coords:A})).or(o({type:d("linear"),coords:A})).or(o({type:d("logarithm"),asymptote:A,coords:A})).or(o({type:d("quadratic"),coords:A})).or(o({type:d("sinusoid"),coords:A})).or(o({type:d("tangent"),coords:A})).parser,graph:o({backgroundImage:o({bottom:t(u),height:t(u),left:t(u),scale:t(u),url:t(w(a)),width:t(u)}),box:t(I),editableSettings:t(m(f("graph","snap","image","measure"))),gridStep:t(I),labels:b(a,a),markings:f("graph","none","grid"),range:b(I,I),rulerLabel:d(""),rulerTicks:u,showProtractor:t(l),showRuler:t(l),showTooltips:t(l),snapStep:t(I),step:I,valid:t(T(l).or(a).parser)})})),Sn=h(d("group"),(n,e)=>ee(n,e)),In=h(d("iframe"),o({url:a,settings:m(o({name:a,value:a})),width:T(u).or(a).parser,height:T(u).or(a).parser,allowFullScreen:l,allowTopNavigation:t(l),static:v(l,()=>!1)})),jn=(n,e)=>{if(typeof n=="number")return e.success(n);const r=+n;return n===""||isNaN(r)?e.failure("a number or numeric string",n):e.success(r)},F=U(T(u).or(a).parser).then(jn).parser,ne=o({url:t(w(a)),width:t(F),height:t(F),top:t(F),left:t(F),bottom:t(F),scale:t(F)}),ae=b(u,u),Wn=h(d("image"),o({title:t(a),caption:t(a),alt:t(a),backgroundImage:ne,static:t(l),labels:t(m(o({content:a,alignment:a,coordinates:m(u)}))),range:t(b(ae,ae)),box:t(ae)})),xn=(n,e)=>typeof n=="boolean"?e.success(String(n)):e.failure("boolean",n),En=h(d("input-number"),o({answerType:t(f("number","decimal","integer","rational","improper","mixed","percent","pi")),inexact:t(l),maxError:t(T(u).or(a).parser),rightAlign:t(l),simplify:f("required","optional","enforced"),size:f("normal","small"),value:T(u).or(a).or(xn).parser,customKeypad:t(l)})),D=b(u,u),Nn=o({type:d("function"),key:a,options:o({value:a,funcName:a,rangeMin:a,rangeMax:a,color:a,strokeDasharray:a,strokeWidth:u})}),Fn=o({type:d("label"),key:a,options:o({label:a,color:a,coordX:a,coordY:a})}),Dn=o({type:d("line"),key:a,options:o({color:a,startX:a,startY:a,endX:a,endY:a,strokeDasharray:a,strokeWidth:u,arrows:a})}),On=o({type:d("movable-line"),key:a,options:o({startX:a,startY:a,startSubscript:u,endX:a,endY:a,endSubscript:u,constraint:a,snap:u,constraintFn:a,constraintXMin:a,constraintXMax:a,constraintYMin:a,constraintYMax:a})}),Mn=o({type:d("movable-point"),key:a,options:o({startX:a,startY:a,varSubscript:u,constraint:a,snap:u,constraintFn:a,constraintXMin:a,constraintXMax:a,constraintYMin:a,constraintYMax:a})}),_n=o({type:d("parametric"),key:a,options:o({x:a,y:a,rangeMin:a,rangeMax:a,color:a,strokeDasharray:a,strokeWidth:u})}),Hn=o({type:d("point"),key:a,options:o({color:a,coordX:a,coordY:a})}),Ln=o({type:d("rectangle"),key:a,options:o({color:a,coordX:a,coordY:a,width:a,height:a})}),Gn=h(d("interaction"),o({static:l,graph:o({editableSettings:t(m(f("canvas","graph"))),box:D,labels:m(a),range:b(D,D),gridStep:D,markings:f("graph","grid","none"),snapStep:t(D),valid:t(T(l).or(a).parser),backgroundImage:t(ne),showProtractor:t(l),showRuler:t(l),rulerLabel:t(a),rulerTicks:t(u),tickStep:D}),elements:m(T(Nn).or(Fn).or(Dn).or(On).or(Mn).or(_n).or(Hn).or(Ln).parser)})),y=b(u,u),we=o({type:d("angle"),showAngles:t(l),allowReflexAngles:t(l),angleOffsetDeg:t(u),snapDegrees:t(u),match:t(d("congruent")),coords:t(B(y,y,y)),startCoords:t(B(y,y,y))}),Un=o({type:d("circle"),center:t(y),radius:t(u),startCoords:t(o({center:y,radius:u})),coord:t(y)}),zn=o({type:d("linear"),coords:t(w(b(y,y))),startCoords:t(b(y,y)),coord:t(y)}),$n=o({type:d("linear-system"),coords:t(w(m(b(y,y)))),startCoords:t(m(b(y,y))),coord:t(y)}),Vn=o({type:d("none")}),Kn=o({type:d("point"),numPoints:t(T(u).or(d("unlimited")).parser),coords:t(w(m(y))),startCoords:t(m(y)),coord:t(y)}),Jn=o({type:d("polygon"),numSides:t(T(u).or(d("unlimited")).parser),showAngles:t(l),showSides:t(l),snapTo:t(f("grid","angles","sides")),match:t(f("similar","congruent","approx")),startCoords:t(m(y)),coord:t(y)}),Bn=o({type:d("quadratic"),coords:t(w(B(y,y,y))),startCoords:t(B(y,y,y)),coord:t(y)}),Xn=o({type:d("ray"),coords:t(w(b(y,y))),startCoords:t(b(y,y)),coord:t(y)}),Yn=o({type:d("segment"),numSegments:t(u),coords:t(w(m(b(y,y)))),startCoords:t(m(b(y,y))),coord:t(y)}),Qn=o({type:d("sinusoid"),coords:t(w(m(y))),startCoords:t(m(y)),coord:t(y)}),be=T(we).or(we).or(Un).or(zn).or($n).or(Vn).or(Kn).or(Jn).or(Bn).or(Xn).or(Yn).or(Qn).parser,E=f(...De),Ee=f("none","white","translucent","solid"),re=f("solid","dashed"),N=o({type:d("label"),coord:y,text:a,color:E,size:f("small","medium","large")}),le=o({type:d("point"),coord:y,color:E,filled:l,labels:t(m(N)),ariaLabel:t(a)}),Zn=o({type:d("line"),kind:f("line","ray","segment"),points:b(le,le),color:E,lineStyle:re,showPoint1:l,showPoint2:l,labels:t(m(N)),ariaLabel:t(a)}),er=o({type:d("vector"),points:b(y,y),color:E,labels:t(m(N)),ariaLabel:t(a)}),nr=o({type:d("ellipse"),center:y,radius:y,angle:u,color:E,fillStyle:Ee,strokeStyle:re,labels:t(m(N)),ariaLabel:t(a)}),rr=o({type:d("polygon"),points:m(y),color:E,showVertices:l,fillStyle:Ee,strokeStyle:re,labels:t(m(N)),ariaLabel:t(a)}),tr=o({type:d("function"),color:E,strokeStyle:re,equation:a,directionalAxis:f("x","y"),domain:t(y),labels:t(m(N)),ariaLabel:t(a)}),ar=T(le).or(Zn).or(er).or(nr).or(rr).or(tr).or(N).parser,ir=h(d("interactive-graph"),o({step:y,gridStep:t(y),snapStep:t(y),backgroundImage:t(ne),markings:f("graph","grid","none"),labels:t(m(a)),showProtractor:l,showRuler:t(l),showTooltips:t(l),rulerLabel:t(a),rulerTicks:t(u),range:b(y,y),graph:v(be,()=>({type:"linear"})),correct:be,lockedFigures:t(m(ar)),fullGraphLabel:t(a),fullGraphAriaDescription:t(a)})),sr=h(d("label-image"),o({choices:m(a),imageUrl:a,imageAlt:a,imageHeight:u,imageWidth:u,markers:m(o({answers:m(a),label:a,x:u,y:u})),hideChoicesFromInstructions:l,multipleAnswers:l,static:l})),or=h(d("matcher"),o({labels:m(a),left:m(a),right:m(a),orderMatters:l,padding:l})),ur=h(v(d("matrix"),()=>"matrix"),o({prefix:t(a),suffix:t(a),answers:m(m(u)),cursorPosition:t(m(u)),matrixBoardSize:m(u),static:t(l)})),lr=h(d("measurer"),o({image:ne,showProtractor:l,showRuler:l,rulerLabel:a,rulerTicks:u,rulerPixels:u,rulerLength:u,box:b(u,u),static:l})),dr=h(d("molecule-renderer"),o({widgetId:a,rotationAngle:t(u),smiles:t(a)})),mr=h(d("number-line"),o({range:m(u),labelRange:m(w(u)),labelStyle:a,labelTicks:l,isTickCtrl:t(w(l)),divisionRange:m(u),numDivisions:t(w(u)),snapDivisions:v(u,()=>2),tickStep:t(w(u)),correctRel:t(w(a)),correctX:u,initialX:t(w(u)),showTooltip:t(l),static:l})),ve=f("integer","mixed","improper","proper","decimal","percent","pi"),pr=h(d("numeric-input"),o({answers:m(o({message:a,value:t(u),status:a,answerForms:t(m(ve)),strict:l,maxError:t(w(u)),simplify:t(w(a))})),labelText:t(a),size:a,coefficient:l,rightAlign:t(l),static:v(l,()=>!1),answerForms:t(m(o({name:ve,simplify:t(w(f("required","correct","enforced","optional")))})))}));function ie(n,e){return ee(n,e)}const cr=(n,e)=>n==="large"?e.success("auto"):e.success(n),gr=h(d("orderer"),o({options:v(m(ie),()=>[]),correctOptions:m(ie),otherOptions:m(ie),height:U(f("normal","auto","large")).then(cr).parser,layout:v(f("horizontal","vertical"),()=>"horizontal")})),yr=h(d("passage-ref"),o({passageNumber:u,referenceNumber:u,summaryText:a})),hr=h(d("passage"),o({footnotes:a,passageText:a,passageTitle:a,showLineNumbers:l,static:v(l,()=>!1)})),fr=h(d("phet-simulation"),o({url:a,description:a})),wr=h(d("plotter"),o({labels:m(a),categories:m(a),type:f(...Oe),maxY:u,scaleY:u,labelInterval:t(w(u)),snapsPerLine:u,starting:m(u),correct:m(u),picUrl:t(w(a)),picSize:t(w(u)),picBoxHeight:t(w(u)),plotDimensions:v(m(u),()=>[380,300])})),br=h(d("python-program"),o({programID:a,height:u})),vr=h(d("radio"),o({choices:m(o({content:v(a,()=>""),clue:t(a),correct:t(l),isNoneOfTheAbove:t(l),widgets:t((n,e)=>z(n,e))})),hasNoneOfTheAbove:t(l),countChoices:t(l),randomize:t(l),multipleSelect:t(l),deselectEnabled:t(l),onePerLine:t(l),displayCount:t(L),noneOfTheAbove:t(d(!1))})),kr=h(d("sorter"),o({correct:m(a),padding:l,layout:f("horizontal","vertical")})),Tr=h(d("table"),o({headers:m(a),rows:u,columns:u,answers:m(m(a))})),Rr=h(d("video"),o({location:a,static:t(l)})),z=(n,e)=>{if(!pe(n))return e.failure("PerseusWidgetsMap",n);const r={};for(const i of Object.keys(n)){const s=qr([i,n[i]],r,e.forSubtree(i));if(C(s))return s}return e.success(r)},qr=([n,e],r,i)=>{const s=Ar(n.split(" "),i);if(C(s))return s;const[g,c]=s.value;function p(R,P){const S=P(e,i);return C(S)?S:(r[R]=S.value,i.success(void 0))}switch(g){case"categorizer":return p(`categorizer ${c}`,yn);case"cs-program":return p(`cs-program ${c}`,hn);case"definition":return p(`definition ${c}`,fn);case"dropdown":return p(`dropdown ${c}`,wn);case"explanation":return p(`explanation ${c}`,bn);case"expression":return p(`expression ${c}`,qn);case"grapher":return p(`grapher ${c}`,An);case"group":return p(`group ${c}`,Sn);case"graded-group":return p(`graded-group ${c}`,Pn);case"graded-group-set":return p(`graded-group-set ${c}`,Cn);case"iframe":return p(`iframe ${c}`,In);case"image":return p(`image ${c}`,Wn);case"input-number":return p(`input-number ${c}`,En);case"interaction":return p(`interaction ${c}`,Gn);case"interactive-graph":return p(`interactive-graph ${c}`,ir);case"label-image":return p(`label-image ${c}`,sr);case"matcher":return p(`matcher ${c}`,or);case"matrix":return p(`matrix ${c}`,ur);case"measurer":return p(`measurer ${c}`,lr);case"molecule-renderer":return p(`molecule-renderer ${c}`,dr);case"number-line":return p(`number-line ${c}`,mr);case"numeric-input":return p(`numeric-input ${c}`,pr);case"orderer":return p(`orderer ${c}`,gr);case"passage":return p(`passage ${c}`,hr);case"passage-ref":return p(`passage-ref ${c}`,yr);case"passage-ref-target":return p(`passage-ref-target ${c}`,L);case"phet-simulation":return p(`phet-simulation ${c}`,fr);case"plotter":return p(`plotter ${c}`,wr);case"python-program":return p(`python-program ${c}`,br);case"radio":return p(`radio ${c}`,vr);case"sorter":return p(`sorter ${c}`,kr);case"table":return p(`table ${c}`,Tr);case"video":return p(`video ${c}`,Rr);case"sequence":return p(`sequence ${c}`,Pr);default:return Ue(g)?p(`${g} ${c}`,L):i.failure("a valid widget type",g)}},Pr=h((n,e)=>e.success("deprecated-standin"),o({})),Cr=(n,e)=>typeof n!="string"||!/^[1-9][0-9]*$/.test(n)?e.failure("numeric string",n):e.success(+n),Ar=b(a,Cr),Sr=o({replace:t(l),content:a,widgets:v(z,()=>({})),metadata:t(m(a)),images:je});o({question:ee,hints:v(m(Sr),()=>[]),answerArea:U(v(o({}),()=>({}))).then(Ir).then(ge(f(...Me),l)).parser,itemDataVersion:t(o({major:u,minor:u})),answer:L});function Ir(n,e){const{type:r,options:i,...s}=n;return e.success(s)}export{ue as M,V as S,Kr as a,$r as b,Be as c,_ as d,Z as e,Vr as f,Ce as g,Jr as i,k as l,en as r,W as s};
