import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{c as R}from"./article-renderer-Nm6nWLzv.js";import{_ as i}from"./index-default-4_ZsnO94.js";import{U as j}from"./util-Jthj9rdu.js";import"./phet-simulation-pOxVezY_.js";import"./version-akiLXZts.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-_PWPZoDE.js";import"./perseus-item-3DFBct6k.js";import"./hints-renderer-8hxNc4JN.js";import"./renderer-6NA0iXnA.js";import"./base-radio-bVkzrW19.js";import{c as E}from"./components-_dRnVEd6.js";import{i as C}from"./icon-paths-5JCXzGsq.js";import{P as q}from"./i18n-context-JRliD99t.js";import"./svg-image-g7d4yR9E.js";import"./underscore-H6_Y1mVe.js";import"./jquery-5v7aFUvu.js";import"./index-smZ6iCr_.js";import{E as F}from"./editor-jsonify-79ddHqKs.js";import{C as f}from"./index-PZ6neixd.js";import{r as D}from"./index-6oxdNXpR.js";import{E as M}from"./editor-ppN5PHKP.js";import{c as S}from"./icon-paths-EoBkHOLI.js";const{ButtonGroup:A,InfoTip:p,InlineIcon:N,MultiButtonGroup:G,NumberInput:b,TextInput:W}=E,{firstNumericalParse:k}=j,K=[{title:"Integers",value:"integer",content:"6"},{title:"Decimals",value:"decimal",content:"0.75"},{title:"Proper fractions",value:"proper",content:"⅗"},{title:"Improper fractions",value:"improper",content:"⁷⁄₄"},{title:"Mixed numbers",value:"mixed",content:"1¾"},{title:"Numbers with π",value:"pi",content:"π"}],y=P=>({value:null,status:P,message:"",simplify:"required",answerForms:[],strict:!1,maxError:null}),c=class c extends D.Component{constructor(l){super(l),this.change=(...t)=>R.apply(this,t),this.onToggleOptions=t=>{const a=this.state.showOptions.slice();a[t]=!a[t],this.setState({showOptions:a})},this.onTrashAnswer=t=>{if(t>=0&&t<this.props.answers.length){const a=this.props.answers.slice(0);a.splice(t,1),this.props.onChange({answers:a})}},this.onSpace=(t,a,...o)=>{t.key===" "&&(t.preventDefault(),a.apply(this,o))},this.onStatusChange=t=>{const a=["wrong","ungraded","correct"],o=this.props.answers,d=i.indexOf(a,o[t].status),u=a[(d+1)%a.length];this.updateAnswer(t,{status:u,simplify:u==="correct"?"required":"accepted"})},this.updateAnswer=(t,a)=>{if(!i.isObject(a))return i.partial((d,u,w)=>{const h={};h[u]=w,this.updateAnswer(d,h)},t,a);let o=[...this.props.answers];if(t===o.length){const d=y(this.state.lastStatus);o=o.concat(d)}o[t]=i.extend({},o[t],a),this.props.onChange({answers:o})},this.addAnswer=()=>{const t=y(this.state.lastStatus),a=this.props.answers.concat(t);this.props.onChange({answers:a})},this.getSaveWarnings=()=>{const t=[];return i.contains(i.pluck(this.props.answers,"value"),"")&&t.push("One or more answers is empty"),this.props.answers.forEach((a,o)=>{a.strict&&(!a.answerForms||a.answerForms.length===0)&&t.push(`Answer ${o+1} is set to string format matching, but no format was selected`)}),t},this.serialize=()=>F.serialize.call(this),this.state={lastStatus:"wrong",showOptions:i.map(this.props.answers,()=>!1)}}render(){const l=this.props.answers,t=n=>e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Unsimplified answers are"}),e.jsx(A,{value:l[n].simplify,allowEmpty:!1,buttons:[{value:"required",content:"ungraded"},{value:"optional",content:"accepted"},{value:"enforced",content:"wrong"}],onChange:this.updateAnswer(n,"simplify")||(()=>{})}),e.jsxs(p,{children:[e.jsx("p",{children:'Normally select "ungraded". This will give the user a message saying the answer is correct but not simplified. The user will then have to simplify it and re-enter, but will not be penalized. (5th grade and after)'}),e.jsx("p",{children:'Select "accepted" only if the user is not expected to know how to simplify fractions yet. (Anything prior to 5th grade)'}),e.jsxs("p",{children:['Select "wrong" ',e.jsx("em",{children:"only"})," if we are specifically assessing the ability to simplify."]})]})]}),a=n=>e.jsxs("div",{children:[e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Choose the suggested answer formats"}),e.jsx(G,{buttons:K,values:l[n].answerForms,onChange:this.updateAnswer(n,"answerForms")||(()=>{})}),e.jsxs(p,{children:[e.jsx("p",{children:'Formats will be autoselected for you based on the given answer; to show no suggested formats and accept all types, simply have a decimal/integer be the answer. Values with π will have format "pi", and values that are fractions will have some subset (mixed will be "mixed" and "proper"; improper/proper will both be "improper" and "proper"). If you would like to specify that it is only a proper fraction (or only a mixed/improper fraction), deselect the other format. Except for specific cases, you should not need to change the autoselected formats.'}),e.jsxs("p",{children:["To restrict the answer to ",e.jsx("em",{children:"only"}),' an improper fraction (i.e. 7/4), select the improper fraction and toggle "strict" to true. This'," ",e.jsx("b",{children:"will not"})," accept 1.75 as an answer."," "]}),e.jsx("p",{children:"Unless you are testing that specific skill, please do not restrict the answer format."})]})]}),e.jsx("div",{className:"perseus-widget-row",children:e.jsx(f,{label:"Strictly match only these formats",checked:l[n].strict,onChange:s=>{this.updateAnswer.bind(this,n)({strict:s})}})})]}),o=n=>e.jsx("div",{className:"perseus-widget-row",children:e.jsxs("label",{children:["Max error"," ",e.jsx(b,{className:"max-error",value:l[n].maxError,onChange:this.updateAnswer(n,"maxError"),placeholder:"0"})]})}),d=e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx("label",{children:"Width: "}),e.jsx(A,{value:this.props.size,allowEmpty:!1,buttons:[{value:"normal",content:"Normal (80px)"},{value:"small",content:"Small (40px)"}],onChange:this.change("size")}),e.jsx(p,{children:e.jsx("p",{children:'Use size "Normal" for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.'})})]}),u=e.jsx("div",{className:"perseus-widget-row",children:e.jsx(f,{label:"Right alignment",checked:this.props.rightAlign,onChange:n=>{this.props.onChange({rightAlign:n})}})}),w=e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("label",{children:["Aria label",e.jsx(W,{value:this.props.labelText,onChange:this.change("labelText")})]}),e.jsx(p,{children:e.jsx("p",{children:"Text to describe this input. This will be shown to users using screenreaders."})})]}),h=e.jsx("div",{children:e.jsxs("div",{className:"perseus-widget-row",children:[e.jsx(f,{label:"Coefficient",checked:this.props.coefficient,onChange:n=>{this.props.onChange({coefficient:n})}}),e.jsx(p,{children:e.jsx("p",{children:"A coefficient style number allows the student to use - for -1 and an empty string to mean 1."})})]})}),x=e.jsx("div",{children:e.jsx("a",{href:"#",className:"simple-button orange",onClick:n=>{n.preventDefault(),this.addAnswer()},onKeyDown:n=>this.onSpace(n,this.addAnswer),children:e.jsx("span",{children:"Add new answer"})})}),O={wrong:"(address the mistake/misconception)",ungraded:"(explain in detail to avoid confusion)",correct:"(reinforce the user's understanding)"},I=()=>l.map((n,s)=>{const T=e.jsx(M,{apiOptions:this.props.apiOptions,content:n.message||"",placeholder:"Why is this answer "+n.status+"?	"+O[n.status],widgetEnabled:!1,onChange:r=>{"content"in r&&this.updateAnswer(s,{message:r.content})}});return e.jsxs("div",{className:"perseus-widget-row",children:[e.jsxs("div",{className:"input-answer-editor-value-container"+(n.maxError?" with-max-error":""),children:[e.jsx(b,{value:n.value,className:"numeric-input-value",placeholder:"answer",format:i.last(n.answerForms||[]),onFormatChange:(r,m)=>{let g;m==="pi"?g=["pi"]:m==="mixed"?g=["proper","mixed"]:(m==="proper"||m==="improper")&&(g=["proper","improper"]),this.updateAnswer(s,{value:k(r,this.context.strings),answerForms:g})},onChange:r=>{this.updateAnswer(s,{value:k(r,this.context.strings)})}}),n.strict&&e.jsx("div",{className:"is-strict-indicator",title:"strictly equivalent to",children:"≡"}),n.simplify!=="required"&&n.status==="correct"&&e.jsx("div",{className:"simplify-indicator "+n.simplify,title:"accepts unsimplified answers",children:"‰"}),n.maxError?e.jsxs("div",{className:"max-error-container",children:[e.jsx("div",{className:"max-error-plusmn",children:"±"}),e.jsx(b,{placeholder:0,value:l[s].maxError,format:i.last(n.answerForms||[]),onChange:this.updateAnswer(s,"maxError")})]}):null,e.jsx("div",{className:"value-divider"}),e.jsx("a",{href:"#",className:"answer-status "+n.status,onClick:r=>{r.preventDefault(),this.onStatusChange(s)},onKeyDown:r=>this.onSpace(r,this.onStatusChange),children:n.status}),e.jsx("a",{href:"#",className:"answer-trash","aria-label":"Delete answer",onClick:r=>{r.preventDefault(),this.onTrashAnswer(s)},onKeyDown:r=>this.onSpace(r,this.onTrashAnswer),children:e.jsx(N,{...C})}),e.jsx("a",{href:"#",className:"options-toggle","aria-label":"Toggle options",onClick:r=>{r.preventDefault(),this.onToggleOptions(s)},onKeyDown:r=>this.onSpace(r,this.onToggleOptions),children:e.jsx(N,{...S})})]}),e.jsx("div",{className:"input-answer-editor-message",children:T}),this.state.showOptions[s]&&e.jsxs("div",{className:"options-container",children:[o(s),n.status==="correct"&&t(s),a(s)]})]},s)});return e.jsxs("div",{className:"perseus-input-number-editor",children:[e.jsx("div",{className:"ui-title",children:"User input"}),e.jsx("div",{className:"msg-title",children:"Message shown to user on attempt"}),I(),x,d,u,h,w]})}};c.contextType=q,c.widgetName="numeric-input",c.displayName="NumericInputEditor",c.defaultProps={answers:[y("correct")],size:"normal",coefficient:!1,labelText:"",rightAlign:!1};let v=c;v.__docgenInfo={description:"",methods:[{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"onToggleOptions",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onTrashAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"onSpace",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null},{name:"callback",optional:!1,type:null},{name:"...args",optional:!1,type:null}],returns:null},{name:"onStatusChange",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null}],returns:null},{name:"updateAnswer",docblock:null,modifiers:[],params:[{name:"choiceIndex",optional:!1,type:null},{name:"update",optional:!1,type:null}],returns:null},{name:"addAnswer",docblock:null,modifiers:[],params:[],returns:null},{name:"getSaveWarnings",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"NumericInputEditor",props:{answers:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    message: string;
    value: number;
    status: string;
    answerForms?: ReadonlyArray<MathFormat>;
    strict: boolean;
    maxError: number | null | undefined;
    simplify: string | null | undefined;
}`,signature:{properties:[{key:"message",value:{name:"string",required:!0}},{key:"value",value:{name:"number",required:!0}},{key:"status",value:{name:"string",required:!0}},{key:"answerForms",value:{name:"ReadonlyArray",elements:[{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}]}],raw:"ReadonlyArray<MathFormat>",required:!1}},{key:"strict",value:{name:"boolean",required:!0}},{key:"maxError",value:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}],required:!0}},{key:"simplify",value:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswer>"},description:"",defaultValue:{value:'[initAnswer("correct")]',computed:!1}},labelText:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},size:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"normal"',computed:!1}},coefficient:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},rightAlign:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},static:{required:!1,tsType:{name:"boolean"},description:""},answerForms:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    simplify:
        | "required"
        | "correct"
        | "enforced"
        | "optional"
        | null
        | undefined;
    name: MathFormat;
}`,signature:{properties:[{key:"simplify",value:{name:"union",raw:`| "required"
| "correct"
| "enforced"
| "optional"
| null
| undefined`,elements:[{name:"literal",value:'"required"'},{name:"literal",value:'"correct"'},{name:"literal",value:'"enforced"'},{name:"literal",value:'"optional"'},{name:"null"},{name:"undefined"}],required:!0}},{key:"name",value:{name:"union",raw:`| "integer"
| "mixed"
| "improper"
| "proper"
| "decimal"
| "percent"
| "pi"`,elements:[{name:"literal",value:'"integer"'},{name:"literal",value:'"mixed"'},{name:"literal",value:'"improper"'},{name:"literal",value:'"proper"'},{name:"literal",value:'"decimal"'},{name:"literal",value:'"percent"'},{name:"literal",value:'"pi"'}],required:!0}}]}}],raw:"ReadonlyArray<PerseusNumericInputAnswerForm>"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(results: any) => any",signature:{arguments:[{type:{name:"any"},name:"results"}],return:{name:"any"}}},description:""},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"intersection",raw:`APIOptions & {
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
        mafs?: false | {[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean};
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
>`},description:""}}};export{v as N};
