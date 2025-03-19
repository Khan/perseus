import{K as E,U as M}from"./util-AXsb50Si.js";import{_ as h}from"./underscore-885MUNGo.js";import{f as W}from"./random-util-qPwTTOJz.js";import{c as L}from"./all-widgets-Qx4MLIeW.js";import"./phet-simulation-2fci0qCu.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-1S0CgMSA.js";import"./article-renderer-2JXmRToi.js";import"./hints-renderer-nLcrIf6p.js";import"./renderer-amQNiF1J.js";import"./base-radio-R062ZKQN.js";import{c as H}from"./components-_3sIFGZO.js";import{a as K}from"./i18n-context-Q5gDzbF3.js";import"./svg-image-QtqEBn5V.js";import"./jquery-5v7aFUvu.js";import"./index-smZ6iCr_.js";import{E as j}from"./editor-jsonify-0FZq5vbd.js";import{B as I}from"./index-71P4mDMp.js";import{P as g}from"./index-L0cWnnN3.js";import{L as z}from"./index-jek-Xksa.js";import{P as G,t as $}from"./trash-bold-kLXAFlhg.js";import{r as e}from"./index-6oxdNXpR.js";import{H as O}from"./heading-Irlk3f2q.js";import{E as U}from"./editor-Y1_w0bJ9.js";const{InfoTip:v,NumberInput:T,TextInput:B}=H,{firstNumericalParse:x}=M,V=[{title:"Integers",value:"integer",content:"6"},{title:"Decimals",value:"decimal",content:"0.75"},{title:"Proper fractions",value:"proper",content:"⅗"},{title:"Improper fractions",value:"improper",content:"⁷⁄₄"},{title:"Mixed numbers",value:"mixed",content:"1¾"},{title:"Numbers with π",value:"pi",content:"π"}],C=R=>({value:null,status:R,message:"",simplify:"required",answerForms:[],strict:!1,maxError:null}),w=class w extends e.Component{constructor(l){super(l),this.change=(...n)=>L.apply(this,n),this.onToggleAnswers=n=>{const t=this.state.showAnswerDetails.slice();t[n]=!t[n],this.setState({showAnswerDetails:t})},this.onToggleAnswerForm=(n,t)=>{let a=[...this.props.answers[n].answerForms??[]];a.includes(t)?a=a.filter(b=>b!==t):a.push(t);const i=this.updateAnswer(n,"answerForms");i&&i(a)},this.onToggleHeading=n=>()=>{const t=`show${n}`,a={...this.state};a[t]=!a[t],this.setState(a)},this.onTrashAnswer=n=>{if(n>=0&&n<this.props.answers.length){const t=this.props.answers.slice(0);t.splice(n,1),this.props.onChange({answers:t})}},this.onSpace=(n,t,...a)=>{n.key===" "&&(n.preventDefault(),t.apply(this,a))},this.onStatusChange=n=>{const t=["wrong","ungraded","correct"],a=this.props.answers,o=t.indexOf(a[n].status),i=t[(o+1)%t.length];this.updateAnswer(n,{status:i,simplify:i==="correct"?"required":"accepted"})},this.onEvaluationChange=(n,t)=>{this.updateAnswer(n,{status:t,simplify:t==="correct"?"required":"accepted"})},this.updateAnswer=(n,t)=>{if(!h.isObject(t))return h.partial((o,i,b)=>{const A={};A[i]=b,this.updateAnswer(o,A)},n,t);let a=[...this.props.answers];if(n===a.length){const o=C(this.state.lastStatus);a=a.concat(o)}a[n]=h.extend({},a[n],t),this.props.onChange({answers:a})},this.addAnswer=()=>{const n=C(this.state.lastStatus),t=this.props.answers.concat(n),a=this.state.showAnswerDetails.concat(!0);this.setState({showAnswerDetails:a}),this.props.onChange({answers:t})},this.getSaveWarnings=()=>{const n=[];return h.contains(h.pluck(this.props.answers,"value"),"")&&n.push("One or more answers is empty"),this.props.answers.forEach((t,a)=>{t.strict&&(!t.answerForms||t.answerForms.length===0)&&n.push(`Answer ${a+1} is set to string format matching, but no format was selected`)}),n},this.serialize=()=>j.serialize.call(this),this.state={lastStatus:"wrong",showAnswerDetails:Array(this.props.answers.length).fill(!0),showSettings:!0,showAnswers:!0}}render(){const l=this.props.answers,n={size:"medium",role:"radio",style:{marginRight:"8px"}},t=r=>{const{kind:s,onClick:p,ariaLabel:d,children:c}=r,m=r.role??"radio",f={...n,"aria-label":d,kind:s,role:m,onClick:p};return e.createElement(g,{...f},c)},a=r=>{const{answerIndex:s,answerProperty:p,value:d,children:c}=r,f=l[s][p]===d?"accent":"transparent",y={};y[p]=d;const u=r.onClick??(()=>{this.updateAnswer(s,y)});return e.createElement(t,{kind:f,onClick:u},c)},o=r=>e.createElement("fieldset",{className:"perseus-widget-row unsimplified-options"},l[r].status!=="correct"&&e.createElement(e.Fragment,null,e.createElement("legend",{className:"inline-options"},"Unsimplified answers are irrelevant for this status")),l[r].status==="correct"&&e.createElement(e.Fragment,null,e.createElement("legend",{className:"inline-options"},"Unsimplified answers are"),e.createElement("span",{className:"tooltip-for-legend"},e.createElement(v,null,e.createElement("p",null,'Normally select "ungraded". This will give the user a message saying the answer is correct but not simplified. The user will then have to simplify it and re-enter, but will not be penalized. (5th grade and after)'),e.createElement("p",null,'Select "accepted" only if the user is not expected to know how to simplify fractions yet. (Anything prior to 5th grade)'),e.createElement("p",null,'Select "wrong" ',e.createElement("em",null,"only")," if we are specifically assessing the ability to simplify."))),e.createElement("br",null),e.createElement(a,{answerIndex:r,answerProperty:"simplify",value:"required"},"Ungraded"),e.createElement(a,{answerIndex:r,answerProperty:"simplify",value:"optional"},"Accepted"),e.createElement(a,{answerIndex:r,answerProperty:"simplify",value:"enforced"},"Wrong"))),i=r=>e.createElement(e.Fragment,null,e.createElement("div",{className:"perseus-widget-row"},e.createElement("label",null,"Possible answer formats "),e.createElement(v,null,e.createElement("p",null,'Formats will be autoselected for you based on the given answer; to show no suggested formats and accept all types, simply have a decimal/integer be the answer. Values with π will have format "pi", and values that are fractions will have some subset (mixed will be "mixed" and "proper"; improper/proper will both be "improper" and "proper"). If you would like to specify that it is only a proper fraction (or only a mixed/improper fraction), deselect the other format. Except for specific cases, you should not need to change the autoselected formats.'),e.createElement("p",null,"To restrict the answer to ",e.createElement("em",null,"only"),' an improper fraction (i.e. 7/4), select the improper fraction and toggle "strict" to true. This ',e.createElement("b",null,"will not")," ","accept 1.75 as an answer."," "),e.createElement("p",null,"Unless you are testing that specific skill, please do not restrict the answer format.")),e.createElement("br",null),V.map(s=>{var m;const d=((m=l[r].answerForms)==null?void 0:m.includes(s.value))?"accent":"transparent",c=()=>{this.onToggleAnswerForm(r,s.value)};return e.createElement(t,{key:s.value,ariaLabel:s.title,kind:d,role:"checkbox",onClick:c},s.content)})),e.createElement("fieldset",{className:"perseus-widget-row"},e.createElement("legend",null,"Answer formats are: "),e.createElement(a,{answerIndex:r,answerProperty:"strict",value:!1},"Suggested"),e.createElement(a,{answerIndex:r,answerProperty:"strict",value:!0},"Required"))),b=e.createElement("fieldset",{className:"perseus-widget-row"},e.createElement("legend",{className:"inline-options"},"Width: "),e.createElement(g,{...n,kind:this.props.size==="normal"?"accent":"transparent",onClick:()=>{this.change("size")("normal")}},"Normal (80px)"),e.createElement(g,{...n,kind:this.props.size==="small"?"accent":"transparent",onClick:()=>{this.change("size")("small")}},"Small (40px)"),e.createElement(v,null,e.createElement("p",null,'Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.'))),A=e.createElement("fieldset",{className:"perseus-widget-row"},e.createElement("legend",{className:"inline-options"},"Alignment: "),e.createElement(g,{...n,kind:this.props.rightAlign?"transparent":"accent",onClick:()=>{this.props.onChange({rightAlign:!1})}},"Left"),e.createElement(g,{...n,kind:this.props.rightAlign?"accent":"transparent",onClick:()=>{this.props.onChange({rightAlign:!0})}},"Right")),F=e.createElement(e.Fragment,null,e.createElement("div",{className:"perseus-widget-row"},e.createElement("label",null,"Aria label"),e.createElement(v,null,e.createElement("p",null,"Text to describe this input. This will be shown to users using screenreaders."))),e.createElement(B,{labelText:"aria label",value:this.props.labelText,onChange:this.change("labelText")})),q=e.createElement("fieldset",{className:"perseus-widget-row"},e.createElement("legend",{className:"inline-options"},"Number style: "),e.createElement(g,{...n,kind:this.props.coefficient?"transparent":"accent",onClick:()=>{this.props.onChange({coefficient:!1})}},"Standard"),e.createElement(g,{...n,kind:this.props.coefficient?"accent":"transparent",onClick:()=>{this.props.onChange({coefficient:!0})}},"Coefficient"),e.createElement(v,null,e.createElement("p",null,"A coefficient style number allows the student to use - for -1 and an empty string to mean 1."))),S={wrong:"(address the mistake/misconception)",ungraded:"(explain in detail to avoid confusion)",correct:"(reinforce the user's understanding)"},D=()=>l.map((r,s)=>{const p=e.createElement(U,{apiOptions:this.props.apiOptions,content:r.message||"",placeholder:"Why is this answer "+r.status+"?	"+S[r.status],widgetEnabled:!1,onChange:u=>{"content"in u&&this.updateAnswer(s,{message:u.content})}}),d=r.status.charAt(0).toUpperCase()+r.status.slice(1),c=(r.answerForms||[]).at(-1),m=E.toNumericString(r.value??0,c),f=r.maxError?`± ${E.toNumericString(r.maxError,c)}`:"",y=r.value===null?"New Answer":`${d} answer: ${m} ${f}`;return e.createElement("div",{className:"perseus-widget-row answer-option",key:s},e.createElement(G,{animated:!0,expanded:this.state.showAnswerDetails[s],onToggle:()=>{this.onToggleAnswers(s)},header:e.createElement(z,null,y)},e.createElement("div",{className:"input-answer-editor-value-container"+(r.maxError?" with-max-error":"")},e.createElement("label",null,"User input:"),e.createElement(T,{value:r.value,className:"numeric-input-value",placeholder:"answer",format:h.last(r.answerForms||[]),onFormatChange:(u,k)=>{let N;k==="pi"?N=["pi"]:k==="mixed"?N=["proper","mixed"]:(k==="proper"||k==="improper")&&(N=["proper","improper"]),this.updateAnswer(s,{value:x(u,this.context.strings),answerForms:N})},onChange:u=>{this.updateAnswer(s,{value:x(u,this.context.strings)})}}),e.createElement("span",{className:"max-error-plusmn"},"±"),e.createElement(T,{className:"max-error-input-value",placeholder:0,value:l[s].maxError,format:h.last(r.answerForms||[]),onChange:this.updateAnswer(s,"maxError")})),e.createElement("fieldset",{className:"perseus-widget-row"},e.createElement("legend",{className:"inline-options"},"Status:"),e.createElement(a,{answerIndex:s,answerProperty:"status",value:"correct",onClick:()=>{this.onEvaluationChange(s,"correct")}},"Correct"),e.createElement(a,{answerIndex:s,answerProperty:"status",value:"wrong",onClick:()=>{this.onEvaluationChange(s,"wrong")}},"Wrong"),e.createElement(a,{answerIndex:s,answerProperty:"status",value:"ungraded",onClick:()=>{this.onEvaluationChange(s,"ungraded")}},"Ungraded")),o(s),e.createElement("div",{className:"perseus-widget-row"},"(Articles only) Message shown to user:"),p,i(s),e.createElement(I,{startIcon:$,"aria-label":`Delete ${y}`,className:"delete-item-button",onClick:()=>{this.onTrashAnswer(s)},kind:"tertiary"},"Delete")))});return e.createElement("div",{className:"perseus-input-number-editor"},e.createElement(O,{title:"General Settings",isCollapsible:!0,isOpen:this.state.showSettings,onToggle:this.onToggleHeading("Settings")}),e.createElement("div",{className:`perseus-editor-accordion-container ${this.state.showSettings?"expanded":"collapsed"}`},e.createElement("div",{className:"perseus-editor-accordion-content"},b,A,q,F)),e.createElement(O,{title:"Answers",isCollapsible:!0,isOpen:this.state.showAnswers,onToggle:this.onToggleHeading("Answers")}),e.createElement("div",{className:`perseus-editor-accordion-container ${this.state.showAnswers?"expanded":"collapsed"}`},e.createElement("div",{className:"perseus-editor-accordion-content"},D(),e.createElement(I,{kind:"tertiary",onClick:this.addAnswer},"Add new answer"))))}};w.contextType=K,w.widgetName="numeric-input",w.displayName="NumericInputEditor",w.defaultProps=W.defaultWidgetOptions;let P=w;P.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onToggleAnswers",docblock:null,modifiers:[],params:[{name:"answerIndex",optional:!1,type:{name:"number"}}],returns:null},{name:"onToggleAnswerForm",docblock:null,modifiers:[],params:[{name:"answerIndex",optional:!1,type:{name:"number"}},{name:"answerForm",optional:!1,type:null}],returns:null},{name:"onToggleHeading",docblock:null,modifiers:[],params:[{name:"accordionName",optional:!1,type:{name:"string"}}],returns:null},{name:"onTrashAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onSpace",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null},{name:"callback",optional:!1,type:null},{name:"...args",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onEvaluationChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"newStatus",optional:!1,type:null}],returns:null},{name:"updateAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"update",optional:!1,type:null}],returns:null},{name:"addAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"NumericInputEditor",props:{onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(results: any) => any",signature:{arguments:[{type:{name:"any"},name:"results"}],return:{name:"any"}}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
>`},description:""},answers:{defaultValue:{value:`[
    {
        value: null,
        status: "correct",
        message: "",
        simplify: "required",
        answerForms: [],
        strict: false,
        maxError: null,
    },
]`,computed:!1},required:!1},size:{defaultValue:{value:'"normal"',computed:!1},required:!1},coefficient:{defaultValue:{value:"false",computed:!1},required:!1},labelText:{defaultValue:{value:'""',computed:!1},required:!1},rightAlign:{defaultValue:{value:"false",computed:!1},required:!1}}};export{P as N};
