import{t as qt,v as pa,Q as _s,r as ga,$ as Rr,a0 as Vs,_ as Pt,o as ne,x as ki,Z as jt,a1 as Hs,M as ha}from"./random-util-qPwTTOJz.js";import{M as $s}from"./prop-types-6vNvOlq5.js";import"./key-translator-XtkY5VKe.js";import"./mobile-keypad-0CwlVC6I.js";import"./button-assets-lxPOe30G.js";import{_ as h}from"./underscore-885MUNGo.js";import{g as Us}from"./get-decimal-separator-C5N_K9o2.js";import{l as re,S as W,R as X,P as ya,D as Xs,j as xi,m as Ys}from"./renderer-amQNiF1J.js";import{V as _,I as qi,u as zs,d as Bs,b as Pi,_ as Ft}from"./index-hw7d7wq0.js";import{T as Ir}from"./index-X6BFiFsH.js";import{b as wa,L as Ks,a as Ai}from"./index-jek-Xksa.js";import{n as T}from"./no-important-xCWWYXQR.js";import{c as Fe}from"./index-dnMhQZ-1.js";import{r as s,R as V}from"./index-6oxdNXpR.js";import{F as K,r as vn}from"./index-9gkyvru-.js";import{a as G,u as me,b as Js}from"./i18n-context-Q5gDzbF3.js";import{a as H,M as Qs}from"./math-input-APl6q_bk.js";import{u as Nr,g as qe}from"./dependencies-CP7Uh8Kq.js";import{P as an,E as Ke}from"./perseus-error-l3K_anoI.js";import{P as Zs}from"./index-o42urCig.js";import{A as Ne}from"./perseus-api-Y55S7ZPk.js";import{i as el,K as Ye,U as J,I as nl,A as tl,d as fa,j as Tn,b as rl,J as al,c as We,t as At,L as il,e as ol,M as sl,m as ll,N as ba,f as ul,O as va,P as dl,Q as ml}from"./util-AXsb50Si.js";import{$ as D}from"./jquery-5v7aFUvu.js";import{s as ce,c as j,f as cl,a as nn,b as pl}from"./index-zRqVZh6A.js";import{S as Nn}from"./simple-keypad-input-xvn74TpS.js";import{I as Ci}from"./input-with-examples-DYxvEGfK.js";import{L as Ti,G as Z,K as M,I as Me,S as En,W as Wt,a as Er,b as Ri}from"./svg-image-QtqEBn5V.js";import{B as gl}from"./base-radio-R062ZKQN.js";import{I as on}from"./inline-icon-8e4u-lSW.js";import{d as hl,e as yl,f as wl,g as fl,h as bl,j as vl}from"./icon-paths-5JCXzGsq.js";import{m as Gt}from"./media-queries-OayJ4KsJ.js";import{s as ka}from"./shared-hWJYD-yu.js";import{u as kl,n as ze,l as je,h as Xn,v as Ii,i as xl,j as Ni}from"./constants-vGHYchdS.js";import{g as Je,B as ql,a as Pl}from"./phet-simulation-2fci0qCu.js";import{C as Sr}from"./index-OMSOgf8r.js";import{P as Al,a as Cl}from"./index-yKRLgHQQ.js";import{O as xa,S as Tl,A as Rl}from"./answer-choices-CkIf96wq.js";import{B as ye}from"./index-71P4mDMp.js";import{B as Il}from"./button-group-f5V3tSn8.js";import{c as Or}from"./zoomable-tex-w6m6mqm2.js";import{w as fe}from"./index-J2t_5nK1.js";import{v as b,C as Nl,E as El,P as Yn,a as zn,L as qa,b as _t,T as Sl,u as Ol,c as Ei,d as Ml,M as Pa}from"./index-smZ6iCr_.js";import"./hud-VpTa1tZ-.js";import"./icon-H34hvC3Q.js";import"./index-3j9EmwNK.js";import"./multi-button-group-7ejnk4_z.js";import{N as Si}from"./number-input-AKWy2-dG.js";import"./range-input-VZIILw9-.js";import{T as Ll}from"./text-input-W13PSE1A.js";import"./text-list-editor-9dKImvgD.js";import{i as oe}from"./tiny-invariant-bHgPayXn.js";import{m as Dl,c as jl,u as Fl,a as Wl,T as Gl}from"./index-Y1DiWZsM.js";import{M as _l}from"./marker-7wRgyZJV.js";import{C as Vl}from"./index--z92Kcj-.js";import{S as Vt}from"./sortable-hpsTAy6s.js";import{F as Hl}from"./fixed-to-responsive-8Rm8IBlT.js";import{V as $l}from"./video-transcript-link-XqnTOiFk.js";const Ul=["key","ref","containerSizeClass","widgetId","onChange","problemNum","apiOptions","widgetIsOpen","questionCompleted","findWidgets","onRemove","id","onBlur","onFocus","trackInteraction","keypadElement"],Xl=`Usage:
  this.change({propName: 5}, callback);
  this.change("propName", 5, callback);
  this.change("propName")`,Oi=function(n,e,t){const r=h.omit(n.props,Ul),a=h.extend(r,e);n.props.onChange(a,t)},Mi=function(n,e,t,r){if(t===void 0)return h.partial(Mi,n,e);const a={};a[e]=t,Oi(n,a,r)},ae=function(n,e,t){if(h.isObject(n)&&t===void 0)return t=e,Oi(this,n,t);if(typeof n=="string")return Mi(this,n,e,t);throw new an("Invalid types sent to this.change(): "+h.toArray(arguments).join()+`
`+Xl,Ke.Internal)},Ly={onChange:Zs.func.isRequired},Yl=(n,e)=>({type:"expression",label:n.visibleLabel,userInput:{value:e}}),zl={arctg:"arctan",cosec:"csc",cossec:"csc",cotg:"cot",ctg:"cot",sen:"sin",tg:"tan"},Bl=n=>n.replace(/\\operatorname{([a-z]+)}/g,(e,t)=>`\\${zl[t]??t} `),Aa=n=>Bl(n),Pn=class Pn extends s.Component{constructor(){super(...arguments),this._textareaId=`expression_textarea_${Date.now()}`,this._isMounted=!1,this.displayName="Expression",this.state={invalid:!1,showErrorTooltip:!1,showErrorStyle:!1},this.componentDidMount=()=>{if(document.addEventListener("mousedown",this._handleMouseDown),this._isMounted=!0,this.refs.input){const e=this.props.apiOptions.customKeypad,t=K.findDOMNode(this.refs.input),r=e?".mq-textarea > span":"textarea",a=t.querySelector(r);a==null||a.setAttribute("id",this._textareaId)}},this.componentDidUpdate=e=>{(!h.isEqual(this.props.value,e.value)||!h.isEqual(this.props.functions,e.functions))&&(this.setState({invalid:!1,showErrorTooltip:!1,showErrorStyle:!1}),this.parse(this.props.value,this.props).parsed||this.setState({invalid:!0}))},this.componentWillUnmount=()=>{this._isMounted=!1},this._handleMouseDown=()=>{this._isMounted&&this.state.showErrorTooltip&&this.setState({showErrorTooltip:!1})},this.change=(...e)=>ae.apply(this,e),this.parse=(e,t)=>{const r=h.pick(t||this.props,"functions");return h.extend(r,{decimal_separator:Us(this.context.locale)}),qt(Aa(e),r)},this.changeAndTrack=(e,t)=>{this.change("value",e,t),this.props.trackInteraction()},this._handleFocus=()=>{var e;(e=this.props.analytics)==null||e.onAnalyticsEvent({type:"perseus:expression-focused",payload:null}),this.props.onFocus([])},this._handleBlur=()=>{this.props.onBlur([])},this.focus=()=>(this.props.apiOptions.customKeypad&&this.refs.input.focus(),!0),this.getInputPaths=()=>[[]]}static getUserInputFromProps(e){return Aa(e.value)}getUserInput(){return Pn.getUserInputFromProps(this.props)}getPromptJSON(){return Yl(this.props,this.getUserInput())}focusInputPath(e){this.refs.input.focus()}blurInputPath(e){var t,r;typeof((t=this.refs.input)==null?void 0:t.blur)=="function"&&((r=this.refs.input)==null||r.blur())}insert(e){this.refs.input.insert(e)}setInputValue(e,t,r){this.props.onChange({value:t},r)}render(){var a,i;if(this.props.apiOptions.customKeypad)return s.createElement(_,{className:T.css(Ca.mobileLabelInputWrapper)},!!this.props.visibleLabel&&s.createElement(wa,{htmlFor:this._textareaId,tag:"label"},this.props.visibleLabel),s.createElement($s,{ref:"input",ariaLabel:this.props.ariaLabel||this.context.strings.mathInputBox,value:this.props.value,keypadElement:this.props.keypadElement,onChange:this.changeAndTrack,onFocus:()=>{var o;(o=this.props.keypadElement)==null||o.configure(this.props.keypadConfiguration,()=>{this._isMounted&&this._handleFocus()})},onBlur:this._handleBlur}));const e=Fe({"perseus-widget-expression":!0,"show-error-tooltip":this.state.showErrorTooltip}),{ERROR_MESSAGE:t,ERROR_TITLE:r}=this.context.strings;return s.createElement(_,{className:T.css(Ca.desktopLabelInputWrapper)},!!this.props.visibleLabel&&s.createElement(wa,{htmlFor:this._textareaId,tag:"label"},this.props.visibleLabel),s.createElement("div",{className:e,onBlur:()=>this.state.invalid&&this.setState({showErrorTooltip:!0,showErrorStyle:!0}),onFocus:()=>this.setState({showErrorTooltip:!1})},s.createElement(_,{style:H.srOnly,role:"alert"},this.state.showErrorTooltip&&r+" "+t),s.createElement(Ir,{forceAnchorFocusivity:!1,opened:this.state.showErrorTooltip,title:r,content:t},s.createElement(Qs,{ref:"input",value:this.props.value,onChange:this.changeAndTrack,convertDotToTimes:this.props.times,buttonSets:this.props.buttonSets,onFocus:this._handleFocus,onBlur:this._handleBlur,hasError:this.state.showErrorStyle,ariaLabel:this.props.ariaLabel||this.context.strings.mathInputBox,extraKeys:(a=this.props.keypadConfiguration)==null?void 0:a.extraKeys,onAnalyticsEvent:((i=this.props.analytics)==null?void 0:i.onAnalyticsEvent)??(async()=>{})}))))}};Pn.contextType=G,Pn.defaultProps={value:"",times:!1,functions:[],buttonSets:["basic","trig","prealgebra","logarithms"],onFocus:()=>{},onBlur:()=>{},apiOptions:Ne.defaults,linterContext:re};let Rn=Pn;const Ca=T.StyleSheet.create({mobileLabelInputWrapper:{padding:"15px 4px 0"},desktopLabelInputWrapper:{margin:"5px 5px 0"}}),Li=s.forwardRef((n,e)=>{const t=Nr();return s.createElement(Rn,{ref:e,analytics:t.analytics,...n})});Li.getUserInputFromProps=Rn.getUserInputFromProps;const Kl={name:"expression",displayName:"Expression / Equation",accessible:!0,widget:Li,transform:n=>{const{times:e,functions:t,buttonSets:r,buttonsVisible:a,visibleLabel:i,ariaLabel:o,extraKeys:l}=n;return{keypadConfiguration:{keypadType:"EXPRESSION",extraKeys:l,times:e},times:e,functions:t,buttonSets:r,buttonsVisible:a,visibleLabel:i,ariaLabel:o}},version:pa.version,propUpgrades:pa.widgetOptionsUpgrades,isLintable:!0,getOneCorrectAnswerFromRubric(n){const e=(n.answerForms||[]).filter(t=>t.considered==="correct");if(e.length!==0)return e[0].value}};Rn.__docgenInfo={description:"",methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`ExternalProps &
Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    buttonSets: NonNullable<ExternalProps["buttonSets"]>;
    functions: NonNullable<ExternalProps["functions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    onBlur: NonNullable<ExternalProps["onBlur"]>;
    onFocus: NonNullable<ExternalProps["onFocus"]>;
    times: NonNullable<ExternalProps["times"]>;
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    value: string;
}`,elements:[{name:"intersection",raw:`RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"signature",type:"object",raw:`{
    buttonSets: PerseusExpressionWidgetOptions["buttonSets"];
    buttonsVisible?: PerseusExpressionWidgetOptions["buttonsVisible"];
    functions: PerseusExpressionWidgetOptions["functions"];
    times: PerseusExpressionWidgetOptions["times"];
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    keypadConfiguration: KeypadConfiguration;
}`,signature:{properties:[{key:"buttonSets",value:{name:"ReadonlyArray",raw:'PerseusExpressionWidgetOptions["buttonSets"]',required:!0}},{key:"buttonsVisible",value:{name:"union",raw:'PerseusExpressionWidgetOptions["buttonsVisible"]',required:!1}},{key:"functions",value:{name:"ReadonlyArray",raw:'PerseusExpressionWidgetOptions["functions"]',required:!0}},{key:"times",value:{name:"boolean",raw:'PerseusExpressionWidgetOptions["times"]',required:!0}},{key:"visibleLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["visibleLabel"]',required:!0}},{key:"ariaLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["ariaLabel"]',required:!0}},{key:"keypadConfiguration",value:{name:"signature",type:"object",raw:`{
    keypadType: KeypadType;
    extraKeys?: ReadonlyArray<KeypadKey>;
    times?: boolean;
    scientific?: boolean;
}`,signature:{properties:[{key:"keypadType",value:{name:"union",raw:'"FRACTION" | "EXPRESSION"',elements:[{name:"literal",value:'"FRACTION"'},{name:"literal",value:'"EXPRESSION"'}],required:!0}},{key:"extraKeys",value:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>",required:!1}},{key:"times",value:{name:"boolean",required:!1}},{key:"scientific",value:{name:"boolean",required:!1}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    functions: ReadonlyArray<string>;
}`,signature:{properties:[{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The TeX form of the expression.  e.g. "x\\\\cdot3=y"
    value: string;
    // The Answer expression must have the same form
    form: boolean;
    // The answer expression must be fully expanded and simplified
    simplify: boolean;
    // Whether the form is considered "correct", "wrong", or "ungraded"
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    // A key to identify the answer form in a list
    // NOTE: perseus-format.js says this is required even though it isn't necessary.
    key?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"ReadonlyArray<PerseusExpressionAnswerForm>",required:!0}},{key:"functions",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}]},{name:"Partial",elements:[{name:"ReactContextType",raw:"React.ContextType<typeof DependenciesContext>",elements:[{name:"DependenciesContext"}]}],raw:"Partial<React.ContextType<typeof DependenciesContext>>"},{name:"signature",type:"object",raw:`{
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    buttonSets: NonNullable<ExternalProps["buttonSets"]>;
    functions: NonNullable<ExternalProps["functions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    onBlur: NonNullable<ExternalProps["onBlur"]>;
    onFocus: NonNullable<ExternalProps["onFocus"]>;
    times: NonNullable<ExternalProps["times"]>;
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    value: string;
}`,signature:{properties:[{key:"apiOptions",value:{name:"NonNullable",elements:[{name:'intersection["apiOptions"]',raw:'ExternalProps["apiOptions"]'}],raw:'NonNullable<ExternalProps["apiOptions"]>',required:!0}},{key:"buttonSets",value:{name:"NonNullable",elements:[{name:'intersection["buttonSets"]',raw:'ExternalProps["buttonSets"]'}],raw:'NonNullable<ExternalProps["buttonSets"]>',required:!0}},{key:"functions",value:{name:"NonNullable",elements:[{name:'intersection["functions"]',raw:'ExternalProps["functions"]'}],raw:'NonNullable<ExternalProps["functions"]>',required:!0}},{key:"linterContext",value:{name:"NonNullable",elements:[{name:'intersection["linterContext"]',raw:'ExternalProps["linterContext"]'}],raw:'NonNullable<ExternalProps["linterContext"]>',required:!0}},{key:"onBlur",value:{name:"NonNullable",elements:[{name:'intersection["onBlur"]',raw:'ExternalProps["onBlur"]'}],raw:'NonNullable<ExternalProps["onBlur"]>',required:!0}},{key:"onFocus",value:{name:"NonNullable",elements:[{name:'intersection["onFocus"]',raw:'ExternalProps["onFocus"]'}],raw:'NonNullable<ExternalProps["onFocus"]>',required:!0}},{key:"times",value:{name:"NonNullable",elements:[{name:'intersection["times"]',raw:'ExternalProps["times"]'}],raw:'NonNullable<ExternalProps["times"]>',required:!0}},{key:"visibleLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["visibleLabel"]',required:!0}},{key:"ariaLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["ariaLabel"]',required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],alias:"Props"}}],returns:{type:{name:"string"}}},{name:"componentDidMount",docblock:null,modifiers:[],params:[],returns:null},{name:"componentDidUpdate",docblock:null,modifiers:[],params:[{name:"prevProps",optional:!1,type:null}],returns:null},{name:"componentWillUnmount",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleMouseDown",docblock:null,modifiers:[],params:[],returns:null},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:{type:{name:"string"}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    type: "expression";
    label?: string;
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"expression"',required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}}}},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:{name:"any"}}],returns:null},{name:"parse",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:{name:"string"}},{name:"props",optional:!1,type:{name:"intersection",raw:`ExternalProps &
Partial<React.ContextType<typeof DependenciesContext>> & {
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    buttonSets: NonNullable<ExternalProps["buttonSets"]>;
    functions: NonNullable<ExternalProps["functions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    onBlur: NonNullable<ExternalProps["onBlur"]>;
    onFocus: NonNullable<ExternalProps["onFocus"]>;
    times: NonNullable<ExternalProps["times"]>;
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    value: string;
}`,elements:[{name:"intersection",raw:`RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"signature",type:"object",raw:`{
    buttonSets: PerseusExpressionWidgetOptions["buttonSets"];
    buttonsVisible?: PerseusExpressionWidgetOptions["buttonsVisible"];
    functions: PerseusExpressionWidgetOptions["functions"];
    times: PerseusExpressionWidgetOptions["times"];
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    keypadConfiguration: KeypadConfiguration;
}`,signature:{properties:[{key:"buttonSets",value:{name:"ReadonlyArray",raw:'PerseusExpressionWidgetOptions["buttonSets"]',required:!0}},{key:"buttonsVisible",value:{name:"union",raw:'PerseusExpressionWidgetOptions["buttonsVisible"]',required:!1}},{key:"functions",value:{name:"ReadonlyArray",raw:'PerseusExpressionWidgetOptions["functions"]',required:!0}},{key:"times",value:{name:"boolean",raw:'PerseusExpressionWidgetOptions["times"]',required:!0}},{key:"visibleLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["visibleLabel"]',required:!0}},{key:"ariaLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["ariaLabel"]',required:!0}},{key:"keypadConfiguration",value:{name:"signature",type:"object",raw:`{
    keypadType: KeypadType;
    extraKeys?: ReadonlyArray<KeypadKey>;
    times?: boolean;
    scientific?: boolean;
}`,signature:{properties:[{key:"keypadType",value:{name:"union",raw:'"FRACTION" | "EXPRESSION"',elements:[{name:"literal",value:'"FRACTION"'},{name:"literal",value:'"EXPRESSION"'}],required:!0}},{key:"extraKeys",value:{name:"ReadonlyArray",elements:[{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]"}],raw:"ReadonlyArray<KeypadKey>",required:!1}},{key:"times",value:{name:"boolean",required:!1}},{key:"scientific",value:{name:"boolean",required:!1}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    answerForms: ReadonlyArray<PerseusExpressionAnswerForm>;
    functions: ReadonlyArray<string>;
}`,signature:{properties:[{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // The TeX form of the expression.  e.g. "x\\\\cdot3=y"
    value: string;
    // The Answer expression must have the same form
    form: boolean;
    // The answer expression must be fully expanded and simplified
    simplify: boolean;
    // Whether the form is considered "correct", "wrong", or "ungraded"
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    // A key to identify the answer form in a list
    // NOTE: perseus-format.js says this is required even though it isn't necessary.
    key?: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"form",value:{name:"boolean",required:!0}},{key:"simplify",value:{name:"boolean",required:!0}},{key:"considered",value:{name:"unknown[number]",raw:"(typeof PerseusExpressionAnswerFormConsidered)[number]",required:!0}},{key:"key",value:{name:"string",required:!1}}]}}],raw:"ReadonlyArray<PerseusExpressionAnswerForm>",required:!0}},{key:"functions",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}]},{name:"Partial",elements:[{name:"ReactContextType",raw:"React.ContextType<typeof DependenciesContext>",elements:[{name:"DependenciesContext"}]}],raw:"Partial<React.ContextType<typeof DependenciesContext>>"},{name:"signature",type:"object",raw:`{
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    buttonSets: NonNullable<ExternalProps["buttonSets"]>;
    functions: NonNullable<ExternalProps["functions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    onBlur: NonNullable<ExternalProps["onBlur"]>;
    onFocus: NonNullable<ExternalProps["onFocus"]>;
    times: NonNullable<ExternalProps["times"]>;
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    value: string;
}`,signature:{properties:[{key:"apiOptions",value:{name:"NonNullable",elements:[{name:'intersection["apiOptions"]',raw:'ExternalProps["apiOptions"]'}],raw:'NonNullable<ExternalProps["apiOptions"]>',required:!0}},{key:"buttonSets",value:{name:"NonNullable",elements:[{name:'intersection["buttonSets"]',raw:'ExternalProps["buttonSets"]'}],raw:'NonNullable<ExternalProps["buttonSets"]>',required:!0}},{key:"functions",value:{name:"NonNullable",elements:[{name:'intersection["functions"]',raw:'ExternalProps["functions"]'}],raw:'NonNullable<ExternalProps["functions"]>',required:!0}},{key:"linterContext",value:{name:"NonNullable",elements:[{name:'intersection["linterContext"]',raw:'ExternalProps["linterContext"]'}],raw:'NonNullable<ExternalProps["linterContext"]>',required:!0}},{key:"onBlur",value:{name:"NonNullable",elements:[{name:'intersection["onBlur"]',raw:'ExternalProps["onBlur"]'}],raw:'NonNullable<ExternalProps["onBlur"]>',required:!0}},{key:"onFocus",value:{name:"NonNullable",elements:[{name:'intersection["onFocus"]',raw:'ExternalProps["onFocus"]'}],raw:'NonNullable<ExternalProps["onFocus"]>',required:!0}},{key:"times",value:{name:"NonNullable",elements:[{name:'intersection["times"]',raw:'ExternalProps["times"]'}],raw:'NonNullable<ExternalProps["times"]>',required:!0}},{key:"visibleLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["visibleLabel"]',required:!0}},{key:"ariaLabel",value:{name:"string",raw:'PerseusExpressionWidgetOptions["ariaLabel"]',required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],alias:"Props"}}],returns:null},{name:"changeAndTrack",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"any"}},{name:"cb",optional:!1,type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}}}],returns:null},{name:"_handleFocus",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleBlur",docblock:null,modifiers:[],params:[],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"focusInputPath",docblock:null,modifiers:[],params:[{name:"inputPath",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",alias:"InputPath"}}],returns:null},{name:"blurInputPath",docblock:null,modifiers:[],params:[{name:"inputPath",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",alias:"InputPath"}}],returns:null},{name:"insert",docblock:null,modifiers:[],params:[{name:"keyPressed",optional:!1,type:{name:"unknown[number]",raw:"(typeof KeypadKeys)[number]",alias:"KeypadKey"}}],returns:null},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:null},{name:"setInputValue",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}],alias:"FocusPath"}},{name:"newValue",optional:!1,type:{name:"string"}},{name:"cb",optional:!0,type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}}}],returns:null}],displayName:"Expression",props:{value:{defaultValue:{value:'""',computed:!1},required:!1},times:{defaultValue:{value:"false",computed:!1},required:!1},functions:{defaultValue:{value:"[]",computed:!1},required:!1},buttonSets:{defaultValue:{value:'["basic", "trig", "prealgebra", "logarithms"]',computed:!1},required:!1},onFocus:{defaultValue:{value:"() => {}",computed:!1},required:!1},onBlur:{defaultValue:{value:"() => {}",computed:!1},required:!1},apiOptions:{defaultValue:{value:`{
    isArticle: false,
    isMobile: false,
    onFocusChange: function () {},
    GroupMetadataEditor: StubTagEditor,
    showAlignmentOptions: false,
    readOnly: false,
    groupAnnotator: function (): null {
        return null;
    },
    baseElements: {
        Link: (
            props: any,
        ): React.ReactElement<React.ComponentProps<"a">> => {
            // eslint-disable-next-line jsx-a11y/anchor-has-content -- TODO(LEMS-2871): Address a11y error
            return <a {...props} />;
        },
    },
    setDrawingAreaAvailable: function () {},
    canScrollPage: false,
    crossOutEnabled: false,
    editorChangeDelay: 0,
}`,computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};const Jl=(n,e)=>({type:"input-number",options:{simplify:n.simplify,answerType:n.answerType},userInput:{value:e.currentValue}}),Ql={integer:function(n,e){return e.integerExample},proper:function(n,e){return n.simplify==="optional"?e.properExample:e.simplifiedProperExample},improper:function(n,e){return n.simplify==="optional"?e.improperExample:e.simplifiedImproperExample},mixed:function(n,e){return e.mixedExample},decimal:function(n,e){return e.decimalExample},percent:function(n,e){return e.percentExample},pi:function(n,e){return e.piExample}},An=class An extends s.Component{constructor(){super(...arguments),this.shouldShowExamples=()=>this.props.answerType!=="number",this.handleChange=(e,t)=>{this.props.onChange({currentValue:e},t)},this._handleFocus=()=>{this.props.onFocus([])},this._handleBlur=()=>{this.props.onBlur([])},this.focus=()=>(this.refs.input.focus(),!0),this.focusInputPath=e=>{this.refs.input.focus()},this.blurInputPath=e=>{var t,r;typeof((t=this.refs.input)==null?void 0:t.blur)=="function"&&((r=this.refs.input)==null||r.blur())},this.getInputPaths=()=>[[]],this.setInputValue=(e,t,r)=>{this.props.onChange({currentValue:t},r)}}static getUserInputFromProps(e){return{currentValue:e.currentValue}}getUserInput(){return An.getUserInputFromProps(this.props)}getPromptJSON(){return Jl(this.props,this.getUserInput())}examples(){const{strings:e}=this.context,t=this.props.answerType,r=el[t].forms.split(/\s*,\s*/),a=h.map(r,i=>Ql[i](this.props,e));return[e.yourAnswer].concat(a)}render(){if(this.props.apiOptions.customKeypad){const t=s.createElement(Nn,{ref:"input",value:this.props.currentValue,keypadElement:this.props.keypadElement,onChange:this.handleChange,onFocus:this._handleFocus,onBlur:this._handleBlur});return this.props.rightAlign?s.createElement("div",{className:"perseus-input-right-align"},t):t}const e=[hn.default,this.props.size==="small"?hn.small:null,this.props.rightAlign?hn.rightAlign:hn.leftAlign];return this.props.reviewMode&&!this.props.currentValue&&e.push(hn.answerStateUnanswered),s.createElement(Ci,{ref:"input",value:this.props.currentValue,onChange:this.handleChange,style:e,examples:this.examples(),shouldShowExamples:this.shouldShowExamples(),onFocus:this._handleFocus,onBlur:this._handleBlur,id:this.props.widgetId,disabled:this.props.apiOptions.readOnly,linterContext:this.props.linterContext})}};An.contextType=G,An.defaultProps={currentValue:"",size:"normal",answerType:"number",rightAlign:!1,apiOptions:Ne.defaults,linterContext:re};let Ht=An;const hn=T.StyleSheet.create({default:{width:80,height:"auto"},small:{width:40},leftAlign:{paddingLeft:ce.xxxSmall_4,paddingRight:0},rightAlign:{textAlign:"right",paddingLeft:0,paddingRight:ce.xxxSmall_4},answerStateUnanswered:{backgroundColor:"#eee",border:"solid 1px #999"}}),Zl=n=>{const{simplify:e,size:t,answerType:r,rightAlign:a}=n;return{simplify:e,size:t,answerType:r,rightAlign:a}},eu={name:"input-number",displayName:"Input number (deprecated - use numeric input instead)",hidden:!0,widget:Ht,transform:Zl,isLintable:!0,getOneCorrectAnswerFromRubric(n){if(n.value==null)return;let e=String(n.value);return n.inexact&&n.maxError&&(e+=" ± "+n.maxError),e}},nu=(n,e)=>({type:"numeric-input",label:n.labelText,userInput:{value:e.currentValue}}),Mr={integer:(n,e)=>e.integerExample,proper:(n,e)=>n.simplify==="optional"?e.properExample:e.simplifiedProperExample,improper:(n,e)=>n.simplify==="optional"?e.improperExample:e.simplifiedImproperExample,mixed:(n,e)=>e.mixedExample,decimal:(n,e)=>e.decimalExample,pi:(n,e)=>e.piExample},tu=(n,e)=>{if(n.length===0)return[];const r=Lr(n).map(a=>Mr[a.name](a,e));return[e.yourAnswer].concat(r)},ru=n=>n.length===0?!1:!(Lr(n).map(r=>r.name).length>=Object.keys(Mr).length),Lr=function(n){const e=new Set;return n.filter(t=>e.has(t.name)?!1:(e.add(t.name),!0))},au=function(n){const e=n.flat(),t=Lr(e),r=Object.keys(Mr);return t.sort((a,i)=>r.indexOf(a.name)-r.indexOf(i.name))},Di=s.forwardRef((n,e)=>{const t=s.useContext(G),r=s.useRef(null),[a,i]=s.useState(!1);s.useImperativeHandle(e,()=>({current:r.current,focus:()=>{var m;r.current&&((m=r.current)==null||m.focus(),i(!0))},blur:()=>{var m;r.current&&((m=r.current)==null||m.blur(),i(!1))}}));const o=(m,p)=>{n.onChange({currentValue:m},p),n.trackInteraction()},l=()=>{n.onFocus([]),i(!0)},u=()=>{n.onBlur([]),i(!1)},d=T.StyleSheet.create({inputWithExamples:{borderRadius:"3px",borderWidth:a?"2px":"1px",display:"inline-block",fontFamily:'Symbola, "Times New Roman", serif',fontSize:"18px",height:"32px",lineHeight:"18px",padding:a?"4px":"4px 5px",textAlign:n.rightAlign?"right":"left",width:n.size==="small"?40:80}});if(n.apiOptions.customKeypad){const m=n.rightAlign?"perseus-input-right-align":void 0;return s.createElement("div",{className:m},s.createElement(Nn,{ref:r,value:n.currentValue,keypadElement:n.keypadElement,onChange:o,onFocus:l,onBlur:u}))}return s.createElement(Ci,{ref:r,value:n.currentValue,onChange:o,labelText:n.labelText,examples:tu(n.answerForms,t.strings),shouldShowExamples:ru(n.answerForms),onFocus:l,onBlur:u,id:n.widgetId,disabled:n.apiOptions.readOnly,style:d.inputWithExamples})});Di.__docgenInfo={description:`The NumericInputComponent is a child component of the NumericInput class
component. It is responsible for rendering the UI elements of the Numeric
Input widget.`,methods:[{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"blur",docblock:null,modifiers:[],params:[],returns:null}],displayName:"NumericInputComponent",props:{widgetId:{required:!0,tsType:{name:"string"},description:""},alignment:{required:!0,tsType:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},description:""},static:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},problemNum:{required:!0,tsType:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},description:""},apiOptions:{required:!0,tsType:{name:"NonNullable",elements:[{name:'intersection["apiOptions"]',raw:'ExternalProps["apiOptions"]'}],raw:'NonNullable<ExternalProps["apiOptions"]>'},description:""},keypadElement:{required:!1,tsType:{name:"any"},description:""},questionCompleted:{required:!1,tsType:{name:"boolean"},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},onFocus:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},onBlur:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},findWidgets:{required:!0,tsType:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}}},description:""},reviewModeRubric:{required:!1,tsType:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"RubricRegistry[RubricRegistry]",raw:"RubricRegistry[keyof RubricRegistry]"},{name:"null"},{name:"undefined"}]},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:""},trackInteraction:{required:!0,tsType:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"TrackingExtraArgs"},name:"extraData"}],return:{name:"void"}}},description:""},isLastUsedWidget:{required:!0,tsType:{name:"boolean"},description:""},linterContext:{required:!0,tsType:{name:"NonNullable",elements:[{name:'intersection["linterContext"]',raw:'ExternalProps["linterContext"]'}],raw:'NonNullable<ExternalProps["linterContext"]>'},description:""},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},size:{required:!0,tsType:{name:"NonNullable",elements:[{name:'intersection["size"]',raw:'ExternalProps["size"]'}],raw:'NonNullable<ExternalProps["size"]>'},description:""},rightAlign:{required:!0,tsType:{name:"NonNullable",elements:[{name:'intersection["rightAlign"]',raw:'ExternalProps["rightAlign"]'}],raw:'NonNullable<ExternalProps["rightAlign"]>'},description:""},coefficient:{required:!0,tsType:{name:"NonNullable",elements:[{name:'intersection["coefficient"]',raw:'ExternalProps["coefficient"]'}],raw:'NonNullable<ExternalProps["coefficient"]>'},description:""},answerForms:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    simplify: PerseusNumericInputSimplify | null | undefined;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:"PerseusNumericInputSimplify | null | undefined",elements:[{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}]},{name:"null"},{name:"undefined"}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswerForm>"},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},currentValue:{required:!0,tsType:{name:"string"},description:""}}};const ot=class ot extends s.Component{constructor(){super(...arguments),this.inputRef=s.createRef(),this.focus=()=>{var e;return(e=this.inputRef.current)==null||e.focus(),!0},this.focusInputPath=()=>{var e;(e=this.inputRef.current)==null||e.focus()},this.blurInputPath=()=>{var e;(e=this.inputRef.current)==null||e.blur()},this.getInputPaths=()=>[[]],this.setInputValue=(e,t,r)=>{this.props.onChange({currentValue:t},r)}}static getUserInputFromProps(e){return{currentValue:e.currentValue}}getUserInput(){return ot.getUserInputFromProps(this.props)}getPromptJSON(){return nu(this.props,this.getUserInput())}render(){return s.createElement(Di,{...this.props,ref:this.inputRef})}};ot.defaultProps={currentValue:"",size:"normal",rightAlign:!1,apiOptions:Ne.defaults,coefficient:!1,answerForms:[],labelText:"",linterContext:re};let Bn=ot;const iu=function(n){const{answers:e,...t}={...n,answerForms:au(n.answers.filter(r=>r.status==="correct").map(r=>(r.answerForms||[]).map(a=>({simplify:r.simplify,name:a}))))};return t},ou={name:"numeric-input",displayName:"Numeric input",accessible:!0,widget:Bn,transform:iu,isLintable:!0,getOneCorrectAnswerFromRubric(n){const t=n.answers.filter(r=>r.status==="correct").map(r=>{const a=r.answerForms&&r.answerForms[0]?r.answerForms[0]:"decimal";let i=Ye.toNumericString(r.value,a);return r.maxError&&(i+=" ± "+Ye.toNumericString(r.maxError,a)),i});if(t.length!==0)return t[0]}};Bn.__docgenInfo={description:`The NumericInput widget is a numeric input field that supports a variety of
answer forms, including integers, decimals, fractions, and mixed numbers.

[Jan 2025] We're currenly migrating from class-based components to functional
components. While we cannot fully migrate this component yet, we can start
by using the functional component for the rendering the UI of the widget.`,methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`ExternalProps & {
    size: NonNullable<ExternalProps["size"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    coefficient: NonNullable<ExternalProps["coefficient"]>;
    answerForms: ReadonlyArray<PerseusNumericInputAnswerForm>;
    labelText: string;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    currentValue: string;
}`,elements:[{name:"intersection",raw:`RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"signature",type:"object",raw:`{
    // A list of all the possible correct and incorrect answers
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    // Translatable Text; Text to describe this input. This will be shown to users using screenreaders.
    labelText?: string | undefined;
    // Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them. Options: "normal" or "small"
    size: string;
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
    // Whether to right-align the text or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    rightAlign?: boolean;
    // Always false.  Not used for this widget
    static: boolean;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    answerForms?: ReadonlyArray<MathFormat>;
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    // NOTE: perseus_data.go says this is non-nullable even though we handle null values.
    maxError: number | null | undefined;
    // Unsimplified answers are Ungraded, Accepted, or Wrong. Options: "required", "correct", or "enforced"
    simplify: PerseusNumericInputSimplify | null | undefined;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:"PerseusNumericInputSimplify | null | undefined",elements:[{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}]},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>",required:!0}},{key:"labelText",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"size",value:{name:"string",required:!0}},{key:"coefficient",value:{name:"boolean",required:!0}},{key:"rightAlign",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    // A list of all the possible correct and incorrect answers
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    // A coefficient style number allows the student to use - for -1 and an empty string to mean 1.
    coefficient: boolean;
}`,signature:{properties:[{key:"answers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Display; A description for why this answer is correct, wrong, or ungraded
    message: string;
    // The expected answer
    value?: number | null;
    // Whether this answer is "correct", "wrong", or "ungraded"
    status: string;
    // The forms available for this answer.  Options: "integer, ""decimal", "proper", "improper", "mixed", or "pi"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    answerForms?: ReadonlyArray<MathFormat>;
    // Whether we should check the answer strictly against the the configured answerForms (strict = true)
    // or include the set of default answerForms (strict = false).
    strict: boolean;
    // A range of error +/- the value
    // NOTE: perseus_data.go says this is non-nullable even though we handle null values.
    maxError: number | null | undefined;
    // Unsimplified answers are Ungraded, Accepted, or Wrong. Options: "required", "correct", or "enforced"
    simplify: PerseusNumericInputSimplify | null | undefined;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:"PerseusNumericInputSimplify | null | undefined",elements:[{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}]},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>",required:!0}},{key:"coefficient",value:{name:"boolean",required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    size: NonNullable<ExternalProps["size"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    coefficient: NonNullable<ExternalProps["coefficient"]>;
    answerForms: ReadonlyArray<PerseusNumericInputAnswerForm>;
    labelText: string;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    currentValue: string;
}`,signature:{properties:[{key:"size",value:{name:"NonNullable",elements:[{name:'intersection["size"]',raw:'ExternalProps["size"]'}],raw:'NonNullable<ExternalProps["size"]>',required:!0}},{key:"rightAlign",value:{name:"NonNullable",elements:[{name:'intersection["rightAlign"]',raw:'ExternalProps["rightAlign"]'}],raw:'NonNullable<ExternalProps["rightAlign"]>',required:!0}},{key:"apiOptions",value:{name:"NonNullable",elements:[{name:'intersection["apiOptions"]',raw:'ExternalProps["apiOptions"]'}],raw:'NonNullable<ExternalProps["apiOptions"]>',required:!0}},{key:"coefficient",value:{name:"NonNullable",elements:[{name:'intersection["coefficient"]',raw:'ExternalProps["coefficient"]'}],raw:'NonNullable<ExternalProps["coefficient"]>',required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    simplify: PerseusNumericInputSimplify | null | undefined;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:"PerseusNumericInputSimplify | null | undefined",elements:[{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}]},{name:"null"},{name:"undefined"}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswerForm>",required:!0}},{key:"labelText",value:{name:"string",required:!0}},{key:"linterContext",value:{name:"NonNullable",elements:[{name:'intersection["linterContext"]',raw:'ExternalProps["linterContext"]'}],raw:'NonNullable<ExternalProps["linterContext"]>',required:!0}},{key:"currentValue",value:{name:"string",required:!0}}]}}],alias:"NumericInputProps"}}],returns:{type:{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}}}},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"focusInputPath",docblock:null,modifiers:[],params:[],returns:null},{name:"blurInputPath",docblock:null,modifiers:[],params:[],returns:null},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:null},{name:"setInputValue",docblock:"Sets the value of the input at the given path.",modifiers:[],params:[{name:"path",optional:!1},{name:"newValue",optional:!1},{name:"cb",optional:!1}],returns:null,description:"Sets the value of the input at the given path."},{name:"getUserInput",docblock:"Returns the value the user has currently input for this widget.",modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    currentValue: string;
}`,signature:{properties:[{key:"currentValue",value:{name:"string",required:!0}}]}}},description:"Returns the value the user has currently input for this widget."},{name:"getPromptJSON",docblock:`Returns the JSON representation of the prompt for this widget.
This is used by the AI to determine the prompt for the widget.`,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    type: "numeric-input";
    label: string;
    userInput: {
        value: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"numeric-input"',required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"userInput",value:{name:"signature",type:"object",raw:`{
    value: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}}},description:`Returns the JSON representation of the prompt for this widget.
This is used by the AI to determine the prompt for the widget.`}],displayName:"NumericInput",props:{currentValue:{defaultValue:{value:'""',computed:!1},required:!1},size:{defaultValue:{value:'"normal"',computed:!1},required:!1},rightAlign:{defaultValue:{value:"false",computed:!1},required:!1},apiOptions:{defaultValue:{value:`{
    isArticle: false,
    isMobile: false,
    onFocusChange: function () {},
    GroupMetadataEditor: StubTagEditor,
    showAlignmentOptions: false,
    readOnly: false,
    groupAnnotator: function (): null {
        return null;
    },
    baseElements: {
        Link: (
            props: any,
        ): React.ReactElement<React.ComponentProps<"a">> => {
            // eslint-disable-next-line jsx-a11y/anchor-has-content -- TODO(LEMS-2871): Address a11y error
            return <a {...props} />;
        },
    },
    setDrawingAreaAvailable: function () {},
    canScrollPage: false,
    crossOutEnabled: false,
    editorChangeDelay: 0,
}`,computed:!1},required:!1},coefficient:{defaultValue:{value:"false",computed:!1},required:!1},answerForms:{defaultValue:{value:"[]",computed:!1},required:!1},labelText:{defaultValue:{value:'""',computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};const su=(n,e)=>{const r=(n.choices||[]).map(a=>({value:a.content}));return{type:"radio",hasNoneOfTheAbove:!!n.hasNoneOfTheAbove,options:r,userInput:{selectedOptions:e.choicesSelected.slice()}}},lu=n=>({type:"passage-ref",options:{passageNumber:n.passageNumber,referenceNumber:n.referenceNumber,summaryText:n.summaryText}});function xe(n,e,t,r){let a;return e==="start"&&r==="start"?a=Range.START_TO_START:e==="start"&&r==="end"?a=Range.END_TO_START:e==="end"&&r==="start"?a=Range.START_TO_END:a=Range.END_TO_END,n.compareBoundaryPoints(a,t)}function Ct(n,e){const t=n.cloneRange();return t.setEnd(e.endContainer,e.endOffset),t}function Tt(n,e){return!(xe(n,"end",e,"start")<0||xe(e,"end",n,"start")<0)}function uu(n,e){return xe(n,"start",e,"start")<=0&&xe(n,"end",e,"end")>=0}function du(n,e){if(!Tt(n,e))return null;const t=xe(n,"start",e,"start")>0?n:e,r=xe(n,"end",e,"end")<0?n:e;return Ct(t,r)}function mu(n,e){if(!Tt(n,e))return null;const t=xe(n,"start",e,"start")<0?n:e,r=xe(n,"end",e,"end")>0?n:e;return Ct(t,r)}function Ta(n,e,t,r,a){let i=-1,o=r,l=a,u=0;for(;o<=l;){if(u++,u>e.length*2)throw new Error(`Assertion error: Binary search isn't terminating? lower=${o}, upper=${l}`);const d=Math.floor((o+l)/2);t==="first"?xe(e[d],"end",n,"start")<=0?o=d+1:(i=d,l=d-1):xe(e[d],"start",n,"end")>=0?l=d-1:(i=d,o=d+1)}return i}function cu(n,e){const t=Ta(n,e,"first",0,e.length-1);if(t<0)return null;const r=Ta(n,e,"last",t,e.length-1);return r<0?null:[t,r]}function pu(n,e){const t={};let r=e.domRange,a=e.firstWordIndex,i=e.lastWordIndex;for(const d of Object.keys(n)){const m=n[d],p=mu(m.domRange,r);p?(r=p,a=Math.min(m.firstWordIndex,a),i=Math.max(m.lastWordIndex,i)):t[d]=m}const o={firstWordIndex:a,lastWordIndex:i,domRange:r},l=Object.keys(t),u=hu(l);return t[u]=o,t}function gu(n,e,t){for(const u of Object.keys(n)){const d=n[u].domRange;if(uu(d,t))return null}const r=cu(t,e);if(!r)return null;const[a,i]=r,o=e[a],l=e[i];return{firstWordIndex:a,lastWordIndex:i,domRange:Ct(o,l)}}function hu(n){const e=`${new Date().getTime()}`;if(!n.includes(e))return e;let t=0,r;do r=`${e}-${t}`,t++;while(n.includes(r));return r}function yu(n,e){const{firstWordIndex:t,lastWordIndex:r}=n.range,a=e[t];if(!a)throw new an(`first word index ${a} is out of bounds: must be 0–${e.length-1} inclusive`,Ke.InvalidInput,{metadata:{firstWord:a,wordRanges:JSON.stringify(e)}});const i=e[r];if(!i)throw new an(`last word index ${i} is out of bounds: must be 0–${e.length-1} inclusive`,Ke.InvalidInput,{metadata:{lastWord:i,wordRanges:JSON.stringify(e)}});return{firstWordIndex:t,lastWordIndex:r,domRange:Ct(a,i)}}function wu(n){const{firstWordIndex:e,lastWordIndex:t}=n;return{range:{type:"word-indexes",firstWordIndex:e,lastWordIndex:t}}}function $t(n,e){return{left:n.left-e.left,top:n.top-e.top}}function ji({left:n,top:e,width:t,height:r},a){return{...$t({left:n,top:e},a),width:t,height:r}}function fu(n){const e=[];return Fi(n.commonAncestorContainer,n,e),e}function Fi(n,e,t){const r=new Range;if(r.selectNodeContents(n),n.nodeType===Node.TEXT_NODE){const a=du(e,r);a&&bu(n,a,t)}else if(n.nodeType===Node.ELEMENT_NODE){if(!Tt(e,r))return;for(const a of Array.from(n.childNodes))Fi(a,e,t)}}function bu(n,e,t){const r=n.parentElement,a=window.getComputedStyle(r);let i=null;if(typeof a.lineHeight=="string"&&a.lineHeight.endsWith("px")){const l=parseFloat(a.lineHeight);isNaN(l)||(i=l)}const o=Array.from(e.getClientRects());for(const l of o){const u={left:l.left,top:l.top,height:l.height,width:l.width};if(i!==null){const d=i-u.height;u.top-=d,u.height=i}t.push(u)}}class Wi extends s.PureComponent{constructor(){super(...arguments),this.state={cachedHighlightRects:this._computeRects(this.props),tooltipIsHovered:!1}}UNSAFE_componentWillReceiveProps(e){(this.props.highlight!==e.highlight||this.props.offsetParent!==e.offsetParent)&&this.setState({cachedHighlightRects:this._computeRects(e)})}_computeRects(e){const{highlight:t,offsetParent:r}=e,a=fu(t.domRange),{left:i,top:o}=r.getBoundingClientRect();return a.map(u=>ji(u,{left:i,top:o}))}_rectIsHovered(e,t){const r=$t(t,{left:e.left,top:e.top});return 0<=r.left&&r.left<e.width&&0<=r.top&&r.top<e.height}isHovered(e){if(!e)return!1;const{offsetParent:t}=this.props,{cachedHighlightRects:r}=this.state,{left:a,top:i}=t.getBoundingClientRect(),o=$t(e,{left:a,top:i});return r.some(l=>this._rectIsHovered(l,o))}render(){const e=this.state.cachedHighlightRects;return s.createElement("div",null,e.map((t,r)=>s.createElement("div",{key:r,className:T.css(vu.highlightRect),style:{position:"absolute",width:t.width,height:t.height,top:t.top,left:t.left,zIndex:this.props.zIndexes.belowContent}})))}}const vu=T.StyleSheet.create({highlightRect:{background:"#fffabe"}});Wi.__docgenInfo={description:"",methods:[{name:"_computeRects",docblock:`Compute the set of rectangles that cover the highlighted content, with
coordinates relative to the offset parent. That way, we can use them
for CSS positioning.`,modifiers:[],params:[{name:"props",optional:!1,type:{name:"signature",type:"object",raw:`{
    // The DOMHighlight to render.
    highlight: DOMHighlight;
    // A unique key corresponding to the given \`highlight\`.
    highlightKey: string;
    // This component's \`offsetParent\` element, which is the nearest ancestor
    // with \`position: relative\`. This will enable us to choose the correct
    // CSS coordinates to align highlights and tooltips with the target
    // content.
    offsetParent: Element;
    // The z-indexes to use when rendering tooltips above content, and
    // highlights below content.
    zIndexes: ZIndexes;
}`,signature:{properties:[{key:"highlight",value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}},{key:"highlightKey",value:{name:"string",required:!0}},{key:"offsetParent",value:{name:"Element",required:!0}},{key:"zIndexes",value:{name:"signature",type:"object",raw:`{
    belowContent: number;
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]},required:!0}}]},alias:"Props"}}],returns:{type:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`Position & {
    width: number;
    height: number;
}`,elements:[{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    width: number;
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}]}],raw:"ReadonlyArray<Rect>"}},description:`Compute the set of rectangles that cover the highlighted content, with
coordinates relative to the offset parent. That way, we can use them
for CSS positioning.`},{name:"_rectIsHovered",docblock:`Return whether the given mouse position (coordinates relative to this
component's offset parent) is hovering over the given rectangle
(coordinates also relative to this component's offset parent).`,modifiers:[],params:[{name:"rect",optional:!1,type:{name:"intersection",raw:`Position & {
    width: number;
    height: number;
}`,elements:[{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    width: number;
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}],alias:"Rect"}},{name:"mouseOffsetPosition",optional:!1,type:{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]},alias:"Position"}}],returns:{type:{name:"boolean"}},description:`Return whether the given mouse position (coordinates relative to this
component's offset parent) is hovering over the given rectangle
(coordinates also relative to this component's offset parent).`},{name:"isHovered",docblock:`Return whether the given mouse position (coordinates relative to the
viewport) is hovering over this highlight.`,modifiers:[],params:[{name:"mouseClientPosition",optional:!0,type:{name:"union",raw:"Position | null",elements:[{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]}},{name:"null"}]}}],returns:{type:{name:"boolean"}},description:`Return whether the given mouse position (coordinates relative to the
viewport) is hovering over this highlight.`}],displayName:"HighlightRenderer",props:{highlight:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]}},description:""},highlightKey:{required:!0,tsType:{name:"string"},description:""},offsetParent:{required:!0,tsType:{name:"Element"},description:""},zIndexes:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    belowContent: number;
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]}},description:""}}};class Dr extends s.PureComponent{_getFocusRect(){const{focusNode:e,focusOffset:t,offsetParent:r}=this.props,a=document.createRange();a.setStart(e,t),a.setEnd(e,t);const i=a.getClientRects()[0];if(!i)return Ti.log('[Highlighting] Known bug: Could not determine the focus position, so did not show an "Add Highlight" tooltip. https://app.asana.com/0/329800276300868/413878480039713 (see also /r/asana-links)'),null;const{left:o,top:l}=r.getBoundingClientRect();return ji({left:i.left,top:i.top,width:i.width,height:i.height},{left:o,top:l})}render(){const e=this._getFocusRect();if(!e)return null;const t=s.createElement("div",{className:T.css(ku.tooltipLabel),onClick:this.props.onClick},this.props.label),r={position:"absolute",left:e.left,top:`calc(${Math.round(e.top)}px + 0.95em)`,height:0};return s.createElement("div",{style:r,onMouseEnter:this.props.onMouseEnter,onMouseLeave:this.props.onMouseLeave},s.createElement(Ir,{content:t,opened:!0},s.createElement("div",null)))}}const ku=T.StyleSheet.create({tooltipLabel:{userSelect:"none",fontFamily:'"Lato", sans-serif',padding:`10px ${ce.medium_16}px`,cursor:"pointer"}});Dr.__docgenInfo={description:"",methods:[{name:"_getFocusRect",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"Rect | null | undefined",elements:[{name:"intersection",raw:`Position & {
    width: number;
    height: number;
}`,elements:[{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    width: number;
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}]},{name:"null"},{name:"undefined"}]}}}],displayName:"HighlightTooltip",props:{label:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onMouseEnter:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onMouseLeave:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},focusNode:{required:!0,tsType:{name:"Node"},description:""},focusOffset:{required:!0,tsType:{name:"number"},description:""},offsetParent:{required:!0,tsType:{name:"Element"},description:""}}};const zr=class zr extends s.PureComponent{constructor(){super(...arguments),this.state={hoveredHighlightKey:null,hoveringTooltipFor:null},this._highlightRenderers={},this._handleMouseMove=e=>{const t={left:e.clientX,top:e.clientY},r=this._getHoveredHighlightKey(t);this.setState({hoveredHighlightKey:r})}}componentDidMount(){this._updateEditListeners(!1,this.props.editable)}UNSAFE_componentWillReceiveProps(e){this._updateEditListeners(this.props.editable,e.editable),this.state.hoveredHighlightKey!=null&&!(this.state.hoveredHighlightKey in e.highlights)&&this.setState({hoveredHighlightKey:null}),this.state.hoveringTooltipFor!=null&&!(this.state.hoveringTooltipFor in e.highlights)&&this.setState({hoveringTooltipFor:null})}componentWillUnmount(){this._updateEditListeners(this.props.editable,!1)}_updateEditListeners(e,t){!e&&t?window.addEventListener("mousemove",this._handleMouseMove):e&&!t&&(window.removeEventListener("mousemove",this._handleMouseMove),this.setState({hoveredHighlightKey:null,hoveringTooltipFor:null}))}_getHoveredHighlightKey(e){const{hoveringTooltipFor:t}=this.state;return typeof t=="string"?t:Object.keys(this.props.highlights).find(a=>{const i=this._highlightRenderers[a];return i&&i.isHovered(e)})}_renderTooltip(){const{hoveredHighlightKey:e}=this.state;if(e==null)return null;const t=this.props.highlights[e];return s.createElement(Dr,{label:this.context.strings.removeHighlight,focusNode:t.domRange.endContainer,focusOffset:t.domRange.endOffset,offsetParent:this.props.offsetParent,onClick:()=>this.props.onRemoveHighlight(e),onMouseEnter:()=>this.setState({hoveringTooltipFor:e}),onMouseLeave:()=>this.setState({hoveringTooltipFor:null})})}render(){return s.createElement("div",null,Object.keys(this.props.highlights).map(e=>s.createElement(Wi,{ref:t=>{t?this._highlightRenderers[e]=t:delete this._highlightRenderers[e]},key:e,highlight:this.props.highlights[e],highlightKey:e,offsetParent:this.props.offsetParent,zIndexes:this.props.zIndexes})),this.props.editable&&this._renderTooltip())}};zr.contextType=G;let Kn=zr;Kn.__docgenInfo={description:"",methods:[{name:"_updateEditListeners",docblock:`Given whether we were previously listening to mousemove events, and
whether we will now listen to mousemove events, add or remove the
listener accordingly.`,modifiers:[],params:[{name:"wasListening",optional:!1,type:{name:"boolean"}},{name:"willListen",optional:!1,type:{name:"boolean"}}],returns:null,description:`Given whether we were previously listening to mousemove events, and
whether we will now listen to mousemove events, add or remove the
listener accordingly.`},{name:"_handleMouseMove",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:{name:"MouseEvent",alias:"MouseEvent"}}],returns:null},{name:"_getHoveredHighlightKey",docblock:null,modifiers:[],params:[{name:"mouseClientPosition",optional:!1,type:{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]},alias:"Position"}}],returns:{type:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]}}},{name:"_renderTooltip",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"null | React.ReactNode",elements:[{name:"null"},{name:"ReactReactNode",raw:"React.ReactNode"}]}}}],displayName:"HighlightSetRenderer",props:{editable:{required:!0,tsType:{name:"boolean"},description:""},highlights:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    [key: string]: DOMHighlight;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}}]}},description:""},offsetParent:{required:!0,tsType:{name:"Element"},description:""},onRemoveHighlight:{required:!0,tsType:{name:"signature",type:"function",raw:"(highlightKey: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"highlightKey"}],return:{name:"unknown"}}},description:""},zIndexes:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    belowContent: number;
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]}},description:""}}};class Gi extends s.PureComponent{constructor(){super(...arguments),this.state={mouseState:"up",trackedSelection:null},this._handleSelectionChange=()=>{this._updateTrackedSelection(),this.state.mouseState==="down"&&this.setState({mouseState:"down-and-selecting"})},this._handleMouseDown=()=>{this.setState({mouseState:"down"})},this._handleMouseUp=()=>{this.setState({mouseState:"up"})}}componentDidMount(){this._updateListeners(!1,this.props.enabled)}componentDidUpdate(e){this.props.buildHighlight!==e.buildHighlight&&this._updateTrackedSelection(),this._updateListeners(e.enabled,this.props.enabled)}componentWillUnmount(){this._updateListeners(this.props.enabled,!1)}_updateListeners(e,t){!e&&t?(window.addEventListener("mousedown",this._handleMouseDown),window.addEventListener("mouseup",this._handleMouseUp),document.addEventListener("selectionchange",this._handleSelectionChange)):e&&!t&&(window.removeEventListener("mousedown",this._handleMouseDown),window.removeEventListener("mouseup",this._handleMouseUp),document.removeEventListener("selectionchange",this._handleSelectionChange),this.setState({mouseState:"up",trackedSelection:null}))}_computeFocusAndRange(){const e=document.getSelection();if(!e||e.rangeCount===0)return null;const t=e.getRangeAt(0);if(t.collapsed)return null;const r=e.focusNode,a=e.focusOffset;return{focusNode:r,focusOffset:a,range:t}}_updateTrackedSelection(){const e=this._computeFocusAndRange();if(!e){this.setState({trackedSelection:null});return}const{focusNode:t,focusOffset:r,range:a}=e,i=this.props.buildHighlight(a);if(!i){this.setState({trackedSelection:null});return}const o={focusNode:t,focusOffset:r,proposedHighlight:i};this.setState({trackedSelection:o})}render(){const{mouseState:e,trackedSelection:t}=this.state,r=e==="down-and-selecting";return this.props.children?s.createElement("div",null,this.props.children(t,r)):null}}Gi.__docgenInfo={description:"",methods:[{name:"_updateListeners",docblock:null,modifiers:[],params:[{name:"wasListening",optional:!1,type:{name:"boolean"}},{name:"willListen",optional:!1,type:{name:"boolean"}}],returns:null},{name:"_computeFocusAndRange",docblock:`Get the current selection focus and range, if present and non-collapsed.

Otherwise, if there is no current selection or it's collapsed, return
null.`,modifiers:[],params:[],returns:{type:{name:"union",raw:`| {
      focusNode: Node;
      focusOffset: number;
      range: DOMRange;
  }
| null
| undefined`,elements:[{name:"signature",type:"object",raw:`{
    focusNode: Node;
    focusOffset: number;
    range: DOMRange;
}`,signature:{properties:[{key:"focusNode",value:{name:"Node",required:!0}},{key:"focusOffset",value:{name:"number",required:!0}},{key:"range",value:{name:"Range",required:!0}}]}},{name:"null"},{name:"undefined"}]}},description:`Get the current selection focus and range, if present and non-collapsed.

Otherwise, if there is no current selection or it's collapsed, return
null.`},{name:"_updateTrackedSelection",docblock:"Compute and update the TrackedSelection to reflect the document state.",modifiers:[],params:[],returns:{type:{name:"void"}},description:"Compute and update the TrackedSelection to reflect the document state."},{name:"_handleSelectionChange",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleMouseDown",docblock:null,modifiers:[],params:[],returns:null},{name:"_handleMouseUp",docblock:null,modifiers:[],params:[],returns:null}],displayName:"SelectionTracker",props:{buildHighlight:{required:!0,tsType:{name:"signature",type:"function",raw:"(domRange: DOMRange) => DOMHighlight | null | undefined",signature:{arguments:[{type:{name:"Range",required:!0},name:"domRange"}],return:{name:"union",raw:"DOMHighlight | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]}},{name:"null"},{name:"undefined"}]}}},description:""},children:{required:!1,tsType:{name:"signature",type:"function",raw:`(
    trackedSelection: TrackedSelection | null | undefined,
    userIsMouseSelecting: boolean,
) => React.ReactElement<any>`,signature:{arguments:[{type:{name:"union",raw:"TrackedSelection | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    // The focus of the current selection - that is, the boundary point of the
    // selection that the user is dragging around.
    //
    // We don't simply track the full \`Selection\` object, which contains all of
    // this focus and range information and more, because the browser reuses
    // the global \`Selection\` object and mutates it, which breaks our
    // \`shouldComponentUpdate\` checks.
    focusNode: Node;
    focusOffset: number;
    // If the current selection maps to a valid new highlight, we cache the
    // highlight object here.
    proposedHighlight: DOMHighlight;
}`,signature:{properties:[{key:"focusNode",value:{name:"Node",required:!0}},{key:"focusOffset",value:{name:"number",required:!0}},{key:"proposedHighlight",value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}}]}},{name:"null"},{name:"undefined"}]},name:"trackedSelection"},{type:{name:"boolean"},name:"userIsMouseSelecting"}],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},enabled:{required:!0,tsType:{name:"boolean"},description:""}}};const Br=class Br extends s.PureComponent{_handleAddHighlight(e){this.props.onAddHighlight(e);const t=document.getSelection();t&&t.collapseToEnd()}_selectionIsValid(e){if(!e)return!1;const{contentNode:t}=this.props,r=new Range;r.selectNodeContents(t);const a=new Range;return a.setStart(e.focusNode,e.focusOffset),a.collapse(!0),Tt(r,a)}render(){return s.createElement(Gi,{buildHighlight:this.props.buildHighlight,enabled:this.props.editable},(e,t)=>s.createElement("div",null,s.createElement(Kn,{editable:this.props.editable&&!this._selectionIsValid(e),highlights:this.props.highlights,offsetParent:this.props.offsetParent,onRemoveHighlight:this.props.onRemoveHighlight,zIndexes:this.props.zIndexes}),this._selectionIsValid(e)&&!t&&s.createElement(Dr,{label:this.context.strings.addHighlight,onClick:()=>this._handleAddHighlight(e.proposedHighlight),focusNode:e.focusNode,focusOffset:e.focusOffset,offsetParent:this.props.offsetParent})))}};Br.contextType=G;let Jn=Br;Jn.__docgenInfo={description:"",methods:[{name:"_handleAddHighlight",docblock:null,modifiers:[],params:[{name:"highlightToAdd",optional:!1,type:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},alias:"DOMHighlight"}}],returns:null},{name:"_selectionIsValid",docblock:null,modifiers:[],params:[{name:"trackedSelection",optional:!0,type:{name:"union",raw:"TrackedSelection | null",elements:[{name:"signature",type:"object",raw:`{
    // The focus of the current selection - that is, the boundary point of the
    // selection that the user is dragging around.
    //
    // We don't simply track the full \`Selection\` object, which contains all of
    // this focus and range information and more, because the browser reuses
    // the global \`Selection\` object and mutates it, which breaks our
    // \`shouldComponentUpdate\` checks.
    focusNode: Node;
    focusOffset: number;
    // If the current selection maps to a valid new highlight, we cache the
    // highlight object here.
    proposedHighlight: DOMHighlight;
}`,signature:{properties:[{key:"focusNode",value:{name:"Node",required:!0}},{key:"focusOffset",value:{name:"number",required:!0}},{key:"proposedHighlight",value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}}]}},{name:"null"}]}}],returns:{type:{name:"unknown"}}}],displayName:"HighlightingUI",props:{buildHighlight:{required:!0,tsType:{name:"signature",type:"function",raw:"(range: DOMRange) => DOMHighlight | null | undefined",signature:{arguments:[{type:{name:"Range",required:!0},name:"range"}],return:{name:"union",raw:"DOMHighlight | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]}},{name:"null"},{name:"undefined"}]}}},description:""},contentNode:{required:!0,tsType:{name:"Node"},description:""},editable:{required:!0,tsType:{name:"boolean"},description:""},highlights:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    [key: string]: DOMHighlight;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}}]}},description:""},offsetParent:{required:!0,tsType:{name:"Element"},description:""},onAddHighlight:{required:!0,tsType:{name:"signature",type:"function",raw:"(range: DOMHighlight) => unknown",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]}},name:"range"}],return:{name:"unknown"}}},description:""},onRemoveHighlight:{required:!0,tsType:{name:"signature",type:"function",raw:"(highlightKey: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"highlightKey"}],return:{name:"unknown"}}},description:""},zIndexes:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    belowContent: number;
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]}},description:""}}};class _i extends s.PureComponent{componentDidMount(){this._sendWordsUpdate()}componentDidUpdate(){this._sendWordsUpdate()}_sendWordsUpdate(){this.props.onWordsUpdate(this._getWordRanges())}_getWordRanges(){const e=this._container;if(!e)throw new an("invariant violation: `this._container` is not defined, but this method is only called after mount/update",Ke.NotAllowed);const t=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,()=>NodeFilter.FILTER_ACCEPT,!1),r=[];let a=null;for(;t.nextNode();){const i=t.currentNode;if(i.nodeType===Node.ELEMENT_NODE)getComputedStyle(i).display!=="inline"&&(a=null);else if(i.nodeType===Node.TEXT_NODE){const o=i.nodeValue,l=/\S+/g;let u,d=null;for(;(u=l.exec(o))!==null;){const m=u.index,p=u.index+u[0].length;let c;m===0&&a?(c=a,c.setEnd(i,p)):(c=i.ownerDocument.createRange(),c.setStart(i,m),c.setEnd(i,p),r.push(c)),p===o.length&&(d=c)}a=d}}return r}render(){return s.createElement("div",{ref:e=>this._container=e},this.props.children)}}_i.__docgenInfo={description:"",methods:[{name:"_sendWordsUpdate",docblock:null,modifiers:[],params:[],returns:null},{name:"_getWordRanges",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"Range"}],raw:"ReadonlyArray<DOMRange>"}}}],displayName:"WordIndexer",props:{children:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]},description:""},onWordsUpdate:{required:!0,tsType:{name:"signature",type:"function",raw:"(wordRanges: ReadonlyArray<DOMRange>) => unknown",signature:{arguments:[{type:{name:"ReadonlyArray",elements:[{name:"Range"}],raw:"ReadonlyArray<DOMRange>"},name:"wordRanges"}],return:{name:"unknown"}}},description:""}}};class Vi extends s.PureComponent{constructor(){super(...arguments),this.state={wordRanges:[]},this._handleAddHighlight=e=>{const t=pu(this._getDOMHighlights(),e),r={};for(const a of Object.keys(t))r[a]=wu(t[a]);this.props.onSerializedHighlightsUpdate(r)},this._handleRemoveHighlight=e=>{const{serializedHighlights:t}=this.props,r={...t};delete r[e],this.props.onSerializedHighlightsUpdate(r)},this._handleWordsUpdate=e=>{this.setState({wordRanges:e})}}_buildHighlight(e){return gu(this._getDOMHighlights(),this.state.wordRanges,e)}_getDOMHighlights(){const{serializedHighlights:e}=this.props,{wordRanges:t}=this.state,r={};for(const a of Object.keys(e))r[a]=yu(e[a],t);return r}render(){const e=this._getDOMHighlights(),t=r=>this._buildHighlight(r);return s.createElement("div",{className:T.css(Ra.container),ref:r=>this._container=r},s.createElement("div",null,this.props.enabled&&this._container&&this._content&&s.createElement(Jn,{buildHighlight:t,contentNode:this._content,editable:this.props.editable,highlights:e,offsetParent:this._container,zIndexes:{belowContent:0},onAddHighlight:this._handleAddHighlight,onRemoveHighlight:this._handleRemoveHighlight})),s.createElement("div",{className:T.css(Ra.content),ref:r=>this._content=r},s.createElement(_i,{onWordsUpdate:this._handleWordsUpdate},this.props.children)))}}const Ra=T.StyleSheet.create({container:{position:"relative",zIndex:0},content:{position:"relative",zIndex:1}});Vi.__docgenInfo={description:"",methods:[{name:"_buildHighlight",docblock:null,modifiers:[],params:[{name:"highlightRange",optional:!1,type:{name:"Range",alias:"DOMRange"}}],returns:{type:{name:"union",raw:"DOMHighlight | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]}},{name:"null"},{name:"undefined"}]}}},{name:"_getDOMHighlights",docblock:`Take the highlights from props, and deserialize them into DOMHighlights,
according to the latest cache of word ranges.`,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    [key: string]: DOMHighlight;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}}]}}},description:`Take the highlights from props, and deserialize them into DOMHighlights,
according to the latest cache of word ranges.`},{name:"_handleAddHighlight",docblock:"Add the given DOMHighlight to the current set.",modifiers:[],params:[{name:"highlight",optional:!1,type:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    // TODO(mdr): Things like color will go here, too :)
    domRange: DOMRange;
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},alias:"DOMHighlight"}}],returns:null,description:"Add the given DOMHighlight to the current set."},{name:"_handleRemoveHighlight",docblock:`Remove the given highlight from the list, and call our callback with the
new set of highlights.`,modifiers:[],params:[{name:"keyToRemove",optional:!1,type:{name:"string"}}],returns:null,description:`Remove the given highlight from the list, and call our callback with the
new set of highlights.`},{name:"_handleWordsUpdate",docblock:`When our WordIndexer sends us a new cache of word ranges, store it in
our component state.`,modifiers:[],params:[{name:"wordRanges",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"Range"}],raw:"ReadonlyArray<DOMRange>",alias:"ReadonlyArray"}}],returns:null,description:`When our WordIndexer sends us a new cache of word ranges, store it in
our component state.`}],displayName:"HighlightableContent",props:{children:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]},description:""},editable:{required:!0,tsType:{name:"boolean"},description:""},enabled:{required:!0,tsType:{name:"boolean"},description:""},onSerializedHighlightsUpdate:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    serializedHighlights: SerializedHighlightSet,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    [key: string]: SerializedHighlight;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, in a
    // DOM-independent format.
    // TODO(mdr): Things like color will go here, too :)
    range: SerializedRange;
}`,signature:{properties:[{key:"range",value:{name:"signature",type:"object",raw:`{
    type: "word-indexes";
    firstWordIndex: number;
    lastWordIndex: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"word-indexes"',required:!0}},{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}},name:"serializedHighlights"}],return:{name:"unknown"}}},description:""},serializedHighlights:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    [key: string]: SerializedHighlight;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, in a
    // DOM-independent format.
    // TODO(mdr): Things like color will go here, too :)
    range: SerializedRange;
}`,signature:{properties:[{key:"range",value:{name:"signature",type:"object",raw:`{
    type: "word-indexes";
    firstWordIndex: number;
    lastWordIndex: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"word-indexes"',required:!0}},{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}},description:""}}};const xu=n=>({type:"passage",options:{passageTitle:n.passageTitle,passageText:n.passageText,footnotes:n.footnotes}});function jr(){return{currentRef:[],useRefs:!0,lastRef:0,firstSentenceRef:null,firstQuestionRef:null,lastFootnote:{id:0,text:""}}}class qu extends s.Component{constructor(){super(...arguments),this.getRefContent=()=>this.props.refContent}render(){return s.createElement("span",{style:$i},"_")}}class Pu extends s.Component{render(){return s.createElement("span",{style:$i},"_")}}const St=({id:n,number:e})=>{const{strings:t}=me();return s.createElement("span",{key:"alt-text",className:"perseus-sr-only"},t[n]({number:e}))},Hi={newline:W.defaultRules.newline,paragraph:W.defaultRules.paragraph,escape:W.defaultRules.escape,passageFootnote:{order:W.defaultRules.escape.order+.1,match:W.inlineRegex(/^\^/),parse:(n,e,t)=>{const r=t.lastFootnote.id+1,a={id:r,text:r===1?"*":""+r};return t.lastFootnote.text==="*"&&(t.lastFootnote.text=""+t.lastFootnote.id),t.lastFootnote=a,a},react:(n,e,t)=>s.createElement("sup",{key:t.key},n.text)},refStart:{order:W.defaultRules.escape.order+.2,match:function(n){const e=/^\{\{/.exec(n);if(e){let t=2,r=0;for(;t<n.length;){const a=n.slice(t,t+2);if(a==="{{")r++,t++;else if(a==="}}")if(r>0)r--,t++;else break;t++}return e[1]=n.slice(2,t),e}return null},parse:(n,e,t)=>{if(!t.useRefs)return{ref:null,refContent:null};const r=t.lastRef+1;t.lastRef=r,t.currentRef.push(r);const a=e("(“"+n[1]+`”)

`,h.defaults({useRefs:!1},jr()));return{ref:r,refContent:a}},react:(n,e,t)=>{const r=n.ref;if(r==null)return null;const a=e(n.refContent,{});return s.createElement(qu,{ref:Ut+r,key:Ut+r,refContent:a})}},refEnd:{order:W.defaultRules.escape.order+.3,match:W.inlineRegex(/^\}\}/),parse:(n,e,t)=>t.useRefs?{ref:t.currentRef.pop()||null}:{ref:null},react:(n,e,t)=>n.ref!=null?s.createElement(Pu,{ref:Xt+n.ref,key:Xt+n.ref}):null},squareLabel:{order:W.defaultRules.escape.order+.4,match:W.inlineRegex(/^\[\[(\w+)\]\]( *)/),parse:(n,e,t)=>(t.firstQuestionRef||(t.firstQuestionRef=n[1]),{content:n[1],space:n[2].length>0}),react:(n,e,t)=>[s.createElement("span",{key:"visual-square",className:"perseus-passage-square-label",style:Ia,"aria-hidden":"true"},s.createElement("span",{style:Au},n.content)),s.createElement(St,{key:"alt-text",id:"questionMarker",number:n.content}),n.space?" ":null]},circleLabel:{order:W.defaultRules.escape.order+.5,match:W.inlineRegex(/^\(\((\w+)\)\)( *)/),parse:(n,e,t)=>({content:n[1],space:n[2].length>0}),react:(n,e,t)=>[s.createElement("span",{key:"visual-circle",className:"perseus-passage-circle-label",style:Ia,"aria-hidden":!0},s.createElement("span",{style:Cu},n.content)),s.createElement(St,{key:"alt-text",id:"circleMarker",number:n.content}),n.space?" ":null]},squareBracketRef:{order:W.defaultRules.escape.order+.6,match:W.inlineRegex(/^\[(\d+)\]( *)/),parse:(n,e,t)=>(t.firstSentenceRef||(t.firstSentenceRef=n[1]),{content:n[1],space:n[2].length>0}),react:(n,e,t)=>[s.createElement("span",{key:"visual-brackets",className:"perseus-passage-bracket-label","aria-hidden":"true"},"[",n.content,"]"),s.createElement(St,{key:"alt-text",id:"sentenceMarker",number:n.content}),n.space?" ":null]},highlight:{order:W.defaultRules.escape.order+.7,match:W.inlineRegex(/^{highlighting.start}(.+?){highlighting.end}/),parse:(n,e,t)=>({content:n[1]}),react:(n,e,t)=>[s.createElement("span",{key:0,className:"perseus-highlight"},n.content)]},reviewHighlight:{order:W.defaultRules.escape.order+.7,match:W.inlineRegex(/^{review-highlighting.start}(.+?){review-highlighting.end}/),parse:(n,e,t)=>({content:n[1]}),react:(n,e,t)=>[s.createElement("span",{key:0,className:"perseus-review-highlight"},n.content)]},strong:W.defaultRules.strong,u:W.defaultRules.u,em:W.defaultRules.em,del:W.defaultRules.del,text:{...W.defaultRules.text,react(n,e,t){return s.createElement("span",{key:t.key},n.content)}}},Ut="start-ref-",Xt="end-ref-",$i={display:"inline-block",width:0,visibility:"hidden"},Ia={display:"inline",whiteSpace:"nowrap"},Au={display:"inline-block",color:"rgb(255, 255, 255)",backgroundColor:"rgb(90, 90, 90)",paddingLeft:10,paddingRight:10,userSelect:"none",WebkitUserSelect:"none"},Cu={display:"inline-block",color:"rgb(255, 255, 255)",backgroundColor:"rgb(90, 90, 90)",userSelect:"none",WebkitUserSelect:"none",width:22,height:22,borderRadius:"50%",textAlign:"center"},Tu=W.parserFor(Hi),Ru=(n,e)=>{e=e||{};const t=n+`

`;return Tu(t,h.extend(e,jr()))},Iu=W.reactFor(W.ruleOutput(Hi,"react")),ve={parse:Ru,output:Iu,START_REF_PREFIX:Ut,END_REF_PREFIX:Xt,getInitialParseState:jr};class Ui extends s.Component{measureLineHeight(){return this._line?this._line.clientHeight:0}render(){return s.createElement("div",{className:T.css(Nu.measurer),"aria-hidden":"true"},s.createElement("div",{ref:e=>this._line=e,className:"paragraph"},"Line Height Measurement"))}}const Nu=T.StyleSheet.create({measurer:{position:"absolute",top:0,left:0,visibility:"hidden",zIndex:-1}}),st=class st extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.state={nLines:null,startLineNumbersAfter:0,stylesAreApplied:!1},this._handleSerializedHighlightsUpdate=e=>{this.props.onChange({highlights:e})}}componentDidMount(){this._updateState(),this._onResize=h.throttle(()=>{var e;this.shouldRenderJipt()||((e=this._lineHeightMeasurerRef)==null||e.measureLineHeight(),this._updateState())},500),window.addEventListener("resize",this._onResize),this._stylesAppiedTimer=window.setTimeout(()=>{this.setState({stylesAreApplied:!0})},0)}shouldComponentUpdate(e,t){return!h.isEqual(this.props,e)||!h.isEqual(this.state,t)}componentDidUpdate(){this._updateState()}componentWillUnmount(){window.removeEventListener("resize",this._onResize),clearTimeout(this._stylesAppiedTimer)}_updateState(){this.shouldRenderJipt()||this.setState({nLines:this._measureLines(),startLineNumbersAfter:this._getInitialLineNumber()})}_measureLines(){const e=vn.findDOMNode(this._contentRef),t=D(e).height(),r=this._getLineHeight();return Math.round(t/r)}_getInitialLineNumber(){let e=!0;return this.props.findWidgets((r,a)=>a.type!=="passage"?!1:(r===this.props.widgetId&&(e=!1),e)).filter(Xi).map(r=>r.getLineCount()).reduce((r,a)=>r+a,0)}_getLineHeight(){var e;return((e=this._lineHeightMeasurerRef)==null?void 0:e.measureLineHeight())||0}getLineCount(){return this.state.nLines!=null?this.state.nLines:this._measureLines()}_getStartRefLineNumber(e){const t=ve.START_REF_PREFIX+e,r=this.refs[t];if(!r)return null;const a=D(vn.findDOMNode(r));let i=a.next();i.length===0&&(i=a);const o=i.offset().top;return this.state.startLineNumbersAfter+1+this._convertPosToLineNumber(o)}_getEndRefLineNumber(e){const t=ve.END_REF_PREFIX+e,r=this.refs[t];if(!r)return null;const a=D(vn.findDOMNode(r));let i=a.prev();i.length===0&&(i=a);const o=i.height(),l=i.offset().top;let u=this._convertPosToLineNumber(l+o);return o===0&&(u+=1),this.state.startLineNumbersAfter+u}_convertPosToLineNumber(e){const t=vn.findDOMNode(this._contentRef),r=e-D(t).offset().top,a=this._getLineHeight();return Math.round(r/a)}_getRefContent(e){const t=ve.START_REF_PREFIX+e,r=this.refs[t];return r?r.getRefContent():null}getReference(e){const t=this._getStartRefLineNumber(e),r=this._getEndRefLineNumber(e);if(t==null||r==null)return null;const a=this._getRefContent(e);return{startLine:t,endLine:r,content:a}}getPromptJSON(){return xu(this.props)}_renderInstructions(e){const t=e.firstQuestionRef,r=e.firstSentenceRef,{strings:a}=this.context;let i="";t&&(i+=a.symbolPassage({questionSymbol:"[["+t+"]]",questionNumber:t})),r&&(i+=a.symbolQuestion({sentenceSymbol:"["+r+"]"}));const o=ve.parse(i);return s.createElement("div",{className:"perseus-widget-passage-instructions"},ve.output(o))}shouldRenderJipt(){const{JIPT:e}=qe();return e.useJIPT&&this.props.passageText.indexOf("crwdns")!==-1}_renderContent(e){const t=this.state.stylesAreApplied,r=!this.props.reviewMode;return s.createElement(Vi,{editable:r,enabled:t,onSerializedHighlightsUpdate:this._handleSerializedHighlightsUpdate,serializedHighlights:this.props.highlights},s.createElement("div",{ref:a=>this._contentRef=a},s.createElement(Ui,{ref:a=>this._lineHeightMeasurerRef=a}),ve.output(e)))}_hasFootnotes(){const e=this.props.footnotes;return!/^\s*$/.test(e)}_renderFootnotes(){const e=this.props.footnotes,t=ve.parse(e);return ve.output(t)}render(){const{strings:e}=this.context;let t;const r=this.state.nLines;this.props.showLineNumbers&&r&&(t=h.range(1,r+1).map(d=>{const m=d+this.state.startLineNumbersAfter;if(m===4){const p=e.lineLabel;return s.createElement("span",{key:"line-marker",className:"line-marker"},p)}return s.createElement("span",{key:d},m)}));const a=ve.getInitialParseState(),i=/("{1})([^"]*)("{1})/g,o=this.props.passageText.replace(i,"“$2”"),l=ve.parse(o,a),u=/\S/.test(this.props.passageTitle);return s.createElement("div",null,s.createElement("div",{className:"perseus-widget-passage-container"},this._renderInstructions(a),s.createElement("div",{className:"perseus-widget-passage"},u&&s.createElement("h3",{className:"passage-title"},s.createElement(X,{content:this.props.passageTitle,linterContext:this.props.linterContext,strings:e})),t&&s.createElement("div",{className:"line-numbers","aria-hidden":!0},t),!u&&s.createElement("h3",{className:"perseus-sr-only"},e.beginningPassage),s.createElement("div",{className:"passage-text"},this.shouldRenderJipt()?s.createElement(X,{content:this.props.passageText,strings:e}):this._renderContent(l)),this._hasFootnotes()&&[s.createElement("h4",{key:"footnote-start",className:"perseus-sr-only"},e.beginningFootnotes),s.createElement("div",{key:"footnotes",className:"footnotes"},this._renderFootnotes())],s.createElement("div",{className:"perseus-sr-only"},e.endPassage))))}};st.contextType=G,st.defaultProps={passageTitle:"",passageText:"",footnotes:"",showLineNumbers:!0,highlights:{},linterContext:re};let In=st;const Eu={name:"passage",displayName:"Passage (SAT only)",hidden:!0,widget:In,transform:n=>h.pick(n,"passageTitle","passageText","footnotes","showLineNumbers"),isLintable:!0};Ui.__docgenInfo={description:"",methods:[{name:"measureLineHeight",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}}],displayName:"LineHeightMeasurer"};In.__docgenInfo={description:"",methods:[{name:"_handleSerializedHighlightsUpdate",docblock:null,modifiers:[],params:[{name:"serializedHighlights",optional:!1,type:{name:"signature",type:"object",raw:`{
    [key: string]: SerializedHighlight;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // A range that specifies this highlight's target content, in a
    // DOM-independent format.
    // TODO(mdr): Things like color will go here, too :)
    range: SerializedRange;
}`,signature:{properties:[{key:"range",value:{name:"signature",type:"object",raw:`{
    type: "word-indexes";
    firstWordIndex: number;
    lastWordIndex: number;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"word-indexes"',required:!0}},{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},alias:"SerializedHighlightSet"}}],returns:null},{name:"_updateState",docblock:`Line numbering

These functions support passage line numbering, which is non-trivial
because we manually measure lines to support resizing as well as
continuing line numbers from previous passages.`,modifiers:[],params:[],returns:null,description:`Line numbering

These functions support passage line numbering, which is non-trivial
because we manually measure lines to support resizing as well as
continuing line numbers from previous passages.`},{name:"_measureLines",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}},{name:"_getInitialLineNumber",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}},{name:"_getLineHeight",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}},{name:"getLineCount",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}},{name:"_getStartRefLineNumber",docblock:`Passage refs

These are functions to support the passage refs inter-widgets feature
where other widgets can fetch the line numbers of a reference inside of
a passage.

todo(matthewc): The refs are created by PassageMarkdown's refStart and refEnd,
somehow bubbling up to Passage's \`this.refs\`. This runs against
current best practices for refs by using string refs, but also
by breaking our expectation of explicit data flow.`,modifiers:[],params:[{name:"referenceNumber",optional:!1,type:{name:"number"}}],returns:{type:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]}},description:`Passage refs

These are functions to support the passage refs inter-widgets feature
where other widgets can fetch the line numbers of a reference inside of
a passage.

todo(matthewc): The refs are created by PassageMarkdown's refStart and refEnd,
somehow bubbling up to Passage's \`this.refs\`. This runs against
current best practices for refs by using string refs, but also
by breaking our expectation of explicit data flow.`},{name:"_getEndRefLineNumber",docblock:null,modifiers:[],params:[{name:"referenceNumber",optional:!1,type:{name:"number"}}],returns:{type:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]}}},{name:"_convertPosToLineNumber",docblock:null,modifiers:[],params:[{name:"absoluteVPos",optional:!1,type:{name:"number"}}],returns:{type:{name:"number"}}},{name:"_getRefContent",docblock:null,modifiers:[],params:[{name:"referenceNumber",optional:!1,type:{name:"number"}}],returns:{type:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]}}},{name:"getReference",docblock:null,modifiers:[],params:[{name:"referenceNumber",optional:!1,type:{name:"number"}}],returns:{type:{name:"union",raw:"Reference | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    startLine: number;
    endLine: number;
    content: string | null | undefined;
}`,signature:{properties:[{key:"startLine",value:{name:"number",required:!0}},{key:"endLine",value:{name:"number",required:!0}},{key:"content",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]}},{name:"null"},{name:"undefined"}]}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"passageTitle",value:{name:"string",required:!0}},{key:"passageText",value:{name:"string",required:!0}},{key:"footnotes",value:{name:"string",required:!0}}]},required:!0}}]}}}},{name:"_renderInstructions",docblock:`Rendering

Functions to render the passage widget.`,modifiers:[],params:[{name:"parseState",optional:!1,type:{name:"intersection",raw:`State & {
    currentRef: number[];
    useRefs: boolean;
    lastRef: number;
    firstSentenceRef: string | null | undefined;
    firstQuestionRef: string | null | undefined;
    lastFootnote: {
        id: number;
        text: string;
    };
}`,elements:[{name:"signature",type:"object",raw:`{
    key?: string | number | undefined;
    inline?: boolean | null | undefined;
    [key: string]: any;
}`,signature:{properties:[{key:"key",value:{name:"union",raw:"string | number | undefined",elements:[{name:"string"},{name:"number"},{name:"undefined"}],required:!1}},{key:"inline",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!1}},{key:{name:"string"},value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:`{
    currentRef: number[];
    useRefs: boolean;
    lastRef: number;
    firstSentenceRef: string | null | undefined;
    firstQuestionRef: string | null | undefined;
    lastFootnote: {
        id: number;
        text: string;
    };
}`,signature:{properties:[{key:"currentRef",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"useRefs",value:{name:"boolean",required:!0}},{key:"lastRef",value:{name:"number",required:!0}},{key:"firstSentenceRef",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"firstQuestionRef",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"lastFootnote",value:{name:"signature",type:"object",raw:`{
    id: number;
    text: string;
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"text",value:{name:"string",required:!0}}]},required:!0}}]}}],alias:"ParseState"}}],returns:{type:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}},description:`Rendering

Functions to render the passage widget.`},{name:"shouldRenderJipt",docblock:null,modifiers:[],params:[],returns:{type:{name:"boolean"}}},{name:"_renderContent",docblock:null,modifiers:[],params:[{name:"parsed",optional:!1,type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: string;
    [key: string]: any;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:{name:"string"},value:{name:"any",required:!0}}]}}],raw:"Array<SingleASTNode>",alias:"Array"}}],returns:{type:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},{name:"_hasFootnotes",docblock:null,modifiers:[],params:[],returns:{type:{name:"boolean"}}},{name:"_renderFootnotes",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactNode",raw:"React.ReactNode"}}}],displayName:"Passage",props:{passageTitle:{defaultValue:{value:'""',computed:!1},required:!1},passageText:{defaultValue:{value:'""',computed:!1},required:!1},footnotes:{defaultValue:{value:'""',computed:!1},required:!1},showLineNumbers:{defaultValue:{value:"true",computed:!1},required:!1},highlights:{defaultValue:{value:"{}",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};function Xi(n){return n instanceof In}const Na="–",lt=class lt extends s.Component{constructor(){super(...arguments),this.displayName="PassageRef",this.isWidget=!0,this.state={lineRange:null,content:null},this.change=(...e)=>ae.apply(this,e),this._deferredUpdateRange=()=>{h.defer(this._updateRange)},this._updateRange=()=>{const e=this.props.findWidgets("passage "+this.props.passageNumber).filter(Xi)[0],t=e==null?void 0:e.getReference(this.props.referenceNumber);this._isMounted&&(t?this.setState({lineRange:[t.startLine,t.endLine],content:t.content}):this.setState({lineRange:null,content:null}))}}componentDidMount(){this._isMounted=!0,this._deferredUpdateRange(),this._throttledUpdateRange=h.throttle(this._deferredUpdateRange,500),window.addEventListener("resize",this._throttledUpdateRange)}shouldComponentUpdate(e,t){return!h.isEqual(this.props,e)||!h.isEqual(this.state,t)}componentDidUpdate(){this._deferredUpdateRange()}componentWillUnmount(){window.removeEventListener("resize",this._throttledUpdateRange),this._isMounted=!1}getPromptJSON(){return lu(this.props)}render(){const{strings:e}=this.context,t=this.state.lineRange;let r;t?t[0]===t[1]?r=e.lineNumber({lineNumber:String(t[0])}):r=e.lineRange({lineRange:t[0]+Na+t[1]}):r=e.lineRange({lineRange:`?${Na}?`});let a;if(this.props.summaryText){const i=ya.parseInline(this.props.summaryText);a=s.createElement("span",{"aria-hidden":!0}," ","(“",ya.basicOutput(i),"”)")}else a=null;return s.createElement("span",null,r,a,t&&s.createElement("div",{className:"perseus-sr-only"},this.state.content))}};lt.contextType=G,lt.defaultProps={passageNumber:1,referenceNumber:1,summaryText:""};let Yt=lt;const Yi={name:"passage-ref",displayName:"PassageRef (SAT only)",hidden:!0,widget:Yt,transform:n=>({passageNumber:n.passageNumber,referenceNumber:n.referenceNumber,summaryText:n.summaryText}),version:_s.version};var De;let zi=(De=class extends s.Component{constructor(){super(...arguments),this._renderRenderer=(e="")=>{let t=1;const r={},a=e.replace(/\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,(i,o,l,u)=>{const d="passage-ref "+t;return t++,r[d]={type:"passage-ref",graded:!1,options:{passageNumber:parseInt(o),referenceNumber:parseInt(l),summaryText:u},version:Yi.version},"[["+J.snowman+" "+d+"]]"});return s.createElement(X,{key:"choiceContentRenderer",content:a,widgets:r,findExternalWidgets:this.props.findWidgets,alwaysUpdate:!0,linterContext:{...this.props.linterContext,blockHighlight:!0},strings:this.context.strings})},this.updateChoices=e=>{const{choiceStates:t,choices:r}=this.props,a=t?t.map(i=>({...i})):r.map(()=>({selected:!1,crossedOut:!1,highlighted:!1,rationaleShown:!1,correctnessShown:!1,previouslyAnswered:!1,readOnly:!1}));a.forEach((i,o)=>{i.selected=e.checked[o],i.crossedOut=e.crossedOut[o]}),this.props.onChange({choiceStates:a}),this.props.trackInteraction()},this.showRationalesForCurrentlySelectedChoices=e=>{const{choiceStates:t}=this.props;if(t){const r=nl(this.getUserInput(),e),a=r.type==="points"&&r.total===r.earned,i=t.map(o=>({...o,highlighted:o.selected,rationaleShown:o.selected||o.rationaleShown||a,readOnly:o.selected||o.readOnly||a||this.props.showSolutions!=="none",correctnessShown:o.selected||o.correctnessShown,previouslyAnswered:o.previouslyAnswered||o.selected}));this.props.onChange({choiceStates:i},null,!0)}},this.deselectIncorrectSelectedChoices=()=>{if(this.props.choiceStates){const e=this.props.choiceStates.map((t,r)=>({...t,selected:t.selected&&!!this.props.choices[r].correct,highlighted:!1}));this.props.onChange({choiceStates:e},null,!1)}}}static getUserInputFromProps(e,t=!0){if(e.choiceStates){const a=e.choiceStates,i=a.map(()=>!1);for(let o=0;o<i.length;o++){const l=t?e.choices[o].originalIndex:o;i[l]=a[o].selected}return{choicesSelected:i}}const{values:r}=e;if(r){const a=[...r],i=r.length;for(let o=0;o<i;o++){const l=t?e.choices[o].originalIndex:o;a[l]=r[o]}return{choicesSelected:a}}return{choicesSelected:e.choices.map(()=>!1)}}componentDidUpdate(e){this.props.showSolutions==="selected"&&e.showSolutions!=="selected"&&this.showRationalesForCurrentlySelectedChoices(this.props)}focus(e){return this.focusFunction?this.focusFunction(e):!1}registerFocusFunction(e){this.focusFunction=e}getUserInput(){return De.getUserInputFromProps(this.props)}getPromptJSON(){const e=De.getUserInputFromProps(this.props,!1);return su(this.props,e)}render(){const{choices:e}=this.props,{strings:t}=this.context;let r;this.props.static?r=e.map(i=>({selected:!!i.correct,crossedOut:!1,readOnly:!0,highlighted:!1,rationaleShown:!0,correctnessShown:!0,previouslyAnswered:!1})):this.props.showSolutions==="all"?r=e.map(({correct:i})=>({selected:!!i,crossedOut:!1,readOnly:!0,highlighted:!1,rationaleShown:!0,correctnessShown:!0,previouslyAnswered:!1})):this.props.choiceStates?r=this.props.choiceStates:this.props.values?r=this.props.values.map(i=>({selected:i,crossedOut:!1,readOnly:!1,highlighted:!1,rationaleShown:!1,correctnessShown:!1,previouslyAnswered:!1})):r=e.map(()=>({selected:!1,crossedOut:!1,readOnly:!1,highlighted:!1,rationaleShown:!1,correctnessShown:!1,previouslyAnswered:!1}));const a=e.map((i,o)=>{var v;const l=i.isNoneOfTheAbove&&!i.content?t.noneOfTheAbove:i.content,{selected:u,crossedOut:d,rationaleShown:m,correctnessShown:p,readOnly:c,highlighted:g,previouslyAnswered:y}=r[o],w=(v=this.props.reviewModeRubric)==null?void 0:v.choices[o];return{content:this._renderRenderer(l),checked:u,correct:i.correct===void 0?!!w&&!!w.correct:i.correct,disabled:c,hasRationale:!!i.clue,rationale:this._renderRenderer(i.clue),showRationale:m,showCorrectness:p,isNoneOfTheAbove:!!i.isNoneOfTheAbove,revealNoneOfTheAbove:!!(this.props.questionCompleted&&u),crossedOut:d,highlighted:g,previouslyAnswered:y}});return s.createElement(gl,{labelWrap:!0,multipleSelect:this.props.multipleSelect,countChoices:this.props.countChoices,numCorrect:this.props.numCorrect,choices:a,onChange:this.updateChoices,reviewModeRubric:this.props.reviewModeRubric,reviewMode:this.props.reviewMode,deselectEnabled:this.props.deselectEnabled,apiOptions:this.props.apiOptions,isLastUsedWidget:this.props.isLastUsedWidget,registerFocusFunction:i=>this.registerFocusFunction(i)})}},De.contextType=G,De.defaultProps={choices:[],multipleSelect:!1,countChoices:!1,deselectEnabled:!1,linterContext:re,showSolutions:"none"},De);zi.__docgenInfo={description:"",methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"signature",type:"object",raw:`{
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    selectedChoices: ReadonlyArray<PerseusRadioChoice["correct"]>;
    showSolutions?: ShowSolutions;
    choiceStates?: ReadonlyArray<ChoiceState>;
    // Depreciated; support for legacy way of handling changes
    // Adds proptype for prop that is used but was lacking type
    values?: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"numCorrect",value:{name:"number",required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"multipleSelect",value:{name:"boolean",required:!1}},{key:"countChoices",value:{name:"boolean",required:!1}},{key:"deselectEnabled",value:{name:"boolean",required:!1}},{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRadioChoice & {
    originalIndex: number;
    correct?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; A clue to give the user when they get it wrong
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    clue?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    widgets?: PerseusWidgetsMap;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"clue",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}}]}},{name:"signature",type:"object",raw:`{
    originalIndex: number;
    correct?: boolean;
}`,signature:{properties:[{key:"originalIndex",value:{name:"number",required:!0}},{key:"correct",value:{name:"boolean",required:!1}}]}}]}],raw:"ReadonlyArray<RadioChoiceWithMetadata>",required:!0}},{key:"selectedChoices",value:{name:"ReadonlyArray",elements:[{name:"boolean",raw:'PerseusRadioChoice["correct"]'}],raw:'ReadonlyArray<PerseusRadioChoice["correct"]>',required:!0}},{key:"showSolutions",value:{name:"union",raw:'"all" | "selected" | "none"',elements:[{name:"literal",value:'"all"'},{name:"literal",value:'"selected"'},{name:"literal",value:'"none"'}],required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!1}}]}},{name:"signature",type:"object",raw:`{
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"signature",type:"object",raw:`{
    // The choices provided to the user.
    choices: ReadonlyArray<PerseusRadioChoice>;
}`,signature:{properties:[{key:"choices",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    // Translatable Markdown; The label for this choice
    content: string;
    // Translatable Markdown; A clue to give the user when they get it wrong
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    clue?: string;
    // Whether this option is a correct answer or not
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    correct?: boolean;
    // If this is none of the above, override the content with "None of the above"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    isNoneOfTheAbove?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    widgets?: PerseusWidgetsMap;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"clue",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}}]}}],raw:"ReadonlyArray<PerseusRadioChoice>",required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}],alias:"Props"}},{name:"unshuffle",optional:!0,type:null}],returns:{type:{name:"signature",type:"object",raw:`{
    choicesSelected: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"choicesSelected",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}}}},{name:"_renderRenderer",docblock:null,modifiers:[],params:[{name:"content",optional:!0,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!0,type:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}}],returns:{type:{name:"boolean"}}},{name:"registerFocusFunction",docblock:null,modifiers:[],params:[{name:"fun",optional:!1,type:{name:"signature",type:"function",raw:`(
    choiceIndex?: number | null | undefined,
) => boolean`,signature:{arguments:[{type:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},name:"choiceIndex"}],return:{name:"boolean"}},alias:"FocusFunction"}}],returns:{type:{name:"void"}}},{name:"updateChoices",docblock:null,modifiers:[],params:[{name:"newValueLists",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    choicesSelected: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"choicesSelected",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"selectedOptions",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]},required:!0}}]}}}},{name:"showRationalesForCurrentlySelectedChoices",docblock:`Turn on rationale display for the currently selected choices. Note that
this leaves rationales on for choices that are already showing
rationales.
@deprecated Internal only. Use \`showSolutions\` prop instead.`,modifiers:[],params:[{name:"rubric",optional:!1}],returns:null,description:`Turn on rationale display for the currently selected choices. Note that
this leaves rationales on for choices that are already showing
rationales.`},{name:"deselectIncorrectSelectedChoices",docblock:"Deselects any currently-selected choices that are not correct choices.",modifiers:[],params:[],returns:null,description:"Deselects any currently-selected choices that are not correct choices."}],displayName:"Radio",props:{widgetId:{required:!0,tsType:{name:"string"},description:""},alignment:{required:!0,tsType:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},description:""},static:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},problemNum:{required:!0,tsType:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},description:""},apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`},description:""},keypadElement:{required:!1,tsType:{name:"any"},description:""},questionCompleted:{required:!1,tsType:{name:"boolean"},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},onFocus:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},onBlur:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},findWidgets:{required:!0,tsType:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}}},description:""},reviewModeRubric:{required:!1,tsType:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"RubricRegistry[RubricRegistry]",raw:"RubricRegistry[keyof RubricRegistry]"},{name:"null"},{name:"undefined"}]},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:""},trackInteraction:{required:!0,tsType:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"TrackingExtraArgs"},name:"extraData"}],return:{name:"void"}}},description:""},isLastUsedWidget:{required:!0,tsType:{name:"boolean"},description:""},linterContext:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:"",defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1}},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},choices:{defaultValue:{value:"[]",computed:!1},required:!1},multipleSelect:{defaultValue:{value:"false",computed:!1},required:!1},countChoices:{defaultValue:{value:"false",computed:!1},required:!1},deselectEnabled:{defaultValue:{value:"false",computed:!1},required:!1},showSolutions:{defaultValue:{value:'"none"',computed:!1},required:!1}}};const Su=(n,e,t)=>{const r=function(l){const u=t===void 0?Vs:t;return n.randomize?Rr(l,u??0):l},a=function(l){let u=null;const d=l.filter((m,p)=>m.isNoneOfTheAbove?(u=m,!1):!0);return u&&d.push(u),d},i=l=>{const u=[[e.false,e.true],[e.no,e.yes]],d=l.map(m=>m.content);return u.some(m=>h.isEqual(d,m))?[l[1],l[0]]:l},o=n.choices.map((l,u)=>({...l,originalIndex:u,correct:!!l.correct}));return a(i(r(o)))},Ea=(n,e,t)=>{const r=Su(n,e,t),{hasNoneOfTheAbove:a,multipleSelect:i,countChoices:o,deselectEnabled:l,numCorrect:u}=n;return{numCorrect:u,hasNoneOfTheAbove:a,multipleSelect:i,countChoices:o,deselectEnabled:l,choices:r,selectedChoices:h.pluck(r,"correct")}},Ou={name:"radio",displayName:"Radio / Multiple choice",accessible:!0,widget:zi,transform:Ea,staticTransform:Ea,version:ga.version,propUpgrades:ga.widgetOptionsUpgrades,isLintable:!0},Mu=[Ou,eu,ou,Kl],Lu=(n,e)=>({type:"categorizer",options:{items:n.items,categories:n.categories},userInput:{itemToCategoryMapping:e.values}}),Cn=class Cn extends s.Component{constructor(){super(...arguments),this.state={uniqueId:h.uniqueId("perseus_radio_")},this.change=(...e)=>ae.apply(this,e)}static getUserInputFromProps(e){return{values:e.values}}getUserInput(){return Cn.getUserInputFromProps(this.props)}getPromptJSON(){return Lu(this.props,this.getUserInput())}onChange(e,t){const r=[...this.props.values];r[e]=t,this.change("values",r),this.props.trackInteraction()}render(){const e=this,t=this.props.apiOptions.isMobile;let r=this.props.items.map((l,u)=>[l,u]);this.props.randomizeItems&&(r=Rr(r,this.props.problemNum));const a=s.createElement("table",{className:"categorizer-table "+T.css(Se.mobileTable)},s.createElement("thead",null,s.createElement("tr",null,s.createElement("td",{className:T.css(Se.emptyHeaderCell)}),this.props.categories.map((l,u)=>s.createElement("th",{className:T.css(Se.header),key:u},s.createElement(X,{content:l,linterContext:this.props.linterContext,strings:this.context.strings}))))),s.createElement("tbody",null,r.map(l=>{const u=l[0],d=l[1],m=e.state.uniqueId+"_"+d;return s.createElement("tr",{key:d},s.createElement("td",null,s.createElement(X,{content:u,linterContext:this.props.linterContext,strings:this.context.strings})),e.props.categories.map((p,c)=>{const g=e.props.values[d]===c;return s.createElement("td",{className:"category "+T.css(Se.cell),key:c},s.createElement("div",{role:"button","aria-label":p,onClick:()=>this.onChange(d,c)},t&&s.createElement("input",{type:"radio",name:m,className:T.css(ka.responsiveInput,ka.responsiveRadioInput),checked:g,onChange:()=>this.onChange(d,c),onClick:y=>y.stopPropagation()}),!t&&s.createElement("span",{className:T.css(Se.radioSpan,g&&Se.checkedRadioSpan,this.props.static&&g&&Se.staticCheckedRadioSpan)},g?s.createElement(on,{...hl}):s.createElement(on,{...yl}))))}))}))),i=Fe({"categorizer-container":!0,"static-mode":this.props.static}),o=this.props.apiOptions.isMobile?[Se.fullBleedContainer]:[];return s.createElement("div",{className:i+" "+T.css(...o)},a)}};Cn.contextType=G,Cn.defaultProps={items:[],categories:[],values:[],linterContext:re};let Qn=Cn;const Sa=16,Se=T.StyleSheet.create({mobileTable:{[Gt.smOrSmaller]:{minWidth:"auto"}},fullBleedContainer:{[Gt.mdOrSmaller]:{marginLeft:-Sa,marginRight:-Sa,overflowX:"auto"}},header:{textAlign:"center",verticalAlign:"bottom"},cell:{textAlign:"center",padding:0,color:"#ccc",verticalAlign:"middle"},emptyHeaderCell:{backgroundColor:"inherit",borderBottom:"2px solid #ccc"},radioSpan:{fontSize:30,paddingRight:3,":hover":{color:"#999"}},checkedRadioSpan:{color:"#333"},staticCheckedRadioSpan:{color:"#888"}}),Du={name:"categorizer",displayName:"Categorizer",hidden:!0,widget:Qn,transform:n=>h.pick(n,"items","categories","randomizeItems"),staticTransform:n=>h.pick(n,"items","categories","values","randomizeItems"),isLintable:!0};Qn.__docgenInfo={description:"",methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`WidgetProps<RenderProps, PerseusCategorizerRubric> & {
    values: ReadonlyArray<string>;
}`,elements:[{name:"intersection",raw:`RenderProps & {
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,elements:[{name:"signature",type:"object",raw:`{
    items: PerseusCategorizerWidgetOptions["items"];
    categories: PerseusCategorizerWidgetOptions["categories"];
    randomizeItems: PerseusCategorizerWidgetOptions["randomizeItems"];
    // Depends on whether the widget is in static mode
    values?: PerseusCategorizerWidgetOptions["values"];
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",raw:'PerseusCategorizerWidgetOptions["items"]',required:!0}},{key:"categories",value:{name:"ReadonlyArray",raw:'PerseusCategorizerWidgetOptions["categories"]',required:!0}},{key:"randomizeItems",value:{name:"boolean",raw:'PerseusCategorizerWidgetOptions["randomizeItems"]',required:!0}},{key:"values",value:{name:"ReadonlyArray",raw:'PerseusCategorizerWidgetOptions["values"]',required:!1}}]}},{name:"signature",type:"object",raw:`{
    // provided by renderer.jsx#getWidgetProps()
    widgetId: string;
    alignment: string | null | undefined;
    static: boolean | null | undefined;
    problemNum: number | null | undefined;
    apiOptions: APIOptionsWithDefaults;
    keypadElement?: any;
    /**
     * questionCompleted is used to signal that a learner has attempted
     * the exercise. This is used when widgets want to show things like
     * rationale or partial correctness.
     */
    questionCompleted?: boolean;
    onFocus: (blurPath: FocusPath) => void;
    onBlur: (blurPath: FocusPath) => void;
    findWidgets: (criterion: FilterCriterion) => ReadonlyArray<Widget>;
    reviewModeRubric?: Rubric | null | undefined;
    reviewMode: boolean;
    onChange: ChangeHandler;
    // This is slightly different from the \`trackInteraction\` function in
    // APIOptions. This provides the widget an easy way to notify the renderer
    // of an interaction. The Renderer then enriches the data provided with the
    // widget's id and type before calling APIOptions.trackInteraction.
    trackInteraction: (extraData?: TrackingExtraArgs) => void;
    isLastUsedWidget: boolean;
    // provided by widget-container.jsx#render()
    linterContext: LinterContextProps;
    containerSizeClass: SizeClass;
}`,signature:{properties:[{key:"widgetId",value:{name:"string",required:!0}},{key:"alignment",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"static",value:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}],required:!0}},{key:"problemNum",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"apiOptions",value:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`,required:!0}},{key:"keypadElement",value:{name:"any",required:!1}},{key:"questionCompleted",value:{name:"boolean",required:!1},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},{key:"onFocus",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"onBlur",value:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}},required:!0}},{key:"findWidgets",value:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}},required:!0}},{key:"reviewModeRubric",value:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"intersection",raw:`{
    // The correct answers where index relates to the items and value relates
    // to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
} & PerseusCategorizerValidationData`,elements:[{name:"signature",type:"object",raw:`{
    // The correct answers where index relates to the items and value relates
    // to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
}`,signature:{properties:[{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]}},{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}}]},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}},required:!0}},{key:"trackInteraction",value:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"Empty"},name:"extraData"}],return:{name:"void"}},required:!0}},{key:"isLastUsedWidget",value:{name:"boolean",required:!0}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}},{key:"containerSizeClass",value:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    values: ReadonlyArray<string>;
}`,signature:{properties:[{key:"values",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}}],alias:"Props"}}],returns:{type:{name:"signature",type:"object",raw:`{
    values: PerseusCategorizerRubric["values"];
}`,signature:{properties:[{key:"values",value:{name:'intersection["values"]',raw:'PerseusCategorizerRubric["values"]',required:!0}}]}}}},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    values: PerseusCategorizerRubric["values"];
}`,signature:{properties:[{key:"values",value:{name:'intersection["values"]',raw:'PerseusCategorizerRubric["values"]',required:!0}}]}}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"itemToCategoryMapping",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}}]},required:!0}}]}}}},{name:"onChange",docblock:null,modifiers:[],params:[{name:"itemNum",optional:!1,type:null},{name:"catNum",optional:!1,type:null}],returns:null}],displayName:"Categorizer",props:{items:{defaultValue:{value:"[]",computed:!1},required:!1},categories:{defaultValue:{value:"[]",computed:!1},required:!1},values:{defaultValue:{value:"[]",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};const ju=n=>!!(n&&n.toLowerCase()==="file:");let Ot;const Fu=()=>(Ot||(Ot=window.location),Ot),Wu=n=>new URL(n,Fu().origin),Bi=n=>Wu(n).href,Gu=()=>Je("cs-program"),{updateQueryString:_u}=J;function Vu(n){const{InitialRequestUrl:e}=qe(),t=`/computer-programming/program/${n}/embedded?embed=yes&author=no`;return ju(e.protocol)?`https://khanacademy.org${t}`:Bi(t)}const Kr=class Kr extends s.Component{constructor(){super(...arguments),this.handleMessageEvent=e=>{let t={};try{t=JSON.parse(e.originalEvent.data)}catch{return}if(h.isUndefined(t.testsPassed))return;const r=t.testsPassed?"correct":"incorrect";this.change({status:r,message:t.message})},this.change=(...e)=>ae.apply(this,e)}componentDidMount(){D(window).on("message",this.handleMessageEvent)}componentWillUnmount(){D(window).off("message",this.handleMessageEvent)}getUserInput(){return{status:this.props.status,message:this.props.message}}getPromptJSON(){return Gu()}render(){if(!this.props.programID)return s.createElement("div",null);let e=!1,t=Vu(this.props.programID),r;const a={height:this.props.height,width:"100%"};if(this.props.showEditor?(t+="&editor=yes",r="perseus-scratchpad-editor"):(t+=`&editor=no&width=${kl}`,r="perseus-scratchpad",this.props.programType!=="webpage"&&(e=!0)),this.props.showButtons?(t+="&buttons=yes",a.height+=67):t+="&buttons=no",this.props.settings){const o={};h.each(this.props.settings,function(l){l.name&&l.value&&(o[l.name]=l.value)}),t=_u(t,"settings",JSON.stringify(o))}const i=["allow-popups","allow-same-origin","allow-scripts","allow-top-navigation"].join(" ");return s.createElement("div",{className:T.css(Oa.widthOverride,e&&Oa.container)},s.createElement("iframe",{sandbox:i,src:t,style:a,className:r,allowFullScreen:!0}))}};Kr.defaultProps={showEditor:!1,showButtons:!1,status:"incomplete",message:null};let zt=Kr;const Oa=T.StyleSheet.create({widthOverride:{width:820},container:{margin:"auto"}}),Hu={name:"cs-program",displayName:"CS Program",widget:zt,hidden:!0},$u=n=>({type:"definition",definition:n.definition,togglePrompt:n.togglePrompt}),ut=class ut extends s.Component{constructor(){super(...arguments),this.isWidget=!0}getPromptJSON(){return $u(this.props)}render(){return s.createElement(Xs,null,({activeDefinitionId:e,setActiveDefinitionId:t})=>s.createElement(Al,{content:s.createElement(Cl,{color:"white",style:Uu.tooltipBody,closeButtonVisible:!0},s.createElement(X,{apiOptions:this.props.apiOptions,content:this.props.definition,widgets:this.props.widgets,strings:this.context.strings})),opened:e===this.props.widgetId,onClose:()=>t(null),placement:"top"},s.createElement(Sr,{onClick:()=>{this.props.trackInteraction(),t(this.props.widgetId)}},({hovered:r,focused:a,pressed:i})=>s.createElement("span",{style:{color:j.blue,borderBottom:r||a||i?`2px solid ${j.blue}`:"none"}},this.props.togglePrompt))))}};ut.contextType=G,ut.defaultProps={togglePrompt:"define me",definition:"definition goes here"};let Bt=ut;const Uu={tooltipBody:{color:j.offBlack,fontSize:20,fontWeight:500,lineHeight:"30px"}},Xu={name:"definition",displayName:"Definition",accessible:!0,widget:Bt,transform:n=>n},Jr=class Jr extends V.Component{constructor(){super(...arguments),this.isWidget=!0}render(){return V.createElement("div",{style:{paddingTop:8,paddingBottom:8}},V.createElement(ql,{text:this.context.strings.deprecatedStandin,kind:"info",layout:"full-width"}))}};Jr.contextType=G;let Kt=Jr;const Yu={name:"deprecated-standin",displayName:"Deprecated Standin",widget:Kt,hidden:!0},zu=""+new URL("caret-down-p-qg5kuR.svg",import.meta.url).href,Bu=(n,e)=>({type:"dropdown",options:{items:n.choices},userInput:{selectedIndex:e.value-1}}),dt=class dt extends s.Component{constructor(){super(...arguments),this.focus=()=>(K.findDOMNode(this).focus(),!0),this._handleChangeEvent=e=>{this._handleChange(parseInt(e.target.value))},this._handleChange=e=>{this.props.trackInteraction(),this.props.onChange({selected:e})}}getUserInput(){return{value:this.props.selected}}getPromptJSON(){return Bu(this.props,this.getUserInput())}render(){const e=[s.createElement(xa,{key:"placeholder",value:"0",disabled:!0,label:s.createElement(X,{content:this.props.placeholder,strings:this.context.strings}),labelAsText:this.props.placeholder}),...this.props.choices.map((t,r)=>s.createElement(xa,{key:String(r+1),value:String(r+1),label:s.createElement(X,{content:t,strings:this.context.strings}),labelAsText:t}))];return s.createElement(qi,null,t=>s.createElement(_,{onClick:r=>{r.stopPropagation()},onTouchStart:r=>{r.stopPropagation()}},this.props.visibleLabel&&s.createElement(Ks,{tag:"label",htmlFor:t},this.props.visibleLabel),s.createElement(Tl,{id:t,placeholder:"",className:"perseus-dropdown",onChange:r=>this._handleChange(parseInt(r)),selectedValue:String(this.props.selected),disabled:this.props.apiOptions.readOnly,"aria-label":this.props.ariaLabel||this.props.visibleLabel||this.context.strings.selectAnAnswer,role:"combobox",showOpenerLabelAsText:!1},e)))}};dt.contextType=G,dt.defaultProps={choices:[],selected:0,placeholder:"",apiOptions:Ne.defaults};let Jt=dt;function Ku(n){return{placeholder:n.placeholder,visibleLabel:n.visibleLabel,ariaLabel:n.ariaLabel,choices:n.choices.map(e=>e.content)}}const Ju={name:"dropdown",displayName:"Drop down",accessible:!0,widget:Jt,transform:Ku},Qu=""+new URL("caret-up-GYuL-R7P.svg",import.meta.url).href,Zu=n=>({type:"explanation",showPrompt:n.showPrompt,explanation:n.explanation});function ed(n){return typeof window.matchMedia!="function"?!1:window.matchMedia(n).matches}const mt=class mt extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.state={expanded:!1},this._mounted=!1,this.change=(...e)=>ae.apply(this,e),this._onClick=()=>{this.setState({expanded:!this.state.expanded}),this.props.trackInteraction()}}componentDidMount(){this._mounted=!0}componentWillUnmount(){this._mounted=!1}getPromptJSON(){return Zu(this.props)}render(){const e=this.state.expanded?this.props.hidePrompt:this.props.showPrompt,t=this.state.expanded?Qu:zu,r=this._mounted&&ed("(prefers-reduced-motion: no-preference)"),a={height:"auto",lineHeight:"inherit",marginLeft:"-2px",marginRight:"2px",paddingLeft:"2px"},i={fontSize:"18px",lineHeight:"inherit","text-align":"left",marginRight:"-6px","white-space":"normal"},o=[Qe.content,this.state.expanded?Qe.contentExpanded:Qe.contentCollapsed,r&&(this.state.expanded?Qe.transitionExpanded:Qe.transitionCollapsed)];return s.createElement(qi,null,l=>s.createElement(s.Fragment,null,s.createElement(ye,{"aria-expanded":this.state.expanded,"aria-controls":l,endIcon:t,kind:"tertiary",labelStyle:i,onClick:this._onClick,size:"small",style:a},e),s.createElement(_,{id:l,style:o,"aria-hidden":!this.state.expanded,testId:"content-container"},s.createElement(_,{style:Qe.contentWrapper},s.createElement(X,{apiOptions:this.props.apiOptions,content:this.props.explanation,widgets:this.props.widgets,linterContext:this.props.linterContext,strings:this.context.strings})))))}};mt.contextType=G,mt.defaultProps={showPrompt:"Explain",hidePrompt:"Hide explanation",explanation:`explanation goes here

more explanation`,widgets:{},linterContext:re};let Qt=mt;const Ma=23,nd=10,La=14,Qe=T.StyleSheet.create({content:{borderLeft:"0px solid #ccc",display:"inline-grid",position:"relative"},contentCollapsed:{gridTemplateColumns:"0fr",gridTemplateRows:"0fr",marginBottom:0,marginTop:0,minWidth:"0",paddingBottom:0,visibility:"hidden"},contentExpanded:{borderLeftWidth:"5px",gridTemplateColumns:"1fr",gridTemplateRows:"1fr",marginLeft:-Ma,minWidth:"100%",paddingLeft:Ma,paddingBottom:nd,visibility:"visible",marginBottom:La,marginTop:La},contentWrapper:{overflow:"hidden"},transitionCollapsed:{transition:"all 0.25s step-end, grid-template-rows 0.25s, margin-top 0.25s, margin-bottom 0.25s, padding-bottom 0.25s"},transitionExpanded:{transition:"grid-template-rows 0.5s, margin-top 0.5s, margin-bottom 0.5s, padding-bottom 0.5s"}}),td={name:"explanation",displayName:"Explanation",accessible:!0,widget:Qt,transform:h.identity,isLintable:!0},rd=(n,e,t)=>e?{...e,title:n,type:"graded-group",hint:t}:{type:"graded-group",title:n,content:"",widgets:{},hint:t},Qr=class Qr extends s.Component{render(){const{apiOptions:e,answerBarState:t,onCheckAnswer:r,onNextQuestion:a}=this.props,{keepTrying:i,tryAgain:o,check:l,correctExcited:u,nextQuestion:d}=this.context.strings,m={...Mn.answerBar,backgroundColor:t==="CORRECT"?j.offWhite:"white",justifyContent:t==="CORRECT"&&!a?"center":"space-between"},p=t==="INCORRECT"?s.createElement("span",{style:Mn.text},s.createElement("span",{style:Mn.tryAgainIcon},s.createElement(on,{...wl})),s.createElement("span",{style:{marginLeft:8}},i)):s.createElement("span",null);if(t!=="CORRECT"){const c=t==="INCORRECT"?o:l;return s.createElement("div",{style:m},p,s.createElement(ye,{disabled:e.readOnly||t!=="ACTIVE",onClick:r},c))}return s.createElement("div",{style:m},s.createElement("span",{style:Mn.text},s.createElement("span",{style:{fontSize:28,color:j.green}},s.createElement(on,{...fl,style:{marginBottom:5}})),s.createElement("span",{role:"alert","aria-label":u,style:{marginLeft:8}},u)),a&&s.createElement(ye,{onClick:a},d))}};Qr.contextType=G;let Zn=Qr;const ad=17,Mn={answerBar:{display:"flex",alignItems:"center",height:68,marginLeft:ze,marginRight:ze,marginBottom:ze,marginTop:je,paddingLeft:je,paddingRight:10,borderTop:`1px solid ${j.offBlack50}`},tryAgainIcon:{fontSize:28,color:"#63D9EA",transform:"scale(-1,1) rotate(-268deg)"},text:{display:"flex",flexDirection:"row",alignItems:"center",fontWeight:"bold",fontSize:ad}};Zn.__docgenInfo={description:"",methods:[],displayName:"GradedGroupAnswerBar",props:{answerBarState:{required:!0,tsType:{name:"union",raw:`| "HIDDEN" // The 'Check' button is disabled and there is no message.  This occurs when
// some of the widgets haven't been filled in after the has already become
// visible.
| "ACTIVE" // This happens immediately after clicking 'Check' with a wrong answer.
// The 'Check' button is disabled and the 'Try Again' message is displayed.
| "INACTIVE" // Final state.  This occurs after the user submits the correct answer.
// The widgets in this grade-group are disabled.
| "INCORRECT"
| "CORRECT"`,elements:[{name:"literal",value:'"HIDDEN"'},{name:"literal",value:'"ACTIVE"'},{name:"literal",value:'"INACTIVE"'},{name:"literal",value:'"INCORRECT"'},{name:"literal",value:'"CORRECT"'}]},description:""},apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},description:""},onCheckAnswer:{required:!0,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onNextQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""}}};const Ce={ungraded:"ungraded",correct:"correct",incorrect:"incorrect",invalid:"invalid"},id=(n,e)=>{switch(n){case"HIDDEN":return e?"ACTIVE":n;case"ACTIVE":return e?n:"INACTIVE";case"INACTIVE":return e?"ACTIVE":n;case"INCORRECT":return e?"ACTIVE":"INACTIVE";default:return n}},ct=class ct extends s.Component{constructor(){super(...arguments),this.state={status:Ce.ungraded,showHint:!1,message:"",answerBarState:"HIDDEN"},this.rendererRef=s.createRef(),this.hintRendererRef=s.createRef(),this.change=(...e)=>ae.apply(this,e),this._onInteractWithWidget=e=>{if(this.setState({status:Ce.ungraded,message:""}),this.rendererRef.current){this.change("widgets",this.props.widgets);const r=this.rendererRef.current.emptyWidgets().length===0,a=this.state.answerBarState;this.setState({answerBarState:id(a,r)})}},this._checkAnswer=()=>{var l,u;(l=this.rendererRef.current)==null||l.showRationalesForCurrentlySelectedChoices();const e=((u=this.rendererRef.current)==null?void 0:u.score())||{type:"invalid"},{INVALID_MESSAGE_PREFIX:t,DEFAULT_INVALID_MESSAGE_1:r,DEFAULT_INVALID_MESSAGE_2:a}=this.context.strings,i=e.type==="points"?e.total===e.earned?Ce.correct:Ce.incorrect:Ce.invalid,o=e.type==="points"?e.message||"":e.message?`${t} ${Js(e.message,this.context.strings)}`:`${t} ${r}${a}`;this.setState({status:i,message:o,answerBarState:i==="correct"?"CORRECT":"INCORRECT"}),this.props.trackInteraction({status:i})},this.getInputPaths=()=>{var e;return((e=this.rendererRef.current)==null?void 0:e.getInputPaths())||[]},this.setInputValue=(e,t,r)=>{var a;return(a=this.rendererRef.current)==null?void 0:a.setInputValue(e,t,r)},this.focus=()=>{var e;return!!((e=this.rendererRef.current)!=null&&e.focus())},this.focusInputPath=e=>{var t;(t=this.rendererRef.current)==null||t.focusPath(e)},this.blurInputPath=e=>{var t;(t=this.rendererRef.current)==null||t.blurPath(e)}}shouldComponentUpdate(e,t){return e!==this.props||t!==this.state}getPromptJSON(){var t,r,a;const e=((t=this.hintRendererRef.current)==null?void 0:t.getPromptJSON())||{content:((r=this.props.hint)==null?void 0:r.content)||"",widgets:{}};return rd(this.props.title,(a=this.rendererRef.current)==null?void 0:a.getPromptJSON(),e)}render(){const e=h.extend({},Ne.defaults,this.props.apiOptions,{onFocusChange:(d,m)=>{m&&this.props.onBlur(m),d&&this.props.onFocus(d)}});let t=null,r=null;this.state.status===Ce.correct?(r=s.createElement(on,{...bl,style:{color:"#526f03"}}),t=this.context.strings.correct):this.state.status===Ce.incorrect&&(r=s.createElement(on,{...vl,style:{color:"#ff5454"}}),t=this.context.strings.incorrect);const a=this.props.inGradedGroupSet?T.css(yn.gradedGroupInSet):T.css(yn.gradedGroup),i=Fe({[a]:e.isMobile,"perseus-graded-group":!0,"answer-correct":e.isMobile?!1:this.state.status===Ce.correct,"answer-incorrect":e.isMobile?!1:this.state.status===Ce.incorrect}),{answerBarState:o}=this.state,l=o==="CORRECT",u=e.readOnly||e.isMobile&&l;return s.createElement("div",{className:i},!!this.props.title&&s.createElement("div",{className:T.css(yn.title)},this.props.title),s.createElement(X,{...this.props,ref:this.rendererRef,apiOptions:{...e,readOnly:u},onInteractWithWidget:this._onInteractWithWidget,linterContext:this.props.linterContext,strings:this.context.strings}),!e.isMobile&&r&&s.createElement("div",{className:"group-icon"},r),!e.isMobile&&t&&s.createElement("div",{className:T.css(H.srOnly),role:"alert","aria-label":t},t),!e.isMobile&&s.createElement("p",{role:"status","aria-live":"polite"},this.state.message),!e.isMobile&&s.createElement(ye,{kind:"secondary",disabled:this.props.apiOptions.readOnly,onClick:this._checkAnswer},this.context.strings.check),!e.isMobile&&l&&this.props.onNextQuestion&&s.createElement(ye,{kind:"secondary",disabled:this.props.apiOptions.readOnly,onClick:this.props.onNextQuestion,style:{marginLeft:5}},this.context.strings.nextQuestion),this.props.hint&&this.props.hint.content&&(this.state.showHint?s.createElement("div",null,s.createElement("button",{tabIndex:"0",className:T.css(yn.explanationTitle),onClick:()=>this.setState({showHint:!1}),onKeyPress:d=>{d.preventDefault(),this.setState({showHint:!1})}},this.context.strings.hideExplanation),s.createElement(X,{...this.props.hint,ref:this.hintRendererRef,apiOptions:e,linterContext:this.props.linterContext,strings:this.context.strings})):s.createElement("button",{tabIndex:"0",onClick:()=>this.setState({showHint:!0}),onKeyPress:d=>{d.preventDefault(),this.setState({showHint:!0})},className:T.css(yn.showHintLink)},this.context.strings.explain)),e.isMobile&&o!=="HIDDEN"&&s.createElement(Zn,{apiOptions:e,answerBarState:o,onCheckAnswer:this._checkAnswer,onNextQuestion:this.props.onNextQuestion}))}};ct.contextType=G,ct.defaultProps={title:"",content:"",widgets:{},images:{},hint:null,hasHint:!1,linterContext:re};let sn=ct;const od=function(n,e){return h.extend({},n,e(n))},yn=T.StyleSheet.create({gradedGroupInSet:{marginLeft:0,paddingLeft:0},gradedGroup:{borderTop:`1px solid ${Xn}`,borderBottom:`1px solid ${Xn}`,backgroundColor:Ii,marginLeft:ze,marginRight:ze,paddingBottom:je,paddingLeft:je,paddingRight:je,paddingTop:10,width:"auto"},showHintLink:{backgroundColor:"unset",fontSize:14,padding:0,border:"none",marginTop:20,color:j.blue,cursor:"pointer",display:"block",clear:"both"},explanationTitle:{backgroundColor:"unset",marginTop:20,color:j.blue,marginBottom:10,cursor:"pointer",fontSize:14,padding:0,border:"none",display:"block",clear:"both"},title:{fontSize:12,color:xl,textTransform:"uppercase",marginBottom:11,letterSpacing:.8}}),sd={name:"graded-group",displayName:"Graded group (articles only)",widget:sn,traverseChildWidgets:od,hidden:!1,tracking:"all",isLintable:!0};sn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_onInteractWithWidget",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:null}],returns:null},{name:"_checkAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:null},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"intersection",raw:`RendererPromptJSON & {
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"GradedGroupPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "graded-group-set";
    options: {
        groupCount: number;
        currentGroup: GradedGroupPromptJSON;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group-set"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    groupCount: number;
    currentGroup: GradedGroupPromptJSON;
}`,signature:{properties:[{key:"groupCount",value:{name:"number",required:!0}},{key:"currentGroup",value:{name:"GradedGroupPromptJSON",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
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
| "video"`,elements:[{name:"literal",value:'"cs-program"'},{name:"literal",value:'"iframe"'},{name:"literal",value:'"interaction"'},{name:"literal",value:'"interactive-graph-unsupported"'},{name:"literal",value:'"measurer"'},{name:"literal",value:'"phet-simulation"'},{name:"literal",value:'"plotter"'},{name:"literal",value:'"python-program"'},{name:"literal",value:'"video"'}],required:!0}},{key:"message",value:{name:"string",required:!1}},{key:"isSupported",value:{name:"boolean",required:!0}}]}}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "graded-group";
    title: string;
    hint: RendererPromptJSON | string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group"',required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"hint",value:{name:"union",raw:"RendererPromptJSON | string",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"GradedGroupPromptJSON"},{name:"signature",type:"object",raw:`{
    type: "graded-group-set";
    options: {
        groupCount: number;
        currentGroup: GradedGroupPromptJSON;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"graded-group-set"',required:!0}},{key:"options",value:{name:"signature",type:"object",raw:`{
    groupCount: number;
    currentGroup: GradedGroupPromptJSON;
}`,signature:{properties:[{key:"groupCount",value:{name:"number",required:!0}},{key:"currentGroup",value:{name:"GradedGroupPromptJSON",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
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
| "video"`,elements:[{name:"literal",value:'"cs-program"'},{name:"literal",value:'"iframe"'},{name:"literal",value:'"interaction"'},{name:"literal",value:'"interactive-graph-unsupported"'},{name:"literal",value:'"measurer"'},{name:"literal",value:'"phet-simulation"'},{name:"literal",value:'"plotter"'},{name:"literal",value:'"python-program"'},{name:"literal",value:'"video"'}],required:!0}},{key:"message",value:{name:"string",required:!1}},{key:"isSupported",value:{name:"boolean",required:!0}}]}}],required:!0}}]},required:!0}}]}},{name:"string"}],required:!0}}]}}]}}},{name:"setInputValue",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:null},{name:"newValue",optional:!1,type:null},{name:"cb",optional:!1,type:null}],returns:null},{name:"focus",docblock:null,modifiers:[],params:[],returns:null},{name:"focusInputPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:null}],returns:null},{name:"blurInputPath",docblock:null,modifiers:[],params:[{name:"path",optional:!1,type:null}],returns:null}],displayName:"GradedGroup",props:{title:{defaultValue:{value:'""',computed:!1},required:!1},content:{defaultValue:{value:'""',computed:!1},required:!1},widgets:{defaultValue:{value:"{}",computed:!1},required:!1},images:{defaultValue:{value:"{}",computed:!1},required:!1},hint:{defaultValue:{value:"null",computed:!1},required:!1},hasHint:{defaultValue:{value:"false",computed:!1},required:!1},linterContext:{defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1},required:!1}}};const ld=(n,e)=>({type:"graded-group-set",options:{groupCount:n.gradedGroups.length,currentGroup:e}}),Zr=class Zr extends s.Component{constructor(){super(...arguments),this.handleKeyDown=(e,t)=>{(e.key==="Enter"||e.key===" ")&&this.props.onChangeCurrentGroup(t)}}render(){return s.createElement("ul",{className:Fe(T.css(he.indicatorContainer),"indicatorContainer")},this.props.gradedGroups.map(({title:e},t)=>s.createElement("li",{className:T.css(he.indicator),key:e},s.createElement(Sr,{role:"button","aria-label":this.context.strings.skipToTitle({title:e}),style:he.indicatorButton,onClick:()=>this.props.onChangeCurrentGroup(t),onKeyDown:r=>this.handleKeyDown(r,t)},({hovered:r,focused:a,pressed:i})=>s.createElement(_,{style:[he.indicatorDot,(r||a||i)&&he.indicatorDotFocused]},t===this.props.currentGroup&&s.createElement(_,{style:he.indicatorDotActive},s.createElement("span",{className:T.css(H.srOnly)},this.context.strings.current)))))))}};Zr.contextType=G;let Zt=Zr;const ea=class ea extends s.Component{constructor(){super(...arguments),this.state={currentGroup:0},this.change=(...e)=>ae.apply(this,e),this.getInputPaths=()=>this._childGroup.getInputPaths(),this.setInputValue=(e,t,r)=>this._childGroup.setInputValue(e,t,r),this.focus=()=>this._childGroup.focus(),this.focusInputPath=e=>{this._childGroup.focusInputPath(e)},this.blurInputPath=e=>{this._childGroup.blurInputPath(e)},this.handleNextQuestion=()=>{const{currentGroup:e}=this.state,t=this.props.gradedGroups.length;e<t-1&&this.setState({currentGroup:e+1})}}shouldComponentUpdate(e,t){return e!==this.props||t!==this.state}getPromptJSON(){const e=this._childGroup.getPromptJSON();return ld(this.props,e)}render(){const{JIPT:e}=qe();if(e.useJIPT&&this.props.gradedGroups.length>1)return s.createElement("div",{className:T.css(he.container)},this.props.gradedGroups.map((i,o)=>s.createElement(sn,{key:o,...this.props,...i,inGradedGroupSet:!1,linterContext:this.props.linterContext})));const t=this.props.gradedGroups[this.state.currentGroup];if(!t)return s.createElement("span",null,"No current group...");const r=this.props.gradedGroups.length,a=this.state.currentGroup<r-1?this.handleNextQuestion:null;return s.createElement("div",{className:T.css(he.container)},s.createElement("div",{className:T.css(he.top)},s.createElement("div",{className:T.css(he.title)},t.title),s.createElement("div",{className:T.css(he.spacer)}),s.createElement(Zt,{currentGroup:this.state.currentGroup,gradedGroups:this.props.gradedGroups,onChangeCurrentGroup:i=>this.setState({currentGroup:i})})),s.createElement(sn,{key:this.state.currentGroup,ref:i=>this._childGroup=i,...this.props,...t,inGradedGroupSet:!0,title:null,onNextQuestion:a,linterContext:this.props.linterContext}))}};ea.defaultProps={gradedGroups:[],linterContext:re};let er=ea;const ud=function(n,e){return{groups:n.gradedGroups.map(e)}},dd={name:"graded-group-set",displayName:"Graded group set (articles only)",widget:er,traverseChildWidgets:ud,hidden:!1,tracking:"all",isLintable:!0},he=T.StyleSheet.create({top:{display:"flex",flexDirection:"row"},spacer:{flex:1},title:{fontSize:12,color:j.offBlack64,textTransform:"uppercase",marginBottom:11,letterSpacing:.8},indicatorContainer:{display:"flex",flexDirection:"row",listStyle:"none",margin:"unset",paddingInlineStart:"unset",flexWrap:"wrap"},indicator:{width:24,height:24},indicatorButton:{width:"100%",height:"100%",display:"flex",flexWrap:"wrap",placeContent:"center",cursor:"pointer",":focus":{outline:"none"}},indicatorDot:{boxSizing:"content-box",width:10,height:10,borderRadius:"100%",borderWidth:2,borderColor:j.blue,borderStyle:"solid"},indicatorDotFocused:{borderWidth:5,borderStyle:"double"},indicatorDotActive:{backgroundColor:j.blue,width:"100%",height:"100%"},container:{borderTop:`1px solid ${Xn}`,borderBottom:`1px solid ${Xn}`,backgroundColor:Ii,marginLeft:ze,marginRight:ze,paddingBottom:je,paddingLeft:je,paddingRight:je,paddingTop:10,width:"auto"}}),md=(n,e)=>{const{type:t,coords:r}=e,a={type:t,coords:r};return(e.type==="logarithm"||e.type==="exponential")&&(a.asymptote=e.asymptote),{type:"grapher",options:{availableTypes:n.availableTypes,range:n.graph.range,labels:n.graph.labels,tickStep:n.graph.step,gridStep:n.graph.gridStep,snapStep:n.graph.snapStep,backgroundImageUrl:n.graph.backgroundImage.url},userInput:a}},cd={PLOT:Z.Plot,PARABOLA:Z.Parabola,SINUSOID:Z.Sinusoid},pd={url:null},Dy=n=>{const e=n.plot;return e.type&&e.coords&&Pt(e.type).getEquationString(e.coords,e.asymptote)||""},gd=(n,e,t,r)=>{const a=function(i,o){return Math.floor((i[1]-i[0])/o)};return n.map(i=>{const o=i.map((l,u)=>{const d=e[u],m=t[u],p=a(d,m),c=Math.round(l*p);return d[0]+m*c});return tl(o,r)})},Ki=(n,e,t,r)=>n&&gd(n,e,t,r),Fr=(n,e)=>{const t=Pt(n),r="defaultAsymptote"in t?t.defaultAsymptote:null,a=[1,1],i=J.snapStepFromGridStep(a);return{type:n,asymptote:Ki(r,e.range,e.step,i),coords:null}},hd=h.first,Da=(n,e)=>{const t=n.gridStep||J.getGridStep(n.range,n.step,e),r=n.snapStep||J.snapStepFromGridStep(t);return{gridStep:t,snapStep:r}},Ji={labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],backgroundImage:pd,markings:"graph",rulerLabel:"",rulerTicks:10,valid:!0,showTooltips:!1},ja=Fr("linear",Ji),yd={graph:Ji,plot:ja,availableTypes:[ja.type]},wd=n=>{const e=n.charAt(0).toUpperCase()+n.substring(1),t=qe().staticUrl;return{value:n,title:e,content:s.createElement("img",{src:t(Pt(n).url),alt:e})}},Fa=Z.MovablePoint,fd=Z.MovableLine;function bd(n,e,t){const r=(a,i,o)=>(i[0]-a[0])*(o[1]-a[1])-(o[0]-a[0])*(i[1]-a[1]);return r(t[0],t[1],e)>0!=r(t[0],t[1],n)>0}const vd={padding:"5px 5px"},na=class na extends s.Component{constructor(){super(...arguments),this._coords=()=>{const e=this.props,t=e.graph,r=e.model&&Ki(e.model.defaultCoords,t.range,t.step,t.snapStep);return e.coords||r||null},this._asymptote=()=>this.props.asymptote,this.change=(...e)=>ae.apply(this,e),this.renderPlot=()=>{const e=this.props.model,t=this.props.graph.range[0],r={stroke:this.props.isMobile?M.BLUE_C:M.DYNAMIC,...this.props.isMobile?{"stroke-width":3}:{}},a=e.getCoefficients(this._coords(),this._asymptote());if(!a)return;const i=e.getPropsForCoeffs(a,t),o=cd[e.movable];return s.createElement(o,{...i,key:this.props.model.url,range:t,style:r})},this.renderAsymptote=()=>{const e=this.props.model,t=this.props.graph,r=this._asymptote(),a={strokeDasharray:"- "};return r&&s.createElement(fd,{onMove:(i,o)=>{const l=fa(i,o),u=h.map(this._asymptote(),d=>Tn(d,l));this.props.onChange({asymptote:u})},constraints:[Me.MovableLine.constraints.bound(),Me.MovableLine.constraints.snap(),(i,o)=>{const l=fa(i,o),u=h.map(this._asymptote(),d=>Tn(d,l));return e.extraAsymptoteConstraint?e.extraAsymptoteConstraint(i,o,this._coords(),u,t):!0}],normalStyle:a,highlightStyle:a},h.map(r,(i,o)=>s.createElement(Fa,{key:`asymptoteCoord-${o}`,coord:i,static:!0,draw:null,extendLine:!0,showHairlines:this.props.showHairlines,hideHairlines:this.props.hideHairlines,showTooltips:this.props.showTooltips,isMobile:this.props.isMobile})))}}render(){const e=(o,l)=>s.createElement(Fa,{key:l,coord:o,static:this.props.static,constraints:[Me.MovablePoint.constraints.bound(),Me.MovablePoint.constraints.snap(),u=>{const d=h.all(this._coords(),(m,p)=>l===p||!m||!rl(u[0],m[0]));if(!d)return!1;if(this.props.model&&this.props.model.extraCoordConstraint){const m=this.props.model.extraCoordConstraint,p=h.clone(this._coords()),c=h.clone(p[l]);return p[l]=u,m(u,c,p,this._asymptote(),this.props.graph)}return d}],onMove:(u,d)=>{let m;const p=this._asymptote();p&&this.props.model.allowReflectOverAsymptote&&bd(u,d,p)?m=h.map(this._coords(),c=>al(c,p)):m=h.clone(this._coords()),m[l]=u,this.props.onChange({coords:m})},showHairlines:this.props.showHairlines,hideHairlines:this.props.hideHairlines,showTooltips:this.props.showTooltips,isMobile:this.props.isMobile}),t=h.map(this._coords(),e),r=this.props.graph.box,a=this.props.graph.backgroundImage;let i=null;if(a.url){const o=r[0]/Ni.defaultBoxSize;i=s.createElement(En,{src:a.url,width:a.width,height:a.height,scale:o})}return s.createElement("div",{className:"perseus-widget perseus-widget-grapher",style:{width:r[0],height:r[1],boxSizing:"initial"}},s.createElement("div",{className:"graphie-container blank-background",style:{width:r[0],height:r[1]}},i,s.createElement(Z,{...this.props.graph,setDrawingAreaAvailable:this.props.setDrawingAreaAvailable},this.props.model&&this.renderPlot(),this.props.model&&this.renderAsymptote(),this.props.model&&t)))}};na.defaultProps={graph:{range:[[-10,10],[-10,10]],step:[1,1]},coords:null,asymptote:null,isMobile:!1};let nr=na;const pt=class pt extends s.Component{constructor(){super(...arguments),this.handlePlotChanges=e=>{const t=h.extend({},this.props.plot,e);this.props.onChange({plot:t}),this.props.trackInteraction()},this.handleActiveTypeChange=e=>{const t=this.props.graph,r=h.extend({},this.props.plot,Fr(e,t));this.props.onChange({plot:r})},this._setupGraphie=(e,t)=>{const r=this.props.apiOptions.isMobile;if(t.markings==="graph"?(e.graphInit({range:t.range,scale:h.pluck(t.gridConfig,"scale"),axisArrows:"<->",labelFormat:function(a){return"\\small{"+a+"}"},gridStep:t.gridStep,snapStep:t.snapStep,tickStep:r?this._calculateMobileTickStep(t.gridStep,t.step,t.range):h.pluck(t.gridConfig,"tickStep"),labelStep:1,unityLabels:h.pluck(t.gridConfig,"unityLabel"),isMobile:r}),e.label([0,t.range[1][1]],t.labels[1],r?"below right":"above"),e.label([t.range[0][1],0],t.labels[0],r?"above left":"right")):t.markings==="grid"?e.graphInit({range:t.range,scale:h.pluck(t.gridConfig,"scale"),gridStep:t.gridStep,axes:!1,ticks:!1,labels:!1,isMobile:r}):t.markings==="none"&&e.init({range:t.range,scale:h.pluck(t.gridConfig,"scale")}),this.props.apiOptions.isMobile){const a={normalStyle:{strokeWidth:1}};this.horizHairline=new Wt(e,[0,0],[0,0],a),this.horizHairline.attr({stroke:M.INTERACTIVE}),this.horizHairline.hide(),this.vertHairline=new Wt(e,[0,0],[0,0],a),this.vertHairline.attr({stroke:M.INTERACTIVE}),this.vertHairline.hide()}},this.showHairlines=e=>{this.props.apiOptions.isMobile&&this.props.markings!=="none"&&(this.horizHairline.moveTo([this.props.graph.range[0][0],e[1]],[this.props.graph.range[0][1],e[1]]),this.horizHairline.show(),this.vertHairline.moveTo([e[0],this.props.graph.range[1][0]],[e[0],this.props.graph.range[1][1]]),this.vertHairline.show())},this.hideHairlines=()=>{this.props.apiOptions.isMobile&&(this.horizHairline.hide(),this.vertHairline.hide())}}static getUserInputFromProps(e){return e.plot}_getGridConfig(e){return e.step.map((t,r)=>J.gridDimensionConfig(t,e.range[r],e.box[r],e.gridStep[r]))}_calculateMobileTickStep(e,t,r){const a=J.constrainedTickStepsFromTickSteps(t,r);return a[0]=a[0]/e[0],a[1]=a[1]/e[1],a}getUserInput(){return pt.getUserInputFromProps(this.props)}getPromptJSON(){return md(this.props,this.getUserInput())}render(){const e=this.props.plot.type,t=this.props.plot.coords,r=this.props.plot.asymptote,a=s.createElement("div",{style:vd},s.createElement(Il,{value:e,allowEmpty:!0,buttons:h.map(this.props.availableTypes,wd),onChange:this.handleActiveTypeChange})),i=xi(this.props.containerSizeClass),o={...this.props.graph,...Da(this.props.graph,i[0]),gridConfig:this._getGridConfig({...this.props.graph,box:i,...Da(this.props.graph,i[0])})},l={graph:{box:i,range:o.range,step:o.step,snapStep:o.snapStep,backgroundImage:o.backgroundImage,options:o,setup:this._setupGraphie},onChange:this.handlePlotChanges,model:e&&Pt(e),coords:t,asymptote:r,static:this.props.static,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable,isMobile:this.props.apiOptions.isMobile,showTooltips:this.props.graph.showTooltips,showHairlines:this.showHairlines,hideHairlines:this.hideHairlines};return s.createElement("div",null,s.createElement(nr,{...l}),this.props.availableTypes.length>1&&a)}};pt.defaultProps=yd;let tr=pt;const Qi=n=>{const e={availableTypes:n.availableTypes,graph:n.graph};if(e.availableTypes.length===1){const t=e.graph,r=hd(e.availableTypes);e.plot=Fr(r,t)}return e},kd=n=>({...Qi(n),availableTypes:[n.correct.type],plot:n.correct}),xd={name:"grapher",displayName:"Grapher",hidden:!0,widget:tr,transform:Qi,staticTransform:kd},qd=n=>n?{...n,type:"group"}:{type:"group",content:"",widgets:{}},gt=class gt extends s.Component{constructor(){super(...arguments),this.change=(...e)=>ae.apply(this,e),this.getSerializedState=()=>{var e;return(e=this.rendererRef)==null?void 0:e.getSerializedState()},this.restoreSerializedState=(e,t)=>{var r;return(r=this.rendererRef)==null||r.restoreSerializedState(e,t),null},this.setInputValue=(e,t,r)=>{var a;return(a=this.rendererRef)==null?void 0:a.setInputValue(e,t,r)},this.focusInputPath=e=>{var t;(t=this.rendererRef)==null||t.focusPath(e)},this.blurInputPath=e=>{var t;(t=this.rendererRef)==null||t.blurPath(e)},this.showRationalesForCurrentlySelectedChoices=()=>{var e;(e=this.rendererRef)==null||e.showRationalesForCurrentlySelectedChoices()}}componentDidMount(){this.forceUpdate()}getUserInputMap(){var e;return(e=this.rendererRef)==null?void 0:e.getUserInputMap()}getUserInput(){var e;return(e=this.rendererRef)==null?void 0:e.getUserInput()}getPromptJSON(){var e;return qd((e=this.rendererRef)==null?void 0:e.getPromptJSON())}getInputPaths(){var e;return((e=this.rendererRef)==null?void 0:e.getInputPaths())??[]}focus(){var e;return((e=this.rendererRef)==null?void 0:e.focus())??!1}render(){var d;const e={...Ne.defaults,...this.props.apiOptions,onFocusChange:(m,p)=>{p&&this.props.onBlur(p),m&&this.props.onFocus(m)}},r=this.props.findWidgets("group").indexOf(this),a=this.props.apiOptions.groupAnnotator(r,this.props.widgetId),i=m=>{this.rendererRef&&this.change("widgets",this.rendererRef.props.widgets)},o=(d=this.rendererRef)==null?void 0:d.score(),l=o&&o.type!=="invalid",u=o&&o.type==="invalid";return s.createElement("div",{className:Fe({"perseus-group":!0,"perseus-group-valid-answer":l,"perseus-group-invalid-answer":u})},a,s.createElement(X,{content:this.props.content,widgets:this.props.widgets,images:this.props.images,ref:m=>this.rendererRef=m,apiOptions:e,findExternalWidgets:this.props.findWidgets,reviewMode:this.props.reviewMode,onInteractWithWidget:i,linterContext:this.props.linterContext,strings:this.context.strings}),this.props.icon&&s.createElement("div",{className:"group-icon"},this.props.icon))}};gt.contextType=G,gt.defaultProps={content:"",widgets:{},images:{},linterContext:re};let rr=gt;const Pd=function(n,e){return{...n,...e(n)}},Ad={name:"group",displayName:"Group (SAT only)",widget:rr,traverseChildWidgets:Pd,hidden:!0,isLintable:!0},Cd=()=>Je("iframe"),{updateQueryString:Ln}=J,ta=class ta extends s.Component{constructor(){super(...arguments),this.handleMessageEvent=e=>{let t={};try{t=JSON.parse(e.originalEvent.data)}catch{return}if(h.isUndefined(t.testsPassed))return;const r=t.testsPassed?"correct":"incorrect";this.change({status:r,message:t.message})},this.change=(...e)=>ae.apply(this,e)}componentDidMount(){D(window).on("message",this.handleMessageEvent)}componentWillUnmount(){D(window).off("message",this.handleMessageEvent)}getUserInput(){return{status:this.props.status,message:this.props.message}}getPromptJSON(){return Cd()}render(){const e={width:String(this.props.width),height:String(this.props.height)},{InitialRequestUrl:t}=qe();Object.entries(e).forEach(([i,o])=>{!o.endsWith("%")&&!o.endsWith("px")&&(e[i]=o+"px")});let r=this.props.url;if(r&&r.length&&r.indexOf("http")!==0&&(r="https://www.khanacademy.org/computer-programming/program/"+r+"/embedded?buttons=no&embed=yes&editor=no&author=no",r=Ln(r,"width",this.props.width),r=Ln(r,"height",this.props.height),r=Ln(r,"origin",t.origin)),this.props.settings){const i={};h.each(this.props.settings,function(o){o.name&&o.value&&(i[o.name]=o.value)}),r=Ln(r,"settings",JSON.stringify(i))}let a="allow-same-origin allow-scripts";return a+=" allow-top-navigation",s.createElement("iframe",{sandbox:a,style:e,src:r,allowFullScreen:this.props.allowFullScreen})}};ta.defaultProps={status:"incomplete",message:null,allowFullScreen:!1,allowTopNavigation:!1};let ar=ta;const Td={name:"iframe",displayName:"Iframe (deprecated)",widget:ar,hidden:!0},Rd=n=>({type:"image",options:{altText:n.alt,title:n.title,caption:n.caption,imageUrl:n.backgroundImage.url}}),Wa=400,Ga=[0,10],Id={url:null,width:0,height:0},ht=class ht extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.change=(...e)=>ae.apply(this,e)}getPromptJSON(){return Rd(this.props)}render(){let e;const t=this.props.caption===this.props.alt?"":this.props.alt,{apiOptions:r}=this.props,a=this.props.backgroundImage;if(a.url){const l=a.url;e=s.createElement(Or.Consumer,null,({setAssetStatus:u})=>s.createElement(En,{src:l,alt:t,width:a.width,height:a.height,preloader:r.imagePreloader,extraGraphie:{box:this.props.box,range:this.props.range,labels:this.props.labels},trackInteraction:this.props.trackInteraction,zoomToFullSizeOnMobile:r.isMobile,constrainHeight:r.isMobile,allowFullBleed:r.isMobile,setAssetStatus:u}))}if(r.isMobile){let l;if(this.props.title||this.props.caption){let u=this.props.title;u&&(this.props.caption&&!/[.?!"']\s*$/.test(u)&&(u+="."),u=`**${u}** `);const d=Fe({"perseus-image-caption":!0,"has-title":!!u}),m=this.props.alignment,c=m==="block"||m==="full-width"?null:"0 !important";l=s.createElement("figcaption",{className:d,style:{maxWidth:a.width}},s.createElement("div",{style:{minWidth:c}},s.createElement(X,{content:u+this.props.caption,apiOptions:r,linterContext:this.props.linterContext,strings:this.context.strings})))}return s.createElement("figure",{className:"perseus-image-widget",style:{maxWidth:a.width}},e,l)}let i,o;return this.props.title&&(i=s.createElement("div",{className:"perseus-image-title"},s.createElement(X,{content:this.props.title,apiOptions:r,linterContext:this.props.linterContext,strings:this.context.strings}))),this.props.caption&&(o=s.createElement("figcaption",{className:"perseus-image-caption",style:{maxWidth:a.width}},s.createElement(X,{content:this.props.caption,apiOptions:r,linterContext:this.props.linterContext,strings:this.context.strings}))),s.createElement("figure",{className:"perseus-image-widget",style:{maxWidth:a.width}},i,e,o)}};ht.contextType=G,ht.defaultProps={alignment:"block",title:"",range:[Ga,Ga],box:[Wa,Wa],backgroundImage:Id,labels:[],alt:"",caption:"",linterContext:re};let ir=ht;const Nd={name:"image",accessible:n=>{const e=n.backgroundImage;return!(e&&e.url&&!n.alt)},displayName:"Image",widget:ir,isLintable:!0},Ed=()=>Je("interaction"),Mt=Z.Label,Sd=Z.Line,wn=Z.MovablePoint,Od=Z.MovableLine,Md=Z.Plot,Ld=Z.PlotParametric,Dd=Z.Point,jd=Z.Rect,{unescapeMathMode:Fd}=J,Zi=(n,e)=>{e=e||{};let t=n+"||"+e.decimal_separator+"||";const r=e.functions,a=r?r.length:0;for(let i=0;i<a;i++)t+=r[i]+"|";return t},_a=Object.create(null),Re=(n,e)=>{const t=Zi(n,e);let r=_a[t];return r||(r=qt(n,e),_a[t]=r,r)},Va=Object.create(null),Ha=(n,e)=>{const t=Zi(n,e);let r=Va[t];if(r)return r;const a=qt(n,e).expr;return r=a?a.compile():function(){return 0},Va[t]=r,r},ra=class ra extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.state={variables:$a(this.props.elements),functions:Ua(this.props.elements)},this._setupGraphie=(e,t)=>{e.graphInit(h.extend({},t,{grid:h.contains(["graph","grid"],this.props.graph.markings),axes:h.contains(["graph"],this.props.graph.markings),ticks:h.contains(["graph"],this.props.graph.markings),labels:h.contains(["graph"],this.props.graph.markings),labelFormat:function(r){return"\\small{"+r+"}"},axisArrows:"<->",unityLabels:!1}))},this._updatePointLocation=(e,t)=>{const r=h.clone(this.state.variables);r["x_"+e]=t[0],r["y_"+e]=t[1],this.setState({variables:r}),this.props.trackInteraction()},this._updateLineLocation=(e,t)=>{const r=this._eval("("+e.endX+")-("+e.startX+")"),a=this._eval("("+e.endY+")-("+e.startY+")"),i=Tn(t,[r,a]),o=h.clone(this.state.variables);o["x_"+e.startSubscript]=t[0],o["y_"+e.startSubscript]=t[1],o["x_"+e.endSubscript]=i[0],o["y_"+e.endSubscript]=i[1],this.setState({variables:o}),this.props.trackInteraction()},this._eval=(e,t)=>{const r=Ha(e,{functions:this.state.functions}),a=h.extend({},this.state.variables,t);return h.each(h.keys(a),i=>{if(h.isString(a[i])){const o=Ha(a[i],{functions:this.state.functions});a[i]=function(l){return o(h.extend({},a,{x:l}))}}}),r(a)||0},this._extractVars=e=>{if(e==null)return[];let t=[];return h.each(e.args(),function(r){r&&r.constructor.name==="Expr"&&(t=t.concat(this._extractVars(r)))},this),e.name()==="Var"&&t.push(e.prettyPrint()),t},this.change=(...e)=>ae.apply(this,e)}UNSAFE_componentWillReceiveProps(e){h.isEqual(this.props.elements,e.elements)||this.setState({variables:$a(e.elements),functions:Ua(e.elements)})}getPromptJSON(){return Ed()}render(){const e=this.props.graph.range;let t=this.props.graph.labels;return this.props.graph.markings==="graph"&&(t=this.props.graph.labels.map(r=>r.startsWith("$")&&r.endsWith("$")?r.slice(1,-1):r)),s.createElement(Z,{box:this.props.graph.box,range:this.props.graph.range,options:this.props.graph,setup:this._setupGraphie,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable},this.props.graph.markings==="graph"&&s.createElement(Mt,{coord:[0,e[1][1]],text:t[1],direction:"above"}),this.props.graph.markings==="graph"&&s.createElement(Mt,{coord:[e[0][1],0],text:t[0],direction:"right"}),h.map(this.props.elements,function(r,a){if(r.type==="point")return s.createElement(Dd,{key:r.key,coord:[this._eval(r.options.coordX),this._eval(r.options.coordY)],color:r.options.color});if(r.type==="line"){const i=[this._eval(r.options.startX),this._eval(r.options.startY)],o=[this._eval(r.options.endX),this._eval(r.options.endY)];return s.createElement(Sd,{key:r.key,start:i,end:o,style:{stroke:r.options.color,strokeWidth:r.options.strokeWidth,strokeDasharray:r.options.strokeDasharray,arrows:r.options.arrows}})}if(r.type==="movable-point"){const i=[o=>{const l=Math.max(this._eval(r.options.constraintXMin),Math.min(this._eval(r.options.constraintXMax),o[0])),u=Math.max(this._eval(r.options.constraintYMin),Math.min(this._eval(r.options.constraintYMax),o[1]));return[l,u]}];return r.options.constraint==="snap"?i.push(wn.constraints.snap(r.options.snap)):r.options.constraint==="x"?i.push(o=>[this._eval(r.options.constraintFn,{y:o[1]}),o[1]]):r.options.constraint==="y"&&i.push(o=>[o[0],this._eval(r.options.constraintFn,{x:o[0]})]),s.createElement(wn,{key:r.key,coord:[this.state.variables["x_"+r.options.varSubscript],this.state.variables["y_"+r.options.varSubscript]],constraints:i,foo_x:r.options.constraint,foo_y:r.options.constraintFn,foo_z:r.options.snap,onMove:h.partial(this._updatePointLocation,r.options.varSubscript)})}if(r.type==="movable-line"){const i=[u=>{const d=Math.max(this._eval(r.options.constraintXMin),Math.min(this._eval(r.options.constraintXMax),u[0])),m=Math.max(this._eval(r.options.constraintYMin),Math.min(this._eval(r.options.constraintYMax),u[1]));return[d,m]}];r.options.constraint==="snap"?i.push(wn.constraints.snap(r.options.snap)):r.options.constraint==="x"?i.push(u=>[this._eval(r.options.constraintFn,{y:u[1]}),u[1]]):r.options.constraint==="y"&&i.push(u=>[u[0],this._eval(r.options.constraintFn,{x:u[0]})]);const o=[this.state.variables["x_"+r.options.startSubscript],this.state.variables["y_"+r.options.startSubscript]],l=[this.state.variables["x_"+r.options.endSubscript],this.state.variables["y_"+r.options.endSubscript]];return s.createElement(Od,{key:r.key,constraints:i,onMove:h.bind(this._updateLineLocation,this,r.options),foo_x:r.options.constraint,foo_y:r.options.constraintFn,foo_z:r.options.snap},s.createElement(wn,{coord:o,static:!0,normalStyle:{stroke:"none",fill:"none"}}),s.createElement(wn,{coord:l,static:!0,normalStyle:{stroke:"none",fill:"none"}}))}if(r.type==="function"){const i=d=>this._eval(r.options.value,{x:d}),o=h.without(this._extractVars(Re(r.options.value).expr),"x"),l=h.object(o,h.map(o,d=>this.state.variables[d])),u=[this._eval(r.options.rangeMin,this.state.variables),this._eval(r.options.rangeMax,this.state.variables)];return s.createElement(Md,{key:r.key,fn:i,foo_fn:r.options.value,foo_varvalues:l,range:u,style:{stroke:r.options.color,strokeWidth:r.options.strokeWidth,strokeDasharray:r.options.strokeDasharray,plotPoints:100}})}if(r.type==="parametric"){const i=d=>[this._eval(r.options.x,{t:d}),this._eval(r.options.y,{t:d})],o=h.without(this._extractVars(Re(r.options.x).expr).concat(this._extractVars(Re(r.options.y).expr)),"t"),l=h.object(o,h.map(o,d=>this.state.variables[d])),u=[this._eval(r.options.rangeMin,this.state.variables),this._eval(r.options.rangeMax,this.state.variables)];return s.createElement(Ld,{key:r.key,fn:i,foo_fnx:r.options.x,foo_fny:r.options.y,foo_varvalues:l,range:u,style:{stroke:r.options.color,strokeWidth:r.options.strokeWidth,strokeDasharray:r.options.strokeDasharray,plotPoints:100}})}if(r.type==="label"){const i=[this._eval(r.options.coordX),this._eval(r.options.coordY)];return s.createElement(Mt,{key:a+1,coord:i,text:Fd(r.options.label),style:{color:r.options.color}})}if(r.type==="rectangle")return s.createElement(jd,{key:a+1,x:this._eval(r.options.coordX),y:this._eval(r.options.coordY),width:h.max([this._eval(r.options.width),0]),height:h.max([this._eval(r.options.height),0]),style:{stroke:"none",fill:r.options.color}})},this))}};ra.defaultProps={graph:{box:[400,400],labels:["x","y"],range:[[-10,10],[-10,10]],tickStep:[1,1],gridStep:[1,1],markings:"graph"},elements:[]};let or=ra;const $a=n=>{const e={};return h.each(h.where(n,{type:"movable-point"}),t=>{const r=t.options.varSubscript,a=Re(t.options.startX||"0").expr,i=Re(t.options.startY||"0").expr;let o=0,l=0;a&&(o=a.eval({})||0),i&&(l=i.eval({})||0),e["x_"+r]=o,e["y_"+r]=l}),h.each(h.where(n,{type:"movable-line"}),t=>{const r=t.options.startSubscript,a=t.options.endSubscript,i=Re(t.options.startX||"0").expr,o=Re(t.options.startY||"0").expr,l=Re(t.options.endX||"0").expr,u=Re(t.options.endY||"0").expr;let d=0,m=0,p=0,c=0;i&&(d=i.eval({})||0),o&&(m=o.eval({})||0),l&&(p=l.eval({})||0),u&&(c=u.eval({})||0),e["x_"+r]=d,e["y_"+r]=m,e["x_"+a]=p,e["y_"+a]=c}),h.each(h.where(n,{type:"function"}),t=>{e[t.options.funcName]=t.options.value}),e},Ua=n=>h.map(h.where(n,{type:"function"}),e=>e.options.funcName),Wd={name:"interaction",displayName:"Interaction",widget:or,transform:h.identity,hidden:!0},Gd=(n,e)=>{var t;return{type:"interactive-graph",options:{graph:_d(n),backgroundImageUrl:(t=n.backgroundImage)==null?void 0:t.url,range:n.range,labels:n.labels},userInput:Vd(e)}},_d=n=>{var t,r;const e=n.graph.type;switch(e){case"angle":return{type:n.graph.type,angleOffsetDegrees:n.graph.angleOffsetDeg,startCoords:n.graph.startCoords};case"circle":return{type:n.graph.type,startParams:{center:(t=n.graph.startCoords)==null?void 0:t.center,radius:(r=n.graph.startCoords)==null?void 0:r.radius}};case"linear":return{type:n.graph.type,startCoords:n.graph.startCoords};case"linear-system":return{type:n.graph.type,startCoords:n.graph.startCoords};case"point":return{type:n.graph.type,numPoints:n.graph.numPoints,startCoords:n.graph.startCoords};case"polygon":return{type:n.graph.type,match:n.graph.match,numSides:n.graph.numSides,startCoords:n.graph.startCoords};case"quadratic":return{type:n.graph.type,startCoords:n.graph.startCoords};case"ray":return{type:n.graph.type,startCoords:n.graph.startCoords};case"segment":return{type:n.graph.type,numSegments:n.graph.numSegments,startCoords:n.graph.startCoords};case"sinusoid":return{type:n.graph.type,startCoords:n.graph.startCoords};case"none":return{};default:throw new fe(e)}},Vd=n=>{const e=n.type;switch(e){case"angle":return{coords:n.coords,angleOffsetDegrees:n.angleOffsetDeg};case"circle":return{center:n.center,radius:n.radius};case"linear":return{coords:n.coords};case"linear-system":return{coords:n.coords};case"point":return{coords:n.coords};case"polygon":return{coords:n.coords};case"quadratic":return{coords:n.coords};case"ray":return{coords:n.coords};case"segment":return{coords:n.coords};case"sinusoid":return{coords:n.coords};case"none":return{};default:throw new fe(e)}};function sr(){return new Hd}class Hd{constructor(){this.path=[],this.scaleFactor=1}build(){return this.path.map(Ud(this.scaleFactor)).map($d).join("")}move(e,t){return this.path.push({action:"M",args:[e,t]}),this}line(e,t){return this.path.push({action:"L",args:[e,t]}),this}circularArc(e,t,r,{sweep:a=!1,largeArc:i=!1}={}){return this.path.push({action:"A",args:[e,e,0,i?1:0,a?1:0,t,r]}),this}curve(e,t,r,a,i,o){return this.path.push({action:"C",args:[e,t,r,a,i,o]}),this}scale(e){return this.scaleFactor*=e,this}}function $d(n){return`${n.action}${n.args.join(" ")}`}function Ud(n){return e=>{switch(e.action){case"A":return{...e,args:[e.args[0]*n,e.args[1]*n,e.args[2],e.args[3],e.args[4],e.args[5]*n,e.args[6]*n]};default:return{...e,args:e.args.map(t=>t*n)}}}}function ln(n,e,t){return n<e?e:n>t?t:n}function se(n,e){const[t,r]=e,[a,i]=n;return[Math.round(t/a)*a,Math.round(r/i)*i]}const x=0,A=1,te=0,le=1;function un([n,e]){return e-n}function Xa(n,e){if(n*2>un(e)){const t=Xd(...e);return[t,t]}return[e[te]+n,e[le]-n]}function Xd(n,e){return(n+e)/2}function eo(n,e){return[ln(e[x],...n[x]),ln(e[A],...n[A])]}function Wr(n,e){return[Xa(n[x],e[x]),Xa(n[A],e[A])]}function no({range:n,point:e}){return e[x]>=n[x][te]&&e[x]<=n[x][le]&&e[A]>=n[A][te]&&e[A]<=n[A][le]}function Ya(n,e,t){return(e-n)*ln(t,0,1)+n}const Yd=([[n,e],[t,r]],[[a,i],[o,l]])=>{const u=(t-n)*(l-i)-(o-a)*(r-e);if(u===0)return!1;{const d=((l-i)*(o-n)+(a-o)*(l-e))/u,m=((e-r)*(o-n)+(t-n)*(l-e))/u;return 0<d&&d<1&&0<m&&m<1}};function Oe([[n,e],[t,r]],[[a,i],[o,l]]){const u=(t-n)*(l-i)-(o-a)*(r-e);if(u!==0){const d=((l-i)*(o-n)+(a-o)*(l-e))/u,m=((e-r)*(o-n)+(t-n)*(l-e))/u;if(d<=0||m>=1)return;const p=[n,e],c=b.sub([t,r],p);return b.add(p,b.scale(c,d))}}const zd={range:[[0,1],[0,1]],tickStep:[1,1],gridStep:[1,1],snapStep:[1,1],markings:"none",showTooltips:!1,graphDimensionsInPixels:[1,1],width:0,height:0,labels:[],labelLocation:"onAxis",disableKeyboardInteraction:!1,interactiveColor:"var(--mafs-blue)"},to=s.createContext(zd);function Y(){return V.useContext(to)}const ro=b.matrixBuilder;function ao(n,e,t=[0,0]){const{range:r,width:a,height:i}=e,[[o,l],[u,d]]=r,m=ro().translate(...t).scale(a/(l-o),-i/(d-u)).get();return n.map(p=>b.transform(p,m))}function Bd(n,e){const{range:t,width:r,height:a}=e,[[i,o],[l,u]]=t,d=ro().scale(r/(o-i),a/(u-l)).get();return n.map(m=>b.transform(m,d))}function kn(n,e){const[[t],[,r]]=e.range,[a,i]=[-t,-r];return ao([n],e,[a,i])[0]}const Q=(...n)=>{const e=Y();return ao(n,e)},Kd=(...n)=>{const e=Y();return Bd(n,e)};function io(n,e){const[[t,r],[a,i]]=e.range,{width:o,height:l}=e,u=r-t,d=i-a;return n.map(m=>{const p=m[x]/o*u+t,c=i-m[A]/l*d;return[p,c]})}const Jd=sr().move(-3,4).curve(-2.75,2.5,0,.25,.75,0).curve(0,-.25,-2.75,-2.5,-3,-4).scale(1.4).build();function Le(n){const[e]=Q(n.tip);return s.createElement("g",{"aria-hidden":!0,className:"interactive-graph-arrowhead",transform:`translate(${e[x]} ${e[A]}) rotate(${n.angle})`},s.createElement("g",{transform:"translate(-1.5)"},s.createElement("path",{d:Jd,fill:"none",style:{stroke:n.color??"inherit"},strokeLinejoin:"round",strokeLinecap:"round",strokeWidth:"2px"})))}Le.__docgenInfo={description:"",methods:[],displayName:"Arrowhead",props:{tip:{required:!0,tsType:{name:"vec.Vector2"},description:""},angle:{required:!0,tsType:{name:"number"},description:""},color:{required:!1,tsType:{name:"string"},description:""}}};function oo(){const{range:[[n,e],[t,r]]}=Y(),a="var(--mafs-fg)";return V.createElement(V.Fragment,null,!(t>0||r<0)&&V.createElement(V.Fragment,null,V.createElement(Le,{color:a,tip:[n,0],angle:180}),V.createElement(Le,{color:a,tip:[e,0],angle:0})),!(n>0||e<0)&&V.createElement(V.Fragment,null,V.createElement(Le,{color:a,tip:[0,t],angle:90}),V.createElement(Le,{color:a,tip:[0,r],angle:270})))}oo.__docgenInfo={description:"",methods:[],displayName:"AxisArrows"};const Gr=44,so="perseus_mafs_remove_button",Ge=(n,e,t,r)=>t.map(a=>a.map((i,o)=>{const l=n[o];if(r)return l[te]+un(l)*i;const u=e[o],d=Math.floor(un(l)/u),m=Math.round(i*d);return l[te]+u*m})),_r=(n,e)=>n.map(t=>t.map((r,a)=>(r+e[a][1])/un(e[a])));function _e({snapStep:n,range:e,point:t}){const r=Wr(n,e);return eo(r,t)}function de(n){return n.type==="point"&&n.numPoints==="unlimited"||n.type==="polygon"&&n.numSides==="unlimited"}const Qd=W.parserFor({math:{...Ys.math,order:0},text:{order:1,match:W.anyScopeRegex(/^([^$\\{}]+)/),parse:n=>({content:n[0]})},specialCharacter:{order:2,match:W.anyScopeRegex(/^(\\[\S\s]|\$|\\$|{|})/),parse:n=>({content:n[0]})}},{inline:!0});function lr(n){const e=Qd(n);let t="";for(const r of e)r.type==="math"?t+="$"+r.content+"$":r.type==="specialCharacter"?t+=Zd(r.content):t+=r.content;return`\\text{${t}}`}function Zd(n){return n.length===1?"\\"+n:n}const Te=14;function lo({i18n:n}){const{range:e,labels:t,width:r,height:a,labelLocation:i}=Y(),{strings:o}=n,l={range:e,width:r,height:a},[u,d]=em(l,i),[m,p]=t,c=i==="onAxis"?"translate(7px, -50%)":"translate(-50%, -50%)",g=i==="onAxis"?"translate(-50%, 0px)":"translate(-50%, 0px) rotate(-90deg)",{TeX:y}=qe();return V.createElement(V.Fragment,null,V.createElement("span",{"aria-label":o.xAxis,style:{position:"absolute",left:u[x],top:u[A],fontSize:Te+"px",transform:c}},V.createElement(y,null,lr(m))),V.createElement("span",{"aria-label":o.yAxis,style:{position:"absolute",left:d[x],top:d[A],fontSize:Te+"px",transform:g}},V.createElement(y,null,lr(p))))}const em=(n,e)=>{if(e==="alongEdge"){const l=n.range[A][te]>=0?[0,Te*3]:[0,Te],u=n.range[x][te]>=0?[-Te*3,-Te]:[-Te,-Te],d=[(n.range[x][te]+n.range[x][le])/2,n.range[A][te]],m=[n.range[x][te],(n.range[A][te]+n.range[A][le])/2],p=b.add(kn(d,n),l),c=b.add(kn(m,n),u);return[p,c]}const t=[n.range[x][le],0],r=[0,n.range[A][le]],a=[0,-Te*2],i=kn(t,n),o=b.add(kn(r,n),a);return[i,o]};lo.__docgenInfo={description:"",methods:[],displayName:"AxisLabels",props:{i18n:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    strings: PerseusStrings;
    locale: string;
}`,signature:{properties:[{key:"strings",value:{name:"signature",type:"object",raw:`{
    closeKeypad: string;
    openKeypad: string;
    mathInputBox: string;
    removeHighlight: string;
    addHighlight: string;
    hintPos: ({pos}: {pos: number}) => string;
    errorRendering: ({error}: {error: string}) => string;
    APPROXIMATED_PI_ERROR: string;
    EXTRA_SYMBOLS_ERROR: string;
    NEEDS_TO_BE_SIMPLFIED_ERROR: string;
    MISSING_PERCENT_ERROR: string;
    MULTIPLICATION_SIGN_ERROR: string;
    WRONG_CASE_ERROR: string;
    WRONG_LETTER_ERROR: string;
    invalidSelection: string;
    ERROR_TITLE: string;
    ERROR_MESSAGE: string;
    hints: string;
    getAnotherHint: string;
    deprecatedStandin: string;
    keepTrying: string;
    tryAgain: string;
    check: string;
    correctExcited: string;
    nextQuestion: string;
    skipToTitle: ({title}: {title: string}) => string;
    current: string;
    correct: string;
    correctSelected: string;
    correctCrossedOut: string;
    incorrect: string;
    incorrectSelected: string;
    hideExplanation: string;
    explain: string;
    INVALID_MESSAGE_PREFIX: string;
    DEFAULT_INVALID_MESSAGE_1: string;
    DEFAULT_INVALID_MESSAGE_2: string;
    integerExample: string;
    properExample: string;
    simplifiedProperExample: string;
    improperExample: string;
    simplifiedImproperExample: string;
    mixedExample: string;
    decimalExample: string;
    percentExample: string;
    piExample: string;
    yourAnswer: string;
    yourAnswerLabel: string;
    addPoints: string;
    addVertices: string;
    tapMultiple: string;
    tapSingle: string;
    clickMultiple: string;
    clickSingle: string;
    choices: string;
    answers: ({num}: {num: number}) => string;
    hideAnswersToggleLabel: string;
    moves: ({num}: {num: number}) => string;
    clickTiles: string;
    turnOffLights: string;
    fillAllCells: string;
    molecularDrawing: ({content}: {content: string}) => string;
    switchDirection: string;
    circleOpen: string;
    circleFilled: string;
    numDivisions: string;
    divisions: ({divRangeString}: {divRangeString: string}) => string;
    lineRange: ({lineRange}: {lineRange: string}) => string;
    lineNumber: ({lineNumber}: {lineNumber: string}) => string;
    symbolPassage: ({
        questionSymbol,
        questionNumber,
    }: {
        questionSymbol: string;
        questionNumber: string;
    }) => string;
    symbolQuestion: ({sentenceSymbol}: {sentenceSymbol: string}) => string;
    lineLabel: string;
    beginningPassage: string;
    beginningFootnotes: string;
    endPassage: string;
    questionMarker: ({number}: {number: string}) => string;
    circleMarker: ({number}: {number: string}) => string;
    sentenceMarker: ({number}: {number: string}) => string;
    dragHandles: string;
    tapAddPoints: string;
    false: string;
    true: string;
    no: string;
    yes: string;
    chooseCorrectNum: string;
    notNoneOfTheAbove: string;
    noneOfTheAbove: string;
    chooseNumAnswers: ({numCorrect}: {numCorrect: string}) => string;
    chooseAllAnswers: string;
    chooseOneAnswer: string;
    choiceCheckedCorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutCorrect: ({letter}: {letter: string}) => string;
    choiceCorrect: ({letter}: {letter: string}) => string;
    choiceCheckedIncorrect: ({letter}: {letter: string}) => string;
    choiceCrossedOutIncorrect: ({letter}: {letter: string}) => string;
    choiceIncorrect: ({letter}: {letter: string}) => string;
    choiceChecked: ({letter}: {letter: string}) => string;
    choiceCrossedOut: ({letter}: {letter: string}) => string;
    choice: ({letter}: {letter: string}) => string;
    crossOut: string;
    crossOutOption: string;
    crossOutChoice: ({letter}: {letter: string}) => string;
    bringBack: string;
    openMenuForChoice: ({letter}: {letter: string}) => string;
    letters: string;
    rightArrow: string;
    dontUnderstandUnits: string;
    checkSigFigs: string;
    answerNumericallyIncorrect: string;
    checkUnits: string;
    dontUnderstand: string;
    loading: string;
    videoTranscript: string;
    somethingWrong: string;
    videoWrapper: string;
    mathInputTitle: string;
    mathInputDescription: string;
    sin: string;
    cos: string;
    tan: string;
    simulationLoadFail: string;
    simulationLocaleWarning: string;
    selectAnAnswer: string;
    // The following strings are used for interactive graph SR descriptions.
    srGraphInstructions: string;
    srUnlimitedGraphInstructions: string;
    xAxis: string;
    yAxis: string;
    addPoint: string;
    removePoint: string;
    graphKeyboardPrompt: string;
    closePolygon: string;
    openPolygon: string;
    srPointAtCoordinates: ({
        num,
        x,
        y,
    }: {
        num: number;
        x: string;
        y: string;
    }) => string;
    srInteractiveElements: ({elements}: {elements: string}) => string;
    srNoInteractiveElements: string;
    srCircleGraph: string;
    srCircleShape: ({
        centerX,
        centerY,
    }: {
        centerX: string;
        centerY: string;
    }) => string;
    srCircleRadiusPointRight: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadiusPointLeft: ({
        radiusPointX,
        radiusPointY,
    }: {
        radiusPointX: string;
        radiusPointY: string;
    }) => string;
    srCircleRadius: ({radius}: {radius: number}) => string;
    srCircleOuterPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
        point4X,
        point4Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
        point4X: string;
        point4Y: string;
    }) => string;
    srLinearGraph: string;
    srLinearGraphPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearGraphSlopeIncreasing: string;
    srLinearGraphSlopeDecreasing: string;
    srLinearGraphSlopeHorizontal: string;
    srLinearGraphSlopeVertical: string;
    srLinearGraphXOnlyIntercept: ({xIntercept}: {xIntercept: string}) => string;
    srLinearGraphYOnlyIntercept: ({yIntercept}: {yIntercept: string}) => string;
    srLinearGraphBothIntercepts: ({
        xIntercept,
        yIntercept,
    }: {
        xIntercept: string;
        yIntercept: string;
    }) => string;
    srLinearGraphOriginIntercept: string;
    srLinearGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srAngleStartingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleEndingSide: ({x, y}: {x: string; y: string}) => string;
    srAngleVertexWithAngleMeasure: ({
        x,
        y,
        angleMeasure,
    }: {
        x: string;
        y: string;
        angleMeasure: string;
    }) => string;
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: ({
        angleMeasure,
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        angleMeasure: string;
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srAngleInteractiveElements: ({
        vertexX,
        vertexY,
        startingSideX,
        startingSideY,
        endingSideX,
        endingSideY,
    }: {
        vertexX: string;
        vertexY: string;
        startingSideX: string;
        startingSideY: string;
        endingSideX: string;
        endingSideY: string;
    }) => string;
    srSingleSegmentGraphAriaLabel: string;
    srMultipleSegmentGraphAriaLabel: ({
        countOfSegments,
    }: {
        countOfSegments: number;
    }) => string;
    srMultipleSegmentIndividualLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        indexOfSegment,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        indexOfSegment: number;
    }) => string;
    srSingleSegmentLabel: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srSegmentLength: ({length}: {length: string}) => string;
    srSingleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
    }) => string;
    srMultipleSegmentGraphEndpointAriaLabel: ({
        endpointNumber,
        x,
        y,
        indexOfSegment,
    }: {
        endpointNumber: number;
        x: string;
        y: string;
        indexOfSegment: number;
    }) => string;
    srSegmentGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemGraph: string;
    srLinearSystemPoints: ({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srLinearSystemPoint({
        lineNumber,
        pointSequence,
        x,
        y,
    }: {
        lineNumber: number;
        pointSequence: number;
        x: string;
        y: string;
    }): string;
    srLinearSystemGrabHandle({
        lineNumber,
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        lineNumber: number;
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }): string;
    srLinearSystemIntersection({x, y}: {x: string; y: string}): string;
    srLinearSystemParallel: string;
    srRayGraph: string;
    srRayPoints: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srRayEndpoint: ({x, y}: {x: string; y: string}) => string;
    srRayTerminalPoint: ({x, y}: {x: string; y: string}) => string;
    srRayGrabHandle: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    srQuadraticGraph: string;
    srQuadraticFaceUp: string;
    srQuadraticFaceDown: string;
    srQuadraticGraphVertexOrigin: string;
    srQuadraticGraphVertexXAxis: string;
    srQuadraticGraphVertexYAxis: string;
    srQuadraticGraphVertexQuadrant: ({quadrant}: {quadrant: number}) => string;
    srQuadraticTwoXIntercepts: ({
        intercept1,
        intercept2,
    }: {
        intercept1: string;
        intercept2: string;
    }) => string;
    srQuadraticOneXIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticYIntercept: ({intercept}: {intercept: string}) => string;
    srQuadraticPointOrigin: ({pointNumber}: {pointNumber: number}) => string;
    srQuadraticPointAxis: ({
        pointNumber,
        x,
        y,
    }: {
        pointNumber: number;
        x: string;
        y: string;
    }) => string;
    srQuadraticPointQuadrant: ({
        pointNumber,
        x,
        y,
        quadrant,
    }: {
        pointNumber: number;
        x: string;
        y: string;
        quadrant: number;
    }) => string;
    srQuadraticInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
        point3X,
        point3Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
        point3X: string;
        point3Y: string;
    }) => string;
    srPolygonGraph: string;
    srPolygonGraphCoordinatePlane: string;
    srPolygonGraphPointsNum: ({num}: {num: number}) => string;
    srPolygonGraphPointsOne: string;
    srPolygonElementsNum: ({num}: {num: number}) => string;
    srPolygonElementsOne: string;
    srPolygonPointAngleApprox: ({angle}: {angle: string}) => string;
    srPolygonPointAngle: ({angle}: {angle: number}) => string;
    srPolygonSideLength: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srPolygonSideLengthApprox: ({
        pointNum,
        length,
    }: {
        pointNum: number;
        length: string;
    }) => string;
    srUnlimitedPolygonEmpty: string;
    srSinusoidGraph: string;
    srSinusoidRootPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMaxPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidMinPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidFlatPoint: ({x, y}: {x: string; y: string}) => string;
    srSinusoidDescription: ({
        minValue,
        maxValue,
        cycleStart,
        cycleEnd,
    }: {
        minValue: string;
        maxValue: string;
        cycleStart: string;
        cycleEnd: string;
    }) => string;
    srSinusoidInteractiveElements: ({
        point1X,
        point1Y,
        point2X,
        point2Y,
    }: {
        point1X: string;
        point1Y: string;
        point2X: string;
        point2Y: string;
    }) => string;
    // The above strings are used for interactive graph SR descriptions.
}`,signature:{properties:[{key:"closeKeypad",value:{name:"string",required:!0}},{key:"openKeypad",value:{name:"string",required:!0}},{key:"mathInputBox",value:{name:"string",required:!0}},{key:"removeHighlight",value:{name:"string",required:!0}},{key:"addHighlight",value:{name:"string",required:!0}},{key:"hintPos",value:{name:"signature",type:"function",raw:"({pos}: {pos: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pos: number}",signature:{properties:[{key:"pos",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"errorRendering",value:{name:"signature",type:"function",raw:"({error}: {error: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{error: string}",signature:{properties:[{key:"error",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"APPROXIMATED_PI_ERROR",value:{name:"string",required:!0}},{key:"EXTRA_SYMBOLS_ERROR",value:{name:"string",required:!0}},{key:"NEEDS_TO_BE_SIMPLFIED_ERROR",value:{name:"string",required:!0}},{key:"MISSING_PERCENT_ERROR",value:{name:"string",required:!0}},{key:"MULTIPLICATION_SIGN_ERROR",value:{name:"string",required:!0}},{key:"WRONG_CASE_ERROR",value:{name:"string",required:!0}},{key:"WRONG_LETTER_ERROR",value:{name:"string",required:!0}},{key:"invalidSelection",value:{name:"string",required:!0}},{key:"ERROR_TITLE",value:{name:"string",required:!0}},{key:"ERROR_MESSAGE",value:{name:"string",required:!0}},{key:"hints",value:{name:"string",required:!0}},{key:"getAnotherHint",value:{name:"string",required:!0}},{key:"deprecatedStandin",value:{name:"string",required:!0}},{key:"keepTrying",value:{name:"string",required:!0}},{key:"tryAgain",value:{name:"string",required:!0}},{key:"check",value:{name:"string",required:!0}},{key:"correctExcited",value:{name:"string",required:!0}},{key:"nextQuestion",value:{name:"string",required:!0}},{key:"skipToTitle",value:{name:"signature",type:"function",raw:"({title}: {title: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{title: string}",signature:{properties:[{key:"title",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"current",value:{name:"string",required:!0}},{key:"correct",value:{name:"string",required:!0}},{key:"correctSelected",value:{name:"string",required:!0}},{key:"correctCrossedOut",value:{name:"string",required:!0}},{key:"incorrect",value:{name:"string",required:!0}},{key:"incorrectSelected",value:{name:"string",required:!0}},{key:"hideExplanation",value:{name:"string",required:!0}},{key:"explain",value:{name:"string",required:!0}},{key:"INVALID_MESSAGE_PREFIX",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_1",value:{name:"string",required:!0}},{key:"DEFAULT_INVALID_MESSAGE_2",value:{name:"string",required:!0}},{key:"integerExample",value:{name:"string",required:!0}},{key:"properExample",value:{name:"string",required:!0}},{key:"simplifiedProperExample",value:{name:"string",required:!0}},{key:"improperExample",value:{name:"string",required:!0}},{key:"simplifiedImproperExample",value:{name:"string",required:!0}},{key:"mixedExample",value:{name:"string",required:!0}},{key:"decimalExample",value:{name:"string",required:!0}},{key:"percentExample",value:{name:"string",required:!0}},{key:"piExample",value:{name:"string",required:!0}},{key:"yourAnswer",value:{name:"string",required:!0}},{key:"yourAnswerLabel",value:{name:"string",required:!0}},{key:"addPoints",value:{name:"string",required:!0}},{key:"addVertices",value:{name:"string",required:!0}},{key:"tapMultiple",value:{name:"string",required:!0}},{key:"tapSingle",value:{name:"string",required:!0}},{key:"clickMultiple",value:{name:"string",required:!0}},{key:"clickSingle",value:{name:"string",required:!0}},{key:"choices",value:{name:"string",required:!0}},{key:"answers",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"hideAnswersToggleLabel",value:{name:"string",required:!0}},{key:"moves",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"clickTiles",value:{name:"string",required:!0}},{key:"turnOffLights",value:{name:"string",required:!0}},{key:"fillAllCells",value:{name:"string",required:!0}},{key:"molecularDrawing",value:{name:"signature",type:"function",raw:"({content}: {content: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{content: string}",signature:{properties:[{key:"content",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"switchDirection",value:{name:"string",required:!0}},{key:"circleOpen",value:{name:"string",required:!0}},{key:"circleFilled",value:{name:"string",required:!0}},{key:"numDivisions",value:{name:"string",required:!0}},{key:"divisions",value:{name:"signature",type:"function",raw:"({divRangeString}: {divRangeString: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{divRangeString: string}",signature:{properties:[{key:"divRangeString",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineRange",value:{name:"signature",type:"function",raw:"({lineRange}: {lineRange: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineRange: string}",signature:{properties:[{key:"lineRange",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineNumber",value:{name:"signature",type:"function",raw:"({lineNumber}: {lineNumber: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{lineNumber: string}",signature:{properties:[{key:"lineNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolPassage",value:{name:"signature",type:"function",raw:`({
    questionSymbol,
    questionNumber,
}: {
    questionSymbol: string;
    questionNumber: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    questionSymbol: string;
    questionNumber: string;
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOut",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"crossOut",value:{name:"string",required:!0}},{key:"crossOutOption",value:{name:"string",required:!0}},{key:"crossOutChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"srGraphInstructions",value:{name:"string",required:!0}},{key:"srUnlimitedGraphInstructions",value:{name:"string",required:!0}},{key:"xAxis",value:{name:"string",required:!0}},{key:"yAxis",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
    num,
    x,
    y,
}: {
    num: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    num: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"num",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srInteractiveElements",value:{name:"signature",type:"function",raw:"({elements}: {elements: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{elements: string}",signature:{properties:[{key:"elements",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srNoInteractiveElements",value:{name:"string",required:!0}},{key:"srCircleGraph",value:{name:"string",required:!0}},{key:"srCircleShape",value:{name:"signature",type:"function",raw:`({
    centerX,
    centerY,
}: {
    centerX: string;
    centerY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    centerX: string;
    centerY: string;
}`,signature:{properties:[{key:"centerX",value:{name:"string",required:!0}},{key:"centerY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointRight",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadiusPointLeft",value:{name:"signature",type:"function",raw:`({
    radiusPointX,
    radiusPointY,
}: {
    radiusPointX: string;
    radiusPointY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    radiusPointX: string;
    radiusPointY: string;
}`,signature:{properties:[{key:"radiusPointX",value:{name:"string",required:!0}},{key:"radiusPointY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleRadius",value:{name:"signature",type:"function",raw:"({radius}: {radius: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{radius: number}",signature:{properties:[{key:"radius",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srCircleOuterPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    point4X,
    point4Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
    point4X: string;
    point4Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}},{key:"point4X",value:{name:"string",required:!0}},{key:"point4Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraph",value:{name:"string",required:!0}},{key:"srLinearGraphPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphSlopeIncreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeDecreasing",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeHorizontal",value:{name:"string",required:!0}},{key:"srLinearGraphSlopeVertical",value:{name:"string",required:!0}},{key:"srLinearGraphXOnlyIntercept",value:{name:"signature",type:"function",raw:"({xIntercept}: {xIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{xIntercept: string}",signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphYOnlyIntercept",value:{name:"signature",type:"function",raw:"({yIntercept}: {yIntercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{yIntercept: string}",signature:{properties:[{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphBothIntercepts",value:{name:"signature",type:"function",raw:`({
    xIntercept,
    yIntercept,
}: {
    xIntercept: string;
    yIntercept: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    xIntercept: string;
    yIntercept: string;
}`,signature:{properties:[{key:"xIntercept",value:{name:"string",required:!0}},{key:"yIntercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearGraphOriginIntercept",value:{name:"string",required:!0}},{key:"srLinearGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleStartingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleEndingSide",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleVertexWithAngleMeasure",value:{name:"signature",type:"function",raw:`({
    x,
    y,
    angleMeasure,
}: {
    x: string;
    y: string;
    angleMeasure: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    x: string;
    y: string;
    angleMeasure: string;
}`,signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"angleMeasure",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleGraphAriaLabel",value:{name:"string",required:!0}},{key:"srAngleGraphAriaDescription",value:{name:"signature",type:"function",raw:`({
    angleMeasure,
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    angleMeasure: string;
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"angleMeasure",value:{name:"string",required:!0}},{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srAngleInteractiveElements",value:{name:"signature",type:"function",raw:`({
    vertexX,
    vertexY,
    startingSideX,
    startingSideY,
    endingSideX,
    endingSideY,
}: {
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    vertexX: string;
    vertexY: string;
    startingSideX: string;
    startingSideY: string;
    endingSideX: string;
    endingSideY: string;
}`,signature:{properties:[{key:"vertexX",value:{name:"string",required:!0}},{key:"vertexY",value:{name:"string",required:!0}},{key:"startingSideX",value:{name:"string",required:!0}},{key:"startingSideY",value:{name:"string",required:!0}},{key:"endingSideX",value:{name:"string",required:!0}},{key:"endingSideY",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphAriaLabel",value:{name:"string",required:!0}},{key:"srMultipleSegmentGraphAriaLabel",value:{name:"signature",type:"function",raw:`({
    countOfSegments,
}: {
    countOfSegments: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    countOfSegments: number;
}`,signature:{properties:[{key:"countOfSegments",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentIndividualLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    indexOfSegment,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentLabel",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentLength",value:{name:"signature",type:"function",raw:"({length}: {length: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{length: string}",signature:{properties:[{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSingleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
}: {
    endpointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srMultipleSegmentGraphEndpointAriaLabel",value:{name:"signature",type:"function",raw:`({
    endpointNumber,
    x,
    y,
    indexOfSegment,
}: {
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    endpointNumber: number;
    x: string;
    y: string;
    indexOfSegment: number;
}`,signature:{properties:[{key:"endpointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"indexOfSegment",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSegmentGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemGraph",value:{name:"string",required:!0}},{key:"srLinearSystemPoints",value:{name:"signature",type:"function",raw:`({
    lineNumber,
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    lineNumber: number;
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"lineNumber",value:{name:"number",required:!0}},{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srLinearSystemPoint",value:{name:"string",required:!0}},{key:"srLinearSystemGrabHandle",value:{name:"string",required:!0}},{key:"srLinearSystemIntersection",value:{name:"string",required:!0}},{key:"srLinearSystemParallel",value:{name:"string",required:!0}},{key:"srRayGraph",value:{name:"string",required:!0}},{key:"srRayPoints",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayEndpoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayTerminalPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srRayGrabHandle",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticGraph",value:{name:"string",required:!0}},{key:"srQuadraticFaceUp",value:{name:"string",required:!0}},{key:"srQuadraticFaceDown",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexOrigin",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexXAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexYAxis",value:{name:"string",required:!0}},{key:"srQuadraticGraphVertexQuadrant",value:{name:"signature",type:"function",raw:"({quadrant}: {quadrant: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{quadrant: number}",signature:{properties:[{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticTwoXIntercepts",value:{name:"signature",type:"function",raw:`({
    intercept1,
    intercept2,
}: {
    intercept1: string;
    intercept2: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    intercept1: string;
    intercept2: string;
}`,signature:{properties:[{key:"intercept1",value:{name:"string",required:!0}},{key:"intercept2",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticOneXIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticYIntercept",value:{name:"signature",type:"function",raw:"({intercept}: {intercept: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{intercept: string}",signature:{properties:[{key:"intercept",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointOrigin",value:{name:"signature",type:"function",raw:"({pointNumber}: {pointNumber: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{pointNumber: number}",signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointAxis",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
}: {
    pointNumber: number;
    x: string;
    y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticPointQuadrant",value:{name:"signature",type:"function",raw:`({
    pointNumber,
    x,
    y,
    quadrant,
}: {
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNumber: number;
    x: string;
    y: string;
    quadrant: number;
}`,signature:{properties:[{key:"pointNumber",value:{name:"number",required:!0}},{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}},{key:"quadrant",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srQuadraticInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    point3X: string;
    point3Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}},{key:"point3X",value:{name:"string",required:!0}},{key:"point3Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraph",value:{name:"string",required:!0}},{key:"srPolygonGraphCoordinatePlane",value:{name:"string",required:!0}},{key:"srPolygonGraphPointsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonGraphPointsOne",value:{name:"string",required:!0}},{key:"srPolygonElementsNum",value:{name:"signature",type:"function",raw:"({num}: {num: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{num: number}",signature:{properties:[{key:"num",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonElementsOne",value:{name:"string",required:!0}},{key:"srPolygonPointAngleApprox",value:{name:"signature",type:"function",raw:"({angle}: {angle: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: string}",signature:{properties:[{key:"angle",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonPointAngle",value:{name:"signature",type:"function",raw:"({angle}: {angle: number}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{angle: number}",signature:{properties:[{key:"angle",value:{name:"number",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLength",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srPolygonSideLengthApprox",value:{name:"signature",type:"function",raw:`({
    pointNum,
    length,
}: {
    pointNum: number;
    length: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    pointNum: number;
    length: string;
}`,signature:{properties:[{key:"pointNum",value:{name:"number",required:!0}},{key:"length",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srUnlimitedPolygonEmpty",value:{name:"string",required:!0}},{key:"srSinusoidGraph",value:{name:"string",required:!0}},{key:"srSinusoidRootPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMaxPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidMinPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidFlatPoint",value:{name:"signature",type:"function",raw:"({x, y}: {x: string; y: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{x: string; y: string}",signature:{properties:[{key:"x",value:{name:"string",required:!0}},{key:"y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidDescription",value:{name:"signature",type:"function",raw:`({
    minValue,
    maxValue,
    cycleStart,
    cycleEnd,
}: {
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    minValue: string;
    maxValue: string;
    cycleStart: string;
    cycleEnd: string;
}`,signature:{properties:[{key:"minValue",value:{name:"string",required:!0}},{key:"maxValue",value:{name:"string",required:!0}},{key:"cycleStart",value:{name:"string",required:!0}},{key:"cycleEnd",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"srSinusoidInteractiveElements",value:{name:"signature",type:"function",raw:`({
    point1X,
    point1Y,
    point2X,
    point2Y,
}: {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}) => string`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}},{key:"locale",value:{name:"string",required:!0}}]}},description:""}}};const et=10,$e=14,nm=({y:n,range:e,tickStep:t,showPi:r})=>{let a=0;e[x][te]>0&&(a=e[x][te]),e[x][le]<0&&(a=e[x][le]);const i=[a,n],[[o,l]]=Q(i),u=o-et/2,d=l,m=o+et/2,p=l,c=e[x][le]<=0?$e*1.5:-$e*1.1,g=o+c,y=l+$e*.25,w=rm(n,e,t),v=r?uo(n):n.toString();return s.createElement("g",{className:"tick","aria-hidden":!0},s.createElement("line",{x1:u,y1:d,x2:m,y2:p,className:"axis-tick"}),w&&s.createElement("text",{className:"axis-tick-label",style:{fontSize:$e},textAnchor:"end",x:g,y},v))},tm=({x:n,range:e,showPi:t})=>{let r=0;e[A][te]>0&&(r=e[A][te]),e[A][le]<0&&(r=e[A][le]);const a=[n,r],[[i,o]]=Q(a),l=i,u=o+et/2,d=i,m=o-et/2,p=e[A][le]<0?-$e:$e*1.75,c=n<0?-2:0,g=i+c,y=o+p,w=t?uo(n):n.toString();return s.createElement("g",{className:"tick","aria-hidden":!0},s.createElement("line",{x1:l,y1:u,x2:d,y2:m,className:"axis-tick"}),s.createElement("text",{className:"axis-tick-label",style:{fontSize:$e},textAnchor:"middle",x:g,y},w))},rm=(n,e,t)=>{let r=!0;return e[x][te]<-t&&e[x][le]>0&&n===-t&&(r=!1),r};function za(n,e,t){const r=[],a=am(n),i=Math.max(e,0);for(let l=i+n;l<t;l+=n)r.push(parseFloat(l.toFixed(a)));let o=Math.min(t,0)-n;for(o;o>e;o-=n)r.push(o);return r}const am=n=>{const e=n.toString();return e.includes(".")?e.split(".")[1].length:0};function uo(n){const e=n/Math.PI;switch(e){case 1:return"π";case-1:return"-π";case 0:return"0";default:return e+"π"}}const mo=()=>{const{tickStep:n,range:e}=Y(),[[t,r],[a,i]]=e,[o,l]=n,u=za(l,a,i),d=za(o,t,r);return s.createElement("g",{className:"axis-ticks",role:"presentation"},s.createElement("g",{className:"y-axis-ticks"},u.map(m=>s.createElement(nm,{y:m,key:`y-grid-tick-${m}`,range:e,tickStep:n[A],showPi:n[A]%Math.PI===0}))),s.createElement("g",{className:"x-axis-ticks"},d.map(m=>s.createElement(tm,{x:m,key:`x-grid-tick-${m}`,range:e,showPi:n[x]%Math.PI===0}))))};mo.__docgenInfo={description:"",methods:[],displayName:"AxisTicks"};const Ba=(n,e)=>{const t=n.markings==="axes"?!1:n.gridStep[e];return{axis:n.markings==="graph"||n.markings==="axes",lines:t,labels:!1}},co=n=>n.markings==="none"?null:s.createElement(Nl.Cartesian,{xAxis:Ba(n,x),yAxis:Ba(n,A)});co.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{gridStep:{required:!0,tsType:{name:"vec.Vector2"},description:""},range:{required:!0,tsType:{name:"tuple",raw:`[
    x: [min: number, max: number],
    y: [min: number, max: number],
]`,elements:[{name:"unknown"},{name:"unknown"}]},description:""},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},markings:{required:!0,tsType:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:""},width:{required:!0,tsType:{name:"number"},description:""},height:{required:!0,tsType:{name:"number"},description:""}}};const po=({box:n,backgroundImage:e})=>{const{url:t,width:r,height:a}=e??{};if(t&&typeof t=="string"){const i=n[x]/Ni.defaultBoxSize;return s.createElement(_,{style:{position:"absolute",bottom:0,left:0}},s.createElement(Or.Consumer,null,({setAssetStatus:o})=>s.createElement(En,{src:t,width:r,height:a,scale:i,responsive:!1,setAssetStatus:o,alt:""})))}return null};po.__docgenInfo={description:"If a graphie URL is provided in `backgroundImage`, will return the rendered graphie background.\nOtherwise, returns `null`.",methods:[],displayName:"LegacyGrid",props:{box:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
    scale?: number;
    // The bottom offset of the image
    // NOTE: perseus_data.go says this is required, but nullable, even though
    // it isn't necessary at all.
    bottom?: number;
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:""}}};function xn(n){const{coord:e,text:t,color:r,size:a}=n,[i,o]=kn(e,Y()),{TeX:l}=qe();return s.createElement("span",{className:"locked-label",style:{position:"absolute",left:i,top:o,color:ne[r],fontSize:cl.size[a],backgroundColor:"rgba(255, 255, 255, 0.8)"},"aria-hidden":!0},s.createElement(l,null,lr(t)))}xn.__docgenInfo={description:"",methods:[],displayName:"LockedLabel",props:{type:{required:!0,tsType:{name:"literal",value:'"label"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},text:{required:!0,tsType:{name:"string"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},size:{required:!0,tsType:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}]},description:""}}};function im(n){const{lockedFigures:e}=n;return e.map((t,r)=>{var a,i,o;return t.type==="label"?s.createElement(xn,{key:`label-${r}`,...t}):s.createElement(s.Fragment,{key:r},(a=t.labels)==null?void 0:a.map((l,u)=>s.createElement(xn,{key:`${r}-label-${u}`,...l})),t.type==="line"&&s.createElement(s.Fragment,null,(i=t.points[0].labels)==null?void 0:i.map((l,u)=>s.createElement(xn,{key:`locked-figure-${r}-point-1-label-${u}`,...l})),(o=t.points[1].labels)==null?void 0:o.map((l,u)=>s.createElement(xn,{key:`locked-figure-${r}-point-2-label-${u}`,...l}))))})}const go=n=>{const{center:e,radius:t,angle:r,color:a,fillStyle:i,strokeStyle:o,ariaLabel:l}=n,u=!!l;return s.createElement("g",{className:"locked-ellipse","aria-label":u?l:void 0,"aria-hidden":!u,role:"img"},s.createElement(El,{center:e,radius:t,angle:r,fillOpacity:ki[i],strokeStyle:o,color:ne[a],svgEllipseProps:{style:{fill:i==="white"?j.white:ne[a]}}}))};go.__docgenInfo={description:"",methods:[],displayName:"LockedEllipse",props:{type:{required:!0,tsType:{name:"literal",value:'"ellipse"'},description:""},center:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},radius:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},angle:{required:!0,tsType:{name:"number"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const ho=n=>{const[e,t]=s.useState(),{color:r,strokeStyle:a,directionalAxis:i,domain:o}=n,l={color:ne[r],style:a,domain:o},u=!!n.ariaLabel;return s.useEffect(()=>{t(qt(n.equation).expr)},[n.equation]),typeof e>"u"?null:s.createElement("g",{className:"locked-function","aria-label":u?n.ariaLabel:void 0,"aria-hidden":!u,role:"img"},i==="x"&&s.createElement(Yn.OfX,{y:d=>e.eval({x:d}),...l}),i==="y"&&s.createElement(Yn.OfY,{x:d=>e.eval({y:d}),...l}))};ho.__docgenInfo={description:"",methods:[],displayName:"LockedFunction",props:{type:{required:!0,tsType:{name:"literal",value:'"function"'},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},equation:{required:!0,tsType:{name:"string"},description:"This is the user-defined equation (as it was typed)"},directionalAxis:{required:!0,tsType:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}]},description:"The independent variable of this function"},domain:{required:!0,tsType:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};function Ue(n){const{start:e,end:t,style:r,className:a,testId:i}=n;return s.createElement("line",{"aria-hidden":!0,x1:e[x],y1:e[A],x2:t[x],y2:t[A],style:r,className:a,"data-testid":i})}Ue.__docgenInfo={description:"",methods:[],displayName:"SVGLine",props:{start:{required:!0,tsType:{name:"vec.Vector2"},description:""},end:{required:!0,tsType:{name:"vec.Vector2"},description:""},style:{required:!1,tsType:{name:'SVGProps["style"]',raw:'SVGProps<SVGLineElement>["style"]'},description:""},className:{required:!1,tsType:{name:"string"},description:""},testId:{required:!1,tsType:{name:"string"},description:""}}};const{calculateAngleInDegrees:om}=We;function dn(n){const{interactiveColor:e}=Y(),{tail:t,tip:r,color:a=e,style:i,testId:o}=n,[l,u]=Q(t,r),d=b.sub(u,l),m=om(d);return s.createElement("g",{style:{stroke:a,strokeWidth:2},"data-testid":o},s.createElement(Ue,{start:l,end:u,style:i}),s.createElement(Le,{angle:m,tip:r,color:a}))}dn.__docgenInfo={description:"",methods:[],displayName:"Vector",props:{tail:{required:!0,tsType:{name:"vec.Vector2"},description:""},tip:{required:!0,tsType:{name:"vec.Vector2"},description:""},color:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:'ReactSVGProps["style"]',raw:'React.SVGProps<SVGLineElement>["style"]'},description:""},testId:{required:!1,tsType:{name:"string"},description:""}}};function f(n,e,t){const r=sm(n);return r||(0+n).toLocaleString(e,{maximumFractionDigits:t??3,useGrouping:!1})}function sm(n){if(Number.isInteger(n)||n===0||n>1e12)return null;const e=n/Math.PI,t=parseFloat(e.toFixed(12));if(Number.isInteger(t))return t===1?"π":t===-1?"-π":t+"π";const r=[2,3,4,6];for(const a of r){const i=parseFloat((e*a).toFixed(12));if(Number.isInteger(i))return i===1?"π/"+a:i===-1?"-π/"+a:i+"π/"+a}return null}const Be=(n,e,t)=>{const[[r,a],[i,o]]=t,[l,u]=n,[d,m]=e,p=m-u,c=d-l,g=p/c,y=1/g,w=c<0?r:a,v=p<0?i:o,q=u+(w-l)*g,k=l+(v-u)*y;switch(!0){case Ka(q,i,o):return[w,q];case Ka(k,r,a):return[k,v];default:return[w,v]}};function Ka(n,e,t){return n>=e&&n<=t}function Vr(n){const e=[];for(const t of n)e.some(([r,a])=>r===t[0]&&a===t[1])||e.push(t);return e}function yo(n,e){const t=(n[1][1]-n[0][1])/(n[1][0]-n[0][0]);return Number.isFinite(t)?t===0?e.srLinearGraphSlopeHorizontal:t>0?e.srLinearGraphSlopeIncreasing:e.srLinearGraphSlopeDecreasing:e.srLinearGraphSlopeVertical}function wo(n,e,t){const r=(n[1][1]-n[0][1])/(n[1][0]-n[0][0]),a=(0-n[0][1])/r+n[0][0],i=n[0][1]-r*n[0][0],o=n[0][1]===0&&n[1][1]===0,l=n[0][0]===0&&n[1][0]===0,u=Number.isFinite(a)&&!o,d=Number.isFinite(i)&&!l;return u&&d?a===0&&i===0?e.srLinearGraphOriginIntercept:e.srLinearGraphBothIntercepts({xIntercept:f(a,t),yIntercept:f(i,t)}):u?e.srLinearGraphXOnlyIntercept({xIntercept:f(a,t)}):e.srLinearGraphYOnlyIntercept({yIntercept:f(i,t)})}function fo(n){const[e,t]=n,r=Number(e.toFixed(3)),a=Number(t.toFixed(3));return r===0&&a===0?"origin":a===0?"x-axis":r===0?"y-axis":r>0&&a>0?1:r<0&&a>0?2:r<0&&a<0?3:4}function lm(n,e){const t=fo(n);switch(t){case"origin":return e.srQuadraticGraphVertexOrigin;case"x-axis":return e.srQuadraticGraphVertexXAxis;case"y-axis":return e.srQuadraticGraphVertexYAxis;default:return e.srQuadraticGraphVertexQuadrant({quadrant:t})}}function um(n,e,t,r){const a=fo(e),[i,o]=e;switch(a){case"origin":return t.srQuadraticPointOrigin({pointNumber:n});case"x-axis":case"y-axis":return t.srQuadraticPointAxis({pointNumber:n,x:f(i,r),y:f(o,r)});default:return t.srQuadraticPointQuadrant({pointNumber:n,quadrant:a,x:f(i,r),y:f(o,r)})}}function dm(n,e,t){if(n===0)return e===0?[]:[-t/e];const r=e*e-4*n*t;if(r<0)return[];const a=(-e+Math.sqrt(r))/(2*n),i=(-e-Math.sqrt(r))/(2*n);return a===i?[a]:[a,i]}function bo(n,e){if(e<0||e>=n.length||!Number.isInteger(e)||n.length<3)return null;const t=n.at(e),r=n.at(e-1),a=n[(e+1)%n.length];if(!t||!r||!a)return null;const i=b.dist(t,r),o=b.dist(t,a),l=b.dist(r,a);let u=(i**2+o**2-l**2)/(2*i*o);return(u<-1||u>1)&&(u=Math.round(u)),Math.acos(u)}function vo(n,e,t){if(e<0||e>=n.length||!Number.isInteger(e))return[];if(n.length<2)return[];const r=[],a=n[e],i=e===0?n.length-1:e-1,o=n[i],l=e!==i?b.dist(a,o):null;l&&!(t&&e===0)&&r.push({pointIndex:i,sideLength:l});const u=(e+1)%n.length,d=n[u],m=e!==u&&u!==i?b.dist(a,d):null;return m&&!(t&&e===n.length-1)&&r.push({pointIndex:u,sideLength:m}),r}function ur(n,e,t,r){return Number.isInteger(n)?t.srPolygonSideLength({pointNum:e+1,length:`${n}`}):t.srPolygonSideLengthApprox({pointNum:e+1,length:f(n,r,1)})}const{calculateAngleInDegrees:mm}=We,ko=n=>{const{color:e,lineStyle:t,kind:r,points:a,showPoint1:i,showPoint2:o,ariaLabel:l,range:u}=n,[d,m]=a,p=!!l;let c;if(r==="ray"){const g=Be(d.coord,m.coord,u);c=s.createElement(dn,{tail:d.coord,tip:g,color:ne[e],style:{strokeDasharray:t==="dashed"?"var(--mafs-line-stroke-dash-style)":void 0}})}else{const g=r==="segment"?qa.Segment:qa.ThroughPoints;let y=r==="segment"?m.coord:Be(d.coord,m.coord,u);const[w,v]=Q(m.coord,d.coord),q=b.sub(w,v);let k=mm(q);const P=r!=="segment"&&s.createElement(Le,{angle:k,tip:y,color:ne[e]});y=r==="segment"?d.coord:Be(m.coord,d.coord,u),k=k>180?k-180:k+180;const C=r!=="segment"&&s.createElement(Le,{angle:k,tip:y,color:ne[e]});c=s.createElement(s.Fragment,null,P,s.createElement(g,{point1:d.coord,point2:m.coord,color:ne[e],style:t}),C)}return s.createElement("g",{className:r==="ray"?"locked-ray":"locked-line","aria-label":p?l:void 0,"aria-hidden":!p,role:"img"},c,i&&s.createElement(zn,{x:d.coord[x],y:d.coord[A],svgCircleProps:{style:{fill:d.filled?ne[d.color]:j.white,stroke:ne[d.color],strokeWidth:ce.xxxxSmall_2}}}),o&&s.createElement(zn,{x:m.coord[x],y:m.coord[A],svgCircleProps:{style:{fill:m.filled?ne[m.color]:j.white,stroke:ne[m.color],strokeWidth:ce.xxxxSmall_2}}}))};ko.__docgenInfo={description:"",methods:[],displayName:"LockedLine",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"Interval"},{name:"Interval"}]},description:""}}};const xo=n=>{const{color:e,coord:t,filled:r,ariaLabel:a}=n,[i,o]=t,l=!!a;return s.createElement("g",{className:"locked-point","aria-label":l?a:void 0,"aria-hidden":!l,role:"img"},s.createElement(zn,{x:i,y:o,svgCircleProps:{style:{fill:r?ne[e]:j.white,stroke:ne[e],strokeWidth:ce.xxxxSmall_2}}}))};xo.__docgenInfo={description:"",methods:[],displayName:"LockedPoint",props:{type:{required:!0,tsType:{name:"literal",value:'"point"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const qo=n=>{const{points:e,color:t,showVertices:r,fillStyle:a,strokeStyle:i}=n,o=!!n.ariaLabel;return s.createElement("g",{className:"locked-polygon","aria-label":o?n.ariaLabel:void 0,"aria-hidden":!o,role:"img"},s.createElement(_t,{points:[...e],fillOpacity:ki[a],strokeStyle:i,color:ne[t],svgPolygonProps:{style:{fill:a==="white"?j.white:ne[t]}}}),r&&e.map((l,u)=>s.createElement(zn,{key:`locked-polygon-point-${u}`,x:l[x],y:l[A],color:ne[t]})))};qo.__docgenInfo={description:"",methods:[],displayName:"LockedPolygon",props:{type:{required:!0,tsType:{name:"literal",value:'"polygon"'},description:""},points:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],raw:"ReadonlyArray<Coord>"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},showVertices:{required:!0,tsType:{name:"boolean"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const Po=n=>{const{color:e,points:t,ariaLabel:r}=n,[a,i]=t,o=!!r;return s.createElement("g",{className:"locked-vector","aria-label":o?r:void 0,"aria-hidden":!o,role:"img"},s.createElement(dn,{tail:a,tip:i,color:ne[e]}))};Po.__docgenInfo={description:"",methods:[],displayName:"LockedVector",props:{type:{required:!0,tsType:{name:"literal",value:'"vector"'},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const Ao=n=>{const{lockedFigures:e}=n;return s.createElement(s.Fragment,null,e.map((t,r)=>{switch(t.type){case"point":return s.createElement(xo,{key:`point-${r}`,...t});case"line":return s.createElement(ko,{key:`line-${r}`,range:n.range,...t});case"vector":return s.createElement(Po,{key:`vector-${r}`,...t});case"ellipse":return s.createElement(go,{key:`ellipse-${r}`,...t});case"polygon":return s.createElement(qo,{key:`polygon-${r}`,...t});case"function":return s.createElement(ho,{key:`function-${r}`,...t});case"label":return null;default:throw new fe(t)}}))};Ao.__docgenInfo={description:"",methods:[],displayName:"GraphLockedLayer",props:{lockedFigures:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:`| LockedPointType
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
    /**
     * This is the user-defined equation (as it was typed)
     */
    equation: string;
    /**
     * The independent variable of this function
     */
    directionalAxis: "x" | "y";
    /**
     * The minimum and maximum values along the \`directionalAxis\` at which
     * this function should be graphed. Values of -Infinity and Infinity are
     * allowed. Note that infinite values are serialized as \`null\` in JSON.
     */
    domain: [min: number, max: number];
    labels?: LockedLabelType[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"function"',required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"strokeStyle",value:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}],required:!0}},{key:"equation",value:{name:"string",required:!0},description:"This is the user-defined equation (as it was typed)"},{key:"directionalAxis",value:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}],required:!0},description:"The independent variable of this function"},{key:"domain",value:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},{key:"labels",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"ReadonlyArray<LockedFigure>"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[x: Interval, y: Interval]",elements:[{name:"unknown"},{name:"unknown"}]},description:""}}};const O={global:{deleteIntent:cm,changeInteractionMode:pm,changeKeyboardInvitationVisibility:gm},angle:{movePoint:fn},circle:{moveCenter:fm,moveRadiusPoint:bm},linear:{moveLine:n=>Dn(0,n),movePoint:(n,e)=>jn(0,n,e)},linearSystem:{moveLine:Dn,movePointInFigure:jn},pointGraph:{movePoint:fn,addPoint:Ja,removePoint:Qa,focusPoint:Za,blurPoint:ei,clickPoint:ni},polygon:{movePoint:fn,moveAll:wm,addPoint:Ja,removePoint:Qa,focusPoint:Za,blurPoint:ei,clickPoint:ni,closePolygon:hm,openPolygon:ym},quadratic:{movePoint:fn},ray:{moveRay:n=>Dn(0,n),movePoint:(n,e)=>jn(0,n,e)},segment:{movePointInFigure:jn,moveLine:Dn},sinusoid:{movePoint:fn}},Co="delete-intent";function cm(){return{type:Co}}const To="move-line";function Dn(n,e){return{type:To,itemIndex:n,delta:e}}const Ro="add-point";function Ja(n){return{type:Ro,location:n}}const Io="remove-point";function Qa(n){return{type:Io,index:n}}const No="focus-point";function Za(n){return{type:No,index:n}}const Eo="blur-point";function ei(){return{type:Eo}}const So="click-point";function ni(n){return{type:So,index:n}}const Oo="point-change-interaction-mode";function pm(n){return{type:Oo,mode:n}}const Mo="change-keyboard-interaction-invitation-visibility";function gm(n){return{type:Mo,shouldShow:n}}const Lo="close-polygon";function hm(){return{type:Lo}}const Do="open-polygon";function ym(){return{type:Do}}const jo="move-all";function wm(n){return{type:jo,delta:n}}const Fo="move-point";function fn(n,e){return{type:Fo,index:n,destination:e}}const Wo="move-point-in-figure";function jn(n,e,t){return{type:Wo,figureIndex:n,pointIndex:e,destination:t}}const Go="move-center";function fm(n){return{type:Go,destination:n}}const _o="MOVE_RADIUS_POINT";function bm(n){return{type:_o,destination:n}}const Vo="change-snap-step";function vm(n){return{type:Vo,snapStep:n}}const Ho="change-range";function km(n){return{type:Ho,range:n}}const $o="reinitialize";function xm(n){return{type:$o,params:n}}const Hr=({children:n})=>s.createElement("g",{style:{transform:"var(--mafs-view-transform) var(--mafs-user-transform)"}},n);Hr.__docgenInfo={description:"Wrapper with Mafs transform styles for SVG elements.\nScales and translates the SVG element to match the Mafs view.\nUse if you do not need/want to use the hook in `use-transform.ts`.",methods:[],displayName:"MafsCssTransformWrapper"};const Rt=({children:n,...e})=>V.createElement(Sl,{size:16,svgTextProps:{filter:"url(#background)",fontWeight:"bold"},...e},n),Uo=()=>V.createElement("defs",null,V.createElement("filter",{id:"background",x:"-5%",width:"110%",y:"0%",height:"100%"},V.createElement("feFlood",{floodColor:"#FFF",floodOpacity:"0.64"}),V.createElement("feComposite",{operator:"over",in:"SourceGraphic"})));Rt.__docgenInfo={description:"",methods:[],displayName:"TextLabel"};Uo.__docgenInfo={description:"",methods:[],displayName:"SvgDefs"};const{clockwise:Xo}=At,{getAngleFromVertex:ti}=We,Yo=({centerPoint:n,endPoints:e,range:t,polygonLines:r,showAngles:a,snapTo:i})=>{const[o,l]=n,u=Xo([n,...e]),[[d,m],[p,c]]=u?e:e.reverse(),g=.3,y=b.dist(n,e[0]),w=b.dist(n,e[1]),v=b.dist(e[0],e[1]);let q=(y**2+w**2-v**2)/(2*y*w);(q<-1||q>1)&&(q=Math.round(q));const k=Math.acos(q),P=l+(m-l)/y*g,C=o+(p-o)/w*g,I=o+(d-o)/y*g,E=l+(c-l)/w*g,[S,R]=b.add(n,b.add(b.sub([I,P],n),b.sub([C,E],n)));if(!a)return ri(k)?s.createElement(dr,{start:[I,P],vertex:[C,E],end:[S,R]}):null;const F=Ko([S,R],n,t,r),ee=`M ${I} ${P} A ${g} ${g} 0 ${F?1:0} ${F?1:0} ${C} ${E}`;let $=k*(180/Math.PI);F&&($=360-$);const be=parseFloat($.toFixed(i==="angles"?0:1)),ie=Number.isInteger(be)?be:"≈ "+be;return s.createElement(s.Fragment,null,s.createElement("defs",null,s.createElement("filter",{id:"background",x:"-5%",width:"110%",y:"0%",height:"100%"},s.createElement("feFlood",{floodColor:"#FFF",floodOpacity:"0.5"}),s.createElement("feComposite",{operator:"over",in:"SourceGraphic"}))),!F&&ri(k)?s.createElement(dr,{start:[I,P],vertex:[C,E],end:[S,R]}):s.createElement(Bo,{arc:ee}),s.createElement(Rt,{x:S,y:R,attach:R-l>0?"s":"n",attachDistance:Math.abs(R-l)<.2||b.dist([S,R],n)<.3?20:10},ie,"°"))},zo=({vertex:n,coords:e,showAngles:t,allowReflexAngles:r,range:a})=>{const l=Xo([...e,n])&&!r?e:e.reverse(),u=ti(l[0],n),d=ti(l[1],n),m=(u+360-d)%360,p=m>180,[c,g]=n,[y,w]=l,[v,q]=y,[k,P]=w,C=b.dist(n,y),I=b.dist(n,w),E=2,S=g+(q-g)/C*E,R=c+(k-c)/I*E,F=c+(v-c)/C*E,N=g+(P-g)/I*E,[z,ee]=b.add(n,b.add(b.sub([F,S],n),b.sub([R,N],n))),$=Ko([z,ee],n,a,[[n,y],[n,w]]),U=`M ${F} ${S} A ${E} ${E} 0 ${$||p?1:0} ${$&&p?1:0} ${R} ${N}`,B=parseFloat(m.toFixed(0)),[pe,Pe]=Am(y,w,n,p,r,E),{disableKeyboardInteraction:Ee}=Y(),Ae=Ee?"angle-arc-static":"angle-arc-interactive";return s.createElement(s.Fragment,null,s.createElement("defs",null,s.createElement("filter",{id:"background",x:"-5%",width:"110%",y:"0%",height:"100%"},s.createElement("feFlood",{floodColor:"#FFF",floodOpacity:"0.5"}),s.createElement("feComposite",{operator:"over",in:"SourceGraphic"}))),qm(m)?s.createElement(dr,{start:[F,S],vertex:[R,N],end:[z,ee],className:Ae}):s.createElement(Bo,{arc:U,className:Ae}),t&&s.createElement(Rt,{x:pe,y:Pe,color:j.blue},B,"°"))},dr=({start:[n,e],vertex:[t,r],end:[a,i],className:o})=>s.createElement(Hr,null,s.createElement("path",{"aria-hidden":!0,d:`M ${n} ${e} L ${a} ${i} M ${a} ${i} L ${t} ${r}`,strokeWidth:.02,fill:"none",className:o,"data-testid":"angle-indicators__right-angle"})),Bo=({arc:n,className:e})=>s.createElement(Hr,null,s.createElement("path",{"aria-hidden":!0,d:n,strokeWidth:.02,fill:"none",className:e,"data-testid":"angle-indicators__arc"})),ri=n=>Math.abs(n-Math.PI/2)<.01,qm=n=>Math.round(n)===90,Ko=(n,e,t,r)=>{const a=Be(n,e,t);let i=0;return r.forEach(o=>Yd([e,a],o)&&i++),!Pm(i)},Pm=n=>n%2===0;function Am(n,e,t,r,a,i){const[o,l]=t,[u,d]=n,[m,p]=e,c=[u-o,d-l],g=[m-o,p-l],y=Math.atan2(c[1],c[0]),w=Math.atan2(g[1],g[0]);let v=(y+w)/2;const q=Math.abs(y-w);a?(q<=Math.PI&&r||w>y)&&(v+=Math.PI):q>Math.PI&&(v-=Math.PI);const k=[Math.cos(v),Math.sin(v)],P=Math.sqrt(k[0]**2+k[1]**2),C=[k[0]/P,k[1]/P],I=Math.sqrt(C[0]**2+C[1]**2),E=i*1.75;let S=E/I;I>=E&&(S=1);const R=[C[0]*S,C[1]*S];return b.add(R,t)}Yo.__docgenInfo={description:"",methods:[],displayName:"PolygonAngle",props:{centerPoint:{required:!0,tsType:{name:"vec.Vector2"},description:""},endPoints:{required:!0,tsType:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}]},description:""},polygonLines:{required:!0,tsType:{name:"unknown"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"Interval"},{name:"Interval"}]},description:""},showAngles:{required:!0,tsType:{name:"boolean"},description:""},snapTo:{required:!0,tsType:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}]},description:""}}};zo.__docgenInfo={description:"",methods:[],displayName:"Angle",props:{vertex:{required:!0,tsType:{name:"vec.Vector2"},description:""},coords:{required:!0,tsType:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}]},description:""},showAngles:{required:!0,tsType:{name:"boolean"},description:""},allowReflexAngles:{required:!0,tsType:{name:"boolean"},description:""},snapDegrees:{required:!0,tsType:{name:"number"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"Interval"},{name:"Interval"}]},description:""}}};function mn(n){const{gestureTarget:e,onMove:t,point:r,constrainKeyboardMovement:a}=n,[i,o]=s.useState(!1),{xSpan:l,ySpan:u}=Rm(),{viewTransform:d,userTransform:m}=Ol(),p=b.matrixInvert(d);oe(p);const c=s.useMemo(()=>Tm(m),[m]),g=s.useRef([0,0]);return Ei(y=>{const{type:w,event:v}=y;if(v==null||v.stopPropagation(),w.includes("key")){if(oe(v instanceof KeyboardEvent),v==null||v.preventDefault(),w==="keyup")return;if(typeof a=="object"){const z=a[Cm[v.key]];t(z??r);return}const{direction:k,altKey:P,metaKey:C,shiftKey:I}=y,E=[k[x],-k[A]],S=Math.abs(E[x])?l:u;let R=50;(P||C)&&(R=200),I&&(R=10);const F=S/(R*2),N=Im(S/R,S/2,S/R);for(const z of N){const ee=b.scale(E,z),$=a(b.transform(b.add(b.transform(r,m),ee),c));if(b.dist($,r)>F){t($);break}}}else{const{last:k,movement:P,first:C}=y;if(o(!k),C&&(g.current=b.transform(r,m)),b.mag(P)===0)return;const I=b.transform(P,p);t(b.transform(b.add(g.current,I),c))}},{target:e,eventOptions:{passive:!1}}),{dragging:i}}const Cm={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};function Tm(n){const e=b.matrixInvert(n);return oe(e!==null),e}function Rm(){const{range:[[n,e],[t,r]]}=Y(),a=e-n,i=r-t;return{xSpan:a,ySpan:i}}function Im(n,e,t=1){const r=[];for(let i=n;i<e-t/2;i+=t)r.push(i);const a=r[r.length-1]+t;return Math.abs(e-a)<t/1e-6?r.push(e):r.push(a),r}function $r(n){const{point:e}=n,{range:t}=Y(),[[r,a],[i,o]]=t,[[l,u]]=Q(e),[[d]]=Q([r,0]),[[m]]=Q([a,0]),[[p,c]]=Q([0,i]),[[g,y]]=Q([0,o]);return s.createElement("g",{"aria-hidden":!0},s.createElement("line",{x1:d,y1:u,x2:m,y2:u,stroke:j.blue}),s.createElement("line",{x1:l,y1:c,x2:l,y2:y,stroke:j.blue}))}$r.__docgenInfo={description:"",methods:[],displayName:"Hairlines",props:{point:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""}}};const Nm=48,Jo=s.forwardRef((n,e)=>{var k;const{markings:t,showTooltips:r,interactiveColor:a}=Y(),{point:i,color:o=a,dragging:l,focused:u,cursor:d,showFocusRing:m,onClick:p=()=>{}}=n,c=((k=Object.entries(j).find(([P,C])=>C===o))==null?void 0:k[0])??"blue",g=Em("movable-point",l&&"movable-point--dragging",m&&"movable-point--focus"),[[y,w]]=Q(i),v=(l||u)&&t!=="none",q=s.createElement("g",{"aria-hidden":!0,ref:e,className:g,style:{"--movable-point-color":o,cursor:d},"data-testid":"movable-point",onClick:p},s.createElement("circle",{className:"movable-point-hitbox",r:Nm/2,cx:y,cy:w}),s.createElement("circle",{className:"movable-point-halo",cx:y,cy:w}),s.createElement("circle",{className:"movable-point-ring",cx:y,cy:w}),s.createElement("circle",{className:"movable-point-focus-outline",cx:y,cy:w}),s.createElement("circle",{className:"movable-point-center",cx:y,cy:w,style:{fill:o},"data-testid":"movable-point__center"}));return s.createElement(s.Fragment,null,v&&s.createElement($r,{point:i}),r?s.createElement(Ir,{autoUpdate:!0,backgroundColor:c,content:`(${i[x]}, ${i[A]})`,contentStyle:{color:"white"}},q):q)});function Em(...n){return n.filter(Boolean).join(" ")}Jo.__docgenInfo={description:"",methods:[],displayName:"MovablePointView",props:{point:{required:!0,tsType:{name:"vec.Vector2"},description:""},color:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:""},dragging:{required:!0,tsType:{name:"boolean"},description:""},focused:{required:!0,tsType:{name:"boolean"},description:""},showFocusRing:{required:!0,tsType:{name:"boolean"},description:""},cursor:{required:!1,tsType:{name:"union",raw:"CSSCursor | undefined",elements:[{name:"union",raw:'"move" | "ew-resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"ew-resize"'}]},{name:"undefined"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""}}};function mr(n){const{snapStep:e,disableKeyboardInteraction:t}=Y(),{point:r,ariaDescribedBy:a,ariaLabel:i,ariaLive:o="polite",color:l,constrain:u=N=>se(e,N),cursor:d,forwardedRef:m=bn,sequenceNumber:p=1,onMove:c=bn,onClick:g=bn,onFocus:y=bn,onBlur:w=bn}=n,{strings:v,locale:q}=me(),[k,P]=s.useState(!1),C=s.useRef(null);mn({gestureTarget:C,point:r,onMove:c,constrainKeyboardMovement:u});const I=s.useRef(null),{dragging:E}=mn({gestureTarget:I,point:r,onMove:c,constrainKeyboardMovement:u}),S=i||v.srPointAtCoordinates({num:p,x:f(r[x],q),y:f(r[A],q)});return s.useLayoutEffect(()=>{Sm(m,C.current)},[m]),s.useLayoutEffect(()=>{var N;E&&!k&&((N=C.current)==null||N.focus())},[E,k]),{focusableHandle:s.createElement("g",{"data-testid":"movable-point__focusable-handle",className:"movable-point__focusable-handle",tabIndex:t?-1:0,ref:C,role:"button","aria-describedby":a,"aria-label":S,"aria-live":o,onFocus:N=>{y(N),P(!0)},onBlur:N=>{w(N),P(!1)}}),visiblePoint:s.createElement(Jo,{cursor:d,onClick:()=>{var N;g(),(N=C.current)==null||N.focus()},point:r,dragging:E,focused:k,color:l,ref:I,showFocusRing:k}),focusableHandleRef:C,visiblePointRef:I}}function Sm(n,e){typeof n=="function"?n(e):n!==null&&(n.current=e)}const bn=()=>{},Sn=n=>{const{points:[e,t],ariaLabels:r,ariaDescribedBy:a,extend:i,onMoveLine:o=()=>{},onMovePoint:l=()=>{}}=n,{snapStep:u}=Y(),[d,m]=s.useState(["off","off","off"]),{visiblePoint:p,focusableHandle:c}=mr({ariaLabel:r==null?void 0:r.point1AriaLabel,ariaDescribedBy:a,ariaLive:d[0],point:e,sequenceNumber:1,onMove:v=>{m(["polite","off","off"]),l(0,v)},constrain:ai([e,t],u,0)}),{visiblePoint:g,focusableHandle:y}=mr({ariaLabel:r==null?void 0:r.point2AriaLabel,ariaDescribedBy:a,ariaLive:d[1],point:t,sequenceNumber:2,onMove:v=>{m(["off","polite","off"]),l(1,v)},constrain:ai([e,t],u,1)}),w=s.createElement(Om,{ariaLabel:r==null?void 0:r.grabHandleAriaLabel,ariaDescribedBy:a,ariaLive:d[2],start:e,end:t,extend:i,onMove:v=>{m(["off","off","polite"]),o(v)}});return s.createElement(s.Fragment,null,c,w,y,p,g)},Om=n=>{const{start:e,end:t,ariaLabel:r,ariaDescribedBy:a,ariaLive:i,extend:o,onMove:l}=n,[u,d]=Q(e,t),{range:m,graphDimensionsInPixels:p,snapStep:c,disableKeyboardInteraction:g,interactiveColor:y}=Y();let w,v;if(o){const P=Qo(m,p);w=o.start?Be(t,e,P):void 0,v=o.end?Be(e,t,P):void 0}const q=s.useRef(null),{dragging:k}=mn({gestureTarget:q,point:e,onMove:P=>{l(b.sub(P,e))},constrainKeyboardMovement:P=>se(c,P)});return s.createElement(s.Fragment,null,s.createElement("g",{ref:q,tabIndex:g?-1:0,"aria-label":r,"aria-describedby":a,"aria-live":i,className:"movable-line","data-testid":"movable-line",style:{cursor:k?"grabbing":"grab"},role:"button"},s.createElement(Ue,{start:u,end:d,style:{stroke:"transparent",strokeWidth:Gr}}),s.createElement(Ue,{start:u,end:d,className:"movable-line-focus-outline",style:{}}),s.createElement(Ue,{start:u,end:d,className:"movable-line-focus-outline-gap",style:{}}),s.createElement(Ue,{start:u,end:d,style:{stroke:y,strokeWidth:"var(--movable-line-stroke-weight)"},className:k?"movable-dragging":"",testId:"movable-line__line"})),w&&s.createElement(dn,{tail:e,tip:w,testId:"movable-line__vector"}),v&&s.createElement(dn,{tail:t,tip:v,testId:"movable-line__vector"}))},ai=(n,e,t)=>{const r=n[t],a=n[1-t],i=o=>{let l=o(r);return b.dist(l,a)===0&&(l=o(l)),l};return{up:i(o=>b.add(o,[0,e[1]])),down:i(o=>b.sub(o,[0,e[1]])),left:i(o=>b.sub(o,[e[0],0])),right:i(o=>b.add(o,[e[0],0]))}};function Qo(n,e){const[r,a]=n,[i,o]=e,l=un(r)/i,u=un(a)/o,d=4*l,m=4*u;return Wr([d,m],n)}Sn.__docgenInfo={description:"",methods:[],displayName:"MovableLine",props:{points:{required:!0,tsType:{name:"Readonly",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}]}],raw:"Readonly<[vec.Vector2, vec.Vector2]>"},description:""},ariaLabels:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    point1AriaLabel?: string;
    point2AriaLabel?: string;
    grabHandleAriaLabel?: string;
}`,signature:{properties:[{key:"point1AriaLabel",value:{name:"string",required:!1}},{key:"point2AriaLabel",value:{name:"string",required:!1}},{key:"grabHandleAriaLabel",value:{name:"string",required:!1}}]}},description:""},ariaDescribedBy:{required:!1,tsType:{name:"string"},description:""},extend:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    start: boolean;
    end: boolean;
}`,signature:{properties:[{key:"start",value:{name:"boolean",required:!0}},{key:"end",value:{name:"boolean",required:!0}}]}},description:""},onMovePoint:{required:!1,tsType:{name:"signature",type:"function",raw:"(endpointIndex: number, destination: vec.Vector2) => unknown",signature:{arguments:[{type:{name:"number"},name:"endpointIndex"},{type:{name:"vec.Vector2"},name:"destination"}],return:{name:"unknown"}}},description:""},onMoveLine:{required:!1,tsType:{name:"signature",type:"function",raw:"(delta: vec.Vector2) => unknown",signature:{arguments:[{type:{name:"vec.Vector2"},name:"delta"}],return:{name:"unknown"}}},description:""}}};const we=s.forwardRef((n,e)=>{const{visiblePoint:t,focusableHandle:r}=mr({...n,forwardedRef:e});return s.createElement(s.Fragment,null,r,t)});we.__docgenInfo={description:"",methods:[],displayName:"MovablePoint",props:{point:{required:!0,tsType:{name:"vec.Vector2"},description:""},ariaDescribedBy:{required:!1,tsType:{name:"string"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},ariaLive:{required:!1,tsType:{name:"union",raw:'"off" | "assertive" | "polite" | undefined',elements:[{name:"literal",value:'"off"'},{name:"literal",value:'"assertive"'},{name:"literal",value:'"polite"'},{name:"undefined"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},constrain:{required:!1,tsType:{name:"union",raw:`| ((point: vec.Vector2) => vec.Vector2)
// Alternatively, the movement can be constrained to specific
// pre-determined points based on which key is pressed.
| {
      left: vec.Vector2;
      right: vec.Vector2;
      up: vec.Vector2;
      down: vec.Vector2;
  }`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    left: vec.Vector2;
    right: vec.Vector2;
    up: vec.Vector2;
    down: vec.Vector2;
}`,signature:{properties:[{key:"left",value:{name:"vec.Vector2",required:!0}},{key:"right",value:{name:"vec.Vector2",required:!0}},{key:"up",value:{name:"vec.Vector2",required:!0}},{key:"down",value:{name:"vec.Vector2",required:!0}}]}}]},description:""},cursor:{required:!1,tsType:{name:"union",raw:"CSSCursor | undefined",elements:[{name:"union",raw:'"move" | "ew-resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"ew-resize"'}]},{name:"undefined"}]},description:""},sequenceNumber:{required:!1,tsType:{name:"number"},description:`Represents where this point stands in the overall point sequence.
This is used to provide screen readers with context about the point.
Example: sequenceNumber={1} ==> "Point 1 at x comma y"

Note: This number is 1-indexed, and should restart from 1 for each
interactive figure on the graph.`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.FocusEvent) => unknown",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent"},name:"event"}],return:{name:"unknown"}}},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.FocusEvent) => unknown",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent"},name:"event"}],return:{name:"unknown"}}},description:""},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(newPoint: vec.Vector2) => unknown",signature:{arguments:[{type:{name:"vec.Vector2"},name:"newPoint"}],return:{name:"unknown"}}},description:""}}};const{calculateAngleInDegrees:Mm,getClockwiseAngle:Lm,polar:ii}=We;function Dm(n,e,t){return{graph:s.createElement(jm,{graphState:n,dispatch:e}),interactiveElementsDescription:Fm(n,t)}}function jm(n){const{dispatch:e,graphState:t}=n,{graphDimensionsInPixels:r,interactiveColor:a}=Y(),i=me(),l=s.useId()+"-description",{coords:u,showAngles:d,range:m,allowReflexAngles:p,snapDegrees:c}=t,g=[u[0],u[2]],y=u[1],w=[[y,g[0]],[y,g[1]]],q=[Q(y,g[0]),Q(y,g[1])].map(([R,F],N)=>{const z=Qo(m,r),ee=Be(w[N][0],w[N][1],z);return s.createElement("g",{key:`line-${N}`},s.createElement(Ue,{start:R,end:F,style:{stroke:a,strokeWidth:"var(--movable-line-stroke-weight)"},testId:"angle-graph__line"}),s.createElement(dn,{tail:w[N][1],tip:ee,testId:"angle-graph__vector"}))}),k={vertex:y,coords:g,allowReflexAngles:p||!1,snapDegrees:c||1,range:m,showAngles:d||!1},{srAngleGraphAriaLabel:P,srAngleGraphAriaDescription:C,srAngleStartingSide:I,srAngleEndingSide:E,srAngleVertex:S}=Wm(t,i);return s.createElement("g",{"aria-label":P,"aria-describedby":l},q,s.createElement(zo,{...k}),s.createElement(we,{point:u[1],sequenceNumber:1,constrain:R=>R,onMove:R=>e(O.angle.movePoint(1,R)),ariaLabel:S}),s.createElement(we,{point:u[0],sequenceNumber:2,constrain:oi(u[0],u[1],c||1),onMove:R=>e(O.angle.movePoint(0,R)),ariaLabel:E}),s.createElement(we,{point:u[2],sequenceNumber:3,constrain:oi(u[2],u[1],c||1),onMove:R=>e(O.angle.movePoint(2,R)),ariaLabel:I}),s.createElement("g",{id:l,style:H.srOnly},C))}function Fm(n,e){const{strings:t,locale:r}=e,{coords:a}=n;return t.srInteractiveElements({elements:t.srAngleInteractiveElements({vertexX:f(a[1][x],r),vertexY:f(a[1][A],r),startingSideX:f(a[2][x],r),startingSideY:f(a[2][A],r),endingSideX:f(a[0][x],r),endingSideY:f(a[0][A],r)})})}function Wm(n,e){const{strings:t,locale:r}=e,{coords:a,allowReflexAngles:i}=n,[o,l,u]=a,d=f(Lm(a,i),r),m=t.srAngleGraphAriaLabel,p=t.srAngleGraphAriaDescription({angleMeasure:d,vertexX:f(l[x],r),vertexY:f(l[A],r),startingSideX:f(u[x],r),startingSideY:f(u[A],r),endingSideX:f(o[x],r),endingSideY:f(o[A],r)}),c=t.srAngleStartingSide({x:f(u[x],r),y:f(u[A],r)}),g=t.srAngleEndingSide({x:f(o[x],r),y:f(o[A],r)}),y=t.srAngleVertexWithAngleMeasure({x:f(l[x],r),y:f(l[A],r),angleMeasure:d});return{srAngleGraphAriaLabel:m,srAngleGraphAriaDescription:p,srAngleStartingSide:c,srAngleEndingSide:g,srAngleVertex:y}}const Gm=[1,0],_m=[-1,0],Vm=[0,1],Hm=[0,-1];function oi(n,e,t){const r=Mm(b.sub(n,e)),a=[n,b.add(n,_m)],i=[n,b.add(n,Gm)],o=[n,b.add(n,Vm)],l=[n,b.add(n,Hm)],u=r+t,d=r-t,m=[e,b.add(e,ii(1,u))],p=[e,b.add(e,ii(1,d))],c=Oe(a,m)??Oe(a,p),g=Oe(i,m)??Oe(i,p),y=Oe(o,m)??Oe(o,p),w=Oe(l,m)??Oe(l,p);return{up:y??n,down:w??n,left:c??n,right:g??n}}function $m(n,e){if(!n.hasBeenInteractedWith)return{...e};if(e.type==="linear-system"&&n.type==="linear-system")return{...e,coords:n.coords};if(n.type==="segment"&&e.type==="segment")return{...e,coords:n.coords};if(n.type==="linear"&&e.type==="linear")return{...e,coords:n.coords};if(n.type==="ray"&&e.type==="ray")return{...e,coords:n.coords};if(n.type==="polygon"&&e.type==="polygon")return n.numSides==="unlimited"&&!n.closedPolygon?{...e,coords:null}:{...e,coords:n.coords};if(n.type==="point"&&e.type==="point")return n.numPoints==="unlimited"&&n.coords.length===0?{...e,coords:null}:{...e,coords:n.coords};if(n.type==="circle"&&e.type==="circle")return{...e,center:n.center,radius:It(n)};if(n.type==="quadratic"&&e.type==="quadratic")return{...e,coords:n.coords};if(n.type==="sinusoid"&&e.type==="sinusoid")return{...e,coords:n.coords};if(n.type==="angle"&&e.type==="angle")return{...e,coords:n.coords,allowReflexAngles:n.allowReflexAngles};if(n.type==="none"&&e.type==="none")return{type:"none"};throw new Error("Mafs is not yet implemented for graph type: "+e.type)}function It(n){const[e,t]=n.center,[r,a]=n.radiusPoint;return Math.sqrt(Math.pow(r-e,2)+Math.pow(a-t,2))}function Um(n,e,t){return{graph:s.createElement(Zo,{graphState:n,dispatch:e}),interactiveElementsDescription:Km(n,t)}}function Zo(n){const{dispatch:e,graphState:t}=n,{center:r,radiusPoint:a,snapStep:i}=t,{strings:o,locale:l}=me(),[u,d]=s.useState("off"),m=It(t),p=s.useId(),c=p+"-circle",g=p+"-radius",y=p+"-outer-points",{srCircleGraph:w,srCircleShape:v,srCircleRadiusPoint:q,srCircleRadius:k,srCircleOuterPoints:P}=es(t,{strings:o,locale:l});return s.createElement("g",{"aria-label":w,"aria-describedby":`${c} ${g} ${y}`},s.createElement(Xm,{id:c,ariaLabel:v,ariaDescribedBy:`${g} ${y}`,center:r,radius:m,onMove:C=>{d("off"),e(O.circle.moveCenter(C))}}),s.createElement(we,{ariaLabel:`${q} ${k}`,ariaDescribedBy:`${y}`,ariaLive:u,point:a,sequenceNumber:1,cursor:"ew-resize",onMove:C=>{d("polite"),e(O.circle.moveRadiusPoint(C))},constrain:Jm(r,a,i)}),s.createElement("g",{id:g,style:H.srOnly},k),s.createElement("g",{id:y,style:H.srOnly},P))}function Xm(n){const{id:e,ariaLabel:t,ariaDescribedBy:r,center:a,radius:i,onMove:o}=n,{snapStep:l,disableKeyboardInteraction:u,interactiveColor:d}=Y(),[m,p]=s.useState(!1),c=s.useRef(null),{dragging:g}=mn({gestureTarget:c,point:a,onMove:o,constrainKeyboardMovement:v=>se(l,v)}),[y]=Q(a),[w]=Kd([i,i]);return s.createElement("g",{"aria-label":t,"aria-describedby":r,"aria-live":"polite",ref:c,role:"button",tabIndex:u?-1:0,className:`movable-circle ${g?"movable-circle--dragging":""}`,onFocus:()=>p(!0),onBlur:()=>p(!1)},s.createElement("ellipse",{className:"focus-ring",cx:y[x],cy:y[A],rx:w[x]+3,ry:w[A]+3}),s.createElement("ellipse",{id:e,className:"circle",cx:y[x],cy:y[A],rx:w[x],ry:w[A],stroke:d,"data-testid":"movable-circle__circle"}),s.createElement(zm,{center:a,dragging:g,focused:m}))}const Fn=[24,14],Ym=Bm([-4.4,0,4.4],[-2.1,2.1]);function zm(n){const{center:e,dragging:t,focused:r}=n,[a]=Q(e),{markings:i,interactiveColor:o}=Y(),l=Math.min(...Fn)/2,u=b.sub(a,b.scale(Fn,.5)),d=(t||r)&&i!=="none";return s.createElement(s.Fragment,null,d&&s.createElement($r,{point:e}),s.createElement("rect",{className:"movable-circle-handle",x:u[x],y:u[A],width:Fn[x],height:Fn[A],rx:l,ry:l,fill:o,"data-testid":"movable-circle__handle"}),Ym.map(m=>{const[p,c]=b.add(m,a);return s.createElement("circle",{key:`circle-${p}-${c}`,className:"movable-circle-handle-dot",cx:p,cy:c})}))}function Bm(n,e){const t=[];for(const r of n)for(const a of e)t.push([r,a]);return t}function Km(n,e){return es(n,e).srCircleInteractiveElement}const Jm=(n,e,t)=>{const r=a=>{let i=a(e);return b.dist(i,n)===0&&(i=a(i)),i};return{up:r(a=>b.add(a,[0,t[1]])),down:r(a=>b.sub(a,[0,t[1]])),left:r(a=>b.sub(a,[t[0],0])),right:r(a=>b.add(a,[t[0],0]))}};function es(n,e){const{strings:t,locale:r}=e,{center:a,radiusPoint:i}=n,o=It(n),l=i[x]>=a[x],u=t.srCircleGraph,d=t.srCircleShape({centerX:f(a[0],r),centerY:f(a[1],r)}),m=l?t.srCircleRadiusPointRight({radiusPointX:f(i[0],r),radiusPointY:f(i[1],r)}):t.srCircleRadiusPointLeft({radiusPointX:f(i[0],r),radiusPointY:f(i[1],r)}),p=t.srCircleRadius({radius:o}),c=t.srCircleOuterPoints({point1X:f(a[0]+o,r),point1Y:f(a[1],r),point2X:f(a[0],r),point2Y:f(a[1]+o,r),point3X:f(a[0]-o,r),point3Y:f(a[1],r),point4X:f(a[0],r),point4Y:f(a[1]-o,r)}),g=t.srInteractiveElements({elements:[d,p].join(" ")});return{srCircleGraph:u,srCircleShape:d,srCircleRadiusPoint:m,srCircleRadius:p,srCircleOuterPoints:c,srCircleInteractiveElement:g}}Zo.__docgenInfo={description:"",methods:[],displayName:"CircleGraph",props:{graphState:{required:!0,tsType:{name:"T"},description:""},dispatch:{required:!0,tsType:{name:"signature",type:"function",raw:"(action: InteractiveGraphAction) => unknown",signature:{arguments:[{type:{name:"union",raw:`| Reinitialize
| MovePointInFigure
| MoveLine
| MoveAll
| MovePoint
| MoveCenter
| MoveRadiusPoint
| ChangeSnapStep
| ChangeRange
| AddPoint
| RemovePoint
| FocusPoint
| BlurPoint
| DeleteIntent
| ClickPoint
| ClosePolygon
| OpenPolygon
| ChangeInteractionMode
| ChangeKeyboardInvitationVisibility`,elements:[{name:"Reinitialize"},{name:"MovePointInFigure"},{name:"MoveLine"},{name:"MoveAll"},{name:"MovePoint"},{name:"MoveCenter"},{name:"MoveRadiusPoint"},{name:"ChangeSnapStep"},{name:"ChangeRange"},{name:"AddPoint"},{name:"RemovePoint"},{name:"FocusPoint"},{name:"BlurPoint"},{name:"DeleteIntent"},{name:"ClickPoint"},{name:"ClosePolygon"},{name:"OpenPolygon"},{name:"ChangeInteractionMode"},{name:"ChangeKeyboardInvitationVisibility"}]},name:"action"}],return:{name:"unknown"}}},description:""}}};function Qm(n,e,t){return{graph:s.createElement(Zm,{graphState:n,dispatch:e}),interactiveElementsDescription:ec(n,t)}}const Zm=(n,e)=>{const{dispatch:t}=n,{coords:r}=n.graphState,{strings:a,locale:i}=me(),o=s.useId(),l=o+"-points",u=o+"-intercept",d=o+"-slope",{srLinearGraph:m,srLinearGraphPoints:p,srLinearGrabHandle:c,slopeString:g,interceptString:y}=ns(n.graphState,{strings:a,locale:i});return s.createElement("g",{"aria-label":m,"aria-describedby":`${l} ${u} ${d}`},s.createElement(Sn,{key:0,ariaLabels:{grabHandleAriaLabel:c},ariaDescribedBy:`${u} ${d}`,points:r,onMoveLine:w=>{t(O.linear.moveLine(w))},extend:{start:!0,end:!0},onMovePoint:(w,v)=>t(O.linear.movePoint(w,v))}),s.createElement("g",{id:l,style:H.srOnly},p),s.createElement("g",{id:u,style:H.srOnly},y),s.createElement("g",{id:d,style:H.srOnly},g))};function ec(n,e){return ns(n,e).srLinearInteractiveElement}function ns(n,e){const{coords:t}=n,{strings:r,locale:a}=e,i=r.srLinearGraph,o=r.srLinearGraphPoints({point1X:f(t[0][0],a),point1Y:f(t[0][1],a),point2X:f(t[1][0],a),point2Y:f(t[1][1],a)}),l=r.srLinearGrabHandle({point1X:f(t[0][0],a),point1Y:f(t[0][1],a),point2X:f(t[1][0],a),point2Y:f(t[1][1],a)}),u=yo(t,r),d=wo(t,r,a),m=r.srInteractiveElements({elements:[i,o].join(" ")});return{srLinearGraph:i,srLinearGraphPoints:o,srLinearGrabHandle:l,slopeString:u,interceptString:d,srLinearInteractiveElement:m}}function nc(n,e,t){return{graph:s.createElement(tc,{graphState:n,dispatch:e}),interactiveElementsDescription:rc(n,t)}}const tc=n=>{const{dispatch:e}=n,{coords:t}=n.graphState,{strings:r,locale:a}=me(),i=s.useId(),o=`${i}-intersection`,l=il(t[0],t[1]),u=l?r.srLinearSystemIntersection({x:f(l[0],a),y:f(l[1],a)}):r.srLinearSystemParallel,d=t.map((p,c)=>({pointsDescriptionId:`${i}-line${c+1}-points`,interceptDescriptionId:`${i}-line${c+1}-intercept`,slopeDescriptionId:`${i}-line${c+1}-slope`,pointsDescription:r.srLinearSystemPoints({lineNumber:c+1,point1X:f(p[0][0],a),point1Y:f(p[0][1],a),point2X:f(p[1][0],a),point2Y:f(p[1][1],a)}),interceptDescription:wo(p,r,a),slopeDescription:yo(p,r)})),m=d.map(({pointsDescriptionId:p,interceptDescriptionId:c,slopeDescriptionId:g})=>`${p} ${c} ${g}`).join(" ");return s.createElement("g",{"aria-label":r.srLinearSystemGraph,"aria-describedby":`${m} ${o}`},t==null?void 0:t.map((p,c)=>s.createElement(Sn,{key:c,points:p,ariaLabels:{point1AriaLabel:r.srLinearSystemPoint({lineNumber:c+1,pointSequence:1,x:f(p[0][0],a),y:f(p[0][1],a)}),point2AriaLabel:r.srLinearSystemPoint({lineNumber:c+1,pointSequence:2,x:f(p[1][0],a),y:f(p[1][1],a)}),grabHandleAriaLabel:r.srLinearSystemGrabHandle({lineNumber:c+1,point1X:f(p[0][0],a),point1Y:f(p[0][1],a),point2X:f(p[1][0],a),point2Y:f(p[1][1],a)})},ariaDescribedBy:`${d[c].interceptDescriptionId} ${d[c].slopeDescriptionId} ${o}`,onMoveLine:g=>{e(O.linearSystem.moveLine(c,g))},extend:{start:!0,end:!0},onMovePoint:(g,y)=>e(O.linearSystem.movePointInFigure(c,g,y))})),d.map(({pointsDescriptionId:p,interceptDescriptionId:c,slopeDescriptionId:g,pointsDescription:y,interceptDescription:w,slopeDescription:v})=>s.createElement(s.Fragment,null,s.createElement("g",{key:p,id:p,style:H.srOnly},y),s.createElement("g",{key:c,id:c,style:H.srOnly},w),s.createElement("g",{key:g,id:g,style:H.srOnly},v))),s.createElement("g",{id:o,style:H.srOnly},u))};function rc(n,e){const{strings:t,locale:r}=e,{coords:a}=n,i=t.srLinearSystemGraph,o=a.map((u,d)=>{const m=u[0],p=u[1];return t.srLinearSystemPoints({lineNumber:d+1,point1X:f(m[0],r),point1Y:f(m[1],r),point2X:f(p[0],r),point2Y:f(p[1],r)})}),l=[i,...o];return t.srInteractiveElements({elements:l.join(" ")})}function ac(n,e,t){return{graph:s.createElement(ic,{graphState:n,dispatch:e}),interactiveElementsDescription:lc(n,t)}}function ic(n){const{numPoints:e}=n.graphState,t=Y(),r=s.useRef([]),{range:[a,i]}=t,[[o,l]]=Q([a[0],i[1]]);s.useEffect(()=>{var m;const d=n.graphState.focusedPointIndex;d!=null&&((m=r.current[d])==null||m.focus())},[n.graphState.focusedPointIndex,n.graphState.coords.length,r]);const u={...n,graphConfig:t,pointsRef:r,top:l,left:o};return e==="unlimited"?sc(u):oc(u)}function oc(n){const{dispatch:e}=n;return s.createElement(s.Fragment,null,n.graphState.coords.map((t,r)=>s.createElement(we,{key:r,point:t,sequenceNumber:r+1,onMove:a=>e(O.pointGraph.movePoint(r,a))})))}function sc(n){const{dispatch:e,graphConfig:t,pointsRef:r,top:a,left:i}=n,{coords:o}=n.graphState,{graphDimensionsInPixels:l}=t,u=l[0],d=l[1];return s.createElement(s.Fragment,null,s.createElement("rect",{style:{fill:"rgba(0,0,0,0)",cursor:"crosshair"},width:u,height:d,x:i,y:a,onClick:m=>{const p=m.currentTarget.getBoundingClientRect(),c=m.clientX-p.x,g=m.clientY-p.y,y=io([[c,g]],t);e(O.pointGraph.addPoint(y[0]))}}),o.map((m,p)=>s.createElement(we,{key:p,point:m,sequenceNumber:p+1,onMove:c=>e(O.pointGraph.movePoint(p,c)),ref:c=>{r.current[p]=c},onFocus:()=>{e(O.pointGraph.focusPoint(p))},onClick:()=>{e(O.pointGraph.clickPoint(p))}})))}function lc(n,e){const{strings:t,locale:r}=e;if(n.coords.length===0)return t.srNoInteractiveElements;const a=n.coords.map(([i,o],l)=>t.srPointAtCoordinates({num:l+1,x:f(i,r),y:f(o,r)}));return t.srInteractiveElements({elements:a.join(" ")})}const{magnitude:uc,vector:dc}=At;function cr(n){const{graph:e,step:t,snapStep:r,range:a}=n,i={hasBeenInteractedWith:!1,range:a,snapStep:r};switch(e.type){case"segment":return{...i,type:"segment",coords:cc(e,a,t)};case"linear":return{...i,type:e.type,coords:si(e,a,t)};case"ray":return{...i,type:e.type,coords:si(e,a,t)};case"linear-system":return{...i,type:e.type,coords:pc(e,a,t)};case"polygon":return{...i,type:"polygon",numSides:e.numSides||0,showAngles:!!e.showAngles,showSides:!!e.showSides,coords:gc(e,a,t),snapTo:e.snapTo??"grid",focusedPointIndex:null,showRemovePointButton:!1,interactionMode:"mouse",showKeyboardInteractionInvitation:!1,closedPolygon:!1};case"point":return{...i,type:e.type,coords:mc(e,a,t),numPoints:e.numPoints||0,focusedPointIndex:null,showRemovePointButton:!1,interactionMode:"mouse",showKeyboardInteractionInvitation:!1};case"circle":return{...i,type:e.type,...wc(e)};case"quadratic":return{...i,type:e.type,coords:yc(e,a,t)};case"sinusoid":return{...i,type:e.type,coords:hc(e,a,t)};case"angle":return{...i,type:e.type,showAngles:!!e.showAngles,coords:fc({graph:e,range:a,step:t}),angleOffsetDeg:Number(e.angleOffsetDeg),allowReflexAngles:!!e.allowReflexAngles,snapDegrees:Number(e.snapDegrees)};case"none":return{...i,type:"none"};default:throw new fe(e)}}function mc(n,e,t){var l,u;const r=n.numPoints||1;let a=(l=n.coords)==null?void 0:l.slice();if(a)return a;const i=(u=n.startCoords)==null?void 0:u.slice();if(i)return i;switch(r){case 1:a=[n.coord||[0,0]];break;case 2:a=[[-5,0],[5,0]];break;case 3:a=[[-5,0],[0,0],[5,0]];break;case 4:a=[[-6,0],[-2,0],[2,0],[6,0]];break;case 5:a=[[-6,0],[-3,0],[0,0],[3,0],[6,0]];break;case 6:a=[[-5,0],[-3,0],[-1,0],[1,0],[3,0],[5,0]];break;default:a=[];break}const o=_r(a,[[-10,10],[-10,10]]);return Ge(e,t,o)}function cc(n,e,t){if(n.coords)return n.coords;if(n.startCoords)return n.startCoords;const r=i=>{switch(i){case 2:return[5,-5];case 3:return[5,0,-5];case 4:return[6,2,-2,-6];case 5:return[6,3,0,-3,-6];case 6:return[5,3,1,-1,-3,-5];default:return[5]}},a=[[-10,10],[-10,10]];return r(n.numSegments).map(i=>{let o=[[-5,i],[5,i]];return o=_r(o,a),o=Ge(e,t,o),o})}const ts=[[[.25,.75],[.75,.75]],[[.25,.25],[.75,.25]]];function si(n,e,t){return n.coords?n.coords:n.startCoords?n.startCoords:Ge(e,t,ts[0])}function pc(n,e,t){return n.coords?n.coords:n.startCoords?n.startCoords:ts.map(r=>Ge(e,t,r))}function gc(n,e,t){var l,u;let r=(l=n.coords)==null?void 0:l.slice();if(r)return r;const a=(u=n.startCoords)==null?void 0:u.slice();if(a)return a;const i=n.numSides||3;if(i==="unlimited")r=[];else{const d=2*Math.PI/i,m=(1/i-1/2)*Math.PI,p=n.snapTo==="sides"?Math.sqrt(3)/3*7:4;r=[...Array(i).keys()].map(c=>[p*Math.cos(c*d+m),p*Math.sin(c*d+m)])}r=_r(r,[[-10,10],[-10,10]]);const o=!["angles","sides"].includes(n.snapTo||"");return r=Ge(e,t,r,!o),r}function hc(n,e,t){if(n.coords)return[n.coords[0],n.coords[1]];if(n.startCoords)return[n.startCoords[0],n.startCoords[1]];let r=[[.5,.5],[.65,.6]];return r=Ge(e,t,r,!0),r}function yc(n,e,t){return n.coords?n.coords:n.startCoords?n.startCoords:Ge(e,t,[[.25,.75],[.5,.25],[.75,.75]],!0)}function wc(n){var e;return n.center!=null&&n.radius!=null?{center:n.center,radiusPoint:b.add(n.center,[n.radius,0])}:(e=n.startCoords)!=null&&e.center&&n.startCoords.radius?{center:n.startCoords.center,radiusPoint:b.add(n.startCoords.center,[n.startCoords.radius,0])}:{center:[0,0],radiusPoint:[2,0]}}const fc=n=>{const{graph:e,range:t,step:r}=n;if(e.coords)return e.coords;if(e.startCoords)return e.startCoords;const{snapDegrees:a,angleOffsetDeg:i}=e,o=a||1;let l=o;for(;l<20;)l+=o;l=l*Math.PI/180;const u=(i||0)*Math.PI/180;let d=[[.85,.5],[.5,.5]];d=Ge(t,r,d,!0);const m=uc(dc(...d)),p=[...d,[0,0]];return p[0]=[p[1][0]+m*Math.cos(u),p[1][1]+m*Math.sin(u)],p[2]=[p[1][0]+m*Math.cos(l+u),p[1][1]+m*Math.sin(l+u)],p},{getAngleFromVertex:Nt,getClockwiseAngle:bc,polar:Ur}=We,{angleMeasures:vc,ccw:rs,lawOfCosines:kc,magnitude:as,polygonSidesIntersect:xc,reverseVector:qc,sign:is,vector:os}=At,{getQuadraticCoefficients:Pc}=sl,pr=2;function Ac(n,e){switch(e.type){case $o:return cr(e.params);case Wo:return Mc(n,e);case To:return Lc(n,e);case jo:return Dc(n,e);case Fo:return jc(n,e);case Go:return Fc(n,e);case _o:return Wc(n,e);case Vo:return Gc(n,e);case Ho:return _c(n,e);case Ro:return Vc(n,e);case Io:return ss(n,e);case No:return Tc(n,e);case Eo:return Rc(n);case Co:return Cc(n);case So:return Ic(n,e);case Lo:return Nc(n);case Do:return Ec(n);case Oo:return Sc(n,e);case Mo:return Oc(n,e);default:throw new fe(e)}}function Cc(n,e){return de(n)&&n.focusedPointIndex!==null?ss(n,O.pointGraph.removePoint(n.focusedPointIndex)):n}function Tc(n,e){switch(n.type){case"polygon":case"point":return{...n,focusedPointIndex:e.index};default:return n}}function Rc(n,e){switch(n.type){case"polygon":case"point":const t={...n,showRemovePointButton:!1};return n.interactionMode==="mouse"&&(t.focusedPointIndex=null),t;default:return n}}function Ic(n,e){return de(n)?{...n,focusedPointIndex:e.index,showRemovePointButton:!0}:n}function Nc(n){if(de(n)&&n.type==="polygon"){const e=Vr(n.coords);return{...n,coords:e,closedPolygon:!0}}return n}function Ec(n){return de(n)&&n.type==="polygon"?{...n,closedPolygon:!1}:n}function Sc(n,e){if(de(n)){const t=e.mode==="keyboard"?!1:n.showKeyboardInteractionInvitation;return{...n,interactionMode:e.mode,showKeyboardInteractionInvitation:t}}return n}function Oc(n,e){return de(n)?{...n,showKeyboardInteractionInvitation:e.shouldShow,hasBeenInteractedWith:!0}:n}function Mc(n,e){switch(n.type){case"segment":case"linear-system":{const t=Zc({array:n.coords,index:e.figureIndex,update:a=>Ie({array:a,index:e.pointIndex,newValue:Xe(e.destination,n)})}),r=t[e.figureIndex];return Qc(r)?n:{...n,hasBeenInteractedWith:!0,coords:t}}case"linear":case"ray":{const t=Ie({array:n.coords,index:e.pointIndex,newValue:Xe(e.destination,n)});return{...n,hasBeenInteractedWith:!0,coords:t}}case"angle":case"circle":throw new Error("FIXME implement circle reducer");case"none":case"point":case"polygon":case"quadratic":case"sinusoid":throw new Error(`Don't use movePointInFigure for ${n.type} graphs. Use movePoint instead!`);default:throw new fe(n)}}function Lc(n,e){const{snapStep:t,range:r}=n;switch(n.type){case"segment":case"linear-system":{if(e.itemIndex===void 0)throw new Error("Please provide index of line to move");const a=n.coords[e.itemIndex];if(!a)throw new Error("No line to move");const i=nt(a,e.delta,{snapStep:t,range:r}),o=[se(t,b.add(a[0],i)),se(t,b.add(a[1],i))],l=Ie({array:n.coords,index:e.itemIndex,newValue:o});return{...n,type:n.type,hasBeenInteractedWith:!0,coords:l}}case"linear":case"ray":{const a=n.coords,i=nt(a,e.delta,{snapStep:t,range:r}),o=[se(t,b.add(a[0],i)),se(t,b.add(a[1],i))];return{...n,type:n.type,hasBeenInteractedWith:!0,coords:o}}default:return n}}function Dc(n,e){const{snapStep:t,range:r}=n;switch(n.type){case"polygon":{let a;if(n.snapTo==="sides"||n.snapTo==="angles"){const i=nt(n.coords,e.delta,{snapStep:[0,0],range:r});a=n.coords.map(o=>b.add(o,i))}else{const i=nt(n.coords,e.delta,{snapStep:t,range:r});a=n.coords.map(o=>se(t,b.add(o,i)))}return{...n,hasBeenInteractedWith:!0,coords:a}}default:return n}}function jc(n,e){switch(n.type){case"angle":const t=(()=>{if(e.index===1){const o=$c(n,e);return{...n,hasBeenInteractedWith:!0,coords:o}}return{...n,hasBeenInteractedWith:!0,coords:Ie({array:n.coords,index:e.index,newValue:Xc(e.destination,n,e.index)})}})();return Yc(t)?n:t;case"polygon":let r;n.snapTo==="sides"?r=Bc(e.destination,n,e.index):n.snapTo==="angles"?r=zc(e.destination,n,e.index):r=Xe(e.destination,n);const a=Ie({array:n.coords,index:e.index,newValue:r});return!(n.numSides==="unlimited"&&!n.closedPolygon)&&xc(a)?n:{...n,hasBeenInteractedWith:!0,coords:a};case"point":return{...n,hasBeenInteractedWith:!0,focusedPointIndex:e.index,coords:Ie({array:n.coords,index:e.index,newValue:Xe(e.destination,n)})};case"sinusoid":{const o=e.destination,l=Xe(o,n),u=[...n.coords];return u[e.index]=l,u[0][x]===u[1][x]?n:{...n,hasBeenInteractedWith:!0,coords:Ie({array:n.coords,index:e.index,newValue:l})}}case"quadratic":{const o=[...n.coords],l=Xe(e.destination,n);return o[e.index]=l,Pc(o)===void 0?n:{...n,hasBeenInteractedWith:!0,coords:Ie({array:n.coords,index:e.index,newValue:l})}}default:throw new Error("The movePoint action is only for point, quadratic, and polygon graphs")}}function Fc(n,e){switch(n.type){case"circle":{const t=Xe(e.destination,n),r=[...b.add(n.radiusPoint,b.sub(t,n.center))],[a,i]=n.range[x],[o]=r;if(o<a||o>i){const l=(o-t[x])*2,u=o-l;u>=a&&u<=i&&(r[x]=u)}return{...n,hasBeenInteractedWith:!0,center:t,radiusPoint:r}}default:throw new Error("The doMoveCenter action is only for circle graphs")}}function Wc(n,e){switch(n.type){case"circle":{const[t,r]=n.range[x],a=se(n.snapStep,[ln(e.destination[x]+0,t,r),n.center[1]]);return h.isEqual(a,n.center)?n:{...n,hasBeenInteractedWith:!0,radiusPoint:a}}default:throw new Error("The doMoveRadiusPoint action is only for circle graphs")}}function Gc(n,e){return h.isEqual(n.snapStep,e.snapStep)?n:{...n,snapStep:e.snapStep}}function _c(n,e){return h.isEqual(n.range,e.range)?n:{...n,range:e.range}}function Vc(n,e){if(!de(n))return n;const{snapStep:t}=n,r=se(t,e.location);for(const i of n.coords)if(i[x]===r[x]&&i[A]===r[A])return n;const a=[...n.coords,r];return{...n,hasBeenInteractedWith:!0,coords:a,showRemovePointButton:!0,focusedPointIndex:a.length-1}}function ss(n,e){if(!de(n))return n;const t=n.coords.length>1?n.coords.length-2:null;return{...n,coords:n.coords.filter((r,a)=>a!==e.index),focusedPointIndex:t,showRemovePointButton:t!==null}}const Hc=(n,e,t)=>{const[r,a]=t,i=Math.min(...n.map(p=>p[x])),o=Math.min(...n.map(p=>p[A])),l=Math.max(...e.map(p=>p[x])),u=Math.max(...e.map(p=>p[A])),d=ln(r,l,i),m=ln(a,u,o);return[d,m]},nt=(n,e,t)=>{const r=n.map(l=>Kc({...t,point:l})),a=n.map(l=>Jc({...t,point:l})),[i,o]=Hc(r,a,e);return[i,o]};function $n(n,e){return n<e||jt(n,e)}function Xe(n,{snapStep:e,range:t}){return se(e,_e({snapStep:e,range:t,point:n}))}function $c({range:n,coords:e,snapStep:t},{destination:r}){const a=[...e],i=a[1],o=b.add(t,[pr,pr]),l=eo(Wr(o,n),se(t,r)),u=b.add(l,qc(i)),d={};for(const m of[0,2]){const p=a[m];let c=b.add(p,u),g=Nt(l,c);g*=Math.PI/180,c=Uc(c,g,n,t),d[m]=c}return d[1]=l,Object.entries(d).forEach(([m,p])=>{a[m]=p}),a}function li(n,e,t){return b.dist(n,e)<2}function Uc(n,e,t,r){const a=[t[0][0]+r[0],t[1][0]+r[0]],i=[t[0][1]-r[1],t[1][1]-r[1]];let o=n;return o[0]<a[0]?o=[a[0],o[1]+(a[0]-o[0])*Math.tan(e)]:o[0]>i[0]&&(o=[i[0],o[1]-(o[0]-i[0])*Math.tan(e)]),o[1]<a[1]?o=[o[0]+(a[1]-o[1])/Math.tan(e),a[1]]:o[1]>i[1]&&(o=[o[0]-(o[1]-i[1])/Math.tan(e),i[1]]),o}function Xc(n,{range:e,coords:t,snapDegrees:r,angleOffsetDeg:a,snapStep:i},o){const l=r||1,u=a||0,d=[...t],m=[[e[0][0]+i[0],e[0][1]-i[0]],[e[1][0]+i[1],e[1][1]-i[1]]],p=_e({snapStep:[0,0],range:m,point:n});d[o]=p;const c=t[1];let g=Nt(d[o],c);g=Math.round((g-u)/l)*l+u;const y=pr+.01,w=Math.max(b.dist(d[o],c),y);return b.add(c,Ur(w,g))}function Yc(n){return li(n.coords[0],n.coords[1],n.range)||li(n.coords[2],n.coords[1],n.range)}function zc(n,{range:e,coords:t},r){const a=t[r];return ls(n,e,t,r,a)}function ls(n,e,t,r,a){const i=[...t];i[r]=_e({snapStep:[0,0],range:e,point:n});const o=vc(i).map(w=>w*180/Math.PI),l=w=>(r+w+i.length)%i.length;h.each([-1,1],function(w){o[l(w)]=Math.round(o[l(w)])});const u=function(w,v,q){return bc([i[l(w)],i[l(v)],i[l(q)]])},d=[o[l(-1)]-u(-2,-1,1),o[l(1)]-u(-1,1,2)];if(d[2]=180-(d[0]+d[1]),d.some(function(w){return $n(w,1)}))return a;const m=as(os(i[l(-1)],i[l(1)])),p=is(rs(i[l(-1)],i[l(1)],i[r]))===1,c=Math.sin(d[1]*Math.PI/180)/Math.sin(d[2]*Math.PI/180)*m,g=Nt(i[l(1)],i[l(-1)]),y=Ur(c,g+(p?1:-1)*d[0]);return Tn(i[l(-1)],y)}function Bc(n,{range:e,coords:t},r){const a=t[r];return us(n,e,t,r,a)}function us(n,e,t,r,a){const i=_e({snapStep:[0,0],range:e,point:n}),o=c=>(r+c+t.length)%t.length,l=h.map([[t[o(-1)],i],[i,t[o(1)]],[t[o(-1)],t[o(1)]]],function(c){return as(os(...c))});if(h.each([0,1],function(c){l[c]=Math.round(l[c])}),$n(l[1]+l[2],l[0])||$n(l[0]+l[2],l[1])||$n(l[0]+l[1],l[2]))return a;const u=kc(l[0],l[2],l[1]),d=Nt(t[o(1)],t[o(-1)]),m=is(rs(t[o(-1)],t[o(1)],i))===1,p=Ur(l[0],d+(m?1:-1)*u);return Tn(t[o(-1)],p)}function Kc({snapStep:n,range:e,point:t}){const r=_e({snapStep:n,range:e,point:[1/0,1/0]});return b.sub(r,t)}function Jc({snapStep:n,range:e,point:t}){const r=_e({snapStep:n,range:e,point:[-1/0,-1/0]});return b.sub(r,t)}const Qc=n=>n.some((e,t)=>n.some((r,a)=>t!==a&&ol(e,r)));function Zc(n){const{array:e,index:t,update:r}=n,a=r(e[t]);return Ie({array:e,index:t,newValue:a})}function Ie(n){const{array:e,index:t,newValue:r}=n,a=[...e];return a[t]=r,a}const{convertRadiansToDegrees:ds}=We;function ep(n,e,t,r){return{graph:s.createElement(np,{graphState:n,dispatch:e}),interactiveElementsDescription:ap(n,t,r)}}const np=n=>{const{dispatch:e}=n,{numSides:t,coords:r,snapStep:a,snapTo:i="grid"}=n.graphState,o=Y(),l=s.useRef(null),u=s.useRef([]),d=s.useRef(0),{range:[m,p]}=o,[[c,g]]=Q([m[0],p[1]]),y=r??[[0,0]],w=y[0],v=op(a,i),{dragging:q}=mn({gestureTarget:l,point:w,onMove:S=>{const R=b.sub(S,w);e(O.polygon.moveAll(R))},constrainKeyboardMovement:v}),[k,P]=s.useState(!1),[C,I]=s.useState(!1);s.useEffect(()=>{var R;const S=n.graphState.focusedPointIndex;S!=null&&((R=u.current[S])==null||R.focus())},[n.graphState.focusedPointIndex,n.graphState.coords.length,u]),s.useEffect(()=>{t==="unlimited"&&n.graphState.coords.length>2&&e(O.polygon.closePolygon())},[]);const E={...n,graphConfig:o,polygonRef:l,pointsRef:u,lastMoveTimeRef:d,left:c,top:g,dragging:q,points:y,hovered:k,setHovered:P,focusVisible:C,setFocusVisible:I};return t==="unlimited"?s.createElement(tp,{...E}):s.createElement(ms,{...E})},ms=n=>{const{dispatch:e,hovered:t,setHovered:r,focusVisible:a,setFocusVisible:i,graphConfig:o,polygonRef:l,lastMoveTimeRef:u,dragging:d,points:m}=n,{showAngles:p,showSides:c,range:g,snapTo:y="grid",snapStep:w}=n.graphState,{disableKeyboardInteraction:v,interactiveColor:q}=o,{strings:k,locale:P}=me(),C=s.useId(),I=Array(m.length).fill("off"),[E,S]=s.useState(["off",...I]),R=rp(m),F=C+"-points-num",N=C+"-points",{srPolygonGraph:z,srPolygonGraphPointsNum:ee,srPolygonGraphPoints:$,srPolygonElementsNum:be}=Xr(n.graphState,{strings:k,locale:P},n.graphConfig.markings);return s.createElement("g",{"aria-label":z,"aria-describedby":`${F} ${N}`},s.createElement(_t,{points:[...m],color:q,svgPolygonProps:{strokeWidth:a?"var(--movable-line-stroke-weight-active)":"var(--movable-line-stroke-weight)",style:{fill:"transparent"},"aria-hidden":!0}}),m.map((ie,U)=>{const B=m.at(U-1),pe=m[(U+1)%m.length];return!B||!pe?null:s.createElement(Yo,{key:"angle-"+U,centerPoint:ie,endPoints:[B,pe],range:g,polygonLines:R,showAngles:!!p,snapTo:y})}),c&&R.map(([ie,U],B)=>{const[pe,Pe]=b.midpoint(ie,U),Ee=b.dist(ie,U),Ae=!Number.isInteger(Ee);return s.createElement(Rt,{key:"side-"+B,x:pe,y:Pe},Ae?`≈ ${Ee.toFixed(y==="sides"?0:1)}`:Ee)}),s.createElement(_t,{points:[...m],color:"transparent",svgPolygonProps:{ref:l,tabIndex:v?-1:0,strokeWidth:Gr,style:{cursor:d?"grabbing":"grab",fill:t?"var(--mafs-blue)":"transparent"},onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onKeyDownCapture:()=>{i(Lt(l.current))},onFocus:()=>{i(Lt(l.current)),S(()=>["polite",...I])},onBlur:()=>i(Lt(l.current)),className:"movable-polygon",role:"button","aria-label":$?`${be} ${$}`:be,"aria-live":E[0]}}),m.map((ie,U)=>{const B=`${C}-angle-${U}`,pe=`${C}-point-${U}-side-1`,Pe=`${C}-point-${U}-side-2`,Ee=bo(m,U),Ae=Ee?ds(Ee):null,ma=vo(m,U),{pointIndex:Ds,sideLength:js}=ma[0],{pointIndex:Fs,sideLength:Ws}=ma[1];return s.createElement("g",{key:"point-"+U},s.createElement(we,{ariaDescribedBy:`${B} ${pe} ${Pe}`,ariaLive:E[U+1],constrain:ip(m,U,g,w,y),point:ie,sequenceNumber:U+1,onMove:On=>{const ca=Date.now(),Gs=1e3/40;ca-u.current>Gs&&(e(O.polygon.movePoint(U,On)),u.current=ca)},onFocus:()=>{const On=[...I];On[U]="polite",S(["off",...On])}}),Ae&&s.createElement("g",{id:B},Number.isInteger(Ae)?k.srPolygonPointAngle({angle:Ae}):k.srPolygonPointAngleApprox({angle:f(Ae,P,1)})),s.createElement("g",{id:pe},ur(js,Ds,k,P)),s.createElement("g",{id:Pe},ur(Ws,Fs,k,P)))}),s.createElement("g",{id:F,style:H.srOnly},ee),$&&s.createElement("g",{id:N,style:H.srOnly},$))},tp=n=>{const{dispatch:e,graphConfig:t,left:r,top:a,pointsRef:i,points:o}=n,{coords:l,closedPolygon:u}=n.graphState,{strings:d,locale:m}=me(),{interactiveColor:p}=Y(),c=s.useId(),g=c+"-points-num",y=c+"-points",w=Array(o.length).fill("off"),[v,q]=s.useState(w);if(u){const F={...n,numSides:l.length};return s.createElement(ms,{...F})}const{graphDimensionsInPixels:k}=t,P=k[0],C=k[1],I=l.length===0,{srPolygonGraph:E,srPolygonGraphPointsNum:S,srPolygonGraphPoints:R}=Xr(n.graphState,{strings:d,locale:m},n.graphConfig.markings);return s.createElement("g",{"aria-label":I?d.srUnlimitedPolygonEmpty:E,"aria-describedby":`${g} ${y}`},s.createElement(Ml,{points:[...o],color:p,svgPolylineProps:{strokeWidth:"var(--movable-line-stroke-weight)",style:{fill:"transparent"},"aria-hidden":!0}}),s.createElement("rect",{"aria-hidden":!0,style:{fill:"rgba(0,0,0,0)",cursor:"crosshair"},width:P,height:C,x:r,y:a,onClick:F=>{const N=F.currentTarget.getBoundingClientRect(),z=F.clientX-N.x,ee=F.clientY-N.y,$=io([[z,ee]],t);e(O.polygon.addPoint($[0]))}}),l.map((F,N)=>{const z=`${c}-angle-${N}`;let ee="";const be=N>0&&N<l.length-1?bo(o,N):null,ie=be?ds(be):null,U=vo(o,N,!0);for(let B=0;B<U.length;B++)ee+=`${c}-point-${N}-side-${B} `;return s.createElement("g",{key:"point-"+N},s.createElement(we,{ariaDescribedBy:`${z} ${ee}`,ariaLive:v[N],point:F,sequenceNumber:N+1,onMove:B=>e(O.polygon.movePoint(N,B)),ref:B=>{i.current[N]=B},onFocus:()=>{e(O.polygon.focusPoint(N));const B=[...w];B[N]="polite",q([...B])},onClick:()=>{N===0&&Vr(l).length>=3&&e(O.polygon.closePolygon()),e(O.polygon.clickPoint(N))}}),ie&&s.createElement("g",{id:z},Number.isInteger(ie)?d.srPolygonPointAngle({angle:ie}):d.srPolygonPointAngleApprox({angle:f(ie,m,1)})),U.map(({pointIndex:B,sideLength:pe},Pe)=>s.createElement("g",{key:`${c}-point-${N}-side-${Pe}`,id:`${c}-point-${N}-side-${Pe}`},ur(pe,B,d,m))))}),l.length>0&&s.createElement("g",{id:g,style:H.srOnly},S),R&&s.createElement("g",{id:y,style:H.srOnly},R))};function rp(n){return n.map((e,t)=>{const r=n[(t+1)%n.length];return[e,r]})}const Lt=n=>{const e=t=>(n==null?void 0:n.matches(t))??!1;try{return e(":focus-visible")}catch{return e(":focus")}};function ap(n,e,t){return Xr(n,e,t).srPolygonInteractiveElements}function Xr(n,e,t){const{strings:r,locale:a}=e,{coords:i}=n,o=t==="axes"||t==="graph",l=i.length===1,u=o?r.srPolygonGraphCoordinatePlane:r.srPolygonGraph,d=l?r.srPolygonGraphPointsOne:r.srPolygonGraphPointsNum({num:i.length});let m;o&&(m=i.map((y,w)=>r.srPointAtCoordinates({num:w+1,x:f(y[0],a),y:f(y[1],a)})).join(" "));const p=l?r.srPolygonElementsOne:r.srPolygonElementsNum({num:i.length}),c=i.length>0?r.srInteractiveElements({elements:[p,m].join(" ")}):null;return{srPolygonGraph:u,srPolygonGraphPointsNum:d,srPolygonGraphPoints:m,srPolygonElementsNum:p,srPolygonInteractiveElements:c}}function ip(n,e,t,r,a){switch(a){case"grid":return i=>se(r,i);case"sides":return sp(n,e,t);case"angles":return lp(n,e,t);default:throw new fe(a)}}function op(n,e){switch(e){case"grid":return t=>se(n,t);case"sides":case"angles":return t=>t;default:throw new fe(e)}}function sp(n,e,t){const r=[...n],a=r[e],i=o=>{let l=o(a),u=a;for(;u[0]===a[0]&&u[1]===a[1]&&no({range:t,point:l});)u=us(l,t,r,e,a),l=o(l);return u};return{up:i(o=>b.add(o,[0,1])),down:i(o=>b.sub(o,[0,1])),left:i(o=>b.sub(o,[1,0])),right:i(o=>b.add(o,[1,0]))}}function lp(n,e,t){const r=[...n],a=r[e],i=o=>{let l=_e({snapStep:[0,0],range:t,point:o(a)}),u=a;for(;u[0]===a[0]&&u[1]===a[1]&&no({range:t,point:l});)u=ls(l,t,r,e,a),l=o(l);return u};return{up:i(o=>b.add(o,[0,.1])),down:i(o=>b.sub(o,[0,.1])),left:i(o=>b.sub(o,[.1,0])),right:i(o=>b.add(o,[.1,0]))}}function up(n,e,t){return{graph:s.createElement(dp,{graphState:n,dispatch:e}),interactiveElementsDescription:mp(n,t)}}function dp(n){const{dispatch:e,graphState:t}=n,{coords:r,snapStep:a}=t,{interactiveColor:i}=Y(),{strings:o,locale:l}=me(),u=s.useId(),d=u+"-direction",m=u+"-vertex",p=u+"-intercepts",c=s.useRef([0,0,0]),g=cs(r);g!==void 0&&(c.current=g);const[y,w,v]=c.current,q=S=>(y*S+w)*S+v,{srQuadraticGraph:k,srQuadraticDirection:P,srQuadraticVertex:C,srQuadraticXIntercepts:I,srQuadraticYIntercept:E}=ps(t,{strings:o,locale:l});return s.createElement("g",{"aria-label":k,"aria-describedby":`${d} ${m} ${p}`},s.createElement(Yn.OfX,{y:q,color:i,svgPathProps:{"aria-hidden":!0}}),r.map((S,R)=>{const F=um(R+1,S,o,l),N=C?` ${C}`:"";return s.createElement(we,{key:"point-"+R,ariaLabel:`${F}${N}`,point:S,sequenceNumber:R+1,constrain:cp(r,a,R),onMove:z=>e(O.quadratic.movePoint(R,z))})}),P&&s.createElement("g",{id:d,style:H.srOnly},P),C&&s.createElement("g",{id:m,style:H.srOnly},C),s.createElement("g",{id:p,style:H.srOnly},I?`${I} ${E}`:`${E}`))}const cs=n=>{const e=n[0],t=n[1],r=n[2],a=(e[0]-t[0])*(e[0]-r[0])*(t[0]-r[0]);if(a===0)return;const i=(r[0]*(t[1]-e[1])+t[0]*(e[1]-r[1])+e[0]*(r[1]-t[1]))/a,o=(r[0]*r[0]*(e[1]-t[1])+t[0]*t[0]*(r[1]-e[1])+e[0]*e[0]*(t[1]-r[1]))/a,l=(t[0]*r[0]*(t[0]-r[0])*e[1]+r[0]*e[0]*(r[0]-e[0])*t[1]+e[0]*t[0]*(e[0]-t[0])*r[1])/a;return[i,o,l]};function mp(n,e){return ps(n,e).srQuadraticInteractiveElements}function ps(n,e){const{strings:t,locale:r}=e,a=cs(n.coords),[i,o,l]=a??[0,0,0],u=[-o/(2*i),l-o*o/(4*i)],d=dm(i,o,l),m=t.srQuadraticGraph,p=t.srQuadraticFaceUp,c=t.srQuadraticFaceDown,g=i===0?void 0:i>0?p:c,y=i!==0?lm(u,t):void 0,w=d.length===2?t.srQuadraticTwoXIntercepts({intercept1:f(d[0],r),intercept2:f(d[1],r)}):d.length===1?t.srQuadraticOneXIntercept({intercept:f(d[0],r)}):void 0,v=t.srQuadraticYIntercept({intercept:f(l,r)}),q=t.srInteractiveElements({elements:t.srQuadraticInteractiveElements({point1X:f(n.coords[0][0],r),point1Y:f(n.coords[0][1],r),point2X:f(n.coords[1][0],r),point2Y:f(n.coords[1][1],r),point3X:f(n.coords[2][0],r),point3Y:f(n.coords[2][1],r)})});return{srQuadraticGraph:m,srQuadraticDirection:g,srQuadraticVertex:y,srQuadraticXIntercepts:w,srQuadraticYIntercept:v,srQuadraticInteractiveElements:q}}const cp=(n,e,t)=>{const r=[n[0],n[1],n[2]],a=r[t],i=o=>{let l=o(a);return r[t]=l,ui(r)||(l=o(l),r[t]=l,ui(r))?l:o(l)};return{up:b.add(a,[0,e[1]]),down:b.sub(a,[0,e[1]]),left:i(o=>b.sub(o,[e[0],0])),right:i(o=>b.add(o,[e[0],0]))}},ui=n=>{const e=n[0],t=n[1],r=n[2];return!(e[0]===t[0]||t[0]===r[0]||e[0]===r[0])};function pp(n,e,t){return{graph:s.createElement(gp,{graphState:n,dispatch:e}),interactiveElementsDescription:hp(n,t)}}const gp=n=>{const{dispatch:e}=n,{coords:t}=n.graphState,r=y=>e(O.ray.moveRay(y)),a=(y,w)=>e(O.ray.movePoint(y,w)),{strings:i,locale:o}=me(),u=s.useId()+"-points",{srRayGraph:d,srRayPoints:m,srRayEndpoint:p,srRayTerminalPoint:c,srRayGrabHandle:g}=gs(n.graphState,{strings:i,locale:o});return s.createElement("g",{"aria-label":d,"aria-describedby":u},s.createElement(Sn,{points:t,ariaLabels:{point1AriaLabel:p,point2AriaLabel:c,grabHandleAriaLabel:g},onMoveLine:r,onMovePoint:a,extend:{start:!1,end:!0}}),s.createElement("g",{id:u,style:H.srOnly},m))};function hp(n,e){return gs(n,e).srRayInteractiveElement}function gs(n,e){const{coords:t}=n,{strings:r,locale:a}=e,i=r.srRayGraph,o=r.srRayPoints({point1X:f(t[0][0],a),point1Y:f(t[0][1],a),point2X:f(t[1][0],a),point2Y:f(t[1][1],a)}),l=r.srRayEndpoint({x:f(t[0][0],a),y:f(t[0][1],a)}),u=r.srRayTerminalPoint({x:f(t[1][0],a),y:f(t[1][1],a)}),d=r.srRayGrabHandle({point1X:f(t[0][0],a),point1Y:f(t[0][1],a),point2X:f(t[1][0],a),point2Y:f(t[1][1],a)}),m=r.srInteractiveElements({elements:[i,o].join(" ")});return{srRayGraph:i,srRayPoints:o,srRayEndpoint:l,srRayTerminalPoint:u,srRayGrabHandle:d,srRayInteractiveElement:m}}function yp(n,e,t){return{graph:s.createElement(wp,{graphState:n,dispatch:e}),interactiveElementsDescription:bp(n,t)}}const wp=({dispatch:n,graphState:e})=>{const{coords:t}=e,{strings:r,locale:a}=me(),i=s.useId(),o=i+"-length",l=i+"-whole-graph";function u(){return(t==null?void 0:t.length)>1?r.srMultipleSegmentGraphAriaLabel({countOfSegments:t.length}):r.srSingleSegmentGraphAriaLabel}const d=u();function m(g,y){return t.length===1?r.srSingleSegmentLabel({point1X:f(t[0][0][x],a),point1Y:f(t[0][0][A],a),point2X:f(t[0][1][x],a),point2Y:f(t[0][1][A],a)}):r.srMultipleSegmentIndividualLabel({point1X:f(g[0][x],a),point1Y:f(g[0][A],a),point2X:f(g[1][x],a),point2Y:f(g[1][A],a),indexOfSegment:y+1})}function p(){return t.map((g,y)=>m(g,y)).join(" ")}function c(g,y,w,v){const q={endpointNumber:g,x:f(y,a),y:f(w,a)};return t.length>1?r.srMultipleSegmentGraphEndpointAriaLabel({...q,indexOfSegment:v}):r.srSingleSegmentGraphEndpointAriaLabel(q)}return s.createElement("g",{"aria-label":d,"aria-describedby":`${l} ${t.length===1&&o}`},t==null?void 0:t.map((g,y)=>s.createElement("g",{"aria-label":t.length===1?void 0:m(g,y),"aria-describedby":t.length===1?void 0:o,key:`${i}-${y}`},s.createElement(Sn,{key:y,points:g,onMoveLine:w=>{n(O.segment.moveLine(y,w))},onMovePoint:(w,v)=>{n(O.segment.movePointInFigure(y,w,v))},ariaLabels:{point1AriaLabel:c(1,g[0][x],g[0][A],y+1),point2AriaLabel:c(2,g[1][x],g[1][A],y+1),grabHandleAriaLabel:r.srSegmentGrabHandle({point1X:f(g[0][x],a),point1Y:f(g[0][A],a),point2X:f(g[1][x],a),point2Y:f(g[1][A],a)})}}),s.createElement("g",{id:o,style:H.srOnly},r.srSegmentLength({length:f(fp(g),a)})))),s.createElement("g",{style:H.srOnly,id:l},p()))};function fp(n){return ll(...n)}function bp(n,e){const{strings:t,locale:r}=e,a=n.coords.map(([i,o],l)=>t.srMultipleSegmentIndividualLabel({point1X:f(i[x],r),point1Y:f(i[A],r),point2X:f(o[x],r),point2Y:f(o[A],r),indexOfSegment:l+1}));return t.srInteractiveElements({elements:a.join(" ")})}function vp(n,e,t){return{graph:s.createElement(kp,{graphState:n,dispatch:e}),interactiveElementsDescription:Ap(n,t)}}function kp(n){const{dispatch:e,graphState:t}=n,{interactiveColor:r}=Y(),a=me(),o=s.useId()+"-description",{coords:l,snapStep:u}=t,d=s.useRef({amplitude:1,angularFrequency:1,phase:1,verticalOffset:0}),m=Pp(l);m!==void 0&&(d.current=m);const{srSinusoidGraph:p,srSinusoidDescription:c,srSinusoidRootPoint:g,srSinusoidPeakPoint:y}=hs(t,a);return s.createElement("g",{"aria-label":p,"aria-describedby":o},s.createElement(Yn.OfX,{y:w=>qp(w,d.current),color:r,svgPathProps:{"aria-hidden":!0}}),l.map((w,v)=>s.createElement(we,{ariaLabel:v===0?g:y,key:"point-"+v,point:w,sequenceNumber:v+1,constrain:xp(l,u,v),onMove:q=>e(O.sinusoid.movePoint(v,q))})),s.createElement("g",{id:o},c))}const xp=(n,e,t)=>{const r=n[t],a=n[1-t],i=o=>{let l=o(r);return l[x]===a[x]&&(l=o(l)),l};return{up:i(o=>b.add(o,[0,e[1]])),down:i(o=>b.sub(o,[0,e[1]])),left:i(o=>b.sub(o,[e[0],0])),right:i(o=>b.add(o,[e[0],0]))}},qp=function(n,e){const{amplitude:t,angularFrequency:r,phase:a,verticalOffset:i}=e;return t*Math.sin(r*n-a)+i},Pp=n=>{const e=n[0],t=n[1];if(t[x]===e[x])return;const r=t[A]-e[A],a=Math.PI/(2*(t[x]-e[x])),i=e[x]*a,o=e[A];return{amplitude:r,angularFrequency:a,phase:i,verticalOffset:o}};function Ap(n,e){return hs(n,e).srSinusoidInteractiveElements}function hs(n,e){const{strings:t,locale:r}=e,{coords:a}=n,[i,o]=a,l=Math.abs(o[x]-i[x]),u=Math.abs(o[A]-i[A]),d={x:f(i[x],r),y:f(i[A],r)},m={x:f(o[x],r),y:f(o[A],r)},p=t.srSinusoidGraph,c=t.srSinusoidDescription({minValue:f(i[A]-u,r),maxValue:f(i[A]+u,r),cycleStart:f(i[x]-2*l,r),cycleEnd:f(i[x]+2*l,r)}),g=t.srSinusoidRootPoint(d),y=o[A]===i[A]?t.srSinusoidFlatPoint(m):o[A]>i[A]?t.srSinusoidMaxPoint(m):t.srSinusoidMinPoint(m),w=t.srInteractiveElements({elements:t.srSinusoidInteractiveElements({point1X:f(i[x],r),point1Y:f(i[A],r),point2X:f(o[x],r),point2Y:f(o[A],r)})});return{srSinusoidGraph:p,srSinusoidDescription:c,srSinusoidRootPoint:g,srSinusoidPeakPoint:y,srSinusoidInteractiveElements:w}}const{calculateAngleInDegrees:di,convertDegreesToRadians:Cp}=We,Tp="https://cdn.kastatic.org/images/perseus/protractor.svg",Wn=[-195,-190],gr=[-201,-15];function ys(){const n=qe().staticUrl,{range:e,snapStep:t}=Y(),[[r,a],[i,o]]=e,l=[Ya(r,a,.5),Ya(i,o,.25)],[u,d]=s.useState(l),[m,p]=s.useState(gr),c=s.useRef(null),{dragging:g}=mn({gestureTarget:c,onMove:d,point:u,constrainKeyboardMovement:k=>_e({snapStep:t,range:e,point:k})}),y=s.useRef(null);Ep({gestureTarget:y,onMove:p,point:m,constrain:Np});const[w]=Q(u),v=b.add(w,Wn),q=di(m)-di(gr);return s.createElement("g",{ref:c,transform:`translate(${v[x]}, ${v[A]}), rotate(${q})`,style:{transformOrigin:`${-Wn[x]}px ${-Wn[A]}px`,cursor:g?"grabbing":"grab"}},s.createElement("image",{href:n(Tp)}),s.createElement("g",{transform:`translate(5, ${-Wn[1]})`,ref:y},s.createElement(Rp,null)))}function Rp(){const t=Cp(10),r=175*(1-Math.cos(t)),a=175*-Math.sin(t),i=sr().move(0,0).circularArc(175,r,a,{sweep:!0}).build(),o=sr().move(-8,0).line(0,10).line(8,0).build(),l=Gr/2;return s.createElement("g",{className:"protractor-rotation-handle"},s.createElement("path",{className:"protractor-rotation-handle-arrow-arc",d:i}),s.createElement("path",{className:"protractor-rotation-handle-arrowhead",d:o}),s.createElement("path",{className:"protractor-rotation-handle-arrowhead",d:o,transform:`translate(${r}, ${a}), rotate(190)`}),s.createElement("ellipse",{cx:"0px",cy:"-15px",rx:l,ry:l,fill:"none"}))}const Ip=b.mag(gr);function Np(n){return b.withMag(n,Ip)}function Ep(n){const{gestureTarget:e,onMove:t,point:r,constrain:a=o=>o}=n,i=s.useRef([0,0]);Ei(o=>{const{event:l,first:u,movement:d}=o;l==null||l.stopPropagation(),u&&(i.current=r),b.mag(d)!==0&&(t==null||t(a(b.add(i.current,d))))},{target:e,eventOptions:{passive:!1}})}ys.__docgenInfo={description:"",methods:[],displayName:"Protractor"};const hr=n=>{const{state:e,dispatch:t,labels:r,labelLocation:a,readOnly:i,fullGraphAriaLabel:o,fullGraphAriaDescription:l}=n,{type:u}=e,[d,m]=n.box,p=n.step,c=s.useId(),g=`interactive-graph-description-${c}`,y=`interactive-graph-interactive-elements-description-${c}`,w=`unlimited-graph-keyboard-prompt-${c}`,v=`instructions-${c}`,q=s.useRef(null),{analytics:k}=Nr(),{viewboxX:P,viewboxY:C}=Fp(e.range,d,m),I=`${P} ${C} ${d} ${m}`,E={width:d,height:m,viewBox:I,preserveAspectRatio:"xMidYMin",x:P,y:C},S=me(),{strings:R}=S,F=de(e)&&e.showKeyboardInteractionInvitation;zs(()=>{k.onAnalyticsEvent({type:"perseus:interactive-graph-widget:rendered",payload:{type:u,widgetType:"INTERACTIVE_GRAPH",widgetId:"interactive-graph"}}),k.onAnalyticsEvent({type:"perseus:widget:rendered:ti",payload:{widgetSubType:u,widgetType:"INTERACTIVE_GRAPH",widgetId:"interactive-graph"}})});const{graph:N,interactiveElementsDescription:z}=Wp({state:e,dispatch:t,i18n:S,markings:n.markings}),ee=i||!!n.static;return s.createElement(to.Provider,{value:{range:e.range,snapStep:e.snapStep,markings:n.markings,tickStep:p,gridStep:n.gridStep,showTooltips:!!n.showTooltips,graphDimensionsInPixels:n.box,width:d,height:m,labels:r,labelLocation:a,disableKeyboardInteraction:ee,interactiveColor:ee?"var(--static-gray)":"var(--mafs-blue)"}},s.createElement(_,{className:"mafs-graph-container"},s.createElement(_,{className:"mafs-graph",style:{position:"relative",padding:"25px 25px 0 0",boxSizing:"content-box",marginLeft:"20px",marginBottom:"30px",pointerEvents:n.static?"none":"auto",userSelect:"none",width:d,height:m},onKeyUp:$=>{jp($,e,t)},"aria-label":o,"aria-describedby":Gp(l&&g,z&&y,de(e)&&w,e.type!=="none"&&v),ref:q,tabIndex:0,onFocus:$=>{Lp($,e,t)},onBlur:$=>{Dp($,e,t)}},l&&s.createElement(_,{id:g,tabIndex:-1,className:"mafs-sr-only"},l),z&&s.createElement(_,{id:y,tabIndex:-1,className:"mafs-sr-only"},z),e.type!=="none"&&s.createElement(_,{id:v,tabIndex:-1,className:"mafs-sr-only"},de(e)?R.srUnlimitedGraphInstructions:R.srGraphInstructions),s.createElement(po,{box:n.box,backgroundImage:n.backgroundImage}),s.createElement(_,{style:{position:"absolute",bottom:0,left:0}},(n.markings==="graph"||n.markings==="axes")&&s.createElement(s.Fragment,null,s.createElement(lo,{i18n:S})),s.createElement(_,{"aria-hidden":!(n.lockedFigures&&n.lockedFigures.length>0)},s.createElement(Pa,{preserveAspectRatio:!1,viewBox:{x:e.range[x],y:e.range[A],padding:0},pan:!1,zoom:!1,width:d,height:m},s.createElement(Uo,null),s.createElement("svg",{...E},s.createElement(co,{gridStep:n.gridStep,range:e.range,containerSizeClass:n.containerSizeClass,markings:n.markings,width:d,height:m})),(n.markings==="graph"||n.markings==="axes")&&s.createElement(s.Fragment,null,s.createElement(mo,null),s.createElement(oo,null)),n.lockedFigures&&n.lockedFigures.length>0&&s.createElement("svg",{...E},s.createElement(Ao,{lockedFigures:n.lockedFigures,range:e.range})))),n.lockedFigures&&s.createElement(im,{lockedFigures:n.lockedFigures}),s.createElement(_,{style:{position:"absolute"}},s.createElement(Pa,{preserveAspectRatio:!1,viewBox:{x:e.range[x],y:e.range[A],padding:0},pan:!1,zoom:!1,width:d,height:m},s.createElement("svg",{...E},n.showProtractor&&s.createElement(ys,null),N)))),F&&s.createElement(_,{style:{display:F?void 0:"hidden",textAlign:"center",backgroundColor:"white",border:"1px solid #21242C52",padding:"16px 0",boxShadow:"0px 8px 8px 0px #21242C14",top:"50%",transform:"translateY(-50%)"}},s.createElement(Ai,{id:w},R.graphKeyboardPrompt))),Mp({state:e,dispatch:t,width:d,perseusStrings:R})))},Sp=n=>{const{interactionMode:e,showRemovePointButton:t,focusedPointIndex:r}=n.state,{perseusStrings:a}=n,i=t&&r!==null;return s.createElement(_,{style:{flexDirection:"row",width:n.width}},e==="keyboard"&&s.createElement(ye,{kind:"secondary",style:{width:"100%",marginLeft:"20px"},tabIndex:0,onClick:()=>{n.dispatch(O.pointGraph.addPoint([0,0]))}},a.addPoint),e==="mouse"&&s.createElement(ye,{id:so,kind:"secondary",color:"destructive",tabIndex:-1,style:{width:"100%",marginLeft:"20px",visibility:i?"visible":"hidden"},onClick:o=>{n.dispatch(O.pointGraph.removePoint(n.state.focusedPointIndex))}},a.removePoint))},Op=n=>{const{interactionMode:e,showRemovePointButton:t,focusedPointIndex:r,closedPolygon:a,coords:i}=n.state,{perseusStrings:o}=n,l=t&&r!==null,u=Vr(i).length<3,d=a?s.createElement(ye,{kind:"secondary",style:{width:"100%",marginLeft:"20px"},tabIndex:0,onClick:()=>{n.dispatch(O.polygon.openPolygon())}},o.openPolygon):s.createElement(ye,{kind:"secondary",disabled:u,style:{width:"100%",marginLeft:"20px"},tabIndex:u?-1:0,onClick:()=>{n.dispatch(O.polygon.closePolygon())}},o.closePolygon);return s.createElement(s.Fragment,null,s.createElement(_,{style:{flexDirection:"row",width:n.width}},e==="keyboard"&&s.createElement(ye,{kind:"secondary",style:{width:"100%",marginLeft:"20px"},disabled:a,tabIndex:a?-1:0,onClick:()=>{n.dispatch(O.polygon.addPoint([0,0]))}},o.addPoint),e==="mouse"&&s.createElement(ye,{id:so,kind:"secondary",color:"destructive",disabled:a||!l,tabIndex:-1,style:{width:"100%",marginLeft:"20px"},onClick:m=>{n.dispatch(O.polygon.removePoint(n.state.focusedPointIndex))}},o.removePoint),d))},Mp=n=>{const{state:e,dispatch:t,width:r,perseusStrings:a}=n,{type:i}=e;switch(i){case"point":return e.numPoints==="unlimited"?Sp({state:e,dispatch:t,width:r,perseusStrings:a}):null;case"polygon":return e.numSides==="unlimited"?Op({state:e,dispatch:t,width:r,perseusStrings:a}):null;default:return null}};function Lp(n,e,t){de(e)&&n.target.classList.contains("mafs-graph")&&e.interactionMode==="mouse"&&t(O.global.changeKeyboardInvitationVisibility(!0))}function Dp(n,e,t){de(e)&&t(O.global.changeKeyboardInvitationVisibility(!1))}function jp(n,e,t){var r;de(e)&&(n.key==="Backspace"||n.key==="Delete"?((r=document.activeElement)!=null&&r.classList.contains("movable-point__focusable-handle")&&(e.type==="point"||e.type==="polygon"&&!e.closedPolygon)&&t(O.global.deleteIntent()),document.activeElement.blur()):n.shiftKey&&n.key==="Enter"?t(O.global.changeInteractionMode("keyboard")):e.interactionMode==="keyboard"&&n.key==="a"&&t(O.pointGraph.addPoint([0,0])))}const mi=n=>{const[e,t]=n;return Math.abs(t-e)},Fp=(n,e,t)=>{let r=0;const a=mi(n[x]),i=e/a,o=n[x][te];o>0&&(r=i*Math.abs(o)),o<0&&(r=-i*Math.abs(o));let l=-t;const u=mi(n[A]),d=t/u,m=n[A][te];return m>0&&(l=-t-d*Math.abs(m)),m<0&&(l=d*Math.abs(m)-t),{viewboxX:r,viewboxY:l}},Wp=n=>{const{state:e,dispatch:t,i18n:r,markings:a}=n,{type:i}=e;switch(i){case"angle":return Dm(e,t,r);case"segment":return yp(e,t,r);case"linear-system":return nc(e,t,r);case"linear":return Qm(e,t,r);case"ray":return pp(e,t,r);case"polygon":return ep(e,t,r,a);case"point":return ac(e,t,r);case"circle":return Um(e,t,r);case"quadratic":return up(e,t,r);case"sinusoid":return vp(e,t,r);case"none":return{graph:null,interactiveElementsDescription:null};default:throw new fe(i)}};function Gp(...n){return n.filter(Boolean).join(" ")||void 0}hr.__docgenInfo={description:"",methods:[],displayName:"MafsGraph",props:{box:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},backgroundImage:{required:!1,tsType:{name:'intersection["backgroundImage"]',raw:'InteractiveGraphProps["backgroundImage"]'},description:""},lockedFigures:{required:!1,tsType:{name:'intersection["lockedFigures"]',raw:'InteractiveGraphProps["lockedFigures"]'},description:""},step:{required:!0,tsType:{name:'intersection["step"]',raw:'InteractiveGraphProps["step"]'},description:""},gridStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},containerSizeClass:{required:!0,tsType:{name:'intersection["containerSizeClass"]',raw:'InteractiveGraphProps["containerSizeClass"]'},description:""},markings:{required:!0,tsType:{name:'intersection["markings"]',raw:'InteractiveGraphProps["markings"]'},description:""},showTooltips:{required:!0,tsType:{name:"Required",elements:[{name:'intersection["showTooltips"]',raw:'InteractiveGraphProps["showTooltips"]'}],raw:'Required<InteractiveGraphProps["showTooltips"]>'},description:""},showProtractor:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},labelLocation:{required:!1,tsType:{name:'intersection["labelLocation"]',raw:'InteractiveGraphProps["labelLocation"]'},description:""},fullGraphAriaLabel:{required:!1,tsType:{name:'intersection["fullGraphAriaLabel"]',raw:'InteractiveGraphProps["fullGraphAriaLabel"]'},description:""},fullGraphAriaDescription:{required:!1,tsType:{name:'intersection["fullGraphAriaDescription"]',raw:'InteractiveGraphProps["fullGraphAriaDescription"]'},description:""},state:{required:!0,tsType:{name:"union",raw:`| AngleGraphState
| SegmentGraphState
| LinearSystemGraphState
| LinearGraphState
| RayGraphState
| NoneGraphState
| PolygonGraphState
| PointGraphState
| CircleGraphState
| QuadraticGraphState
| SinusoidGraphState`,elements:[{name:"AngleGraphState"},{name:"SegmentGraphState"},{name:"LinearSystemGraphState"},{name:"LinearGraphState"},{name:"RayGraphState"},{name:"NoneGraphState"},{name:"PolygonGraphState"},{name:"PointGraphState"},{name:"CircleGraphState"},{name:"QuadraticGraphState"},{name:"SinusoidGraphState"}]},description:""},dispatch:{required:!0,tsType:{name:"ReactDispatch",raw:"React.Dispatch<InteractiveGraphAction>",elements:[{name:"union",raw:`| Reinitialize
| MovePointInFigure
| MoveLine
| MoveAll
| MovePoint
| MoveCenter
| MoveRadiusPoint
| ChangeSnapStep
| ChangeRange
| AddPoint
| RemovePoint
| FocusPoint
| BlurPoint
| DeleteIntent
| ClickPoint
| ClosePolygon
| OpenPolygon
| ChangeInteractionMode
| ChangeKeyboardInvitationVisibility`,elements:[{name:"Reinitialize"},{name:"MovePointInFigure"},{name:"MoveLine"},{name:"MoveAll"},{name:"MovePoint"},{name:"MoveCenter"},{name:"MoveRadiusPoint"},{name:"ChangeSnapStep"},{name:"ChangeRange"},{name:"AddPoint"},{name:"RemovePoint"},{name:"FocusPoint"},{name:"BlurPoint"},{name:"DeleteIntent"},{name:"ClickPoint"},{name:"ClosePolygon"},{name:"OpenPolygon"},{name:"ChangeInteractionMode"},{name:"ChangeKeyboardInvitationVisibility"}]}]},description:""},readOnly:{required:!0,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""}}};function _p(n,e){switch(n.type){case"angle":return oe(e.type==="angle"),{...e,coords:n.coords};case"quadratic":return oe(e.type==="quadratic"),{...e,coords:n.coords};case"circle":return oe(e.type==="circle"),{...e,center:n.center,radius:It(n)};case"linear":return oe(e.type==="linear"),{...e,coords:n.coords};case"ray":return oe(e.type==="ray"),{...e,coords:n.coords};case"sinusoid":return oe(e.type==="sinusoid"),{...e,coords:n.coords};case"segment":return oe(e.type==="segment"),{...e,coords:n.coords};case"linear-system":return oe(e.type==="linear-system"),{...e,coords:n.coords};case"polygon":return oe(e.type==="polygon"),{...e,coords:n.coords};case"point":return oe(e.type==="point"),{...e,coords:n.coords};case"none":return oe(e.type==="none"),{...e};default:throw new fe(n)}}const ws=s.forwardRef((n,e)=>{const{onChange:t,graph:r}=n,[a,i]=s.useReducer(Ac,n,cr);s.useImperativeHandle(e,()=>({getUserInput:()=>$m(a,r)}));const o=s.useRef(a);s.useEffect(()=>{o.current!==a&&t({graph:_p(a,r)}),o.current=a},[t,a,r]);const[l,u]=n.snapStep;s.useEffect(()=>{i(vm([l,u]))},[i,l,u]);const[[d,m],[p,c]]=n.range;s.useEffect(()=>{i(km([[d,m],[p,c]]))},[i,d,m,p,c]);const g=r.type==="segment"?r.numSegments:null,y=r.type==="point"?r.numPoints:null,w=r.type==="polygon"?r.numSides:null,v=r.type==="polygon"?r.snapTo:null,q=r.type==="polygon"||r.type==="angle"?r.showAngles:null,k=r.type==="angle"?r.allowReflexAngles:null,P=r.type==="polygon"?r.showSides:null,C="startCoords"in r?r.startCoords:void 0,I=s.useRef(n),E=Bs(n);return s.useEffect(()=>{E.current!==I.current&&i(xm(E.current))},[r.type,y,g,w,v,q,P,E,C,k]),n.static&&n.correct?s.createElement(hr,{...n,state:cr({...n,graph:n.correct}),dispatch:i}):s.createElement(hr,{...n,state:a,dispatch:i})});ws.__docgenInfo={description:"",methods:[{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:null}],displayName:"StatefulMafsGraph"};const{getClockwiseAngle:Vp}=We,{getLineEquation:ci,getLineIntersectionString:Hp,magnitude:$p,vector:Up}=At,Xp={url:null},pi="unlimited";function Yp(n,e){return Math.floor((n[1]-n[0])/e)}const Ze=(n,e)=>new an(`${n} called but current graph type is not a '${e}'`,Ke.NotAllowed,{metadata:{graphType:e}});function zp(n){const e=n[0],t=n[1],r=t[1]-e[1],a=Math.PI/(2*(t[0]-e[0])),i=e[0]*a,o=e[1];return[r,a,i,o]}function Bp(n){const e=n[0],t=n[1],r=n[2],a=(e[0]-t[0])*(e[0]-r[0])*(t[0]-r[0]);if(a===0)return;const i=(r[0]*(t[1]-e[1])+t[0]*(e[1]-r[1])+e[0]*(r[1]-t[1]))/a,o=(r[0]*r[0]*(e[1]-t[1])+t[0]*t[0]*(r[1]-e[1])+e[0]*e[0]*(t[1]-r[1]))/a,l=(t[0]*r[0]*(t[0]-r[0])*e[1]+r[0]*e[0]*(r[0]-e[0])*t[1]+e[0]*t[0]*(e[0]-t[0])*r[1])/a;return[i,o,l]}const L=class L extends s.Component{constructor(){super(...arguments),this.mafsRef=s.createRef()}getUserInput(){var e;if((e=this.mafsRef.current)!=null&&e.getUserInput)return this.mafsRef.current.getUserInput();throw new an("Cannot getUserInput from a graph that has never rendered",Ke.NotAllowed)}getPromptJSON(){return Gd(this.props,this.getUserInput())}render(){var a;const e=xi(this.props.containerSizeClass),t=this.props.gridStep||J.getGridStep(this.props.range,this.props.step,e[0]),r=this.props.snapStep||J.snapStepFromGridStep(t);return s.createElement(ws,{...this.props,ref:this.mafsRef,gridStep:t,snapStep:r,box:e,showTooltips:!!this.props.showTooltips,readOnly:(a=this.props.apiOptions)==null?void 0:a.readOnly})}static getLineCoords(e,t){return e.coords||L.pointsFromNormalized(t,[[.25,.75],[.75,.75]])}static getPointCoords(e,t){const r=e.numPoints||1;let a=e.coords;if(a)return a;switch(r){case 1:a=[e.coord||[0,0]];break;case 2:a=[[-5,0],[5,0]];break;case 3:a=[[-5,0],[0,0],[5,0]];break;case 4:a=[[-6,0],[-2,0],[2,0],[6,0]];break;case 5:a=[[-6,0],[-3,0],[0,0],[3,0],[6,0]];break;case 6:a=[[-5,0],[-3,0],[-1,0],[1,0],[3,0],[5,0]];break;case pi:a=[];break}const i=[[-10,10],[-10,10]],o=L.normalizeCoords(a,i);return L.pointsFromNormalized(t,o)}static getLinearSystemCoords(e,t){return e.coords||h.map([[[.25,.75],[.75,.75]],[[.25,.25],[.75,.25]]],r=>L.pointsFromNormalized(t,r))}static getPolygonCoords(e,t){if(e.type!=="polygon")throw Ze("toggleShowSides","polygon");let r=e.coords;if(r)return r;const a=e.numSides||3;if(a===pi)r=[];else{const l=2*Math.PI/a,u=(1/a-1/2)*Math.PI,d=e.snapTo==="sides"?Math.sqrt(3)/3*7:4;r=h.times(a,function(m){return[d*Math.cos(m*l+u),d*Math.sin(m*l+u)]})}const i=[[-10,10],[-10,10]];r=L.normalizeCoords(r,i);const o=!h.contains(["angles","sides"],e.snapTo);return r=L.pointsFromNormalized(t,r,!o),r}static getSegmentCoords(e,t){const r=e.coords;if(r)return r;const a=e.numSegments||1,i={1:[5],2:[5,-5],3:[5,0,-5],4:[6,2,-2,-6],5:[6,3,0,-3,-6],6:[5,3,1,-1,-3,-5]}[a],o=[[-10,10],[-10,10]];return i.map(function(l){let u=[[-5,l],[5,l]];return u=L.normalizeCoords(u,o),u=L.pointsFromNormalized(t,u),u})}static getAngleCoords(e,t){let r=e.coords;if(r)return r;const a=e.snapDegrees||1;let i=a;for(;i<20;)i+=a;i=i*Math.PI/180;const o=(e.angleOffsetDeg||0)*Math.PI/180;r=L.pointsFromNormalized(t,[[.85,.5],[.5,.5]]);const l=$p(Up(...r));return r[0]=[r[1][0]+l*Math.cos(o),r[1][1]+l*Math.sin(o)],r[2]=[r[1][0]+l*Math.cos(i+o),r[1][1]+l*Math.sin(i+o)],r}static normalizeCoords(e,t){return h.map(e,function(r){return h.map(r,function(a,i){const o=t[i][1]-t[i][0];return(a+t[i][1])/o})})}static getEquationString(e){const t=e.graph.type;switch(t){case"none":return L.getNoneEquationString();case"linear":return L.getLinearEquationString(e);case"quadratic":return L.getQuadraticEquationString(e);case"sinusoid":return L.getSinusoidEquationString(e);case"circle":return L.getCircleEquationString(e);case"linear-system":return L.getLinearSystemEquationString(e);case"point":return L.getPointEquationString(e);case"segment":return L.getSegmentEquationString(e);case"ray":return L.getRayEquationString(e);case"polygon":return L.getPolygonEquationString(e);case"angle":return L.getAngleEquationString(e);default:throw new fe(t)}}static pointsFromNormalized(e,t,r){return h.map(t,function(a){return h.map(a,function(i,o){const l=e.range[o];if(r)return l[0]+(l[1]-l[0])*i;const u=e.step[o],d=Yp(l,u),m=Math.round(i*d);return l[0]+u*m})})}static getNoneEquationString(){return""}static getLinearEquationString(e){const t=L.getLineCoords(e.graph,e);if(jt(t[0][0],t[1][0]))return"x = "+t[0][0].toFixed(3);const r=(t[1][1]-t[0][1])/(t[1][0]-t[0][0]),a=t[0][1]-r*t[0][0];return jt(r,0)?"y = "+a.toFixed(3):"y = "+r.toFixed(3)+"x + "+a.toFixed(3)}static getCurrentQuadraticCoefficients(e){const t=e.graph.coords||L.defaultQuadraticCoords(e);return Bp(t)}static defaultQuadraticCoords(e){const t=[[.25,.75],[.5,.25],[.75,.75]];return L.pointsFromNormalized(e,t)}static getQuadraticEquationString(e){const t=L.getCurrentQuadraticCoefficients(e);return"y = "+t[0].toFixed(3)+"x^2 + "+t[1].toFixed(3)+"x + "+t[2].toFixed(3)}static getCurrentSinusoidCoefficients(e){const t=e.graph.coords||L.defaultSinusoidCoords(e);return zp(t)}static defaultSinusoidCoords(e){const t=[[.5,.5],[.65,.6]];return L.pointsFromNormalized(e,t)}static getSinusoidEquationString(e){const t=L.getCurrentSinusoidCoefficients(e);return"y = "+t[0].toFixed(3)+"sin("+t[1].toFixed(3)+"x - "+t[2].toFixed(3)+") + "+t[3].toFixed(3)}static getCircleEquationString(e){const t=e.graph,r=t.center||[0,0],a=t.radius||2;return"center ("+r[0]+", "+r[1]+"), radius "+a}static getLinearSystemEquationString(e){const t=L.getLinearSystemCoords(e.graph,e);return`
`+ci(t[0][0],t[0][1])+`
`+ci(t[1][0],t[1][1])+`
`+Hp(t[0],t[1])}static getPointEquationString(e){if(e.graph.type!=="point")throw Ze("getPointEquationString","point");return L.getPointCoords(e.graph,e).map(function(r){return"("+r[0]+", "+r[1]+")"}).join(", ")}static getSegmentEquationString(e){if(e.graph.type!=="segment")throw Ze("getSegmentEquationString","segment");const t=L.getSegmentCoords(e.graph,e);return h.map(t,function(r){return"["+h.map(r,function(a){return"("+a.join(", ")+")"}).join(" ")+"]"}).join(" ")}static getRayEquationString(e){if(e.graph.type!=="ray")throw Ze("createPointForPolygonType","ray");const t=L.getLineCoords(e.graph,e),r=t[0],a=t[1];let i=L.getLinearEquationString(e);return r[0]>a[0]?i+=" (for x <= "+r[0].toFixed(3)+")":r[0]<a[0]?i+=" (for x >= "+r[0].toFixed(3)+")":r[1]>a[1]?i+=" (for y <= "+r[1].toFixed(3)+")":i+=" (for y >= "+r[1].toFixed(3)+")",i}static getPolygonEquationString(e){if(e.graph.type!=="polygon")throw Ze("getPolygonEquationString","polygon");const t=L.getPolygonCoords(e.graph,e);return h.map(t,function(r){return"("+r.join(", ")+")"}).join(" ")}static getAngleEquationString(e){if(e.graph.type!=="angle")throw Ze("getAngleEquationString","angle");const t=L.getAngleCoords(e.graph,e),r=e.graph.allowReflexAngles;return Vp(t,r).toFixed(0)+"° angle at ("+t[1].join(", ")+")"}static getUserInputFromProps(e){return e.graph}};L.defaultProps={labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],backgroundImage:Xp,markings:"graph",showTooltips:!1,showProtractor:!1,graph:{type:"linear"}};let yr=L;const Kp=h.identity,Jp={name:"interactive-graph",displayName:"Interactive graph",accessible:!0,widget:yr,staticTransform:Kp},Qp={fontFamily:"inherit",fontSize:15,fontWeight:"bold",lineHeight:"22px"},Zp=(n,e)=>{const t=n.markers.map(a=>({label:a.label})),r=e.markers.map(a=>({label:a.label,selected:a.selected}));return{type:"label-image",options:{choices:n.choices,imageUrl:n.imageUrl,imageAlt:n.imageAlt,markers:t},userInput:{markers:r}}},Ve=nn.action.secondary.progressive,Et={color:{bg:{switch:{off:Ve.default.border,disabledOff:nn.action.primary.disabled.background,activeOff:j.fadedOffBlack64,on:Ve.default.foreground,disabledOn:Ve.press.background,activeOn:Ve.press.foreground},slider:{on:nn.icon.inverse,off:nn.icon.inverse},icon:{on:Ve.default.foreground,disabledOn:Ve.press.background,off:Ve.default.border,disabledOff:nn.icon.disabled}},outline:{default:nn.focus.outer}},border:{radius:{small:ce.small_12,full:pl.radius.full}},size:{height:{none:0,medium:20,large:ce.large_24},width:{none:0,small:ce.xxxxSmall_2,medium:20,large:40},offset:{default:1}},spacing:{slider:{position:ce.xxxxSmall_2},icon:{position:ce.xxxSmall_4},transform:{default:`translateX(${ce.medium_16}px)`,transition:"transform 0.15s ease-in-out"}}},eg=Dl(Et,{color:{bg:{switch:{off:j.white50,disabledOff:j.white32,activeOff:j.white64,disabledOn:j.white32,on:j.white,activeOn:j.offWhite},slider:{off:j.eggplant,on:j.eggplant},icon:{on:j.white,off:j.white,disabledOff:j.white50,disabledOn:j.white50}},outline:{default:j.white}}}),ng={default:Et,khanmigo:eg},fs=jl(Et);function tg(n){const e=s.useContext(Gl),t=ng[e]||Et;return s.createElement(fs.Provider,{value:t},n.children)}const rg=Pi("span"),ag=Pi("input"),ig=s.forwardRef(function(e,t){const{"aria-label":r,"aria-labelledby":a,"aria-describedby":i,checked:o,disabled:l=!1,icon:u,id:d,onChange:m,testId:p}=e,c=s.useId(),g=d??c,{theme:y,themeName:w}=Fl(fs),v=Wl(og,y),q=()=>{!l&&m&&m(!o)},k=()=>{},P=sg(o,m!==void 0,l,y,w);let C;return u&&(C=s.cloneElement(u,{size:"small",style:[v.icon,P.icon],"aria-hidden":!0})),s.createElement(_,{onClick:q,style:[v.switch,P.switch,l&&v.disabled],testId:p},s.createElement(ag,{"aria-describedby":i,"aria-label":r,"aria-labelledby":a,checked:o,"aria-disabled":l,id:g,onChange:k,ref:t,role:"switch",style:v.hidden,type:"checkbox"}),u&&C,s.createElement(rg,{style:[v.slider,P.slider]}))}),og=n=>({hidden:{opacity:0,height:n.size.height.none,width:n.size.width.none},switch:{display:"inline-flex",height:n.size.height.large,width:n.size.width.large,borderRadius:n.border.radius.small,flexShrink:0,":hover":{outlineOffset:n.size.offset.default},":focus-within":{outline:`solid ${n.size.width.small}px ${n.color.outline.default}`,outlineOffset:n.size.offset.default}},disabled:{cursor:"not-allowed",":hover":{outline:"none"},":focus-within":{outline:`solid ${n.size.width.small}px ${n.color.outline.default}`,outlineOffset:n.size.offset.default}},slider:{position:"absolute",top:n.spacing.slider.position,left:n.spacing.slider.position,height:n.size.height.medium,width:n.size.width.medium,borderRadius:n.border.radius.full,backgroundColor:n.color.bg.slider.on,transition:n.spacing.transform.transition},icon:{position:"absolute",top:n.spacing.icon.position,left:n.spacing.icon.position,zIndex:1,transition:n.spacing.transform.transition}}),Gn={},sg=(n,e,t,r,a)=>{const i=`${n}-${e}-${t}-${a}`;if(Gn[i])return Gn[i];let o={};const l={cursor:e?"pointer":"auto",":hover":{outline:e?`solid ${r.size.width.small}px ${r.color.outline.default}`:"none"}};return n?o={switch:Ft({backgroundColor:t?r.color.bg.switch.disabledOn:r.color.bg.switch.on,":active":{backgroundColor:!t&&e?r.color.bg.switch.activeOn:void 0}},l),slider:{transform:r.spacing.transform.default},icon:{color:t?r.color.bg.icon.disabledOn:r.color.bg.icon.on,transform:r.spacing.transform.default}}:o={switch:Ft({backgroundColor:t?r.color.bg.switch.disabledOff:r.color.bg.switch.off,":active":{backgroundColor:!t&&e?r.color.bg.switch.activeOff:void 0}},l),slider:{backgroundColor:r.color.bg.slider.off},icon:{color:t?r.color.bg.icon.disabledOff:r.color.bg.icon.off}},Gn[i]=T.StyleSheet.create(o),Gn[i]},bs=s.forwardRef(function(e,t){return s.createElement(tg,null,s.createElement(ig,Ft({},e,{ref:t})))});bs.displayName="Switch";const vs=n=>{const e=s.useId(),t=s.useId(),{strings:r}=me();return s.createElement(_,{style:lg.switchWrapper},s.createElement(bs,{id:e,checked:n.areAnswersHidden,onChange:n.onChange,"aria-labelledby":t}),s.createElement(Ai,{id:t,htmlFor:e,tag:"label"},r.hideAnswersToggleLabel))},lg=T.StyleSheet.create({switchWrapper:{display:"flex",flexDirection:"row",flexWrap:"wrap-reverse",alignItems:"center",gap:"0.5em",marginTop:"1em"}});vs.__docgenInfo={description:"",methods:[],displayName:"HideAnswersToggle",props:{areAnswersHidden:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:'ReactComponentPropsWithoutRef["onChange"]',raw:'React.ComponentPropsWithoutRef<typeof Switch>["onChange"]'},description:""}}};const rn=class rn extends s.Component{constructor(e){super(e),this._mounted=!1,this._markers=[],this.state={activeMarkerIndex:-1,markersInteracted:!1,hideAnswers:!1}}static pointInTriangle(e,t,r,a){const i=(d,m,p)=>(d.x-p.x)*(m.y-p.y)-(m.x-p.x)*(d.y-p.y),o=i(e,t,r)<0,l=i(e,r,a)<0,u=i(e,a,t)<0;return o===l&&l===u}static imageSideForMarkerPosition(e,t,r){if(r&&r!=="NONE"){if(r==="LEFT"&&e>20)return"right";if(r==="RIGHT"&&e<80)return"left";if(r==="UP"&&t>20)return"bottom";if(r==="DOWN"&&t<80)return"top"}if(e<20)return"left";if(e>80)return"right";const a={x:20,y:0},i={x:80,y:0},o={x:80,y:100},l={x:20,y:100},u={x:50,y:50},d={top:[a,i,u],right:[u,i,o],bottom:[l,u,o],left:[a,u,l]},m={x:e,y:t};for(const p of Object.keys(d)){const c=d[p];if(rn.pointInTriangle(m,...c))return p}return"center"}static navigateToMarkerIndex(e,t,r){const a=t[r],i=t.map((o,l)=>{const u=o.x-a.x,d=o.y-a.y,m=Math.sqrt(u**2+d**2);return{index:l,dist:m,dir:{x:m!==0?u/m:0,y:m!==0?d/m:0}}}).filter(o=>o.index===r?!1:t[o.index].showCorrectness!=="correct").sort((o,l)=>{const u=Math.round(o.dist*(e.x*o.dir.x+e.y*o.dir.y)),d=Math.round(l.dist*(e.x*l.dir.x+e.y*l.dir.y));let m,p;return e.x>0?(m=o.dir.x>0&&u!==0,p=l.dir.x>0&&d!==0):e.x<0?(m=o.dir.x<0&&u!==0,p=l.dir.x<0&&d!==0):e.y>0?(m=o.dir.y>0&&u!==0,p=l.dir.y>0&&d!==0):e.y<0&&(m=o.dir.y<0&&u!==0,p=l.dir.y<0&&d!==0),m!==p?m?-1:1:u-d});return i.length>0?i[0].index:r}componentDidMount(){this._mounted=!0}componentWillUnmount(){this._mounted=!1}getUserInput(){return{markers:this.props.markers.map(e=>({selected:e.selected,label:e.label}))}}getPromptJSON(){return Zp(this.props,this.getUserInput())}showRationalesForCurrentlySelectedChoices(){const{markers:e}=this.props,{onChange:t}=this.props,r=e.map(a=>{const i=ba(a.selected,a.answers);return{...a,showCorrectness:i.hasAnswers?i.isCorrect?"correct":"incorrect":void 0}});t({markers:r},null,!0)}handleMarkerChange(e,t){const{markers:r,onChange:a}=this.props,i=[...r.slice(0,e),{...t,showCorrectness:void 0},...r.slice(e+1)];a({markers:i})}activateMarker(e,t){var a,i;(a=this.props.analytics)==null||a.onAnalyticsEvent({type:"perseus:label-image:marker-interacted-with",payload:null}),(i=this.props.analytics)==null||i.onAnalyticsEvent({type:"perseus:label-image:marker-interacted-with:ti",payload:null});const{activeMarkerIndex:r}=this.state;r!==e&&t?this.setState({activeMarkerIndex:e,markersInteracted:!0}):this.setState({activeMarkerIndex:-1})}handleMarkerKeyDown(e,t){const{markers:r}=this.props;if(r.length<2)return;const a={ArrowUp:{x:0,y:-1},ArrowRight:{x:1,y:0},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0}}[t.key];if(!a)return;t.preventDefault();const i=this._markers[rn.navigateToMarkerIndex(a,r,e)];i&&vn.findDOMNode(i).focus()}handleAnswerChoicesChangeForMarker(e,t){const{choices:r,markers:a}=this.props,i=r.filter((o,l)=>t[l]);this.handleMarkerChange(e,{...a[e],selected:i.length?i:void 0})}renderMarkers(){const{markers:e,questionCompleted:t,preferredPopoverDirection:r}=this.props,{activeMarkerIndex:a,markersInteracted:i}=this.state,o=this._mounted&&window.matchMedia(Gt.xsOrSmaller.replace("@media ","")).matches,l=this.props.imageWidth/2>this.props.imageHeight;return e.map((u,d)=>{let m,p;o||l?(m=u.y>50?"top":"bottom",p=u.y>50?"bottom":"top"):(p=rn.imageSideForMarkerPosition(u.x,u.y,r),p==="center"&&(p="bottom"),m={left:"right",top:"bottom",right:"left",bottom:"top"}[p]);const c=ba(u.selected,u.answers),g=t&&c.hasAnswers&&c.isCorrect?"correct":u.showCorrectness,y=g==="correct",w={[`margin${p.charAt(0).toUpperCase()+p.slice(1)}`]:10},v=d===a,q=u.selected&&!v&&!this.state.hideAnswers;return s.createElement(_,{key:d,style:{position:"absolute",left:`${u.x}%`,top:`${u.y}%`,zIndex:"unset"}},s.createElement(Rl,{key:`answers-${u.x}.${u.y}`,choices:this.props.choices.map(k=>({content:k,checked:u.selected?u.selected.includes(k):!1})),multipleSelect:this.props.multipleAnswers,onChange:k=>{var P,C;(P=this.props.analytics)==null||P.onAnalyticsEvent({type:"perseus:label-image:choiced-interacted-with",payload:null}),(C=this.props.analytics)==null||C.onAnalyticsEvent({type:"perseus:label-image:choiced-interacted-with:ti",payload:null}),this.handleAnswerChoicesChangeForMarker(d,k)},onToggle:k=>this.activateMarker(d,k),disabled:y,opener:({opened:k})=>s.createElement(Sr,{role:"button","aria-expanded":k,key:`marker-${u.x}.${u.y}`},({hovered:P,focused:C,pressed:I})=>s.createElement(_l,{...u,showCorrectness:g,showSelected:k,showPulsate:!i,ref:E=>this._markers[d]=E,showAnswer:q,answerSide:m,answerStyles:w,analytics:this.props.analytics,focused:C||I,hovered:P}))}))})}renderInstructions(){const{apiOptions:{isMobile:e},choices:t,multipleAnswers:r,hideChoicesFromInstructions:a}=this.props,{strings:i}=this.context,o=e?r?i.tapMultiple:i.tapSingle:r?i.clickMultiple:i.clickSingle,l=i.choices;return s.createElement("div",{className:Fe("perseus-label-image-widget-instructions",T.css(He.instructions))},s.createElement("div",{className:T.css(He.instructionsCaption)},o," ",!a&&l),!a&&s.createElement("div",{className:T.css(He.instructionsChoices)},t.map((u,d)=>s.createElement("div",{className:T.css(He.instructionsChoice),key:d},s.createElement(X,{content:u,strings:i})))))}render(){const{imageAlt:e,imageUrl:t,imageWidth:r,imageHeight:a}=this.props,{activeMarkerIndex:i}=this.state;return s.createElement("div",null,this.renderInstructions(),s.createElement("div",{className:T.css(He.markersCanvas),style:{maxWidth:r,maxHeight:a}},s.createElement("div",{className:T.css(He.imageContainer,i!==-1&&He.imageInteractionDisabled)},s.createElement(Or.Consumer,null,({setAssetStatus:o})=>s.createElement(En,{alt:e,src:t,width:r,height:a,setAssetStatus:o}))),this.renderMarkers()),s.createElement(vs,{areAnswersHidden:this.state.hideAnswers,onChange:o=>{var l,u;(l=this.props.analytics)==null||l.onAnalyticsEvent({type:"perseus:label-image:toggle-answers-hidden",payload:null}),(u=this.props.analytics)==null||u.onAnalyticsEvent({type:"perseus:label-image:toggle-answers-hidden:ti",payload:null}),this.setState({hideAnswers:o})}}))}};rn.contextType=G;let tt=rn;const He=T.StyleSheet.create({instructions:{paddingBottom:16},instructionsCaption:{...Qp,paddingBottom:16},instructionsChoices:{display:"flex",flexWrap:"wrap",margin:"-8px 0"},instructionsChoice:{display:"flex",alignItems:"center",margin:"8px 0",":not(:last-child)":{"::after":{content:"''",display:"inline-block",position:"relative",width:2,height:2,marginLeft:5,marginRight:5,background:"rgba(33, 36, 44, 0.32)",borderRadius:2}}},markersCanvas:{position:"relative"},imageContainer:{display:"flex"},imageInteractionDisabled:{pointerEvents:"none"}}),ug=s.forwardRef((n,e)=>{const t=Nr();return s.createElement(tt,{ref:e,analytics:t.analytics,...n})}),dg={name:"label-image",displayName:"Label Image",widget:ug,accessible:!0,isLintable:!0};tt.__docgenInfo={description:"",methods:[{name:"pointInTriangle",docblock:`Test whether point is contained within triangle.

Implementation taken from: https://stackoverflow.com/a/2049593`,modifiers:["static"],params:[{name:"p",optional:!1,type:{name:"signature",type:"object",raw:`{
    x: number;
    y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},alias:"Point"}},{name:"a",optional:!1,type:{name:"signature",type:"object",raw:`{
    x: number;
    y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},alias:"Point"}},{name:"b",optional:!1,type:{name:"signature",type:"object",raw:`{
    x: number;
    y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},alias:"Point"}},{name:"c",optional:!1,type:{name:"signature",type:"object",raw:`{
    x: number;
    y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},alias:"Point"}}],returns:{type:{name:"boolean"}},description:`Test whether point is contained within triangle.

Implementation taken from: https://stackoverflow.com/a/2049593`},{name:"imageSideForMarkerPosition",docblock:"Determine the image side given a marker position (as percent of size).",modifiers:["static"],params:[{name:"x",optional:!1,type:{name:"number"}},{name:"y",optional:!1,type:{name:"number"}},{name:"preferredDirection",optional:!1,type:{name:"union",raw:"PreferredPopoverDirection | undefined",elements:[{name:"union",raw:'"NONE" | "UP" | "DOWN" | "LEFT" | "RIGHT"',elements:[{name:"literal",value:'"NONE"'},{name:"literal",value:'"UP"'},{name:"literal",value:'"DOWN"'},{name:"literal",value:'"LEFT"'},{name:"literal",value:'"RIGHT"'}]},{name:"undefined"}]}}],returns:{type:{name:"union",raw:'"bottom" | "left" | "right" | "top" | "center"',elements:[{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'},{name:"literal",value:'"top"'},{name:"literal",value:'"center"'}]}},description:"Determine the image side given a marker position (as percent of size)."},{name:"navigateToMarkerIndex",docblock:`Calculate the next marker to navigate to, from the "this marker".

Given a cardinal navigation direction (in the x or y axis), return the
next marker index to visit.`,modifiers:["static"],params:[{name:"navigateDirection",optional:!1,type:{name:"union",raw:`| {
      x: 0;
      y: 1 | -1;
  }
| {
      x: 1 | -1;
      y: 0;
  }
| {
      x: 0;
      y: 0;
  }`,elements:[{name:"signature",type:"object",raw:`{
    x: 0;
    y: 1 | -1;
}`,signature:{properties:[{key:"x",value:{name:"literal",value:"0",required:!0}},{key:"y",value:{name:"union",raw:"1 | -1",elements:[{name:"literal",value:"1"},{name:"literal",value:"-1"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    x: 1 | -1;
    y: 0;
}`,signature:{properties:[{key:"x",value:{name:"union",raw:"1 | -1",elements:[{name:"literal",value:"1"},{name:"literal",value:"-1"}],required:!0}},{key:"y",value:{name:"literal",value:"0",required:!0}}]}},{name:"signature",type:"object",raw:`{
    x: 0;
    y: 0;
}`,signature:{properties:[{key:"x",value:{name:"literal",value:"0",required:!0}},{key:"y",value:{name:"literal",value:"0",required:!0}}]}}],alias:"Direction"}},{name:"markers",optional:!1,type:{name:'intersection["markers"]',raw:'LabelImageProps["markers"]'}},{name:"thisIndex",optional:!1,type:{name:"number"}}],returns:{type:{name:"number"}},description:`Calculate the next marker to navigate to, from the "this marker".

Given a cardinal navigation direction (in the x or y axis), return the
next marker index to visit.`},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
    markers: ReadonlyArray<{
        selected?: ReadonlyArray<string>;
        label: string;
    }>;
}`,signature:{properties:[{key:"markers",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected?: ReadonlyArray<string>;
    label: string;
}`,signature:{properties:[{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"label",value:{name:"string",required:!0}}]}}],raw:`ReadonlyArray<{
    selected?: ReadonlyArray<string>;
    label: string;
}>`,required:!0}}]}}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}}]}}],raw:"UserInputMarker[]",required:!0}}]},required:!0}}]}}}},{name:"showRationalesForCurrentlySelectedChoices",docblock:null,modifiers:[],params:[],returns:null},{name:"handleMarkerChange",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"marker",optional:!1,type:{name:'intersection["markers"][number]',raw:'LabelImageProps["markers"][number]'}}],returns:null},{name:"activateMarker",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"opened",optional:!1,type:{name:"boolean"}}],returns:null},{name:"handleMarkerKeyDown",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"e",optional:!1,type:{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent",alias:"React.KeyboardEvent"}}],returns:null},{name:"handleAnswerChoicesChangeForMarker",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"selection",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",alias:"ReadonlyArray"}}],returns:null},{name:"renderMarkers",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"ReadonlyArray<React.ReactNode>"}}},{name:"renderInstructions",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactNode",raw:"React.ReactNode"}}}],displayName:"LabelImage"};const mg=(n,e)=>({type:"matcher",options:{labels:n.labels,left:n.left,right:n.right,orderMatters:n.orderMatters},userInput:{left:e.left,right:e.right}}),cg="perseus-widget-matcher",yt=class yt extends s.Component{constructor(){super(...arguments),this.state={leftHeight:0,rightHeight:0,texRendererLoaded:!1},this.changeAndTrack=e=>{this.props.onChange(e),this.props.trackInteraction()},this.onMeasureLeft=e=>{const t=h.max(e.heights);this.setState({leftHeight:t})},this.onMeasureRight=e=>{const t=h.max(e.heights);this.setState({rightHeight:t})},this.getUserInput=()=>this.state.texRendererLoaded?{left:this.refs.left.getOptions(),right:this.refs.right.getOptions()}:{left:[],right:[]},this.moveLeftOptionToIndex=(e,t)=>{this.refs.left.moveOptionToIndex(e,t)},this.moveRightOptionToIndex=(e,t)=>{this.refs.right.moveOptionToIndex(e,t)}}getPromptJSON(){return mg(this.props,this.getUserInput())}render(){if(!this.state.texRendererLoaded){const{TeX:o}=qe();return s.createElement(s.Fragment,null,s.createElement(Vl,null),s.createElement("div",{style:{display:"none"}},s.createElement(o,{onRender:()=>{this.setState({texRendererLoaded:!0})}},"1")))}const{left:e,right:t}=Hs(this.props),r=h.any(this.props.labels),a={height:h.max([this.state.leftHeight,this.state.rightHeight])},i=this.props.apiOptions.isMobile?8:5;return s.createElement("table",{className:T.css(ge.widget)+" "+cg},s.createElement("tbody",null,r&&s.createElement("tr",{className:T.css(ge.row)},s.createElement("th",{className:T.css(ge.column,ge.columnLabel)},s.createElement(X,{content:this.props.labels[0]||"...",linterContext:this.props.linterContext,strings:this.context.strings})),s.createElement("th",{className:T.css(ge.column,ge.columnRight,ge.columnLabel)},s.createElement(X,{content:this.props.labels[1]||"...",linterContext:this.props.linterContext,strings:this.context.strings}))),s.createElement("tr",{className:T.css(ge.row)},s.createElement("td",{className:T.css(ge.column)},s.createElement(Vt,{options:e,layout:"vertical",padding:this.props.padding,disabled:!this.props.orderMatters,constraints:a,onMeasure:this.onMeasureLeft,onChange:this.changeAndTrack,margin:i,linterContext:this.props.linterContext,ref:"left"})),s.createElement("td",{className:T.css(ge.column,ge.columnRight)},s.createElement(Vt,{options:t,layout:"vertical",padding:this.props.padding,constraints:a,onMeasure:this.onMeasureRight,onChange:this.changeAndTrack,margin:i,linterContext:this.props.linterContext,ref:"right"})))))}};yt.contextType=G,yt.defaultProps={left:[],right:[],labels:["",""],orderMatters:!1,padding:!0,problemNum:0,onChange:function(){},linterContext:re};let rt=yt;const _n=5,gi="1px solid #444",ge=T.StyleSheet.create({widget:{paddingTop:_n,maxWidth:"100%",minWidth:"auto"},row:{border:0},column:{padding:0,border:0},columnRight:{borderLeft:gi},columnLabel:{fontWeight:"inherit",borderBottom:gi,padding:`0 ${_n}px ${_n}px ${_n}px`,textAlign:"center"}}),pg={name:"matcher",displayName:"Matcher (two column)",widget:rt,isLintable:!0};rt.__docgenInfo={description:"",methods:[{name:"changeAndTrack",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"onMeasureLeft",docblock:null,modifiers:[],params:[{name:"dimensions",optional:!1,type:null}],returns:null},{name:"onMeasureRight",docblock:null,modifiers:[],params:[{name:"dimensions",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:null},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"left",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"right",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!0}}]}}}},{name:"moveLeftOptionToIndex",docblock:null,modifiers:[],params:[{name:"option",optional:!1,type:null},{name:"index",optional:!1,type:null}],returns:null},{name:"moveRightOptionToIndex",docblock:null,modifiers:[],params:[{name:"option",optional:!1,type:null},{name:"index",optional:!1,type:null}],returns:null}],displayName:"Matcher",props:{widgetId:{required:!0,tsType:{name:"string"},description:""},alignment:{required:!0,tsType:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},description:""},static:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},problemNum:{required:!1,tsType:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},description:"",defaultValue:{value:"0",computed:!1}},apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`},description:""},keypadElement:{required:!1,tsType:{name:"any"},description:""},questionCompleted:{required:!1,tsType:{name:"boolean"},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},onFocus:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},onBlur:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},findWidgets:{required:!0,tsType:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}}},description:""},reviewModeRubric:{required:!1,tsType:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"RubricRegistry[RubricRegistry]",raw:"RubricRegistry[keyof RubricRegistry]"},{name:"null"},{name:"undefined"}]},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:"",defaultValue:{value:"function () {}",computed:!1}},trackInteraction:{required:!0,tsType:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"TrackingExtraArgs"},name:"extraData"}],return:{name:"void"}}},description:""},isLastUsedWidget:{required:!0,tsType:{name:"boolean"},description:""},linterContext:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:"",defaultValue:{value:`{
    contentType: "",
    highlightLint: false,
    paths: [] as ReadonlyArray<any>,
    stack: [] as ReadonlyArray<any>,
}`,computed:!1}},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},left:{defaultValue:{value:"[]",computed:!1},required:!1},right:{defaultValue:{value:"[]",computed:!1},required:!1},labels:{defaultValue:{value:'["", ""]',computed:!1},required:!1},orderMatters:{defaultValue:{value:"false",computed:!1},required:!1},padding:{defaultValue:{value:"true",computed:!1},required:!1}}};const gg=(n,e)=>({type:"matrix",options:{height:n.matrixBoardSize[0],width:n.matrixBoardSize[1]},userInput:{answerRows:e.answers}}),{assert:ks}=Er,{stringArrayOfSize:hg}=J,yg={INPUT_MARGIN:3,INPUT_HEIGHT:30,INPUT_WIDTH:40},wg={INPUT_MARGIN:4,INPUT_HEIGHT:36,INPUT_WIDTH:64};function ke(n,e){return[""+n,""+e]}const hi=function(){return ke(0,0)},xs=function(n){return ks(h.isArray(n)&&n.length===2),+n[0]},qs=function(n){return ks(h.isArray(n)&&n.length===2),+n[1]},en=function(n){const e=xs(n),t=qs(n);return"answer"+e+","+t},wt=class wt extends s.Component{constructor(){super(...arguments),this.state={enterTheMatrix:0},this.getInputPaths=()=>{const e=[],t=this.props.matrixBoardSize[0],r=this.props.matrixBoardSize[1];return h(t).times(a=>{h(r).times(i=>{const o=ke(a,i);e.push(o)})}),e},this._handleFocus=(e,t)=>{this.props.onFocus(ke(e,t))},this._handleBlur=(e,t)=>{this.props.onBlur(ke(e,t))},this.focus=()=>(this.focusInputPath(hi()),!0),this.focusInputPath=e=>{const t=en(e);this.refs[t].focus()},this.blurInputPath=e=>{e.length===0&&(e=hi());const t=en(e);this.refs[t].blur()},this.setInputValue=(e,t,r)=>{const a=xs(e),i=qs(e);this.onValueChange(a,i,t,r)},this.handleKeyDown=(e,t,r)=>{const a=this.props.matrixBoardSize[0],i=this.props.matrixBoardSize[1];let o=null;const l=this.refs[en(ke(e,t))],u=l.getStringValue(),d=l.getSelectionStart(),m=l.getSelectionEnd();let p=null;if(r.key==="ArrowUp"&&e>0?p=ke(e-1,t):r.key==="ArrowDown"&&e+1<a?p=ke(e+1,t):r.key==="ArrowLeft"&&t>0?d===0&&m===0&&(p=ke(e,t-1)):r.key==="ArrowRight"&&t+1<i?d===u.length&&(p=ke(e,t+1)):r.key==="Enter"?o=this.state.enterTheMatrix+1:r.key==="Escape"&&(o=0),p){r.preventDefault();const c=this.refs[en(p)],y=c.getStringValue().length*2;c.focus(),r.key==="ArrowRight"?c.setSelectionRange(0,0):c.setSelectionRange(y,y)}o!=null&&this.setState({enterTheMatrix:o})},this.onValueChange=(e,t,r,a)=>{const i=this.props.answers.map(o=>[...o]);i[e]||(i[e]=[]),i[e][t]=r,this.props.onChange({answers:i},a),this.props.trackInteraction()}}componentDidMount(){this.cursorPosition=[0,0]}getDOMNodeForPath(e){const t=en(e);return K.findDOMNode(this.refs[t])}getUserInput(){return{answers:this.props.answers}}getPromptJSON(){return gg(this.props,this.getUserInput())}render(){let e;this.props.apiOptions.customKeypad?e=wg:e=yg;const{INPUT_MARGIN:t,INPUT_HEIGHT:r,INPUT_WIDTH:a}=e,i=ul(this.props.answers),o=this.props.matrixBoardSize[0],l=this.props.matrixBoardSize[1],u=this.props.cursorPosition[0],d=this.props.cursorPosition[1],m=Math.max(u,i[0]-1),p=Math.max(d,i[1]-1),c=(m+1)*(r+2*t),g=(p+1)*(a+2*t),y=Fe({"perseus-matrix":!0,"static-mode":this.props.static,"the-matrix":this.state.enterTheMatrix>=5});return s.createElement("div",{className:y},this.props.prefix&&s.createElement("div",{className:"matrix-prefix"},s.createElement(X,{content:this.props.prefix,linterContext:this.props.linterContext,strings:this.context.strings})),s.createElement("div",{className:"matrix-input"},s.createElement("div",{className:"matrix-bracket bracket-left",style:{height:c}}),s.createElement("div",{className:"matrix-bracket bracket-right",style:{height:c,left:g}}),h(o).times(w=>{const v=this.props.answers[w];return s.createElement("div",{className:"matrix-row",key:w},h(l).times(q=>{const k=w>m||q>p,P={className:k?"outside":"inside",ref:en(ke(w,q)),value:v?v[q]:null,style:{height:r,width:a,margin:t},disabled:this.props.apiOptions.readOnly,onFocus:()=>{this.cursorPosition=[w,q],this.props.onChange({cursorPosition:[w,q]},()=>!1),this._handleFocus(w,q)},onBlur:()=>{w===this.cursorPosition[0]&&q===this.cursorPosition[1]&&this.props.onChange({cursorPosition:[0,0]},()=>!1),this._handleBlur(w,q)},onKeyDown:I=>{this.handleKeyDown(w,q,I)},onChange:(I,E)=>{this.onValueChange(w,q,I,E)}};let C;if(this.props.apiOptions.customKeypad){const I={margin:t,minWidth:a,minHeight:r,boxSizing:"border-box",backgroundColor:k?"#f3f3f3":"#fff"};C=s.createElement(Nn,{...P,style:I,scrollable:!0,keypadElement:this.props.keypadElement})}else if(this.props.numericInput)C=s.createElement(Si,{...P});else{const I={...P,style:T.StyleSheet.create({input:{...P.style,display:"inline-block",padding:0,backgroundColor:k?"#f3f3f3":"#fff"}}).input};C=s.createElement(Ll,{...I})}return s.createElement("span",{key:q,className:"matrix-input-field"},C)}))})),this.props.suffix&&s.createElement("div",{className:"matrix-suffix"},s.createElement(X,{content:this.props.suffix,linterContext:this.props.linterContext,strings:this.context.strings})))}};wt.contextType=G,wt.defaultProps={matrixBoardSize:[3,3],answers:[[]],prefix:"",suffix:"",cursorPosition:[0,0],apiOptions:Ne.defaults,linterContext:re};let wr=wt;const fg=n=>{const e=h(n.matrixBoardSize[0]).times(function(){return hg(n.matrixBoardSize[1])});return n=h.pick(n,"matrixBoardSize","prefix","suffix"),h.extend(n,{answers:e})},bg=n=>{const e=h.pick(n,"matrixBoardSize","prefix","suffix");return e.answers=h.map(n.answers,t=>h.map(t,r=>r!=null?String(r):"")),e},vg={name:"matrix",displayName:"Matrix",hidden:!0,widget:wr,transform:fg,staticTransform:bg,isLintable:!0},kg=()=>Je("measurer"),yi={url:null,top:0,left:0},aa=class aa extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.state={}}componentDidMount(){this.setupGraphie()}componentDidUpdate(e){h.any(["box","showProtractor","showRuler","rulerLabel","rulerTicks","rulerPixels","rulerLength"],r=>e[r]!==this.props[r],this)&&this.setupGraphie()}setupGraphie(){const e=K.findDOMNode(this.refs.graphieDiv);D(e).empty();const t=this.graphie=Ri.createGraphie(e),r=[40,40],a=[[0,this.props.box[0]/r[0]],[0,this.props.box[1]/r[1]]];t.init({range:a,scale:r}),t.addMouseLayer({allowScratchpad:!0,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable}),this.protractor&&this.protractor.remove(),this.props.showProtractor&&(this.protractor=t.protractor([this.props.protractorX,this.props.protractorY])),this.ruler&&this.ruler.remove(),this.props.showRuler&&(this.ruler=t.ruler({center:[(a[0][0]+a[0][1])/2,(a[1][0]+a[1][1])/2],label:this.props.rulerLabel,pixelsPerUnit:this.props.rulerPixels,ticksPerUnit:this.props.rulerTicks,units:this.props.rulerLength}))}getPromptJSON(){return kg()}render(){const e=h.extend({},yi,this.props.image);return s.createElement("div",{className:"perseus-widget perseus-widget-measurer graphie-container blank-background",style:{width:this.props.box[0],height:this.props.box[1]}},e.url&&s.createElement("div",{style:{position:"relative",top:e.top,left:e.left}},s.createElement(En,{src:e.url})),s.createElement("div",{className:"graphie",ref:"graphieDiv"}))}};aa.defaultProps={box:[480,480],image:yi,showProtractor:!0,protractorX:7.5,protractorY:.5,showRuler:!1,rulerLabel:"",rulerTicks:10,rulerPixels:40,rulerLength:10};let fr=aa;const xg={name:"measurer",displayName:"Measurer",hidden:!0,widget:fr,version:ha.version,propUpgrades:ha.widgetOptionsUpgrades};function qg(n,e){e.value!==null&&(n.fillStyle=ue.fgColor,n.font=ue.font,n.fillText(e.value,e.pos[0]-ue.fontSizePx/2+1,e.pos[1]+ue.fontSizePx/2))}function Pg(n,e){let t=new Path2D;n.lineWidth=5*ue.lineWidth,n.strokeStyle=ue.fgColor,t.moveTo(e.startPos[0],e.startPos[1]),t.lineTo(e.endPos[0],e.endPos[1]),n.stroke(t),t=new Path2D,n.lineWidth=3*ue.lineWidth,n.strokeStyle=ue.bgColor,t.moveTo(e.startPos[0],e.startPos[1]),t.lineTo(e.endPos[0],e.endPos[1]),n.stroke(t)}function Ag(n,e){let t=new Path2D;n.lineWidth=7*ue.lineWidth,n.strokeStyle=ue.fgColor,t.moveTo(e.startPos[0],e.startPos[1]),t.lineTo(e.endPos[0],e.endPos[1]),n.stroke(t),t=new Path2D,n.lineWidth=5*ue.lineWidth,n.strokeStyle=ue.bgColor,t.moveTo(e.startPos[0],e.startPos[1]),t.lineTo(e.endPos[0],e.endPos[1]),n.stroke(t),Ps(n,e)}function Ps(n,e){const t=new Path2D;n.lineWidth=ue.lineWidth,n.strokeStyle=ue.fgColor,t.moveTo(e.startPos[0],e.startPos[1]),t.lineTo(e.endPos[0],e.endPos[1]),n.stroke(t)}const Cg={text:qg,"line:single":Ps,"line:double":Pg,"line:triple":Ag};function Tg(n){return function(e){Cg[e.type](n,e)}}const wi={"line:single":0,"line:double":0,"line:triple":0,text:1};function Rg(n,e){return wi[n.type]-wi[e.type]}function Ig(n,e){e.sort(Rg).forEach(Tg(n))}const ue={bgColor:"rgb(255, 255, 255)",fgColor:"rgb(0, 0, 0)",fontSizePx:12,lineWidth:1,font:"12px sans"},As=30;function Ng(n,e,t){const r=n[0],a=n[1];return[r+Math.cos(e*2*Math.PI/360)*t,a+-1*Math.sin(e*2*Math.PI/360)*t]}function Cs(n,e,t,r){let a=n.symbol;if(a==="C"&&Object.keys(e).length!==1&&(a=null),n.idx==="1,0"){const g=[0,0];return n.pos=g,n.baseAngle=-30+r,{type:"text",value:a,pos:g,idx:n.idx}}const i=e[n.connections.find(function(g){return e[g].pos})],o=i.connections.indexOf(n.idx);let l=60,u=120;i.connections.length===4?(u=90,l=90):(t.find(g=>g.bondType==="triple"&&g.to===n.idx)||t.find(g=>g.bondType==="triple"&&g.to===i.idx))&&(u=0,l=0);let d=0;const m=i.idx.split(":"),p=m[m.length-1].split(",")[0];parseInt(p)%2!==0?d=i.baseAngle-(l-u*o):d=i.baseAngle+(l-u*o);const c=Ng(i.pos,d,As);return n.pos=c,n.baseAngle=d,{type:"text",value:a,pos:c,idx:n.idx}}function Eg(n,e){let r=[n.pos[0],n.pos[1]],a=[e.pos[0],e.pos[1]];return n.symbol!=="C"&&(r=[e.pos[0]-(1-.25)*(e.pos[0]-n.pos[0]),e.pos[1]-(1-.25)*(e.pos[1]-n.pos[1])]),e.symbol!=="C"&&(a=[n.pos[0]-(1-.25)*(n.pos[0]-e.pos[0]),n.pos[1]-(1-.25)*(n.pos[1]-e.pos[1])]),[r,a]}function Ts(n,e){const t=e[n.from],r=e[n.to],a=Eg(t,r);return{type:"line:"+n.bondType,startPos:a[0],endPos:a[1]}}function fi(n){return n.join(":")}function Yr(n,e,t){if(t===null)return[n,e];if(t.type==="atom"){const r=fi(t.idx);n[r]={idx:r,symbol:t.symbol,connections:[]},t.bonds&&t.bonds.forEach(function(a){const i=fi(a.to.idx);n[r].connections.push(i),e.push({from:r,to:i,bondType:a.bondType}),Yr(n,e,a.to),n[i].connections.push(r)})}return[n,e]}function Rs(n,e,t,r,a){if(e.length===0)return n;const i=e.shift(),o=t[i];return o.connections.forEach(function(l){t[l].pos||e.push(l)}),Rs(n.concat(Cs(o,t,r,a)),e,t,r,a)}function Is(n,e,t){return t.length===0?n:Is(n.concat(Ts(t[0],e)),e,t.slice(1))}function Sg(n,e){const t=Yr({},[],n),r=t[0],a=t[1],i=Rs([],["1,0"],r,a,e);return Is(i,r,a)}const Og={layout:Sg,_atomLayout:Cs,_bondLayout:Ts,_bondLength:As,_convertTree:Yr},Mg=new RegExp("^[A-Za-z\\[\\]()=#+-]*$"),Ns=new RegExp("^(Cl|Br|[CONPSFBI]|\\[)");function cn(n){this.message=n}function pn(n,e,t){const r=e[0],a=e.slice(1);let i;Array.isArray(n)?i=[...n]:i={...n||{}};let o=t;return a.length>0&&(o=pn(i[r],a,t)),i[r]=o,i}function Lg(n,e){const t=e.reduce(function(r,a){return r[a]},n);return pn(n,e,t+1)}function Dg(n){return Mg.test(n)}function jg(n,e){const t=n[0],r=n.slice(1);if(t==="=")return gn(r,pn(e,["bond","bondType"],"double"));if(t==="#")return gn(r,pn(e,["bond","bondType"],"triple"));throw new cn("Invalid character: "+t)}function Un(n,e){if(e.length===0)return n;if(n==="")throw new cn("Mismatched parentheses");const t=n[0],r=n.slice(1);return t==="("?Un(r,e.concat(t)):t===")"?Un(r,e.slice(1)):Un(r,e)}function Fg(n,e){const t=n[0],r=n.slice(1);if(t==="("){let a={...e,parens:e.parens+"("};a=Lg(e,["idx",e.idx.length-1,1]);let i=-1;e.idx[e.idx.length-1][0]%2===0&&(i=0);const o={...a,idx:a.idx.concat([[i,0]]),parens:a.parens.concat("(")},l=gn(r,o),u=gn(Un(r,["("]),a);return[l].concat(u)}if(t===")"){if(e.parens[e.parens.length-1]!=="(")throw new cn("Mismatched parentheses");return null}throw new cn("Invalid bare character: "+t)}function Wg(n,e){let t=null,r=null;if(n[0]==="["){const a=n.indexOf("]");if(a===-1)return["",n];t=n.slice(1,a),r=n.slice(a+1)}else t=Ns.exec(n)[1],r=n.slice(t.length);return[t,r]}function Gg(n,e){const t=Wg(n),r=t[0];if(r==="")return["error","Unable to parse bracketed atom."];const a=t[1],i=pn(e,["idx",e.idx.length-1],[1+e.idx[e.idx.length-1][0],0]);let o=gn(a,pn(i,["bond","bondType"],"single"));!Array.isArray(o)&&o&&(o=[o]);const l={type:"atom",symbol:r,bonds:o,idx:i.idx};return e.bond?{type:"bond",bondType:e.bond.bondType,to:l}:l}function _g(n){return Ns.test(n)}function Vg(n){return n==="="||n==="#"}function gn(n,e){if(!Dg(n))throw new cn("Invalid input.");return!n||n.length===0?null:_g(n)?Gg(n,e||{idx:[[0,0]],parens:[],stack:[],bondModifiers:[]}):Vg(n[0])?jg(n,e):Fg(n,e)}const Es={parse:gn,ParseError:cn},{layout:Hg}=Og,$g=Es.parse,Ug=Es.ParseError,Vn=30,ia=class ia extends s.Component{constructor(){super(...arguments),this.state={parsedSmiles:null,error:null},this.stateFromSmiles=e=>{try{this.setState({parsedSmiles:$g(e),error:null})}catch(t){if(t instanceof Ug)this.setState({error:t.message});else throw t}},this.setCanvasBounds=(e,t)=>{const r=Math.max(...t.map(d=>d.pos?d.pos[0]:-1/0)),a=Math.max(...t.map(d=>d.pos?d.pos[1]:-1/0)),i=Math.min(...t.map(d=>d.pos?d.pos[0]:1/0)),o=Math.min(...t.map(d=>d.pos?d.pos[1]:1/0)),l=r-i+2*Vn,u=a-o+2*Vn;return e.width=l,e.height=u,[Vn-i,Vn-o]},this.canvasRender=()=>{if(this.state.error||!this.state.parsedSmiles)return;const e=Hg(this.state.parsedSmiles,this.props.rotationAngle),t=this.refs.canvas,r=this.setCanvasBounds(t,e),a=t.getContext("2d");a.clearRect(0,0,t.width,t.height),a.save(),a.translate(r[0],r[1]),Ig(a,e),a.restore()}}UNSAFE_componentWillMount(){this.stateFromSmiles(this.props.smiles)}componentDidMount(){this.canvasRender()}UNSAFE_componentWillReceiveProps(e){this.stateFromSmiles(e.smiles)}componentDidUpdate(){this.canvasRender()}render(){let e=s.createElement("canvas",{className:"molecule-canvas",id:this.props.widgetId+"-molecule",ref:"canvas"},this.context.strings.molecularDrawing({content:this.props.smiles||""}));return this.state.error&&(e=s.createElement("div",{className:"error"},this.state.error)),s.createElement("div",{className:"molecule-canvas"},e)}};ia.contextType=G;let br=ia;const oa=class oa extends s.Component{constructor(){super(...arguments),this.isWidget=!0}render(){return s.createElement(br,{widgetId:this.props.widgetId,smiles:this.props.smiles,rotationAngle:this.props.rotationAngle})}};oa.defaultProps={rotationAngle:0};let vr=oa;const Xg={name:"molecule-renderer",displayName:"Molecule renderer",hidden:!0,widget:vr},Yg=(n,e)=>({type:"number-line",options:{range:n.range,numDivisions:n.numDivisions,snapDivisions:n.snapDivisions},userInput:{numLinePosition:e.numLinePosition,numDivisions:e.numDivisions}}),zg=Z.MovablePoint,Bg=Z.Line,{assert:Kg}=Er,Jg=(n,e,t)=>Math.min(Math.max(n,e),t),Qg="–",Dt=30,Zg={ge:"le",gt:"lt",le:"ge",lt:"gt"},eh={ge:"gt",gt:"ge",le:"lt",lt:"le"};function at(n,e){return e===1?""+n:`\\dfrac{${n}}{${e}}`}function Ss(n,e){if(n<0)return"-"+Ss(-n,e);const t=Math.floor(n/e);return t===0?at(n,e):n-t*e===0?""+t:t+at(n-t*e,e)}function nh(n,e,t){const r=Math.floor(t/e);return at(n*r,t)}const th=(n,e,t,r,a)=>{if(r=r||t,e==="decimal"||e==="decimal ticks")return n.label([t,-.53],Math.round(r*100)/100,"center");if(e==="improper"){const i=Ye.toFraction(r);return n.label([t,-.17],at(i[0],i[1]),"below")}if(e==="mixed"){const i=Ye.toFraction(r);return n.label([t,-.17],Ss(i[0],i[1]),"below")}if(e==="non-reduced"){const i=Ye.toFraction(r);return n.label([t,-.17],nh(i[0],i[1],a),"below")}},rh=Z.createSimpleClass((n,e)=>{if(!h.isFinite(e.tickStep)||e.tickStep<=0)return[];const t=[],{range:r,labelRange:a,labelStyle:i,labelTicks:o,tickStep:l,numDivisions:u}=e,d=a[0]==null?r[0]:a[0],m=a[1]==null?r[1]:a[1];let p;if(i==="non-reduced"){const q=[d,m];for(let C=0;C<=u;C++){const I=r[0]+C*l;q.push(I)}const k=C=>dl(C)[1],P=h.map(q,k);p=h.reduce(P,(C,I)=>Ye.getLCM(C,I))}else p=void 0;const c={stroke:M.BLUE,strokeWidth:3.5},g={color:M.BLUE},y=[...Array(Math.round(u)).keys()].map(q=>r[0]+q*l),w=(q,k)=>q-k;return[...new Set([...y,d,m,...r])].sort(w).forEach(q=>{const k=q===d||q===m,P=k?c:null,C=k?g:null;n.style(P,()=>{t.push(n.line([q,-.2],[q,.2]))}),(o||k||i==="decimal ticks")&&n.style(C,()=>{t.push(th(n,i,q,q,p))})}),t}),ft=class ft extends s.Component{constructor(){super(...arguments),this.state={numDivisionsEmpty:!1},this.change=(...e)=>ae.apply(this,e),this.isValid=()=>{const e=this.props.range;let t=this.props.numLinePosition;const r=this.props.divisionRange;return t=t??e[0],e[0]<e[1]&&va(t-e[0])>=0&&va(t-e[1])<=0&&r[0]<r[1]&&0<this.props.numDivisions&&0<this.props.snapDivisions},this.onNumDivisionsChange=(e,t)=>{const r=this.props.divisionRange.slice(),a=this.props.range[1]-this.props.range[0];if(e=Math.round(e),e=e<0?e*-1:e,e){const i=h.extend({},this.props,{tickStep:a/e}),o=this.snapNumLinePosition(i,this.props.numLinePosition);this.setState({numDivisionsEmpty:!1},()=>{this.props.onChange({divisionRange:r,numDivisions:e,numLinePosition:o},t)})}else this.setState({numDivisionsEmpty:!0},t)},this._handleTickCtrlFocus=()=>{this.props.onFocus(["tick-ctrl"])},this._handleTickCtrlBlur=()=>{this.props.onBlur(["tick-ctrl"])},this.focusInputPath=e=>{e.length===1&&this.refs[e[0]].focus()},this.blurInputPath=e=>{e.length===1&&this.refs[e[0]].blur()},this.getInputPaths=()=>this.props.isTickCtrl?[["tick-ctrl"]]:[],this.setInputValue=(e,t,r)=>{e.length===1&&e[0]==="tick-ctrl"&&this.onNumDivisionsChange(t,r)},this._renderGraphie=()=>{const e=this.props.range,t=e[1]-e[0],r=h.pick(this.props,["range","isTickCtrl"]),a=h.extend({},this.props,{tickStep:t/this.props.numDivisions});return s.createElement(Z,{ref:"graphie",key:this.props.labelStyle,box:[this.props.apiOptions.isMobile?288:460,80],options:r,onMouseDown:i=>{this.refs.graphie.movables.numberLinePoint.grab(i)},setup:this._setupGraphie,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable,isMobile:this.props.apiOptions.isMobile},s.createElement(rh,{...h.pick(a,["range","numDivisions","labelTicks","labelStyle","labelRange","tickStep"]),isMobile:this.props.apiOptions.isMobile}),this._renderInequality(a),this._renderNumberLinePoint(a))},this.snapNumLinePosition=(e,t)=>{const r=e.range[0],a=e.range[1],i=e.tickStep/e.snapDivisions;let o=Jg(t,r,a);return o=r+ml(o-r,i),Kg(h.isFinite(o)),o},this.movePosition=e=>{this.change({numLinePosition:e}),this.props.trackInteraction()},this._renderNumberLinePoint=e=>{const t=h(["lt","gt"]).contains(e.rel);let r;t?r=M._BACKGROUND:e.static?r=M.BLUE:r=M.GREEN;const a={fill:r,stroke:e.static?M.BLUE:M.GREEN,"stroke-width":t?3:1},i={fill:t?M._BACKGROUND:M.GREEN,"stroke-width":t?3:1},o=e.isInequality?{stroke:M.GREEN,"fill-opacity":t?0:1}:{};return s.createElement(zg,{ref:"numberLinePoint",pointSize:6,coord:[e.numLinePosition,0],constraints:[(l,u)=>[l[0],u[1]],(l,u)=>[this.snapNumLinePosition(e,l[0]),l[1]]],normalStyle:a,highlightStyle:i,onMove:l=>{this.movePosition(l[0])},isMobile:this.props.apiOptions.isMobile,mobileStyleOverride:o,showTooltips:this.props.showTooltips,xOnlyTooltip:!0})},this.handleReverse=()=>{const e=Zg[this.props.rel];this.props.onChange({rel:e})},this.handleToggleStrict=()=>{const e=eh[this.props.rel];this.props.onChange({rel:e})},this._getInequalityEndpoint=e=>{const t=h(["ge","gt"]).contains(e.rel),r=400,a=e.range,i=(a[1]-a[0])/r,o=Dt*i,l=a[0]-o,u=a[1]+o;return t?[u,0]:[l,0]},this._renderInequality=e=>{if(e.isInequality){const t=this._getInequalityEndpoint(e),r={arrows:"->",stroke:this.props.apiOptions.isMobile?M.GREEN:M.BLUE,strokeWidth:3.5},a=["ge","gt"].includes(e.rel);return s.createElement(Bg,{start:[(a?.4:-.4)+e.numLinePosition,0],end:t,style:r})}return null},this._setupGraphie=(e,t)=>{if(!this.isValid())return;const r=this.props.apiOptions.isMobile?288-Dt*2:400,a=t.range,i=(a[1]-a[0])/r,o=Dt*i,l=a[0]-o,u=a[1]+o,m=this.props.labelStyle==="improper"||this.props.labelStyle==="mixed"||this.props.labelStyle==="non-reduced"?-1.5:-1;e.init({range:[[l,u],[m,1]],scale:[1/i,40],isMobile:this.props.apiOptions.isMobile});const c=(a[0]+a[1])/2;e.line([c,0],[u,0],{arrows:"->"}),e.line([c,0],[l,0],{arrows:"->"})}}focus(){return this.props.isTickCtrl?(this.refs["tick-ctrl"].focus(),!0):!1}getDOMNodeForPath(e){return(e==null?void 0:e.length)===1?K.findDOMNode(this.refs[e[0]]):null}getUserInput(){return{numLinePosition:this.props.numLinePosition,rel:this.props.isInequality?this.props.rel:"eq",numDivisions:this.props.numDivisions,divisionRange:this.props.divisionRange}}getPromptJSON(){return Yg(this.props,this.getUserInput())}render(){const{strings:e}=this.context,t=this.props.divisionRange,r=t[0]+Qg+t[1],a=this.props.numDivisions<t[0]||this.props.numDivisions>t[1],i=s.createElement("div",null,s.createElement("input",{type:"button",className:"simple-button",value:e.switchDirection,onClick:this.handleReverse}),s.createElement("input",{type:"button",className:"simple-button",value:h(["le","ge"]).contains(this.props.rel)?e.circleOpen:e.circleFilled,onClick:this.handleToggleStrict}));let o;if(this.props.isTickCtrl){let l;this.props.apiOptions.customKeypad?l=Nn:l=Si,o=s.createElement("label",null,e.numDivisions," ",s.createElement(l,{ref:"tick-ctrl",value:this.state.numDivisionsEmpty?null:this.props.numDivisions||t[0],checkValidity:u=>u>=t[0]&&u<=t[1],onChange:this.onNumDivisionsChange,onFocus:this._handleTickCtrlFocus,onBlur:this._handleTickCtrlBlur,useArrowKeys:!0,keypadElement:this.props.keypadElement}))}return s.createElement("div",{className:"perseus-widget perseus-widget-interactive-number-line"},o,this.isValid()?this.props.isTickCtrl&&a?s.createElement("div",{className:"perseus-error"},e.divisions({divRangeString:r})):this._renderGraphie():s.createElement("div",{className:"perseus-error"},"Invalid number line configuration."),!this.props.static&&this.props.isInequality&&i)}};ft.contextType=G,ft.defaultProps={range:[0,10],labelStyle:"decimal",labelRange:[null,null],divisionRange:[1,12],labelTicks:!0,isTickCtrl:!1,isInequality:!1,numLinePosition:0,snapDivisions:2,showTooltips:!1,rel:"ge",apiOptions:Ne.defaults};let kr=ft;const ah=n=>{const e=h.pick(n,["range","labelRange","labelStyle","labelTicks","divisionRange","snapDivisions","isTickCtrl","isInequality","showTooltips"]),t=n.initialX!=null?n.initialX:n.range[0],r=n.range[1]-n.range[0];let a;return n.numDivisions!=null?a=n.numDivisions:n.tickStep!=null?a=r/n.tickStep:a=void 0,h.extend(e,{numLinePosition:t,numDivisions:a,snapDivisions:e.snapDivisions||void 0}),e},ih=n=>{const e=h.pick(n,["range","labelRange","labelStyle","labelTicks","divisionRange","snapDivisions","isInequality"]),t=n.correctX!=null?n.correctX:n.range[0],r=n.range[1]-n.range[0];let a;return n.numDivisions!=null?a=n.numDivisions:n.tickStep!=null?a=r/n.tickStep:a=void 0,h.extend(e,{numLinePosition:t,numDivisions:a,rel:n.isInequality?n.correctRel:null,snapDivisions:e.snapDivisions||void 0}),e},oh={name:"number-line",displayName:"Number line",widget:kr,transform:ah,staticTransform:ih},sh=(n,e)=>({type:"orderer",options:{options:n.options.map(t=>t.content)},userInput:{values:e.current}});class lh extends s.Component{render(){return s.createElement("div",{className:"card-wrap",style:{width:this.props.width}},s.createElement("div",{className:"card placeholder",style:{height:this.props.width}}))}}class uh extends s.Component{render(){return s.createElement("div",{className:"card-wrap"},s.createElement("div",{className:"card drag-hint"}))}}const bt=class bt extends s.Component{constructor(){super(...arguments),this.state={dragging:!1},this.bindMouseMoveUp=()=>{this.mouseMoveUpBound=!0,D(document).on("mousemove",this.onMouseMove),D(document).on("mouseup",this.onMouseUp)},this.unbindMouseMoveUp=()=>{this.mouseMoveUpBound=!1,D(document).off("mousemove",this.onMouseMove),D(document).off("mouseup",this.onMouseUp)},this.onMouseDown=e=>{var r,a;e.preventDefault();const t=J.extractPointerLocation(e);t&&(this.setState({dragging:!0}),this.bindMouseMoveUp(),(a=(r=this.props).onMouseDown)==null||a.call(r,t,this))},this.onMouseMove=e=>{var r,a;if(!this.state.dragging)return;e.preventDefault();const t=J.extractPointerLocation(e);t&&((a=(r=this.props).onMouseMove)==null||a.call(r,t))},this.onMouseUp=e=>{var r,a;e.preventDefault();const t=J.extractPointerLocation(e);t&&(this.setState({dragging:!1}),this.unbindMouseMoveUp(),(a=(r=this.props).onMouseUp)==null||a.call(r,t))}}componentDidMount(){this.mouseMoveUpBound=!1,document.addEventListener("touchmove",this.onMouseMove,J.supportsPassiveEvents()?{passive:!1}:!1)}shouldComponentUpdate(e,t){return this.props.floating||e.floating||this.props.content!==e.content||this.props.fakeRef!==e.fakeRef}componentDidUpdate(e,t){if(this.props.animating&&!e.animating&&this.props.animateTo&&this.props.startOffset){const r=15*Math.sqrt(Math.sqrt(Math.pow(this.props.animateTo.left-this.props.startOffset.left,2)+Math.pow(this.props.animateTo.top-this.props.startOffset.top,2)));D(K.findDOMNode(this)).animate(this.props.animateTo,Math.max(r,1),this.props.onAnimationEnd)}}componentWillUnmount(){this.mouseMoveUpBound&&(Ti.error("Removing an element with bound event handlers.",Ke.Internal),this.unbindMouseMoveUp(),J.resetTouchHandlers()),document.removeEventListener("touchmove",this.onMouseMove)}render(){var i,o;let e={};this.props.floating&&(e={position:"absolute",left:(i=this.props.startOffset)==null?void 0:i.left,top:(o=this.props.startOffset)==null?void 0:o.top}),this.props.width&&(e.width=this.props.width);const t=["card"];this.props.stack&&t.push("stack"),this.props.floating&&!this.props.animating&&this.props.mouse&&this.props.startMouse&&(t.push("dragging"),e.left+=this.props.mouse.left-this.props.startMouse.left,e.top+=this.props.mouse.top-this.props.startMouse.top);const r=h.pick(this.props,"content"),a=this.props.animating?D.noop:this.onMouseDown;return s.createElement("div",{className:"card-wrap",style:e,onMouseDown:a,onTouchStart:a,onTouchEnd:this.onMouseUp,onTouchCancel:this.onMouseUp},s.createElement("div",{className:t.join(" ")},s.createElement(X,{...r,linterContext:this.props.linterContext,strings:this.context.strings})))}};bt.contextType=G,bt.defaultProps={stack:!1,animating:!1,linterContext:re};let tn=bt;const sa=class sa extends s.Component{constructor(){super(...arguments),this.state={current:[],dragging:!1,placeholderIndex:null,dragKey:null,animating:!1,dragContent:null,dragWidth:null,dragHeight:null,offsetPos:null,animateTo:null,grabPos:null},this.onClick=(e,t,r,a)=>{const i=D(K.findDOMNode(a)),o=this.state.current.slice();let l,u=null;e==="current"?(o.splice(t,1),l=this.state.current[t],u=t):e==="bank"&&(l=this.props.options[t]),this.setState({current:o,dragging:!0,placeholderIndex:u,dragKey:l.key,dragContent:l.content,dragWidth:i.width(),dragHeight:i.height(),grabPos:r,mousePos:r,offsetPos:i.position()})},this.onRelease=e=>{const t=this.refs.dragging;if(t==null)return;const r=this.isCardInBank(t),a=this.state.placeholderIndex||0,i=()=>{const u=this.state.current.slice();if(!r){const d={content:this.state.dragContent,key:h.uniqueId("perseus_draggable_card_"),width:this.state.dragWidth};u.splice(a,0,d)}this.props.onChange({current:u}),this.setState({current:u,dragging:!1,placeholderIndex:null,animating:!1}),this.props.trackInteraction()},o=D(K.findDOMNode(t)).position();let l=null;r?h.each(this.props.options,function(u,d){if(u.content===this.state.dragContent){const m=K.findDOMNode(this.refs["bank"+d]);l=D(m).position()}},this):this.refs.placeholder!=null&&(l=D(K.findDOMNode(this.refs.placeholder)).position()),l==null?i():this.setState({offsetPos:o,animateTo:l,onAnimationEnd:i,animating:!0,dragging:!1})},this.onMouseMove=e=>{const t=this.refs.dragging;if(t==null)return;let r;this.isCardInBank(t)?r=null:r=this.findCorrectIndex(t,this.state.current),this.setState({mousePos:e,placeholderIndex:r})},this.findCorrectIndex=(e,t)=>{const r=this.props.layout==="horizontal",a=D(K.findDOMNode(this.refs.dragList)),i=a.offset().left,o=a.offset().top,l=D(K.findDOMNode(e)).offset().left-i,u=D(K.findDOMNode(e)).offset().top-o;let d=0,m=0,p=0;return r?h.each(t,function(c,g){const y=K.findDOMNode(this.refs["sortable"+g]),w=D(y).outerWidth(!0);l>m+w/2&&(d+=1),m+=w},this):h.each(t,function(c,g){const y=K.findDOMNode(this.refs["sortable"+g]),w=D(y).outerHeight(!0);u>p+w/2&&(d+=1),p+=w},this),d},this.isCardInBank=e=>{if(e==null)return!1;const t=this.props.layout==="horizontal",r=D(K.findDOMNode(e)),a=D(K.findDOMNode(this.refs.bank)),i=r.offset(),o=a.offset(),l=r.outerHeight(!0),u=a.outerHeight(!0),d=a.outerWidth(!0),m=r.outerWidth(!0);return t?i.top+l/2<o.top+u:i.left+m/2<o.left+d},this.setListValues=e=>{const t=e.map(r=>({content:r}));this.props.onChange({current:t}),this.setState({current:t})}}UNSAFE_componentWillReceiveProps(e){h.isEqual(this.props.current,e.current)||this.setState({current:e.current})}getUserInput(){return{current:h.map(this.props.current,function(e){return e.content})}}getPromptJSON(){return sh(this.props,this.getUserInput())}render(){const e=this.state.dragging&&s.createElement(tn,{ref:"dragging",floating:!0,content:this.state.dragContent,startOffset:this.state.offsetPos,startMouse:this.state.grabPos,mouse:this.state.mousePos,width:this.state.dragWidth,onMouseUp:this.onRelease,onMouseMove:this.onMouseMove,key:this.state.dragKey||"draggingCard",linterContext:this.props.linterContext}),t=this.state.animating&&s.createElement(tn,{floating:!0,animating:!0,content:this.state.dragContent,startOffset:this.state.offsetPos,width:this.state.dragWidth,animateTo:this.state.animateTo,onAnimationEnd:this.state.onAnimationEnd,key:this.state.dragKey||"draggingCard",linterContext:this.props.linterContext}),r=h.map(this.state.current,function(l,u){return s.createElement(tn,{key:`sortableCard${u}`,ref:"sortable"+u,fakeRef:"sortable"+u,floating:!1,content:l.content,width:l.width,linterContext:this.props.linterContext,onMouseDown:this.state.animating?D.noop:this.onClick.bind(null,"current",u)})},this);if(this.state.placeholderIndex!=null){const l=s.createElement(lh,{ref:"placeholder",width:this.state.dragWidth,height:this.state.dragHeight,key:"placeholder"});r.splice(this.state.placeholderIndex,0,l)}const a=r.length>0;r.push(e,t);const i=s.createElement("div",{className:"perseus-clearfix draggable-box"},!a&&s.createElement(uh,null),s.createElement("div",{ref:"dragList"},r)),o=s.createElement("div",{ref:"bank",className:"bank perseus-clearfix"},h.map(this.props.options,(l,u)=>s.createElement(tn,{ref:"bank"+u,floating:!1,content:l.content,stack:!0,key:u,linterContext:this.props.linterContext,onMouseDown:this.state.animating?D.noop:this.onClick.bind(null,"bank",u),onMouseMove:this.onMouseMove,onMouseUp:this.onRelease}),this));return s.createElement("div",{className:"draggy-boxy-thing orderer height-"+this.props.height+" layout-"+this.props.layout+" blank-background perseus-clearfix ",ref:"orderer"},o,i)}};sa.defaultProps={current:[],options:[],correctOptions:[],height:"normal",layout:"horizontal",linterContext:re};let xr=sa;const dh={name:"orderer",displayName:"Orderer",hidden:!0,widget:xr,isLintable:!0},vt=class vt extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.change=(...e)=>ae.apply(this,e)}render(){return s.createElement(X,{content:this.props.content,apiOptions:this.props.apiOptions,linterContext:this.props.linterContext,strings:this.context.strings})}};vt.contextType=G,vt.defaultProps={content:"",linterContext:re};let qr=vt;const mh={name:"passage-ref-target",displayName:"PassageRefTarget",widget:qr,hidden:!0,transform:n=>h.pick(n,"content"),isLintable:!0},ch=()=>Je("plotter"),kt=class kt extends s.Component{constructor(){super(...arguments),this._isMounted=!1,this.state={values:this.props.starting||[1],categoryHeights:{}},this.DOT_PLOT_POINT_SIZE=()=>this.props.apiOptions.isMobile?6:4,this.DOT_PLOT_POINT_PADDING=()=>8,this.DOT_TICK_POINT_SIZE=()=>2,this.setupGraphie=e=>{const t=this;t.shouldSetupGraphie=!1;const r=K.findDOMNode(t.refs.graphieDiv);D(r).empty();const a=Ri.createGraphie(r);t.graphie=a,t.graphie.pics=[],t.graphie.dotTicks=[];const i=t.props.type==="bar",o=t.props.type==="line",l=t.props.type==="pic",u=t.props.type==="histogram",d=t.props.type==="dotplot",m=l||d,p={},c=p,g=this.props.apiOptions.isMobile;c.graph={lines:[],bars:[],points:[],dividers:[]},c.scaleY=t.props.scaleY,c.dimX=t.props.categories.length;const y=g?[288,336]:t.props.plotDimensions;if(o)c.dimX+=g?-.2:1;else if(u)c.barPad=0,c.barWidth=1;else if(i)c.barPad=g?.08:.15,c.barWidth=1-2*c.barPad,c.dimX+=(g?-2:2)*c.barPad;else if(m){c.picBoxHeight=t.props.picBoxHeight,c.picBoxWidthPx=y[0]/t.props.categories.length;const k=y[0]-c.dimX*c.picBoxWidthPx;c.picPad=k/(2*c.dimX+2);const P=c.picBoxWidthPx+2*c.picPad;c.picPad=c.picPad/P,c.picBoxWidth=c.picBoxWidthPx/P,c.dimX+=2*c.picPad}d&&(c.picBoxHeight=this.DOT_PLOT_POINT_SIZE()*2+this.DOT_PLOT_POINT_PADDING()),c.dimY=Math.ceil(t.props.maxY/c.scaleY)*c.scaleY;let w=25;(i||o)&&g&&(w=t.props.labels[1].length!==0?17:11),d&&(w/=2),g&&m&&t.props.labels[1].length===0&&(w=0);let v=25,q=25*3;if(g&&(i||m)){const k=Math.max(0,...Object.values(t.state.categoryHeights));if(k){let P=25;m&&(P+=10),q=P+k}}if(g?c.scale=[(y[0]-w*4)/c.dimX,(y[1]-(v+q))/c.dimY]:c.scale=h.map([c.dimX,c.dimY],function(k,P){return y[P]/k}),m&&(c.scale[1]=c.picBoxHeight/c.scaleY),w/=c.scale[0],v/=c.scale[1],q/=c.scale[1],a.init({range:[[-3*w,c.dimX+w],[-q,c.dimY+v]],scale:c.scale,isMobile:this.props.apiOptions.isMobile}),a.addMouseLayer({allowScratchpad:!0,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable}),!m){const k=g?c.scaleY:0;for(let P=k;P<=c.dimY;P+=c.scaleY)a.label([0,P],Ye.roundToApprox(P,2),"left",!0),a.style({stroke:g?"#e9ebec":"#000",strokeWidth:1,opacity:g?1:.3},function(){a.line([0,P],[c.dimX,P])})}(i||o)&&g&&!this.props.static&&(t.graphie.dragPrompt=a.label([c.dimX/2,c.dimY/2],this.context.strings.dragHandles,"center",!1).css("font-weight","bold").css("color",M.KA_GREEN).css("display","none")),t.setupCategories(p),m&&g&&(t.graphie.dotPrompt=a.label([c.dimX/2,c.dimY/2],this.context.strings.tapAddPoints,"center",!1).css("font-weight","bold").css("color",M.KA_GREEN).css("display","none")),m&&t.drawPicHeights(t.state.values,e.values),a.style({stroke:"#000",strokeWidth:2,opacity:1},function(){m?d?a.style({stroke:g?M.GRAY_G:"#000",strokeWidth:g?1:2},()=>a.line([g?0:.5,0],[c.dimX-(g?0:.5),0])):(a.line([0,0],[c.dimX,0]),(t.props.labels[1].length!==0||!g)&&a.style({stroke:g?M.GRAY_G:"#000",strokeWidth:g?1:2},()=>a.line([0,0],[0,c.dimY]))):(a.style({stroke:g?M.GRAY_G:"#000",strokeWidth:g?1:2},()=>a.line([g?-w*3:0,0],[c.dimX+(g?w:0),0])),(i||o)&&g||a.style({stroke:g?M.GRAY_G:"#000",strokeWidth:g?1:2},()=>a.line([0,0],[0,c.dimY])))}),a.label([c.dimX/2,g?-q:-35/c.scale[1]],t.props.labels[0],g?"above":"below",!1).css("font-weight","bold").css("color",g&&M.GRAY_F),a.label([(g?-35:-60)/c.scale[0],c.dimY/2],t.props.labels[1],"center",!1).css("font-weight","bold").css("color",g&&M.GRAY_F).addClass("rotate"),this.props.apiOptions.isMobile&&(this.horizHairline=new Wt(this.graphie,[0,0],[0,0],{normalStyle:{strokeWidth:1}}),this.horizHairline.attr({stroke:M.INTERACTIVE}),this.horizHairline.hide(),this.hairlineRange=[[0,c.dimX],[0,c.dimY]])},this.showHairlines=e=>{this.props.apiOptions.isMobile&&(this.horizHairline.moveTo([this.hairlineRange[0][0],e[1]],[this.hairlineRange[0][1],e[1]]),this.horizHairline.show())},this.hideHairlines=()=>{this.props.apiOptions.isMobile&&this.horizHairline.hide()},this.labelCategory=(e,t)=>{const r=this.props.apiOptions.isMobile,a=this.graphie;t=t+"";let i=!1;const o=t.match(/^\$(.*)\$$/);o&&(t=o[1],i=!0);const l=5,u=45,d=u*(Math.PI/180),m=`translateX(-50%) translateX(${l}px) translateY(-50%) rotate(-${u}deg)`,p=r&&!o;return new Promise(c=>{a.style({color:r?M.GRAY_G:"inherit",transform:p?m:"none",transformOrigin:"100%"},()=>{const g=a.label([e,r?-.5:0],t,"below",i),y=14+(p?Math.round(g.height()*Math.cos(d)+(g.width()+l)*Math.sin(d)):g.height());c({category:t,height:y})})})},this.setupCategories=e=>{const t=this,r=e,a=t.graphie,i=this.props.apiOptions.isMobile,o=[];t.props.type==="histogram"?(h.times(t.props.categories.length-1,function(l){t.setupBar({index:l,startHeight:t.state.values[l],config:e,isHistogram:!0})}),h.each(t.props.categories,function(l,u){const d=.5+u*r.barWidth;o.push(t.labelCategory(d,l));const m=6/r.scale[1];a.style({stroke:"#000",strokeWidth:i?1:2,opacity:1},function(){a.line([d,-m],[d,0])})})):h.each(t.props.categories,function(l,u){const d=t.state.values[u];let m;t.props.type==="bar"?m=t.setupBar({index:u,startHeight:d,config:e,isHistogram:!1}):t.props.type==="line"?m=t.setupLine(u,d,e):t.props.type==="pic"?m=t.setupPic(u,e):t.props.type==="dotplot"&&(m=t.setupDotplot(u,e));let p=0,c=-6/r.scale[1];t.props.type==="dotplot"&&!i&&(p=-c),t.props.type==="dotplot"?(u%t.props.labelInterval===0||u===t.props.categories.length-1)&&(o.push(t.labelCategory(m,l)),p*=1.5,c*=1.5):o.push(t.labelCategory(m,l)),a.style({stroke:i?M.GRAY_G:"#000",strokeWidth:i?1:2,opacity:1},function(){a.line([m,p],[m,c])})}),Promise.all(o).then(l=>{if(t._isMounted){const u={};l.forEach(({category:d,height:m})=>u[d]=m),t.setState({categoryHeights:u})}})},this._clampValue=(e,t,r)=>Math.max(Math.min(e,r),t),this._maybeShowDragPrompt=()=>{this.graphie.dragPrompt!=null&&(this.graphie.dragPrompt[0].style.display="inline")},this._maybeHideDragPrompt=()=>{this.graphie.dragPrompt!=null&&(this.graphie.dragPrompt[0].style.display="none")},this.setupBar=e=>{const t=this.props.apiOptions.isMobile,r=e.index,a=e.startHeight,i=e.config,o=e.isHistogram,l=this,u=l.graphie,d=i.barWidth/2;let m;o?m=.5+r*i.barWidth+d:m=(t?d:.5+i.barPad)+r;const p=function(c,g){const y=u.scalePoint(0);if(i.graph.bars[c].scale(1,Math.max(t?.2:.01,g/i.scaleY),y[0],y[1]),o){const w=i.graph.dividers[c-1],v=i.graph.dividers[c];if(w){const q=Math.min(l.state.values[c-1],g);w.scale(1,Math.max(.01,q/i.scaleY),y[0],y[1])}if(v){const q=Math.min(l.state.values[c+1],g);v.scale(1,Math.max(.01,q/i.scaleY),y[0],y[1])}}};if(u.style({stroke:"none",fill:t?M.BLUE_C:M.LIGHT_BLUE,opacity:1},function(){i.graph.bars[r]=u.path([[m-d,0],[m-d,i.scaleY],[m+d,i.scaleY],[m+d,0],[m-d,0]])}),o&&r>0&&u.style({stroke:"#000",strokeWidth:1,opacity:.3},function(){i.graph.dividers.push(u.path([[m-d,0],[m-d,i.scaleY]]))}),t){const c=i.scaleY/l.props.snapsPerLine;i.graph.lines[r]=Me.addMaybeMobileMovablePoint(this,{coord:[m,a],constraints:[(g,y,w)=>[m,this._clampValue(Math.round(g[1]/c)*c,0,i.dimY)]],onMoveStart:function(){i.graph.bars[r].attr({fill:M.INTERACTIVE})},onMove:function(){const g=i.graph.lines[r].coord()[1],y=[...l.state.values];y[r]=g,l.setState({values:y}),l.changeAndTrack({values:y}),l._maybeHideDragPrompt(),p(r,g)},onMoveEnd:function(){i.graph.bars[r].attr({fill:M.BLUE_C})}}),i.graph.lines[r].state.visibleShape.wrapper.style.zIndex="1",l._maybeShowDragPrompt()}else i.graph.lines[r]=u.addMovableLineSegment({coordA:[m-d,a],coordZ:[m+d,a],snapY:i.scaleY/l.props.snapsPerLine,constraints:{constrainX:!0},normalStyle:{stroke:M.INTERACTIVE,"stroke-width":this.props.static?0:4}}),i.graph.lines[r].onMove=function(c,g){let y=this.coordA[1];(y<0||y>i.dimY)&&(y=Math.min(Math.max(y,0),i.dimY),this.coordA[1]=this.coordZ[1]=y,this.transform());const w=[...l.state.values];w[r]=y,l.setState({values:w}),l.changeAndTrack({values:w}),p(r,y)};return p(r,a),m},this.setupLine=(e,t,r)=>{const a=this.props.apiOptions.isMobile,i=this,o=r,l=i.graphie,u=e+(a?.4:1);if(a){const d=r.scaleY/i.props.snapsPerLine;o.graph.points[e]=Me.addMaybeMobileMovablePoint(this,{coord:[u,t],constraints:[(m,p,c)=>[u,this._clampValue(Math.round(m[1]/d)*d,0,r.dimY)]],onMove:function(){const m=o.graph.points[e].coord()[1],p=[...i.state.values];p[e]=m,i.setState({values:p}),i.changeAndTrack({values:p}),i._maybeHideDragPrompt()}}),i._maybeShowDragPrompt(),e>0&&(o.graph.lines[e]=Me.addMovableLine(l,{points:[o.graph.points[e-1],o.graph.points[e]],constraints:Me.MovablePoint.constraints.fixed(),normalStyle:{stroke:M.BLUE_C,"stroke-width":2},highlightStyle:{stroke:M.BLUE_C,"stroke-width":2}}))}else o.graph.points[e]=l.addMovablePoint({coord:[u,t],constraints:{constrainX:!0},normalStyle:{fill:M.INTERACTIVE,stroke:M.INTERACTIVE},snapY:o.scaleY/i.props.snapsPerLine}),o.graph.points[e].onMove=function(d,m){m=Math.min(Math.max(m,0),o.dimY);const p=[...i.state.values];return p[e]=m,i.setState({values:p}),i.changeAndTrack({values:p}),[d,m]},e>0&&(o.graph.lines[e]=l.addMovableLineSegment({pointA:o.graph.points[e-1],pointZ:o.graph.points[e],constraints:{fixed:!0},normalStyle:{stroke:"#9ab8ed","stroke-width":2}}));return u},this.setupDotplot=(e,t)=>{const r=this.graphie,a=this.props.apiOptions.isMobile;return this.setupTiledPlot(e,a?.5:1,t,(i,o)=>r.ellipse([i,o],[this.DOT_PLOT_POINT_SIZE()/r.scale[0],this.DOT_PLOT_POINT_SIZE()/r.scale[1]],{fill:M.INTERACTIVE,stroke:M.INTERACTIVE}))},this.setupPic=(e,t)=>{const r=this.graphie;return this.setupTiledPlot(e,0,t,(a,i)=>{const o=r.scalePoint([a,i]),l=this.props.picSize;return r.raphael.image(this.props.picUrl,o[0]-l/2,o[1]-l/2,l,l)})},this.setupTiledPlot=(e,t,r,a)=>{const i=this,o=r,l=i.graphie,u=l.pics,d=l.dotTicks,m=e+.5+o.picPad;l.mouselayer.canvas.style.touchAction="none",u[e]=[],d[e]=[];const p=Math.round(o.dimY/o.scaleY)+1;return h(p).times(function(c){c-=1;const g=(c+.5)*o.scaleY,y=m-o.picBoxWidth/2,w=g+.5*o.scaleY,v=l.scalePoint([y,w+t]),q=l.mouselayer.rect(v[0],v[1],o.picBoxWidthPx,o.picBoxHeight);D(q[0]).css({fill:"#000",opacity:0,cursor:"pointer"}).on("vmousedown",function(k){k.preventDefault(),i.whichPicClicked=e,i.setPicHeight(e,w),D(document).on("vmouseup.plotTile",function(P){D(document).unbind(".plotTile")}),D(document).on("vmousemove.plotTile",function(P){P.preventDefault();const C=l.getMouseCoord(P)[1],I=Math.floor(C-t),S=(Math.max(-1,Math.floor(I/o.scaleY))+.5)*o.scaleY,R=Math.min(S+.5*o.scaleY,o.dimY);i.setPicHeight(i.whichPicClicked,R)})}),!(c<0)&&(u[e][c]=a(m,g+t),d[e][c]=l.ellipse([m,g+t],[i.DOT_TICK_POINT_SIZE()/l.scale[0],i.DOT_TICK_POINT_SIZE()/l.scale[1]],{fill:"#dee1e3",stroke:"#dee1e3"}))}),m},this.setPicHeight=(e,t)=>{const r=[...this.state.values];r[e]=t,this.drawPicHeights(r,this.state.values),this.setState({values:r}),this.changeAndTrack({values:r})},this.changeAndTrack=e=>{this.props.onChange(e),this.props.trackInteraction()},this.drawPicHeights=(e,t)=>{const r=this,a=r.graphie,i=a.pics,o=this.props.apiOptions.isMobile;if(o){const l=e.every(u=>u===0);a.dotPrompt[0].style.display=l?"inline":"none"}h.each(i,function(l,u){h.each(l,function(d,m){const p=(m+1)*r.props.scaleY,c=p<=e[u];if(r.props.type==="dotplot"){const g=p<=t[u];c&&!g&&d.animate({"stroke-width":8},75,()=>d.animate({"stroke-width":2},75))}D(d[0]).css({display:c?"inline":"none"}),a.dotTicks[u][m][0].style.display=c||!o?"none":"inline"})})}}componentDidMount(){this._isMounted=!0,this.setupGraphie(this.state)}UNSAFE_componentWillReceiveProps(e){const t=["type","labels","categories","scaleY","maxY","snapsPerLine","picUrl","labelInterval","static"];this.shouldSetupGraphie=h.any(t,r=>!h.isEqual(this.props[r],e[r]),this),!h.isEqual(this.props.starting,e.starting)&&!h.isEqual(this.state.values,e.starting)&&(this.shouldSetupGraphie=!0,this.setState({values:e.starting}))}componentDidUpdate(e,t){this.shouldSetupGraphie=this.shouldSetupGraphie||!h.isEqual(this.state.categoryHeights,t.categoryHeights),this.shouldSetupGraphie&&this.setupGraphie(t)}componentWillUnmount(){this._isMounted=!1}getUserInput(){return this.state.values}getPromptJSON(){return ch()}render(){const t={marginBottom:this.props.labels[0]?75:0};return s.createElement("div",{className:"perseus-widget-plotter graphie",ref:"graphieDiv",style:t})}};kt.contextType=G,kt.defaultProps={type:"bar",labels:["",""],categories:[""],scaleY:1,maxY:10,snapsPerLine:2,picSize:40,picBoxHeight:48,picUrl:"",plotDimensions:[380,300],labelInterval:1};let it=kt;const ph=h.identity,gh={name:"plotter",displayName:"Plotter",hidden:!0,widget:it,staticTransform:ph};it.__docgenInfo={description:"",methods:[{name:"DOT_PLOT_POINT_SIZE",docblock:null,modifiers:[],params:[],returns:null},{name:"DOT_PLOT_POINT_PADDING",docblock:null,modifiers:[],params:[],returns:null},{name:"DOT_TICK_POINT_SIZE",docblock:null,modifiers:[],params:[],returns:null},{name:"setupGraphie",docblock:null,modifiers:[],params:[{name:"prevState",optional:!1,type:null}],returns:null},{name:"showHairlines",docblock:null,modifiers:[],params:[{name:"point",optional:!1,type:null}],returns:null},{name:"hideHairlines",docblock:null,modifiers:[],params:[],returns:null},{name:"labelCategory",docblock:null,modifiers:[],params:[{name:"x",optional:!1,type:null},{name:"category",optional:!1,type:null}],returns:null},{name:"setupCategories",docblock:null,modifiers:[],params:[{name:"config",optional:!1,type:null}],returns:null},{name:"_clampValue",docblock:null,modifiers:[],params:[{name:"v",optional:!1,type:null},{name:"min",optional:!1,type:null},{name:"max",optional:!1,type:null}],returns:null},{name:"_maybeShowDragPrompt",docblock:null,modifiers:[],params:[],returns:null},{name:"_maybeHideDragPrompt",docblock:null,modifiers:[],params:[],returns:null},{name:"setupBar",docblock:null,modifiers:[],params:[{name:"args",optional:!1,type:null}],returns:null},{name:"setupLine",docblock:`Renders a segment of an interactive line to the plotter graph
@param i the index of the point to render
@param startHeight the initial height of the given point
@param config the graph setup, such as scale and dimensions`,modifiers:[],params:[{name:"i",description:"the index of the point to render",optional:!1},{name:"startHeight",description:"the initial height of the given point",optional:!1},{name:"config",description:"the graph setup, such as scale and dimensions",optional:!1}],returns:null,description:"Renders a segment of an interactive line to the plotter graph"},{name:"setupDotplot",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"config",optional:!1,type:null}],returns:null},{name:"setupPic",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"config",optional:!1,type:null}],returns:null},{name:"setupTiledPlot",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"bottomMargin",optional:!1,type:null},{name:"config",optional:!1,type:null},{name:"createImage",optional:!1,type:null}],returns:null},{name:"setPicHeight",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"y",optional:!1,type:null}],returns:null},{name:"changeAndTrack",docblock:null,modifiers:[],params:[{name:"data",optional:!1,type:null}],returns:null},{name:"drawPicHeights",docblock:null,modifiers:[],params:[{name:"values",optional:!1,type:null},{name:"prevValues",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"}}},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
| "video"`,elements:[{name:"literal",value:'"cs-program"'},{name:"literal",value:'"iframe"'},{name:"literal",value:'"interaction"'},{name:"literal",value:'"interactive-graph-unsupported"'},{name:"literal",value:'"measurer"'},{name:"literal",value:'"phet-simulation"'},{name:"literal",value:'"plotter"'},{name:"literal",value:'"python-program"'},{name:"literal",value:'"video"'}],required:!0}},{key:"message",value:{name:"string",required:!1}},{key:"isSupported",value:{name:"boolean",required:!0}}]}}}}],displayName:"Plotter",props:{widgetId:{required:!0,tsType:{name:"string"},description:""},alignment:{required:!0,tsType:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},description:""},static:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},problemNum:{required:!0,tsType:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},description:""},apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
only after a good few seconds.`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"baseElements",value:{name:"NonNullable",elements:[{name:'Readonly["baseElements"]',raw:'APIOptions["baseElements"]'}],raw:'NonNullable<APIOptions["baseElements"]>',required:!0}},{key:"canScrollPage",value:{name:"NonNullable",elements:[{name:'Readonly["canScrollPage"]',raw:'APIOptions["canScrollPage"]'}],raw:'NonNullable<APIOptions["canScrollPage"]>',required:!0}},{key:"crossOutEnabled",value:{name:"NonNullable",elements:[{name:'Readonly["crossOutEnabled"]',raw:'APIOptions["crossOutEnabled"]'}],raw:'NonNullable<APIOptions["crossOutEnabled"]>',required:!0}},{key:"editorChangeDelay",value:{name:"NonNullable",elements:[{name:'Readonly["editorChangeDelay"]',raw:'APIOptions["editorChangeDelay"]'}],raw:'NonNullable<APIOptions["editorChangeDelay"]>',required:!0}},{key:"groupAnnotator",value:{name:"NonNullable",elements:[{name:'Readonly["groupAnnotator"]',raw:'APIOptions["groupAnnotator"]'}],raw:'NonNullable<APIOptions["groupAnnotator"]>',required:!0}},{key:"isArticle",value:{name:"NonNullable",elements:[{name:'Readonly["isArticle"]',raw:'APIOptions["isArticle"]'}],raw:'NonNullable<APIOptions["isArticle"]>',required:!0}},{key:"isMobile",value:{name:"NonNullable",elements:[{name:'Readonly["isMobile"]',raw:'APIOptions["isMobile"]'}],raw:'NonNullable<APIOptions["isMobile"]>',required:!0}},{key:"onFocusChange",value:{name:"NonNullable",elements:[{name:'Readonly["onFocusChange"]',raw:'APIOptions["onFocusChange"]'}],raw:'NonNullable<APIOptions["onFocusChange"]>',required:!0}},{key:"readOnly",value:{name:"NonNullable",elements:[{name:'Readonly["readOnly"]',raw:'APIOptions["readOnly"]'}],raw:'NonNullable<APIOptions["readOnly"]>',required:!0}},{key:"setDrawingAreaAvailable",value:{name:"NonNullable",elements:[{name:'Readonly["setDrawingAreaAvailable"]',raw:'APIOptions["setDrawingAreaAvailable"]'}],raw:`NonNullable<
    APIOptions["setDrawingAreaAvailable"]
>`,required:!0}},{key:"showAlignmentOptions",value:{name:"NonNullable",elements:[{name:'Readonly["showAlignmentOptions"]',raw:'APIOptions["showAlignmentOptions"]'}],raw:'NonNullable<APIOptions["showAlignmentOptions"]>',required:!0}}]}}]}],raw:`Readonly<
    APIOptions & {
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
>`},description:""},keypadElement:{required:!1,tsType:{name:"any"},description:""},questionCompleted:{required:!1,tsType:{name:"boolean"},description:`questionCompleted is used to signal that a learner has attempted
the exercise. This is used when widgets want to show things like
rationale or partial correctness.`},onFocus:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},onBlur:{required:!0,tsType:{name:"signature",type:"function",raw:"(blurPath: FocusPath) => void",signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"blurPath"}],return:{name:"void"}}},description:""},findWidgets:{required:!0,tsType:{name:"signature",type:"function",raw:"(criterion: FilterCriterion) => ReadonlyArray<Widget>",signature:{arguments:[{type:{name:"union",raw:`| string
| ((
      id: string,
      widgetInfo: PerseusWidget,
      widget?: Widget | null | undefined,
  ) => boolean)`,elements:[{name:"string"},{name:"unknown"}]},name:"criterion"}],return:{name:"ReadonlyArray",elements:[{name:"Widget"}],raw:"ReadonlyArray<Widget>"}}},description:""},reviewModeRubric:{required:!1,tsType:{name:"union",raw:"Rubric | null | undefined",elements:[{name:"RubricRegistry[RubricRegistry]",raw:"RubricRegistry[keyof RubricRegistry]"},{name:"null"},{name:"undefined"}]},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
    arg1: {
        hints?: ReadonlyArray<Hint>;
        replace?: boolean;
        content?: string;
        widgets?: PerseusWidgetsMap;
        images?: ImageDict;
        // used only in EditorPage
        question?: any;
        answerArea?: PerseusAnswerArea | null;
        itemDataVersion?: Version;
        editorMode?: EditorMode;
        jsonMode?: boolean;
        // perseus-all-package/widgets/unit.jsx
        value?: any;
        // widgets/radio/widget.jsx
        choiceStates?: ReadonlyArray<ChoiceState>;
        // widgets/numeric-input.jsx
        currentValue?: string;
        // perseus-all-package/widgets/dropdown.jsx
        selected?: number;
        // perseus-all-package/widgets/grapher.jsx
        plot?: any;
        // Interactive Graph callback (see legacy: interactive-graph.tsx)
        graph?: PerseusGraphType;
    },
    callback?: () => void,
    silent?: boolean,
) => unknown`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    hints?: ReadonlyArray<Hint>;
    replace?: boolean;
    content?: string;
    widgets?: PerseusWidgetsMap;
    images?: ImageDict;
    // used only in EditorPage
    question?: any;
    answerArea?: PerseusAnswerArea | null;
    itemDataVersion?: Version;
    editorMode?: EditorMode;
    jsonMode?: boolean;
    // perseus-all-package/widgets/unit.jsx
    value?: any;
    // widgets/radio/widget.jsx
    choiceStates?: ReadonlyArray<ChoiceState>;
    // widgets/numeric-input.jsx
    currentValue?: string;
    // perseus-all-package/widgets/dropdown.jsx
    selected?: number;
    // perseus-all-package/widgets/grapher.jsx
    plot?: any;
    // Interactive Graph callback (see legacy: interactive-graph.tsx)
    graph?: PerseusGraphType;
}`,signature:{properties:[{key:"hints",value:{name:"ReadonlyArray",elements:[{name:"intersection",raw:`PerseusRenderer & {
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},{name:"signature",type:"object",raw:`{
    /**
     * When \`true\`, causes the previous hint to be replaced with this hint when
     * displayed. When \`false\`, the previous hint remains visible when this one
     * is displayed. This allows for hints that build upon each other.
     */
    replace?: boolean;
}`,signature:{properties:[{key:"replace",value:{name:"boolean",required:!1},description:"When `true`, causes the previous hint to be replaced with this hint when\ndisplayed. When `false`, the previous hint remains visible when this one\nis displayed. This allows for hints that build upon each other."}]}}]}],raw:"ReadonlyArray<Hint>",required:!1}},{key:"replace",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [url: string]: Dimensions;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    width?: number;
    height?: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}}]},required:!0}}]},required:!1}},{key:"question",value:{name:"any",required:!1}},{key:"answerArea",value:{name:"union",raw:"PerseusAnswerArea | null",elements:[{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof ItemExtras)[number]"},{name:"boolean"}],raw:"Record<(typeof ItemExtras)[number], boolean>"},{name:"null"}],required:!1}},{key:"itemDataVersion",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}},{key:"editorMode",value:{name:"union",raw:'"edit" | "preview" | "json"',elements:[{name:"literal",value:'"edit"'},{name:"literal",value:'"preview"'},{name:"literal",value:'"json"'}],required:!1}},{key:"jsonMode",value:{name:"boolean",required:!1}},{key:"value",value:{name:"any",required:!1}},{key:"choiceStates",value:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    selected: boolean;
    crossedOut: boolean;
    highlighted: boolean;
    rationaleShown: boolean;
    correctnessShown: boolean;
    previouslyAnswered: boolean;
    readOnly: boolean;
}`,signature:{properties:[{key:"selected",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"rationaleShown",value:{name:"boolean",required:!0}},{key:"correctnessShown",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"readOnly",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceState>",required:!1}},{key:"currentValue",value:{name:"string",required:!1}},{key:"selected",value:{name:"number",required:!1}},{key:"plot",value:{name:"any",required:!1}},{key:"graph",value:{name:"union",raw:`| PerseusGraphTypeAngle
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
}`,signature:{properties:[{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!1}}]}}]}],required:!1}}]}},name:"arg1"},{type:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},name:"callback"},{type:{name:"boolean"},name:"silent"}],return:{name:"unknown"}}},description:""},trackInteraction:{required:!0,tsType:{name:"signature",type:"function",raw:"(extraData?: TrackingExtraArgs) => void",signature:{arguments:[{type:{name:"TrackingExtraArgs"},name:"extraData"}],return:{name:"void"}}},description:""},isLastUsedWidget:{required:!0,tsType:{name:"boolean"},description:""},linterContext:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    contentType: string;
    highlightLint: boolean;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
    // additional properties can be added to the context by widgets
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},labelInterval:{required:!1,tsType:{name:"NonNullable",elements:[{name:"union",raw:'PerseusPlotterWidgetOptions["labelInterval"]'}],raw:'NonNullable<PerseusPlotterWidgetOptions["labelInterval"]>'},description:"",defaultValue:{value:"1",computed:!1}},picSize:{required:!1,tsType:{name:"NonNullable",elements:[{name:"union",raw:'PerseusPlotterWidgetOptions["picSize"]'}],raw:'NonNullable<PerseusPlotterWidgetOptions["picSize"]>'},description:"",defaultValue:{value:"40",computed:!1}},type:{defaultValue:{value:'"bar"',computed:!1},required:!1},labels:{defaultValue:{value:'["", ""]',computed:!1},required:!1},categories:{defaultValue:{value:'[""]',computed:!1},required:!1},scaleY:{defaultValue:{value:"1",computed:!1},required:!1},maxY:{defaultValue:{value:"10",computed:!1},required:!1},snapsPerLine:{defaultValue:{value:"2",computed:!1},required:!1},picBoxHeight:{defaultValue:{value:"48",computed:!1},required:!1},picUrl:{defaultValue:{value:'""',computed:!1},required:!1},plotDimensions:{defaultValue:{value:"[380, 300]",computed:!1},required:!1}}};const hh=()=>Je("python-program");function yh(n){const e=`/python-program/${n}/embedded`;return Bi(e)}const la=class la extends s.Component{getDOMNodeForPath(e){return null}getPromptJSON(){return hh()}render(){const e=yh(this.props.programID),t={height:this.props.height,width:"100%"},r=["allow-popups","allow-same-origin","allow-scripts","allow-top-navigation"].join(" ");return s.createElement(_,{style:wh.container},s.createElement("iframe",{sandbox:r,src:e,style:t,allowFullScreen:!0}))}};la.defaultProps={height:400};let Pr=la;const wh=T.StyleSheet.create({container:{margin:"auto",width:"100%"}}),fh={name:"python-program",displayName:"Python Program",widget:Pr},bh=n=>({type:"sorter",userInput:{values:n.options,changed:n.changed}}),ua=class ua extends s.Component{constructor(){super(...arguments),this._isMounted=!1,this.state={changed:!1},this.handleChange=e=>{this._isMounted&&this.setState({changed:!0},()=>{setTimeout(()=>{this.props.onChange(e),this.props.trackInteraction()},0)})},this.moveOptionToIndex=(e,t)=>{this.refs.sortable.moveOptionToIndex(e,t)}}componentDidMount(){this._isMounted=!0}componentWillUnmount(){this._isMounted=!1}getUserInput(){return{options:this.refs.sortable.getOptions(),changed:this.state.changed}}getPromptJSON(){return bh(this.getUserInput())}render(){const e=Rr(this.props.correct,this.props.problemNum,!0),{apiOptions:t}=this.props,r=t.isMobile?8:5;return s.createElement("div",{className:"perseus-widget-sorter perseus-clearfix"},s.createElement(Vt,{options:e,layout:this.props.layout,margin:r,padding:this.props.padding,onChange:this.handleChange,linterContext:this.props.linterContext,ref:"sortable"}))}};ua.defaultProps={correct:[],layout:"horizontal",padding:!0,problemNum:0,onChange:function(){},linterContext:re};let Ar=ua;const vh={name:"sorter",displayName:"Sorter",widget:Ar,isLintable:!0},{assert:Os}=Er,qn=function(n,e){return[""+n,""+e]},kh=function(){return qn(0,0)},Ms=function(n){return Os(h.isArray(n)&&n.length===2),+n[0]},Ls=function(n){return Os(h.isArray(n)&&n.length===2),+n[1]},Hn=function(n){const e=Ms(n),t=Ls(n);return"answer"+e+","+t},xt=class xt extends s.Component{constructor(){super(...arguments),this._getRows=()=>this.props.answers.length,this._getColumns=()=>this.props.answers[0].length,this.onValueChange=(e,t,r)=>{const a=h.map(this.props.answers,h.clone);a[e][t]=r.target?r.target.value:r,this.props.onChange({answers:a}),this.props.trackInteraction()},this.onHeaderChange=(e,t)=>{const r=this.props.headers.slice();r[e]=t.content,this.props.onChange({headers:r})},this._handleFocus=e=>{this.props.onFocus(e)},this._handleBlur=e=>{this.props.onBlur(e)},this.focus=()=>(this.focusInputPath(kh()),!0),this.focusInputPath=e=>{const t=Hn(e),r=this.refs[t];this.props.apiOptions.customKeypad?r.focus():K.findDOMNode(r).focus()},this.blurInputPath=e=>{const t=Hn(e),r=this.refs[t];this.props.apiOptions.customKeypad?r.blur():K.findDOMNode(r).blur()},this.getInputPaths=()=>{const e=this._getRows(),t=this._getColumns(),r=[];return h(e).times(a=>{h(t).times(i=>{const o=qn(a,i);r.push(o)})}),r},this.setInputValue=(e,t,r)=>{const a=Ms(e),i=Ls(e),o=h.map(this.props.answers,h.clone);o[a][i]=t,this.props.onChange({answers:o},r)}}getUserInput(){return h.map(this.props.answers,h.clone)}getDOMNodeForPath(e){const t=Hn(e);return K.findDOMNode(this.refs[t])}render(){const e=this._getRows(),t=this._getColumns(),r=this.props.headers;let a,i;const o={};return this.props.apiOptions.customKeypad?(a=Nn,i={width:80},o.keypadElement=this.props.keypadElement):(a="input",i={}),s.createElement("table",{className:"perseus-widget-table-of-values non-markdown"},s.createElement("thead",null,s.createElement("tr",null,h.map(r,(l,u)=>this.props.editableHeaders?s.createElement("th",{key:u},s.createElement(this.props.Editor,{ref:"columnHeader"+u,apiOptions:this.props.apiOptions,content:l,widgetEnabled:!1,onChange:h.partial(this.onHeaderChange,u)})):s.createElement("th",{key:u},s.createElement(X,{content:l,linterContext:this.props.linterContext,strings:this.context.strings}))))),s.createElement("tbody",null,h(e).times(l=>s.createElement("tr",{key:l},h(t).times(u=>s.createElement("td",{key:u},s.createElement(a,{ref:Hn(qn(l,u)),type:"text",value:this.props.answers[l][u],disabled:this.props.apiOptions.readOnly,onFocus:h.partial(this._handleFocus,qn(l,u)),onBlur:h.partial(this._handleBlur,qn(l,u)),onChange:h.partial(this.onValueChange,l,u),style:i,...o})))))))}};xt.contextType=G,xt.defaultProps=function(){const r=h(4).times(function(){return J.stringArrayOfSize(1)});return{apiOptions:Ne.defaults,headers:[""],editableHeaders:!1,rows:4,columns:1,answers:r,linterContext:re}}();let Cr=xt;const xh=n=>{const e=n.answers.length,t=n.answers[0].length,r=h(e).times(function(){return J.stringArrayOfSize(t)});return h.extend({},n,{answers:r})},qh={name:"table",displayName:"Table (deprecated - use markdown table instead)",accessible:!0,widget:Cr,transform:xh,hidden:!0,isLintable:!0},Ph=()=>Je("video"),bi=1280,vi=720,Ah="{host}/embed_video?slug={slug}&internal_video_only=1",Ch=/^https?:\/\//,Th=/(khanacademy\.org|localhost)/,Rh=/(vimeo\.com)/,da=class da extends s.Component{constructor(){super(...arguments),this.isWidget=!0,this.change=(...e)=>ae.apply(this,e)}getPromptJSON(){return Ph()}render(){const{InitialRequestUrl:e}=qe(),t=this.props.location;if(!t)return s.createElement("div",null);let r;if(Ch.test(t))r=t,Rh.test(r)&&(r.indexOf("?")===-1?r+="?dnt=1":r+="&dnt=1");else{r=Ah.replace("{slug}",t);let a="https://www.khanacademy.org";Th.test(e.host)&&(a=e.origin),r=r.replace("{host}",a)}return s.createElement(_,null,s.createElement(Hl,{width:bi,height:vi,key:t+this.props.alignment},s.createElement(_,{style:H.srOnly},this.context.strings.videoWrapper),s.createElement("iframe",{className:"perseus-video-widget",sandbox:"allow-same-origin allow-scripts",width:bi,height:vi,src:r,allowFullScreen:!0})),s.createElement($l,{location:t}))}};da.contextType=G;let Tr=da;const Ih={name:"video",displayName:"Video",widget:Tr},Nh=[Du,Hu,Ju,td,Xu,xd,sd,dd,Ad,Td,Nd,Wd,Jp,dg,vg,pg,xg,Xg,oh,dh,Eu,Yi,mh,Pl,gh,fh,vh,qh,Ih,Yu],jy=[...Mu,...Nh];export{Du as C,yd as D,Rn as E,xd as G,Jp as I,vg as M,Bn as N,gh as P,bs as S,qh as T,gc as a,Qp as b,ae as c,Ul as d,Kl as e,mc as f,fc as g,yc as h,hc as i,wc as j,pc as k,cc as l,Qd as m,si as n,hd as o,Ly as p,Fr as q,Dy as r,wd as t,jy as w};
