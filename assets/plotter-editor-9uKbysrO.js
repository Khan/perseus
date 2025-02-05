import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{U as v,r as k}from"./util-CFc6mjZH.js";import{_ as s}from"./index-default-4_ZsnO94.js";import{g as x,h as T}from"./core-widget-registry-uiKfW1Am.js";import"./jquery-5v7aFUvu.js";import{P}from"./article-renderer-VuAn1Cmu.js";import"./phet-simulation--dXVcXc8.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-DO0X8arb.js";import"./server-item-renderer-P4o5zyf_.js";import"./hints-renderer-e5Yk3Sr5.js";import"./renderer-Fnk1NeV5.js";import"./base-radio-ap_gaQiI.js";import{c as R}from"./components-fhlCid_0.js";import"./i18n-context-ixQPsVqr.js";import"./svg-image-qrz0lnAf.js";import"./index-smZ6iCr_.js";import{r as C}from"./index-6oxdNXpR.js";import{F as h}from"./index-9gkyvru-.js";import{B as j}from"./blur-input-6j4bgLwx.js";const{InfoTip:o,NumberInput:f,RangeInput:A,TextListEditor:I}=R,q=P.widget,u="starting",m="correct",F=[u,m];function y(l,n,t){const r=s.clone(l);r.length=n;for(let a=l.length;a<n;a++)r[a]=t;return r}const p={scaleY:1,maxY:10,snapsPerLine:2},b=l=>"$"+k(l,2)+"$",d=class d extends C.Component{constructor(){super(...arguments),this.state={editing:this.props.static?u:m,pic:null,loadedUrl:null,minX:null,maxX:null,tickStep:null},this.fetchPic=n=>{if(this.state.loadedUrl!==n){const t=new Image;t.src=n,t.onload=()=>{this.setState({pic:t,loadedUrl:n})}}},this.handleChangeTickStep=n=>{this.setState({tickStep:n})},this.handleChangeRange=n=>{this.setState({minX:n[0],maxX:n[1]})},this.changeLabelInterval=n=>{this.props.onChange({labelInterval:n})},this.handlePlotterChange=n=>{const t={};t[this.state.editing]=n.values,this.props.onChange(t)},this.changeType=n=>{let t;if(n==="histogram"?(t=[b(0)].concat(this.props.categories),this.props.onChange({type:n,categories:t})):this.props.type==="histogram"?(t=this.props.categories.slice(1),this.props.onChange({type:n,categories:t})):this.props.onChange({type:n}),t){const r=h.findDOMNode(this.refs.categories);r.value=t.join(", ")}},this.changeLabel=(n,t)=>{const r=s.clone(this.props.labels);r[n]=t.target.value,this.props.onChange({labels:r})},this.changePicUrl=n=>{const t=v.getRealImageUrl(n);this.props.onChange({picUrl:t})},this.changeCategories=n=>{let t=n.length;this.props.type==="histogram"&&t--;const r=this.props.scaleY;this.props.onChange({categories:n,correct:y(this.props.correct,t,r),starting:y(this.props.starting,t,r)})},this.changeScale=n=>{const t=this.props.scaleY,r=+n.target.value||p.scaleY,a=function(c){return c*r/t},i=a(this.props.maxY);this.props.onChange({scaleY:r,maxY:i,correct:s.map(this.props.correct,a),starting:s.map(this.props.starting,a)}),h.findDOMNode(this.refs.maxY).value=i},this.changeMax=n=>{this.props.onChange({maxY:+n.target.value||p.maxY})},this.changeSnaps=n=>{this.props.onChange({snapsPerLine:+n.target.value||p.snapsPerLine})},this.changeEditing=n=>{this.setState({editing:n})},this.setCategoriesFromScale=()=>{const n=this.state.tickStep||1,t=this.state.minX||0,r=this.state.maxX||0,a=Math.floor((r-t)/n)*n;let i;this.props.type==="histogram"||this.props.type==="dotplot"?i=s.range(0,a+n,n):i=s.range(n,a+n,n),i=s.map(i,w=>w+t),i=s.map(i,b),this.changeCategories(i);const c=h.findDOMNode(this.refs.categories);c.value=i.join(", ")},this.serialize=()=>{const n=s.pick(this.props,"correct","starting","type","labels","categories","scaleY","maxY","snapsPerLine","labelInterval");return this.props.type==="pic"&&(n.picUrl=this.props.picUrl),n}}UNSAFE_componentWillMount(){this.fetchPic(this.props.picUrl)}UNSAFE_componentWillReceiveProps(n){this.fetchPic(n.picUrl),n.static&&this.setState({editing:"starting"})}render(){const n=s.contains(["line","histogram","dotplot"],this.props.type),t=!s.contains(["pic","dotplot"],this.props.type),r={trackInteraction:()=>{},...this.props};return e.jsxs("div",{className:"perseus-widget-plotter-editor",children:[e.jsxs("div",{children:["Chart type:"," ",T.map(a=>e.jsxs("label",{children:[e.jsx("input",{type:"radio",name:"chart-type",checked:this.props.type===a,onChange:s.partial(this.changeType,a)}),a]},a),this)]}),e.jsxs("div",{children:["Labels:"," ",["x","y"].map((a,i)=>e.jsxs("label",{children:[a+":",e.jsx("input",{type:"text",onChange:s.partial(this.changeLabel,i),defaultValue:this.props.labels[i]})]},a),this)]}),n&&e.jsxs("div",{className:"set-from-scale-box",children:[e.jsx("span",{className:"categories-title",children:"Set Categories From Scale"}),e.jsxs("div",{children:[e.jsxs("label",{children:["Tick Step:"," ",e.jsx(f,{placeholder:1,useArrowKeys:!0,value:this.state.tickStep,onChange:this.handleChangeTickStep})]}),e.jsx(o,{children:e.jsx("p",{children:"The difference between adjacent ticks."})})]}),e.jsx("div",{children:e.jsxs("label",{children:["Range:"," ",e.jsx(A,{placeholder:[0,10],useArrowKeys:!0,value:[this.state.minX,this.state.maxX],onChange:this.handleChangeRange})]})}),e.jsx("div",{children:e.jsxs("button",{onClick:this.setCategoriesFromScale,children:["Set Categories"," "]})})]}),e.jsxs("div",{children:[e.jsxs("label",{children:["Label Interval:"," ",e.jsx(f,{useArrowKeys:!0,value:this.props.labelInterval,onChange:this.changeLabelInterval})]}),e.jsx(o,{children:e.jsx("p",{children:'Which ticks to display the labels for. For instance, setting this to "4" will only show every 4th label (plus the last one)'})})]}),this.props.type==="pic"&&e.jsxs("div",{children:[e.jsxs("label",{children:["Picture:"," ",e.jsx(j,{className:"pic-url",value:this.props.picUrl,onChange:this.changePicUrl}),e.jsx(o,{children:e.jsx("p",{children:'Use the default picture of Earth, or insert the URL for a different picture using the "Add image" function.'})})]}),this.state.pic&&this.state.pic.width!==this.state.pic.height&&e.jsxs("p",{className:"warning",children:[e.jsx("b",{children:"Warning"}),": You are using a picture which is not square. This means the image will get distorted. You should probably crop it to be square."]})]}),e.jsx("div",{children:e.jsxs("label",{children:["Categories:"," ",e.jsx(I,{ref:"categories",layout:"horizontal",options:this.props.categories,onChange:this.changeCategories})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Scale (y):"," ",e.jsx("input",{type:"text",onChange:this.changeScale,defaultValue:this.props.scaleY})]})}),e.jsx("div",{children:e.jsxs("label",{children:["Max y:"," ",e.jsx("input",{type:"text",ref:"maxY",onChange:this.changeMax,defaultValue:this.props.maxY})]})}),t&&e.jsxs("div",{children:[e.jsxs("label",{children:["Snaps per line:"," ",e.jsx("input",{type:"text",onChange:this.changeSnaps,defaultValue:this.props.snapsPerLine})]}),e.jsx(o,{children:e.jsx("p",{children:"Creates the specified number of divisions between the horizontal lines. Fewer snaps between lines makes the graph easier for the student to create correctly."})})]}),e.jsxs("div",{children:["Editing values:"," ",F.map(a=>e.jsxs("label",{children:[e.jsx("input",{type:"radio",disabled:a===m&&this.props.static,checked:this.props.static?a===u:this.state.editing===a,onChange:i=>this.changeEditing(a)}),a]},a)),e.jsxs(o,{children:[e.jsx("p",{children:"Use this toggle to switch between editing the correct answer (what the student will be graded on) and the starting values (what the student will see plotted when they start the problem). Note: These cannot be the same."}),e.jsx("p",{children:"In static mode, the starting values are rendered out to the displayed widget."})]})]}),e.jsx(q,{...r,starting:this.props[this.state.editing],onChange:this.handlePlotterChange})]})}};d.widgetName="plotter",d.defaultProps=x.defaultWidgetOptions;let g=d;g.__docgenInfo={description:"",methods:[{name:"fetchPic",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null}],returns:null},{name:"handleChangeTickStep",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handleChangeRange",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"changeLabelInterval",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handlePlotterChange",docblock:null,modifiers:[],params:[{name:"newProps",optional:!1,type:null}],returns:null},{name:"changeType",docblock:null,modifiers:[],params:[{name:"type",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changePicUrl",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"changeCategories",docblock:null,modifiers:[],params:[{name:"categories",optional:!1,type:null}],returns:null},{name:"changeScale",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeMax",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeSnaps",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeEditing",docblock:null,modifiers:[],params:[{name:"editing",optional:!1,type:null}],returns:null},{name:"setCategoriesFromScale",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PlotterEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
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
}>`},description:""},type:{required:!1,tsType:{name:"unknown[number]",raw:'PerseusPlotterWidgetOptions["type"]'},description:"",defaultValue:{value:'"bar"',computed:!1}},labels:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"Array<string>"},description:"",defaultValue:{value:'["", ""]',computed:!1}},categories:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"},description:"",defaultValue:{value:'[""]',computed:!1}},scaleY:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},maxY:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},snapsPerLine:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},picSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"30",computed:!1}},picBoxHeight:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"36",computed:!1}},picUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"null",computed:!1}},plotDimensions:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[275, 200]",computed:!1}},labelInterval:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},starting:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[1]",computed:!1}},correct:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[1]",computed:!1}},static:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"any"},description:""}}};export{g as P};
