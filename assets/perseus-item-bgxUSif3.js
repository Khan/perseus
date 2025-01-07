import{a as he}from"./version-akiLXZts.js";import{w as we,F as be,B as fe,I as ke}from"./article-renderer-5ZziiuCj.js";import{r as ve,t as qe,l as Ce,R as Re,p as ae,v as Te}from"./renderer-yJbRLelh.js";import{j as T}from"./jsx-runtime-63Ea5SlK.js";import{l as le}from"./index-awljIyHI.js";import{r as K}from"./index-6oxdNXpR.js";import{_}from"./jquery-yG1GhClm.js";import{c as Ae}from"./asset-context-H6Iqp7Gi.js";import{P as Pe}from"./i18n-context-ei4f54eq.js";import{D as xe}from"./dependencies-CP7Uh8Kq.js";import{H as Ie}from"./hints-renderer-t65SiAoW.js";import{A as Se}from"./perseus-api-ooj0_ZRv.js";import{U as je}from"./util-_iDv4tVD.js";const Ne="@khanacademy/perseus",Oe="__lib_version__";he(Ne,Oe);const We={major:0,minor:1};ve(we);const Fe=qe();Fe["::renderer::"]=We;const Le={onRendered:t=>{}},Me=K.createContext(Le),U=class U extends K.Component{constructor(n){super(n),this._handleFocusChange=(s,u)=>{s!=null?this._setCurrentFocus(s):this._onRendererBlur(u)},this.handleInteractWithWidget=s=>{var l,g;const u=_.difference(this.state.questionHighlightedWidgets,[s]);this.setState({questionCompleted:!1,questionHighlightedWidgets:u}),(g=(l=this.props.apiOptions)==null?void 0:l.interactionCallback)==null||g.call(l,this.questionRenderer.getUserInputMap())},this.setAssetStatus=(s,u)=>{const l={...this.state.assetStatuses,[s]:u};this.setState({assetStatuses:l})},this.state={questionCompleted:!1,questionHighlightedWidgets:[],assetStatuses:{}},this._fullyRendered=!1}componentDidMount(){this._currentFocus=null,this._fullyRendered=!1}UNSAFE_componentWillReceiveProps(n){this.setState({questionHighlightedWidgets:[]})}componentDidUpdate(n,s){const u=this.props.apiOptions.answerableCallback;if(u!=null){const l=this.questionRenderer.emptyWidgets().length===0;u(l)}if(this._fullyRendered||Object.values(this.state.assetStatuses).every(Boolean)&&(this._fullyRendered=!0,this.props.onRendered(!0)),this.props.score&&this.props.score!==n.score){const l=this.questionRenderer.emptyWidgets();this.setState({questionCompleted:this.props.score.correct,questionHighlightedWidgets:l})}}componentWillUnmount(){this.blurTimeoutID!=null&&(clearTimeout(this.blurTimeoutID),this.blurTimeoutID=null)}_setCurrentFocus(n){const{apiOptions:{isMobile:s,onFocusChange:u},keypadElement:l}=this.props,g=this._currentFocus;this._currentFocus=n;const y=this.getInputPaths(),p=this._currentFocus&&y.some(q=>je.inputPathsEqual(q,this._currentFocus));u!=null&&setTimeout(()=>{const q=l==null?void 0:l.getDOMNode(),A=q&&p?q.getBoundingClientRect().height:0;u(this._currentFocus,g,A,p&&this.questionRenderer.getDOMNodeForPath(n))},0),l&&s&&(p?l.activate():l.dismiss())}_onRendererBlur(n){const s=this._currentFocus;_.isEqual(n,s)&&(this.blurTimeoutID=setTimeout(()=>{_.isEqual(this._currentFocus,s)&&this._setCurrentFocus(null)},0))}_setWidgetProps(n,s,u){this.questionRenderer._setWidgetProps(n,s,u)}setInputValue(n,s,u){return this.questionRenderer.setInputValue(n,s,u)}focusPath(n){return this.questionRenderer.focusPath(n)}blurPath(n){return this.questionRenderer.blurPath(n)}getDOMNodeForPath(n){return this.questionRenderer.getDOMNodeForPath(n)}getInputPaths(){return this.questionRenderer.getInputPaths()}focus(){return this.questionRenderer.focus()}blur(){this._currentFocus&&this.blurPath(this._currentFocus)}getNumHints(){return this.props.item.hints.length}getPromptJSON(){return this.questionRenderer.getPromptJSON()}getUserInputLegacy(){return this.questionRenderer.getUserInput()}getUserInput(){return this.questionRenderer.getUserInputMap()}getWidgetIds(){return this.questionRenderer.getWidgetIds()}getSerializedState(){return{question:this.questionRenderer.getSerializedState(),hints:this.hintsRenderer.getSerializedState()}}restoreSerializedState(n,s){let u=2;const l=()=>{--u,s&&u===0&&s()};this.questionRenderer.restoreSerializedState(n.question,l),this.hintsRenderer.restoreSerializedState(n.hints,l)}showRationalesForCurrentlySelectedChoices(){this.questionRenderer.showRationalesForCurrentlySelectedChoices()}deselectIncorrectSelectedChoices(){this.questionRenderer.deselectIncorrectSelectedChoices()}render(){const n={...Se.defaults,...this.props.apiOptions,onFocusChange:this._handleFocusChange},s={assetStatuses:this.state.assetStatuses,setAssetStatus:this.setAssetStatus},u=T.jsx(Ae.Provider,{value:s,children:T.jsx(Re,{keypadElement:this.props.keypadElement,problemNum:this.props.problemNum,onInteractWithWidget:this.handleInteractWithWidget,highlightedWidgets:this.state.questionHighlightedWidgets,apiOptions:n,questionCompleted:this.state.questionCompleted,reviewMode:this.props.reviewMode,showSolutions:this.props.showSolutions,ref:g=>{g!=null&&(this.questionRenderer=g)},content:this.props.item.question.content,widgets:this.props.item.question.widgets,images:this.props.item.question.images,linterContext:ae(this.props.linterContext,"question"),strings:this.context.strings,...this.props.dependencies})}),l=T.jsx(Ie,{hints:this.props.item.hints,hintsVisible:this.props.hintsVisible,apiOptions:n,ref:g=>this.hintsRenderer=g,linterContext:ae(this.props.linterContext,"hints"),strings:this.context.strings});return T.jsx(xe.Provider,{value:this.props.dependencies,children:T.jsxs("div",{children:[T.jsx("div",{children:u}),T.jsx("div",{className:n.isMobile?void 0:le.css(De.hintsContainer),children:l})]})})}};U.contextType=Pe,U.defaultProps={apiOptions:{},linterContext:Ce,onRendered:n=>{}};let G=U;const De=le.StyleSheet.create({hintsContainer:{marginLeft:50}}),Ge=K.forwardRef((t,n)=>T.jsx(Me.Consumer,{children:({onRendered:s})=>T.jsx(G,{...t,onRendered:s,ref:n})}));G.__docgenInfo={description:"",methods:[{name:"_handleFocusChange",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"oldFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setCurrentFocus",docblock:null,modifiers:[],params:[{name:"newFocus",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_onRendererBlur",docblock:null,modifiers:[],params:[{name:"blurPath",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}}],returns:null},{name:"_setWidgetProps",docblock:`Accepts a question area widgetId, or an answer area widgetId of
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
}`,computed:!1},required:!1},onRendered:{defaultValue:{value:"(isRendered: boolean) => {}",computed:!1},required:!1}}};Ge.__docgenInfo={description:"",methods:[],displayName:"ref"};function X(t){return{type:"success",value:t}}function Y(t){return{type:"failure",detail:t}}function C(t){return t.type==="failure"}function W(t){return t.type==="success"}function Ee(t,n=s=>s){const s=[],u=[];for(const l of t)l.type==="success"?s.push(l.value):u.push(l.detail);return u.length>0?Y(u.reduce(n)):X(s)}const F=(t,n)=>n.success(t);function d(t){return(n,s)=>{if(!Array.isArray(n))return s.failure("array",n);const u=n.map((l,g)=>t(l,s.forSubtree(g)));return Ee(u,Ue)}}function Ue(t,n){return[...t,...n]}function i(t,n){return typeof t=="boolean"?n.success(t):n.failure("boolean",t)}function m(t){return(n,s)=>n!==t?s.failure(String(JSON.stringify(t)),n):s.success(t)}function w(...t){return(n,s)=>{if(typeof n=="string"){const l=t.indexOf(n);if(l>-1)return s.success(t[l])}const u=t.map(l=>JSON.stringify(l));return s.failure(u,n)}}function L(t){return t!=null&&Object.getPrototypeOf(t)===Object.prototype}function b(t){return(n,s)=>n===null?s.success(n):t(n,s)}const o=(t,n)=>typeof t=="number"?n.success(t):n.failure("number",t);function a(t){return(n,s)=>{if(!L(n))return s.failure("object",n);const u={...n},l=[];for(const[g,y]of Object.entries(t)){const p=y(n[g],s.forSubtree(g));W(p)?u[g]=p.value:l.push(...p.detail)}return l.length>0?Y(l):s.success(u)}}function e(t){return(n,s)=>n===void 0?s.success(n):t(n,s)}function k(t,n){return(s,u)=>{if(!Array.isArray(s))return u.failure("array",s);if(s.length!==2)return u.failure("array of length 2",s);const[l,g]=s,y=t(l,u.forSubtree(0));if(C(y))return y;const p=n(g,u.forSubtree(1));return C(p)?p:u.success([y.value,p.value])}}function I(t){return new Q(t)}class Q{constructor(n){this.parser=n}then(n){return new Q(Ve(this.parser,n))}}function Ve(t,n){return(s,u)=>{const l=t(s,u);return C(l)?l:n(l.value,u)}}function Z(t,n){return(s,u)=>{if(!L(s))return u.failure("object",s);const l={},g=[];for(const[y,p]of Object.entries(s)){const q=u.forSubtree(y),A=t(y,q);C(A)&&g.push(...A.detail);const P=n(p,q);C(P)&&g.push(...P.detail),W(A)&&W(P)&&(l[A.value]=P.value)}return g.length>0?Y(g):u.success(l)}}const r=(t,n)=>typeof t=="string"?n.success(t):n.failure("string",t);function E(t,n,s){return(u,l)=>{if(!Array.isArray(u))return l.failure("array",u);if(u.length!==3)return l.failure("array of length 3",u);const g=t(u[0],l.forSubtree(0));if(C(g))return g;const y=n(u[1],l.forSubtree(1));if(C(y))return y;const p=s(u[2],l.forSubtree(2));return C(p)?p:l.success([g.value,y.value,p.value])}}function v(t){return new ee(t)}class ee{constructor(n){this.parser=n}or(n){return new ee($e(this.parser,n))}}function $e(t,n){return(s,u)=>{const l=t(s,u);return W(l)?l:n(s,u)}}function f(t,n){return(s,u)=>s==null?X(n(s)):t(s,u)}const me=f(Z(r,a({width:o,height:o})),()=>({}));function h(t,n){return a({type:t,static:e(i),graded:e(i),alignment:e(r),options:n,key:e(o),version:e(a({major:o,minor:o}))})}function de(t,n,s){return a({type:n,static:e(i),graded:e(i),alignment:e(r),options:s,key:e(o),version:t})}const Je=h(m("categorizer"),a({items:d(r),categories:d(r),randomizeItems:i,static:f(i,()=>!1),values:d(o),highlightLint:e(i),linterContext:e(a({contentType:r,paths:d(r),stack:d(r)}))})),_e=h(m("cs-program"),a({programID:r,programType:F,settings:d(a({name:r,value:r})),showEditor:i,showButtons:i,width:o,height:o,static:i})),ze=h(m("definition"),a({togglePrompt:r,definition:r,static:f(i,()=>!1)})),Be=h(m("dropdown"),a({placeholder:r,ariaLabel:e(r),visibleLabel:e(r),static:f(i,()=>!1),choices:d(a({content:r,correct:i}))})),He=h(m("explanation"),a({showPrompt:r,hidePrompt:r,explanation:r,widgets:f((t,n)=>M(t,n),()=>({})),static:f(i,()=>!1)}));function ne(t){return(n,s)=>s.success(t(n))}function Ke(t){return new re(t,n=>n)}class re{constructor(n,s){this.parser=n,this.migrate=s}withMigrationFrom(n,s){const u=this.parser,l=g=>this.migrate(s(g));return new re((g,y)=>{const p=u(g,y);if(W(p))return p;const q=n(g,y);return W(q)?X(l(q.value)):q},l)}}const Xe=a({value:e(r),form:f(i,()=>!1),simplify:f(i,()=>!1),considered:w("correct","wrong","ungraded"),key:I(e(v(r).or(o).parser)).then((t,n)=>n.success(String(t))).parser});function Ye(t){const n=[];for(const s of t){const{value:u}=s;u!=null&&n.push({...s,value:u})}return n}const Qe=a({major:m(1),minor:o}),Ze=de(Qe,m("expression"),a({answerForms:I(d(Xe)).then(ne(Ye)).parser,functions:d(r),times:i,visibleLabel:e(r),ariaLabel:e(r),buttonSets:d(w("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),buttonsVisible:e(w("always","never","focused"))})),en=e(a({major:m(0),minor:o})),nn=de(en,m("expression"),a({functions:d(r),times:i,visibleLabel:e(r),ariaLabel:e(r),form:i,simplify:i,value:r,buttonSets:d(w("basic","basic+div","trig","prealgebra","logarithms","basic relations","advanced relations")),buttonsVisible:e(w("always","never","focused"))}));function rn(t){const{options:n}=t;return{...t,version:{major:1,minor:0},options:{times:n.times,buttonSets:n.buttonSets,functions:n.functions,buttonsVisible:n.buttonsVisible,visibleLabel:n.visibleLabel,ariaLabel:n.ariaLabel,answerForms:[{considered:"correct",form:n.form,simplify:n.simplify,value:n.value}]}}}const tn=Ke(Ze).withMigrationFrom(nn,rn).parser,V=f(a({content:f(r,()=>""),widgets:f((t,n)=>M(t,n),()=>({})),metadata:e(d(r)),images:me}),()=>({content:"",widgets:{},images:{}})),pe=a({title:f(r,()=>""),hasHint:e(b(i)),hint:e(b((t,n)=>V(t,n))),content:r,widgets:(t,n)=>M(t,n),widgetEnabled:e(b(i)),immutableWidgets:e(b(i)),images:Z(r,a({width:o,height:o}))}),an=h(m("graded-group"),pe),sn=h(m("graded-group-set"),a({gradedGroups:d(pe)}));function ce(t){const n=(s,u)=>L(s)?u.forSubtree(t).failure("a valid value",s[t]):u.failure("object",s);return new te(t,n)}class te{constructor(n,s){this.discriminantKey=n,this.parser=s}withBranch(n,s){const u=on(this.discriminantKey,n,s,this.parser);return new te(this.discriminantKey,u)}}function on(t,n,s,u){return(l,g)=>L(l)?l[t]===n?s(l,g):u(l,g):g.failure("object",l)}const x=k(o,o),R=k(x,x),un=h(m("grapher"),a({availableTypes:d(w("absolute_value","exponential","linear","logarithm","quadratic","sinusoid","tangent")),correct:ce("type").withBranch("absolute_value",a({type:m("absolute_value"),coords:R})).withBranch("exponential",a({type:m("exponential"),asymptote:R,coords:R})).withBranch("linear",a({type:m("linear"),coords:R})).withBranch("logarithm",a({type:m("logarithm"),asymptote:R,coords:R})).withBranch("quadratic",a({type:m("quadratic"),coords:R})).withBranch("sinusoid",a({type:m("sinusoid"),coords:R})).withBranch("tangent",a({type:m("tangent"),coords:R})).parser,graph:a({backgroundImage:a({bottom:e(o),height:e(o),left:e(o),scale:e(o),url:e(b(r)),width:e(o)}),box:e(x),editableSettings:e(d(w("graph","snap","image","measure"))),gridStep:e(x),labels:k(r,r),markings:w("graph","none","grid"),range:k(x,x),rulerLabel:m(""),rulerTicks:o,showProtractor:e(i),showRuler:e(i),showTooltips:e(i),snapStep:e(x),step:x,valid:e(v(i).or(r).parser)})})),ln=h(m("group"),(t,n)=>V(t,n)),mn=h(m("iframe"),a({url:r,settings:d(a({name:r,value:r})),width:v(o).or(r).parser,height:v(o).or(r).parser,allowFullScreen:i,allowTopNavigation:e(i),static:f(i,()=>!1)})),ye=(t,n)=>{if(typeof t=="number")return n.success(t);const s=+t;return t===""||isNaN(s)?n.failure("a number or numeric string",t):n.success(s)};function dn(t){return t===""?0:t}const N=I(v(o).or(r).parser).then(ne(dn)).then(ye).parser,$=a({url:e(b(r)),width:e(N),height:e(N),top:e(N),left:e(N),bottom:e(N),scale:e(N)}),z=k(o,o),pn=h(m("image"),a({title:e(r),caption:e(r),alt:e(r),backgroundImage:$,static:e(i),labels:e(d(a({content:r,alignment:r,coordinates:d(o)}))),range:e(k(z,z)),box:e(z)})),cn=(t,n)=>typeof t=="boolean"?n.success(String(t)):n.failure("boolean",t),yn=h(m("input-number"),a({answerType:e(w("number","decimal","integer","rational","improper","mixed","percent","pi")),inexact:e(i),maxError:e(v(o).or(r).parser),rightAlign:e(i),simplify:w("required","optional","enforced"),size:w("normal","small"),value:v(o).or(r).or(cn).parser,customKeypad:e(i)})),O=k(o,o),D=f(r,()=>""),gn=m("function"),hn=a({type:gn,key:r,options:a({value:r,funcName:r,rangeMin:r,rangeMax:r,color:r,strokeDasharray:r,strokeWidth:o})}),wn=m("label"),bn=a({type:wn,key:r,options:a({label:r,color:r,coordX:r,coordY:r})}),fn=m("line"),kn=a({type:fn,key:r,options:a({color:r,startX:r,startY:r,endX:r,endY:r,strokeDasharray:r,strokeWidth:o,arrows:r})}),vn=m("movable-line"),qn=a({type:vn,key:r,options:a({startX:r,startY:r,startSubscript:o,endX:r,endY:r,endSubscript:o,constraint:r,snap:o,constraintFn:r,constraintXMin:r,constraintXMax:r,constraintYMin:r,constraintYMax:r})}),Cn=m("movable-point"),Rn=a({type:Cn,key:r,options:a({startX:r,startY:r,varSubscript:o,constraint:r,snap:o,constraintFn:r,constraintXMin:D,constraintXMax:D,constraintYMin:D,constraintYMax:D})}),Tn=m("parametric"),An=a({type:Tn,key:r,options:a({x:r,y:r,rangeMin:r,rangeMax:r,color:r,strokeDasharray:r,strokeWidth:o})}),Pn=m("point"),xn=a({type:Pn,key:r,options:a({color:r,coordX:r,coordY:r})}),In=m("rectangle"),Sn=a({type:In,key:r,options:a({color:r,coordX:r,coordY:r,width:r,height:r})}),jn=h(m("interaction"),a({static:f(i,()=>!1),graph:a({editableSettings:e(d(w("canvas","graph"))),box:O,labels:d(r),range:k(O,O),gridStep:O,markings:w("graph","grid","none"),snapStep:e(O),valid:e(v(i).or(r).parser),backgroundImage:e($),showProtractor:e(i),showRuler:e(i),rulerLabel:e(r),rulerTicks:e(o),tickStep:O}),elements:d(ce("type").withBranch("function",hn).withBranch("label",bn).withBranch("line",kn).withBranch("movable-line",qn).withBranch("movable-point",Rn).withBranch("parametric",An).withBranch("point",xn).withBranch("rectangle",Sn).parser)})),c=k(o,o),se=a({type:m("angle"),showAngles:e(i),allowReflexAngles:e(i),angleOffsetDeg:e(o),snapDegrees:e(o),match:e(m("congruent")),coords:e(E(c,c,c)),startCoords:e(E(c,c,c))}),Nn=a({type:m("circle"),center:e(c),radius:e(o),startCoords:e(a({center:c,radius:o})),coord:e(c)}),On=a({type:m("linear"),coords:e(b(k(c,c))),startCoords:e(k(c,c)),coord:e(c)}),Wn=a({type:m("linear-system"),coords:e(b(d(k(c,c)))),startCoords:e(d(k(c,c))),coord:e(c)}),Fn=a({type:m("none")}),Ln=a({type:m("point"),numPoints:e(v(o).or(m("unlimited")).parser),coords:e(b(d(c))),startCoords:e(d(c)),coord:e(c)}),Mn=a({type:m("polygon"),numSides:e(v(o).or(m("unlimited")).parser),showAngles:e(i),showSides:e(i),snapTo:e(w("grid","angles","sides")),match:e(w("similar","congruent","approx")),startCoords:e(d(c)),coord:e(c)}),Dn=a({type:m("quadratic"),coords:e(b(E(c,c,c))),startCoords:e(E(c,c,c)),coord:e(c)}),Gn=a({type:m("ray"),coords:e(b(k(c,c))),startCoords:e(k(c,c)),coord:e(c)}),En=a({type:m("segment"),numSegments:e(o),coords:e(b(d(k(c,c)))),startCoords:e(d(k(c,c))),coord:e(c)}),Un=a({type:m("sinusoid"),coords:e(b(d(c))),startCoords:e(d(c)),coord:e(c)}),oe=v(se).or(se).or(Nn).or(On).or(Wn).or(Fn).or(Ln).or(Mn).or(Dn).or(Gn).or(En).or(Un).parser,S=w(...be),ge=w("none","white","translucent","solid"),J=w("solid","dashed"),j=a({type:m("label"),coord:c,text:r,color:S,size:w("small","medium","large")}),H=a({type:m("point"),coord:c,color:S,filled:i,labels:e(d(j)),ariaLabel:e(r)}),Vn=a({type:m("line"),kind:w("line","ray","segment"),points:k(H,H),color:S,lineStyle:J,showPoint1:i,showPoint2:i,labels:e(d(j)),ariaLabel:e(r)}),$n=a({type:m("vector"),points:k(c,c),color:S,labels:e(d(j)),ariaLabel:e(r)}),Jn=a({type:m("ellipse"),center:c,radius:c,angle:o,color:S,fillStyle:ge,strokeStyle:J,labels:e(d(j)),ariaLabel:e(r)}),_n=a({type:m("polygon"),points:d(c),color:S,showVertices:i,fillStyle:ge,strokeStyle:J,labels:e(d(j)),ariaLabel:e(r)}),zn=a({type:m("function"),color:S,strokeStyle:J,equation:r,directionalAxis:w("x","y"),domain:e(c),labels:e(d(j)),ariaLabel:e(r)}),Bn=v(H).or(Vn).or($n).or(Jn).or(_n).or(zn).or(j).parser,Hn=h(m("interactive-graph"),a({step:c,gridStep:e(c),snapStep:e(c),backgroundImage:e($),markings:w("graph","grid","none"),labels:e(d(r)),showProtractor:i,showRuler:e(i),showTooltips:e(i),rulerLabel:e(r),rulerTicks:e(o),range:k(c,c),graph:f(oe,()=>({type:"linear"})),correct:oe,lockedFigures:e(d(Bn)),fullGraphLabel:e(r),fullGraphAriaDescription:e(r)})),Kn=h(m("label-image"),a({choices:d(r),imageUrl:r,imageAlt:r,imageHeight:o,imageWidth:o,markers:d(a({answers:d(r),label:r,x:o,y:o})),hideChoicesFromInstructions:i,multipleAnswers:i,static:i})),Xn=h(m("matcher"),a({labels:d(r),left:d(r),right:d(r),orderMatters:i,padding:i})),Yn=I(v(o).or(r).parser).then(ye).parser,Qn=h(f(m("matrix"),()=>"matrix"),a({prefix:e(r),suffix:e(r),answers:d(d(Yn)),cursorPosition:e(d(o)),matrixBoardSize:d(o),static:e(i)})),Zn=h(m("measurer"),a({image:$,showProtractor:i,showRuler:i,rulerLabel:r,rulerTicks:o,rulerPixels:o,rulerLength:o,box:k(o,o),static:i})),er=h(m("molecule-renderer"),a({widgetId:r,rotationAngle:e(o),smiles:e(r)})),nr=h(m("number-line"),a({range:d(o),labelRange:d(b(o)),labelStyle:r,labelTicks:i,isTickCtrl:e(b(i)),divisionRange:d(o),numDivisions:e(b(o)),snapDivisions:f(o,()=>2),tickStep:e(b(o)),correctRel:e(b(r)),correctX:o,initialX:e(b(o)),showTooltip:e(i),static:i})),ie=w("integer","mixed","improper","proper","decimal","percent","pi"),rr=h(m("numeric-input"),a({answers:d(a({message:r,value:e(b(o)),status:r,answerForms:e(d(ie)),strict:i,maxError:e(b(o)),simplify:e(b(v(r).or(I(m(!0)).then(ne(String)).parser).parser))})),labelText:e(r),size:r,coefficient:i,rightAlign:e(i),static:f(i,()=>!1),answerForms:e(d(a({name:ie,simplify:e(b(w("required","correct","enforced","optional")))})))}));function B(t,n){return V(t,n)}const tr=(t,n)=>t==="large"?n.success("auto"):n.success(t),ar=h(m("orderer"),a({options:f(d(B),()=>[]),correctOptions:d(B),otherOptions:d(B),height:I(w("normal","auto","large")).then(tr).parser,layout:f(w("horizontal","vertical"),()=>"horizontal")})),sr=h(m("passage-ref"),a({passageNumber:o,referenceNumber:o,summaryText:e(r)})),or=h(m("passage"),a({footnotes:r,passageText:r,passageTitle:r,showLineNumbers:i,static:f(i,()=>!1)})),ir=h(m("phet-simulation"),a({url:r,description:r})),ur=h(m("plotter"),a({labels:d(r),categories:d(r),type:w(...fe),maxY:o,scaleY:o,labelInterval:e(b(o)),snapsPerLine:o,starting:d(o),correct:d(o),picUrl:e(b(r)),picSize:e(b(o)),picBoxHeight:e(b(o)),plotDimensions:f(d(o),()=>[380,300])})),lr=h(m("python-program"),a({programID:r,height:o})),mr=h(m("radio"),a({choices:d(a({content:f(r,()=>""),clue:e(r),correct:e(i),isNoneOfTheAbove:e(i),widgets:e((t,n)=>M(t,n))})),hasNoneOfTheAbove:e(i),countChoices:e(i),randomize:e(i),multipleSelect:e(i),deselectEnabled:e(i),onePerLine:e(i),displayCount:e(F),noneOfTheAbove:e(m(!1))})),dr=h(m("sorter"),a({correct:d(r),padding:i,layout:w("horizontal","vertical")})),pr=h(m("table"),a({headers:d(r),rows:o,columns:o,answers:d(d(r))})),cr=h(m("video"),a({location:r,static:e(i)})),M=(t,n)=>{if(!L(t))return n.failure("PerseusWidgetsMap",t);const s={};for(const u of Object.keys(t)){const l=yr([u,t[u]],s,n.forSubtree(u));if(C(l))return l}return n.success(s)},yr=([t,n],s,u)=>{const l=hr(t.split(" "),u);if(C(l))return l;const[g,y]=l.value;function p(q,A){const P=A(n,u);return C(P)?P:(s[q]=P.value,u.success(void 0))}switch(g){case"categorizer":return p(`categorizer ${y}`,Je);case"cs-program":return p(`cs-program ${y}`,_e);case"definition":return p(`definition ${y}`,ze);case"dropdown":return p(`dropdown ${y}`,Be);case"explanation":return p(`explanation ${y}`,He);case"expression":return p(`expression ${y}`,tn);case"grapher":return p(`grapher ${y}`,un);case"group":return p(`group ${y}`,ln);case"graded-group":return p(`graded-group ${y}`,an);case"graded-group-set":return p(`graded-group-set ${y}`,sn);case"iframe":return p(`iframe ${y}`,mn);case"image":return p(`image ${y}`,pn);case"input-number":return p(`input-number ${y}`,yn);case"interaction":return p(`interaction ${y}`,jn);case"interactive-graph":return p(`interactive-graph ${y}`,Hn);case"label-image":return p(`label-image ${y}`,Kn);case"matcher":return p(`matcher ${y}`,Xn);case"matrix":return p(`matrix ${y}`,Qn);case"measurer":return p(`measurer ${y}`,Zn);case"molecule-renderer":return p(`molecule-renderer ${y}`,er);case"number-line":return p(`number-line ${y}`,nr);case"numeric-input":return p(`numeric-input ${y}`,rr);case"orderer":return p(`orderer ${y}`,ar);case"passage":return p(`passage ${y}`,or);case"passage-ref":return p(`passage-ref ${y}`,sr);case"passage-ref-target":return p(`passage-ref-target ${y}`,F);case"phet-simulation":return p(`phet-simulation ${y}`,ir);case"plotter":return p(`plotter ${y}`,ur);case"python-program":return p(`python-program ${y}`,lr);case"radio":return p(`radio ${y}`,mr);case"sorter":return p(`sorter ${y}`,dr);case"table":return p(`table ${y}`,pr);case"video":return p(`video ${y}`,cr);case"sequence":return p(`sequence ${y}`,ue);case"lights-puzzle":return p(`lights-puzzle ${y}`,ue);default:return Te(g)?p(`${g} ${y}`,F):u.failure("a valid widget type",g)}},ue=h((t,n)=>n.success("deprecated-standin"),a({})),gr=(t,n)=>typeof t!="string"||!/^[1-9][0-9]*$/.test(t)?n.failure("numeric string",t):n.success(+t),hr=k(r,gr),wr=a({replace:e(i),content:r,widgets:f(M,()=>({})),metadata:e(d(r)),images:me});a({question:V,hints:f(d(wr),()=>[]),answerArea:I(f(a({}),()=>({}))).then(br).then(Z(w(...ke),i)).parser,itemDataVersion:e(a({major:o,minor:o})),answer:F});function br(t,n){const{type:s,options:u,...l}=t;return n.success(l)}export{G as S,We as i,Ge as r};
