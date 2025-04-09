var lo=Object.defineProperty;var uo=(n,r,e)=>r in n?lo(n,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[r]=e;var c=(n,r,e)=>(uo(n,typeof r!="symbol"?r+"":r,e),e);import{j as l}from"./jsx-runtime-BT65X5dW.js";import{w as ot,t as xr,Q as mo,r as qr,$ as Qt,a0 as po,_ as lt,o as te,x as Na,Z as kt,a1 as co,M as Pr}from"./core-widget-registry-CDAZ8ZOy.js";import{M as go}from"./prop-types-Mpi28m6l.js";import"./key-translator-DDi7MUtF.js";import"./mobile-keypad-DC0qnYeF.js";import"./button-assets-CSq0nEw6.js";import{_ as w}from"./underscore-U-AHniOr.js";import{g as ho}from"./get-decimal-separator-B2cicA45.js";import{l as ae,S as _,R as Y,P as Ar,D as yo,k as Sa,m as wo}from"./renderer-_BpUquPh.js";import{V as U,I as Oa,u as fo,d as bo,_ as xt,b as ja}from"./index-CskvhqFA.js";import{T as Zt}from"./index-BvHsycGa.js";import{b as Cr,L as vo,a as Ea}from"./index-CbNKSLRm.js";import{n as I}from"./no-important-DlFk8a1I.js";import{c as Fe}from"./index-D7h-teXI.js";import{r as v,R as Ma}from"./index-C6mWTJJr.js";import{h as J,r as vn}from"./index-B1Gws05u.js";import{a as V,u as pe,b as ko}from"./i18n-context-3AkWzTTj.js";import{a as Sn,M as xo}from"./math-input-k1S6DCbd.js";import{u as er,g as Pe}from"./dependencies-BsVPGK1s.js";import{P as rn,E as Be}from"./perseus-error-CSETqePQ.js";import{P as qo}from"./index-CrGd2QqM.js";import{A as Ne}from"./perseus-api-Ty_QvlNi.js";import{i as Po,K as Xe,U as Z,I as Ao,C as Co,d as Tr,j as Rn,J as To,b as Ro,c as We,t as ut,L as Io,M as No,e as So,m as Oo,N as Rr,f as jo,O as Eo,P as Ir,Q as Mo}from"./util-B541lbyP.js";import{$ as W}from"./jquery-CkHB0_Mt.js";import{s as ge,c as G,f as Lo,b as Do,a as en}from"./index-CjnMbH_2.js";import{S as On}from"./simple-keypad-input-BtcxZNWv.js";import{I as La}from"./input-with-examples-Cvs4INSH.js";import{L as Da,G as ne,W as qt,K as D,I as Ee,S as jn,a as nr,b as Fa}from"./svg-image-C3FT83BI.js";import{B as Fo}from"./base-radio-BZebOLiE.js";import{I as an}from"./inline-icon-AJRwMA4Z.js";import{d as Wo,e as Go,f as _o,g as Vo,h as Ho,j as Uo}from"./icon-paths-C3bPmxpL.js";import{m as Pt}from"./media-queries-D4w_O5TS.js";import{s as Nr}from"./shared-Dtpp87RV.js";import{u as $o,l as De,n as Ye,f as Xo,v as Wa,h as zn,j as Ga}from"./constants-BIpV3g0K.js";import{g as Ke,B as Yo,a as zo}from"./phet-simulation-ylWgoYlI.js";import{C as tr}from"./index-KFdEgasi.js";import{P as Bo,a as Ko}from"./index-BEYgOkb5.js";import{O as Sr,S as Jo,A as Qo}from"./answer-choices-CSYPm2Hy.js";import{B as fe}from"./index-CQe11mMd.js";import{B as Zo}from"./button-group-CrIfrEdw.js";import{c as rr}from"./zoomable-tex-Dy-nElJT.js";import{w as ve}from"./index-BzwLglMS.js";import{v as x,C as el,E as nl,P as Bn,L as Or,a as Kn,b as At,T as tl,u as rl,c as _a,d as al,M as jr}from"./index-Dd-cahjY.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-CnlhjbO_.js";import"./multi-button-group-U6RQwTwG.js";import{N as Va}from"./number-input--8qXLD9D.js";import"./range-input-seFlSmy5.js";import{T as il}from"./text-input-CeW7cj4O.js";import"./text-list-editor-HcP7oGoC.js";import{i as oe}from"./tiny-invariant-CopsF_GD.js";import{T as sl,c as ol,m as ll,u as ul,b as dl}from"./index-C1fpYtXO.js";import{M as ml}from"./marker-D6_NYQQ0.js";import{C as pl}from"./index-fj4wzhGb.js";import{S as Ct}from"./sortable-Nxk5wRFf.js";import{F as cl}from"./fixed-to-responsive-CTsII9Xx.js";import{V as gl}from"./video-transcript-link-C7EJC_3o.js";const hl=["key","ref","containerSizeClass","widgetId","onChange","problemNum","apiOptions","widgetIsOpen","questionCompleted","findWidgets","onRemove","id","onBlur","onFocus","trackInteraction","keypadElement"],yl=`Usage:
  this.change({propName: 5}, callback);
  this.change("propName", 5, callback);
  this.change("propName")`,Ha=function(n,r,e){const t=w.omit(n.props,hl),a=w.extend(t,r);n.props.onChange(a,e)},Ua=function(n,r,e,t){if(e===void 0)return w.partial(Ua,n,r);const a={};a[r]=e,Ha(n,a,t)},ie=function(n,r,e){if(w.isObject(n)&&e===void 0)return e=r,Ha(this,n,e);if(typeof n=="string")return Ua(this,n,r,e);throw new rn("Invalid types sent to this.change(): "+w.toArray(arguments).join()+`
`+yl,Be.Internal)},py={onChange:qo.func.isRequired},wl=(n,r)=>({type:"expression",label:n.visibleLabel,userInput:{value:r}}),fl={arctg:"arctan",cosec:"csc",cossec:"csc",cotg:"cot",ctg:"cot",sen:"sin",tg:"tan"},bl=n=>n.replace(/\\operatorname{([a-z]+)}/g,(r,e)=>`\\${fl[e]??e} `),Er=n=>bl(n),An=class An extends v.Component{constructor(){super(...arguments);c(this,"_textareaId",`expression_textarea_${Date.now()}`);c(this,"_isMounted",!1);c(this,"displayName","Expression");c(this,"state",{invalid:!1,showErrorTooltip:!1,showErrorStyle:!1});c(this,"componentDidMount",()=>{if(document.addEventListener("mousedown",this._handleMouseDown),this._isMounted=!0,this.refs.input){const e=this.props.apiOptions.customKeypad,t=J.findDOMNode(this.refs.input),a=e?".mq-textarea > span":"textarea",i=t.querySelector(a);i==null||i.setAttribute("id",this._textareaId)}});c(this,"componentDidUpdate",e=>{(!w.isEqual(this.props.value,e.value)||!w.isEqual(this.props.functions,e.functions))&&(this.setState({invalid:!1,showErrorTooltip:!1,showErrorStyle:!1}),this.parse(this.props.value,this.props).parsed||this.setState({invalid:!0}))});c(this,"componentWillUnmount",()=>{this._isMounted=!1});c(this,"_handleMouseDown",()=>{this._isMounted&&this.state.showErrorTooltip&&this.setState({showErrorTooltip:!1})});c(this,"change",(...e)=>ie.apply(this,e));c(this,"parse",(e,t)=>{const a=w.pick(t||this.props,"functions");return w.extend(a,{decimal_separator:ho(this.context.locale)}),ot(Er(e),a)});c(this,"changeAndTrack",(e,t)=>{this.change("value",e,t),this.props.trackInteraction()});c(this,"_handleFocus",()=>{var e;(e=this.props.analytics)==null||e.onAnalyticsEvent({type:"perseus:expression-focused",payload:null}),this.props.onFocus([])});c(this,"_handleBlur",()=>{this.props.onBlur([])});c(this,"focus",()=>(this.props.apiOptions.customKeypad&&this.refs.input.focus(),!0));c(this,"getInputPaths",()=>[[]])}static getUserInputFromProps(e){return Er(e.value)}getUserInput(){return An.getUserInputFromProps(this.props)}getPromptJSON(){return wl(this.props,this.getUserInput())}focusInputPath(e){this.refs.input.focus()}blurInputPath(e){var t,a;typeof((t=this.refs.input)==null?void 0:t.blur)=="function"&&((a=this.refs.input)==null||a.blur())}insert(e){this.refs.input.insert(e)}setInputValue(e,t,a){this.props.onChange({value:t},a)}render(){var i,s;if(this.props.apiOptions.customKeypad)return l.jsxs(U,{className:I.css(Mr.mobileLabelInputWrapper),children:[!!this.props.visibleLabel&&l.jsx(Cr,{htmlFor:this._textareaId,tag:"label",children:this.props.visibleLabel}),l.jsx(go,{ref:"input",ariaLabel:this.props.ariaLabel||this.context.strings.mathInputBox,value:this.props.value,keypadElement:this.props.keypadElement,onChange:this.changeAndTrack,onFocus:()=>{var o;(o=this.props.keypadElement)==null||o.configure(this.props.keypadConfiguration,()=>{this._isMounted&&this._handleFocus()})},onBlur:this._handleBlur})]});const e=Fe({"perseus-widget-expression":!0,"show-error-tooltip":this.state.showErrorTooltip}),{ERROR_MESSAGE:t,ERROR_TITLE:a}=this.context.strings;return l.jsxs(U,{className:I.css(Mr.desktopLabelInputWrapper),children:[!!this.props.visibleLabel&&l.jsx(Cr,{htmlFor:this._textareaId,tag:"label",children:this.props.visibleLabel}),l.jsxs("div",{className:e,onBlur:()=>this.state.invalid&&this.setState({showErrorTooltip:!0,showErrorStyle:!0}),onFocus:()=>this.setState({showErrorTooltip:!1}),children:[l.jsx(U,{style:Sn.srOnly,role:"alert",children:this.state.showErrorTooltip&&a+" "+t}),l.jsx(Zt,{forceAnchorFocusivity:!1,opened:this.state.showErrorTooltip,title:a,content:t,children:l.jsx(xo,{ref:"input",value:this.props.value,onChange:this.changeAndTrack,convertDotToTimes:this.props.times,buttonSets:this.props.buttonSets,onFocus:this._handleFocus,onBlur:this._handleBlur,hasError:this.state.showErrorStyle,ariaLabel:this.props.ariaLabel||this.context.strings.mathInputBox,extraKeys:(i=this.props.keypadConfiguration)==null?void 0:i.extraKeys,onAnalyticsEvent:((s=this.props.analytics)==null?void 0:s.onAnalyticsEvent)??(async()=>{})})})]})]})}};c(An,"contextType",V),c(An,"defaultProps",{value:"",times:!1,functions:[],buttonSets:["basic","trig","prealgebra","logarithms"],onFocus:()=>{},onBlur:()=>{},apiOptions:Ne.defaults,linterContext:ae});let In=An;const Mr=I.StyleSheet.create({mobileLabelInputWrapper:{padding:"15px 4px 0"},desktopLabelInputWrapper:{margin:"5px 5px 0"}}),$a=v.forwardRef((n,r)=>{const e=er();return l.jsx(In,{ref:r,analytics:e.analytics,...n})});$a.getUserInputFromProps=In.getUserInputFromProps;const vl={name:"expression",displayName:"Expression / Equation",accessible:!0,widget:$a,transform:n=>{const{times:r,functions:e,buttonSets:t,buttonsVisible:a,visibleLabel:i,ariaLabel:s,extraKeys:o}=n;return{keypadConfiguration:{keypadType:"EXPRESSION",extraKeys:o,times:r},times:r,functions:e,buttonSets:t,buttonsVisible:a,visibleLabel:i,ariaLabel:s}},version:xr.version,propUpgrades:xr.widgetOptionsUpgrades,isLintable:!0,getOneCorrectAnswerFromRubric(n){const r=(n.answerForms||[]).filter(e=>e.considered==="correct");if(r.length!==0)return r[0].value}};In.__docgenInfo={description:"",methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`ExternalProps &
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
}`,computed:!1},required:!1}}};const kl=(n,r)=>({type:"input-number",options:{simplify:n.simplify,answerType:n.answerType},userInput:{value:r.currentValue}}),xl={integer:function(n,r){return r.integerExample},proper:function(n,r){return n.simplify==="optional"?r.properExample:r.simplifiedProperExample},improper:function(n,r){return n.simplify==="optional"?r.improperExample:r.simplifiedImproperExample},mixed:function(n,r){return r.mixedExample},decimal:function(n,r){return r.decimalExample},percent:function(n,r){return r.percentExample},pi:function(n,r){return r.piExample}},Cn=class Cn extends v.Component{constructor(){super(...arguments);c(this,"shouldShowExamples",()=>this.props.answerType!=="number");c(this,"handleChange",(e,t)=>{this.props.onChange({currentValue:e},t)});c(this,"_handleFocus",()=>{this.props.onFocus([])});c(this,"_handleBlur",()=>{this.props.onBlur([])});c(this,"focus",()=>(this.refs.input.focus(),!0));c(this,"focusInputPath",e=>{this.refs.input.focus()});c(this,"blurInputPath",e=>{var t,a;typeof((t=this.refs.input)==null?void 0:t.blur)=="function"&&((a=this.refs.input)==null||a.blur())});c(this,"getInputPaths",()=>[[]]);c(this,"setInputValue",(e,t,a)=>{this.props.onChange({currentValue:t},a)})}static getUserInputFromProps(e){return{currentValue:e.currentValue}}getUserInput(){return Cn.getUserInputFromProps(this.props)}getPromptJSON(){return kl(this.props,this.getUserInput())}examples(){const{strings:e}=this.context,t=this.props.answerType,a=Po[t].forms.split(/\s*,\s*/),i=w.map(a,s=>xl[s](this.props,e));return[e.yourAnswer].concat(i)}render(){if(this.props.apiOptions.customKeypad){const t=l.jsx(On,{ref:"input",value:this.props.currentValue,keypadElement:this.props.keypadElement,onChange:this.handleChange,onFocus:this._handleFocus,onBlur:this._handleBlur});return this.props.rightAlign?l.jsx("div",{className:"perseus-input-right-align",children:t}):t}const e=[hn.default,this.props.size==="small"?hn.small:null,this.props.rightAlign?hn.rightAlign:hn.leftAlign];return this.props.reviewMode&&!this.props.currentValue&&e.push(hn.answerStateUnanswered),l.jsx(La,{ref:"input",value:this.props.currentValue,onChange:this.handleChange,style:e,examples:this.examples(),shouldShowExamples:this.shouldShowExamples(),onFocus:this._handleFocus,onBlur:this._handleBlur,id:this.props.widgetId,disabled:this.props.apiOptions.readOnly,linterContext:this.props.linterContext})}};c(Cn,"contextType",V),c(Cn,"defaultProps",{currentValue:"",size:"normal",answerType:"number",rightAlign:!1,apiOptions:Ne.defaults,linterContext:ae});let Tt=Cn;const hn=I.StyleSheet.create({default:{width:80,height:"auto"},small:{width:40},leftAlign:{paddingLeft:ge.xxxSmall_4,paddingRight:0},rightAlign:{textAlign:"right",paddingLeft:0,paddingRight:ge.xxxSmall_4},answerStateUnanswered:{backgroundColor:"#eee",border:"solid 1px #999"}}),ql=n=>{const{simplify:r,size:e,answerType:t,rightAlign:a}=n;return{simplify:r,size:e,answerType:t,rightAlign:a}},Pl={name:"input-number",displayName:"Input number (deprecated - use numeric input instead)",hidden:!0,widget:Tt,transform:ql,isLintable:!0,getOneCorrectAnswerFromRubric(n){if(n.value==null)return;let r=String(n.value);return n.inexact&&n.maxError&&(r+=" ± "+n.maxError),r}},Al=(n,r)=>({type:"numeric-input",label:n.labelText,userInput:{value:r.currentValue}}),ar={integer:(n,r)=>r.integerExample,proper:(n,r)=>n.simplify==="optional"?r.properExample:r.simplifiedProperExample,improper:(n,r)=>n.simplify==="optional"?r.improperExample:r.simplifiedImproperExample,mixed:(n,r)=>r.mixedExample,decimal:(n,r)=>r.decimalExample,pi:(n,r)=>r.piExample},Cl=(n,r)=>{if(n.length===0)return[];const t=ir(n).map(a=>ar[a.name](a,r));return[r.yourAnswer].concat(t)},Tl=n=>n.length===0?!1:!(ir(n).map(t=>t.name).length>=Object.keys(ar).length),ir=function(n){const r=new Set;return n.filter(e=>r.has(e.name)?!1:(r.add(e.name),!0))},Rl=function(n){const r=n.flat(),e=ir(r),t=Object.keys(ar);return e.sort((a,i)=>t.indexOf(a.name)-t.indexOf(i.name))},Xa=v.forwardRef((n,r)=>{const e=v.useContext(V),t=v.useRef(null),[a,i]=v.useState(!1);v.useImperativeHandle(r,()=>({current:t.current,focus:()=>{var m;t.current&&((m=t.current)==null||m.focus(),i(!0))},blur:()=>{var m;t.current&&((m=t.current)==null||m.blur(),i(!1))}}));const s=(m,p)=>{n.onChange({currentValue:m},p),n.trackInteraction()},o=()=>{n.onFocus([]),i(!0)},u=()=>{n.onBlur([]),i(!1)},d=I.StyleSheet.create({inputWithExamples:{borderRadius:"3px",borderWidth:a?"2px":"1px",display:"inline-block",fontFamily:'Symbola, "Times New Roman", serif',fontSize:"18px",height:"32px",lineHeight:"18px",padding:a?"4px":"4px 5px",textAlign:n.rightAlign?"right":"left",width:n.size==="small"?40:80}});if(n.apiOptions.customKeypad){const m=n.rightAlign?"perseus-input-right-align":void 0;return l.jsx("div",{className:m,children:l.jsx(On,{ref:t,value:n.currentValue,keypadElement:n.keypadElement,onChange:s,onFocus:o,onBlur:u})})}return l.jsx(La,{ref:t,value:n.currentValue,onChange:s,labelText:n.labelText,examples:Cl(n.answerForms,e.strings),shouldShowExamples:Tl(n.answerForms),onFocus:o,onBlur:u,id:n.widgetId,disabled:n.apiOptions.readOnly,style:d.inputWithExamples})});Xa.__docgenInfo={description:`The NumericInputComponent is a child component of the NumericInput class
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
    simplify: PerseusNumericInputSimplify;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswerForm>"},description:""},labelText:{required:!0,tsType:{name:"string"},description:""},currentValue:{required:!0,tsType:{name:"string"},description:""}}};const it=class it extends v.Component{constructor(){super(...arguments);c(this,"inputRef",v.createRef());c(this,"focus",()=>{var e;return(e=this.inputRef.current)==null||e.focus(),!0});c(this,"focusInputPath",()=>{var e;(e=this.inputRef.current)==null||e.focus()});c(this,"blurInputPath",()=>{var e;(e=this.inputRef.current)==null||e.blur()});c(this,"getInputPaths",()=>[[]]);c(this,"setInputValue",(e,t,a)=>{this.props.onChange({currentValue:t},a)})}static getUserInputFromProps(e){return{currentValue:e.currentValue}}getUserInput(){return it.getUserInputFromProps(this.props)}getPromptJSON(){return Al(this.props,this.getUserInput())}render(){return l.jsx(Xa,{...this.props,ref:this.inputRef})}};c(it,"defaultProps",{currentValue:"",size:"normal",rightAlign:!1,apiOptions:Ne.defaults,coefficient:!1,answerForms:[],labelText:"",linterContext:ae});let Jn=it;const Il=function(n){const{answers:r,...e}={...n,answerForms:Rl(n.answers.filter(t=>t.status==="correct").map(t=>(t.answerForms||[]).map(a=>({simplify:t.simplify,name:a}))))};return e},Nl={name:"numeric-input",displayName:"Numeric input",accessible:!0,widget:Jn,transform:Il,isLintable:!0,getOneCorrectAnswerFromRubric(n){const e=n.answers.filter(t=>t.status==="correct").map(t=>{const a=t.answerForms&&t.answerForms[0]?t.answerForms[0]:"decimal";let i=Xe.toNumericString(t.value,a);return t.maxError&&(i+=" ± "+Xe.toNumericString(t.maxError,a)),i});if(e.length!==0)return e[0]}};Jn.__docgenInfo={description:`The NumericInput widget is a numeric input field that supports a variety of
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
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>",required:!0}},{key:"labelText",value:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}],required:!1}},{key:"size",value:{name:"string",required:!0}},{key:"coefficient",value:{name:"boolean",required:!0}},{key:"rightAlign",value:{name:"boolean",required:!1}},{key:"static",value:{name:"boolean",required:!0}}]}},{name:"signature",type:"object",raw:`{
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
    // Unsimplified answers are Ungraded, Accepted, or Wrong.
    simplify: PerseusNumericInputSimplify;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}],required:!1}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>",required:!0}},{key:"coefficient",value:{name:"boolean",required:!0}}]}},{name:"null"},{name:"undefined"}],required:!1}},{key:"reviewMode",value:{name:"boolean",required:!0}},{key:"onChange",value:{name:"signature",type:"function",raw:`(
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
    simplify: PerseusNumericInputSimplify;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:'"required" | "enforced" | "optional"',elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
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
}`,computed:!1},required:!1}}};const Sl=(n,r)=>{const t=(n.choices||[]).map(a=>({value:a.content}));return{type:"radio",hasNoneOfTheAbove:!!n.hasNoneOfTheAbove,options:t,userInput:{selectedOptions:r.choicesSelected.slice()}}},Ol=n=>({type:"passage-ref",options:{passageNumber:n.passageNumber,referenceNumber:n.referenceNumber,summaryText:n.summaryText}});function qe(n,r,e,t){let a;return r==="start"&&t==="start"?a=Range.START_TO_START:r==="start"&&t==="end"?a=Range.END_TO_START:r==="end"&&t==="start"?a=Range.START_TO_END:a=Range.END_TO_END,n.compareBoundaryPoints(a,e)}function dt(n,r){const e=n.cloneRange();return e.setEnd(r.endContainer,r.endOffset),e}function mt(n,r){return!(qe(n,"end",r,"start")<0||qe(r,"end",n,"start")<0)}function jl(n,r){return qe(n,"start",r,"start")<=0&&qe(n,"end",r,"end")>=0}function El(n,r){if(!mt(n,r))return null;const e=qe(n,"start",r,"start")>0?n:r,t=qe(n,"end",r,"end")<0?n:r;return dt(e,t)}function Ml(n,r){if(!mt(n,r))return null;const e=qe(n,"start",r,"start")<0?n:r,t=qe(n,"end",r,"end")>0?n:r;return dt(e,t)}function Lr(n,r,e,t,a){let i=-1,s=t,o=a,u=0;for(;s<=o;){if(u++,u>r.length*2)throw new Error(`Assertion error: Binary search isn't terminating? lower=${s}, upper=${o}`);const d=Math.floor((s+o)/2);e==="first"?qe(r[d],"end",n,"start")<=0?s=d+1:(i=d,o=d-1):qe(r[d],"start",n,"end")>=0?o=d-1:(i=d,s=d+1)}return i}function Ll(n,r){const e=Lr(n,r,"first",0,r.length-1);if(e<0)return null;const t=Lr(n,r,"last",e,r.length-1);return t<0?null:[e,t]}function Dl(n,r){const e={};let t=r.domRange,a=r.firstWordIndex,i=r.lastWordIndex;for(const d of Object.keys(n)){const m=n[d],p=Ml(m.domRange,t);p?(t=p,a=Math.min(m.firstWordIndex,a),i=Math.max(m.lastWordIndex,i)):e[d]=m}const s={firstWordIndex:a,lastWordIndex:i,domRange:t},o=Object.keys(e),u=Wl(o);return e[u]=s,e}function Fl(n,r,e){for(const u of Object.keys(n)){const d=n[u].domRange;if(jl(d,e))return null}const t=Ll(e,r);if(!t)return null;const[a,i]=t,s=r[a],o=r[i];return{firstWordIndex:a,lastWordIndex:i,domRange:dt(s,o)}}function Wl(n){const r=`${new Date().getTime()}`;if(!n.includes(r))return r;let e=0,t;do t=`${r}-${e}`,e++;while(n.includes(t));return t}function Gl(n,r){const{firstWordIndex:e,lastWordIndex:t}=n.range,a=r[e];if(!a)throw new rn(`first word index ${a} is out of bounds: must be 0–${r.length-1} inclusive`,Be.InvalidInput,{metadata:{firstWord:a,wordRanges:JSON.stringify(r)}});const i=r[t];if(!i)throw new rn(`last word index ${i} is out of bounds: must be 0–${r.length-1} inclusive`,Be.InvalidInput,{metadata:{lastWord:i,wordRanges:JSON.stringify(r)}});return{firstWordIndex:e,lastWordIndex:t,domRange:dt(a,i)}}function _l(n){const{firstWordIndex:r,lastWordIndex:e}=n;return{range:{type:"word-indexes",firstWordIndex:r,lastWordIndex:e}}}function Rt(n,r){return{left:n.left-r.left,top:n.top-r.top}}function Ya({left:n,top:r,width:e,height:t},a){return{...Rt({left:n,top:r},a),width:e,height:t}}function Vl(n){const r=[];return za(n.commonAncestorContainer,n,r),r}function za(n,r,e){const t=new Range;if(t.selectNodeContents(n),n.nodeType===Node.TEXT_NODE){const a=El(r,t);a&&Hl(n,a,e)}else if(n.nodeType===Node.ELEMENT_NODE){if(!mt(r,t))return;for(const a of Array.from(n.childNodes))za(a,r,e)}}function Hl(n,r,e){const t=n.parentElement,a=window.getComputedStyle(t);let i=null;if(typeof a.lineHeight=="string"&&a.lineHeight.endsWith("px")){const o=parseFloat(a.lineHeight);isNaN(o)||(i=o)}const s=Array.from(r.getClientRects());for(const o of s){const u={left:o.left,top:o.top,height:o.height,width:o.width};if(i!==null){const d=i-u.height;u.top-=d,u.height=i}e.push(u)}}class Ba extends v.PureComponent{constructor(){super(...arguments);c(this,"state",{cachedHighlightRects:this._computeRects(this.props),tooltipIsHovered:!1})}UNSAFE_componentWillReceiveProps(e){(this.props.highlight!==e.highlight||this.props.offsetParent!==e.offsetParent)&&this.setState({cachedHighlightRects:this._computeRects(e)})}_computeRects(e){const{highlight:t,offsetParent:a}=e,i=Vl(t.domRange),{left:s,top:o}=a.getBoundingClientRect();return i.map(d=>Ya(d,{left:s,top:o}))}_rectIsHovered(e,t){const a=Rt(t,{left:e.left,top:e.top});return 0<=a.left&&a.left<e.width&&0<=a.top&&a.top<e.height}isHovered(e){if(!e)return!1;const{offsetParent:t}=this.props,{cachedHighlightRects:a}=this.state,{left:i,top:s}=t.getBoundingClientRect(),o=Rt(e,{left:i,top:s});return a.some(u=>this._rectIsHovered(u,o))}render(){const e=this.state.cachedHighlightRects;return l.jsx("div",{children:e.map((t,a)=>l.jsx("div",{className:I.css(Ul.highlightRect),style:{position:"absolute",width:t.width,height:t.height,top:t.top,left:t.left,zIndex:this.props.zIndexes.belowContent}},a))})}}const Ul=I.StyleSheet.create({highlightRect:{background:"#fffabe"}});Ba.__docgenInfo={description:"",methods:[{name:"_computeRects",docblock:`Compute the set of rectangles that cover the highlighted content, with
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
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]}},description:""}}};class sr extends v.PureComponent{_getFocusRect(){const{focusNode:r,focusOffset:e,offsetParent:t}=this.props,a=document.createRange();a.setStart(r,e),a.setEnd(r,e);const i=a.getClientRects()[0];if(!i)return Da.log('[Highlighting] Known bug: Could not determine the focus position, so did not show an "Add Highlight" tooltip. https://app.asana.com/0/329800276300868/413878480039713 (see also /r/asana-links)'),null;const{left:s,top:o}=t.getBoundingClientRect();return Ya({left:i.left,top:i.top,width:i.width,height:i.height},{left:s,top:o})}render(){const r=this._getFocusRect();if(!r)return null;const e=l.jsx("div",{className:I.css($l.tooltipLabel),onClick:this.props.onClick,children:this.props.label}),t={position:"absolute",left:r.left,top:`calc(${Math.round(r.top)}px + 0.95em)`,height:0};return l.jsx("div",{style:t,onMouseEnter:this.props.onMouseEnter,onMouseLeave:this.props.onMouseLeave,children:l.jsx(Zt,{content:e,opened:!0,children:l.jsx("div",{})})})}}const $l=I.StyleSheet.create({tooltipLabel:{userSelect:"none",fontFamily:'"Lato", sans-serif',padding:`10px ${ge.medium_16}px`,cursor:"pointer"}});sr.__docgenInfo={description:"",methods:[{name:"_getFocusRect",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"Rect | null | undefined",elements:[{name:"intersection",raw:`Position & {
    width: number;
    height: number;
}`,elements:[{name:"signature",type:"object",raw:`{
    left: number;
    top: number;
}`,signature:{properties:[{key:"left",value:{name:"number",required:!0}},{key:"top",value:{name:"number",required:!0}}]}},{name:"signature",type:"object",raw:`{
    width: number;
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}}]},{name:"null"},{name:"undefined"}]}}}],displayName:"HighlightTooltip",props:{label:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onMouseEnter:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onMouseLeave:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},focusNode:{required:!0,tsType:{name:"Node"},description:""},focusOffset:{required:!0,tsType:{name:"number"},description:""},offsetParent:{required:!0,tsType:{name:"Element"},description:""}}};class or extends v.PureComponent{constructor(){super(...arguments);c(this,"state",{hoveredHighlightKey:null,hoveringTooltipFor:null});c(this,"_highlightRenderers",{});c(this,"_handleMouseMove",e=>{const t={left:e.clientX,top:e.clientY},a=this._getHoveredHighlightKey(t);this.setState({hoveredHighlightKey:a})})}componentDidMount(){this._updateEditListeners(!1,this.props.editable)}UNSAFE_componentWillReceiveProps(e){this._updateEditListeners(this.props.editable,e.editable),this.state.hoveredHighlightKey!=null&&!(this.state.hoveredHighlightKey in e.highlights)&&this.setState({hoveredHighlightKey:null}),this.state.hoveringTooltipFor!=null&&!(this.state.hoveringTooltipFor in e.highlights)&&this.setState({hoveringTooltipFor:null})}componentWillUnmount(){this._updateEditListeners(this.props.editable,!1)}_updateEditListeners(e,t){!e&&t?window.addEventListener("mousemove",this._handleMouseMove):e&&!t&&(window.removeEventListener("mousemove",this._handleMouseMove),this.setState({hoveredHighlightKey:null,hoveringTooltipFor:null}))}_getHoveredHighlightKey(e){const{hoveringTooltipFor:t}=this.state;return typeof t=="string"?t:Object.keys(this.props.highlights).find(i=>{const s=this._highlightRenderers[i];return s&&s.isHovered(e)})}_renderTooltip(){const{hoveredHighlightKey:e}=this.state;if(e==null)return null;const t=this.props.highlights[e];return l.jsx(sr,{label:this.context.strings.removeHighlight,focusNode:t.domRange.endContainer,focusOffset:t.domRange.endOffset,offsetParent:this.props.offsetParent,onClick:()=>this.props.onRemoveHighlight(e),onMouseEnter:()=>this.setState({hoveringTooltipFor:e}),onMouseLeave:()=>this.setState({hoveringTooltipFor:null})})}render(){return l.jsxs("div",{children:[Object.keys(this.props.highlights).map(e=>l.jsx(Ba,{ref:t=>{t?this._highlightRenderers[e]=t:delete this._highlightRenderers[e]},highlight:this.props.highlights[e],highlightKey:e,offsetParent:this.props.offsetParent,zIndexes:this.props.zIndexes},e)),this.props.editable&&this._renderTooltip()]})}}c(or,"contextType",V);or.__docgenInfo={description:"",methods:[{name:"_updateEditListeners",docblock:`Given whether we were previously listening to mousemove events, and
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
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]}},description:""}}};class Ka extends v.PureComponent{constructor(){super(...arguments);c(this,"state",{mouseState:"up",trackedSelection:null});c(this,"_handleSelectionChange",()=>{this._updateTrackedSelection(),this.state.mouseState==="down"&&this.setState({mouseState:"down-and-selecting"})});c(this,"_handleMouseDown",()=>{this.setState({mouseState:"down"})});c(this,"_handleMouseUp",()=>{this.setState({mouseState:"up"})})}componentDidMount(){this._updateListeners(!1,this.props.enabled)}componentDidUpdate(e){this.props.buildHighlight!==e.buildHighlight&&this._updateTrackedSelection(),this._updateListeners(e.enabled,this.props.enabled)}componentWillUnmount(){this._updateListeners(this.props.enabled,!1)}_updateListeners(e,t){!e&&t?(window.addEventListener("mousedown",this._handleMouseDown),window.addEventListener("mouseup",this._handleMouseUp),document.addEventListener("selectionchange",this._handleSelectionChange)):e&&!t&&(window.removeEventListener("mousedown",this._handleMouseDown),window.removeEventListener("mouseup",this._handleMouseUp),document.removeEventListener("selectionchange",this._handleSelectionChange),this.setState({mouseState:"up",trackedSelection:null}))}_computeFocusAndRange(){const e=document.getSelection();if(!e||e.rangeCount===0)return null;const t=e.getRangeAt(0);if(t.collapsed)return null;const a=e.focusNode,i=e.focusOffset;return{focusNode:a,focusOffset:i,range:t}}_updateTrackedSelection(){const e=this._computeFocusAndRange();if(!e){this.setState({trackedSelection:null});return}const{focusNode:t,focusOffset:a,range:i}=e,s=this.props.buildHighlight(i);if(!s){this.setState({trackedSelection:null});return}const o={focusNode:t,focusOffset:a,proposedHighlight:s};this.setState({trackedSelection:o})}render(){const{mouseState:e,trackedSelection:t}=this.state,a=e==="down-and-selecting";return this.props.children?l.jsx("div",{children:this.props.children(t,a)}):null}}Ka.__docgenInfo={description:"",methods:[{name:"_updateListeners",docblock:null,modifiers:[],params:[{name:"wasListening",optional:!1,type:{name:"boolean"}},{name:"willListen",optional:!1,type:{name:"boolean"}}],returns:null},{name:"_computeFocusAndRange",docblock:`Get the current selection focus and range, if present and non-collapsed.

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
}`,signature:{properties:[{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}},{key:"domRange",value:{name:"Range",required:!0}}]},required:!0}}]}},{name:"null"},{name:"undefined"}]},name:"trackedSelection"},{type:{name:"boolean"},name:"userIsMouseSelecting"}],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},enabled:{required:!0,tsType:{name:"boolean"},description:""}}};class lr extends v.PureComponent{_handleAddHighlight(r){this.props.onAddHighlight(r);const e=document.getSelection();e&&e.collapseToEnd()}_selectionIsValid(r){if(!r)return!1;const{contentNode:e}=this.props,t=new Range;t.selectNodeContents(e);const a=new Range;return a.setStart(r.focusNode,r.focusOffset),a.collapse(!0),mt(t,a)}render(){return l.jsx(Ka,{buildHighlight:this.props.buildHighlight,enabled:this.props.editable,children:(r,e)=>l.jsxs("div",{children:[l.jsx(or,{editable:this.props.editable&&!this._selectionIsValid(r),highlights:this.props.highlights,offsetParent:this.props.offsetParent,onRemoveHighlight:this.props.onRemoveHighlight,zIndexes:this.props.zIndexes}),this._selectionIsValid(r)&&!e&&l.jsx(sr,{label:this.context.strings.addHighlight,onClick:()=>this._handleAddHighlight(r.proposedHighlight),focusNode:r.focusNode,focusOffset:r.focusOffset,offsetParent:this.props.offsetParent})]})})}}c(lr,"contextType",V);lr.__docgenInfo={description:"",methods:[{name:"_handleAddHighlight",docblock:null,modifiers:[],params:[{name:"highlightToAdd",optional:!1,type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"belowContent",value:{name:"number",required:!0}}]}},description:""}}};class Ja extends v.PureComponent{constructor(){super(...arguments);c(this,"_container")}componentDidMount(){this._sendWordsUpdate()}componentDidUpdate(){this._sendWordsUpdate()}_sendWordsUpdate(){this.props.onWordsUpdate(this._getWordRanges())}_getWordRanges(){const e=this._container;if(!e)throw new rn("invariant violation: `this._container` is not defined, but this method is only called after mount/update",Be.NotAllowed);const t=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,()=>NodeFilter.FILTER_ACCEPT,!1),a=[];let i=null;for(;t.nextNode();){const s=t.currentNode;if(s.nodeType===Node.ELEMENT_NODE)getComputedStyle(s).display!=="inline"&&(i=null);else if(s.nodeType===Node.TEXT_NODE){const o=s.nodeValue,u=/\S+/g;let d,m=null;for(;(d=u.exec(o))!==null;){const p=d.index,h=d.index+d[0].length;let g;p===0&&i?(g=i,g.setEnd(s,h)):(g=s.ownerDocument.createRange(),g.setStart(s,p),g.setEnd(s,h),a.push(g)),h===o.length&&(m=g)}i=m}}return a}render(){return l.jsx("div",{ref:e=>this._container=e,children:this.props.children})}}Ja.__docgenInfo={description:"",methods:[{name:"_sendWordsUpdate",docblock:null,modifiers:[],params:[],returns:null},{name:"_getWordRanges",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"Range"}],raw:"ReadonlyArray<DOMRange>"}}}],displayName:"WordIndexer",props:{children:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]},description:""},onWordsUpdate:{required:!0,tsType:{name:"signature",type:"function",raw:"(wordRanges: ReadonlyArray<DOMRange>) => unknown",signature:{arguments:[{type:{name:"ReadonlyArray",elements:[{name:"Range"}],raw:"ReadonlyArray<DOMRange>"},name:"wordRanges"}],return:{name:"unknown"}}},description:""}}};class Qa extends v.PureComponent{constructor(){super(...arguments);c(this,"_container");c(this,"_content");c(this,"state",{wordRanges:[]});c(this,"_handleAddHighlight",e=>{const t=Dl(this._getDOMHighlights(),e),a={};for(const i of Object.keys(t))a[i]=_l(t[i]);this.props.onSerializedHighlightsUpdate(a)});c(this,"_handleRemoveHighlight",e=>{const{serializedHighlights:t}=this.props,a={...t};delete a[e],this.props.onSerializedHighlightsUpdate(a)});c(this,"_handleWordsUpdate",e=>{this.setState({wordRanges:e})})}_buildHighlight(e){return Fl(this._getDOMHighlights(),this.state.wordRanges,e)}_getDOMHighlights(){const{serializedHighlights:e}=this.props,{wordRanges:t}=this.state,a={};for(const i of Object.keys(e))a[i]=Gl(e[i],t);return a}render(){const e=this._getDOMHighlights(),t=a=>this._buildHighlight(a);return l.jsxs("div",{className:I.css(Dr.container),ref:a=>this._container=a,children:[l.jsx("div",{children:this.props.enabled&&this._container&&this._content&&l.jsx(lr,{buildHighlight:t,contentNode:this._content,editable:this.props.editable,highlights:e,offsetParent:this._container,zIndexes:{belowContent:0},onAddHighlight:this._handleAddHighlight,onRemoveHighlight:this._handleRemoveHighlight})}),l.jsx("div",{className:I.css(Dr.content),ref:a=>this._content=a,children:l.jsx(Ja,{onWordsUpdate:this._handleWordsUpdate,children:this.props.children})})]})}}const Dr=I.StyleSheet.create({container:{position:"relative",zIndex:0},content:{position:"relative",zIndex:1}});Qa.__docgenInfo={description:"",methods:[{name:"_buildHighlight",docblock:null,modifiers:[],params:[{name:"highlightRange",optional:!1,type:{name:"Range",alias:"DOMRange"}}],returns:{type:{name:"union",raw:"DOMHighlight | null | undefined",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"word-indexes"',required:!0}},{key:"firstWordIndex",value:{name:"number",required:!0}},{key:"lastWordIndex",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]}},description:""}}};const Xl=n=>({type:"passage",options:{passageTitle:n.passageTitle,passageText:n.passageText,footnotes:n.footnotes}});function ur(){return{currentRef:[],useRefs:!0,lastRef:0,firstSentenceRef:null,firstQuestionRef:null,lastFootnote:{id:0,text:""}}}class Yl extends v.Component{constructor(){super(...arguments);c(this,"getRefContent",()=>this.props.refContent)}render(){return l.jsx("span",{style:ei,children:"_"})}}class zl extends v.Component{render(){return l.jsx("span",{style:ei,children:"_"})}}const yt=({id:n,number:r})=>{const{strings:e}=pe();return l.jsx("span",{className:"perseus-sr-only",children:e[n]({number:r})},"alt-text")},Za={newline:_.defaultRules.newline,paragraph:_.defaultRules.paragraph,escape:_.defaultRules.escape,passageFootnote:{order:_.defaultRules.escape.order+.1,match:_.inlineRegex(/^\^/),parse:(n,r,e)=>{const t=e.lastFootnote.id+1,a={id:t,text:t===1?"*":""+t};return e.lastFootnote.text==="*"&&(e.lastFootnote.text=""+e.lastFootnote.id),e.lastFootnote=a,a},react:(n,r,e)=>l.jsx("sup",{children:n.text},e.key)},refStart:{order:_.defaultRules.escape.order+.2,match:function(n){const r=/^\{\{/.exec(n);if(r){let e=2,t=0;for(;e<n.length;){const a=n.slice(e,e+2);if(a==="{{")t++,e++;else if(a==="}}")if(t>0)t--,e++;else break;e++}return r[1]=n.slice(2,e),r}return null},parse:(n,r,e)=>{if(!e.useRefs)return{ref:null,refContent:null};const t=e.lastRef+1;e.lastRef=t,e.currentRef.push(t);const a=r("(“"+n[1]+`”)

`,w.defaults({useRefs:!1},ur()));return{ref:t,refContent:a}},react:(n,r,e)=>{const t=n.ref;if(t==null)return null;const a=r(n.refContent,{});return l.jsx(Yl,{ref:It+t,refContent:a},It+t)}},refEnd:{order:_.defaultRules.escape.order+.3,match:_.inlineRegex(/^\}\}/),parse:(n,r,e)=>e.useRefs?{ref:e.currentRef.pop()||null}:{ref:null},react:(n,r,e)=>n.ref!=null?l.jsx(zl,{ref:Nt+n.ref},Nt+n.ref):null},squareLabel:{order:_.defaultRules.escape.order+.4,match:_.inlineRegex(/^\[\[(\w+)\]\]( *)/),parse:(n,r,e)=>(e.firstQuestionRef||(e.firstQuestionRef=n[1]),{content:n[1],space:n[2].length>0}),react:(n,r,e)=>[l.jsx("span",{className:"perseus-passage-square-label",style:Fr,"aria-hidden":"true",children:l.jsx("span",{style:Bl,children:n.content})},"visual-square"),l.jsx(yt,{id:"questionMarker",number:n.content},"alt-text"),n.space?" ":null]},circleLabel:{order:_.defaultRules.escape.order+.5,match:_.inlineRegex(/^\(\((\w+)\)\)( *)/),parse:(n,r,e)=>({content:n[1],space:n[2].length>0}),react:(n,r,e)=>[l.jsx("span",{className:"perseus-passage-circle-label",style:Fr,"aria-hidden":!0,children:l.jsx("span",{style:Kl,children:n.content})},"visual-circle"),l.jsx(yt,{id:"circleMarker",number:n.content},"alt-text"),n.space?" ":null]},squareBracketRef:{order:_.defaultRules.escape.order+.6,match:_.inlineRegex(/^\[(\d+)\]( *)/),parse:(n,r,e)=>(e.firstSentenceRef||(e.firstSentenceRef=n[1]),{content:n[1],space:n[2].length>0}),react:(n,r,e)=>[l.jsxs("span",{className:"perseus-passage-bracket-label","aria-hidden":"true",children:["[",n.content,"]"]},"visual-brackets"),l.jsx(yt,{id:"sentenceMarker",number:n.content},"alt-text"),n.space?" ":null]},highlight:{order:_.defaultRules.escape.order+.7,match:_.inlineRegex(/^{highlighting.start}(.+?){highlighting.end}/),parse:(n,r,e)=>({content:n[1]}),react:(n,r,e)=>[l.jsx("span",{className:"perseus-highlight",children:n.content},0)]},reviewHighlight:{order:_.defaultRules.escape.order+.7,match:_.inlineRegex(/^{review-highlighting.start}(.+?){review-highlighting.end}/),parse:(n,r,e)=>({content:n[1]}),react:(n,r,e)=>[l.jsx("span",{className:"perseus-review-highlight",children:n.content},0)]},strong:_.defaultRules.strong,u:_.defaultRules.u,em:_.defaultRules.em,del:_.defaultRules.del,text:{..._.defaultRules.text,react(n,r,e){return l.jsx("span",{children:n.content},e.key)}}},It="start-ref-",Nt="end-ref-",ei={display:"inline-block",width:0,visibility:"hidden"},Fr={display:"inline",whiteSpace:"nowrap"},Bl={display:"inline-block",color:"rgb(255, 255, 255)",backgroundColor:"rgb(90, 90, 90)",paddingLeft:10,paddingRight:10,userSelect:"none",WebkitUserSelect:"none"},Kl={display:"inline-block",color:"rgb(255, 255, 255)",backgroundColor:"rgb(90, 90, 90)",userSelect:"none",WebkitUserSelect:"none",width:22,height:22,borderRadius:"50%",textAlign:"center"},Jl=_.parserFor(Za),Ql=(n,r)=>{r=r||{};const e=n+`

`;return Jl(e,w.extend(r,ur()))},Zl=_.reactFor(_.ruleOutput(Za,"react")),ke={parse:Ql,output:Zl,START_REF_PREFIX:It,END_REF_PREFIX:Nt,getInitialParseState:ur};class ni extends v.Component{constructor(){super(...arguments);c(this,"_line")}measureLineHeight(){return this._line?this._line.clientHeight:0}render(){return l.jsx("div",{className:I.css(eu.measurer),"aria-hidden":"true",children:l.jsx("div",{ref:e=>this._line=e,className:"paragraph",children:"Line Height Measurement"})})}}const eu=I.StyleSheet.create({measurer:{position:"absolute",top:0,left:0,visibility:"hidden",zIndex:-1}});class Nn extends v.Component{constructor(){super(...arguments);c(this,"_contentRef");c(this,"_lineHeightMeasurerRef");c(this,"_onResize");c(this,"_stylesAppiedTimer");c(this,"isWidget",!0);c(this,"state",{nLines:null,startLineNumbersAfter:0,stylesAreApplied:!1});c(this,"_handleSerializedHighlightsUpdate",e=>{this.props.onChange({highlights:e})})}componentDidMount(){this._updateState(),this._onResize=w.throttle(()=>{var e;this.shouldRenderJipt()||((e=this._lineHeightMeasurerRef)==null||e.measureLineHeight(),this._updateState())},500),window.addEventListener("resize",this._onResize),this._stylesAppiedTimer=window.setTimeout(()=>{this.setState({stylesAreApplied:!0})},0)}shouldComponentUpdate(e,t){return!w.isEqual(this.props,e)||!w.isEqual(this.state,t)}componentDidUpdate(){this._updateState()}componentWillUnmount(){window.removeEventListener("resize",this._onResize),clearTimeout(this._stylesAppiedTimer)}_updateState(){this.shouldRenderJipt()||this.setState({nLines:this._measureLines(),startLineNumbersAfter:this._getInitialLineNumber()})}_measureLines(){const e=vn.findDOMNode(this._contentRef),t=W(e).height(),a=this._getLineHeight();return Math.round(t/a)}_getInitialLineNumber(){let e=!0;return this.props.findWidgets((a,i)=>i.type!=="passage"?!1:(a===this.props.widgetId&&(e=!1),e)).filter(ti).map(a=>a.getLineCount()).reduce((a,i)=>a+i,0)}_getLineHeight(){var e;return((e=this._lineHeightMeasurerRef)==null?void 0:e.measureLineHeight())||0}getLineCount(){return this.state.nLines!=null?this.state.nLines:this._measureLines()}_getStartRefLineNumber(e){const t=ke.START_REF_PREFIX+e,a=this.refs[t];if(!a)return null;const i=W(vn.findDOMNode(a));let s=i.next();s.length===0&&(s=i);const o=s.offset().top;return this.state.startLineNumbersAfter+1+this._convertPosToLineNumber(o)}_getEndRefLineNumber(e){const t=ke.END_REF_PREFIX+e,a=this.refs[t];if(!a)return null;const i=W(vn.findDOMNode(a));let s=i.prev();s.length===0&&(s=i);const o=s.height(),u=s.offset().top;let d=this._convertPosToLineNumber(u+o);return o===0&&(d+=1),this.state.startLineNumbersAfter+d}_convertPosToLineNumber(e){const t=vn.findDOMNode(this._contentRef),a=e-W(t).offset().top,i=this._getLineHeight();return Math.round(a/i)}_getRefContent(e){const t=ke.START_REF_PREFIX+e,a=this.refs[t];return a?a.getRefContent():null}getReference(e){const t=this._getStartRefLineNumber(e),a=this._getEndRefLineNumber(e);if(t==null||a==null)return null;const i=this._getRefContent(e);return{startLine:t,endLine:a,content:i}}getPromptJSON(){return Xl(this.props)}_renderInstructions(e){const t=e.firstQuestionRef,a=e.firstSentenceRef,{strings:i}=this.context;let s="";t&&(s+=i.symbolPassage({questionSymbol:"[["+t+"]]",questionNumber:t})),a&&(s+=i.symbolQuestion({sentenceSymbol:"["+a+"]"}));const o=ke.parse(s);return l.jsx("div",{className:"perseus-widget-passage-instructions",children:ke.output(o)})}shouldRenderJipt(){const{JIPT:e}=Pe();return e.useJIPT&&this.props.passageText.indexOf("crwdns")!==-1}_renderContent(e){const t=this.state.stylesAreApplied,a=!this.props.reviewMode;return l.jsx(Qa,{editable:a,enabled:t,onSerializedHighlightsUpdate:this._handleSerializedHighlightsUpdate,serializedHighlights:this.props.highlights,children:l.jsxs("div",{ref:i=>this._contentRef=i,children:[l.jsx(ni,{ref:i=>this._lineHeightMeasurerRef=i}),ke.output(e)]})})}_hasFootnotes(){const e=this.props.footnotes;return!/^\s*$/.test(e)}_renderFootnotes(){const e=this.props.footnotes,t=ke.parse(e);return ke.output(t)}render(){const{strings:e}=this.context;let t;const a=this.state.nLines;this.props.showLineNumbers&&a&&(t=w.range(1,a+1).map(m=>{const p=m+this.state.startLineNumbersAfter;if(p===4){const h=e.lineLabel;return l.jsx("span",{className:"line-marker",children:h},"line-marker")}return l.jsx("span",{children:p},m)}));const i=ke.getInitialParseState(),s=/("{1})([^"]*)("{1})/g,o=this.props.passageText.replace(s,"“$2”"),u=ke.parse(o,i),d=/\S/.test(this.props.passageTitle);return l.jsx("div",{children:l.jsxs("div",{className:"perseus-widget-passage-container",children:[this._renderInstructions(i),l.jsxs("div",{className:"perseus-widget-passage",children:[d&&l.jsx("h3",{className:"passage-title",children:l.jsx(Y,{content:this.props.passageTitle,linterContext:this.props.linterContext,strings:e})}),t&&l.jsx("div",{className:"line-numbers","aria-hidden":!0,children:t}),!d&&l.jsx("h3",{className:"perseus-sr-only",children:e.beginningPassage}),l.jsx("div",{className:"passage-text",children:this.shouldRenderJipt()?l.jsx(Y,{content:this.props.passageText,strings:e}):this._renderContent(u)}),this._hasFootnotes()&&[l.jsx("h4",{className:"perseus-sr-only",children:e.beginningFootnotes},"footnote-start"),l.jsx("div",{className:"footnotes",children:this._renderFootnotes()},"footnotes")],l.jsx("div",{className:"perseus-sr-only",children:e.endPassage})]})]})})}}c(Nn,"contextType",V),c(Nn,"defaultProps",{passageTitle:"",passageText:"",footnotes:"",showLineNumbers:!0,highlights:{},linterContext:ae});const nu={name:"passage",displayName:"Passage (SAT only)",hidden:!0,widget:Nn,transform:n=>w.pick(n,"passageTitle","passageText","footnotes","showLineNumbers"),isLintable:!0};ni.__docgenInfo={description:"",methods:[{name:"measureLineHeight",docblock:null,modifiers:[],params:[],returns:{type:{name:"number"}}}],displayName:"LineHeightMeasurer"};Nn.__docgenInfo={description:"",methods:[{name:"_handleSerializedHighlightsUpdate",docblock:null,modifiers:[],params:[{name:"serializedHighlights",optional:!1,type:{name:"signature",type:"object",raw:`{
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
}`,computed:!1},required:!1}}};function ti(n){return n instanceof Nn}const Wr="–";class St extends v.Component{constructor(){super(...arguments);c(this,"displayName","PassageRef");c(this,"_isMounted");c(this,"_throttledUpdateRange");c(this,"isWidget",!0);c(this,"state",{lineRange:null,content:null});c(this,"change",(...e)=>ie.apply(this,e));c(this,"_deferredUpdateRange",()=>{w.defer(this._updateRange)});c(this,"_updateRange",()=>{const e=this.props.findWidgets("passage "+this.props.passageNumber).filter(ti)[0],t=e==null?void 0:e.getReference(this.props.referenceNumber);this._isMounted&&(t?this.setState({lineRange:[t.startLine,t.endLine],content:t.content}):this.setState({lineRange:null,content:null}))})}componentDidMount(){this._isMounted=!0,this._deferredUpdateRange(),this._throttledUpdateRange=w.throttle(this._deferredUpdateRange,500),window.addEventListener("resize",this._throttledUpdateRange)}shouldComponentUpdate(e,t){return!w.isEqual(this.props,e)||!w.isEqual(this.state,t)}componentDidUpdate(){this._deferredUpdateRange()}componentWillUnmount(){window.removeEventListener("resize",this._throttledUpdateRange),this._isMounted=!1}getPromptJSON(){return Ol(this.props)}render(){const{strings:e}=this.context,t=this.state.lineRange;let a;t?t[0]===t[1]?a=e.lineNumber({lineNumber:String(t[0])}):a=e.lineRange({lineRange:t[0]+Wr+t[1]}):a=e.lineRange({lineRange:`?${Wr}?`});let i;if(this.props.summaryText){const s=Ar.parseInline(this.props.summaryText);i=l.jsxs("span",{"aria-hidden":!0,children:[" ","(“",Ar.basicOutput(s),"”)"]})}else i=null;return l.jsxs("span",{children:[a,i,t&&l.jsx("div",{className:"perseus-sr-only",children:this.state.content})]})}}c(St,"contextType",V),c(St,"defaultProps",{passageNumber:1,referenceNumber:1,summaryText:""});const ri={name:"passage-ref",displayName:"PassageRef (SAT only)",hidden:!0,widget:St,transform:n=>({passageNumber:n.passageNumber,referenceNumber:n.referenceNumber,summaryText:n.summaryText}),version:mo.version};var Le;let ai=(Le=class extends v.Component{constructor(){super(...arguments);c(this,"focusFunction");c(this,"_renderRenderer",(e="")=>{let t=1;const a={},i=e.replace(/\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,(s,o,u,d)=>{const m="passage-ref "+t;return t++,a[m]={type:"passage-ref",graded:!1,options:{passageNumber:parseInt(o),referenceNumber:parseInt(u),summaryText:d},version:ri.version},"[["+Z.snowman+" "+m+"]]"});return l.jsx(Y,{content:i,widgets:a,findExternalWidgets:this.props.findWidgets,alwaysUpdate:!0,linterContext:{...this.props.linterContext,blockHighlight:!0},strings:this.context.strings},"choiceContentRenderer")});c(this,"updateChoices",e=>{const{choiceStates:t,choices:a}=this.props,i=t?t.map(s=>({...s})):a.map(()=>({selected:!1,crossedOut:!1,highlighted:!1,rationaleShown:!1,correctnessShown:!1,previouslyAnswered:!1,readOnly:!1}));i.forEach((s,o)=>{s.selected=e.checked[o],s.crossedOut=e.crossedOut[o]}),this.props.onChange({choiceStates:i}),this.props.trackInteraction()});c(this,"showRationalesForCurrentlySelectedChoices",e=>{const{choiceStates:t}=this.props;if(t){const a=Ao(this.getUserInput(),e),i=a.type==="points"&&a.total===a.earned,s=t.map(o=>({...o,highlighted:o.selected,rationaleShown:o.selected||o.rationaleShown||i,readOnly:o.selected||o.readOnly||i||this.props.showSolutions!=="none",correctnessShown:o.selected||o.correctnessShown,previouslyAnswered:o.previouslyAnswered||o.selected}));this.props.onChange({choiceStates:s},null,!0)}});c(this,"deselectIncorrectSelectedChoices",()=>{if(this.props.choiceStates){const e=this.props.choiceStates.map((t,a)=>({...t,selected:t.selected&&!!this.props.choices[a].correct,highlighted:!1}));this.props.onChange({choiceStates:e},null,!1)}})}static getUserInputFromProps(e,t=!0){if(e.choiceStates){const i=e.choiceStates,s=i.map(()=>!1);for(let o=0;o<s.length;o++){const u=t?e.choices[o].originalIndex:o;s[u]=i[o].selected}return{choicesSelected:s}}const{values:a}=e;if(a){const i=[...a],s=a.length;for(let o=0;o<s;o++){const u=t?e.choices[o].originalIndex:o;i[u]=a[o]}return{choicesSelected:i}}return{choicesSelected:e.choices.map(()=>!1)}}componentDidUpdate(e){this.props.showSolutions==="selected"&&e.showSolutions!=="selected"&&this.showRationalesForCurrentlySelectedChoices(this.props)}focus(e){return this.focusFunction?this.focusFunction(e):!1}registerFocusFunction(e){this.focusFunction=e}getUserInput(){return Le.getUserInputFromProps(this.props)}getPromptJSON(){const e=Le.getUserInputFromProps(this.props,!1);return Sl(this.props,e)}render(){const{choices:e}=this.props,{strings:t}=this.context;let a;this.props.static?a=e.map(s=>({selected:!!s.correct,crossedOut:!1,readOnly:!0,highlighted:!1,rationaleShown:!0,correctnessShown:!0,previouslyAnswered:!1})):this.props.showSolutions==="all"?a=e.map(({correct:s})=>({selected:!!s,crossedOut:!1,readOnly:!0,highlighted:!1,rationaleShown:!0,correctnessShown:!0,previouslyAnswered:!1})):this.props.choiceStates?a=this.props.choiceStates:this.props.values?a=this.props.values.map(s=>({selected:s,crossedOut:!1,readOnly:!1,highlighted:!1,rationaleShown:!1,correctnessShown:!1,previouslyAnswered:!1})):a=e.map(()=>({selected:!1,crossedOut:!1,readOnly:!1,highlighted:!1,rationaleShown:!1,correctnessShown:!1,previouslyAnswered:!1}));const i=e.map((s,o)=>{var A;const u=s.isNoneOfTheAbove&&!s.content?t.noneOfTheAbove:s.content,{selected:d,crossedOut:m,rationaleShown:p,correctnessShown:h,readOnly:g,highlighted:y,previouslyAnswered:f}=a[o],b=(A=this.props.reviewModeRubric)==null?void 0:A.choices[o];return{content:this._renderRenderer(u),checked:d,correct:s.correct===void 0?!!b&&!!b.correct:s.correct,disabled:g,hasRationale:!!s.clue,rationale:this._renderRenderer(s.clue),showRationale:p,showCorrectness:h,isNoneOfTheAbove:!!s.isNoneOfTheAbove,revealNoneOfTheAbove:!!(this.props.questionCompleted&&d),crossedOut:m,highlighted:y,previouslyAnswered:f}});return l.jsx(Fo,{labelWrap:!0,multipleSelect:this.props.multipleSelect,countChoices:this.props.countChoices,numCorrect:this.props.numCorrect,choices:i,onChange:this.updateChoices,reviewModeRubric:this.props.reviewModeRubric,reviewMode:this.props.reviewMode,deselectEnabled:this.props.deselectEnabled,apiOptions:this.props.apiOptions,isLastUsedWidget:this.props.isLastUsedWidget,registerFocusFunction:s=>this.registerFocusFunction(s)})}},c(Le,"contextType",V),c(Le,"defaultProps",{choices:[],multipleSelect:!1,countChoices:!1,deselectEnabled:!1,linterContext:ae,showSolutions:"none"}),Le);ai.__docgenInfo={description:"",methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`RenderProps & {
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
}`,computed:!1}},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},choices:{defaultValue:{value:"[]",computed:!1},required:!1},multipleSelect:{defaultValue:{value:"false",computed:!1},required:!1},countChoices:{defaultValue:{value:"false",computed:!1},required:!1},deselectEnabled:{defaultValue:{value:"false",computed:!1},required:!1},showSolutions:{defaultValue:{value:'"none"',computed:!1},required:!1}}};const tu=(n,r,e)=>{const t=function(o){const u=e===void 0?po:e;return n.randomize?Qt(o,u??0):o},a=function(o){let u=null;const d=o.filter((m,p)=>m.isNoneOfTheAbove?(u=m,!1):!0);return u&&d.push(u),d},i=o=>{const u=[[r.false,r.true],[r.no,r.yes]],d=o.map(m=>m.content);return u.some(m=>w.isEqual(d,m))?[o[1],o[0]]:o},s=n.choices.map((o,u)=>({...o,originalIndex:u,correct:!!o.correct}));return a(i(t(s)))},Gr=(n,r,e)=>{const t=tu(n,r,e),{hasNoneOfTheAbove:a,multipleSelect:i,countChoices:s,deselectEnabled:o,numCorrect:u}=n;return{numCorrect:u,hasNoneOfTheAbove:a,multipleSelect:i,countChoices:s,deselectEnabled:o,choices:t,selectedChoices:w.pluck(t,"correct")}},ru={name:"radio",displayName:"Radio / Multiple choice",accessible:!0,widget:ai,transform:Gr,staticTransform:Gr,version:qr.version,propUpgrades:qr.widgetOptionsUpgrades,isLintable:!0},au=[ru,Pl,Nl,vl],iu=(n,r)=>({type:"categorizer",options:{items:n.items,categories:n.categories},userInput:{itemToCategoryMapping:r.values}}),Tn=class Tn extends v.Component{constructor(){super(...arguments);c(this,"state",{uniqueId:w.uniqueId("perseus_radio_")});c(this,"change",(...e)=>ie.apply(this,e))}static getUserInputFromProps(e){return{values:e.values}}getUserInput(){return Tn.getUserInputFromProps(this.props)}getPromptJSON(){return iu(this.props,this.getUserInput())}onChange(e,t){const a=[...this.props.values];a[e]=t,this.change("values",a),this.props.trackInteraction()}render(){const e=this,t=this.props.apiOptions.isMobile;let a=this.props.items.map((u,d)=>[u,d]);this.props.randomizeItems&&(a=Qt(a,this.props.problemNum));const i=l.jsxs("table",{className:"categorizer-table "+I.css(Oe.mobileTable),children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("td",{className:I.css(Oe.emptyHeaderCell)}),this.props.categories.map((u,d)=>l.jsx("th",{className:I.css(Oe.header),children:l.jsx(Y,{content:u,linterContext:this.props.linterContext,strings:this.context.strings})},d))]})}),l.jsx("tbody",{children:a.map(u=>{const d=u[0],m=u[1],p=e.state.uniqueId+"_"+m;return l.jsxs("tr",{children:[l.jsx("td",{children:l.jsx(Y,{content:d,linterContext:this.props.linterContext,strings:this.context.strings})}),e.props.categories.map((h,g)=>{const y=e.props.values[m]===g;return l.jsx("td",{className:"category "+I.css(Oe.cell),children:l.jsxs("div",{role:"button","aria-label":h,onClick:()=>this.onChange(m,g),children:[t&&l.jsx("input",{type:"radio",name:p,className:I.css(Nr.responsiveInput,Nr.responsiveRadioInput),checked:y,onChange:()=>this.onChange(m,g),onClick:f=>f.stopPropagation()}),!t&&l.jsx("span",{className:I.css(Oe.radioSpan,y&&Oe.checkedRadioSpan,this.props.static&&y&&Oe.staticCheckedRadioSpan),children:y?l.jsx(an,{...Wo}):l.jsx(an,{...Go})})]})},g)})]},m)})})]}),s=Fe({"categorizer-container":!0,"static-mode":this.props.static}),o=this.props.apiOptions.isMobile?[Oe.fullBleedContainer]:[];return l.jsx("div",{className:s+" "+I.css(...o),children:i})}};c(Tn,"contextType",V),c(Tn,"defaultProps",{items:[],categories:[],values:[],linterContext:ae});let Qn=Tn;const Oe=I.StyleSheet.create({mobileTable:{[Pt.smOrSmaller]:{minWidth:"auto"}},fullBleedContainer:{[Pt.mdOrSmaller]:{marginLeft:-16,marginRight:-16,overflowX:"auto"}},header:{textAlign:"center",verticalAlign:"bottom"},cell:{textAlign:"center",padding:0,color:"#ccc",verticalAlign:"middle"},emptyHeaderCell:{backgroundColor:"inherit",borderBottom:"2px solid #ccc"},radioSpan:{fontSize:30,paddingRight:3,":hover":{color:"#999"}},checkedRadioSpan:{color:"#333"},staticCheckedRadioSpan:{color:"#888"}}),su={name:"categorizer",displayName:"Categorizer",hidden:!0,widget:Qn,transform:n=>w.pick(n,"items","categories","randomizeItems"),staticTransform:n=>w.pick(n,"items","categories","values","randomizeItems"),isLintable:!0};Qn.__docgenInfo={description:"",methods:[{name:"getUserInputFromProps",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:`WidgetProps<RenderProps, PerseusCategorizerRubric> & {
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
}`,computed:!1},required:!1}}};const ou=n=>!!(n&&n.toLowerCase()==="file:");let wt;const lu=()=>(wt||(wt=window.location),wt),uu=n=>new URL(n,lu().origin),ii=n=>uu(n).href,du=()=>Ke("cs-program"),{updateQueryString:mu}=Z;function pu(n){const{InitialRequestUrl:r}=Pe(),e=`/computer-programming/program/${n}/embedded?embed=yes&author=no`;return ou(r.protocol)?`https://khanacademy.org${e}`:ii(e)}class si extends v.Component{constructor(){super(...arguments);c(this,"handleMessageEvent",e=>{let t={};try{t=JSON.parse(e.originalEvent.data)}catch{return}if(w.isUndefined(t.testsPassed))return;const a=t.testsPassed?"correct":"incorrect";this.change({status:a,message:t.message})});c(this,"change",(...e)=>ie.apply(this,e))}componentDidMount(){W(window).on("message",this.handleMessageEvent)}componentWillUnmount(){W(window).off("message",this.handleMessageEvent)}getUserInput(){return{status:this.props.status,message:this.props.message}}getPromptJSON(){return du()}render(){if(!this.props.programID)return l.jsx("div",{});let e=!1,t=pu(this.props.programID),a;const i={height:this.props.height,width:"100%"};if(this.props.showEditor?(t+="&editor=yes",a="perseus-scratchpad-editor"):(t+=`&editor=no&width=${$o}`,a="perseus-scratchpad",this.props.programType!=="webpage"&&(e=!0)),this.props.showButtons?(t+="&buttons=yes",i.height+=67):t+="&buttons=no",this.props.settings){const o={};w.each(this.props.settings,function(u){u.name&&u.value&&(o[u.name]=u.value)}),t=mu(t,"settings",JSON.stringify(o))}const s=["allow-popups","allow-same-origin","allow-scripts","allow-top-navigation"].join(" ");return l.jsx("div",{className:I.css(_r.widthOverride,e&&_r.container),children:l.jsx("iframe",{sandbox:s,src:t,style:i,className:a,allowFullScreen:!0})})}}c(si,"defaultProps",{showEditor:!1,showButtons:!1,status:"incomplete",message:null});const _r=I.StyleSheet.create({widthOverride:{width:820},container:{margin:"auto"}}),cu={name:"cs-program",displayName:"CS Program",widget:si,hidden:!0},gu=n=>({type:"definition",definition:n.definition,togglePrompt:n.togglePrompt});class Ot extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0)}getPromptJSON(){return gu(this.props)}render(){return l.jsx(yo,{children:({activeDefinitionId:e,setActiveDefinitionId:t})=>l.jsx(Bo,{content:l.jsx(Ko,{style:hu.tooltipBody,closeButtonVisible:!0,children:l.jsx(Y,{apiOptions:this.props.apiOptions,content:this.props.definition,widgets:this.props.widgets,strings:this.context.strings})}),opened:e===this.props.widgetId,onClose:()=>t(null),placement:"top",children:l.jsx(tr,{onClick:()=>{this.props.trackInteraction(),t(this.props.widgetId)},children:({hovered:a,focused:i,pressed:s})=>l.jsx("span",{style:{color:G.blue,borderBottom:a||i||s?`2px solid ${G.blue}`:"none"},children:this.props.togglePrompt})})})})}}c(Ot,"contextType",V),c(Ot,"defaultProps",{togglePrompt:"define me",definition:"definition goes here"});const hu={tooltipBody:{color:G.offBlack,fontSize:20,fontWeight:500,lineHeight:"30px"}},yu={name:"definition",displayName:"Definition",accessible:!0,widget:Ot,transform:n=>n};class oi extends Ma.Component{constructor(){super(...arguments);c(this,"isWidget",!0)}render(){return l.jsx("div",{style:{paddingTop:8,paddingBottom:8},children:l.jsx(Yo,{text:this.context.strings.deprecatedStandin,kind:"info",layout:"full-width"})})}}c(oi,"contextType",V);const wu={name:"deprecated-standin",displayName:"Deprecated Standin",widget:oi,hidden:!0},fu=""+new URL("caret-down-Cn6qDmS5.svg",import.meta.url).href,bu=(n,r)=>({type:"dropdown",options:{items:n.choices},userInput:{selectedIndex:r.value-1}});class jt extends v.Component{constructor(){super(...arguments);c(this,"focus",()=>(J.findDOMNode(this).focus(),!0));c(this,"_handleChangeEvent",e=>{this._handleChange(parseInt(e.target.value))});c(this,"_handleChange",e=>{this.props.trackInteraction(),this.props.onChange({selected:e})})}getUserInput(){return{value:this.props.selected}}getPromptJSON(){return bu(this.props,this.getUserInput())}render(){const e=[l.jsx(Sr,{value:"0",disabled:!0,label:l.jsx(Y,{content:this.props.placeholder,strings:this.context.strings}),labelAsText:this.props.placeholder},"placeholder"),...this.props.choices.map((t,a)=>l.jsx(Sr,{value:String(a+1),label:l.jsx(Y,{content:t,strings:this.context.strings}),labelAsText:t},String(a+1)))];return l.jsx(Oa,{children:t=>l.jsxs(U,{onClick:a=>{a.stopPropagation()},onTouchStart:a=>{a.stopPropagation()},children:[this.props.visibleLabel&&l.jsx(vo,{tag:"label",htmlFor:t,children:this.props.visibleLabel}),l.jsx(Jo,{id:t,placeholder:"",className:"perseus-dropdown",onChange:a=>this._handleChange(parseInt(a)),selectedValue:String(this.props.selected),disabled:this.props.apiOptions.readOnly,"aria-label":this.props.ariaLabel||this.props.visibleLabel||this.context.strings.selectAnAnswer,showOpenerLabelAsText:!1,children:e})]})})}}c(jt,"contextType",V),c(jt,"defaultProps",{choices:[],selected:0,placeholder:"",apiOptions:Ne.defaults});function vu(n){return{placeholder:n.placeholder,visibleLabel:n.visibleLabel,ariaLabel:n.ariaLabel,choices:n.choices.map(r=>r.content)}}const ku={name:"dropdown",displayName:"Drop down",accessible:!0,widget:jt,transform:vu},xu=""+new URL("caret-up-Zi4v5Hs8.svg",import.meta.url).href,qu=n=>({type:"explanation",showPrompt:n.showPrompt,explanation:n.explanation});function Pu(n){return typeof window.matchMedia!="function"?!1:window.matchMedia(n).matches}class Et extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0);c(this,"state",{expanded:!1});c(this,"_mounted",!1);c(this,"change",(...e)=>ie.apply(this,e));c(this,"_onClick",()=>{this.setState({expanded:!this.state.expanded}),this.props.trackInteraction()})}componentDidMount(){this._mounted=!0}componentWillUnmount(){this._mounted=!1}getPromptJSON(){return qu(this.props)}render(){const e=this.state.expanded?this.props.hidePrompt:this.props.showPrompt,t=this.state.expanded?xu:fu,a=this._mounted&&Pu("(prefers-reduced-motion: no-preference)"),i={height:"auto",lineHeight:"inherit",marginLeft:"-2px",marginRight:"2px",paddingLeft:"2px"},s={fontSize:"18px",lineHeight:"inherit","text-align":"left",marginRight:"-6px","white-space":"normal"},o=[Je.content,this.state.expanded?Je.contentExpanded:Je.contentCollapsed,a&&(this.state.expanded?Je.transitionExpanded:Je.transitionCollapsed)];return l.jsx(Oa,{children:u=>l.jsxs(l.Fragment,{children:[l.jsx(fe,{"aria-expanded":this.state.expanded,"aria-controls":u,endIcon:t,kind:"tertiary",labelStyle:s,onClick:this._onClick,size:"small",style:i,children:e}),l.jsx(U,{id:u,style:o,"aria-hidden":!this.state.expanded,testId:"content-container",children:l.jsx(U,{style:Je.contentWrapper,children:l.jsx(Y,{apiOptions:this.props.apiOptions,content:this.props.explanation,widgets:this.props.widgets,linterContext:this.props.linterContext,strings:this.context.strings})})})]})})}}c(Et,"contextType",V),c(Et,"defaultProps",{showPrompt:"Explain",hidePrompt:"Hide explanation",explanation:`explanation goes here

more explanation`,widgets:{},linterContext:ae});const Au=23,Cu=10,Vr=14,Je=I.StyleSheet.create({content:{borderLeft:"0px solid #ccc",display:"inline-grid",position:"relative"},contentCollapsed:{gridTemplateColumns:"0fr",gridTemplateRows:"0fr",marginBottom:0,marginTop:0,minWidth:"0",paddingBottom:0,visibility:"hidden"},contentExpanded:{borderLeftWidth:"5px",gridTemplateColumns:"1fr",gridTemplateRows:"1fr",marginLeft:-23,minWidth:"100%",paddingLeft:Au,paddingBottom:Cu,visibility:"visible",marginBottom:Vr,marginTop:Vr},contentWrapper:{overflow:"hidden"},transitionCollapsed:{transition:"all 0.25s step-end, grid-template-rows 0.25s, margin-top 0.25s, margin-bottom 0.25s, padding-bottom 0.25s"},transitionExpanded:{transition:"grid-template-rows 0.5s, margin-top 0.5s, margin-bottom 0.5s, padding-bottom 0.5s"}}),Tu={name:"explanation",displayName:"Explanation",accessible:!0,widget:Et,transform:w.identity,isLintable:!0},Ru=(n,r,e)=>r?{...r,title:n,type:"graded-group",hint:e}:{type:"graded-group",title:n,content:"",widgets:{},hint:e};class dr extends v.Component{render(){const{apiOptions:r,answerBarState:e,onCheckAnswer:t,onNextQuestion:a}=this.props,{keepTrying:i,tryAgain:s,check:o,correctExcited:u,nextQuestion:d}=this.context.strings,m={...Ln.answerBar,backgroundColor:e==="CORRECT"?G.offWhite:"white",justifyContent:e==="CORRECT"&&!a?"center":"space-between"},p=e==="INCORRECT"?l.jsxs("span",{style:Ln.text,children:[l.jsx("span",{style:Ln.tryAgainIcon,children:l.jsx(an,{..._o})}),l.jsx("span",{style:{marginLeft:8},children:i})]}):l.jsx("span",{});if(e!=="CORRECT"){const h=e==="INCORRECT"?s:o;return l.jsxs("div",{style:m,children:[p,l.jsx(fe,{disabled:r.readOnly||e!=="ACTIVE",onClick:t,children:h})]})}return l.jsxs("div",{style:m,children:[l.jsxs("span",{style:Ln.text,children:[l.jsx("span",{style:{fontSize:28,color:G.green},children:l.jsx(an,{...Vo,style:{marginBottom:5}})}),l.jsx("span",{role:"alert","aria-label":u,style:{marginLeft:8},children:u})]}),a&&l.jsx(fe,{onClick:a,children:d})]})}}c(dr,"contextType",V);const Iu=17,Ln={answerBar:{display:"flex",alignItems:"center",height:68,marginLeft:Ye,marginRight:Ye,marginBottom:Ye,marginTop:De,paddingLeft:De,paddingRight:10,borderTop:`1px solid ${G.offBlack50}`},tryAgainIcon:{fontSize:28,color:"#63D9EA",transform:"scale(-1,1) rotate(-268deg)"},text:{display:"flex",flexDirection:"row",alignItems:"center",fontWeight:"bold",fontSize:Iu}};dr.__docgenInfo={description:"",methods:[],displayName:"GradedGroupAnswerBar",props:{answerBarState:{required:!0,tsType:{name:"union",raw:`| "HIDDEN" // The 'Check' button is disabled and there is no message.  This occurs when
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
}>`},description:""},onCheckAnswer:{required:!0,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onNextQuestion:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""}}};const Te={ungraded:"ungraded",correct:"correct",incorrect:"incorrect",invalid:"invalid"},Nu=(n,r)=>{switch(n){case"HIDDEN":return r?"ACTIVE":n;case"ACTIVE":return r?n:"INACTIVE";case"INACTIVE":return r?"ACTIVE":n;case"INCORRECT":return r?"ACTIVE":"INACTIVE";default:return n}};class sn extends v.Component{constructor(){super(...arguments);c(this,"state",{status:Te.ungraded,showHint:!1,message:"",answerBarState:"HIDDEN"});c(this,"rendererRef",v.createRef());c(this,"hintRendererRef",v.createRef());c(this,"change",(...e)=>ie.apply(this,e));c(this,"_onInteractWithWidget",e=>{if(this.setState({status:Te.ungraded,message:""}),this.rendererRef.current){this.change("widgets",this.props.widgets);const a=this.rendererRef.current.emptyWidgets().length===0,i=this.state.answerBarState;this.setState({answerBarState:Nu(i,a)})}});c(this,"_checkAnswer",()=>{var u,d;(u=this.rendererRef.current)==null||u.showRationalesForCurrentlySelectedChoices();const e=((d=this.rendererRef.current)==null?void 0:d.score())||{type:"invalid"},{INVALID_MESSAGE_PREFIX:t,DEFAULT_INVALID_MESSAGE_1:a,DEFAULT_INVALID_MESSAGE_2:i}=this.context.strings,s=e.type==="points"?e.total===e.earned?Te.correct:Te.incorrect:Te.invalid,o=e.type==="points"?e.message||"":e.message?`${t} ${ko(e.message,this.context.strings)}`:`${t} ${a}${i}`;this.setState({status:s,message:o,answerBarState:s==="correct"?"CORRECT":"INCORRECT"}),this.props.trackInteraction({status:s})});c(this,"getInputPaths",()=>{var e;return((e=this.rendererRef.current)==null?void 0:e.getInputPaths())||[]});c(this,"setInputValue",(e,t,a)=>{var i;return(i=this.rendererRef.current)==null?void 0:i.setInputValue(e,t,a)});c(this,"focus",()=>{var e;return!!((e=this.rendererRef.current)!=null&&e.focus())});c(this,"focusInputPath",e=>{var t;(t=this.rendererRef.current)==null||t.focusPath(e)});c(this,"blurInputPath",e=>{var t;(t=this.rendererRef.current)==null||t.blurPath(e)})}shouldComponentUpdate(e,t){return e!==this.props||t!==this.state}getPromptJSON(){var t,a,i;const e=((t=this.hintRendererRef.current)==null?void 0:t.getPromptJSON())||{content:((a=this.props.hint)==null?void 0:a.content)||"",widgets:{}};return Ru(this.props.title,(i=this.rendererRef.current)==null?void 0:i.getPromptJSON(),e)}render(){const e=w.extend({},Ne.defaults,this.props.apiOptions,{onFocusChange:(m,p)=>{p&&this.props.onBlur(p),m&&this.props.onFocus(m)}});let t=null,a=null;this.state.status===Te.correct?(a=l.jsx(an,{...Ho,style:{color:"#526f03"}}),t=this.context.strings.correct):this.state.status===Te.incorrect&&(a=l.jsx(an,{...Uo,style:{color:"#ff5454"}}),t=this.context.strings.incorrect);const i=this.props.inGradedGroupSet?I.css(yn.gradedGroupInSet):I.css(yn.gradedGroup),s=Fe({[i]:e.isMobile,"perseus-graded-group":!0,"answer-correct":e.isMobile?!1:this.state.status===Te.correct,"answer-incorrect":e.isMobile?!1:this.state.status===Te.incorrect}),{answerBarState:o}=this.state,u=o==="CORRECT",d=e.readOnly||e.isMobile&&u;return l.jsxs("div",{className:s,children:[!!this.props.title&&l.jsx("div",{className:I.css(yn.title),children:this.props.title}),l.jsx(Y,{...this.props,ref:this.rendererRef,apiOptions:{...e,readOnly:d},onInteractWithWidget:this._onInteractWithWidget,linterContext:this.props.linterContext,strings:this.context.strings}),!e.isMobile&&a&&l.jsx("div",{className:"group-icon",children:a}),!e.isMobile&&t&&l.jsx("div",{className:I.css(Sn.srOnly),role:"alert","aria-label":t,children:t}),!e.isMobile&&l.jsx("p",{role:"status","aria-live":"polite",children:this.state.message}),!e.isMobile&&l.jsx(fe,{kind:"secondary",disabled:this.props.apiOptions.readOnly,onClick:this._checkAnswer,children:this.context.strings.check}),!e.isMobile&&u&&this.props.onNextQuestion&&l.jsx(fe,{kind:"secondary",disabled:this.props.apiOptions.readOnly,onClick:this.props.onNextQuestion,style:{marginLeft:5},children:this.context.strings.nextQuestion}),this.props.hint&&this.props.hint.content&&(this.state.showHint?l.jsxs("div",{children:[l.jsx("button",{tabIndex:"0",className:I.css(yn.explanationTitle),onClick:()=>this.setState({showHint:!1}),onKeyPress:m=>{m.preventDefault(),this.setState({showHint:!1})},children:this.context.strings.hideExplanation}),l.jsx(Y,{...this.props.hint,ref:this.hintRendererRef,apiOptions:e,linterContext:this.props.linterContext,strings:this.context.strings})]}):l.jsx("button",{tabIndex:"0",onClick:()=>this.setState({showHint:!0}),onKeyPress:m=>{m.preventDefault(),this.setState({showHint:!0})},className:I.css(yn.showHintLink),children:this.context.strings.explain})),e.isMobile&&o!=="HIDDEN"&&l.jsx(dr,{apiOptions:e,answerBarState:o,onCheckAnswer:this._checkAnswer,onNextQuestion:this.props.onNextQuestion})]})}}c(sn,"contextType",V),c(sn,"defaultProps",{title:"",content:"",widgets:{},images:{},hint:null,hasHint:!1,linterContext:ae});const Su=function(n,r){return w.extend({},n,r(n))},yn=I.StyleSheet.create({gradedGroupInSet:{marginLeft:0,paddingLeft:0},gradedGroup:{borderTop:`1px solid ${zn}`,borderBottom:`1px solid ${zn}`,backgroundColor:Wa,marginLeft:Ye,marginRight:Ye,paddingBottom:De,paddingLeft:De,paddingRight:De,paddingTop:10,width:"auto"},showHintLink:{backgroundColor:"unset",fontSize:14,padding:0,border:"none",marginTop:20,color:G.blue,cursor:"pointer",display:"block",clear:"both"},explanationTitle:{backgroundColor:"unset",marginTop:20,color:G.blue,marginBottom:10,cursor:"pointer",fontSize:14,padding:0,border:"none",display:"block",clear:"both"},title:{fontSize:12,color:Xo,textTransform:"uppercase",marginBottom:11,letterSpacing:.8}}),Ou={name:"graded-group",displayName:"Graded group (articles only)",widget:sn,traverseChildWidgets:Su,hidden:!1,tracking:"all",isLintable:!0};sn.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"_onInteractWithWidget",docblock:null,modifiers:[],params:[{name:"id",optional:!1,type:null}],returns:null},{name:"_checkAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"getInputPaths",docblock:null,modifiers:[],params:[],returns:null},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"intersection",raw:`RendererPromptJSON & {
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
}`,computed:!1},required:!1}}};const ju=(n,r)=>({type:"graded-group-set",options:{groupCount:n.gradedGroups.length,currentGroup:r}});class li extends v.Component{constructor(){super(...arguments);c(this,"handleKeyDown",(e,t)=>{(e.key==="Enter"||e.key===" ")&&this.props.onChangeCurrentGroup(t)})}render(){return l.jsx("ul",{className:Fe(I.css(we.indicatorContainer),"indicatorContainer"),children:this.props.gradedGroups.map(({title:e},t)=>l.jsx("li",{className:I.css(we.indicator),children:l.jsx(tr,{role:"button","aria-label":this.context.strings.skipToTitle({title:e}),style:we.indicatorButton,onClick:()=>this.props.onChangeCurrentGroup(t),onKeyDown:a=>this.handleKeyDown(a,t),children:({hovered:a,focused:i,pressed:s})=>l.jsx(U,{style:[we.indicatorDot,(a||i||s)&&we.indicatorDotFocused],children:t===this.props.currentGroup&&l.jsx(U,{style:we.indicatorDotActive,children:l.jsx("span",{className:I.css(Sn.srOnly),children:this.context.strings.current})})})})},e))})}}c(li,"contextType",V);class ui extends v.Component{constructor(){super(...arguments);c(this,"_childGroup");c(this,"state",{currentGroup:0});c(this,"change",(...e)=>ie.apply(this,e));c(this,"getInputPaths",()=>this._childGroup.getInputPaths());c(this,"setInputValue",(e,t,a)=>this._childGroup.setInputValue(e,t,a));c(this,"focus",()=>this._childGroup.focus());c(this,"focusInputPath",e=>{this._childGroup.focusInputPath(e)});c(this,"blurInputPath",e=>{this._childGroup.blurInputPath(e)});c(this,"handleNextQuestion",()=>{const{currentGroup:e}=this.state,t=this.props.gradedGroups.length;e<t-1&&this.setState({currentGroup:e+1})})}shouldComponentUpdate(e,t){return e!==this.props||t!==this.state}getPromptJSON(){const e=this._childGroup.getPromptJSON();return ju(this.props,e)}render(){const{JIPT:e}=Pe();if(e.useJIPT&&this.props.gradedGroups.length>1)return l.jsx("div",{className:I.css(we.container),children:this.props.gradedGroups.map((s,o)=>l.jsx(sn,{...this.props,...s,inGradedGroupSet:!1,linterContext:this.props.linterContext},o))});const t=this.props.gradedGroups[this.state.currentGroup];if(!t)return l.jsx("span",{children:"No current group..."});const a=this.props.gradedGroups.length,i=this.state.currentGroup<a-1?this.handleNextQuestion:null;return l.jsxs("div",{className:I.css(we.container),children:[l.jsxs("div",{className:I.css(we.top),children:[l.jsx("div",{className:I.css(we.title),children:t.title}),l.jsx("div",{className:I.css(we.spacer)}),l.jsx(li,{currentGroup:this.state.currentGroup,gradedGroups:this.props.gradedGroups,onChangeCurrentGroup:s=>this.setState({currentGroup:s})})]}),l.jsx(sn,{ref:s=>this._childGroup=s,...this.props,...t,inGradedGroupSet:!0,title:null,onNextQuestion:i,linterContext:this.props.linterContext},this.state.currentGroup)]})}}c(ui,"defaultProps",{gradedGroups:[],linterContext:ae});const Eu=function(n,r){return{groups:n.gradedGroups.map(r)}},Mu={name:"graded-group-set",displayName:"Graded group set (articles only)",widget:ui,traverseChildWidgets:Eu,hidden:!1,tracking:"all",isLintable:!0},we=I.StyleSheet.create({top:{display:"flex",flexDirection:"row"},spacer:{flex:1},title:{fontSize:12,color:G.offBlack64,textTransform:"uppercase",marginBottom:11,letterSpacing:.8},indicatorContainer:{display:"flex",flexDirection:"row",listStyle:"none",margin:"unset",paddingInlineStart:"unset",flexWrap:"wrap"},indicator:{width:24,height:24},indicatorButton:{width:"100%",height:"100%",display:"flex",flexWrap:"wrap",placeContent:"center",cursor:"pointer",":focus":{outline:"none"}},indicatorDot:{boxSizing:"content-box",width:10,height:10,borderRadius:"100%",borderWidth:2,borderColor:G.blue,borderStyle:"solid"},indicatorDotFocused:{borderWidth:5,borderStyle:"double"},indicatorDotActive:{backgroundColor:G.blue,width:"100%",height:"100%"},container:{borderTop:`1px solid ${zn}`,borderBottom:`1px solid ${zn}`,backgroundColor:Wa,marginLeft:Ye,marginRight:Ye,paddingBottom:De,paddingLeft:De,paddingRight:De,paddingTop:10,width:"auto"}}),Lu=(n,r)=>{const{type:e,coords:t}=r,a={type:e,coords:t};return(r.type==="logarithm"||r.type==="exponential")&&(a.asymptote=r.asymptote),{type:"grapher",options:{availableTypes:n.availableTypes,range:n.graph.range,labels:n.graph.labels,tickStep:n.graph.step,gridStep:n.graph.gridStep,snapStep:n.graph.snapStep,backgroundImageUrl:n.graph.backgroundImage.url},userInput:a}},Du={PLOT:ne.Plot,PARABOLA:ne.Parabola,SINUSOID:ne.Sinusoid},Fu={url:null},cy=n=>{const r=n.plot;return r.type&&r.coords&&lt(r.type).getEquationString(r.coords,r.asymptote)||""},Wu=(n,r,e,t)=>{const a=function(i,s){return Math.floor((i[1]-i[0])/s)};return n.map(i=>{const s=i.map((o,u)=>{const d=r[u],m=e[u],p=a(d,m),h=Math.round(o*p);return d[0]+m*h});return Co(s,t)})},di=(n,r,e,t)=>n&&Wu(n,r,e,t),mr=(n,r)=>{const e=lt(n),t="defaultAsymptote"in e?e.defaultAsymptote:null,a=[1,1],i=Z.snapStepFromGridStep(a);return{type:n,asymptote:di(t,r.range,r.step,i),coords:null}},Gu=w.first,Hr=(n,r)=>{const e=n.gridStep||Z.getGridStep(n.range,n.step,r),t=n.snapStep||Z.snapStepFromGridStep(e);return{gridStep:e,snapStep:t}},mi={labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],backgroundImage:Fu,markings:"graph",rulerLabel:"",rulerTicks:10,valid:!0,showTooltips:!1},Ur=mr("linear",mi),_u={graph:mi,plot:Ur,availableTypes:[Ur.type]},Vu=n=>{const r=n.charAt(0).toUpperCase()+n.substring(1),e=Pe().staticUrl;return{value:n,title:r,content:l.jsx("img",{src:e(lt(n).url),alt:r})}},$r=ne.MovablePoint,Hu=ne.MovableLine;function Uu(n,r,e){const t=(a,i,s)=>(i[0]-a[0])*(s[1]-a[1])-(s[0]-a[0])*(i[1]-a[1]);return t(e[0],e[1],r)>0!=t(e[0],e[1],n)>0}const $u={padding:"5px 5px"};class pi extends v.Component{constructor(){super(...arguments);c(this,"_coords",()=>{const e=this.props,t=e.graph,a=e.model&&di(e.model.defaultCoords,t.range,t.step,t.snapStep);return e.coords||a||null});c(this,"_asymptote",()=>this.props.asymptote);c(this,"change",(...e)=>ie.apply(this,e));c(this,"renderPlot",()=>{const e=this.props.model,t=this.props.graph.range[0],a={stroke:this.props.isMobile?D.BLUE_C:D.DYNAMIC,...this.props.isMobile?{"stroke-width":3}:{}},i=e.getCoefficients(this._coords(),this._asymptote());if(!i)return;const s=e.getPropsForCoeffs(i,t),o=Du[e.movable];return v.createElement(o,{...s,key:this.props.model.url,range:t,style:a})});c(this,"renderAsymptote",()=>{const e=this.props.model,t=this.props.graph,a=this._asymptote(),i=(a==null?void 0:a.length)>0,s={strokeDasharray:"- "};return i&&l.jsx(Hu,{onMove:(o,u)=>{const d=Tr(o,u),m=w.map(this._asymptote(),p=>Rn(p,d));this.props.onChange({asymptote:m})},constraints:[Ee.MovableLine.constraints.bound(),Ee.MovableLine.constraints.snap(),(o,u)=>{const d=Tr(o,u),m=w.map(this._asymptote(),p=>Rn(p,d));return e.extraAsymptoteConstraint?e.extraAsymptoteConstraint(o,u,this._coords(),m,t):!0}],normalStyle:s,highlightStyle:s,children:w.map(a,(o,u)=>l.jsx($r,{coord:o,static:!0,draw:null,extendLine:!0,showHairlines:this.props.showHairlines,hideHairlines:this.props.hideHairlines,showTooltips:this.props.showTooltips,isMobile:this.props.isMobile},`asymptoteCoord-${u}`))})})}render(){const e=(o,u)=>l.jsx($r,{coord:o,static:this.props.static,constraints:[Ee.MovablePoint.constraints.bound(),Ee.MovablePoint.constraints.snap(),d=>{const m=w.all(this._coords(),(p,h)=>u===h||!p||!Ro(d[0],p[0]));if(!m)return!1;if(this.props.model&&this.props.model.extraCoordConstraint){const p=this.props.model.extraCoordConstraint,h=w.clone(this._coords()),g=w.clone(h[u]);return h[u]=d,p(d,g,h,this._asymptote(),this.props.graph)}return m}],onMove:(d,m)=>{let p;const h=this._asymptote();h&&this.props.model.allowReflectOverAsymptote&&Uu(d,m,h)?p=w.map(this._coords(),g=>To(g,h)):p=w.clone(this._coords()),p[u]=d,this.props.onChange({coords:p})},showHairlines:this.props.showHairlines,hideHairlines:this.props.hideHairlines,showTooltips:this.props.showTooltips,isMobile:this.props.isMobile},u),t=w.map(this._coords(),e),a=this.props.graph.box,i=this.props.graph.backgroundImage;let s=null;if(i.url){const o=a[0]/Ga.defaultBoxSize;s=l.jsx(jn,{src:i.url,width:i.width,height:i.height,scale:o})}return l.jsx("div",{className:"perseus-widget perseus-widget-grapher",style:{width:a[0],height:a[1],boxSizing:"initial"},children:l.jsxs("div",{className:"graphie-container blank-background",style:{width:a[0],height:a[1]},children:[s,l.jsxs(ne,{...this.props.graph,setDrawingAreaAvailable:this.props.setDrawingAreaAvailable,children:[this.props.model&&this.renderPlot(),this.props.model&&this.renderAsymptote(),this.props.model&&t]})]})})}}c(pi,"defaultProps",{graph:{range:[[-10,10],[-10,10]],step:[1,1]},coords:null,asymptote:null,isMobile:!1});const st=class st extends v.Component{constructor(){super(...arguments);c(this,"horizHairline");c(this,"vertHairline");c(this,"handlePlotChanges",e=>{const t=w.extend({},this.props.plot,e);this.props.onChange({plot:t}),this.props.trackInteraction()});c(this,"handleActiveTypeChange",e=>{const t=this.props.graph,a=w.extend({},this.props.plot,mr(e,t));this.props.onChange({plot:a})});c(this,"_setupGraphie",(e,t)=>{const a=this.props.apiOptions.isMobile;if(t.markings==="graph"?(e.graphInit({range:t.range,scale:w.pluck(t.gridConfig,"scale"),axisArrows:"<->",labelFormat:function(i){return"\\small{"+i+"}"},gridStep:t.gridStep,snapStep:t.snapStep,tickStep:a?this._calculateMobileTickStep(t.gridStep,t.step,t.range):w.pluck(t.gridConfig,"tickStep"),labelStep:1,unityLabels:w.pluck(t.gridConfig,"unityLabel"),isMobile:a}),e.label([0,t.range[1][1]],t.labels[1],a?"below right":"above"),e.label([t.range[0][1],0],t.labels[0],a?"above left":"right")):t.markings==="grid"?e.graphInit({range:t.range,scale:w.pluck(t.gridConfig,"scale"),gridStep:t.gridStep,axes:!1,ticks:!1,labels:!1,isMobile:a}):t.markings==="none"&&e.init({range:t.range,scale:w.pluck(t.gridConfig,"scale")}),this.props.apiOptions.isMobile){const i={normalStyle:{strokeWidth:1}};this.horizHairline=new qt(e,[0,0],[0,0],i),this.horizHairline.attr({stroke:D.INTERACTIVE}),this.horizHairline.hide(),this.vertHairline=new qt(e,[0,0],[0,0],i),this.vertHairline.attr({stroke:D.INTERACTIVE}),this.vertHairline.hide()}});c(this,"showHairlines",e=>{this.props.apiOptions.isMobile&&this.props.markings!=="none"&&(this.horizHairline.moveTo([this.props.graph.range[0][0],e[1]],[this.props.graph.range[0][1],e[1]]),this.horizHairline.show(),this.vertHairline.moveTo([e[0],this.props.graph.range[1][0]],[e[0],this.props.graph.range[1][1]]),this.vertHairline.show())});c(this,"hideHairlines",()=>{this.props.apiOptions.isMobile&&(this.horizHairline.hide(),this.vertHairline.hide())})}static getUserInputFromProps(e){return e.plot}_getGridConfig(e){return e.step.map((t,a)=>Z.gridDimensionConfig(t,e.range[a],e.box[a],e.gridStep[a]))}_calculateMobileTickStep(e,t,a){const i=Z.constrainedTickStepsFromTickSteps(t,a);return i[0]=i[0]/e[0],i[1]=i[1]/e[1],i}getUserInput(){return st.getUserInputFromProps(this.props)}getPromptJSON(){return Lu(this.props,this.getUserInput())}render(){const e=this.props.plot.type,t=this.props.plot.coords,a=this.props.plot.asymptote,i=l.jsx("div",{style:$u,children:l.jsx(Zo,{value:e,allowEmpty:!0,buttons:w.map(this.props.availableTypes,Vu),onChange:this.handleActiveTypeChange})}),s=Sa(this.props.containerSizeClass),o={...this.props.graph,...Hr(this.props.graph,s[0]),gridConfig:this._getGridConfig({...this.props.graph,box:s,...Hr(this.props.graph,s[0])})},u={graph:{box:s,range:o.range,step:o.step,snapStep:o.snapStep,backgroundImage:o.backgroundImage,options:o,setup:this._setupGraphie},onChange:this.handlePlotChanges,model:e&&lt(e),coords:t,asymptote:a,static:this.props.static,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable,isMobile:this.props.apiOptions.isMobile,showTooltips:this.props.graph.showTooltips,showHairlines:this.showHairlines,hideHairlines:this.hideHairlines};return l.jsxs("div",{children:[l.jsx(pi,{...u}),this.props.availableTypes.length>1&&i]})}};c(st,"defaultProps",_u);let Mt=st;const ci=n=>{const r={availableTypes:n.availableTypes,graph:n.graph};if(r.availableTypes.length===1){const e=r.graph,t=Gu(r.availableTypes);r.plot=mr(t,e)}return r},Xu=n=>({...ci(n),availableTypes:[n.correct.type],plot:n.correct}),Yu={name:"grapher",displayName:"Grapher",hidden:!0,widget:Mt,transform:ci,staticTransform:Xu},zu=n=>n?{...n,type:"group"}:{type:"group",content:"",widgets:{}};class Lt extends v.Component{constructor(){super(...arguments);c(this,"rendererRef");c(this,"change",(...e)=>ie.apply(this,e));c(this,"getSerializedState",()=>{var e;return(e=this.rendererRef)==null?void 0:e.getSerializedState()});c(this,"restoreSerializedState",(e,t)=>{var a;return(a=this.rendererRef)==null||a.restoreSerializedState(e,t),null});c(this,"setInputValue",(e,t,a)=>{var i;return(i=this.rendererRef)==null?void 0:i.setInputValue(e,t,a)});c(this,"focusInputPath",e=>{var t;(t=this.rendererRef)==null||t.focusPath(e)});c(this,"blurInputPath",e=>{var t;(t=this.rendererRef)==null||t.blurPath(e)});c(this,"showRationalesForCurrentlySelectedChoices",()=>{var e;(e=this.rendererRef)==null||e.showRationalesForCurrentlySelectedChoices()})}componentDidMount(){this.forceUpdate()}getUserInputMap(){var e;return(e=this.rendererRef)==null?void 0:e.getUserInputMap()}getUserInput(){var e;return(e=this.rendererRef)==null?void 0:e.getUserInput()}getPromptJSON(){var e;return zu((e=this.rendererRef)==null?void 0:e.getPromptJSON())}getInputPaths(){var e;return((e=this.rendererRef)==null?void 0:e.getInputPaths())??[]}focus(){var e;return((e=this.rendererRef)==null?void 0:e.focus())??!1}render(){var m;const e={...Ne.defaults,...this.props.apiOptions,onFocusChange:(p,h)=>{h&&this.props.onBlur(h),p&&this.props.onFocus(p)}},a=this.props.findWidgets("group").indexOf(this),i=this.props.apiOptions.groupAnnotator(a,this.props.widgetId),s=p=>{this.rendererRef&&this.change("widgets",this.rendererRef.props.widgets)},o=(m=this.rendererRef)==null?void 0:m.score(),u=o&&o.type!=="invalid",d=o&&o.type==="invalid";return l.jsxs("div",{className:Fe({"perseus-group":!0,"perseus-group-valid-answer":u,"perseus-group-invalid-answer":d}),children:[i,l.jsx(Y,{content:this.props.content,widgets:this.props.widgets,images:this.props.images,ref:p=>this.rendererRef=p,apiOptions:e,findExternalWidgets:this.props.findWidgets,reviewMode:this.props.reviewMode,onInteractWithWidget:s,linterContext:this.props.linterContext,strings:this.context.strings}),this.props.icon&&l.jsx("div",{className:"group-icon",children:this.props.icon})]})}}c(Lt,"contextType",V),c(Lt,"defaultProps",{content:"",widgets:{},images:{},linterContext:ae});const Bu=function(n,r){return{...n,...r(n)}},Ku={name:"group",displayName:"Group (SAT only)",widget:Lt,traverseChildWidgets:Bu,hidden:!0,isLintable:!0},Ju=()=>Ke("iframe"),{updateQueryString:Dn}=Z;class gi extends v.Component{constructor(){super(...arguments);c(this,"handleMessageEvent",e=>{let t={};try{t=JSON.parse(e.originalEvent.data)}catch{return}if(w.isUndefined(t.testsPassed))return;const a=t.testsPassed?"correct":"incorrect";this.change({status:a,message:t.message})});c(this,"change",(...e)=>ie.apply(this,e))}componentDidMount(){W(window).on("message",this.handleMessageEvent)}componentWillUnmount(){W(window).off("message",this.handleMessageEvent)}getUserInput(){return{status:this.props.status,message:this.props.message}}getPromptJSON(){return Ju()}render(){const e={width:String(this.props.width),height:String(this.props.height)},{InitialRequestUrl:t}=Pe();Object.entries(e).forEach(([s,o])=>{!o.endsWith("%")&&!o.endsWith("px")&&(e[s]=o+"px")});let a=this.props.url;if(a&&a.length&&a.indexOf("http")!==0&&(a="https://www.khanacademy.org/computer-programming/program/"+a+"/embedded?buttons=no&embed=yes&editor=no&author=no",a=Dn(a,"width",this.props.width),a=Dn(a,"height",this.props.height),a=Dn(a,"origin",t.origin)),this.props.settings){const s={};w.each(this.props.settings,function(o){o.name&&o.value&&(s[o.name]=o.value)}),a=Dn(a,"settings",JSON.stringify(s))}let i="allow-same-origin allow-scripts";return i+=" allow-top-navigation",l.jsx("iframe",{sandbox:i,style:e,src:a,allowFullScreen:this.props.allowFullScreen})}}c(gi,"defaultProps",{status:"incomplete",message:null,allowFullScreen:!1,allowTopNavigation:!1});const Qu={name:"iframe",displayName:"Iframe (deprecated)",widget:gi,hidden:!0},Zu=n=>({type:"image",options:{altText:n.alt,title:n.title,caption:n.caption,imageUrl:n.backgroundImage.url}}),Xr=400,Yr=[0,10],ed={url:null,width:0,height:0};class Dt extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0);c(this,"change",(...e)=>ie.apply(this,e))}getPromptJSON(){return Zu(this.props)}render(){let e;const t=this.props.caption===this.props.alt?"":this.props.alt,{apiOptions:a}=this.props,i=this.props.backgroundImage;if(i.url){const u=i.url;e=l.jsx(rr.Consumer,{children:({setAssetStatus:d})=>l.jsx(jn,{src:u,alt:t,width:i.width,height:i.height,preloader:a.imagePreloader,extraGraphie:{box:this.props.box,range:this.props.range,labels:this.props.labels},trackInteraction:this.props.trackInteraction,zoomToFullSizeOnMobile:a.isMobile,constrainHeight:a.isMobile,allowFullBleed:a.isMobile,setAssetStatus:d})})}if(a.isMobile){let u;if(this.props.title||this.props.caption){let d=this.props.title;d&&(this.props.caption&&!/[.?!"']\s*$/.test(d)&&(d+="."),d=`**${d}** `);const m=Fe({"perseus-image-caption":!0,"has-title":!!d}),p=this.props.alignment,g=p==="block"||p==="full-width"?null:"0 !important";u=l.jsx("figcaption",{className:m,style:{maxWidth:i.width},children:l.jsx("div",{style:{minWidth:g},children:l.jsx(Y,{content:d+this.props.caption,apiOptions:a,linterContext:this.props.linterContext,strings:this.context.strings})})})}return l.jsxs("figure",{className:"perseus-image-widget",style:{maxWidth:i.width},children:[e,u]})}let s,o;return this.props.title&&(s=l.jsx("div",{className:"perseus-image-title",children:l.jsx(Y,{content:this.props.title,apiOptions:a,linterContext:this.props.linterContext,strings:this.context.strings})})),this.props.caption&&(o=l.jsx("figcaption",{className:"perseus-image-caption",style:{maxWidth:i.width},children:l.jsx(Y,{content:this.props.caption,apiOptions:a,linterContext:this.props.linterContext,strings:this.context.strings})})),l.jsxs("figure",{className:"perseus-image-widget",style:{maxWidth:i.width},children:[s,e,o]})}}c(Dt,"contextType",V),c(Dt,"defaultProps",{alignment:"block",title:"",range:[Yr,Yr],box:[Xr,Xr],backgroundImage:ed,labels:[],alt:"",caption:"",linterContext:ae});const nd={name:"image",accessible:n=>{const r=n.backgroundImage;return!(r&&r.url&&!n.alt)},displayName:"Image",widget:Dt,isLintable:!0},td=()=>Ke("interaction"),ft=ne.Label,rd=ne.Line,wn=ne.MovablePoint,ad=ne.MovableLine,id=ne.Plot,sd=ne.PlotParametric,od=ne.Point,ld=ne.Rect,{unescapeMathMode:ud}=Z,hi=(n,r)=>{r=r||{};let e=n+"||"+r.decimal_separator+"||";const t=r.functions,a=t?t.length:0;for(let i=0;i<a;i++)e+=t[i]+"|";return e},zr=Object.create(null),Re=(n,r)=>{const e=hi(n,r);let t=zr[e];return t||(t=ot(n,r),zr[e]=t,t)},Br=Object.create(null),Kr=(n,r)=>{const e=hi(n,r);let t=Br[e];if(t)return t;const a=ot(n,r).expr;return t=a?a.compile():function(){return 0},Br[e]=t,t};class yi extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0);c(this,"state",{variables:Jr(this.props.elements),functions:Qr(this.props.elements)});c(this,"_setupGraphie",(e,t)=>{e.graphInit(w.extend({},t,{grid:w.contains(["graph","grid"],this.props.graph.markings),axes:w.contains(["graph"],this.props.graph.markings),ticks:w.contains(["graph"],this.props.graph.markings),labels:w.contains(["graph"],this.props.graph.markings),labelFormat:function(a){return"\\small{"+a+"}"},axisArrows:"<->",unityLabels:!1}))});c(this,"_updatePointLocation",(e,t)=>{const a=w.clone(this.state.variables);a["x_"+e]=t[0],a["y_"+e]=t[1],this.setState({variables:a}),this.props.trackInteraction()});c(this,"_updateLineLocation",(e,t)=>{const a=this._eval("("+e.endX+")-("+e.startX+")"),i=this._eval("("+e.endY+")-("+e.startY+")"),s=Rn(t,[a,i]),o=w.clone(this.state.variables);o["x_"+e.startSubscript]=t[0],o["y_"+e.startSubscript]=t[1],o["x_"+e.endSubscript]=s[0],o["y_"+e.endSubscript]=s[1],this.setState({variables:o}),this.props.trackInteraction()});c(this,"_eval",(e,t)=>{const a=Kr(e,{functions:this.state.functions}),i=w.extend({},this.state.variables,t);return w.each(w.keys(i),s=>{if(w.isString(i[s])){const o=Kr(i[s],{functions:this.state.functions});i[s]=function(u){return o(w.extend({},i,{x:u}))}}}),a(i)||0});c(this,"_extractVars",e=>{if(e==null)return[];let t=[];return w.each(e.args(),function(a){a&&a.constructor.name==="Expr"&&(t=t.concat(this._extractVars(a)))},this),e.name()==="Var"&&t.push(e.prettyPrint()),t});c(this,"change",(...e)=>ie.apply(this,e))}UNSAFE_componentWillReceiveProps(e){w.isEqual(this.props.elements,e.elements)||this.setState({variables:Jr(e.elements),functions:Qr(e.elements)})}getPromptJSON(){return td()}render(){const e=this.props.graph.range;let t=this.props.graph.labels;return this.props.graph.markings==="graph"&&(t=this.props.graph.labels.map(a=>a.startsWith("$")&&a.endsWith("$")?a.slice(1,-1):a)),l.jsxs(ne,{box:this.props.graph.box,range:this.props.graph.range,options:this.props.graph,setup:this._setupGraphie,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable,children:[this.props.graph.markings==="graph"&&l.jsx(ft,{coord:[0,e[1][1]],text:t[1],direction:"above"}),this.props.graph.markings==="graph"&&l.jsx(ft,{coord:[e[0][1],0],text:t[0],direction:"right"}),w.map(this.props.elements,function(a,i){if(a.type==="point")return l.jsx(od,{coord:[this._eval(a.options.coordX),this._eval(a.options.coordY)],color:a.options.color},a.key);if(a.type==="line"){const s=[this._eval(a.options.startX),this._eval(a.options.startY)],o=[this._eval(a.options.endX),this._eval(a.options.endY)];return l.jsx(rd,{start:s,end:o,style:{stroke:a.options.color,strokeWidth:a.options.strokeWidth,strokeDasharray:a.options.strokeDasharray,arrows:a.options.arrows}},a.key)}if(a.type==="movable-point"){const s=[o=>{const u=Math.max(this._eval(a.options.constraintXMin),Math.min(this._eval(a.options.constraintXMax),o[0])),d=Math.max(this._eval(a.options.constraintYMin),Math.min(this._eval(a.options.constraintYMax),o[1]));return[u,d]}];return a.options.constraint==="snap"?s.push(wn.constraints.snap(a.options.snap)):a.options.constraint==="x"?s.push(o=>[this._eval(a.options.constraintFn,{y:o[1]}),o[1]]):a.options.constraint==="y"&&s.push(o=>[o[0],this._eval(a.options.constraintFn,{x:o[0]})]),l.jsx(wn,{coord:[this.state.variables["x_"+a.options.varSubscript],this.state.variables["y_"+a.options.varSubscript]],constraints:s,foo_x:a.options.constraint,foo_y:a.options.constraintFn,foo_z:a.options.snap,onMove:w.partial(this._updatePointLocation,a.options.varSubscript)},a.key)}if(a.type==="movable-line"){const s=[d=>{const m=Math.max(this._eval(a.options.constraintXMin),Math.min(this._eval(a.options.constraintXMax),d[0])),p=Math.max(this._eval(a.options.constraintYMin),Math.min(this._eval(a.options.constraintYMax),d[1]));return[m,p]}];a.options.constraint==="snap"?s.push(wn.constraints.snap(a.options.snap)):a.options.constraint==="x"?s.push(d=>[this._eval(a.options.constraintFn,{y:d[1]}),d[1]]):a.options.constraint==="y"&&s.push(d=>[d[0],this._eval(a.options.constraintFn,{x:d[0]})]);const o=[this.state.variables["x_"+a.options.startSubscript],this.state.variables["y_"+a.options.startSubscript]],u=[this.state.variables["x_"+a.options.endSubscript],this.state.variables["y_"+a.options.endSubscript]];return l.jsxs(ad,{constraints:s,onMove:w.bind(this._updateLineLocation,this,a.options),foo_x:a.options.constraint,foo_y:a.options.constraintFn,foo_z:a.options.snap,children:[l.jsx(wn,{coord:o,static:!0,normalStyle:{stroke:"none",fill:"none"}}),l.jsx(wn,{coord:u,static:!0,normalStyle:{stroke:"none",fill:"none"}})]},a.key)}if(a.type==="function"){const s=m=>this._eval(a.options.value,{x:m}),o=w.without(this._extractVars(Re(a.options.value).expr),"x"),u=w.object(o,w.map(o,m=>this.state.variables[m])),d=[this._eval(a.options.rangeMin,this.state.variables),this._eval(a.options.rangeMax,this.state.variables)];return l.jsx(id,{fn:s,foo_fn:a.options.value,foo_varvalues:u,range:d,style:{stroke:a.options.color,strokeWidth:a.options.strokeWidth,strokeDasharray:a.options.strokeDasharray,plotPoints:100}},a.key)}if(a.type==="parametric"){const s=m=>[this._eval(a.options.x,{t:m}),this._eval(a.options.y,{t:m})],o=w.without(this._extractVars(Re(a.options.x).expr).concat(this._extractVars(Re(a.options.y).expr)),"t"),u=w.object(o,w.map(o,m=>this.state.variables[m])),d=[this._eval(a.options.rangeMin,this.state.variables),this._eval(a.options.rangeMax,this.state.variables)];return l.jsx(sd,{fn:s,foo_fnx:a.options.x,foo_fny:a.options.y,foo_varvalues:u,range:d,style:{stroke:a.options.color,strokeWidth:a.options.strokeWidth,strokeDasharray:a.options.strokeDasharray,plotPoints:100}},a.key)}if(a.type==="label"){const s=[this._eval(a.options.coordX),this._eval(a.options.coordY)];return l.jsx(ft,{coord:s,text:ud(a.options.label),style:{color:a.options.color}},i+1)}if(a.type==="rectangle")return l.jsx(ld,{x:this._eval(a.options.coordX),y:this._eval(a.options.coordY),width:w.max([this._eval(a.options.width),0]),height:w.max([this._eval(a.options.height),0]),style:{stroke:"none",fill:a.options.color}},i+1)},this)]})}}c(yi,"defaultProps",{graph:{box:[400,400],labels:["x","y"],range:[[-10,10],[-10,10]],tickStep:[1,1],gridStep:[1,1],markings:"graph"},elements:[]});const Jr=n=>{const r={};return w.each(w.where(n,{type:"movable-point"}),e=>{const t=e.options.varSubscript,a=Re(e.options.startX||"0").expr,i=Re(e.options.startY||"0").expr;let s=0,o=0;a&&(s=a.eval({})||0),i&&(o=i.eval({})||0),r["x_"+t]=s,r["y_"+t]=o}),w.each(w.where(n,{type:"movable-line"}),e=>{const t=e.options.startSubscript,a=e.options.endSubscript,i=Re(e.options.startX||"0").expr,s=Re(e.options.startY||"0").expr,o=Re(e.options.endX||"0").expr,u=Re(e.options.endY||"0").expr;let d=0,m=0,p=0,h=0;i&&(d=i.eval({})||0),s&&(m=s.eval({})||0),o&&(p=o.eval({})||0),u&&(h=u.eval({})||0),r["x_"+t]=d,r["y_"+t]=m,r["x_"+a]=p,r["y_"+a]=h}),w.each(w.where(n,{type:"function"}),e=>{r[e.options.funcName]=e.options.value}),r},Qr=n=>w.map(w.where(n,{type:"function"}),r=>r.options.funcName),dd={name:"interaction",displayName:"Interaction",widget:yi,transform:w.identity,hidden:!0},md=(n,r)=>{var e;return{type:"interactive-graph",options:{graph:pd(n),backgroundImageUrl:(e=n.backgroundImage)==null?void 0:e.url,range:n.range,labels:n.labels},userInput:cd(r)}},pd=n=>{var e,t;const r=n.graph.type;switch(r){case"angle":return{type:n.graph.type,angleOffsetDegrees:n.graph.angleOffsetDeg,startCoords:n.graph.startCoords};case"circle":return{type:n.graph.type,startParams:{center:(e=n.graph.startCoords)==null?void 0:e.center,radius:(t=n.graph.startCoords)==null?void 0:t.radius}};case"linear":return{type:n.graph.type,startCoords:n.graph.startCoords};case"linear-system":return{type:n.graph.type,startCoords:n.graph.startCoords};case"point":return{type:n.graph.type,numPoints:n.graph.numPoints,startCoords:n.graph.startCoords};case"polygon":return{type:n.graph.type,match:n.graph.match,numSides:n.graph.numSides,startCoords:n.graph.startCoords};case"quadratic":return{type:n.graph.type,startCoords:n.graph.startCoords};case"ray":return{type:n.graph.type,startCoords:n.graph.startCoords};case"segment":return{type:n.graph.type,numSegments:n.graph.numSegments,startCoords:n.graph.startCoords};case"sinusoid":return{type:n.graph.type,startCoords:n.graph.startCoords};case"none":return{};default:throw new ve(r)}},cd=n=>{const r=n.type;switch(r){case"angle":return{coords:n.coords,angleOffsetDegrees:n.angleOffsetDeg};case"circle":return{center:n.center,radius:n.radius};case"linear":return{coords:n.coords};case"linear-system":return{coords:n.coords};case"point":return{coords:n.coords};case"polygon":return{coords:n.coords};case"quadratic":return{coords:n.coords};case"ray":return{coords:n.coords};case"segment":return{coords:n.coords};case"sinusoid":return{coords:n.coords};case"none":return{};default:throw new ve(r)}};function Ft(){return new gd}class gd{constructor(){c(this,"path",[]);c(this,"scaleFactor",1)}build(){return this.path.map(yd(this.scaleFactor)).map(hd).join("")}move(r,e){return this.path.push({action:"M",args:[r,e]}),this}line(r,e){return this.path.push({action:"L",args:[r,e]}),this}circularArc(r,e,t,{sweep:a=!1,largeArc:i=!1}={}){return this.path.push({action:"A",args:[r,r,0,i?1:0,a?1:0,e,t]}),this}curve(r,e,t,a,i,s){return this.path.push({action:"C",args:[r,e,t,a,i,s]}),this}scale(r){return this.scaleFactor*=r,this}}function hd(n){return`${n.action}${n.args.join(" ")}`}function yd(n){return r=>{switch(r.action){case"A":return{...r,args:[r.args[0]*n,r.args[1]*n,r.args[2],r.args[3],r.args[4],r.args[5]*n,r.args[6]*n]};default:return{...r,args:r.args.map(e=>e*n)}}}}function on(n,r,e){return n<r?r:n>e?e:n}function le(n,r){const[e,t]=r,[a,i]=n;return[Math.round(e/a)*a,Math.round(t/i)*i]}const q=0,R=1,re=0,ue=1;function ln([n,r]){return r-n}function Zr(n,r){if(n*2>ln(r)){const e=wd(...r);return[e,e]}return[r[re]+n,r[ue]-n]}function wd(n,r){return(n+r)/2}function wi(n,r){return[on(r[q],...n[q]),on(r[R],...n[R])]}function pr(n,r){return[Zr(n[q],r[q]),Zr(n[R],r[R])]}function fi({range:n,point:r}){return r[q]>=n[q][re]&&r[q]<=n[q][ue]&&r[R]>=n[R][re]&&r[R]<=n[R][ue]}function ea(n,r,e){return(r-n)*on(e,0,1)+n}const fd=([[n,r],[e,t]],[[a,i],[s,o]])=>{const u=(e-n)*(o-i)-(s-a)*(t-r);if(u===0)return!1;{const d=((o-i)*(s-n)+(a-s)*(o-r))/u,m=((r-t)*(s-n)+(e-n)*(o-r))/u;return 0<d&&d<1&&0<m&&m<1}};function je([[n,r],[e,t]],[[a,i],[s,o]]){const u=(e-n)*(o-i)-(s-a)*(t-r);if(u!==0){const d=((o-i)*(s-n)+(a-s)*(o-r))/u,m=((r-t)*(s-n)+(e-n)*(o-r))/u;if(d<=0||m>=1)return;const p=[n,r],h=x.sub([e,t],p);return x.add(p,x.scale(h,d))}}const bd={range:[[0,1],[0,1]],tickStep:[1,1],gridStep:[1,1],snapStep:[1,1],markings:"none",showTooltips:!1,graphDimensionsInPixels:[1,1],width:0,height:0,labels:[],labelLocation:"onAxis",disableKeyboardInteraction:!1,interactiveColor:"var(--mafs-blue)"},bi=v.createContext(bd);function $(){return Ma.useContext(bi)}const vi=x.matrixBuilder;function ki(n,r,e=[0,0]){const{range:t,width:a,height:i}=r,[[s,o],[u,d]]=t,m=vi().translate(...e).scale(a/(o-s),-i/(d-u)).get();return n.map(p=>x.transform(p,m))}function vd(n,r){const{range:e,width:t,height:a}=r,[[i,s],[o,u]]=e,d=vi().scale(t/(s-i),a/(u-o)).get();return n.map(m=>x.transform(m,d))}function kn(n,r){const[[e],[,t]]=r.range,[a,i]=[-e,-t];return ki([n],r,[a,i])[0]}const ee=(...n)=>{const r=$();return ki(n,r)},kd=(...n)=>{const r=$();return vd(n,r)};function xi(n,r){const[[e,t],[a,i]]=r.range,{width:s,height:o}=r,u=t-e,d=i-a;return n.map(m=>{const p=m[q]/s*u+e,h=i-m[R]/o*d;return[p,h]})}const xd=Ft().move(-3,4).curve(-2.75,2.5,0,.25,.75,0).curve(0,-.25,-2.75,-2.5,-3,-4).scale(1.4).build();function Me(n){const[r]=ee(n.tip);return l.jsx("g",{"aria-hidden":!0,className:"interactive-graph-arrowhead",transform:`translate(${r[q]} ${r[R]}) rotate(${n.angle})`,children:l.jsx("g",{transform:"translate(-1.5)",children:l.jsx("path",{d:xd,fill:"none",style:{stroke:n.color??"inherit"},strokeLinejoin:"round",strokeLinecap:"round",strokeWidth:"2px"})})})}Me.__docgenInfo={description:"",methods:[],displayName:"Arrowhead",props:{tip:{required:!0,tsType:{name:"vec.Vector2"},description:""},angle:{required:!0,tsType:{name:"number"},description:""},color:{required:!1,tsType:{name:"string"},description:""}}};function qi(){const{range:[[n,r],[e,t]]}=$(),a="var(--mafs-fg)";return l.jsxs(l.Fragment,{children:[!(e>0||t<0)&&l.jsxs(l.Fragment,{children:[l.jsx(Me,{color:a,tip:[n,0],angle:180}),l.jsx(Me,{color:a,tip:[r,0],angle:0})]}),!(n>0||r<0)&&l.jsxs(l.Fragment,{children:[l.jsx(Me,{color:a,tip:[0,e],angle:90}),l.jsx(Me,{color:a,tip:[0,t],angle:270})]})]})}qi.__docgenInfo={description:"",methods:[],displayName:"AxisArrows"};const cr=44,Pi="perseus_mafs_remove_button",Ge=(n,r,e,t)=>e.map(a=>a.map((i,s)=>{const o=n[s];if(t)return o[re]+ln(o)*i;const u=r[s],d=Math.floor(ln(o)/u),m=Math.round(i*d);return o[re]+u*m})),gr=(n,r)=>n.map(e=>e.map((t,a)=>(t+r[a][1])/ln(r[a])));function _e({snapStep:n,range:r,point:e}){const t=pr(n,r);return wi(t,e)}function me(n){return n.type==="point"&&n.numPoints==="unlimited"||n.type==="polygon"&&n.numSides==="unlimited"}const qd=_.parserFor({math:{...wo.math,order:0},text:{order:1,match:_.anyScopeRegex(/^([^$\\{}]+)/),parse:n=>({content:n[0]})},specialCharacter:{order:2,match:_.anyScopeRegex(/^(\\[\S\s]|\$|\\$|{|})/),parse:n=>({content:n[0]})}},{inline:!0});function Wt(n){const r=qd(n);let e="";for(const t of r)t.type==="math"?e+="$"+t.content+"$":t.type==="specialCharacter"?e+=Pd(t.content):e+=t.content;return`\\text{${e}}`}function Pd(n){return n.length===1?"\\"+n:n}const un=14;function Ai({i18n:n}){const{range:r,labels:e,width:t,height:a,labelLocation:i}=$(),s={range:r,width:t,height:a},[o,u]=Cd(s,i),[d,m]=e,{xLabelTransform:p,yLabelTransform:h}=Ad(i),{TeX:g}=Pe();return l.jsxs(l.Fragment,{children:[l.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:o[q],top:o[R],fontSize:un+"px",transform:p},children:l.jsx(g,{children:Wt(d)})}),l.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:u[q],top:u[R],fontSize:un+"px",transform:h},children:l.jsx(g,{children:Wt(m)})})]})}const Ad=n=>{const r=n===void 0||n==="onAxis";return{xLabelTransform:r?"translate(7px, -50%)":"translate(-50%, -50%)",yLabelTransform:r?"translate(-50%, 0px)":"translate(-50%, 0px) rotate(-90deg)"}},na=(n,r)=>{const e=Math.max(Math.min(n[q],r.width+un*1.25),-21),t=Math.max(Math.min(n[R],r.height+un*1.25),-14*2);return[e,t]},Cd=(n,r)=>{if(r==="alongEdge"){const o=n.range[R][re]>=0?[0,un*3]:[0,un],u=n.range[q][re]>=0?[-14*3,-14]:[-14,-14],d=[(n.range[q][re]+n.range[q][ue])/2,n.range[R][re]],m=[n.range[q][re],(n.range[R][re]+n.range[R][ue])/2],p=x.add(kn(d,n),o),h=x.add(kn(m,n),u);return[p,h]}const e=[n.range[q][ue],0],t=[0,n.range[R][ue]],a=[0,-14*2];let i=kn(e,n),s=x.add(kn(t,n),a);return i=na(i,n),s=na(s,n),[i,s]};Ai.__docgenInfo={description:"",methods:[],displayName:"AxisLabels",props:{i18n:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"questionSymbol",value:{name:"string",required:!0}},{key:"questionNumber",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"symbolQuestion",value:{name:"signature",type:"function",raw:"({sentenceSymbol}: {sentenceSymbol: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{sentenceSymbol: string}",signature:{properties:[{key:"sentenceSymbol",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"lineLabel",value:{name:"string",required:!0}},{key:"beginningPassage",value:{name:"string",required:!0}},{key:"beginningFootnotes",value:{name:"string",required:!0}},{key:"endPassage",value:{name:"string",required:!0}},{key:"questionMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"circleMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"sentenceMarker",value:{name:"signature",type:"function",raw:"({number}: {number: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{number: string}",signature:{properties:[{key:"number",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"dragHandles",value:{name:"string",required:!0}},{key:"tapAddPoints",value:{name:"string",required:!0}},{key:"false",value:{name:"string",required:!0}},{key:"true",value:{name:"string",required:!0}},{key:"no",value:{name:"string",required:!0}},{key:"yes",value:{name:"string",required:!0}},{key:"chooseCorrectNum",value:{name:"string",required:!0}},{key:"notNoneOfTheAbove",value:{name:"string",required:!0}},{key:"noneOfTheAbove",value:{name:"string",required:!0}},{key:"chooseNumAnswers",value:{name:"signature",type:"function",raw:"({numCorrect}: {numCorrect: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{numCorrect: string}",signature:{properties:[{key:"numCorrect",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"chooseAllAnswers",value:{name:"string",required:!0}},{key:"chooseOneAnswer",value:{name:"string",required:!0}},{key:"choiceCheckedCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCheckedIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOutIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceIncorrect",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceChecked",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choiceCrossedOut",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"choice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"crossOut",value:{name:"string",required:!0}},{key:"crossOutOption",value:{name:"string",required:!0}},{key:"crossOutChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"bringBack",value:{name:"string",required:!0}},{key:"openMenuForChoice",value:{name:"signature",type:"function",raw:"({letter}: {letter: string}) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{letter: string}",signature:{properties:[{key:"letter",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}},{key:"letters",value:{name:"string",required:!0}},{key:"rightArrow",value:{name:"string",required:!0}},{key:"dontUnderstandUnits",value:{name:"string",required:!0}},{key:"checkSigFigs",value:{name:"string",required:!0}},{key:"answerNumericallyIncorrect",value:{name:"string",required:!0}},{key:"checkUnits",value:{name:"string",required:!0}},{key:"dontUnderstand",value:{name:"string",required:!0}},{key:"loading",value:{name:"string",required:!0}},{key:"videoTranscript",value:{name:"string",required:!0}},{key:"somethingWrong",value:{name:"string",required:!0}},{key:"videoWrapper",value:{name:"string",required:!0}},{key:"mathInputTitle",value:{name:"string",required:!0}},{key:"mathInputDescription",value:{name:"string",required:!0}},{key:"sin",value:{name:"string",required:!0}},{key:"cos",value:{name:"string",required:!0}},{key:"tan",value:{name:"string",required:!0}},{key:"simulationLoadFail",value:{name:"string",required:!0}},{key:"simulationLocaleWarning",value:{name:"string",required:!0}},{key:"selectAnAnswer",value:{name:"string",required:!0}},{key:"srGraphInstructions",value:{name:"string",required:!0}},{key:"srUnlimitedGraphInstructions",value:{name:"string",required:!0}},{key:"addPoint",value:{name:"string",required:!0}},{key:"removePoint",value:{name:"string",required:!0}},{key:"graphKeyboardPrompt",value:{name:"string",required:!0}},{key:"closePolygon",value:{name:"string",required:!0}},{key:"openPolygon",value:{name:"string",required:!0}},{key:"srPointAtCoordinates",value:{name:"signature",type:"function",raw:`({
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
}`,signature:{properties:[{key:"point1X",value:{name:"string",required:!0}},{key:"point1Y",value:{name:"string",required:!0}},{key:"point2X",value:{name:"string",required:!0}},{key:"point2Y",value:{name:"string",required:!0}}]}},name:""}],return:{name:"string"}},required:!0}}]},required:!0}},{key:"locale",value:{name:"string",required:!0}}]}},description:""}}};const Zn=10,Pn=14,Td=({y:n,range:r,tickStep:e,showPi:t})=>{let a=0;r[q][re]>0&&(a=r[q][re]),r[q][ue]<0&&(a=r[q][ue]);const i=[a,n],[[s,o]]=ee(i),u=s-Zn/2,d=o,m=s+Zn/2,p=o,h=r[q][ue]<=0?Pn*1.5:-14*1.1,g=s+h,y=o+Pn*.25,f=Id(n,r,e),b=t?Ci(n):n.toString();return l.jsxs("g",{className:"tick","aria-hidden":!0,children:[l.jsx("line",{x1:u,y1:d,x2:m,y2:p,className:"axis-tick"}),f&&l.jsx("text",{className:"axis-tick-label",style:{fontSize:Pn},textAnchor:"end",x:g,y,children:b})]})},Rd=({x:n,range:r,showPi:e})=>{let t=0;r[R][re]>0&&(t=r[R][re]),r[R][ue]<0&&(t=r[R][ue]);const a=[n,t],[[i,s]]=ee(a),o=i,u=s+Zn/2,d=i,m=s-Zn/2,p=r[R][ue]<0?-14:Pn*1.75,h=n<0?-2:0,g=i+h,y=s+p,f=e?Ci(n):n.toString();return l.jsxs("g",{className:"tick","aria-hidden":!0,children:[l.jsx("line",{x1:o,y1:u,x2:d,y2:m,className:"axis-tick"}),l.jsx("text",{className:"axis-tick-label",style:{fontSize:Pn},textAnchor:"middle",x:g,y,children:f})]})},Id=(n,r,e)=>{let t=!0;return r[q][re]<-e&&r[q][ue]>0&&n===-e&&(t=!1),t};function ta(n,r,e){const t=[],a=Nd(n),i=Math.max(r,0);for(let o=i+n;o<e;o+=n)t.push(parseFloat(o.toFixed(a)));let s=Math.min(e,0)-n;for(s;s>r;s-=n)t.push(s);return t}const Nd=n=>{const r=n.toString();return r.includes(".")?r.split(".")[1].length:0};function Ci(n){const r=n/Math.PI;switch(r){case 1:return"π";case-1:return"-π";case 0:return"0";default:return r+"π"}}const Ti=()=>{const{tickStep:n,range:r}=$(),[[e,t],[a,i]]=r,[s,o]=n,u=ta(o,a,i),d=ta(s,e,t);return l.jsxs("g",{className:"axis-ticks",role:"presentation",children:[l.jsx("g",{className:"y-axis-ticks",children:u.map(m=>l.jsx(Td,{y:m,range:r,tickStep:n[R],showPi:n[R]%Math.PI===0},`y-grid-tick-${m}`))}),l.jsx("g",{className:"x-axis-ticks",children:d.map(m=>l.jsx(Rd,{x:m,range:r,showPi:n[q]%Math.PI===0},`x-grid-tick-${m}`))})]})};Ti.__docgenInfo={description:"",methods:[],displayName:"AxisTicks"};const ra=(n,r)=>{const e=n.markings==="axes"?!1:n.gridStep[r];return{axis:n.markings==="graph"||n.markings==="axes",lines:e,labels:!1}},Ri=n=>n.markings==="none"?null:l.jsx(el.Cartesian,{xAxis:ra(n,q),yAxis:ra(n,R)});Ri.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{gridStep:{required:!0,tsType:{name:"vec.Vector2"},description:""},range:{required:!0,tsType:{name:"tuple",raw:`[
    x: [min: number, max: number],
    y: [min: number, max: number],
]`,elements:[{name:"unknown"},{name:"unknown"}]},description:""},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},markings:{required:!0,tsType:{name:"union",raw:'"axes" | "graph" | "grid" | "none"',elements:[{name:"literal",value:'"axes"'},{name:"literal",value:'"graph"'},{name:"literal",value:'"grid"'},{name:"literal",value:'"none"'}]},description:""},width:{required:!0,tsType:{name:"number"},description:""},height:{required:!0,tsType:{name:"number"},description:""}}};const Ii=({box:n,backgroundImage:r})=>{const{url:e,width:t,height:a}=r??{};if(e&&typeof e=="string"){const i=n[q]/Ga.defaultBoxSize;return l.jsx(U,{style:{position:"absolute",bottom:0,left:0},children:l.jsx(rr.Consumer,{children:({setAssetStatus:s})=>l.jsx(jn,{src:e,width:t,height:a,scale:i,responsive:!1,setAssetStatus:s,alt:""})})})}return null};Ii.__docgenInfo={description:"If a graphie URL is provided in `backgroundImage`, will return the rendered graphie background.\nOtherwise, returns `null`.",methods:[],displayName:"LegacyGrid",props:{box:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},backgroundImage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"url",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}},{key:"width",value:{name:"number",required:!1}},{key:"height",value:{name:"number",required:!1}},{key:"top",value:{name:"number",required:!1}},{key:"left",value:{name:"number",required:!1}},{key:"scale",value:{name:"number",required:!1}},{key:"bottom",value:{name:"number",required:!1}}]}},description:""}}};function xn(n){const{coord:r,text:e,color:t,size:a}=n,[i,s]=kn(r,$()),{TeX:o}=Pe();return l.jsx("span",{className:"locked-label",style:{position:"absolute",left:i,top:s,color:te[t],fontSize:Lo.size[a],backgroundColor:"rgba(255, 255, 255, 0.8)"},"aria-hidden":!0,children:l.jsx(o,{children:Wt(e)})})}xn.__docgenInfo={description:"",methods:[],displayName:"LockedLabel",props:{type:{required:!0,tsType:{name:"literal",value:'"label"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},text:{required:!0,tsType:{name:"string"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},size:{required:!0,tsType:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}]},description:""}}};function Sd(n){const{lockedFigures:r}=n;return r.map((e,t)=>{var a,i,s;return e.type==="label"?l.jsx(xn,{...e},`label-${t}`):l.jsxs(v.Fragment,{children:[(a=e.labels)==null?void 0:a.map((o,u)=>l.jsx(xn,{...o},`${t}-label-${u}`)),e.type==="line"&&l.jsxs(l.Fragment,{children:[(i=e.points[0].labels)==null?void 0:i.map((o,u)=>l.jsx(xn,{...o},`locked-figure-${t}-point-1-label-${u}`)),(s=e.points[1].labels)==null?void 0:s.map((o,u)=>l.jsx(xn,{...o},`locked-figure-${t}-point-2-label-${u}`))]})]},t)})}const Ni=n=>{const{center:r,radius:e,angle:t,color:a,fillStyle:i,strokeStyle:s,ariaLabel:o}=n,u=!!o;return l.jsx("g",{className:"locked-ellipse","aria-label":u?o:void 0,"aria-hidden":!u,role:"img",children:l.jsx(nl,{center:r,radius:e,angle:t,fillOpacity:Na[i],strokeStyle:s,color:te[a],svgEllipseProps:{style:{fill:i==="white"?G.white:te[a]}}})})};Ni.__docgenInfo={description:"",methods:[],displayName:"LockedEllipse",props:{type:{required:!0,tsType:{name:"literal",value:'"ellipse"'},description:""},center:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},radius:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},angle:{required:!0,tsType:{name:"number"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};function aa(n,r){if(n[0]>n[1])return r;if(n[0]<r[0]&&n[1]<r[0]||n[0]>r[1]&&n[1]>r[1])return null;const e=Math.max(n[0],r[0]),t=Math.min(n[1],r[1]);return[e,t]}const Si=n=>{const{range:r}=$(),[e,t]=v.useState(),{color:a,strokeStyle:i,directionalAxis:s,domain:o}=n,u={color:te[a],style:i},d=!!n.ariaLabel;if(v.useEffect(()=>{t(ot(n.equation).expr)},[n.equation]),typeof e>"u")return null;const m=s==="x"?aa(o,r[0]):aa(o,r[1]);return m===null?null:l.jsxs("g",{className:"locked-function","aria-label":d?n.ariaLabel:void 0,"aria-hidden":!d,role:"img",children:[s==="x"&&l.jsx(Bn.OfX,{y:p=>e.eval({x:p}),domain:m,...u}),s==="y"&&l.jsx(Bn.OfY,{x:p=>e.eval({y:p}),domain:m,...u})]})};Si.__docgenInfo={description:"",methods:[],displayName:"LockedFunction",props:{type:{required:!0,tsType:{name:"literal",value:'"function"'},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},equation:{required:!0,tsType:{name:"string"},description:"This is the user-defined equation (as it was typed)"},directionalAxis:{required:!0,tsType:{name:"union",raw:'"x" | "y"',elements:[{name:"literal",value:'"x"'},{name:"literal",value:'"y"'}]},description:"The independent variable of this function"},domain:{required:!0,tsType:{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"The minimum and maximum values along the `directionalAxis` at which\nthis function should be graphed. Values of -Infinity and Infinity are\nallowed. Note that infinite values are serialized as `null` in JSON."},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};function Ue(n){const{start:r,end:e,style:t,className:a,testId:i}=n;return l.jsx("line",{"aria-hidden":!0,x1:r[q],y1:r[R],x2:e[q],y2:e[R],style:t,className:a,"data-testid":i})}Ue.__docgenInfo={description:"",methods:[],displayName:"SVGLine",props:{start:{required:!0,tsType:{name:"vec.Vector2"},description:""},end:{required:!0,tsType:{name:"vec.Vector2"},description:""},style:{required:!1,tsType:{name:'SVGProps["style"]',raw:'SVGProps<SVGLineElement>["style"]'},description:""},className:{required:!1,tsType:{name:"string"},description:""},testId:{required:!1,tsType:{name:"string"},description:""}}};const{calculateAngleInDegrees:Od}=We;function dn(n){const{interactiveColor:r}=$(),{tail:e,tip:t,color:a=r,style:i,testId:s}=n,[o,u]=ee(e,t),d=x.sub(u,o),m=Od(d);return l.jsxs("g",{style:{stroke:a,strokeWidth:2},"data-testid":s,children:[l.jsx(Ue,{start:o,end:u,style:i}),l.jsx(Me,{angle:m,tip:t,color:a})]})}dn.__docgenInfo={description:"",methods:[],displayName:"Vector",props:{tail:{required:!0,tsType:{name:"vec.Vector2"},description:""},tip:{required:!0,tsType:{name:"vec.Vector2"},description:""},color:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:'ReactSVGProps["style"]',raw:'React.SVGProps<SVGLineElement>["style"]'},description:""},testId:{required:!1,tsType:{name:"string"},description:""}}};function k(n,r,e){const t=jd(n);return t||(0+n).toLocaleString(r,{maximumFractionDigits:e??3,useGrouping:!1})}function jd(n){if(Number.isInteger(n)||n===0||n>1e12)return null;const r=n/Math.PI,e=parseFloat(r.toFixed(12));if(Number.isInteger(e))return e===1?"π":e===-1?"-π":e+"π";const t=[2,3,4,6];for(const a of t){const i=parseFloat((r*a).toFixed(12));if(Number.isInteger(i))return i===1?"π/"+a:i===-1?"-π/"+a:i+"π/"+a}return null}const ze=(n,r,e)=>{const[[t,a],[i,s]]=e,[o,u]=n,[d,m]=r,p=m-u,h=d-o,g=p/h,y=1/g,f=h<0?t:a,b=p<0?i:s,A=u+(f-o)*g,P=o+(b-u)*y;switch(!0){case ia(A,i,s):return[f,A];case ia(P,t,a):return[P,b];default:return[f,b]}};function ia(n,r,e){return n>=r&&n<=e}function hr(n){const r=[];for(const e of n)r.some(([t,a])=>t===e[0]&&a===e[1])||r.push(e);return r}function Oi(n,r){const e=(n[1][1]-n[0][1])/(n[1][0]-n[0][0]);return Number.isFinite(e)?e===0?r.srLinearGraphSlopeHorizontal:e>0?r.srLinearGraphSlopeIncreasing:r.srLinearGraphSlopeDecreasing:r.srLinearGraphSlopeVertical}function ji(n,r,e){const t=(n[1][1]-n[0][1])/(n[1][0]-n[0][0]),a=(0-n[0][1])/t+n[0][0],i=n[0][1]-t*n[0][0],s=n[0][1]===0&&n[1][1]===0,o=n[0][0]===0&&n[1][0]===0,u=Number.isFinite(a)&&!s,d=Number.isFinite(i)&&!o;return u&&d?a===0&&i===0?r.srLinearGraphOriginIntercept:r.srLinearGraphBothIntercepts({xIntercept:k(a,e),yIntercept:k(i,e)}):u?r.srLinearGraphXOnlyIntercept({xIntercept:k(a,e)}):r.srLinearGraphYOnlyIntercept({yIntercept:k(i,e)})}function Ei(n){const[r,e]=n,t=Number(r.toFixed(3)),a=Number(e.toFixed(3));return t===0&&a===0?"origin":a===0?"x-axis":t===0?"y-axis":t>0&&a>0?1:t<0&&a>0?2:t<0&&a<0?3:4}function Ed(n,r){const e=Ei(n);switch(e){case"origin":return r.srQuadraticGraphVertexOrigin;case"x-axis":return r.srQuadraticGraphVertexXAxis;case"y-axis":return r.srQuadraticGraphVertexYAxis;default:return r.srQuadraticGraphVertexQuadrant({quadrant:e})}}function Md(n,r,e,t){const a=Ei(r),[i,s]=r;switch(a){case"origin":return e.srQuadraticPointOrigin({pointNumber:n});case"x-axis":case"y-axis":return e.srQuadraticPointAxis({pointNumber:n,x:k(i,t),y:k(s,t)});default:return e.srQuadraticPointQuadrant({pointNumber:n,quadrant:a,x:k(i,t),y:k(s,t)})}}function Ld(n,r,e){if(n===0)return r===0?[]:[-e/r];const t=r*r-4*n*e;if(t<0)return[];const a=(-r+Math.sqrt(t))/(2*n),i=(-r-Math.sqrt(t))/(2*n);return a===i?[a]:[a,i]}function Mi(n,r){if(r<0||r>=n.length||!Number.isInteger(r)||n.length<3)return null;const e=n.at(r),t=n.at(r-1),a=n[(r+1)%n.length];if(!e||!t||!a)return null;const i=x.dist(e,t),s=x.dist(e,a),o=x.dist(t,a);let u=(i**2+s**2-o**2)/(2*i*s);return(u<-1||u>1)&&(u=Math.round(u)),Math.acos(u)}function Li(n,r,e){if(r<0||r>=n.length||!Number.isInteger(r))return[];if(n.length<2)return[];const t=[],a=n[r],i=r===0?n.length-1:r-1,s=n[i],o=r!==i?x.dist(a,s):null;o&&!(e&&r===0)&&t.push({pointIndex:i,sideLength:o});const u=(r+1)%n.length,d=n[u],m=r!==u&&u!==i?x.dist(a,d):null;return m&&!(e&&r===n.length-1)&&t.push({pointIndex:u,sideLength:m}),t}function Gt(n,r,e,t){return Number.isInteger(n)?e.srPolygonSideLength({pointNum:r+1,length:`${n}`}):e.srPolygonSideLengthApprox({pointNum:r+1,length:k(n,t,1)})}const{calculateAngleInDegrees:Dd}=We,Di=n=>{const{color:r,lineStyle:e,kind:t,points:a,showPoint1:i,showPoint2:s,ariaLabel:o,range:u}=n,[d,m]=a,p=!!o;let h;if(t==="ray"){const g=ze(d.coord,m.coord,u);h=l.jsx(dn,{tail:d.coord,tip:g,color:te[r],style:{strokeDasharray:e==="dashed"?"var(--mafs-line-stroke-dash-style)":void 0}})}else{const g=t==="segment"?Or.Segment:Or.ThroughPoints;let y=t==="segment"?m.coord:ze(d.coord,m.coord,u);const[f,b]=ee(m.coord,d.coord),A=x.sub(f,b);let P=Dd(A);const T=t!=="segment"&&l.jsx(Me,{angle:P,tip:y,color:te[r]});y=t==="segment"?d.coord:ze(m.coord,d.coord,u),P=P>180?P-180:P+180;const C=t!=="segment"&&l.jsx(Me,{angle:P,tip:y,color:te[r]});h=l.jsxs(l.Fragment,{children:[T,l.jsx(g,{point1:d.coord,point2:m.coord,color:te[r],style:e}),C]})}return l.jsxs("g",{className:t==="ray"?"locked-ray":"locked-line","aria-label":p?o:void 0,"aria-hidden":!p,role:"img",children:[h,i&&l.jsx(Kn,{x:d.coord[q],y:d.coord[R],svgCircleProps:{style:{fill:d.filled?te[d.color]:G.white,stroke:te[d.color],strokeWidth:ge.xxxxSmall_2}}}),s&&l.jsx(Kn,{x:m.coord[q],y:m.coord[R],svgCircleProps:{style:{fill:m.filled?te[m.color]:G.white,stroke:te[m.color],strokeWidth:ge.xxxxSmall_2}}})]})};Di.__docgenInfo={description:"",methods:[],displayName:"LockedLine",props:{type:{required:!0,tsType:{name:"literal",value:'"line"'},description:""},kind:{required:!0,tsType:{name:"union",raw:'"line" | "ray" | "segment"',elements:[{name:"literal",value:'"line"'},{name:"literal",value:'"ray"'},{name:"literal",value:'"segment"'}]},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[point1: LockedPointType, point2: LockedPointType]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},lineStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},showPoint1:{required:!0,tsType:{name:"boolean"},description:""},showPoint2:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"Interval"},{name:"Interval"}]},description:""}}};const Fi=n=>{const{color:r,coord:e,filled:t,ariaLabel:a}=n,[i,s]=e,o=!!a;return l.jsx("g",{className:"locked-point","aria-label":o?a:void 0,"aria-hidden":!o,role:"img",children:l.jsx(Kn,{x:i,y:s,svgCircleProps:{style:{fill:t?te[r]:G.white,stroke:te[r],strokeWidth:ge.xxxxSmall_2}}})})};Fi.__docgenInfo={description:"",methods:[],displayName:"LockedPoint",props:{type:{required:!0,tsType:{name:"literal",value:'"point"'},description:""},coord:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},filled:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const Wi=n=>{const{points:r,color:e,showVertices:t,fillStyle:a,strokeStyle:i}=n,s=!!n.ariaLabel;return l.jsxs("g",{className:"locked-polygon","aria-label":s?n.ariaLabel:void 0,"aria-hidden":!s,role:"img",children:[l.jsx(At,{points:[...r],fillOpacity:Na[a],strokeStyle:i,color:te[e],svgPolygonProps:{style:{fill:a==="white"?G.white:te[e]}}}),t&&r.map((o,u)=>l.jsx(Kn,{x:o[q],y:o[R],color:te[e]},`locked-polygon-point-${u}`))]})};Wi.__docgenInfo={description:"",methods:[],displayName:"LockedPolygon",props:{type:{required:!0,tsType:{name:"literal",value:'"polygon"'},description:""},points:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]}],raw:"ReadonlyArray<Coord>"},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},showVertices:{required:!0,tsType:{name:"boolean"},description:""},fillStyle:{required:!0,tsType:{name:"union",raw:'"none" | "white" | "translucent" | "solid"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"white"'},{name:"literal",value:'"translucent"'},{name:"literal",value:'"solid"'}]},description:""},strokeStyle:{required:!0,tsType:{name:"union",raw:'"solid" | "dashed"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"dashed"'}]},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const Gi=n=>{const{color:r,points:e,ariaLabel:t}=n,[a,i]=e,s=!!t;return l.jsx("g",{className:"locked-vector","aria-label":s?t:void 0,"aria-hidden":!s,role:"img",children:l.jsx(dn,{tail:a,tip:i,color:te[r]})})};Gi.__docgenInfo={description:"",methods:[],displayName:"LockedVector",props:{type:{required:!0,tsType:{name:"literal",value:'"vector"'},description:""},points:{required:!0,tsType:{name:"tuple",raw:"[tail: Coord, tip: Coord]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},color:{required:!0,tsType:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type: "label";
    coord: Coord;
    // TeX-supported string
    text: string;
    color: LockedFigureColor;
    size: "small" | "medium" | "large";
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}],raw:"LockedLabelType[]"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""}}};const _i=n=>{const{lockedFigures:r}=n;return l.jsx(l.Fragment,{children:r.map((e,t)=>{switch(e.type){case"point":return l.jsx(Fi,{...e},`point-${t}`);case"line":return l.jsx(Di,{range:n.range,...e},`line-${t}`);case"vector":return l.jsx(Gi,{...e},`vector-${t}`);case"ellipse":return l.jsx(Ni,{...e},`ellipse-${t}`);case"polygon":return l.jsx(Wi,{...e},`polygon-${t}`);case"function":return l.jsx(Si,{...e},`function-${t}`);case"label":return null;default:throw new ve(e)}})})};_i.__docgenInfo={description:"",methods:[],displayName:"GraphLockedLayer",props:{lockedFigures:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:`| LockedPointType
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
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"label"',required:!0}},{key:"coord",value:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}],required:!0}},{key:"text",value:{name:"string",required:!0}},{key:"color",value:{name:"unknown[number]",raw:"(typeof lockedFigureColorNames)[number]",required:!0}},{key:"size",value:{name:"union",raw:'"small" | "medium" | "large"',elements:[{name:"literal",value:'"small"'},{name:"literal",value:'"medium"'},{name:"literal",value:'"large"'}],required:!0}}]}}]}],raw:"ReadonlyArray<LockedFigure>"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[x: Interval, y: Interval]",elements:[{name:"unknown"},{name:"unknown"}]},description:""}}};const M={global:{deleteIntent:Fd,changeInteractionMode:Wd,changeKeyboardInvitationVisibility:Gd},angle:{movePoint:fn},circle:{moveCenter:Ud,moveRadiusPoint:$d},linear:{moveLine:n=>Fn(0,n),movePoint:(n,r)=>Wn(0,n,r)},linearSystem:{moveLine:Fn,movePointInFigure:Wn},pointGraph:{movePoint:fn,addPoint:sa,removePoint:oa,focusPoint:la,blurPoint:ua,clickPoint:da},polygon:{movePoint:fn,moveAll:Hd,addPoint:sa,removePoint:oa,focusPoint:la,blurPoint:ua,clickPoint:da,closePolygon:_d,openPolygon:Vd},quadratic:{movePoint:fn},ray:{moveRay:n=>Fn(0,n),movePoint:(n,r)=>Wn(0,n,r)},segment:{movePointInFigure:Wn,moveLine:Fn},sinusoid:{movePoint:fn}},Vi="delete-intent";function Fd(){return{type:Vi}}const Hi="move-line";function Fn(n,r){return{type:Hi,itemIndex:n,delta:r}}const Ui="add-point";function sa(n){return{type:Ui,location:n}}const $i="remove-point";function oa(n){return{type:$i,index:n}}const Xi="focus-point";function la(n){return{type:Xi,index:n}}const Yi="blur-point";function ua(){return{type:Yi}}const zi="click-point";function da(n){return{type:zi,index:n}}const Bi="point-change-interaction-mode";function Wd(n){return{type:Bi,mode:n}}const Ki="change-keyboard-interaction-invitation-visibility";function Gd(n){return{type:Ki,shouldShow:n}}const Ji="close-polygon";function _d(){return{type:Ji}}const Qi="open-polygon";function Vd(){return{type:Qi}}const Zi="move-all";function Hd(n){return{type:Zi,delta:n}}const es="move-point";function fn(n,r){return{type:es,index:n,destination:r}}const ns="move-point-in-figure";function Wn(n,r,e){return{type:ns,figureIndex:n,pointIndex:r,destination:e}}const ts="move-center";function Ud(n){return{type:ts,destination:n}}const rs="MOVE_RADIUS_POINT";function $d(n){return{type:rs,destination:n}}const as="change-snap-step";function Xd(n){return{type:as,snapStep:n}}const is="change-range";function Yd(n){return{type:is,range:n}}const ss="reinitialize";function zd(n){return{type:ss,params:n}}const yr=({children:n})=>l.jsx("g",{style:{transform:"var(--mafs-view-transform) var(--mafs-user-transform)"},children:n});yr.__docgenInfo={description:"Wrapper with Mafs transform styles for SVG elements.\nScales and translates the SVG element to match the Mafs view.\nUse if you do not need/want to use the hook in `use-transform.ts`.",methods:[],displayName:"MafsCssTransformWrapper"};const pt=({children:n,...r})=>l.jsx(tl,{size:16,svgTextProps:{filter:"url(#background)",fontWeight:"bold"},...r,children:n}),os=()=>l.jsx("defs",{children:l.jsxs("filter",{id:"background",x:"-5%",width:"110%",y:"0%",height:"100%",children:[l.jsx("feFlood",{floodColor:"#FFF",floodOpacity:"0.64"}),l.jsx("feComposite",{operator:"over",in:"SourceGraphic"})]})});pt.__docgenInfo={description:"",methods:[],displayName:"TextLabel"};os.__docgenInfo={description:"",methods:[],displayName:"SvgDefs"};const{clockwise:ls}=ut,{getAngleFromVertex:ma}=We,us=({centerPoint:n,endPoints:r,range:e,polygonLines:t,showAngles:a,snapTo:i})=>{const[s,o]=n,u=ls([n,...r]),[[d,m],[p,h]]=u?r:r.reverse(),g=.3,y=x.dist(n,r[0]),f=x.dist(n,r[1]),b=x.dist(r[0],r[1]);let A=(y**2+f**2-b**2)/(2*y*f);(A<-1||A>1)&&(A=Math.round(A));const P=Math.acos(A),T=o+(m-o)/y*g,C=s+(p-s)/f*g,O=s+(d-s)/y*g,S=o+(h-o)/f*g,[E,N]=x.add(n,x.add(x.sub([O,T],n),x.sub([C,S],n)));if(!a)return pa(P)?l.jsx(_t,{start:[O,T],vertex:[C,S],end:[E,N]}):null;const j=ps([E,N],n,e,t),K=`M ${O} ${T} A ${g} ${g} 0 ${j?1:0} ${j?1:0} ${C} ${S}`;let z=P*(180/Math.PI);j&&(z=360-z);const ce=parseFloat(z.toFixed(i==="angles"?0:1)),se=Number.isInteger(ce)?ce:"≈ "+ce;return l.jsxs(l.Fragment,{children:[l.jsx("defs",{children:l.jsxs("filter",{id:"background",x:"-5%",width:"110%",y:"0%",height:"100%",children:[l.jsx("feFlood",{floodColor:"#FFF",floodOpacity:"0.5"}),l.jsx("feComposite",{operator:"over",in:"SourceGraphic"})]})}),!j&&pa(P)?l.jsx(_t,{start:[O,T],vertex:[C,S],end:[E,N]}):l.jsx(ms,{arc:K}),l.jsxs(pt,{x:E,y:N,attach:N-o>0?"s":"n",attachDistance:Math.abs(N-o)<.2||x.dist([E,N],n)<.3?20:10,children:[se,"°"]})]})},ds=({vertex:n,coords:r,showAngles:e,allowReflexAngles:t,range:a})=>{const o=ls([...r,n])&&!t?r:r.reverse(),u=ma(o[0],n),d=ma(o[1],n),m=(u+360-d)%360,p=m>180,[h,g]=n,[y,f]=o,[b,A]=y,[P,T]=f,C=x.dist(n,y),O=x.dist(n,f),S=2,E=g+(A-g)/C*S,N=h+(P-h)/O*S,j=h+(b-h)/C*S,L=g+(T-g)/O*S,[Q,K]=x.add(n,x.add(x.sub([j,E],n),x.sub([N,L],n))),z=ps([Q,K],n,a,[[n,y],[n,f]]),X=`M ${j} ${E} A ${S} ${S} 0 ${z||p?1:0} ${z&&p?1:0} ${N} ${L}`,B=parseFloat(m.toFixed(0)),[he,Ae]=Jd(y,f,n,p,t,S),{disableKeyboardInteraction:Se}=$(),Ce=Se?"angle-arc-static":"angle-arc-interactive";return l.jsxs(l.Fragment,{children:[l.jsx("defs",{children:l.jsxs("filter",{id:"background",x:"-5%",width:"110%",y:"0%",height:"100%",children:[l.jsx("feFlood",{floodColor:"#FFF",floodOpacity:"0.5"}),l.jsx("feComposite",{operator:"over",in:"SourceGraphic"})]})}),Bd(m)?l.jsx(_t,{start:[j,E],vertex:[N,L],end:[Q,K],className:Ce}):l.jsx(ms,{arc:X,className:Ce}),e&&l.jsxs(pt,{x:he,y:Ae,color:G.blue,children:[B,"°"]})]})},_t=({start:[n,r],vertex:[e,t],end:[a,i],className:s})=>l.jsx(yr,{children:l.jsx("path",{"aria-hidden":!0,d:`M ${n} ${r} L ${a} ${i} M ${a} ${i} L ${e} ${t}`,strokeWidth:.02,fill:"none",className:s,"data-testid":"angle-indicators__right-angle"})}),ms=({arc:n,className:r})=>l.jsx(yr,{children:l.jsx("path",{"aria-hidden":!0,d:n,strokeWidth:.02,fill:"none",className:r,"data-testid":"angle-indicators__arc"})}),pa=n=>Math.abs(n-Math.PI/2)<.01,Bd=n=>Math.round(n)===90,ps=(n,r,e,t)=>{const a=ze(n,r,e);let i=0;return t.forEach(s=>fd([r,a],s)&&i++),!Kd(i)},Kd=n=>n%2===0;function Jd(n,r,e,t,a,i){const[s,o]=e,[u,d]=n,[m,p]=r,h=[u-s,d-o],g=[m-s,p-o],y=Math.atan2(h[1],h[0]),f=Math.atan2(g[1],g[0]);let b=(y+f)/2;const A=Math.abs(y-f);a?(A<=Math.PI&&t||f>y)&&(b+=Math.PI):A>Math.PI&&(b-=Math.PI);const P=[Math.cos(b),Math.sin(b)],T=Math.sqrt(P[0]**2+P[1]**2),C=[P[0]/T,P[1]/T],O=Math.sqrt(C[0]**2+C[1]**2),S=i*1.75;let E=S/O;O>=S&&(E=1);const N=[C[0]*E,C[1]*E];return x.add(N,e)}us.__docgenInfo={description:"",methods:[],displayName:"PolygonAngle",props:{centerPoint:{required:!0,tsType:{name:"vec.Vector2"},description:""},endPoints:{required:!0,tsType:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}]},description:""},polygonLines:{required:!0,tsType:{name:"unknown"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"Interval"},{name:"Interval"}]},description:""},showAngles:{required:!0,tsType:{name:"boolean"},description:""},snapTo:{required:!0,tsType:{name:"union",raw:'"grid" | "angles" | "sides"',elements:[{name:"literal",value:'"grid"'},{name:"literal",value:'"angles"'},{name:"literal",value:'"sides"'}]},description:""}}};ds.__docgenInfo={description:"",methods:[],displayName:"Angle",props:{vertex:{required:!0,tsType:{name:"vec.Vector2"},description:""},coords:{required:!0,tsType:{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}]},description:""},showAngles:{required:!0,tsType:{name:"boolean"},description:""},allowReflexAngles:{required:!0,tsType:{name:"boolean"},description:""},snapDegrees:{required:!0,tsType:{name:"number"},description:""},range:{required:!0,tsType:{name:"tuple",raw:"[Interval, Interval]",elements:[{name:"Interval"},{name:"Interval"}]},description:""}}};function mn(n){const{gestureTarget:r,onMove:e,point:t,constrainKeyboardMovement:a}=n,[i,s]=v.useState(!1),{xSpan:o,ySpan:u}=em(),{viewTransform:d,userTransform:m}=rl(),p=x.matrixInvert(d);oe(p);const h=v.useMemo(()=>Zd(m),[m]),g=v.useRef([0,0]);return _a(y=>{const{type:f,event:b}=y;if(b==null||b.stopPropagation(),f.includes("key")){if(oe(b instanceof KeyboardEvent),b==null||b.preventDefault(),f==="keyup")return;if(typeof a=="object"){const K=a[Qd[b.key]];e(K??t);return}const{direction:P,altKey:T,ctrlKey:C,metaKey:O,shiftKey:S}=y,E=[P[q],-P[R]],N=Math.abs(E[q])?o:u;let j=50;(T||O)&&(j=200),S&&!C&&(j=10);const L=N/(j*2),Q=nm(N/j,N/2,N/j);for(const K of Q){const z=x.scale(E,K),ce=a(x.transform(x.add(x.transform(t,m),z),h));if(x.dist(ce,t)>L){e(ce);break}}}else{const{last:P,movement:T,first:C}=y;if(s(!P),C&&(g.current=x.transform(t,m)),x.mag(T)===0)return;const O=x.transform(T,p);e(x.transform(x.add(g.current,O),h))}},{target:r,eventOptions:{passive:!1}}),{dragging:i}}const Qd={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};function Zd(n){const r=x.matrixInvert(n);return oe(r!==null),r}function em(){const{range:[[n,r],[e,t]]}=$(),a=r-n,i=t-e;return{xSpan:a,ySpan:i}}function nm(n,r,e=1){const t=[];for(let i=n;i<r-e/2;i+=e)t.push(i);const a=t[t.length-1]+e;return Math.abs(r-a)<e/1e-6?t.push(r):t.push(a),t}function wr(n){const{point:r}=n,{range:e}=$(),[[t,a],[i,s]]=e,[[o,u]]=ee(r),[[d]]=ee([t,0]),[[m]]=ee([a,0]),[[p,h]]=ee([0,i]),[[g,y]]=ee([0,s]);return l.jsxs("g",{"aria-hidden":!0,children:[l.jsx("line",{x1:d,y1:u,x2:m,y2:u,stroke:G.blue}),l.jsx("line",{x1:o,y1:h,x2:o,y2:y,stroke:G.blue})]})}wr.__docgenInfo={description:"",methods:[],displayName:"Hairlines",props:{point:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""}}};const tm=48,cs=v.forwardRef((n,r)=>{const{markings:e,showTooltips:t,interactiveColor:a,disableKeyboardInteraction:i}=$(),{point:s,dragging:o,focused:u,cursor:d,showFocusRing:m,onClick:p=()=>{}}=n,h=i?"fadedOffBlack64":"blue",g=rm("movable-point",o&&"movable-point--dragging",m&&"movable-point--focus"),[[y,f]]=ee(s),b=(o||u)&&e!=="none",A=l.jsxs("g",{"aria-hidden":!0,ref:r,className:g,style:{"--movable-point-color":a,cursor:d},"data-testid":"movable-point",onClick:p,children:[l.jsx("circle",{className:"movable-point-hitbox",r:tm/2,cx:y,cy:f}),l.jsx("circle",{className:"movable-point-halo",cx:y,cy:f}),l.jsx("circle",{className:"movable-point-ring",cx:y,cy:f}),l.jsx("circle",{className:"movable-point-focus-outline",cx:y,cy:f}),l.jsx("circle",{className:"movable-point-center",cx:y,cy:f,style:{fill:a},"data-testid":"movable-point__center"})]});return l.jsxs(l.Fragment,{children:[b&&l.jsx(wr,{point:s}),t?l.jsx(Zt,{autoUpdate:!0,backgroundColor:h,content:`(${s[q]}, ${s[R]})`,contentStyle:{color:"white"},children:A}):A]})});function rm(...n){return n.filter(Boolean).join(" ")}cs.__docgenInfo={description:"",methods:[],displayName:"MovablePointView",props:{point:{required:!0,tsType:{name:"vec.Vector2"},description:""},dragging:{required:!0,tsType:{name:"boolean"},description:""},focused:{required:!0,tsType:{name:"boolean"},description:""},showFocusRing:{required:!0,tsType:{name:"boolean"},description:""},cursor:{required:!1,tsType:{name:"union",raw:"CSSCursor | undefined",elements:[{name:"union",raw:'"move" | "ew-resize"',elements:[{name:"literal",value:'"move"'},{name:"literal",value:'"ew-resize"'}]},{name:"undefined"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""}}};function Vt(n){const{snapStep:r,disableKeyboardInteraction:e}=$(),{point:t,ariaDescribedBy:a,ariaLabel:i,ariaLive:s="polite",constrain:o=j=>le(r,j),cursor:u,forwardedRef:d=bn,sequenceNumber:m=1,onMove:p=bn,onClick:h=bn,onFocus:g=bn,onBlur:y=bn}=n,{strings:f,locale:b}=pe(),[A,P]=v.useState(!1),T=v.useRef(null);mn({gestureTarget:T,point:t,onMove:p,constrainKeyboardMovement:o});const C=v.useRef(null),{dragging:O}=mn({gestureTarget:C,point:t,onMove:p,constrainKeyboardMovement:o}),S=i||f.srPointAtCoordinates({num:m,x:k(t[q],b),y:k(t[R],b)});return v.useLayoutEffect(()=>{am(d,T.current)},[d]),v.useLayoutEffect(()=>{var j;O&&!A&&((j=T.current)==null||j.focus())},[O,A]),{focusableHandle:l.jsx("g",{"data-testid":"movable-point__focusable-handle",className:"movable-point__focusable-handle",tabIndex:e?-1:0,ref:T,role:"button","aria-describedby":a,"aria-label":S,"aria-live":s,"aria-disabled":e,onFocus:j=>{g(j),P(!0)},onBlur:j=>{y(j),P(!1)}}),visiblePoint:l.jsx(cs,{cursor:u,onClick:()=>{var j;h(),(j=T.current)==null||j.focus()},point:t,dragging:O,focused:A,ref:C,showFocusRing:A}),focusableHandleRef:T,visiblePointRef:C}}function am(n,r){typeof n=="function"?n(r):n!==null&&(n.current=r)}const bn=()=>{},En=n=>{const{points:[r,e],ariaLabels:t,ariaDescribedBy:a,extend:i,onMoveLine:s=()=>{},onMovePoint:o=()=>{}}=n,{snapStep:u}=$(),[d,m]=v.useState(["off","off","off"]),{visiblePoint:p,focusableHandle:h}=Vt({ariaLabel:t==null?void 0:t.point1AriaLabel,ariaDescribedBy:a,ariaLive:d[0],point:r,sequenceNumber:1,onMove:b=>{m(["polite","off","off"]),o(0,b)},constrain:ca([r,e],u,0)}),{visiblePoint:g,focusableHandle:y}=Vt({ariaLabel:t==null?void 0:t.point2AriaLabel,ariaDescribedBy:a,ariaLive:d[1],point:e,sequenceNumber:2,onMove:b=>{m(["off","polite","off"]),o(1,b)},constrain:ca([r,e],u,1)}),f=l.jsx(im,{ariaLabel:t==null?void 0:t.grabHandleAriaLabel,ariaDescribedBy:a,ariaLive:d[2],start:r,end:e,extend:i,onMove:b=>{m(["off","off","polite"]),s(b)}});return l.jsxs(l.Fragment,{children:[h,f,y,p,g]})},im=n=>{const{start:r,end:e,ariaLabel:t,ariaDescribedBy:a,ariaLive:i,extend:s,onMove:o}=n,[u,d]=ee(r,e),{range:m,graphDimensionsInPixels:p,snapStep:h,disableKeyboardInteraction:g,interactiveColor:y}=$();let f,b;if(s){const T=gs(m,p);f=s.start?ze(e,r,T):void 0,b=s.end?ze(r,e,T):void 0}const A=v.useRef(null),{dragging:P}=mn({gestureTarget:A,point:r,onMove:T=>{o(x.sub(T,r))},constrainKeyboardMovement:T=>le(h,T)});return l.jsxs(l.Fragment,{children:[l.jsxs("g",{ref:A,tabIndex:g?-1:0,"aria-label":t,"aria-describedby":a,"aria-live":i,"aria-disabled":g,className:"movable-line","data-testid":"movable-line",style:{cursor:P?"grabbing":"grab"},role:"button",children:[l.jsx(Ue,{start:u,end:d,style:{stroke:"transparent",strokeWidth:cr}}),l.jsx(Ue,{start:u,end:d,className:"movable-line-focus-outline",style:{}}),l.jsx(Ue,{start:u,end:d,className:"movable-line-focus-outline-gap",style:{}}),l.jsx(Ue,{start:u,end:d,style:{stroke:y,strokeWidth:"var(--movable-line-stroke-weight)"},className:P?"movable-dragging":"",testId:"movable-line__line"})]}),f&&l.jsx(dn,{tail:r,tip:f,testId:"movable-line__vector"}),b&&l.jsx(dn,{tail:e,tip:b,testId:"movable-line__vector"})]})},ca=(n,r,e)=>{const t=n[e],a=n[1-e],i=s=>{let o=s(t);return x.dist(o,a)===0&&(o=s(o)),o};return{up:i(s=>x.add(s,[0,r[1]])),down:i(s=>x.sub(s,[0,r[1]])),left:i(s=>x.sub(s,[r[0],0])),right:i(s=>x.add(s,[r[0],0]))}};function gs(n,r){const[t,a]=n,[i,s]=r,o=ln(t)/i,u=ln(a)/s,d=4*o,m=4*u;return pr([d,m],n)}En.__docgenInfo={description:"",methods:[],displayName:"MovableLine",props:{points:{required:!0,tsType:{name:"Readonly",elements:[{name:"tuple",raw:"[vec.Vector2, vec.Vector2]",elements:[{name:"vec.Vector2"},{name:"vec.Vector2"}]}],raw:"Readonly<[vec.Vector2, vec.Vector2]>"},description:""},ariaLabels:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    point1AriaLabel?: string;
    point2AriaLabel?: string;
    grabHandleAriaLabel?: string;
}`,signature:{properties:[{key:"point1AriaLabel",value:{name:"string",required:!1}},{key:"point2AriaLabel",value:{name:"string",required:!1}},{key:"grabHandleAriaLabel",value:{name:"string",required:!1}}]}},description:""},ariaDescribedBy:{required:!1,tsType:{name:"string"},description:""},extend:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    start: boolean;
    end: boolean;
}`,signature:{properties:[{key:"start",value:{name:"boolean",required:!0}},{key:"end",value:{name:"boolean",required:!0}}]}},description:""},onMovePoint:{required:!1,tsType:{name:"signature",type:"function",raw:"(endpointIndex: number, destination: vec.Vector2) => unknown",signature:{arguments:[{type:{name:"number"},name:"endpointIndex"},{type:{name:"vec.Vector2"},name:"destination"}],return:{name:"unknown"}}},description:""},onMoveLine:{required:!1,tsType:{name:"signature",type:"function",raw:"(delta: vec.Vector2) => unknown",signature:{arguments:[{type:{name:"vec.Vector2"},name:"delta"}],return:{name:"unknown"}}},description:""}}};const be=v.forwardRef((n,r)=>{const{visiblePoint:e,focusableHandle:t}=Vt({...n,forwardedRef:r});return l.jsxs(l.Fragment,{children:[t,e]})});be.__docgenInfo={description:"",methods:[],displayName:"MovablePoint",props:{point:{required:!0,tsType:{name:"vec.Vector2"},description:""},ariaDescribedBy:{required:!1,tsType:{name:"string"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},ariaLive:{required:!1,tsType:{name:"union",raw:'"off" | "assertive" | "polite" | undefined',elements:[{name:"literal",value:'"off"'},{name:"literal",value:'"assertive"'},{name:"literal",value:'"polite"'},{name:"undefined"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},constrain:{required:!1,tsType:{name:"union",raw:`| ((point: vec.Vector2) => vec.Vector2)
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
interactive figure on the graph.`},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.FocusEvent) => unknown",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent"},name:"event"}],return:{name:"unknown"}}},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}}},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.FocusEvent) => unknown",signature:{arguments:[{type:{name:"ReactFocusEvent",raw:"React.FocusEvent"},name:"event"}],return:{name:"unknown"}}},description:""},onMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(newPoint: vec.Vector2) => unknown",signature:{arguments:[{type:{name:"vec.Vector2"},name:"newPoint"}],return:{name:"unknown"}}},description:""}}};function H(n){const{id:r,children:e}=n;return l.jsx("foreignObject",{children:l.jsx("span",{id:r,style:Sn.srOnly,"aria-hidden":!0,children:e})})}H.__docgenInfo={description:`If an element has an \`aria-describedby\` attribute, it needs to point to
a separate description element that contains the description for that
element.

If the element is within an SVG, the description element must be a
\`<span>\` within a \`<foreignObject>\` in order for some browser/SR
combos to be able to access it.

Use this SRDescInSVG component to create the <foreignObject>
and styling for this description element.`,methods:[],displayName:"SRDescInSVG",props:{id:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]},description:""}}};const{calculateAngleInDegrees:sm,getClockwiseAngle:om,polar:ga}=We;function lm(n,r,e){return{graph:l.jsx(um,{graphState:n,dispatch:r}),interactiveElementsDescription:dm(n,e)}}function um(n){const{dispatch:r,graphState:e}=n,{graphDimensionsInPixels:t,interactiveColor:a}=$(),i=pe(),o=v.useId()+"-description",{coords:u,showAngles:d,range:m,allowReflexAngles:p,snapDegrees:h}=e,g=[u[0],u[2]],y=u[1],f=[[y,g[0]],[y,g[1]]],A=[ee(y,g[0]),ee(y,g[1])].map(([N,j],L)=>{const Q=gs(m,t),K=ze(f[L][0],f[L][1],Q);return l.jsxs("g",{children:[l.jsx(Ue,{start:N,end:j,style:{stroke:a,strokeWidth:"var(--movable-line-stroke-weight)"},testId:"angle-graph__line"}),l.jsx(dn,{tail:f[L][1],tip:K,testId:"angle-graph__vector"})]},`line-${L}`)}),P={vertex:y,coords:g,allowReflexAngles:p||!1,snapDegrees:h||1,range:m,showAngles:d||!1},{srAngleGraphAriaLabel:T,srAngleGraphAriaDescription:C,srAngleStartingSide:O,srAngleEndingSide:S,srAngleVertex:E}=mm(e,i);return l.jsxs("g",{"aria-label":T,"aria-describedby":o,children:[A,l.jsx(ds,{...P}),l.jsx(be,{point:u[1],sequenceNumber:1,constrain:N=>N,onMove:N=>r(M.angle.movePoint(1,N)),ariaLabel:E}),l.jsx(be,{point:u[0],sequenceNumber:2,constrain:ha(u[0],u[1],h||1),onMove:N=>r(M.angle.movePoint(0,N)),ariaLabel:S}),l.jsx(be,{point:u[2],sequenceNumber:3,constrain:ha(u[2],u[1],h||1),onMove:N=>r(M.angle.movePoint(2,N)),ariaLabel:O}),l.jsx(H,{id:o,children:C})]})}function dm(n,r){const{strings:e,locale:t}=r,{coords:a}=n;return e.srInteractiveElements({elements:e.srAngleInteractiveElements({vertexX:k(a[1][q],t),vertexY:k(a[1][R],t),startingSideX:k(a[2][q],t),startingSideY:k(a[2][R],t),endingSideX:k(a[0][q],t),endingSideY:k(a[0][R],t)})})}function mm(n,r){const{strings:e,locale:t}=r,{coords:a,allowReflexAngles:i}=n,[s,o,u]=a,d=k(om(a,i),t),m=e.srAngleGraphAriaLabel,p=e.srAngleGraphAriaDescription({angleMeasure:d,vertexX:k(o[q],t),vertexY:k(o[R],t),startingSideX:k(u[q],t),startingSideY:k(u[R],t),endingSideX:k(s[q],t),endingSideY:k(s[R],t)}),h=e.srAngleStartingSide({x:k(u[q],t),y:k(u[R],t)}),g=e.srAngleEndingSide({x:k(s[q],t),y:k(s[R],t)}),y=e.srAngleVertexWithAngleMeasure({x:k(o[q],t),y:k(o[R],t),angleMeasure:d});return{srAngleGraphAriaLabel:m,srAngleGraphAriaDescription:p,srAngleStartingSide:h,srAngleEndingSide:g,srAngleVertex:y}}const pm=[1,0],cm=[-1,0],gm=[0,1],hm=[0,-1];function ha(n,r,e){const t=sm(x.sub(n,r)),a=[n,x.add(n,cm)],i=[n,x.add(n,pm)],s=[n,x.add(n,gm)],o=[n,x.add(n,hm)],u=t+e,d=t-e,m=[r,x.add(r,ga(1,u))],p=[r,x.add(r,ga(1,d))],h=je(a,m)??je(a,p),g=je(i,m)??je(i,p),y=je(s,m)??je(s,p),f=je(o,m)??je(o,p);return{up:y??n,down:f??n,left:h??n,right:g??n}}function ym(n,r){if(!n.hasBeenInteractedWith)return{...r};if(r.type==="linear-system"&&n.type==="linear-system")return{...r,coords:n.coords};if(n.type==="segment"&&r.type==="segment")return{...r,coords:n.coords};if(n.type==="linear"&&r.type==="linear")return{...r,coords:n.coords};if(n.type==="ray"&&r.type==="ray")return{...r,coords:n.coords};if(n.type==="polygon"&&r.type==="polygon")return n.numSides==="unlimited"&&!n.closedPolygon?{...r,coords:null}:{...r,coords:n.coords};if(n.type==="point"&&r.type==="point")return n.numPoints==="unlimited"&&n.coords.length===0?{...r,coords:null}:{...r,coords:n.coords};if(n.type==="circle"&&r.type==="circle")return{...r,center:n.center,radius:ct(n)};if(n.type==="quadratic"&&r.type==="quadratic")return{...r,coords:n.coords};if(n.type==="sinusoid"&&r.type==="sinusoid")return{...r,coords:n.coords};if(n.type==="angle"&&r.type==="angle")return{...r,coords:n.coords,allowReflexAngles:n.allowReflexAngles};if(n.type==="none"&&r.type==="none")return{type:"none"};throw new Error("Mafs is not yet implemented for graph type: "+r.type)}function ct(n){const[r,e]=n.center,[t,a]=n.radiusPoint;return Math.sqrt(Math.pow(t-r,2)+Math.pow(a-e,2))}function wm(n,r,e){return{graph:l.jsx(hs,{graphState:n,dispatch:r}),interactiveElementsDescription:xm(n,e)}}function hs(n){const{dispatch:r,graphState:e}=n,{center:t,radiusPoint:a,snapStep:i}=e,{strings:s,locale:o}=pe(),[u,d]=v.useState("off"),m=ct(e),p=v.useId(),h=p+"-circle",g=p+"-radius",y=p+"-outer-points",{srCircleGraph:f,srCircleShape:b,srCircleRadiusPoint:A,srCircleRadius:P,srCircleOuterPoints:T}=ys(e,{strings:s,locale:o});return l.jsxs("g",{"aria-label":f,"aria-describedby":`${h} ${g} ${y}`,children:[l.jsx(fm,{id:h,ariaLabel:b,ariaDescribedBy:`${g} ${y}`,center:t,radius:m,onMove:C=>{d("off"),r(M.circle.moveCenter(C))}}),l.jsx(be,{ariaLabel:`${A} ${P}`,ariaDescribedBy:`${y}`,ariaLive:u,point:a,sequenceNumber:1,cursor:"ew-resize",onMove:C=>{d("polite"),r(M.circle.moveRadiusPoint(C))},constrain:qm(t,a,i)}),l.jsx(H,{id:g,children:P}),l.jsx(H,{id:y,children:T})]})}function fm(n){const{id:r,ariaLabel:e,ariaDescribedBy:t,center:a,radius:i,onMove:s}=n,{snapStep:o,disableKeyboardInteraction:u,interactiveColor:d}=$(),[m,p]=v.useState(!1),h=v.useRef(null),{dragging:g}=mn({gestureTarget:h,point:a,onMove:s,constrainKeyboardMovement:b=>le(o,b)}),[y]=ee(a),[f]=kd([i,i]);return l.jsxs("g",{"aria-label":e,"aria-describedby":t,"aria-live":"polite","aria-disabled":u,ref:h,role:"button",tabIndex:u?-1:0,className:`movable-circle ${g?"movable-circle--dragging":""}`,onFocus:()=>p(!0),onBlur:()=>p(!1),children:[l.jsx("ellipse",{className:"focus-ring",cx:y[q],cy:y[R],rx:f[q]+3,ry:f[R]+3}),l.jsx("ellipse",{id:r,className:"circle",cx:y[q],cy:y[R],rx:f[q],ry:f[R],stroke:d,"data-testid":"movable-circle__circle"}),l.jsx(vm,{center:a,dragging:g,focused:m})]})}const Gn=[24,14],bm=km([-4.4,0,4.4],[-2.1,2.1]);function vm(n){const{center:r,dragging:e,focused:t}=n,[a]=ee(r),{markings:i,interactiveColor:s}=$(),o=Math.min(...Gn)/2,u=x.sub(a,x.scale(Gn,.5)),d=(e||t)&&i!=="none";return l.jsxs(l.Fragment,{children:[d&&l.jsx(wr,{point:r}),l.jsx("rect",{className:"movable-circle-handle",x:u[q],y:u[R],width:Gn[q],height:Gn[R],rx:o,ry:o,fill:s,"data-testid":"movable-circle__handle"}),bm.map(m=>{const[p,h]=x.add(m,a);return l.jsx("circle",{className:"movable-circle-handle-dot",cx:p,cy:h},`circle-${p}-${h}`)})]})}function km(n,r){const e=[];for(const t of n)for(const a of r)e.push([t,a]);return e}function xm(n,r){return ys(n,r).srCircleInteractiveElement}const qm=(n,r,e)=>{const t=a=>{let i=a(r);return x.dist(i,n)===0&&(i=a(i)),i};return{up:t(a=>x.add(a,[0,e[1]])),down:t(a=>x.sub(a,[0,e[1]])),left:t(a=>x.sub(a,[e[0],0])),right:t(a=>x.add(a,[e[0],0]))}};function ys(n,r){const{strings:e,locale:t}=r,{center:a,radiusPoint:i}=n,s=ct(n),o=i[q]>=a[q],u=e.srCircleGraph,d=e.srCircleShape({centerX:k(a[0],t),centerY:k(a[1],t)}),m=o?e.srCircleRadiusPointRight({radiusPointX:k(i[0],t),radiusPointY:k(i[1],t)}):e.srCircleRadiusPointLeft({radiusPointX:k(i[0],t),radiusPointY:k(i[1],t)}),p=e.srCircleRadius({radius:s}),h=e.srCircleOuterPoints({point1X:k(a[0]+s,t),point1Y:k(a[1],t),point2X:k(a[0],t),point2Y:k(a[1]+s,t),point3X:k(a[0]-s,t),point3Y:k(a[1],t),point4X:k(a[0],t),point4Y:k(a[1]-s,t)}),g=e.srInteractiveElements({elements:[d,p].join(" ")});return{srCircleGraph:u,srCircleShape:d,srCircleRadiusPoint:m,srCircleRadius:p,srCircleOuterPoints:h,srCircleInteractiveElement:g}}hs.__docgenInfo={description:"",methods:[],displayName:"CircleGraph",props:{graphState:{required:!0,tsType:{name:"T"},description:""},dispatch:{required:!0,tsType:{name:"signature",type:"function",raw:"(action: InteractiveGraphAction) => unknown",signature:{arguments:[{type:{name:"union",raw:`| Reinitialize
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
| ChangeKeyboardInvitationVisibility`,elements:[{name:"Reinitialize"},{name:"MovePointInFigure"},{name:"MoveLine"},{name:"MoveAll"},{name:"MovePoint"},{name:"MoveCenter"},{name:"MoveRadiusPoint"},{name:"ChangeSnapStep"},{name:"ChangeRange"},{name:"AddPoint"},{name:"RemovePoint"},{name:"FocusPoint"},{name:"BlurPoint"},{name:"DeleteIntent"},{name:"ClickPoint"},{name:"ClosePolygon"},{name:"OpenPolygon"},{name:"ChangeInteractionMode"},{name:"ChangeKeyboardInvitationVisibility"}]},name:"action"}],return:{name:"unknown"}}},description:""}}};function Pm(n,r,e){return{graph:l.jsx(Am,{graphState:n,dispatch:r}),interactiveElementsDescription:Cm(n,e)}}const Am=(n,r)=>{const{dispatch:e}=n,{coords:t}=n.graphState,{strings:a,locale:i}=pe(),s=v.useId(),o=s+"-points",u=s+"-intercept",d=s+"-slope",{srLinearGraph:m,srLinearGraphPoints:p,srLinearGrabHandle:h,slopeString:g,interceptString:y}=ws(n.graphState,{strings:a,locale:i});return l.jsxs("g",{"aria-label":m,"aria-describedby":`${o} ${u} ${d}`,children:[l.jsx(En,{ariaLabels:{grabHandleAriaLabel:h},ariaDescribedBy:`${u} ${d}`,points:t,onMoveLine:f=>{e(M.linear.moveLine(f))},extend:{start:!0,end:!0},onMovePoint:(f,b)=>e(M.linear.movePoint(f,b))},0),l.jsx(H,{id:o,children:p}),l.jsx(H,{id:u,children:y}),l.jsx(H,{id:d,children:g})]})};function Cm(n,r){return ws(n,r).srLinearInteractiveElement}function ws(n,r){const{coords:e}=n,{strings:t,locale:a}=r,i=t.srLinearGraph,s=t.srLinearGraphPoints({point1X:k(e[0][0],a),point1Y:k(e[0][1],a),point2X:k(e[1][0],a),point2Y:k(e[1][1],a)}),o=t.srLinearGrabHandle({point1X:k(e[0][0],a),point1Y:k(e[0][1],a),point2X:k(e[1][0],a),point2Y:k(e[1][1],a)}),u=Oi(e,t),d=ji(e,t,a),m=t.srInteractiveElements({elements:[i,s].join(" ")});return{srLinearGraph:i,srLinearGraphPoints:s,srLinearGrabHandle:o,slopeString:u,interceptString:d,srLinearInteractiveElement:m}}function Tm(n,r,e){return{graph:l.jsx(Rm,{graphState:n,dispatch:r}),interactiveElementsDescription:Im(n,e)}}const Rm=n=>{const{dispatch:r}=n,{coords:e}=n.graphState,{strings:t,locale:a}=pe(),i=v.useId(),s=`${i}-intersection`,o=Io(e[0],e[1]),u=o?t.srLinearSystemIntersection({x:k(o[0],a),y:k(o[1],a)}):t.srLinearSystemParallel,d=e.map((p,h)=>({pointsDescriptionId:`${i}-line${h+1}-points`,interceptDescriptionId:`${i}-line${h+1}-intercept`,slopeDescriptionId:`${i}-line${h+1}-slope`,pointsDescription:t.srLinearSystemPoints({lineNumber:h+1,point1X:k(p[0][0],a),point1Y:k(p[0][1],a),point2X:k(p[1][0],a),point2Y:k(p[1][1],a)}),interceptDescription:ji(p,t,a),slopeDescription:Oi(p,t)})),m=d.map(({pointsDescriptionId:p,interceptDescriptionId:h,slopeDescriptionId:g})=>`${p} ${h} ${g}`).join(" ");return l.jsxs("g",{"aria-label":t.srLinearSystemGraph,"aria-describedby":`${m} ${s}`,children:[e==null?void 0:e.map((p,h)=>l.jsx(En,{points:p,ariaLabels:{point1AriaLabel:t.srLinearSystemPoint({lineNumber:h+1,pointSequence:1,x:k(p[0][0],a),y:k(p[0][1],a)}),point2AriaLabel:t.srLinearSystemPoint({lineNumber:h+1,pointSequence:2,x:k(p[1][0],a),y:k(p[1][1],a)}),grabHandleAriaLabel:t.srLinearSystemGrabHandle({lineNumber:h+1,point1X:k(p[0][0],a),point1Y:k(p[0][1],a),point2X:k(p[1][0],a),point2Y:k(p[1][1],a)})},ariaDescribedBy:`${d[h].interceptDescriptionId} ${d[h].slopeDescriptionId} ${s}`,onMoveLine:g=>{r(M.linearSystem.moveLine(h,g))},extend:{start:!0,end:!0},onMovePoint:(g,y)=>r(M.linearSystem.movePointInFigure(h,g,y))},h)),d.map(({pointsDescriptionId:p,interceptDescriptionId:h,slopeDescriptionId:g,pointsDescription:y,interceptDescription:f,slopeDescription:b},A)=>l.jsxs("span",{children:[l.jsx(H,{id:p,children:y}),l.jsx(H,{id:h,children:f}),l.jsx(H,{id:g,children:b})]},`line-descriptions-${A}`)),l.jsx(H,{id:s,children:u})]})};function Im(n,r){const{strings:e,locale:t}=r,{coords:a}=n,i=e.srLinearSystemGraph,s=a.map((u,d)=>{const m=u[0],p=u[1];return e.srLinearSystemPoints({lineNumber:d+1,point1X:k(m[0],t),point1Y:k(m[1],t),point2X:k(p[0],t),point2Y:k(p[1],t)})}),o=[i,...s];return e.srInteractiveElements({elements:o.join(" ")})}function Nm(n,r,e){return{graph:l.jsx(Sm,{graphState:n,dispatch:r}),interactiveElementsDescription:Em(n,e)}}function Sm(n){const{numPoints:r}=n.graphState,e=$(),t=v.useRef([]),{range:[a,i]}=e,[[s,o]]=ee([a[0],i[1]]);v.useEffect(()=>{var m;const d=n.graphState.focusedPointIndex;d!=null&&((m=t.current[d])==null||m.focus())},[n.graphState.focusedPointIndex,n.graphState.coords.length,t]);const u={...n,graphConfig:e,pointsRef:t,top:o,left:s};return r==="unlimited"?jm(u):Om(u)}function Om(n){const{dispatch:r}=n;return l.jsx(l.Fragment,{children:n.graphState.coords.map((e,t)=>l.jsx(be,{point:e,sequenceNumber:t+1,onMove:a=>r(M.pointGraph.movePoint(t,a))},t))})}function jm(n){const{dispatch:r,graphConfig:e,pointsRef:t,top:a,left:i}=n,{coords:s}=n.graphState,{graphDimensionsInPixels:o}=e,u=o[0],d=o[1];return l.jsxs(l.Fragment,{children:[l.jsx("rect",{style:{fill:"rgba(0,0,0,0)",cursor:"crosshair"},width:u,height:d,x:i,y:a,onClick:m=>{const p=m.currentTarget.getBoundingClientRect(),h=m.clientX-p.x,g=m.clientY-p.y,y=xi([[h,g]],e);r(M.pointGraph.addPoint(y[0]))}}),s.map((m,p)=>l.jsx(be,{point:m,sequenceNumber:p+1,onMove:h=>r(M.pointGraph.movePoint(p,h)),ref:h=>{t.current[p]=h},onFocus:()=>{r(M.pointGraph.focusPoint(p))},onClick:()=>{r(M.pointGraph.clickPoint(p))}},p))]})}function Em(n,r){const{strings:e,locale:t}=r;if(n.coords.length===0)return e.srNoInteractiveElements;const a=n.coords.map(([i,s],o)=>e.srPointAtCoordinates({num:o+1,x:k(i,t),y:k(s,t)}));return e.srInteractiveElements({elements:a.join(" ")})}const{magnitude:Mm,vector:Lm}=ut;function Ht(n){const{graph:r,step:e,snapStep:t,range:a}=n,i={hasBeenInteractedWith:!1,range:a,snapStep:t};switch(r.type){case"segment":return{...i,type:"segment",coords:Fm(r,a,e)};case"linear":return{...i,type:r.type,coords:ya(r,a,e)};case"ray":return{...i,type:r.type,coords:ya(r,a,e)};case"linear-system":return{...i,type:r.type,coords:Wm(r,a,e)};case"polygon":return{...i,type:"polygon",numSides:r.numSides||0,showAngles:!!r.showAngles,showSides:!!r.showSides,coords:Gm(r,a,e),snapTo:r.snapTo??"grid",focusedPointIndex:null,showRemovePointButton:!1,interactionMode:"mouse",showKeyboardInteractionInvitation:!1,closedPolygon:!1};case"point":return{...i,type:r.type,coords:Dm(r,a,e),numPoints:r.numPoints||0,focusedPointIndex:null,showRemovePointButton:!1,interactionMode:"mouse",showKeyboardInteractionInvitation:!1};case"circle":return{...i,type:r.type,...Hm(r)};case"quadratic":return{...i,type:r.type,coords:Vm(r,a,e)};case"sinusoid":return{...i,type:r.type,coords:_m(r,a,e)};case"angle":return{...i,type:r.type,showAngles:!!r.showAngles,coords:Um({graph:r,range:a,step:e}),angleOffsetDeg:Number(r.angleOffsetDeg),allowReflexAngles:!!r.allowReflexAngles,snapDegrees:Number(r.snapDegrees)};case"none":return{...i,type:"none"};default:throw new ve(r)}}function Dm(n,r,e){var o,u;const t=n.numPoints||1;let a=(o=n.coords)==null?void 0:o.slice();if(a)return a;const i=(u=n.startCoords)==null?void 0:u.slice();if(i)return i;switch(t){case 1:a=[n.coord||[0,0]];break;case 2:a=[[-5,0],[5,0]];break;case 3:a=[[-5,0],[0,0],[5,0]];break;case 4:a=[[-6,0],[-2,0],[2,0],[6,0]];break;case 5:a=[[-6,0],[-3,0],[0,0],[3,0],[6,0]];break;case 6:a=[[-5,0],[-3,0],[-1,0],[1,0],[3,0],[5,0]];break;default:a=[];break}const s=gr(a,[[-10,10],[-10,10]]);return Ge(r,e,s)}function Fm(n,r,e){if(n.coords)return n.coords;if(n.startCoords)return n.startCoords;const t=i=>{switch(i){case 2:return[5,-5];case 3:return[5,0,-5];case 4:return[6,2,-2,-6];case 5:return[6,3,0,-3,-6];case 6:return[5,3,1,-1,-3,-5];default:return[5]}},a=[[-10,10],[-10,10]];return t(n.numSegments).map(i=>{let s=[[-5,i],[5,i]];return s=gr(s,a),s=Ge(r,e,s),s})}const fs=[[[.25,.75],[.75,.75]],[[.25,.25],[.75,.25]]];function ya(n,r,e){return n.coords?n.coords:n.startCoords?n.startCoords:Ge(r,e,fs[0])}function Wm(n,r,e){return n.coords?n.coords:n.startCoords?n.startCoords:fs.map(t=>Ge(r,e,t))}function Gm(n,r,e){var o,u;let t=(o=n.coords)==null?void 0:o.slice();if(t)return t;const a=(u=n.startCoords)==null?void 0:u.slice();if(a)return a;const i=n.numSides||3;if(i==="unlimited")t=[];else{const d=2*Math.PI/i,m=(1/i-1/2)*Math.PI,p=n.snapTo==="sides"?Math.sqrt(3)/3*7:4;t=[...Array(i).keys()].map(h=>[p*Math.cos(h*d+m),p*Math.sin(h*d+m)])}t=gr(t,[[-10,10],[-10,10]]);const s=!["angles","sides"].includes(n.snapTo||"");return t=Ge(r,e,t,!s),t}function _m(n,r,e){if(n.coords)return[n.coords[0],n.coords[1]];if(n.startCoords)return[n.startCoords[0],n.startCoords[1]];let t=[[.5,.5],[.65,.6]];return t=Ge(r,e,t,!0),t}function Vm(n,r,e){return n.coords?n.coords:n.startCoords?n.startCoords:Ge(r,e,[[.25,.75],[.5,.25],[.75,.75]],!0)}function Hm(n){var r;return n.center!=null&&n.radius!=null?{center:n.center,radiusPoint:x.add(n.center,[n.radius,0])}:(r=n.startCoords)!=null&&r.center&&n.startCoords.radius?{center:n.startCoords.center,radiusPoint:x.add(n.startCoords.center,[n.startCoords.radius,0])}:{center:[0,0],radiusPoint:[2,0]}}const Um=n=>{const{graph:r,range:e,step:t}=n;if(r.coords)return r.coords;if(r.startCoords)return r.startCoords;const{snapDegrees:a,angleOffsetDeg:i}=r,s=a||1;let o=s;for(;o<20;)o+=s;o=o*Math.PI/180;const u=(i||0)*Math.PI/180;let d=[[.85,.5],[.5,.5]];d=Ge(e,t,d,!0);const m=Mm(Lm(...d)),p=[...d,[0,0]];return p[0]=[p[1][0]+m*Math.cos(u),p[1][1]+m*Math.sin(u)],p[2]=[p[1][0]+m*Math.cos(o+u),p[1][1]+m*Math.sin(o+u)],p},{getAngleFromVertex:gt,getClockwiseAngle:$m,polar:fr}=We,{angleMeasures:Xm,ccw:bs,lawOfCosines:Ym,magnitude:vs,polygonSidesIntersect:zm,reverseVector:Bm,sign:ks,vector:xs}=ut,{getQuadraticCoefficients:Km}=No,Ut=2;function Jm(n,r){switch(r.type){case ss:return Ht(r.params);case ns:return sp(n,r);case Hi:return op(n,r);case Zi:return lp(n,r);case es:return up(n,r);case ts:return dp(n,r);case rs:return mp(n,r);case as:return pp(n,r);case is:return cp(n,r);case Ui:return gp(n,r);case $i:return qs(n,r);case Xi:return Zm(n,r);case Yi:return ep(n);case Vi:return Qm(n);case zi:return np(n,r);case Ji:return tp(n);case Qi:return rp(n);case Bi:return ap(n,r);case Ki:return ip(n,r);default:throw new ve(r)}}function Qm(n,r){return me(n)&&n.focusedPointIndex!==null?qs(n,M.pointGraph.removePoint(n.focusedPointIndex)):n}function Zm(n,r){switch(n.type){case"polygon":case"point":return{...n,focusedPointIndex:r.index};default:return n}}function ep(n,r){switch(n.type){case"polygon":case"point":const e={...n,showRemovePointButton:!1};return n.interactionMode==="mouse"&&(e.focusedPointIndex=null),e;default:return n}}function np(n,r){return me(n)?{...n,focusedPointIndex:r.index,showRemovePointButton:!0}:n}function tp(n){if(me(n)&&n.type==="polygon"){const r=hr(n.coords);return{...n,coords:r,closedPolygon:!0}}return n}function rp(n){return me(n)&&n.type==="polygon"?{...n,closedPolygon:!1}:n}function ap(n,r){if(me(n)){const e=r.mode==="keyboard"?!1:n.showKeyboardInteractionInvitation;return{...n,interactionMode:r.mode,showKeyboardInteractionInvitation:e}}return n}function ip(n,r){return me(n)?{...n,showKeyboardInteractionInvitation:r.shouldShow,hasBeenInteractedWith:!0}:n}function sp(n,r){switch(n.type){case"segment":case"linear-system":{const e=Ap({array:n.coords,index:r.figureIndex,update:a=>Ie({array:a,index:r.pointIndex,newValue:$e(r.destination,n)})}),t=e[r.figureIndex];return Pp(t)?n:{...n,hasBeenInteractedWith:!0,coords:e}}case"linear":case"ray":{const e=Ie({array:n.coords,index:r.pointIndex,newValue:$e(r.destination,n)});return{...n,hasBeenInteractedWith:!0,coords:e}}case"angle":case"circle":throw new Error("FIXME implement circle reducer");case"none":case"point":case"polygon":case"quadratic":case"sinusoid":throw new Error(`Don't use movePointInFigure for ${n.type} graphs. Use movePoint instead!`);default:throw new ve(n)}}function op(n,r){const{snapStep:e,range:t}=n;switch(n.type){case"segment":case"linear-system":{if(r.itemIndex===void 0)throw new Error("Please provide index of line to move");const a=n.coords[r.itemIndex];if(!a)throw new Error("No line to move");const i=et(a,r.delta,{snapStep:e,range:t}),s=[le(e,x.add(a[0],i)),le(e,x.add(a[1],i))],o=Ie({array:n.coords,index:r.itemIndex,newValue:s});return{...n,type:n.type,hasBeenInteractedWith:!0,coords:o}}case"linear":case"ray":{const a=n.coords,i=et(a,r.delta,{snapStep:e,range:t}),s=[le(e,x.add(a[0],i)),le(e,x.add(a[1],i))];return{...n,type:n.type,hasBeenInteractedWith:!0,coords:s}}default:return n}}function lp(n,r){const{snapStep:e,range:t}=n;switch(n.type){case"polygon":{let a;if(n.snapTo==="sides"||n.snapTo==="angles"){const i=et(n.coords,r.delta,{snapStep:[0,0],range:t});a=n.coords.map(s=>x.add(s,i))}else{const i=et(n.coords,r.delta,{snapStep:e,range:t});a=n.coords.map(s=>le(e,x.add(s,i)))}return{...n,hasBeenInteractedWith:!0,coords:a}}default:return n}}function up(n,r){switch(n.type){case"angle":const e=(()=>{if(r.index===1){const s=yp(n,r);return{...n,hasBeenInteractedWith:!0,coords:s}}return{...n,hasBeenInteractedWith:!0,coords:Ie({array:n.coords,index:r.index,newValue:fp(r.destination,n,r.index)})}})();return bp(e)?n:e;case"polygon":let t;n.snapTo==="sides"?t=kp(r.destination,n,r.index):n.snapTo==="angles"?t=vp(r.destination,n,r.index):t=$e(r.destination,n);const a=Ie({array:n.coords,index:r.index,newValue:t});return!(n.numSides==="unlimited"&&!n.closedPolygon)&&zm(a)?n:{...n,hasBeenInteractedWith:!0,coords:a};case"point":return{...n,hasBeenInteractedWith:!0,focusedPointIndex:r.index,coords:Ie({array:n.coords,index:r.index,newValue:$e(r.destination,n)})};case"sinusoid":{const s=r.destination,o=$e(s,n),u=[...n.coords];return u[r.index]=o,u[0][q]===u[1][q]?n:{...n,hasBeenInteractedWith:!0,coords:Ie({array:n.coords,index:r.index,newValue:o})}}case"quadratic":{const s=[...n.coords],o=$e(r.destination,n);return s[r.index]=o,Km(s)===void 0?n:{...n,hasBeenInteractedWith:!0,coords:Ie({array:n.coords,index:r.index,newValue:o})}}default:throw new Error("The movePoint action is only for point, quadratic, and polygon graphs")}}function dp(n,r){switch(n.type){case"circle":{const e=$e(r.destination,n),t=[...x.add(n.radiusPoint,x.sub(e,n.center))],[a,i]=n.range[q],[s]=t;if(s<a||s>i){const o=(s-e[q])*2,u=s-o;u>=a&&u<=i&&(t[q]=u)}return{...n,hasBeenInteractedWith:!0,center:e,radiusPoint:t}}default:throw new Error("The doMoveCenter action is only for circle graphs")}}function mp(n,r){switch(n.type){case"circle":{const[e,t]=n.range[q],a=le(n.snapStep,[on(r.destination[q]+0,e,t),n.center[1]]);return w.isEqual(a,n.center)?n:{...n,hasBeenInteractedWith:!0,radiusPoint:a}}default:throw new Error("The doMoveRadiusPoint action is only for circle graphs")}}function pp(n,r){return w.isEqual(n.snapStep,r.snapStep)?n:{...n,snapStep:r.snapStep}}function cp(n,r){return w.isEqual(n.range,r.range)?n:{...n,range:r.range}}function gp(n,r){if(!me(n))return n;const{snapStep:e}=n,t=le(e,r.location);for(const i of n.coords)if(i[q]===t[q]&&i[R]===t[R])return n;const a=[...n.coords,t];return{...n,hasBeenInteractedWith:!0,coords:a,showRemovePointButton:!0,focusedPointIndex:a.length-1}}function qs(n,r){if(!me(n))return n;const e=n.coords.length>1?n.coords.length-2:null;return{...n,coords:n.coords.filter((t,a)=>a!==r.index),focusedPointIndex:e,showRemovePointButton:e!==null}}const hp=(n,r,e)=>{const[t,a]=e,i=Math.min(...n.map(p=>p[q])),s=Math.min(...n.map(p=>p[R])),o=Math.max(...r.map(p=>p[q])),u=Math.max(...r.map(p=>p[R])),d=on(t,o,i),m=on(a,u,s);return[d,m]},et=(n,r,e)=>{const t=n.map(o=>xp({...e,point:o})),a=n.map(o=>qp({...e,point:o})),[i,s]=hp(t,a,r);return[i,s]};function Xn(n,r){return n<r||kt(n,r)}function $e(n,{snapStep:r,range:e}){return le(r,_e({snapStep:r,range:e,point:n}))}function yp({range:n,coords:r,snapStep:e},{destination:t}){const a=[...r],i=a[1],s=x.add(e,[Ut,Ut]),o=wi(pr(s,n),le(e,t)),u=x.add(o,Bm(i)),d={};for(const m of[0,2]){const p=a[m];let h=x.add(p,u),g=gt(o,h);g*=Math.PI/180,h=wp(h,g,n,e),d[m]=h}return d[1]=o,Object.entries(d).forEach(([m,p])=>{a[m]=p}),a}function wa(n,r,e){return x.dist(n,r)<2}function wp(n,r,e,t){const a=[e[0][0]+t[0],e[1][0]+t[0]],i=[e[0][1]-t[1],e[1][1]-t[1]];let s=n;return s[0]<a[0]?s=[a[0],s[1]+(a[0]-s[0])*Math.tan(r)]:s[0]>i[0]&&(s=[i[0],s[1]-(s[0]-i[0])*Math.tan(r)]),s[1]<a[1]?s=[s[0]+(a[1]-s[1])/Math.tan(r),a[1]]:s[1]>i[1]&&(s=[s[0]-(s[1]-i[1])/Math.tan(r),i[1]]),s}function fp(n,{range:r,coords:e,snapDegrees:t,angleOffsetDeg:a,snapStep:i},s){const o=t||1,u=a||0,d=[...e],m=[[r[0][0]+i[0],r[0][1]-i[0]],[r[1][0]+i[1],r[1][1]-i[1]]],p=_e({snapStep:[0,0],range:m,point:n});d[s]=p;const h=e[1];let g=gt(d[s],h);g=Math.round((g-u)/o)*o+u;const y=Ut+.01,f=Math.max(x.dist(d[s],h),y);return x.add(h,fr(f,g))}function bp(n){return wa(n.coords[0],n.coords[1],n.range)||wa(n.coords[2],n.coords[1],n.range)}function vp(n,{range:r,coords:e},t){const a=e[t];return Ps(n,r,e,t,a)}function Ps(n,r,e,t,a){const i=[...e];i[t]=_e({snapStep:[0,0],range:r,point:n});const s=Xm(i).map(f=>f*180/Math.PI),o=f=>(t+f+i.length)%i.length;w.each([-1,1],function(f){s[o(f)]=Math.round(s[o(f)])});const u=function(f,b,A){return $m([i[o(f)],i[o(b)],i[o(A)]])},d=[s[o(-1)]-u(-2,-1,1),s[o(1)]-u(-1,1,2)];if(d[2]=180-(d[0]+d[1]),d.some(function(f){return Xn(f,1)}))return a;const m=vs(xs(i[o(-1)],i[o(1)])),p=ks(bs(i[o(-1)],i[o(1)],i[t]))===1,h=Math.sin(d[1]*Math.PI/180)/Math.sin(d[2]*Math.PI/180)*m,g=gt(i[o(1)],i[o(-1)]),y=fr(h,g+(p?1:-1)*d[0]);return Rn(i[o(-1)],y)}function kp(n,{range:r,coords:e},t){const a=e[t];return As(n,r,e,t,a)}function As(n,r,e,t,a){const i=_e({snapStep:[0,0],range:r,point:n}),s=h=>(t+h+e.length)%e.length,o=w.map([[e[s(-1)],i],[i,e[s(1)]],[e[s(-1)],e[s(1)]]],function(h){return vs(xs(...h))});if(w.each([0,1],function(h){o[h]=Math.round(o[h])}),Xn(o[1]+o[2],o[0])||Xn(o[0]+o[2],o[1])||Xn(o[0]+o[1],o[2]))return a;const u=Ym(o[0],o[2],o[1]),d=gt(e[s(1)],e[s(-1)]),m=ks(bs(e[s(-1)],e[s(1)],i))===1,p=fr(o[0],d+(m?1:-1)*u);return Rn(e[s(-1)],p)}function xp({snapStep:n,range:r,point:e}){const t=_e({snapStep:n,range:r,point:[1/0,1/0]});return x.sub(t,e)}function qp({snapStep:n,range:r,point:e}){const t=_e({snapStep:n,range:r,point:[-1/0,-1/0]});return x.sub(t,e)}const Pp=n=>n.some((r,e)=>n.some((t,a)=>e!==a&&So(r,t)));function Ap(n){const{array:r,index:e,update:t}=n,a=t(r[e]);return Ie({array:r,index:e,newValue:a})}function Ie(n){const{array:r,index:e,newValue:t}=n,a=[...r];return a[e]=t,a}const{convertRadiansToDegrees:Cs}=We;function Cp(n,r,e,t){return{graph:l.jsx(Tp,{graphState:n,dispatch:r}),interactiveElementsDescription:Np(n,e,t)}}const Tp=n=>{const{dispatch:r}=n,{numSides:e,coords:t,snapStep:a,snapTo:i="grid"}=n.graphState,s=$(),o=v.useRef(null),u=v.useRef([]),d=v.useRef(0),{range:[m,p]}=s,[[h,g]]=ee([m[0],p[1]]),y=t??[[0,0]],f=y[0],b=Op(a,i),{dragging:A}=mn({gestureTarget:o,point:f,onMove:E=>{const N=x.sub(E,f);r(M.polygon.moveAll(N))},constrainKeyboardMovement:b}),[P,T]=v.useState(!1),[C,O]=v.useState(!1);v.useEffect(()=>{var N;const E=n.graphState.focusedPointIndex;E!=null&&((N=u.current[E])==null||N.focus())},[n.graphState.focusedPointIndex,n.graphState.coords.length,u]),v.useEffect(()=>{e==="unlimited"&&n.graphState.coords.length>2&&r(M.polygon.closePolygon())},[]);const S={...n,graphConfig:s,polygonRef:o,pointsRef:u,lastMoveTimeRef:d,left:h,top:g,dragging:A,points:y,hovered:P,setHovered:T,focusVisible:C,setFocusVisible:O};return e==="unlimited"?l.jsx(Rp,{...S}):l.jsx(Ts,{...S})},Ts=n=>{const{dispatch:r,hovered:e,setHovered:t,focusVisible:a,setFocusVisible:i,graphConfig:s,polygonRef:o,lastMoveTimeRef:u,dragging:d,points:m}=n,{showAngles:p,showSides:h,range:g,snapTo:y="grid",snapStep:f}=n.graphState,{disableKeyboardInteraction:b,interactiveColor:A}=s,{strings:P,locale:T}=pe(),C=v.useId(),O=Array(m.length).fill("off"),[S,E]=v.useState(["off",...O]),N=Ip(m),j=C+"-points-num",L=C+"-points",{srPolygonGraph:Q,srPolygonGraphPointsNum:K,srPolygonGraphPoints:z,srPolygonElementsNum:ce}=br(n.graphState,{strings:P,locale:T},n.graphConfig.markings);return l.jsxs("g",{"aria-label":Q,"aria-describedby":`${j} ${L}`,children:[l.jsx(At,{points:[...m],color:A,svgPolygonProps:{strokeWidth:a?"var(--movable-line-stroke-weight-active)":"var(--movable-line-stroke-weight)",style:{fill:"transparent"},"aria-hidden":!0}}),m.map((se,X)=>{const B=m.at(X-1),he=m[(X+1)%m.length];return!B||!he?null:l.jsx(us,{centerPoint:se,endPoints:[B,he],range:g,polygonLines:N,showAngles:!!p,snapTo:y},"angle-"+X)}),h&&N.map(([se,X],B)=>{const[he,Ae]=x.midpoint(se,X),Se=x.dist(se,X),Ce=!Number.isInteger(Se);return l.jsx(pt,{x:he,y:Ae,children:Ce?`≈ ${Se.toFixed(y==="sides"?0:1)}`:Se},"side-"+B)}),l.jsx(At,{points:[...m],color:"transparent",svgPolygonProps:{ref:o,tabIndex:b?-1:0,strokeWidth:cr,style:{cursor:d?"grabbing":"grab",fill:e?"var(--mafs-blue)":"transparent"},onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),onKeyDownCapture:()=>{i(bt(o.current))},onFocus:()=>{i(bt(o.current)),E(()=>["polite",...O])},onBlur:()=>i(bt(o.current)),className:"movable-polygon",role:"button","aria-label":z?`${ce} ${z}`:ce,"aria-live":S[0],"aria-disabled":b}}),m.map((se,X)=>{const B=`${C}-angle-${X}`,he=`${C}-point-${X}-side-1`,Ae=`${C}-point-${X}-side-2`,Se=Mi(m,X),Ce=Se?Cs(Se):null,vr=Li(m,X),{pointIndex:ro,sideLength:ao}=vr[0],{pointIndex:io,sideLength:so}=vr[1];return l.jsxs("g",{children:[l.jsx(be,{ariaDescribedBy:`${B} ${he} ${Ae}`,ariaLive:S[X+1],constrain:Sp(m,X,g,f,y),point:se,sequenceNumber:X+1,onMove:Mn=>{const kr=Date.now(),oo=1e3/40;kr-u.current>oo&&(r(M.polygon.movePoint(X,Mn)),u.current=kr)},onFocus:()=>{const Mn=[...O];Mn[X]="polite",E(["off",...Mn])}}),Ce&&l.jsx(H,{id:B,children:Number.isInteger(Ce)?P.srPolygonPointAngle({angle:Ce}):P.srPolygonPointAngleApprox({angle:k(Ce,T,1)})}),l.jsx(H,{id:he,children:Gt(ao,ro,P,T)}),l.jsx(H,{id:Ae,children:Gt(so,io,P,T)})]},"point-"+X)}),l.jsx(H,{id:j,children:K}),z&&l.jsx(H,{id:L,children:z})]})},Rp=n=>{const{dispatch:r,graphConfig:e,left:t,top:a,pointsRef:i,points:s}=n,{coords:o,closedPolygon:u}=n.graphState,{strings:d,locale:m}=pe(),{interactiveColor:p}=$(),h=v.useId(),g=h+"-points-num",y=h+"-points",f=Array(s.length).fill("off"),[b,A]=v.useState(f);if(u){const j={...n,numSides:o.length};return l.jsx(Ts,{...j})}const{graphDimensionsInPixels:P}=e,T=P[0],C=P[1],O=o.length===0,{srPolygonGraph:S,srPolygonGraphPointsNum:E,srPolygonGraphPoints:N}=br(n.graphState,{strings:d,locale:m},n.graphConfig.markings);return l.jsxs("g",{"aria-label":O?d.srUnlimitedPolygonEmpty:S,"aria-describedby":`${g} ${y}`,children:[l.jsx(al,{points:[...s],color:p,svgPolylineProps:{strokeWidth:"var(--movable-line-stroke-weight)",style:{fill:"transparent"},"aria-hidden":!0}}),l.jsx("rect",{"aria-hidden":!0,style:{fill:"rgba(0,0,0,0)",cursor:"crosshair"},width:T,height:C,x:t,y:a,onClick:j=>{const L=j.currentTarget.getBoundingClientRect(),Q=j.clientX-L.x,K=j.clientY-L.y,z=xi([[Q,K]],e);r(M.polygon.addPoint(z[0]))}}),o.map((j,L)=>{const Q=`${h}-angle-${L}`;let K="";const ce=L>0&&L<o.length-1?Mi(s,L):null,se=ce?Cs(ce):null,X=Li(s,L,!0);for(let B=0;B<X.length;B++)K+=`${h}-point-${L}-side-${B} `;return l.jsxs("g",{children:[l.jsx(be,{ariaDescribedBy:`${Q} ${K}`,ariaLive:b[L],point:j,sequenceNumber:L+1,onMove:B=>r(M.polygon.movePoint(L,B)),ref:B=>{i.current[L]=B},onFocus:()=>{r(M.polygon.focusPoint(L));const B=[...f];B[L]="polite",A([...B])},onClick:()=>{L===0&&hr(o).length>=3&&r(M.polygon.closePolygon()),r(M.polygon.clickPoint(L))}}),se&&l.jsx(H,{id:Q,children:Number.isInteger(se)?d.srPolygonPointAngle({angle:se}):d.srPolygonPointAngleApprox({angle:k(se,m,1)})}),X.map(({pointIndex:B,sideLength:he},Ae)=>l.jsx(H,{id:`${h}-point-${L}-side-${Ae}`,children:Gt(he,B,d,m)},`${h}-point-${L}-side-${Ae}`))]},"point-"+L)}),o.length>0&&l.jsx(H,{id:g,children:E}),N&&l.jsx(H,{id:y,children:N})]})};function Ip(n){return n.map((r,e)=>{const t=n[(e+1)%n.length];return[r,t]})}const bt=n=>{const r=e=>(n==null?void 0:n.matches(e))??!1;try{return r(":focus-visible")}catch{return r(":focus")}};function Np(n,r,e){return br(n,r,e).srPolygonInteractiveElements}function br(n,r,e){const{strings:t,locale:a}=r,{coords:i}=n,s=e==="axes"||e==="graph",o=i.length===1,u=s?t.srPolygonGraphCoordinatePlane:t.srPolygonGraph,d=o?t.srPolygonGraphPointsOne:t.srPolygonGraphPointsNum({num:i.length});let m;s&&(m=i.map((y,f)=>t.srPointAtCoordinates({num:f+1,x:k(y[0],a),y:k(y[1],a)})).join(" "));const p=o?t.srPolygonElementsOne:t.srPolygonElementsNum({num:i.length}),h=i.length>0?t.srInteractiveElements({elements:[p,m].join(" ")}):null;return{srPolygonGraph:u,srPolygonGraphPointsNum:d,srPolygonGraphPoints:m,srPolygonElementsNum:p,srPolygonInteractiveElements:h}}function Sp(n,r,e,t,a){switch(a){case"grid":return i=>le(t,i);case"sides":return jp(n,r,e);case"angles":return Ep(n,r,e);default:throw new ve(a)}}function Op(n,r){switch(r){case"grid":return e=>le(n,e);case"sides":case"angles":return e=>e;default:throw new ve(r)}}function jp(n,r,e){const t=[...n],a=t[r],i=s=>{let o=s(a),u=a;for(;u[0]===a[0]&&u[1]===a[1]&&fi({range:e,point:o});)u=As(o,e,t,r,a),o=s(o);return u};return{up:i(s=>x.add(s,[0,1])),down:i(s=>x.sub(s,[0,1])),left:i(s=>x.sub(s,[1,0])),right:i(s=>x.add(s,[1,0]))}}function Ep(n,r,e){const t=[...n],a=t[r],i=s=>{let o=_e({snapStep:[0,0],range:e,point:s(a)}),u=a;for(;u[0]===a[0]&&u[1]===a[1]&&fi({range:e,point:o});)u=Ps(o,e,t,r,a),o=s(o);return u};return{up:i(s=>x.add(s,[0,.1])),down:i(s=>x.sub(s,[0,.1])),left:i(s=>x.sub(s,[.1,0])),right:i(s=>x.add(s,[.1,0]))}}function Mp(n,r,e){return{graph:l.jsx(Lp,{graphState:n,dispatch:r}),interactiveElementsDescription:Dp(n,e)}}function Lp(n){const{dispatch:r,graphState:e}=n,{coords:t,snapStep:a}=e,{interactiveColor:i}=$(),{strings:s,locale:o}=pe(),u=v.useId(),d=u+"-direction",m=u+"-vertex",p=u+"-intercepts",h=v.useRef([0,0,0]),g=Rs(t);g!==void 0&&(h.current=g);const[y,f,b]=h.current,A=E=>(y*E+f)*E+b,{srQuadraticGraph:P,srQuadraticDirection:T,srQuadraticVertex:C,srQuadraticXIntercepts:O,srQuadraticYIntercept:S}=Is(e,{strings:s,locale:o});return l.jsxs("g",{"aria-label":P,"aria-describedby":`${d} ${m} ${p}`,children:[l.jsx(Bn.OfX,{y:A,color:i,svgPathProps:{"aria-hidden":!0}}),t.map((E,N)=>{const j=Md(N+1,E,s,o),L=C?` ${C}`:"";return l.jsx(be,{ariaLabel:`${j}${L}`,point:E,sequenceNumber:N+1,constrain:Fp(t,a,N),onMove:Q=>r(M.quadratic.movePoint(N,Q))},"point-"+N)}),T&&l.jsx(H,{id:d,children:T}),C&&l.jsx(H,{id:m,children:C}),l.jsx(H,{id:p,children:O?`${O} ${S}`:`${S}`})]})}const Rs=n=>{const r=n[0],e=n[1],t=n[2],a=(r[0]-e[0])*(r[0]-t[0])*(e[0]-t[0]);if(a===0)return;const i=(t[0]*(e[1]-r[1])+e[0]*(r[1]-t[1])+r[0]*(t[1]-e[1]))/a,s=(t[0]*t[0]*(r[1]-e[1])+e[0]*e[0]*(t[1]-r[1])+r[0]*r[0]*(e[1]-t[1]))/a,o=(e[0]*t[0]*(e[0]-t[0])*r[1]+t[0]*r[0]*(t[0]-r[0])*e[1]+r[0]*e[0]*(r[0]-e[0])*t[1])/a;return[i,s,o]};function Dp(n,r){return Is(n,r).srQuadraticInteractiveElements}function Is(n,r){const{strings:e,locale:t}=r,a=Rs(n.coords),[i,s,o]=a??[0,0,0],u=[-s/(2*i),o-s*s/(4*i)],d=Ld(i,s,o),m=e.srQuadraticGraph,p=e.srQuadraticFaceUp,h=e.srQuadraticFaceDown,g=i===0?void 0:i>0?p:h,y=i!==0?Ed(u,e):void 0,f=d.length===2?e.srQuadraticTwoXIntercepts({intercept1:k(d[0],t),intercept2:k(d[1],t)}):d.length===1?e.srQuadraticOneXIntercept({intercept:k(d[0],t)}):void 0,b=e.srQuadraticYIntercept({intercept:k(o,t)}),A=e.srInteractiveElements({elements:e.srQuadraticInteractiveElements({point1X:k(n.coords[0][0],t),point1Y:k(n.coords[0][1],t),point2X:k(n.coords[1][0],t),point2Y:k(n.coords[1][1],t),point3X:k(n.coords[2][0],t),point3Y:k(n.coords[2][1],t)})});return{srQuadraticGraph:m,srQuadraticDirection:g,srQuadraticVertex:y,srQuadraticXIntercepts:f,srQuadraticYIntercept:b,srQuadraticInteractiveElements:A}}const Fp=(n,r,e)=>{const t=[n[0],n[1],n[2]],a=t[e],i=s=>{let o=s(a);return t[e]=o,fa(t)||(o=s(o),t[e]=o,fa(t))?o:s(o)};return{up:x.add(a,[0,r[1]]),down:x.sub(a,[0,r[1]]),left:i(s=>x.sub(s,[r[0],0])),right:i(s=>x.add(s,[r[0],0]))}},fa=n=>{const r=n[0],e=n[1],t=n[2];return!(r[0]===e[0]||e[0]===t[0]||r[0]===t[0])};function Wp(n,r,e){return{graph:l.jsx(Gp,{graphState:n,dispatch:r}),interactiveElementsDescription:_p(n,e)}}const Gp=n=>{const{dispatch:r}=n,{coords:e}=n.graphState,t=y=>r(M.ray.moveRay(y)),a=(y,f)=>r(M.ray.movePoint(y,f)),{strings:i,locale:s}=pe(),u=v.useId()+"-points",{srRayGraph:d,srRayPoints:m,srRayEndpoint:p,srRayTerminalPoint:h,srRayGrabHandle:g}=Ns(n.graphState,{strings:i,locale:s});return l.jsxs("g",{"aria-label":d,"aria-describedby":u,children:[l.jsx(En,{points:e,ariaLabels:{point1AriaLabel:p,point2AriaLabel:h,grabHandleAriaLabel:g},onMoveLine:t,onMovePoint:a,extend:{start:!1,end:!0}}),l.jsx(H,{id:u,children:m})]})};function _p(n,r){return Ns(n,r).srRayInteractiveElement}function Ns(n,r){const{coords:e}=n,{strings:t,locale:a}=r,i=t.srRayGraph,s=t.srRayPoints({point1X:k(e[0][0],a),point1Y:k(e[0][1],a),point2X:k(e[1][0],a),point2Y:k(e[1][1],a)}),o=t.srRayEndpoint({x:k(e[0][0],a),y:k(e[0][1],a)}),u=t.srRayTerminalPoint({x:k(e[1][0],a),y:k(e[1][1],a)}),d=t.srRayGrabHandle({point1X:k(e[0][0],a),point1Y:k(e[0][1],a),point2X:k(e[1][0],a),point2Y:k(e[1][1],a)}),m=t.srInteractiveElements({elements:[i,s].join(" ")});return{srRayGraph:i,srRayPoints:s,srRayEndpoint:o,srRayTerminalPoint:u,srRayGrabHandle:d,srRayInteractiveElement:m}}function Vp(n,r,e){return{graph:l.jsx(Hp,{graphState:n,dispatch:r}),interactiveElementsDescription:$p(n,e)}}const Hp=({dispatch:n,graphState:r})=>{const{coords:e}=r,{strings:t,locale:a}=pe(),i=v.useId(),s=i+"-length",o=i+"-whole-graph";function u(){return(e==null?void 0:e.length)>1?t.srMultipleSegmentGraphAriaLabel({countOfSegments:e.length}):t.srSingleSegmentGraphAriaLabel}const d=u();function m(g,y){return e.length===1?t.srSingleSegmentLabel({point1X:k(e[0][0][q],a),point1Y:k(e[0][0][R],a),point2X:k(e[0][1][q],a),point2Y:k(e[0][1][R],a)}):t.srMultipleSegmentIndividualLabel({point1X:k(g[0][q],a),point1Y:k(g[0][R],a),point2X:k(g[1][q],a),point2Y:k(g[1][R],a),indexOfSegment:y+1})}function p(){return e.map((g,y)=>m(g,y)).join(" ")}function h(g,y,f,b){const A={endpointNumber:g,x:k(y,a),y:k(f,a)};return e.length>1?t.srMultipleSegmentGraphEndpointAriaLabel({...A,indexOfSegment:b}):t.srSingleSegmentGraphEndpointAriaLabel(A)}return l.jsxs("g",{"aria-label":d,"aria-describedby":`${o} ${e.length===1&&s}`,children:[e==null?void 0:e.map((g,y)=>l.jsxs("g",{"aria-label":e.length===1?void 0:m(g,y),"aria-describedby":e.length===1?void 0:s,children:[l.jsx(En,{points:g,onMoveLine:f=>{n(M.segment.moveLine(y,f))},onMovePoint:(f,b)=>{n(M.segment.movePointInFigure(y,f,b))},ariaLabels:{point1AriaLabel:h(1,g[0][q],g[0][R],y+1),point2AriaLabel:h(2,g[1][q],g[1][R],y+1),grabHandleAriaLabel:t.srSegmentGrabHandle({point1X:k(g[0][q],a),point1Y:k(g[0][R],a),point2X:k(g[1][q],a),point2Y:k(g[1][R],a)})}},y),l.jsx(H,{id:s,children:t.srSegmentLength({length:k(Up(g),a)})})]},`${i}-${y}`)),l.jsx(H,{id:o,children:p()})]})};function Up(n){return Oo(...n)}function $p(n,r){const{strings:e,locale:t}=r,a=n.coords.map(([i,s],o)=>e.srMultipleSegmentIndividualLabel({point1X:k(i[q],t),point1Y:k(i[R],t),point2X:k(s[q],t),point2Y:k(s[R],t),indexOfSegment:o+1}));return e.srInteractiveElements({elements:a.join(" ")})}function Xp(n,r,e){return{graph:l.jsx(Yp,{graphState:n,dispatch:r}),interactiveElementsDescription:Jp(n,e)}}function Yp(n){const{dispatch:r,graphState:e}=n,{interactiveColor:t}=$(),a=pe(),s=v.useId()+"-description",{coords:o,snapStep:u}=e,d=v.useRef({amplitude:1,angularFrequency:1,phase:1,verticalOffset:0}),m=Kp(o);m!==void 0&&(d.current=m);const{srSinusoidGraph:p,srSinusoidDescription:h,srSinusoidRootPoint:g,srSinusoidPeakPoint:y}=Ss(e,a);return l.jsxs("g",{"aria-label":p,"aria-describedby":s,children:[l.jsx(Bn.OfX,{y:f=>Bp(f,d.current),color:t,svgPathProps:{"aria-hidden":!0}}),o.map((f,b)=>l.jsx(be,{ariaLabel:b===0?g:y,point:f,sequenceNumber:b+1,constrain:zp(o,u,b),onMove:A=>r(M.sinusoid.movePoint(b,A))},"point-"+b)),l.jsx(H,{id:s,children:h})]})}const zp=(n,r,e)=>{const t=n[e],a=n[1-e],i=s=>{let o=s(t);return o[q]===a[q]&&(o=s(o)),o};return{up:i(s=>x.add(s,[0,r[1]])),down:i(s=>x.sub(s,[0,r[1]])),left:i(s=>x.sub(s,[r[0],0])),right:i(s=>x.add(s,[r[0],0]))}},Bp=function(n,r){const{amplitude:e,angularFrequency:t,phase:a,verticalOffset:i}=r;return e*Math.sin(t*n-a)+i},Kp=n=>{const r=n[0],e=n[1];if(e[q]===r[q])return;const t=e[R]-r[R],a=Math.PI/(2*(e[q]-r[q])),i=r[q]*a,s=r[R];return{amplitude:t,angularFrequency:a,phase:i,verticalOffset:s}};function Jp(n,r){return Ss(n,r).srSinusoidInteractiveElements}function Ss(n,r){const{strings:e,locale:t}=r,{coords:a}=n,[i,s]=a,o=Math.abs(s[q]-i[q]),u=Math.abs(s[R]-i[R]),d={x:k(i[q],t),y:k(i[R],t)},m={x:k(s[q],t),y:k(s[R],t)},p=e.srSinusoidGraph,h=e.srSinusoidDescription({minValue:k(i[R]-u,t),maxValue:k(i[R]+u,t),cycleStart:k(i[q]-2*o,t),cycleEnd:k(i[q]+2*o,t)}),g=e.srSinusoidRootPoint(d),y=s[R]===i[R]?e.srSinusoidFlatPoint(m):s[R]>i[R]?e.srSinusoidMaxPoint(m):e.srSinusoidMinPoint(m),f=e.srInteractiveElements({elements:e.srSinusoidInteractiveElements({point1X:k(i[q],t),point1Y:k(i[R],t),point2X:k(s[q],t),point2Y:k(s[R],t)})});return{srSinusoidGraph:p,srSinusoidDescription:h,srSinusoidRootPoint:g,srSinusoidPeakPoint:y,srSinusoidInteractiveElements:f}}const{calculateAngleInDegrees:ba,convertDegreesToRadians:Qp}=We,Zp="https://cdn.kastatic.org/images/perseus/protractor.svg",_n=[-195,-190],$t=[-201,-15];function Os(){const n=Pe().staticUrl,{range:r,snapStep:e}=$(),[[t,a],[i,s]]=r,o=[ea(t,a,.5),ea(i,s,.25)],[u,d]=v.useState(o),[m,p]=v.useState($t),h=v.useRef(null),{dragging:g}=mn({gestureTarget:h,onMove:d,point:u,constrainKeyboardMovement:P=>_e({snapStep:e,range:r,point:P})}),y=v.useRef(null);rc({gestureTarget:y,onMove:p,point:m,constrain:tc});const[f]=ee(u),b=x.add(f,_n),A=ba(m)-ba($t);return l.jsxs("g",{ref:h,transform:`translate(${b[q]}, ${b[R]}), rotate(${A})`,style:{transformOrigin:`${-_n[q]}px ${-_n[R]}px`,cursor:g?"grabbing":"grab"},children:[l.jsx("image",{href:n(Zp)}),l.jsx("g",{transform:`translate(5, ${-_n[1]})`,ref:y,children:l.jsx(ec,{})})]})}function ec(){const e=Qp(10),t=175*(1-Math.cos(e)),a=175*-Math.sin(e),i=Ft().move(0,0).circularArc(175,t,a,{sweep:!0}).build(),s=Ft().move(-8,0).line(0,10).line(8,0).build(),o=cr/2;return l.jsxs("g",{className:"protractor-rotation-handle",children:[l.jsx("path",{className:"protractor-rotation-handle-arrow-arc",d:i}),l.jsx("path",{className:"protractor-rotation-handle-arrowhead",d:s}),l.jsx("path",{className:"protractor-rotation-handle-arrowhead",d:s,transform:`translate(${t}, ${a}), rotate(190)`}),l.jsx("ellipse",{cx:"0px",cy:"-15px",rx:o,ry:o,fill:"none"})]})}const nc=x.mag($t);function tc(n){return x.withMag(n,nc)}function rc(n){const{gestureTarget:r,onMove:e,point:t,constrain:a=s=>s}=n,i=v.useRef([0,0]);_a(s=>{const{event:o,first:u,movement:d}=s;o==null||o.stopPropagation(),u&&(i.current=t),x.mag(d)!==0&&(e==null||e(a(x.add(i.current,d))))},{target:r,eventOptions:{passive:!1}})}Os.__docgenInfo={description:"",methods:[],displayName:"Protractor"};const Xt=n=>{const{state:r,dispatch:e,labels:t,labelLocation:a,readOnly:i,fullGraphAriaLabel:s,fullGraphAriaDescription:o}=n,{type:u}=r,[d,m]=n.box,p=n.step,h=v.useId(),g=`interactive-graph-description-${h}`,y=`interactive-graph-interactive-elements-description-${h}`,f=`unlimited-graph-keyboard-prompt-${h}`,b=`instructions-${h}`,A=v.useRef(null),{analytics:P}=er(),{viewboxX:T,viewboxY:C}=dc(r.range,d,m),O=`${T} ${C} ${d} ${m}`,S={width:d,height:m,viewBox:O,preserveAspectRatio:"xMidYMin",x:T,y:C},E=pe(),{strings:N}=E,j=me(r)&&r.showKeyboardInteractionInvitation;fo(()=>{P.onAnalyticsEvent({type:"perseus:interactive-graph-widget:rendered",payload:{type:u,widgetType:"INTERACTIVE_GRAPH",widgetId:"interactive-graph"}}),P.onAnalyticsEvent({type:"perseus:widget:rendered:ti",payload:{widgetSubType:u,widgetType:"INTERACTIVE_GRAPH",widgetId:"interactive-graph"}})});const{graph:L,interactiveElementsDescription:Q}=mc({state:r,dispatch:e,i18n:E,markings:n.markings}),K=i||!!n.static;return l.jsx(bi.Provider,{value:{range:r.range,snapStep:r.snapStep,markings:n.markings,tickStep:p,gridStep:n.gridStep,showTooltips:!!n.showTooltips,graphDimensionsInPixels:n.box,width:d,height:m,labels:t,labelLocation:a,disableKeyboardInteraction:K,interactiveColor:K?"var(--static-gray)":"var(--mafs-blue)"},children:l.jsxs(U,{className:"mafs-graph-container",children:[l.jsxs(U,{className:"mafs-graph",style:{position:"relative",padding:"25px 25px 0 0",boxSizing:"content-box",marginLeft:"20px",marginBottom:"30px",pointerEvents:n.static?"none":"auto",userSelect:"none",width:d,height:m},onKeyUp:z=>{uc(z,r,e)},"aria-label":s,"aria-describedby":pc(o&&g,Q&&y,me(r)&&f,r.type!=="none"&&!K&&b),ref:A,tabIndex:0,onFocus:z=>{oc(z,r,e)},onBlur:z=>{lc(z,r,e)},children:[o&&l.jsx(U,{id:g,tabIndex:-1,className:"mafs-sr-only",children:o}),Q&&l.jsx(U,{id:y,tabIndex:-1,className:"mafs-sr-only",children:Q}),r.type!=="none"&&l.jsx(U,{id:b,tabIndex:-1,className:"mafs-sr-only",children:me(r)?N.srUnlimitedGraphInstructions:N.srGraphInstructions}),l.jsx(Ii,{box:n.box,backgroundImage:n.backgroundImage}),l.jsxs(U,{style:{position:"absolute",bottom:0,left:0},children:[(n.markings==="graph"||n.markings==="axes")&&l.jsx(l.Fragment,{children:l.jsx(Ai,{i18n:E})}),l.jsx(U,{"aria-hidden":!(n.lockedFigures&&n.lockedFigures.length>0),children:l.jsxs(jr,{preserveAspectRatio:!1,viewBox:{x:r.range[q],y:r.range[R],padding:0},pan:!1,zoom:!1,width:d,height:m,children:[l.jsx(os,{}),l.jsx("svg",{...S,children:l.jsx(Ri,{gridStep:n.gridStep,range:r.range,containerSizeClass:n.containerSizeClass,markings:n.markings,width:d,height:m})}),(n.markings==="graph"||n.markings==="axes")&&l.jsxs(l.Fragment,{children:[l.jsx(Ti,{}),l.jsx(qi,{})]}),n.lockedFigures&&n.lockedFigures.length>0&&l.jsx("svg",{...S,children:l.jsx(_i,{lockedFigures:n.lockedFigures,range:r.range})})]})}),n.lockedFigures&&l.jsx(Sd,{lockedFigures:n.lockedFigures}),l.jsx(U,{style:{position:"absolute"},children:l.jsx(jr,{preserveAspectRatio:!1,viewBox:{x:r.range[q],y:r.range[R],padding:0},pan:!1,zoom:!1,width:d,height:m,children:l.jsxs("svg",{...S,children:[n.showProtractor&&l.jsx(Os,{}),L]})})})]}),j&&l.jsx(U,{style:{display:j?void 0:"hidden",textAlign:"center",backgroundColor:"white",border:"1px solid #21242C52",padding:"16px 0",boxShadow:"0px 8px 8px 0px #21242C14",top:"50%",transform:"translateY(-50%)"},children:l.jsx(Ea,{id:f,children:N.graphKeyboardPrompt})})]}),sc({state:r,dispatch:e,width:d,perseusStrings:N})]})})},ac=n=>{const{interactionMode:r,showRemovePointButton:e,focusedPointIndex:t}=n.state,{perseusStrings:a}=n,i=e&&t!==null;return l.jsxs(U,{style:{flexDirection:"row",width:n.width},children:[r==="keyboard"&&l.jsx(fe,{kind:"secondary",style:{width:"100%",marginLeft:"20px"},tabIndex:0,onClick:()=>{n.dispatch(M.pointGraph.addPoint([0,0]))},children:a.addPoint}),r==="mouse"&&l.jsx(fe,{id:Pi,kind:"secondary",color:"destructive",tabIndex:-1,style:{width:"100%",marginLeft:"20px",visibility:i?"visible":"hidden"},onClick:s=>{n.dispatch(M.pointGraph.removePoint(n.state.focusedPointIndex))},children:a.removePoint})]})},ic=n=>{const{interactionMode:r,showRemovePointButton:e,focusedPointIndex:t,closedPolygon:a,coords:i}=n.state,{perseusStrings:s}=n,o=e&&t!==null,u=hr(i).length<3,d=a?l.jsx(fe,{kind:"secondary",style:{width:"100%",marginLeft:"20px"},tabIndex:0,onClick:()=>{n.dispatch(M.polygon.openPolygon())},children:s.openPolygon}):l.jsx(fe,{kind:"secondary",disabled:u,style:{width:"100%",marginLeft:"20px"},tabIndex:u?-1:0,onClick:()=>{n.dispatch(M.polygon.closePolygon())},children:s.closePolygon});return l.jsx(l.Fragment,{children:l.jsxs(U,{style:{flexDirection:"row",width:n.width},children:[r==="keyboard"&&l.jsx(fe,{kind:"secondary",style:{width:"100%",marginLeft:"20px"},disabled:a,tabIndex:a?-1:0,onClick:()=>{n.dispatch(M.polygon.addPoint([0,0]))},children:s.addPoint}),r==="mouse"&&l.jsx(fe,{id:Pi,kind:"secondary",color:"destructive",disabled:a||!o,tabIndex:-1,style:{width:"100%",marginLeft:"20px"},onClick:m=>{n.dispatch(M.polygon.removePoint(n.state.focusedPointIndex))},children:s.removePoint}),d]})})},sc=n=>{const{state:r,dispatch:e,width:t,perseusStrings:a}=n,{type:i}=r;switch(i){case"point":return r.numPoints==="unlimited"?ac({state:r,dispatch:e,width:t,perseusStrings:a}):null;case"polygon":return r.numSides==="unlimited"?ic({state:r,dispatch:e,width:t,perseusStrings:a}):null;default:return null}};function oc(n,r,e){me(r)&&n.target.classList.contains("mafs-graph")&&r.interactionMode==="mouse"&&e(M.global.changeKeyboardInvitationVisibility(!0))}function lc(n,r,e){me(r)&&e(M.global.changeKeyboardInvitationVisibility(!1))}function uc(n,r,e){var t;me(r)&&(n.key==="Backspace"||n.key==="Delete"?((t=document.activeElement)!=null&&t.classList.contains("movable-point__focusable-handle")&&(r.type==="point"||r.type==="polygon"&&!r.closedPolygon)&&e(M.global.deleteIntent()),document.activeElement.blur()):n.shiftKey&&n.key==="Enter"?e(M.global.changeInteractionMode("keyboard")):r.interactionMode==="keyboard"&&n.key==="a"&&e(M.pointGraph.addPoint([0,0])))}const va=n=>{const[r,e]=n;return Math.abs(e-r)},dc=(n,r,e)=>{let t=0;const a=va(n[q]),i=r/a,s=n[q][re];s>0&&(t=i*Math.abs(s)),s<0&&(t=-i*Math.abs(s));let o=-e;const u=va(n[R]),d=e/u,m=n[R][re];return m>0&&(o=-e-d*Math.abs(m)),m<0&&(o=d*Math.abs(m)-e),{viewboxX:t,viewboxY:o}},mc=n=>{const{state:r,dispatch:e,i18n:t,markings:a}=n,{type:i}=r;switch(i){case"angle":return lm(r,e,t);case"segment":return Vp(r,e,t);case"linear-system":return Tm(r,e,t);case"linear":return Pm(r,e,t);case"ray":return Wp(r,e,t);case"polygon":return Cp(r,e,t,a);case"point":return Nm(r,e,t);case"circle":return wm(r,e,t);case"quadratic":return Mp(r,e,t);case"sinusoid":return Xp(r,e,t);case"none":return{graph:null,interactiveElementsDescription:null};default:throw new ve(i)}};function pc(...n){return n.filter(Boolean).join(" ")||void 0}Xt.__docgenInfo={description:"",methods:[],displayName:"MafsGraph",props:{box:{required:!0,tsType:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},description:""},backgroundImage:{required:!1,tsType:{name:'intersection["backgroundImage"]',raw:'InteractiveGraphProps["backgroundImage"]'},description:""},lockedFigures:{required:!1,tsType:{name:'intersection["lockedFigures"]',raw:'InteractiveGraphProps["lockedFigures"]'},description:""},step:{required:!0,tsType:{name:'intersection["step"]',raw:'InteractiveGraphProps["step"]'},description:""},gridStep:{required:!0,tsType:{name:"tuple",raw:"[x: number, y: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:""},containerSizeClass:{required:!0,tsType:{name:'intersection["containerSizeClass"]',raw:'InteractiveGraphProps["containerSizeClass"]'},description:""},markings:{required:!0,tsType:{name:'intersection["markings"]',raw:'InteractiveGraphProps["markings"]'},description:""},showTooltips:{required:!0,tsType:{name:"Required",elements:[{name:'intersection["showTooltips"]',raw:'InteractiveGraphProps["showTooltips"]'}],raw:'Required<InteractiveGraphProps["showTooltips"]>'},description:""},showProtractor:{required:!0,tsType:{name:"boolean"},description:""},labels:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},labelLocation:{required:!1,tsType:{name:'intersection["labelLocation"]',raw:'InteractiveGraphProps["labelLocation"]'},description:""},fullGraphAriaLabel:{required:!1,tsType:{name:'intersection["fullGraphAriaLabel"]',raw:'InteractiveGraphProps["fullGraphAriaLabel"]'},description:""},fullGraphAriaDescription:{required:!1,tsType:{name:'intersection["fullGraphAriaDescription"]',raw:'InteractiveGraphProps["fullGraphAriaDescription"]'},description:""},state:{required:!0,tsType:{name:"union",raw:`| AngleGraphState
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
| ChangeKeyboardInvitationVisibility`,elements:[{name:"Reinitialize"},{name:"MovePointInFigure"},{name:"MoveLine"},{name:"MoveAll"},{name:"MovePoint"},{name:"MoveCenter"},{name:"MoveRadiusPoint"},{name:"ChangeSnapStep"},{name:"ChangeRange"},{name:"AddPoint"},{name:"RemovePoint"},{name:"FocusPoint"},{name:"BlurPoint"},{name:"DeleteIntent"},{name:"ClickPoint"},{name:"ClosePolygon"},{name:"OpenPolygon"},{name:"ChangeInteractionMode"},{name:"ChangeKeyboardInvitationVisibility"}]}]},description:""},readOnly:{required:!0,tsType:{name:"boolean"},description:""},static:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""}}};function cc(n,r){switch(n.type){case"angle":return oe(r.type==="angle"),{...r,coords:n.coords};case"quadratic":return oe(r.type==="quadratic"),{...r,coords:n.coords};case"circle":return oe(r.type==="circle"),{...r,center:n.center,radius:ct(n)};case"linear":return oe(r.type==="linear"),{...r,coords:n.coords};case"ray":return oe(r.type==="ray"),{...r,coords:n.coords};case"sinusoid":return oe(r.type==="sinusoid"),{...r,coords:n.coords};case"segment":return oe(r.type==="segment"),{...r,coords:n.coords};case"linear-system":return oe(r.type==="linear-system"),{...r,coords:n.coords};case"polygon":return oe(r.type==="polygon"),{...r,coords:n.coords};case"point":return oe(r.type==="point"),{...r,coords:n.coords};case"none":return oe(r.type==="none"),{...r};default:throw new ve(n)}}const js=v.forwardRef((n,r)=>{const{onChange:e,graph:t}=n,[a,i]=v.useReducer(Jm,n,Ht);v.useImperativeHandle(r,()=>({getUserInput:()=>ym(a,t)}));const s=v.useRef(a);v.useEffect(()=>{s.current!==a&&e({graph:cc(a,t)}),s.current=a},[e,a,t]);const[o,u]=n.snapStep;v.useEffect(()=>{i(Xd([o,u]))},[i,o,u]);const[[d,m],[p,h]]=n.range;v.useEffect(()=>{i(Yd([[d,m],[p,h]]))},[i,d,m,p,h]);const g=t.type==="segment"?t.numSegments:null,y=t.type==="point"?t.numPoints:null,f=t.type==="polygon"?t.numSides:null,b=t.type==="polygon"?t.snapTo:null,A=t.type==="polygon"||t.type==="angle"?t.showAngles:null,P=t.type==="angle"?t.allowReflexAngles:null,T=t.type==="polygon"?t.showSides:null,C="startCoords"in t?t.startCoords:void 0,O=v.useRef(n),S=bo(n);return v.useEffect(()=>{S.current!==O.current&&i(zd(S.current))},[t.type,y,g,f,b,A,T,S,C,P]),n.static&&n.correct?l.jsx(Xt,{...n,state:Ht({...n,graph:n.correct}),dispatch:i}):l.jsx(Xt,{...n,state:a,dispatch:i})});js.__docgenInfo={description:"",methods:[{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:null}],displayName:"StatefulMafsGraph"};const{getClockwiseAngle:gc}=We,{getLineEquation:ka,getLineIntersectionString:hc,magnitude:yc,vector:wc}=ut,fc={url:null},xa="unlimited";function bc(n,r){return Math.floor((n[1]-n[0])/r)}const Qe=(n,r)=>new rn(`${n} called but current graph type is not a '${r}'`,Be.NotAllowed,{metadata:{graphType:r}});function vc(n){const r=n[0],e=n[1],t=e[1]-r[1],a=Math.PI/(2*(e[0]-r[0])),i=r[0]*a,s=r[1];return[t,a,i,s]}function kc(n){const r=n[0],e=n[1],t=n[2],a=(r[0]-e[0])*(r[0]-t[0])*(e[0]-t[0]);if(a===0)return;const i=(t[0]*(e[1]-r[1])+e[0]*(r[1]-t[1])+r[0]*(t[1]-e[1]))/a,s=(t[0]*t[0]*(r[1]-e[1])+e[0]*e[0]*(t[1]-r[1])+r[0]*r[0]*(e[1]-t[1]))/a,o=(e[0]*t[0]*(e[0]-t[0])*r[1]+t[0]*r[0]*(t[0]-r[0])*e[1]+r[0]*e[0]*(r[0]-e[0])*t[1])/a;return[i,s,o]}const F=class F extends v.Component{constructor(){super(...arguments);c(this,"mafsRef",v.createRef())}getUserInput(){var e;if((e=this.mafsRef.current)!=null&&e.getUserInput)return this.mafsRef.current.getUserInput();throw new rn("Cannot getUserInput from a graph that has never rendered",Be.NotAllowed)}getPromptJSON(){return md(this.props,this.getUserInput())}render(){var i;const e=Sa(this.props.containerSizeClass),t=this.props.gridStep||Z.getGridStep(this.props.range,this.props.step,e[0]),a=this.props.snapStep||Z.snapStepFromGridStep(t);return l.jsx(js,{...this.props,ref:this.mafsRef,gridStep:t,snapStep:a,box:e,showTooltips:!!this.props.showTooltips,readOnly:(i=this.props.apiOptions)==null?void 0:i.readOnly})}static getLineCoords(e,t){return e.coords||F.pointsFromNormalized(t,[[.25,.75],[.75,.75]])}static getPointCoords(e,t){const a=e.numPoints||1;let i=e.coords;if(i)return i;switch(a){case 1:i=[e.coord||[0,0]];break;case 2:i=[[-5,0],[5,0]];break;case 3:i=[[-5,0],[0,0],[5,0]];break;case 4:i=[[-6,0],[-2,0],[2,0],[6,0]];break;case 5:i=[[-6,0],[-3,0],[0,0],[3,0],[6,0]];break;case 6:i=[[-5,0],[-3,0],[-1,0],[1,0],[3,0],[5,0]];break;case xa:i=[];break}const s=[[-10,10],[-10,10]],o=F.normalizeCoords(i,s);return F.pointsFromNormalized(t,o)}static getLinearSystemCoords(e,t){return e.coords||w.map([[[.25,.75],[.75,.75]],[[.25,.25],[.75,.25]]],a=>F.pointsFromNormalized(t,a))}static getPolygonCoords(e,t){if(e.type!=="polygon")throw Qe("toggleShowSides","polygon");let a=e.coords;if(a)return a;const i=e.numSides||3;if(i===xa)a=[];else{const u=2*Math.PI/i,d=(1/i-1/2)*Math.PI,m=e.snapTo==="sides"?Math.sqrt(3)/3*7:4;a=w.times(i,function(p){return[m*Math.cos(p*u+d),m*Math.sin(p*u+d)]})}const s=[[-10,10],[-10,10]];a=F.normalizeCoords(a,s);const o=!w.contains(["angles","sides"],e.snapTo);return a=F.pointsFromNormalized(t,a,!o),a}static getSegmentCoords(e,t){const a=e.coords;if(a)return a;const i=e.numSegments||1,s={1:[5],2:[5,-5],3:[5,0,-5],4:[6,2,-2,-6],5:[6,3,0,-3,-6],6:[5,3,1,-1,-3,-5]}[i],o=[[-10,10],[-10,10]];return s.map(function(u){let d=[[-5,u],[5,u]];return d=F.normalizeCoords(d,o),d=F.pointsFromNormalized(t,d),d})}static getAngleCoords(e,t){let a=e.coords;if(a)return a;const i=e.snapDegrees||1;let s=i;for(;s<20;)s+=i;s=s*Math.PI/180;const o=(e.angleOffsetDeg||0)*Math.PI/180;a=F.pointsFromNormalized(t,[[.85,.5],[.5,.5]]);const u=yc(wc(...a));return a[0]=[a[1][0]+u*Math.cos(o),a[1][1]+u*Math.sin(o)],a[2]=[a[1][0]+u*Math.cos(s+o),a[1][1]+u*Math.sin(s+o)],a}static normalizeCoords(e,t){return w.map(e,function(a){return w.map(a,function(i,s){const o=t[s][1]-t[s][0];return(i+t[s][1])/o})})}static getEquationString(e){const t=e.graph.type;switch(t){case"none":return F.getNoneEquationString();case"linear":return F.getLinearEquationString(e);case"quadratic":return F.getQuadraticEquationString(e);case"sinusoid":return F.getSinusoidEquationString(e);case"circle":return F.getCircleEquationString(e);case"linear-system":return F.getLinearSystemEquationString(e);case"point":return F.getPointEquationString(e);case"segment":return F.getSegmentEquationString(e);case"ray":return F.getRayEquationString(e);case"polygon":return F.getPolygonEquationString(e);case"angle":return F.getAngleEquationString(e);default:throw new ve(t)}}static pointsFromNormalized(e,t,a){return w.map(t,function(i){return w.map(i,function(s,o){const u=e.range[o];if(a)return u[0]+(u[1]-u[0])*s;const d=e.step[o],m=bc(u,d),p=Math.round(s*m);return u[0]+d*p})})}static getNoneEquationString(){return""}static getLinearEquationString(e){const t=F.getLineCoords(e.graph,e);if(kt(t[0][0],t[1][0]))return"x = "+t[0][0].toFixed(3);const a=(t[1][1]-t[0][1])/(t[1][0]-t[0][0]),i=t[0][1]-a*t[0][0];return kt(a,0)?"y = "+i.toFixed(3):"y = "+a.toFixed(3)+"x + "+i.toFixed(3)}static getCurrentQuadraticCoefficients(e){const t=e.graph.coords||F.defaultQuadraticCoords(e);return kc(t)}static defaultQuadraticCoords(e){const t=[[.25,.75],[.5,.25],[.75,.75]];return F.pointsFromNormalized(e,t)}static getQuadraticEquationString(e){const t=F.getCurrentQuadraticCoefficients(e);return"y = "+t[0].toFixed(3)+"x^2 + "+t[1].toFixed(3)+"x + "+t[2].toFixed(3)}static getCurrentSinusoidCoefficients(e){const t=e.graph.coords||F.defaultSinusoidCoords(e);return vc(t)}static defaultSinusoidCoords(e){const t=[[.5,.5],[.65,.6]];return F.pointsFromNormalized(e,t)}static getSinusoidEquationString(e){const t=F.getCurrentSinusoidCoefficients(e);return"y = "+t[0].toFixed(3)+"sin("+t[1].toFixed(3)+"x - "+t[2].toFixed(3)+") + "+t[3].toFixed(3)}static getCircleEquationString(e){const t=e.graph,a=t.center||[0,0],i=t.radius||2;return"center ("+a[0]+", "+a[1]+"), radius "+i}static getLinearSystemEquationString(e){const t=F.getLinearSystemCoords(e.graph,e);return`
`+ka(t[0][0],t[0][1])+`
`+ka(t[1][0],t[1][1])+`
`+hc(t[0],t[1])}static getPointEquationString(e){if(e.graph.type!=="point")throw Qe("getPointEquationString","point");return F.getPointCoords(e.graph,e).map(function(a){return"("+a[0]+", "+a[1]+")"}).join(", ")}static getSegmentEquationString(e){if(e.graph.type!=="segment")throw Qe("getSegmentEquationString","segment");const t=F.getSegmentCoords(e.graph,e);return w.map(t,function(a){return"["+w.map(a,function(i){return"("+i.join(", ")+")"}).join(" ")+"]"}).join(" ")}static getRayEquationString(e){if(e.graph.type!=="ray")throw Qe("createPointForPolygonType","ray");const t=F.getLineCoords(e.graph,e),a=t[0],i=t[1];let s=F.getLinearEquationString(e);return a[0]>i[0]?s+=" (for x <= "+a[0].toFixed(3)+")":a[0]<i[0]?s+=" (for x >= "+a[0].toFixed(3)+")":a[1]>i[1]?s+=" (for y <= "+a[1].toFixed(3)+")":s+=" (for y >= "+a[1].toFixed(3)+")",s}static getPolygonEquationString(e){if(e.graph.type!=="polygon")throw Qe("getPolygonEquationString","polygon");const t=F.getPolygonCoords(e.graph,e);return w.map(t,function(a){return"("+a.join(", ")+")"}).join(" ")}static getAngleEquationString(e){if(e.graph.type!=="angle")throw Qe("getAngleEquationString","angle");const t=F.getAngleCoords(e.graph,e),a=e.graph.allowReflexAngles;return gc(t,a).toFixed(0)+"° angle at ("+t[1].join(", ")+")"}static getUserInputFromProps(e){return e.graph}};c(F,"defaultProps",{labels:["x","y"],range:[[-10,10],[-10,10]],step:[1,1],backgroundImage:fc,markings:"graph",showTooltips:!1,showProtractor:!1,graph:{type:"linear"}});let Yt=F;const xc=w.identity,qc={name:"interactive-graph",displayName:"Interactive graph",accessible:!0,widget:Yt,staticTransform:xc},Pc={fontFamily:"inherit",fontSize:15,fontWeight:"bold",lineHeight:"22px"},Ac=(n,r)=>{const e=n.markers.map(a=>({label:a.label})),t=r.markers.map(a=>({label:a.label,selected:a.selected}));return{type:"label-image",options:{choices:n.choices,imageUrl:n.imageUrl,imageAlt:n.imageAlt,markers:e},userInput:{markers:t}}},Ve=en.action.secondary.progressive,ht={color:{bg:{switch:{off:Ve.default.border,disabledOff:en.action.primary.disabled.background,activeOff:G.fadedOffBlack64,on:Ve.default.foreground,disabledOn:Ve.press.background,activeOn:Ve.press.foreground},slider:{on:en.icon.inverse,off:en.icon.inverse},icon:{on:Ve.default.foreground,disabledOn:Ve.press.background,off:Ve.default.border,disabledOff:en.icon.disabled}},outline:{default:en.focus.outer}},border:{radius:{small:ge.small_12,full:Do.radius.full}},size:{height:{none:0,medium:20,large:ge.large_24},width:{none:0,small:ge.xxxxSmall_2,medium:20,large:40},offset:{default:1}},spacing:{slider:{position:ge.xxxxSmall_2},icon:{position:ge.xxxSmall_4},transform:{default:`translateX(${ge.medium_16}px)`,transition:"transform 0.15s ease-in-out"}}},Cc=ll(ht,{color:{bg:{switch:{off:G.white50,disabledOff:G.white32,activeOff:G.white64,disabledOn:G.white32,on:G.white,activeOn:G.offWhite},slider:{off:G.eggplant,on:G.eggplant},icon:{on:G.white,off:G.white,disabledOff:G.white50,disabledOn:G.white50}},outline:{default:G.white}}}),Tc={default:ht,khanmigo:Cc},Es=ol(ht);function Rc(n){const r=v.useContext(sl),e=Tc[r]||ht;return v.createElement(Es.Provider,{value:e},n.children)}const Ic=ja("span"),Nc=ja("input"),Sc=v.forwardRef(function(r,e){const{"aria-label":t,"aria-labelledby":a,"aria-describedby":i,checked:s,disabled:o=!1,icon:u,id:d,onChange:m,testId:p}=r,h=v.useId(),g=d??h,{theme:y,themeName:f}=ul(Es),b=dl(Oc,y),A=()=>{!o&&m&&m(!s)},P=()=>{},T=jc(s,m!==void 0,o,y,f);let C;return u&&(C=v.cloneElement(u,{size:"small",style:[b.icon,T.icon],"aria-hidden":!0})),v.createElement(U,{onClick:A,style:[b.switch,T.switch,o&&b.disabled],testId:p},v.createElement(Nc,{"aria-describedby":i,"aria-label":t,"aria-labelledby":a,checked:s,"aria-disabled":o,id:g,onChange:P,ref:e,role:"switch",style:b.hidden,type:"checkbox"}),u&&C,v.createElement(Ic,{style:[b.slider,T.slider]}))}),Oc=n=>({hidden:{opacity:0,height:n.size.height.none,width:n.size.width.none},switch:{display:"inline-flex",height:n.size.height.large,width:n.size.width.large,borderRadius:n.border.radius.small,flexShrink:0,":hover":{outlineOffset:n.size.offset.default},":focus-within":{outline:`solid ${n.size.width.small}px ${n.color.outline.default}`,outlineOffset:n.size.offset.default}},disabled:{cursor:"not-allowed",":hover":{outline:"none"},":focus-within":{outline:`solid ${n.size.width.small}px ${n.color.outline.default}`,outlineOffset:n.size.offset.default}},slider:{position:"absolute",top:n.spacing.slider.position,left:n.spacing.slider.position,height:n.size.height.medium,width:n.size.width.medium,borderRadius:n.border.radius.full,backgroundColor:n.color.bg.slider.on,transition:n.spacing.transform.transition},icon:{position:"absolute",top:n.spacing.icon.position,left:n.spacing.icon.position,zIndex:1,transition:n.spacing.transform.transition}}),Vn={},jc=(n,r,e,t,a)=>{const i=`${n}-${r}-${e}-${a}`;if(Vn[i])return Vn[i];let s={};const o={cursor:r?"pointer":"auto",":hover":{outline:r?`solid ${t.size.width.small}px ${t.color.outline.default}`:"none"}};return n?s={switch:xt({backgroundColor:e?t.color.bg.switch.disabledOn:t.color.bg.switch.on,":active":{backgroundColor:!e&&r?t.color.bg.switch.activeOn:void 0}},o),slider:{transform:t.spacing.transform.default},icon:{color:e?t.color.bg.icon.disabledOn:t.color.bg.icon.on,transform:t.spacing.transform.default}}:s={switch:xt({backgroundColor:e?t.color.bg.switch.disabledOff:t.color.bg.switch.off,":active":{backgroundColor:!e&&r?t.color.bg.switch.activeOff:void 0}},o),slider:{backgroundColor:t.color.bg.slider.off},icon:{color:e?t.color.bg.icon.disabledOff:t.color.bg.icon.off}},Vn[i]=I.StyleSheet.create(s),Vn[i]},Ms=v.forwardRef(function(r,e){return v.createElement(Rc,null,v.createElement(Sc,xt({},r,{ref:e})))});Ms.displayName="Switch";const Ls=n=>{const r=v.useId(),e=v.useId(),{strings:t}=pe();return l.jsxs(U,{style:Ec.switchWrapper,children:[l.jsx(Ms,{id:r,checked:n.areAnswersHidden,onChange:n.onChange,"aria-labelledby":e}),l.jsx(Ea,{id:e,htmlFor:r,tag:"label",children:t.hideAnswersToggleLabel})]})},Ec=I.StyleSheet.create({switchWrapper:{display:"flex",flexDirection:"row",flexWrap:"wrap-reverse",alignItems:"center",gap:"0.5em",marginTop:"1em"}});Ls.__docgenInfo={description:"",methods:[],displayName:"HideAnswersToggle",props:{areAnswersHidden:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:'ReactComponentPropsWithoutRef["onChange"]',raw:'React.ComponentPropsWithoutRef<typeof Switch>["onChange"]'},description:""}}};const tn=class tn extends v.Component{constructor(e){super(e);c(this,"_markers");c(this,"_mounted",!1);this._markers=[],this.state={activeMarkerIndex:-1,markersInteracted:!1,hideAnswers:!1}}static pointInTriangle(e,t,a,i){const s=(m,p,h)=>(m.x-h.x)*(p.y-h.y)-(p.x-h.x)*(m.y-h.y),o=s(e,t,a)<0,u=s(e,a,i)<0,d=s(e,i,t)<0;return o===u&&u===d}static imageSideForMarkerPosition(e,t,a){if(a&&a!=="NONE"){if(a==="LEFT"&&e>20)return"right";if(a==="RIGHT"&&e<80)return"left";if(a==="UP"&&t>20)return"bottom";if(a==="DOWN"&&t<80)return"top"}if(e<20)return"left";if(e>80)return"right";const i={x:20,y:0},s={x:80,y:0},o={x:80,y:100},u={x:20,y:100},d={x:50,y:50},m={top:[i,s,d],right:[d,s,o],bottom:[u,d,o],left:[i,d,u]},p={x:e,y:t};for(const h of Object.keys(m)){const g=m[h];if(tn.pointInTriangle(p,...g))return h}return"center"}static navigateToMarkerIndex(e,t,a){const i=t[a],s=t.map((o,u)=>{const d=o.x-i.x,m=o.y-i.y,p=Math.sqrt(d**2+m**2);return{index:u,dist:p,dir:{x:p!==0?d/p:0,y:p!==0?m/p:0}}}).filter(o=>o.index===a?!1:t[o.index].showCorrectness!=="correct").sort((o,u)=>{const d=Math.round(o.dist*(e.x*o.dir.x+e.y*o.dir.y)),m=Math.round(u.dist*(e.x*u.dir.x+e.y*u.dir.y));let p,h;return e.x>0?(p=o.dir.x>0&&d!==0,h=u.dir.x>0&&m!==0):e.x<0?(p=o.dir.x<0&&d!==0,h=u.dir.x<0&&m!==0):e.y>0?(p=o.dir.y>0&&d!==0,h=u.dir.y>0&&m!==0):e.y<0&&(p=o.dir.y<0&&d!==0,h=u.dir.y<0&&m!==0),p!==h?p?-1:1:d-m});return s.length>0?s[0].index:a}componentDidMount(){this._mounted=!0}componentWillUnmount(){this._mounted=!1}getUserInput(){return{markers:this.props.markers.map(e=>({selected:e.selected,label:e.label}))}}getPromptJSON(){return Ac(this.props,this.getUserInput())}showRationalesForCurrentlySelectedChoices(){const{markers:e}=this.props,{onChange:t}=this.props,a=e.map(i=>{const s=Rr(i.selected,i.answers);return{...i,showCorrectness:s.hasAnswers?s.isCorrect?"correct":"incorrect":void 0}});t({markers:a},null,!0)}handleMarkerChange(e,t){const{markers:a,onChange:i}=this.props,s=[...a.slice(0,e),{...t,showCorrectness:void 0},...a.slice(e+1)];i({markers:s})}activateMarker(e,t){var i,s;(i=this.props.analytics)==null||i.onAnalyticsEvent({type:"perseus:label-image:marker-interacted-with",payload:null}),(s=this.props.analytics)==null||s.onAnalyticsEvent({type:"perseus:label-image:marker-interacted-with:ti",payload:null});const{activeMarkerIndex:a}=this.state;a!==e&&t?this.setState({activeMarkerIndex:e,markersInteracted:!0}):this.setState({activeMarkerIndex:-1})}handleMarkerKeyDown(e,t){const{markers:a}=this.props;if(a.length<2)return;const i={ArrowUp:{x:0,y:-1},ArrowRight:{x:1,y:0},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0}}[t.key];if(!i)return;t.preventDefault();const s=this._markers[tn.navigateToMarkerIndex(i,a,e)];s&&vn.findDOMNode(s).focus()}handleAnswerChoicesChangeForMarker(e,t){const{choices:a,markers:i}=this.props,s=a.filter((o,u)=>t[u]);this.handleMarkerChange(e,{...i[e],selected:s.length?s:void 0})}renderMarkers(){const{markers:e,questionCompleted:t,preferredPopoverDirection:a}=this.props,{activeMarkerIndex:i,markersInteracted:s}=this.state,o=this._mounted&&window.matchMedia(Pt.xsOrSmaller.replace("@media ","")).matches,u=this.props.imageWidth/2>this.props.imageHeight;return e.map((d,m)=>{let p,h;o||u?(p=d.y>50?"top":"bottom",h=d.y>50?"bottom":"top"):(h=tn.imageSideForMarkerPosition(d.x,d.y,a),h==="center"&&(h="bottom"),p={left:"right",top:"bottom",right:"left",bottom:"top"}[h]);const g=Rr(d.selected,d.answers),y=t&&g.hasAnswers&&g.isCorrect?"correct":d.showCorrectness,f=y==="correct",b={[`margin${h.charAt(0).toUpperCase()+h.slice(1)}`]:10},A=m===i,P=d.selected&&!A&&!this.state.hideAnswers;return l.jsx(U,{style:{position:"absolute",left:`${d.x}%`,top:`${d.y}%`,zIndex:"unset"},children:l.jsx(Qo,{choices:this.props.choices.map(T=>({content:T,checked:d.selected?d.selected.includes(T):!1})),multipleSelect:this.props.multipleAnswers,onChange:T=>{var C,O;(C=this.props.analytics)==null||C.onAnalyticsEvent({type:"perseus:label-image:choiced-interacted-with",payload:null}),(O=this.props.analytics)==null||O.onAnalyticsEvent({type:"perseus:label-image:choiced-interacted-with:ti",payload:null}),this.handleAnswerChoicesChangeForMarker(m,T)},onToggle:T=>this.activateMarker(m,T),disabled:f,opener:({opened:T})=>l.jsx(tr,{role:"button","aria-expanded":T,children:({hovered:C,focused:O,pressed:S})=>l.jsx(ml,{...d,showCorrectness:y,showSelected:T,showPulsate:!s,ref:E=>this._markers[m]=E,showAnswer:P,answerSide:p,answerStyles:b,analytics:this.props.analytics,focused:O||S,hovered:C})},`marker-${d.x}.${d.y}`)},`answers-${d.x}.${d.y}`)},m)})}renderInstructions(){const{apiOptions:{isMobile:e},choices:t,multipleAnswers:a,hideChoicesFromInstructions:i}=this.props,{strings:s}=this.context,o=e?a?s.tapMultiple:s.tapSingle:a?s.clickMultiple:s.clickSingle,u=s.choices;return l.jsxs("div",{className:Fe("perseus-label-image-widget-instructions",I.css(He.instructions)),children:[l.jsxs("div",{className:I.css(He.instructionsCaption),children:[o," ",!i&&u]}),!i&&l.jsx("div",{className:I.css(He.instructionsChoices),children:t.map((d,m)=>l.jsx("div",{className:I.css(He.instructionsChoice),children:l.jsx(Y,{content:d,strings:s})},m))})]})}render(){const{imageAlt:e,imageUrl:t,imageWidth:a,imageHeight:i}=this.props,{activeMarkerIndex:s}=this.state;return l.jsxs("div",{children:[this.renderInstructions(),l.jsxs("div",{className:I.css(He.markersCanvas),style:{maxWidth:a,maxHeight:i},children:[l.jsx("div",{className:I.css(He.imageContainer,s!==-1&&He.imageInteractionDisabled),children:l.jsx(rr.Consumer,{children:({setAssetStatus:o})=>l.jsx(jn,{alt:e,src:t,width:a,height:i,setAssetStatus:o})})}),this.renderMarkers()]}),l.jsx(Ls,{areAnswersHidden:this.state.hideAnswers,onChange:o=>{var u,d;(u=this.props.analytics)==null||u.onAnalyticsEvent({type:"perseus:label-image:toggle-answers-hidden",payload:null}),(d=this.props.analytics)==null||d.onAnalyticsEvent({type:"perseus:label-image:toggle-answers-hidden:ti",payload:null}),this.setState({hideAnswers:o})}})]})}};c(tn,"contextType",V);let nt=tn;const He=I.StyleSheet.create({instructions:{paddingBottom:16},instructionsCaption:{...Pc,paddingBottom:16},instructionsChoices:{display:"flex",flexWrap:"wrap",margin:"-8px 0"},instructionsChoice:{display:"flex",alignItems:"center",margin:"8px 0",":not(:last-child)":{"::after":{content:"''",display:"inline-block",position:"relative",width:2,height:2,marginLeft:5,marginRight:5,background:"rgba(33, 36, 44, 0.32)",borderRadius:2}}},markersCanvas:{position:"relative"},imageContainer:{display:"flex"},imageInteractionDisabled:{pointerEvents:"none"}}),Mc=v.forwardRef((n,r)=>{const e=er();return l.jsx(nt,{ref:r,analytics:e.analytics,...n})}),Lc={name:"label-image",displayName:"Label Image",widget:Mc,accessible:!0,isLintable:!0};nt.__docgenInfo={description:"",methods:[{name:"pointInTriangle",docblock:`Test whether point is contained within triangle.

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
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"selected",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}}]}}],raw:"UserInputMarker[]",required:!0}}]},required:!0}}]}}}},{name:"showRationalesForCurrentlySelectedChoices",docblock:null,modifiers:[],params:[],returns:null},{name:"handleMarkerChange",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"marker",optional:!1,type:{name:'intersection["markers"][number]',raw:'LabelImageProps["markers"][number]'}}],returns:null},{name:"activateMarker",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"opened",optional:!1,type:{name:"boolean"}}],returns:null},{name:"handleMarkerKeyDown",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"e",optional:!1,type:{name:"ReactKeyboardEvent",raw:"React.KeyboardEvent",alias:"React.KeyboardEvent"}}],returns:null},{name:"handleAnswerChoicesChangeForMarker",docblock:null,modifiers:[],params:[{name:"index",optional:!1,type:{name:"number"}},{name:"selection",optional:!1,type:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",alias:"ReadonlyArray"}}],returns:null},{name:"renderMarkers",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"ReadonlyArray<React.ReactNode>"}}},{name:"renderInstructions",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactNode",raw:"React.ReactNode"}}}],displayName:"LabelImage"};const Dc=(n,r)=>({type:"matcher",options:{labels:n.labels,left:n.left,right:n.right,orderMatters:n.orderMatters},userInput:{left:r.left,right:r.right}}),Fc="perseus-widget-matcher";class tt extends v.Component{constructor(){super(...arguments);c(this,"state",{leftHeight:0,rightHeight:0,texRendererLoaded:!1});c(this,"changeAndTrack",e=>{this.props.onChange(e),this.props.trackInteraction()});c(this,"onMeasureLeft",e=>{const t=w.max(e.heights);this.setState({leftHeight:t})});c(this,"onMeasureRight",e=>{const t=w.max(e.heights);this.setState({rightHeight:t})});c(this,"getUserInput",()=>this.state.texRendererLoaded?{left:this.refs.left.getOptions(),right:this.refs.right.getOptions()}:{left:[],right:[]});c(this,"moveLeftOptionToIndex",(e,t)=>{this.refs.left.moveOptionToIndex(e,t)});c(this,"moveRightOptionToIndex",(e,t)=>{this.refs.right.moveOptionToIndex(e,t)})}getPromptJSON(){return Dc(this.props,this.getUserInput())}render(){if(!this.state.texRendererLoaded){const{TeX:o}=Pe();return l.jsxs(l.Fragment,{children:[l.jsx(pl,{}),l.jsx("div",{style:{display:"none"},children:l.jsx(o,{onRender:()=>{this.setState({texRendererLoaded:!0})},children:"1"})})]})}const{left:e,right:t}=co(this.props),a=w.any(this.props.labels),i={height:w.max([this.state.leftHeight,this.state.rightHeight])},s=this.props.apiOptions.isMobile?8:5;return l.jsx("table",{className:I.css(ye.widget)+" "+Fc,children:l.jsxs("tbody",{children:[a&&l.jsxs("tr",{className:I.css(ye.row),children:[l.jsx("th",{className:I.css(ye.column,ye.columnLabel),children:l.jsx(Y,{content:this.props.labels[0]||"...",linterContext:this.props.linterContext,strings:this.context.strings})}),l.jsx("th",{className:I.css(ye.column,ye.columnRight,ye.columnLabel),children:l.jsx(Y,{content:this.props.labels[1]||"...",linterContext:this.props.linterContext,strings:this.context.strings})})]}),l.jsxs("tr",{className:I.css(ye.row),children:[l.jsx("td",{className:I.css(ye.column),children:l.jsx(Ct,{options:e,layout:"vertical",padding:this.props.padding,disabled:!this.props.orderMatters,constraints:i,onMeasure:this.onMeasureLeft,onChange:this.changeAndTrack,margin:s,linterContext:this.props.linterContext,ref:"left"})}),l.jsx("td",{className:I.css(ye.column,ye.columnRight),children:l.jsx(Ct,{options:t,layout:"vertical",padding:this.props.padding,constraints:i,onMeasure:this.onMeasureRight,onChange:this.changeAndTrack,margin:s,linterContext:this.props.linterContext,ref:"right"})})]})]})})}}c(tt,"contextType",V),c(tt,"defaultProps",{left:[],right:[],labels:["",""],orderMatters:!1,padding:!0,problemNum:0,onChange:function(){},linterContext:ae});const Hn=5,qa="1px solid #444",ye=I.StyleSheet.create({widget:{paddingTop:Hn,maxWidth:"100%",minWidth:"auto"},row:{border:0},column:{padding:0,border:0},columnRight:{borderLeft:qa},columnLabel:{fontWeight:"inherit",borderBottom:qa,padding:`0 ${Hn}px ${Hn}px ${Hn}px`,textAlign:"center"}}),Wc={name:"matcher",displayName:"Matcher (two column)",widget:tt,isLintable:!0};tt.__docgenInfo={description:"",methods:[{name:"changeAndTrack",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"onMeasureLeft",docblock:null,modifiers:[],params:[{name:"dimensions",optional:!1,type:null}],returns:null},{name:"onMeasureRight",docblock:null,modifiers:[],params:[{name:"dimensions",optional:!1,type:null}],returns:null},{name:"getUserInput",docblock:null,modifiers:[],params:[],returns:null},{name:"getPromptJSON",docblock:null,modifiers:[],params:[],returns:{type:{name:"signature",type:"object",raw:`{
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
}`,computed:!1}},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},left:{defaultValue:{value:"[]",computed:!1},required:!1},right:{defaultValue:{value:"[]",computed:!1},required:!1},labels:{defaultValue:{value:'["", ""]',computed:!1},required:!1},orderMatters:{defaultValue:{value:"false",computed:!1},required:!1},padding:{defaultValue:{value:"true",computed:!1},required:!1}}};const Gc=(n,r)=>({type:"matrix",options:{height:n.matrixBoardSize[0],width:n.matrixBoardSize[1]},userInput:{answerRows:r.answers}}),{assert:Ds}=nr,{stringArrayOfSize:_c}=Z,Vc={INPUT_MARGIN:3,INPUT_HEIGHT:30,INPUT_WIDTH:40},Hc={INPUT_MARGIN:4,INPUT_HEIGHT:36,INPUT_WIDTH:64};function xe(n,r){return[""+n,""+r]}const Pa=function(){return xe(0,0)},Fs=function(n){return Ds(w.isArray(n)&&n.length===2),+n[0]},Ws=function(n){return Ds(w.isArray(n)&&n.length===2),+n[1]},Ze=function(n){const r=Fs(n),e=Ws(n);return"answer"+r+","+e};class zt extends v.Component{constructor(){super(...arguments);c(this,"cursorPosition");c(this,"state",{enterTheMatrix:0});c(this,"getInputPaths",()=>{const e=[],t=this.props.matrixBoardSize[0],a=this.props.matrixBoardSize[1];return w(t).times(i=>{w(a).times(s=>{const o=xe(i,s);e.push(o)})}),e});c(this,"_handleFocus",(e,t)=>{this.props.onFocus(xe(e,t))});c(this,"_handleBlur",(e,t)=>{this.props.onBlur(xe(e,t))});c(this,"focus",()=>(this.focusInputPath(Pa()),!0));c(this,"focusInputPath",e=>{const t=Ze(e);this.refs[t].focus()});c(this,"blurInputPath",e=>{e.length===0&&(e=Pa());const t=Ze(e);this.refs[t].blur()});c(this,"setInputValue",(e,t,a)=>{const i=Fs(e),s=Ws(e);this.onValueChange(i,s,t,a)});c(this,"handleKeyDown",(e,t,a)=>{const i=this.props.matrixBoardSize[0],s=this.props.matrixBoardSize[1];let o=null;const u=this.refs[Ze(xe(e,t))],d=u.getStringValue(),m=u.getSelectionStart(),p=u.getSelectionEnd();let h=null;if(a.key==="ArrowUp"&&e>0?h=xe(e-1,t):a.key==="ArrowDown"&&e+1<i?h=xe(e+1,t):a.key==="ArrowLeft"&&t>0?m===0&&p===0&&(h=xe(e,t-1)):a.key==="ArrowRight"&&t+1<s?m===d.length&&(h=xe(e,t+1)):a.key==="Enter"?o=this.state.enterTheMatrix+1:a.key==="Escape"&&(o=0),h){a.preventDefault();const g=this.refs[Ze(h)],f=g.getStringValue().length*2;g.focus(),a.key==="ArrowRight"?g.setSelectionRange(0,0):g.setSelectionRange(f,f)}o!=null&&this.setState({enterTheMatrix:o})});c(this,"onValueChange",(e,t,a,i)=>{const s=this.props.answers.map(o=>[...o]);s[e]||(s[e]=[]),s[e][t]=a,this.props.onChange({answers:s},i),this.props.trackInteraction()})}componentDidMount(){this.cursorPosition=[0,0]}getDOMNodeForPath(e){const t=Ze(e);return J.findDOMNode(this.refs[t])}getUserInput(){return{answers:this.props.answers}}getPromptJSON(){return Gc(this.props,this.getUserInput())}render(){let e;this.props.apiOptions.customKeypad?e=Hc:e=Vc;const{INPUT_MARGIN:t,INPUT_HEIGHT:a,INPUT_WIDTH:i}=e,s=jo(this.props.answers),o=this.props.matrixBoardSize[0],u=this.props.matrixBoardSize[1],d=this.props.cursorPosition[0],m=this.props.cursorPosition[1],p=Math.max(d,s[0]-1),h=Math.max(m,s[1]-1),g=(p+1)*(a+2*t),y=(h+1)*(i+2*t),f=Fe({"perseus-matrix":!0,"static-mode":this.props.static,"the-matrix":this.state.enterTheMatrix>=5});return l.jsxs("div",{className:f,children:[this.props.prefix&&l.jsx("div",{className:"matrix-prefix",children:l.jsx(Y,{content:this.props.prefix,linterContext:this.props.linterContext,strings:this.context.strings})}),l.jsxs("div",{className:"matrix-input",children:[l.jsx("div",{className:"matrix-bracket bracket-left",style:{height:g}}),l.jsx("div",{className:"matrix-bracket bracket-right",style:{height:g,left:y}}),w(o).times(b=>{const A=this.props.answers[b];return l.jsx("div",{className:"matrix-row",children:w(u).times(P=>{const T=b>p||P>h,C={className:T?"outside":"inside",ref:Ze(xe(b,P)),value:A?A[P]:null,style:{height:a,width:i,margin:t},disabled:this.props.apiOptions.readOnly,onFocus:()=>{this.cursorPosition=[b,P],this.props.onChange({cursorPosition:[b,P]},()=>!1),this._handleFocus(b,P)},onBlur:()=>{b===this.cursorPosition[0]&&P===this.cursorPosition[1]&&this.props.onChange({cursorPosition:[0,0]},()=>!1),this._handleBlur(b,P)},onKeyDown:S=>{this.handleKeyDown(b,P,S)},onChange:(S,E)=>{this.onValueChange(b,P,S,E)}};let O;if(this.props.apiOptions.customKeypad){const S={margin:t,minWidth:i,minHeight:a,boxSizing:"border-box",backgroundColor:T?"#f3f3f3":"#fff"};O=l.jsx(On,{...C,style:S,scrollable:!0,keypadElement:this.props.keypadElement})}else if(this.props.numericInput)O=l.jsx(Va,{...C});else{const S={...C,style:I.StyleSheet.create({input:{...C.style,display:"inline-block",padding:0,backgroundColor:T?"#f3f3f3":"#fff"}}).input};O=l.jsx(il,{...S})}return l.jsx("span",{className:"matrix-input-field",children:O},P)})},b)})]}),this.props.suffix&&l.jsx("div",{className:"matrix-suffix",children:l.jsx(Y,{content:this.props.suffix,linterContext:this.props.linterContext,strings:this.context.strings})})]})}}c(zt,"contextType",V),c(zt,"defaultProps",{matrixBoardSize:[3,3],answers:[[]],prefix:"",suffix:"",cursorPosition:[0,0],apiOptions:Ne.defaults,linterContext:ae});const Uc=n=>{const r=w(n.matrixBoardSize[0]).times(function(){return _c(n.matrixBoardSize[1])});return n=w.pick(n,"matrixBoardSize","prefix","suffix"),w.extend(n,{answers:r})},$c=n=>{const r=w.pick(n,"matrixBoardSize","prefix","suffix");return r.answers=w.map(n.answers,e=>w.map(e,t=>t!=null?String(t):"")),r},Xc={name:"matrix",displayName:"Matrix",hidden:!0,widget:zt,transform:Uc,staticTransform:$c,isLintable:!0},Yc=()=>Ke("measurer"),Aa={url:null,top:0,left:0};class Gs extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0);c(this,"state",{});c(this,"ruler");c(this,"protractor")}componentDidMount(){this.setupGraphie()}componentDidUpdate(e){w.any(["box","showProtractor","showRuler","rulerLabel","rulerTicks","rulerPixels","rulerLength"],a=>e[a]!==this.props[a],this)&&this.setupGraphie()}setupGraphie(){const e=J.findDOMNode(this.refs.graphieDiv);W(e).empty();const t=this.graphie=Fa.createGraphie(e),a=[40,40],i=[[0,this.props.box[0]/a[0]],[0,this.props.box[1]/a[1]]];t.init({range:i,scale:a}),t.addMouseLayer({allowScratchpad:!0,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable}),this.protractor&&this.protractor.remove(),this.props.showProtractor&&(this.protractor=t.protractor([this.props.protractorX,this.props.protractorY])),this.ruler&&this.ruler.remove(),this.props.showRuler&&(this.ruler=t.ruler({center:[(i[0][0]+i[0][1])/2,(i[1][0]+i[1][1])/2],label:this.props.rulerLabel,pixelsPerUnit:this.props.rulerPixels,ticksPerUnit:this.props.rulerTicks,units:this.props.rulerLength}))}getPromptJSON(){return Yc()}render(){const e=w.extend({},Aa,this.props.image);return l.jsxs("div",{className:"perseus-widget perseus-widget-measurer graphie-container blank-background",style:{width:this.props.box[0],height:this.props.box[1]},children:[e.url&&l.jsx("div",{style:{position:"relative",top:e.top,left:e.left},children:l.jsx(jn,{src:e.url})}),l.jsx("div",{className:"graphie",ref:"graphieDiv"})]})}}c(Gs,"defaultProps",{box:[480,480],image:Aa,showProtractor:!0,protractorX:7.5,protractorY:.5,showRuler:!1,rulerLabel:"",rulerTicks:10,rulerPixels:40,rulerLength:10});const zc={name:"measurer",displayName:"Measurer",hidden:!0,widget:Gs,version:Pr.version,propUpgrades:Pr.widgetOptionsUpgrades};function Bc(n,r){r.value!==null&&(n.fillStyle=de.fgColor,n.font=de.font,n.fillText(r.value,r.pos[0]-de.fontSizePx/2+1,r.pos[1]+de.fontSizePx/2))}function Kc(n,r){let e=new Path2D;n.lineWidth=5*de.lineWidth,n.strokeStyle=de.fgColor,e.moveTo(r.startPos[0],r.startPos[1]),e.lineTo(r.endPos[0],r.endPos[1]),n.stroke(e),e=new Path2D,n.lineWidth=3*de.lineWidth,n.strokeStyle=de.bgColor,e.moveTo(r.startPos[0],r.startPos[1]),e.lineTo(r.endPos[0],r.endPos[1]),n.stroke(e)}function Jc(n,r){let e=new Path2D;n.lineWidth=7*de.lineWidth,n.strokeStyle=de.fgColor,e.moveTo(r.startPos[0],r.startPos[1]),e.lineTo(r.endPos[0],r.endPos[1]),n.stroke(e),e=new Path2D,n.lineWidth=5*de.lineWidth,n.strokeStyle=de.bgColor,e.moveTo(r.startPos[0],r.startPos[1]),e.lineTo(r.endPos[0],r.endPos[1]),n.stroke(e),_s(n,r)}function _s(n,r){const e=new Path2D;n.lineWidth=de.lineWidth,n.strokeStyle=de.fgColor,e.moveTo(r.startPos[0],r.startPos[1]),e.lineTo(r.endPos[0],r.endPos[1]),n.stroke(e)}const Qc={text:Bc,"line:single":_s,"line:double":Kc,"line:triple":Jc};function Zc(n){return function(r){Qc[r.type](n,r)}}const Ca={"line:single":0,"line:double":0,"line:triple":0,text:1};function eg(n,r){return Ca[n.type]-Ca[r.type]}function ng(n,r){r.sort(eg).forEach(Zc(n))}const de={bgColor:"rgb(255, 255, 255)",fgColor:"rgb(0, 0, 0)",fontSizePx:12,lineWidth:1,font:"12px sans"},tg=30;function rg(n,r,e){const t=n[0],a=n[1];return[t+Math.cos(r*2*Math.PI/360)*e,a+-1*Math.sin(r*2*Math.PI/360)*e]}function ag(n,r,e,t){let a=n.symbol;if(a==="C"&&Object.keys(r).length!==1&&(a=null),n.idx==="1,0"){const g=[0,0];return n.pos=g,n.baseAngle=-30+t,{type:"text",value:a,pos:g,idx:n.idx}}const i=r[n.connections.find(function(g){return r[g].pos})],s=i.connections.indexOf(n.idx);let o=60,u=120;i.connections.length===4?(u=90,o=90):(e.find(g=>g.bondType==="triple"&&g.to===n.idx)||e.find(g=>g.bondType==="triple"&&g.to===i.idx))&&(u=0,o=0);let d=0;const m=i.idx.split(":"),p=m[m.length-1].split(",")[0];parseInt(p)%2!==0?d=i.baseAngle-(o-u*s):d=i.baseAngle+(o-u*s);const h=rg(i.pos,d,tg);return n.pos=h,n.baseAngle=d,{type:"text",value:a,pos:h,idx:n.idx}}function ig(n,r){let t=[n.pos[0],n.pos[1]],a=[r.pos[0],r.pos[1]];return n.symbol!=="C"&&(t=[r.pos[0]-(1-.25)*(r.pos[0]-n.pos[0]),r.pos[1]-(1-.25)*(r.pos[1]-n.pos[1])]),r.symbol!=="C"&&(a=[n.pos[0]-(1-.25)*(n.pos[0]-r.pos[0]),n.pos[1]-(1-.25)*(n.pos[1]-r.pos[1])]),[t,a]}function sg(n,r){const e=r[n.from],t=r[n.to],a=ig(e,t);return{type:"line:"+n.bondType,startPos:a[0],endPos:a[1]}}function Ta(n){return n.join(":")}function Vs(n,r,e){if(e===null)return[n,r];if(e.type==="atom"){const t=Ta(e.idx);n[t]={idx:t,symbol:e.symbol,connections:[]},e.bonds&&e.bonds.forEach(function(a){const i=Ta(a.to.idx);n[t].connections.push(i),r.push({from:t,to:i,bondType:a.bondType}),Vs(n,r,a.to),n[i].connections.push(t)})}return[n,r]}function Hs(n,r,e,t,a){if(r.length===0)return n;const i=r.shift(),s=e[i];return s.connections.forEach(function(o){e[o].pos||r.push(o)}),Hs(n.concat(ag(s,e,t,a)),r,e,t,a)}function Us(n,r,e){return e.length===0?n:Us(n.concat(sg(e[0],r)),r,e.slice(1))}function og(n,r){const e=Vs({},[],n),t=e[0],a=e[1],i=Hs([],["1,0"],t,a,r);return Us(i,t,a)}const lg={layout:og},ug=new RegExp("^[A-Za-z\\[\\]()=#+-]*$"),$s=new RegExp("^(Cl|Br|[CONPSFBI]|\\[)");function pn(n){this.message=n}function cn(n,r,e){const t=r[0],a=r.slice(1);let i;Array.isArray(n)?i=[...n]:i={...n||{}};let s=e;return a.length>0&&(s=cn(i[t],a,e)),i[t]=s,i}function dg(n,r){const e=r.reduce(function(t,a){return t[a]},n);return cn(n,r,e+1)}function mg(n){return ug.test(n)}function pg(n,r){const e=n[0],t=n.slice(1);if(e==="=")return gn(t,cn(r,["bond","bondType"],"double"));if(e==="#")return gn(t,cn(r,["bond","bondType"],"triple"));throw new pn("Invalid character: "+e)}function Yn(n,r){if(r.length===0)return n;if(n==="")throw new pn("Mismatched parentheses");const e=n[0],t=n.slice(1);return e==="("?Yn(t,r.concat(e)):e===")"?Yn(t,r.slice(1)):Yn(t,r)}function cg(n,r){const e=n[0],t=n.slice(1);if(e==="("){let a={...r,parens:r.parens+"("};a=dg(r,["idx",r.idx.length-1,1]);let i=-1;r.idx[r.idx.length-1][0]%2===0&&(i=0);const s={...a,idx:a.idx.concat([[i,0]]),parens:a.parens.concat("(")},o=gn(t,s),u=gn(Yn(t,["("]),a);return[o].concat(u)}if(e===")"){if(r.parens[r.parens.length-1]!=="(")throw new pn("Mismatched parentheses");return null}throw new pn("Invalid bare character: "+e)}function gg(n,r){let e=null,t=null;if(n[0]==="["){const a=n.indexOf("]");if(a===-1)return["",n];e=n.slice(1,a),t=n.slice(a+1)}else e=$s.exec(n)[1],t=n.slice(e.length);return[e,t]}function hg(n,r){const e=gg(n),t=e[0];if(t==="")return["error","Unable to parse bracketed atom."];const a=e[1],i=cn(r,["idx",r.idx.length-1],[1+r.idx[r.idx.length-1][0],0]);let s=gn(a,cn(i,["bond","bondType"],"single"));!Array.isArray(s)&&s&&(s=[s]);const o={type:"atom",symbol:t,bonds:s,idx:i.idx};return r.bond?{type:"bond",bondType:r.bond.bondType,to:o}:o}function yg(n){return $s.test(n)}function wg(n){return n==="="||n==="#"}function gn(n,r){if(!mg(n))throw new pn("Invalid input.");return!n||n.length===0?null:yg(n)?hg(n,r||{idx:[[0,0]],parens:[],stack:[],bondModifiers:[]}):wg(n[0])?pg(n,r):cg(n,r)}const Xs={parse:gn,ParseError:pn},{layout:fg}=lg,bg=Xs.parse,vg=Xs.ParseError,Un=30;class Ys extends v.Component{constructor(){super(...arguments);c(this,"state",{parsedSmiles:null,error:null});c(this,"stateFromSmiles",e=>{try{this.setState({parsedSmiles:bg(e),error:null})}catch(t){if(t instanceof vg)this.setState({error:t.message});else throw t}});c(this,"setCanvasBounds",(e,t)=>{const a=Math.max(...t.map(m=>m.pos?m.pos[0]:-1/0)),i=Math.max(...t.map(m=>m.pos?m.pos[1]:-1/0)),s=Math.min(...t.map(m=>m.pos?m.pos[0]:1/0)),o=Math.min(...t.map(m=>m.pos?m.pos[1]:1/0)),u=a-s+2*Un,d=i-o+2*Un;return e.width=u,e.height=d,[Un-s,Un-o]});c(this,"canvasRender",()=>{if(this.state.error||!this.state.parsedSmiles)return;const e=fg(this.state.parsedSmiles,this.props.rotationAngle),t=this.refs.canvas,a=this.setCanvasBounds(t,e),i=t.getContext("2d");i.clearRect(0,0,t.width,t.height),i.save(),i.translate(a[0],a[1]),ng(i,e),i.restore()})}UNSAFE_componentWillMount(){this.stateFromSmiles(this.props.smiles)}componentDidMount(){this.canvasRender()}UNSAFE_componentWillReceiveProps(e){this.stateFromSmiles(e.smiles)}componentDidUpdate(){this.canvasRender()}render(){let e=l.jsx("canvas",{className:"molecule-canvas",id:this.props.widgetId+"-molecule",ref:"canvas",children:this.context.strings.molecularDrawing({content:this.props.smiles||""})});return this.state.error&&(e=l.jsx("div",{className:"error",children:this.state.error})),l.jsx("div",{className:"molecule-canvas",children:e})}}c(Ys,"contextType",V);class zs extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0)}render(){return l.jsx(Ys,{widgetId:this.props.widgetId,smiles:this.props.smiles,rotationAngle:this.props.rotationAngle})}}c(zs,"defaultProps",{rotationAngle:0});const kg={name:"molecule-renderer",displayName:"Molecule renderer",hidden:!0,widget:zs},xg=(n,r)=>({type:"number-line",options:{range:n.range,numDivisions:n.numDivisions,snapDivisions:n.snapDivisions},userInput:{numLinePosition:r.numLinePosition,numDivisions:r.numDivisions}}),qg=ne.MovablePoint,Pg=ne.Line,{assert:Ag}=nr,Cg=(n,r,e)=>Math.min(Math.max(n,r),e),Tg="–",vt=30,Rg={ge:"le",gt:"lt",le:"ge",lt:"gt"},Ig={ge:"gt",gt:"ge",le:"lt",lt:"le"};function rt(n,r){return r===1?""+n:`\\dfrac{${n}}{${r}}`}function Bs(n,r){if(n<0)return"-"+Bs(-n,r);const e=Math.floor(n/r);return e===0?rt(n,r):n-e*r===0?""+e:e+rt(n-e*r,r)}function Ng(n,r,e){const t=Math.floor(e/r);return rt(n*t,e)}const Sg=(n,r,e,t,a)=>{if(t=t||e,r==="decimal"||r==="decimal ticks")return n.label([e,-.53],Math.round(t*100)/100,"center");if(r==="improper"){const i=Xe.toFraction(t);return n.label([e,-.17],rt(i[0],i[1]),"below")}if(r==="mixed"){const i=Xe.toFraction(t);return n.label([e,-.17],Bs(i[0],i[1]),"below")}if(r==="non-reduced"){const i=Xe.toFraction(t);return n.label([e,-.17],Ng(i[0],i[1],a),"below")}},Og=ne.createSimpleClass((n,r)=>{if(!w.isFinite(r.tickStep)||r.tickStep<=0)return[];const e=[],{range:t,labelRange:a,labelStyle:i,labelTicks:s,tickStep:o,numDivisions:u}=r,d=a[0]==null?t[0]:a[0],m=a[1]==null?t[1]:a[1];let p;if(i==="non-reduced"){const A=[d,m];for(let C=0;C<=u;C++){const O=t[0]+C*o;A.push(O)}const P=C=>Eo(C)[1],T=w.map(A,P);p=w.reduce(T,(C,O)=>Xe.getLCM(C,O))}else p=void 0;const h={stroke:D.BLUE,strokeWidth:3.5},g={color:D.BLUE},y=[...Array(Math.round(u)).keys()].map(A=>t[0]+A*o),f=(A,P)=>A-P;return[...new Set([...y,d,m,...t])].sort(f).forEach(A=>{const P=A===d||A===m,T=P?h:null,C=P?g:null;n.style(T,()=>{e.push(n.line([A,-.2],[A,.2]))}),(s||P||i==="decimal ticks")&&n.style(C,()=>{e.push(Sg(n,i,A,A,p))})}),e});class Bt extends v.Component{constructor(){super(...arguments);c(this,"state",{numDivisionsEmpty:!1});c(this,"change",(...e)=>ie.apply(this,e));c(this,"isValid",()=>{const e=this.props.range;let t=this.props.numLinePosition;const a=this.props.divisionRange;return t=t??e[0],e[0]<e[1]&&Ir(t-e[0])>=0&&Ir(t-e[1])<=0&&a[0]<a[1]&&0<this.props.numDivisions&&0<this.props.snapDivisions});c(this,"onNumDivisionsChange",(e,t)=>{const a=this.props.divisionRange.slice(),i=this.props.range[1]-this.props.range[0];if(e=Math.round(e),e=e<0?e*-1:e,e){const s=w.extend({},this.props,{tickStep:i/e}),o=this.snapNumLinePosition(s,this.props.numLinePosition);this.setState({numDivisionsEmpty:!1},()=>{this.props.onChange({divisionRange:a,numDivisions:e,numLinePosition:o},t)})}else this.setState({numDivisionsEmpty:!0},t)});c(this,"_handleTickCtrlFocus",()=>{this.props.onFocus(["tick-ctrl"])});c(this,"_handleTickCtrlBlur",()=>{this.props.onBlur(["tick-ctrl"])});c(this,"focusInputPath",e=>{e.length===1&&this.refs[e[0]].focus()});c(this,"blurInputPath",e=>{e.length===1&&this.refs[e[0]].blur()});c(this,"getInputPaths",()=>this.props.isTickCtrl?[["tick-ctrl"]]:[]);c(this,"setInputValue",(e,t,a)=>{e.length===1&&e[0]==="tick-ctrl"&&this.onNumDivisionsChange(t,a)});c(this,"_renderGraphie",()=>{const e=this.props.range,t=e[1]-e[0],a=w.pick(this.props,["range","isTickCtrl"]),i=w.extend({},this.props,{tickStep:t/this.props.numDivisions});return l.jsxs(ne,{ref:"graphie",box:[this.props.apiOptions.isMobile?288:460,80],options:a,onMouseDown:s=>{this.refs.graphie.movables.numberLinePoint.grab(s)},setup:this._setupGraphie,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable,isMobile:this.props.apiOptions.isMobile,children:[l.jsx(Og,{...w.pick(i,["range","numDivisions","labelTicks","labelStyle","labelRange","tickStep"]),isMobile:this.props.apiOptions.isMobile}),this._renderInequality(i),this._renderNumberLinePoint(i)]},this.props.labelStyle)});c(this,"snapNumLinePosition",(e,t)=>{const a=e.range[0],i=e.range[1],s=e.tickStep/e.snapDivisions;let o=Cg(t,a,i);return o=a+Mo(o-a,s),Ag(w.isFinite(o)),o});c(this,"movePosition",e=>{this.change({numLinePosition:e}),this.props.trackInteraction()});c(this,"_renderNumberLinePoint",e=>{const t=w(["lt","gt"]).contains(e.rel);let a;t?a=D._BACKGROUND:e.static?a=D.BLUE:a=D.GREEN;const i={fill:a,stroke:e.static?D.BLUE:D.GREEN,"stroke-width":t?3:1},s={fill:t?D._BACKGROUND:D.GREEN,"stroke-width":t?3:1},o=e.isInequality?{stroke:D.GREEN,"fill-opacity":t?0:1}:{};return l.jsx(qg,{ref:"numberLinePoint",pointSize:6,coord:[e.numLinePosition,0],constraints:[(u,d)=>[u[0],d[1]],(u,d)=>[this.snapNumLinePosition(e,u[0]),u[1]]],normalStyle:i,highlightStyle:s,onMove:u=>{this.movePosition(u[0])},isMobile:this.props.apiOptions.isMobile,mobileStyleOverride:o,showTooltips:this.props.showTooltips,xOnlyTooltip:!0})});c(this,"handleReverse",()=>{const e=Rg[this.props.rel];this.props.onChange({rel:e})});c(this,"handleToggleStrict",()=>{const e=Ig[this.props.rel];this.props.onChange({rel:e})});c(this,"_getInequalityEndpoint",e=>{const t=w(["ge","gt"]).contains(e.rel),a=400,i=e.range,s=(i[1]-i[0])/a,o=vt*s,u=i[0]-o,d=i[1]+o;return t?[d,0]:[u,0]});c(this,"_renderInequality",e=>{if(e.isInequality){const t=this._getInequalityEndpoint(e),a={arrows:"->",stroke:this.props.apiOptions.isMobile?D.GREEN:D.BLUE,strokeWidth:3.5},i=["ge","gt"].includes(e.rel);return l.jsx(Pg,{start:[(i?.4:-.4)+e.numLinePosition,0],end:t,style:a})}return null});c(this,"_setupGraphie",(e,t)=>{if(!this.isValid())return;const a=this.props.apiOptions.isMobile?288-vt*2:400,i=t.range,s=(i[1]-i[0])/a,o=vt*s,u=i[0]-o,d=i[1]+o,p=this.props.labelStyle==="improper"||this.props.labelStyle==="mixed"||this.props.labelStyle==="non-reduced"?-1.5:-1;e.init({range:[[u,d],[p,1]],scale:[1/s,40],isMobile:this.props.apiOptions.isMobile});const g=(i[0]+i[1])/2;e.line([g,0],[d,0],{arrows:"->"}),e.line([g,0],[u,0],{arrows:"->"})})}focus(){return this.props.isTickCtrl?(this.refs["tick-ctrl"].focus(),!0):!1}getDOMNodeForPath(e){return(e==null?void 0:e.length)===1?J.findDOMNode(this.refs[e[0]]):null}getUserInput(){return{numLinePosition:this.props.numLinePosition,rel:this.props.isInequality?this.props.rel:"eq",numDivisions:this.props.numDivisions,divisionRange:this.props.divisionRange}}getPromptJSON(){return xg(this.props,this.getUserInput())}render(){const{strings:e}=this.context,t=this.props.divisionRange,a=t[0]+Tg+t[1],i=this.props.numDivisions<t[0]||this.props.numDivisions>t[1],s=l.jsxs("div",{children:[l.jsx("input",{type:"button",className:"simple-button",value:e.switchDirection,onClick:this.handleReverse}),l.jsx("input",{type:"button",className:"simple-button",value:w(["le","ge"]).contains(this.props.rel)?e.circleOpen:e.circleFilled,onClick:this.handleToggleStrict})]});let o;if(this.props.isTickCtrl){let u;this.props.apiOptions.customKeypad?u=On:u=Va,o=l.jsxs("label",{children:[e.numDivisions," ",l.jsx(u,{ref:"tick-ctrl",value:this.state.numDivisionsEmpty?null:this.props.numDivisions||t[0],checkValidity:d=>d>=t[0]&&d<=t[1],onChange:this.onNumDivisionsChange,onFocus:this._handleTickCtrlFocus,onBlur:this._handleTickCtrlBlur,useArrowKeys:!0,keypadElement:this.props.keypadElement})]})}return l.jsxs("div",{className:"perseus-widget perseus-widget-interactive-number-line",children:[o,this.isValid()?this.props.isTickCtrl&&i?l.jsx("div",{className:"perseus-error",children:e.divisions({divRangeString:a})}):this._renderGraphie():l.jsx("div",{className:"perseus-error",children:"Invalid number line configuration."}),!this.props.static&&this.props.isInequality&&s]})}}c(Bt,"contextType",V),c(Bt,"defaultProps",{range:[0,10],labelStyle:"decimal",labelRange:[null,null],divisionRange:[1,12],labelTicks:!0,isTickCtrl:!1,isInequality:!1,numLinePosition:0,snapDivisions:2,showTooltips:!1,rel:"ge",apiOptions:Ne.defaults});const jg=n=>{const r=w.pick(n,["range","labelRange","labelStyle","labelTicks","divisionRange","snapDivisions","isTickCtrl","isInequality","showTooltips"]),e=n.initialX!=null?n.initialX:n.range[0],t=n.range[1]-n.range[0];let a;return n.numDivisions!=null?a=n.numDivisions:n.tickStep!=null?a=t/n.tickStep:a=void 0,w.extend(r,{numLinePosition:e,numDivisions:a,snapDivisions:r.snapDivisions||void 0}),r},Eg=n=>{const r=w.pick(n,["range","labelRange","labelStyle","labelTicks","divisionRange","snapDivisions","isInequality"]),e=n.correctX!=null?n.correctX:n.range[0],t=n.range[1]-n.range[0];let a;return n.numDivisions!=null?a=n.numDivisions:n.tickStep!=null?a=t/n.tickStep:a=void 0,w.extend(r,{numLinePosition:e,numDivisions:a,rel:n.isInequality?n.correctRel:null,snapDivisions:r.snapDivisions||void 0}),r},Mg={name:"number-line",displayName:"Number line",widget:Bt,transform:jg,staticTransform:Eg},Lg=(n,r)=>({type:"orderer",options:{options:n.options.map(e=>e.content)},userInput:{values:r.current}});class Dg extends v.Component{render(){return l.jsx("div",{className:"card-wrap",style:{width:this.props.width},children:l.jsx("div",{className:"card placeholder",style:{height:this.props.width}})})}}class Fg extends v.Component{render(){return l.jsx("div",{className:"card-wrap",children:l.jsx("div",{className:"card drag-hint"})})}}class nn extends v.Component{constructor(){super(...arguments);c(this,"mouseMoveUpBound");c(this,"state",{dragging:!1});c(this,"bindMouseMoveUp",()=>{this.mouseMoveUpBound=!0,W(document).on("mousemove",this.onMouseMove),W(document).on("mouseup",this.onMouseUp)});c(this,"unbindMouseMoveUp",()=>{this.mouseMoveUpBound=!1,W(document).off("mousemove",this.onMouseMove),W(document).off("mouseup",this.onMouseUp)});c(this,"onMouseDown",e=>{var a,i;e.preventDefault();const t=Z.extractPointerLocation(e);t&&(this.setState({dragging:!0}),this.bindMouseMoveUp(),(i=(a=this.props).onMouseDown)==null||i.call(a,t,this))});c(this,"onMouseMove",e=>{var a,i;if(!this.state.dragging)return;e.preventDefault();const t=Z.extractPointerLocation(e);t&&((i=(a=this.props).onMouseMove)==null||i.call(a,t))});c(this,"onMouseUp",e=>{var a,i;e.preventDefault();const t=Z.extractPointerLocation(e);t&&(this.setState({dragging:!1}),this.unbindMouseMoveUp(),(i=(a=this.props).onMouseUp)==null||i.call(a,t))})}componentDidMount(){this.mouseMoveUpBound=!1,document.addEventListener("touchmove",this.onMouseMove,Z.supportsPassiveEvents()?{passive:!1}:!1)}shouldComponentUpdate(e,t){return this.props.floating||e.floating||this.props.content!==e.content||this.props.fakeRef!==e.fakeRef}componentDidUpdate(e,t){if(this.props.animating&&!e.animating&&this.props.animateTo&&this.props.startOffset){const a=15*Math.sqrt(Math.sqrt(Math.pow(this.props.animateTo.left-this.props.startOffset.left,2)+Math.pow(this.props.animateTo.top-this.props.startOffset.top,2)));W(J.findDOMNode(this)).animate(this.props.animateTo,Math.max(a,1),this.props.onAnimationEnd)}}componentWillUnmount(){this.mouseMoveUpBound&&(Da.error("Removing an element with bound event handlers.",Be.Internal),this.unbindMouseMoveUp(),Z.resetTouchHandlers()),document.removeEventListener("touchmove",this.onMouseMove)}render(){var s,o;let e={};this.props.floating&&(e={position:"absolute",left:(s=this.props.startOffset)==null?void 0:s.left,top:(o=this.props.startOffset)==null?void 0:o.top}),this.props.width&&(e.width=this.props.width);const t=["card"];this.props.stack&&t.push("stack"),this.props.floating&&!this.props.animating&&this.props.mouse&&this.props.startMouse&&(t.push("dragging"),e.left+=this.props.mouse.left-this.props.startMouse.left,e.top+=this.props.mouse.top-this.props.startMouse.top);const a=w.pick(this.props,"content"),i=this.props.animating?W.noop:this.onMouseDown;return l.jsx("div",{className:"card-wrap",style:e,onMouseDown:i,onTouchStart:i,onTouchEnd:this.onMouseUp,onTouchCancel:this.onMouseUp,children:l.jsx("div",{className:t.join(" "),children:l.jsx(Y,{...a,linterContext:this.props.linterContext,strings:this.context.strings})})})}}c(nn,"contextType",V),c(nn,"defaultProps",{stack:!1,animating:!1,linterContext:ae});class Ks extends v.Component{constructor(){super(...arguments);c(this,"state",{current:[],dragging:!1,placeholderIndex:null,dragKey:null,animating:!1,dragContent:null,dragWidth:null,dragHeight:null,offsetPos:null,animateTo:null,grabPos:null});c(this,"onClick",(e,t,a,i)=>{const s=W(J.findDOMNode(i)),o=this.state.current.slice();let u,d=null;e==="current"?(o.splice(t,1),u=this.state.current[t],d=t):e==="bank"&&(u=this.props.options[t]),this.setState({current:o,dragging:!0,placeholderIndex:d,dragKey:u.key,dragContent:u.content,dragWidth:s.width(),dragHeight:s.height(),grabPos:a,mousePos:a,offsetPos:s.position()})});c(this,"onRelease",e=>{const t=this.refs.dragging;if(t==null)return;const a=this.isCardInBank(t),i=this.state.placeholderIndex||0,s=()=>{const d=this.state.current.slice();if(!a){const m={content:this.state.dragContent,key:w.uniqueId("perseus_draggable_card_"),width:this.state.dragWidth};d.splice(i,0,m)}this.props.onChange({current:d}),this.setState({current:d,dragging:!1,placeholderIndex:null,animating:!1}),this.props.trackInteraction()},o=W(J.findDOMNode(t)).position();let u=null;a?w.each(this.props.options,function(d,m){if(d.content===this.state.dragContent){const p=J.findDOMNode(this.refs["bank"+m]);u=W(p).position()}},this):this.refs.placeholder!=null&&(u=W(J.findDOMNode(this.refs.placeholder)).position()),u==null?s():this.setState({offsetPos:o,animateTo:u,onAnimationEnd:s,animating:!0,dragging:!1})});c(this,"onMouseMove",e=>{const t=this.refs.dragging;if(t==null)return;let a;this.isCardInBank(t)?a=null:a=this.findCorrectIndex(t,this.state.current),this.setState({mousePos:e,placeholderIndex:a})});c(this,"findCorrectIndex",(e,t)=>{const a=this.props.layout==="horizontal",i=W(J.findDOMNode(this.refs.dragList)),s=i.offset().left,o=i.offset().top,u=W(J.findDOMNode(e)).offset().left-s,d=W(J.findDOMNode(e)).offset().top-o;let m=0,p=0,h=0;return a?w.each(t,function(g,y){const f=J.findDOMNode(this.refs["sortable"+y]),b=W(f).outerWidth(!0);u>p+b/2&&(m+=1),p+=b},this):w.each(t,function(g,y){const f=J.findDOMNode(this.refs["sortable"+y]),b=W(f).outerHeight(!0);d>h+b/2&&(m+=1),h+=b},this),m});c(this,"isCardInBank",e=>{if(e==null)return!1;const t=this.props.layout==="horizontal",a=W(J.findDOMNode(e)),i=W(J.findDOMNode(this.refs.bank)),s=a.offset(),o=i.offset(),u=a.outerHeight(!0),d=i.outerHeight(!0),m=i.outerWidth(!0),p=a.outerWidth(!0);return t?s.top+u/2<o.top+d:s.left+p/2<o.left+m});c(this,"setListValues",e=>{const t=e.map(a=>({content:a}));this.props.onChange({current:t}),this.setState({current:t})})}UNSAFE_componentWillReceiveProps(e){w.isEqual(this.props.current,e.current)||this.setState({current:e.current})}getUserInput(){return{current:w.map(this.props.current,function(e){return e.content})}}getPromptJSON(){return Lg(this.props,this.getUserInput())}render(){const e=this.state.dragging&&l.jsx(nn,{ref:"dragging",floating:!0,content:this.state.dragContent,startOffset:this.state.offsetPos,startMouse:this.state.grabPos,mouse:this.state.mousePos,width:this.state.dragWidth,onMouseUp:this.onRelease,onMouseMove:this.onMouseMove,linterContext:this.props.linterContext},this.state.dragKey||"draggingCard"),t=this.state.animating&&l.jsx(nn,{floating:!0,animating:!0,content:this.state.dragContent,startOffset:this.state.offsetPos,width:this.state.dragWidth,animateTo:this.state.animateTo,onAnimationEnd:this.state.onAnimationEnd,linterContext:this.props.linterContext},this.state.dragKey||"draggingCard"),a=w.map(this.state.current,function(u,d){return l.jsx(nn,{ref:"sortable"+d,fakeRef:"sortable"+d,floating:!1,content:u.content,width:u.width,linterContext:this.props.linterContext,onMouseDown:this.state.animating?W.noop:this.onClick.bind(null,"current",d)},`sortableCard${d}`)},this);if(this.state.placeholderIndex!=null){const u=l.jsx(Dg,{ref:"placeholder",width:this.state.dragWidth,height:this.state.dragHeight},"placeholder");a.splice(this.state.placeholderIndex,0,u)}const i=a.length>0;a.push(e,t);const s=l.jsxs("div",{className:"perseus-clearfix draggable-box",children:[!i&&l.jsx(Fg,{}),l.jsx("div",{ref:"dragList",children:a})]}),o=l.jsx("div",{ref:"bank",className:"bank perseus-clearfix",children:w.map(this.props.options,(u,d)=>l.jsx(nn,{ref:"bank"+d,floating:!1,content:u.content,stack:!0,linterContext:this.props.linterContext,onMouseDown:this.state.animating?W.noop:this.onClick.bind(null,"bank",d),onMouseMove:this.onMouseMove,onMouseUp:this.onRelease},d),this)});return l.jsxs("div",{className:"draggy-boxy-thing orderer height-"+this.props.height+" layout-"+this.props.layout+" blank-background perseus-clearfix ",ref:"orderer",children:[o,s]})}}c(Ks,"defaultProps",{current:[],options:[],correctOptions:[],height:"normal",layout:"horizontal",linterContext:ae});const Wg={name:"orderer",displayName:"Orderer",hidden:!0,widget:Ks,isLintable:!0};class Kt extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0);c(this,"change",(...e)=>ie.apply(this,e))}render(){return l.jsx(Y,{content:this.props.content,apiOptions:this.props.apiOptions,linterContext:this.props.linterContext,strings:this.context.strings})}}c(Kt,"contextType",V),c(Kt,"defaultProps",{content:"",linterContext:ae});const Gg={name:"passage-ref-target",displayName:"PassageRefTarget",widget:Kt,hidden:!0,transform:n=>w.pick(n,"content"),isLintable:!0},_g=()=>Ke("plotter");class at extends v.Component{constructor(){super(...arguments);c(this,"shouldSetupGraphie");c(this,"_isMounted",!1);c(this,"horizHairline");c(this,"hairlineRange");c(this,"graphie");c(this,"state",{values:this.props.starting||[1],categoryHeights:{}});c(this,"DOT_PLOT_POINT_SIZE",()=>this.props.apiOptions.isMobile?6:4);c(this,"DOT_PLOT_POINT_PADDING",()=>8);c(this,"DOT_TICK_POINT_SIZE",()=>2);c(this,"setupGraphie",e=>{const t=this;t.shouldSetupGraphie=!1;const a=J.findDOMNode(t.refs.graphieDiv);W(a).empty();const i=Fa.createGraphie(a);t.graphie=i,t.graphie.pics=[],t.graphie.dotTicks=[];const s=t.props.type==="bar",o=t.props.type==="line",u=t.props.type==="pic",d=t.props.type==="histogram",m=t.props.type==="dotplot",p=u||m,h={},g=h,y=this.props.apiOptions.isMobile;g.graph={lines:[],bars:[],points:[],dividers:[]},g.scaleY=t.props.scaleY,g.dimX=t.props.categories.length;const f=y?[288,336]:t.props.plotDimensions;if(o)g.dimX+=y?-.2:1;else if(d)g.barPad=0,g.barWidth=1;else if(s)g.barPad=y?.08:.15,g.barWidth=1-2*g.barPad,g.dimX+=(y?-2:2)*g.barPad;else if(p){g.picBoxHeight=t.props.picBoxHeight,g.picBoxWidthPx=f[0]/t.props.categories.length;const T=f[0]-g.dimX*g.picBoxWidthPx;g.picPad=T/(2*g.dimX+2);const C=g.picBoxWidthPx+2*g.picPad;g.picPad=g.picPad/C,g.picBoxWidth=g.picBoxWidthPx/C,g.dimX+=2*g.picPad}m&&(g.picBoxHeight=this.DOT_PLOT_POINT_SIZE()*2+this.DOT_PLOT_POINT_PADDING()),g.dimY=Math.ceil(t.props.maxY/g.scaleY)*g.scaleY;let b=25;(s||o)&&y&&(b=t.props.labels[1].length!==0?17:11),m&&(b/=2),y&&p&&t.props.labels[1].length===0&&(b=0);let A=25,P=25*3;if(y&&(s||p)){const T=Math.max(0,...Object.values(t.state.categoryHeights));if(T){let C=25;p&&(C+=10),P=C+T}}if(y?g.scale=[(f[0]-b*4)/g.dimX,(f[1]-(A+P))/g.dimY]:g.scale=w.map([g.dimX,g.dimY],function(T,C){return f[C]/T}),p&&(g.scale[1]=g.picBoxHeight/g.scaleY),b/=g.scale[0],A/=g.scale[1],P/=g.scale[1],i.init({range:[[-3*b,g.dimX+b],[-P,g.dimY+A]],scale:g.scale,isMobile:this.props.apiOptions.isMobile}),i.addMouseLayer({allowScratchpad:!0,setDrawingAreaAvailable:this.props.apiOptions.setDrawingAreaAvailable}),!p){const T=y?g.scaleY:0;for(let C=T;C<=g.dimY;C+=g.scaleY)i.label([0,C],Xe.roundToApprox(C,2),"left",!0),i.style({stroke:y?"#e9ebec":"#000",strokeWidth:1,opacity:y?1:.3},function(){i.line([0,C],[g.dimX,C])})}(s||o)&&y&&!this.props.static&&(t.graphie.dragPrompt=i.label([g.dimX/2,g.dimY/2],this.context.strings.dragHandles,"center",!1).css("font-weight","bold").css("color",D.KA_GREEN).css("display","none")),t.setupCategories(h),p&&y&&(t.graphie.dotPrompt=i.label([g.dimX/2,g.dimY/2],this.context.strings.tapAddPoints,"center",!1).css("font-weight","bold").css("color",D.KA_GREEN).css("display","none")),p&&t.drawPicHeights(t.state.values,e.values),i.style({stroke:"#000",strokeWidth:2,opacity:1},function(){p?m?i.style({stroke:y?D.GRAY_G:"#000",strokeWidth:y?1:2},()=>i.line([y?0:.5,0],[g.dimX-(y?0:.5),0])):(i.line([0,0],[g.dimX,0]),(t.props.labels[1].length!==0||!y)&&i.style({stroke:y?D.GRAY_G:"#000",strokeWidth:y?1:2},()=>i.line([0,0],[0,g.dimY]))):(i.style({stroke:y?D.GRAY_G:"#000",strokeWidth:y?1:2},()=>i.line([y?-b*3:0,0],[g.dimX+(y?b:0),0])),(s||o)&&y||i.style({stroke:y?D.GRAY_G:"#000",strokeWidth:y?1:2},()=>i.line([0,0],[0,g.dimY])))}),i.label([g.dimX/2,y?-P:-35/g.scale[1]],t.props.labels[0],y?"above":"below",!1).css("font-weight","bold").css("color",y&&D.GRAY_F),i.label([(y?-35:-60)/g.scale[0],g.dimY/2],t.props.labels[1],"center",!1).css("font-weight","bold").css("color",y&&D.GRAY_F).addClass("rotate"),this.props.apiOptions.isMobile&&(this.horizHairline=new qt(this.graphie,[0,0],[0,0],{normalStyle:{strokeWidth:1}}),this.horizHairline.attr({stroke:D.INTERACTIVE}),this.horizHairline.hide(),this.hairlineRange=[[0,g.dimX],[0,g.dimY]])});c(this,"showHairlines",e=>{this.props.apiOptions.isMobile&&(this.horizHairline.moveTo([this.hairlineRange[0][0],e[1]],[this.hairlineRange[0][1],e[1]]),this.horizHairline.show())});c(this,"hideHairlines",()=>{this.props.apiOptions.isMobile&&this.horizHairline.hide()});c(this,"labelCategory",(e,t)=>{const a=this.props.apiOptions.isMobile,i=this.graphie;t=t+"";let s=!1;const o=t.match(/^\$(.*)\$$/);o&&(t=o[1],s=!0);const u=5,d=45,m=d*(Math.PI/180),p=`translateX(-50%) translateX(${u}px) translateY(-50%) rotate(-${d}deg)`,h=a&&!o;return new Promise(g=>{i.style({color:a?D.GRAY_G:"inherit",transform:h?p:"none",transformOrigin:"100%"},()=>{const y=i.label([e,a?-.5:0],t,"below",s),f=14+(h?Math.round(y.height()*Math.cos(m)+(y.width()+u)*Math.sin(m)):y.height());g({category:t,height:f})})})});c(this,"setupCategories",e=>{const t=this,a=e,i=t.graphie,s=this.props.apiOptions.isMobile,o=[];t.props.type==="histogram"?(w.times(t.props.categories.length-1,function(u){t.setupBar({index:u,startHeight:t.state.values[u],config:e,isHistogram:!0})}),w.each(t.props.categories,function(u,d){const m=.5+d*a.barWidth;o.push(t.labelCategory(m,u));const p=6/a.scale[1];i.style({stroke:"#000",strokeWidth:s?1:2,opacity:1},function(){i.line([m,-p],[m,0])})})):w.each(t.props.categories,function(u,d){const m=t.state.values[d];let p;t.props.type==="bar"?p=t.setupBar({index:d,startHeight:m,config:e,isHistogram:!1}):t.props.type==="line"?p=t.setupLine(d,m,e):t.props.type==="pic"?p=t.setupPic(d,e):t.props.type==="dotplot"&&(p=t.setupDotplot(d,e));let h=0,g=-6/a.scale[1];t.props.type==="dotplot"&&!s&&(h=-g),t.props.type==="dotplot"?(d%t.props.labelInterval===0||d===t.props.categories.length-1)&&(o.push(t.labelCategory(p,u)),h*=1.5,g*=1.5):o.push(t.labelCategory(p,u)),i.style({stroke:s?D.GRAY_G:"#000",strokeWidth:s?1:2,opacity:1},function(){i.line([p,h],[p,g])})}),Promise.all(o).then(u=>{if(t._isMounted){const d={};u.forEach(({category:m,height:p})=>d[m]=p),t.setState({categoryHeights:d})}})});c(this,"_clampValue",(e,t,a)=>Math.max(Math.min(e,a),t));c(this,"_maybeShowDragPrompt",()=>{this.graphie.dragPrompt!=null&&(this.graphie.dragPrompt[0].style.display="inline")});c(this,"_maybeHideDragPrompt",()=>{this.graphie.dragPrompt!=null&&(this.graphie.dragPrompt[0].style.display="none")});c(this,"setupBar",e=>{const t=this.props.apiOptions.isMobile,a=e.index,i=e.startHeight,s=e.config,o=e.isHistogram,u=this,d=u.graphie,m=s.barWidth/2;let p;o?p=.5+a*s.barWidth+m:p=(t?m:.5+s.barPad)+a;const h=function(g,y){const f=d.scalePoint(0);if(s.graph.bars[g].scale(1,Math.max(t?.2:.01,y/s.scaleY),f[0],f[1]),o){const b=s.graph.dividers[g-1],A=s.graph.dividers[g];if(b){const P=Math.min(u.state.values[g-1],y);b.scale(1,Math.max(.01,P/s.scaleY),f[0],f[1])}if(A){const P=Math.min(u.state.values[g+1],y);A.scale(1,Math.max(.01,P/s.scaleY),f[0],f[1])}}};if(d.style({stroke:"none",fill:t?D.BLUE_C:D.LIGHT_BLUE,opacity:1},function(){s.graph.bars[a]=d.path([[p-m,0],[p-m,s.scaleY],[p+m,s.scaleY],[p+m,0],[p-m,0]])}),o&&a>0&&d.style({stroke:"#000",strokeWidth:1,opacity:.3},function(){s.graph.dividers.push(d.path([[p-m,0],[p-m,s.scaleY]]))}),t){const g=s.scaleY/u.props.snapsPerLine;s.graph.lines[a]=Ee.addMaybeMobileMovablePoint(this,{coord:[p,i],constraints:[(y,f,b)=>[p,this._clampValue(Math.round(y[1]/g)*g,0,s.dimY)]],onMoveStart:function(){s.graph.bars[a].attr({fill:D.INTERACTIVE})},onMove:function(){const y=s.graph.lines[a].coord()[1],f=[...u.state.values];f[a]=y,u.setState({values:f}),u.changeAndTrack({values:f}),u._maybeHideDragPrompt(),h(a,y)},onMoveEnd:function(){s.graph.bars[a].attr({fill:D.BLUE_C})}}),s.graph.lines[a].state.visibleShape.wrapper.style.zIndex="1",u._maybeShowDragPrompt()}else s.graph.lines[a]=d.addMovableLineSegment({coordA:[p-m,i],coordZ:[p+m,i],snapY:s.scaleY/u.props.snapsPerLine,constraints:{constrainX:!0},normalStyle:{stroke:D.INTERACTIVE,"stroke-width":this.props.static?0:4}}),s.graph.lines[a].onMove=function(g,y){let f=this.coordA[1];(f<0||f>s.dimY)&&(f=Math.min(Math.max(f,0),s.dimY),this.coordA[1]=this.coordZ[1]=f,this.transform());const b=[...u.state.values];b[a]=f,u.setState({values:b}),u.changeAndTrack({values:b}),h(a,f)};return h(a,i),p});c(this,"setupLine",(e,t,a)=>{const i=this.props.apiOptions.isMobile,s=this,o=a,u=s.graphie,d=e+(i?.4:1);if(i){const m=a.scaleY/s.props.snapsPerLine;o.graph.points[e]=Ee.addMaybeMobileMovablePoint(this,{coord:[d,t],constraints:[(p,h,g)=>[d,this._clampValue(Math.round(p[1]/m)*m,0,a.dimY)]],onMove:function(){const p=o.graph.points[e].coord()[1],h=[...s.state.values];h[e]=p,s.setState({values:h}),s.changeAndTrack({values:h}),s._maybeHideDragPrompt()}}),s._maybeShowDragPrompt(),e>0&&(o.graph.lines[e]=Ee.addMovableLine(u,{points:[o.graph.points[e-1],o.graph.points[e]],constraints:Ee.MovablePoint.constraints.fixed(),normalStyle:{stroke:D.BLUE_C,"stroke-width":2},highlightStyle:{stroke:D.BLUE_C,"stroke-width":2}}))}else o.graph.points[e]=u.addMovablePoint({coord:[d,t],constraints:{constrainX:!0},normalStyle:{fill:D.INTERACTIVE,stroke:D.INTERACTIVE},snapY:o.scaleY/s.props.snapsPerLine}),o.graph.points[e].onMove=function(m,p){p=Math.min(Math.max(p,0),o.dimY);const h=[...s.state.values];return h[e]=p,s.setState({values:h}),s.changeAndTrack({values:h}),[m,p]},e>0&&(o.graph.lines[e]=u.addMovableLineSegment({pointA:o.graph.points[e-1],pointZ:o.graph.points[e],constraints:{fixed:!0},normalStyle:{stroke:"#9ab8ed","stroke-width":2}}));return d});c(this,"setupDotplot",(e,t)=>{const a=this.graphie,i=this.props.apiOptions.isMobile;return this.setupTiledPlot(e,i?.5:1,t,(s,o)=>a.ellipse([s,o],[this.DOT_PLOT_POINT_SIZE()/a.scale[0],this.DOT_PLOT_POINT_SIZE()/a.scale[1]],{fill:D.INTERACTIVE,stroke:D.INTERACTIVE}))});c(this,"setupPic",(e,t)=>{const a=this.graphie;return this.setupTiledPlot(e,0,t,(i,s)=>{const o=a.scalePoint([i,s]),u=this.props.picSize;return a.raphael.image(this.props.picUrl,o[0]-u/2,o[1]-u/2,u,u)})});c(this,"setupTiledPlot",(e,t,a,i)=>{const s=this,o=a,u=s.graphie,d=u.pics,m=u.dotTicks,p=e+.5+o.picPad;u.mouselayer.canvas.style.touchAction="none",d[e]=[],m[e]=[];const h=Math.round(o.dimY/o.scaleY)+1;return w(h).times(function(g){g-=1;const y=(g+.5)*o.scaleY,f=p-o.picBoxWidth/2,b=y+.5*o.scaleY,A=u.scalePoint([f,b+t]),P=u.mouselayer.rect(A[0],A[1],o.picBoxWidthPx,o.picBoxHeight);W(P[0]).css({fill:"#000",opacity:0,cursor:"pointer"}).on("vmousedown",function(T){T.preventDefault(),s.whichPicClicked=e,s.setPicHeight(e,b),W(document).on("vmouseup.plotTile",function(C){W(document).unbind(".plotTile")}),W(document).on("vmousemove.plotTile",function(C){C.preventDefault();const O=u.getMouseCoord(C)[1],S=Math.floor(O-t),N=(Math.max(-1,Math.floor(S/o.scaleY))+.5)*o.scaleY,j=Math.min(N+.5*o.scaleY,o.dimY);s.setPicHeight(s.whichPicClicked,j)})}),!(g<0)&&(d[e][g]=i(p,y+t),m[e][g]=u.ellipse([p,y+t],[s.DOT_TICK_POINT_SIZE()/u.scale[0],s.DOT_TICK_POINT_SIZE()/u.scale[1]],{fill:"#dee1e3",stroke:"#dee1e3"}))}),p});c(this,"setPicHeight",(e,t)=>{const a=[...this.state.values];a[e]=t,this.drawPicHeights(a,this.state.values),this.setState({values:a}),this.changeAndTrack({values:a})});c(this,"changeAndTrack",e=>{this.props.onChange(e),this.props.trackInteraction()});c(this,"drawPicHeights",(e,t)=>{const a=this,i=a.graphie,s=i.pics,o=this.props.apiOptions.isMobile;if(o){const u=e.every(d=>d===0);i.dotPrompt[0].style.display=u?"inline":"none"}w.each(s,function(u,d){w.each(u,function(m,p){const h=(p+1)*a.props.scaleY,g=h<=e[d];if(a.props.type==="dotplot"){const y=h<=t[d];g&&!y&&m.animate({"stroke-width":8},75,()=>m.animate({"stroke-width":2},75))}W(m[0]).css({display:g?"inline":"none"}),i.dotTicks[d][p][0].style.display=g||!o?"none":"inline"})})})}componentDidMount(){this._isMounted=!0,this.setupGraphie(this.state)}UNSAFE_componentWillReceiveProps(e){const t=["type","labels","categories","scaleY","maxY","snapsPerLine","picUrl","labelInterval","static"];this.shouldSetupGraphie=w.any(t,a=>!w.isEqual(this.props[a],e[a]),this),!w.isEqual(this.props.starting,e.starting)&&!w.isEqual(this.state.values,e.starting)&&(this.shouldSetupGraphie=!0,this.setState({values:e.starting}))}componentDidUpdate(e,t){this.shouldSetupGraphie=this.shouldSetupGraphie||!w.isEqual(this.state.categoryHeights,t.categoryHeights),this.shouldSetupGraphie&&this.setupGraphie(t)}componentWillUnmount(){this._isMounted=!1}getUserInput(){return this.state.values}getPromptJSON(){return _g()}render(){const t={marginBottom:this.props.labels[0]?75:0};return l.jsx("div",{className:"perseus-widget-plotter graphie",ref:"graphieDiv",style:t})}}c(at,"contextType",V),c(at,"defaultProps",{type:"bar",labels:["",""],categories:[""],scaleY:1,maxY:10,snapsPerLine:2,picSize:40,picBoxHeight:48,picUrl:"",plotDimensions:[380,300],labelInterval:1});const Vg=w.identity,Hg={name:"plotter",displayName:"Plotter",hidden:!0,widget:at,staticTransform:Vg};at.__docgenInfo={description:"",methods:[{name:"DOT_PLOT_POINT_SIZE",docblock:null,modifiers:[],params:[],returns:null},{name:"DOT_PLOT_POINT_PADDING",docblock:null,modifiers:[],params:[],returns:null},{name:"DOT_TICK_POINT_SIZE",docblock:null,modifiers:[],params:[],returns:null},{name:"setupGraphie",docblock:null,modifiers:[],params:[{name:"prevState",optional:!1,type:null}],returns:null},{name:"showHairlines",docblock:null,modifiers:[],params:[{name:"point",optional:!1,type:null}],returns:null},{name:"hideHairlines",docblock:null,modifiers:[],params:[],returns:null},{name:"labelCategory",docblock:null,modifiers:[],params:[{name:"x",optional:!1,type:null},{name:"category",optional:!1,type:null}],returns:null},{name:"setupCategories",docblock:null,modifiers:[],params:[{name:"config",optional:!1,type:null}],returns:null},{name:"_clampValue",docblock:null,modifiers:[],params:[{name:"v",optional:!1,type:null},{name:"min",optional:!1,type:null},{name:"max",optional:!1,type:null}],returns:null},{name:"_maybeShowDragPrompt",docblock:null,modifiers:[],params:[],returns:null},{name:"_maybeHideDragPrompt",docblock:null,modifiers:[],params:[],returns:null},{name:"setupBar",docblock:null,modifiers:[],params:[{name:"args",optional:!1,type:null}],returns:null},{name:"setupLine",docblock:`Renders a segment of an interactive line to the plotter graph
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
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]}},description:""},containerSizeClass:{required:!0,tsType:{name:"unknown[union]",raw:"(typeof containerSizeClass)[keyof typeof containerSizeClass]"},description:""},labelInterval:{required:!1,tsType:{name:"NonNullable",elements:[{name:"union",raw:'PerseusPlotterWidgetOptions["labelInterval"]'}],raw:'NonNullable<PerseusPlotterWidgetOptions["labelInterval"]>'},description:"",defaultValue:{value:"1",computed:!1}},picSize:{required:!1,tsType:{name:"NonNullable",elements:[{name:"union",raw:'PerseusPlotterWidgetOptions["picSize"]'}],raw:'NonNullable<PerseusPlotterWidgetOptions["picSize"]>'},description:"",defaultValue:{value:"40",computed:!1}},type:{defaultValue:{value:'"bar"',computed:!1},required:!1},labels:{defaultValue:{value:'["", ""]',computed:!1},required:!1},categories:{defaultValue:{value:'[""]',computed:!1},required:!1},scaleY:{defaultValue:{value:"1",computed:!1},required:!1},maxY:{defaultValue:{value:"10",computed:!1},required:!1},snapsPerLine:{defaultValue:{value:"2",computed:!1},required:!1},picBoxHeight:{defaultValue:{value:"48",computed:!1},required:!1},picUrl:{defaultValue:{value:'""',computed:!1},required:!1},plotDimensions:{defaultValue:{value:"[380, 300]",computed:!1},required:!1}}};const Ug=()=>Ke("python-program");function $g(n){const r=`/python-program/${n}/embedded`;return ii(r)}class Js extends v.Component{getDOMNodeForPath(r){return null}getPromptJSON(){return Ug()}render(){const r=$g(this.props.programID),e={height:this.props.height,width:"100%"},t=["allow-popups","allow-same-origin","allow-scripts","allow-top-navigation"].join(" ");return l.jsx(U,{style:Xg.container,children:l.jsx("iframe",{sandbox:t,src:r,style:e,allowFullScreen:!0})})}}c(Js,"defaultProps",{height:400});const Xg=I.StyleSheet.create({container:{margin:"auto",width:"100%"}}),Yg={name:"python-program",displayName:"Python Program",widget:Js},zg=n=>({type:"sorter",userInput:{values:n.options,changed:n.changed}});class Qs extends v.Component{constructor(){super(...arguments);c(this,"_isMounted",!1);c(this,"state",{changed:!1});c(this,"handleChange",e=>{this._isMounted&&this.setState({changed:!0},()=>{setTimeout(()=>{this.props.onChange(e),this.props.trackInteraction()},0)})});c(this,"moveOptionToIndex",(e,t)=>{this.refs.sortable.moveOptionToIndex(e,t)})}componentDidMount(){this._isMounted=!0}componentWillUnmount(){this._isMounted=!1}getUserInput(){return{options:this.refs.sortable.getOptions(),changed:this.state.changed}}getPromptJSON(){return zg(this.getUserInput())}render(){const e=Qt(this.props.correct,this.props.problemNum,!0),{apiOptions:t}=this.props,a=t.isMobile?8:5;return l.jsx("div",{className:"perseus-widget-sorter perseus-clearfix",children:l.jsx(Ct,{options:e,layout:this.props.layout,margin:a,padding:this.props.padding,onChange:this.handleChange,linterContext:this.props.linterContext,ref:"sortable"})})}}c(Qs,"defaultProps",{correct:[],layout:"horizontal",padding:!0,problemNum:0,onChange:function(){},linterContext:ae});const Bg={name:"sorter",displayName:"Sorter",widget:Qs,isLintable:!0},{assert:Zs}=nr,qn=function(n,r){return[""+n,""+r]},Kg=function(){return qn(0,0)},eo=function(n){return Zs(w.isArray(n)&&n.length===2),+n[0]},no=function(n){return Zs(w.isArray(n)&&n.length===2),+n[1]},$n=function(n){const r=eo(n),e=no(n);return"answer"+r+","+e};class Jt extends v.Component{constructor(){super(...arguments);c(this,"_getRows",()=>this.props.answers.length);c(this,"_getColumns",()=>this.props.answers[0].length);c(this,"onValueChange",(e,t,a)=>{const i=w.map(this.props.answers,w.clone);i[e][t]=a.target?a.target.value:a,this.props.onChange({answers:i}),this.props.trackInteraction()});c(this,"onHeaderChange",(e,t)=>{const a=this.props.headers.slice();a[e]=t.content,this.props.onChange({headers:a})});c(this,"_handleFocus",e=>{this.props.onFocus(e)});c(this,"_handleBlur",e=>{this.props.onBlur(e)});c(this,"focus",()=>(this.focusInputPath(Kg()),!0));c(this,"focusInputPath",e=>{const t=$n(e),a=this.refs[t];this.props.apiOptions.customKeypad?a.focus():J.findDOMNode(a).focus()});c(this,"blurInputPath",e=>{const t=$n(e),a=this.refs[t];this.props.apiOptions.customKeypad?a.blur():J.findDOMNode(a).blur()});c(this,"getInputPaths",()=>{const e=this._getRows(),t=this._getColumns(),a=[];return w(e).times(i=>{w(t).times(s=>{const o=qn(i,s);a.push(o)})}),a});c(this,"setInputValue",(e,t,a)=>{const i=eo(e),s=no(e),o=w.map(this.props.answers,w.clone);o[i][s]=t,this.props.onChange({answers:o},a)})}getUserInput(){return w.map(this.props.answers,w.clone)}getDOMNodeForPath(e){const t=$n(e);return J.findDOMNode(this.refs[t])}render(){const e=this._getRows(),t=this._getColumns(),a=this.props.headers;let i,s;const o={};return this.props.apiOptions.customKeypad?(i=On,s={width:80},o.keypadElement=this.props.keypadElement):(i="input",s={}),l.jsxs("table",{className:"perseus-widget-table-of-values non-markdown",children:[l.jsx("thead",{children:l.jsx("tr",{children:w.map(a,(u,d)=>this.props.editableHeaders?l.jsx("th",{children:l.jsx(this.props.Editor,{ref:"columnHeader"+d,apiOptions:this.props.apiOptions,content:u,widgetEnabled:!1,onChange:w.partial(this.onHeaderChange,d)})},d):l.jsx("th",{children:l.jsx(Y,{content:u,linterContext:this.props.linterContext,strings:this.context.strings})},d))})}),l.jsx("tbody",{children:w(e).times(u=>l.jsx("tr",{children:w(t).times(d=>l.jsx("td",{children:l.jsx(i,{ref:$n(qn(u,d)),type:"text",value:this.props.answers[u][d],disabled:this.props.apiOptions.readOnly,onFocus:w.partial(this._handleFocus,qn(u,d)),onBlur:w.partial(this._handleBlur,qn(u,d)),onChange:w.partial(this.onValueChange,u,d),style:s,...o})},d))},u))})]})}}c(Jt,"contextType",V),c(Jt,"defaultProps",function(){const a=w(4).times(function(){return Z.stringArrayOfSize(1)});return{apiOptions:Ne.defaults,headers:[""],editableHeaders:!1,rows:4,columns:1,answers:a,linterContext:ae}}());const Jg=n=>{const r=n.answers.length,e=n.answers[0].length,t=w(r).times(function(){return Z.stringArrayOfSize(e)});return w.extend({},n,{answers:t})},Qg={name:"table",displayName:"Table (deprecated - use markdown table instead)",accessible:!0,widget:Jt,transform:Jg,hidden:!0,isLintable:!0},Zg=()=>Ke("video"),Ra=1280,Ia=720,eh="{host}/embed_video?slug={slug}&internal_video_only=1",nh=/^https?:\/\//,th=/(khanacademy\.org|localhost)/,rh=/(vimeo\.com)/;class to extends v.Component{constructor(){super(...arguments);c(this,"isWidget",!0);c(this,"change",(...e)=>ie.apply(this,e))}getPromptJSON(){return Zg()}render(){const{InitialRequestUrl:e}=Pe(),t=this.props.location;if(!t)return l.jsx("div",{});let a;if(nh.test(t))a=t,rh.test(a)&&(a.indexOf("?")===-1?a+="?dnt=1":a+="&dnt=1");else{a=eh.replace("{slug}",t);let i="https://www.khanacademy.org";th.test(e.host)&&(i=e.origin),a=a.replace("{host}",i)}return l.jsxs(U,{children:[l.jsxs(cl,{width:Ra,height:Ia,children:[l.jsx(U,{style:Sn.srOnly,children:this.context.strings.videoWrapper}),l.jsx("iframe",{className:"perseus-video-widget",sandbox:"allow-same-origin allow-scripts",width:Ra,height:Ia,src:a,allowFullScreen:!0})]},t+this.props.alignment),l.jsx(gl,{location:t})]})}}c(to,"contextType",V);const ah={name:"video",displayName:"Video",widget:to},ih=[su,cu,ku,Tu,yu,Yu,Ou,Mu,Ku,Qu,nd,dd,qc,Lc,Xc,Wc,zc,kg,Mg,Wg,nu,ri,Gg,zo,Hg,Yg,Bg,Qg,ah,wu],gy=[...au,...ih];export{su as C,In as E,Yu as G,qc as I,Xc as M,Jn as N,Hg as P,Ms as S,Qg as T,Gm as a,Pc as b,ie as c,hl as d,vl as e,Dm as f,Um as g,Vm as h,_m as i,Hm as j,Wm as k,Fm as l,qd as m,ya as n,Gu as o,py as p,mr as q,cy as r,Vu as t,gy as w};
