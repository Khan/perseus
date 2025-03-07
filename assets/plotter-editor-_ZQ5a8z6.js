import{U as v,r as k}from"./util-ghoLYzZ7.js";import{_ as o}from"./underscore-885MUNGo.js";import{g as T,h as P}from"./random-util-9WQRKwFZ.js";import"./jquery-5v7aFUvu.js";import{P as E}from"./all-widgets-xxWoER_Q.js";import"./phet-simulation-PcZBIYg8.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-6X1TKNVx.js";import"./article-renderer-1Y4d9x4a.js";import"./hints-renderer-RgK42Kmm.js";import"./renderer-1JXdvfgI.js";import"./base-radio-4XPzCae6.js";import{c as R}from"./components-D4oCUG67.js";import"./i18n-context-Q5gDzbF3.js";import"./svg-image-g2mWRpPd.js";import"./index-smZ6iCr_.js";import{r as e}from"./index-6oxdNXpR.js";import{F as u}from"./index-9gkyvru-.js";import{B as C}from"./blur-input-OAUAq3Aj.js";const{InfoTip:s,NumberInput:f,RangeInput:x,TextListEditor:I}=R,A=E.widget,p="starting",m="correct",q=[p,m];function y(l,t,n){const r=o.clone(l);r.length=t;for(let a=l.length;a<t;a++)r[a]=n;return r}const h={scaleY:1,maxY:10,snapsPerLine:2},w=l=>"$"+k(l,2)+"$",d=class d extends e.Component{constructor(){super(...arguments),this.state={editing:this.props.static?p:m,pic:null,loadedUrl:null,minX:null,maxX:null,tickStep:null},this.fetchPic=t=>{if(this.state.loadedUrl!==t){const n=new Image;n.src=t,n.onload=()=>{this.setState({pic:n,loadedUrl:t})}}},this.handleChangeTickStep=t=>{this.setState({tickStep:t})},this.handleChangeRange=t=>{this.setState({minX:t[0],maxX:t[1]})},this.changeLabelInterval=t=>{this.props.onChange({labelInterval:t})},this.handlePlotterChange=t=>{const n={};n[this.state.editing]=t.values,this.props.onChange(n)},this.changeType=t=>{let n;if(t==="histogram"?(n=[w(0)].concat(this.props.categories),this.props.onChange({type:t,categories:n})):this.props.type==="histogram"?(n=this.props.categories.slice(1),this.props.onChange({type:t,categories:n})):this.props.onChange({type:t}),n){const r=u.findDOMNode(this.refs.categories);r.value=n.join(", ")}},this.changeLabel=(t,n)=>{const r=o.clone(this.props.labels);r[t]=n.target.value,this.props.onChange({labels:r})},this.changePicUrl=t=>{const n=v.getRealImageUrl(t);this.props.onChange({picUrl:n})},this.changeCategories=t=>{let n=t.length;this.props.type==="histogram"&&n--;const r=this.props.scaleY;this.props.onChange({categories:t,correct:y(this.props.correct,n,r),starting:y(this.props.starting,n,r)})},this.changeScale=t=>{const n=this.props.scaleY,r=+t.target.value||h.scaleY,a=function(c){return c*r/n},i=a(this.props.maxY);this.props.onChange({scaleY:r,maxY:i,correct:o.map(this.props.correct,a),starting:o.map(this.props.starting,a)}),u.findDOMNode(this.refs.maxY).value=i},this.changeMax=t=>{this.props.onChange({maxY:+t.target.value||h.maxY})},this.changeSnaps=t=>{this.props.onChange({snapsPerLine:+t.target.value||h.snapsPerLine})},this.changeEditing=t=>{this.setState({editing:t})},this.setCategoriesFromScale=()=>{const t=this.state.tickStep||1,n=this.state.minX||0,r=this.state.maxX||0,a=Math.floor((r-n)/t)*t;let i;this.props.type==="histogram"||this.props.type==="dotplot"?i=o.range(0,a+t,t):i=o.range(t,a+t,t),i=o.map(i,b=>b+n),i=o.map(i,w),this.changeCategories(i);const c=u.findDOMNode(this.refs.categories);c.value=i.join(", ")},this.serialize=()=>{const t=o.pick(this.props,"correct","starting","type","labels","categories","scaleY","maxY","snapsPerLine","labelInterval");return this.props.type==="pic"&&(t.picUrl=this.props.picUrl),t}}UNSAFE_componentWillMount(){this.fetchPic(this.props.picUrl)}UNSAFE_componentWillReceiveProps(t){this.fetchPic(t.picUrl),t.static&&this.setState({editing:"starting"})}render(){const t=o.contains(["line","histogram","dotplot"],this.props.type),n=!o.contains(["pic","dotplot"],this.props.type),r={trackInteraction:()=>{},...this.props};return e.createElement("div",{className:"perseus-widget-plotter-editor"},e.createElement("div",null,"Chart type:"," ",P.map(a=>e.createElement("label",{key:a},e.createElement("input",{type:"radio",name:"chart-type",checked:this.props.type===a,onChange:o.partial(this.changeType,a)}),a),this)),e.createElement("div",null,"Labels:"," ",["x","y"].map((a,i)=>e.createElement("label",{key:a},a+":",e.createElement("input",{type:"text",onChange:o.partial(this.changeLabel,i),defaultValue:this.props.labels[i]})),this)),t&&e.createElement("div",{className:"set-from-scale-box"},e.createElement("span",{className:"categories-title"},"Set Categories From Scale"),e.createElement("div",null,e.createElement("label",null,"Tick Step:"," ",e.createElement(f,{placeholder:1,useArrowKeys:!0,value:this.state.tickStep,onChange:this.handleChangeTickStep})),e.createElement(s,null,e.createElement("p",null,"The difference between adjacent ticks."))),e.createElement("div",null,e.createElement("label",null,"Range:"," ",e.createElement(x,{placeholder:[0,10],useArrowKeys:!0,value:[this.state.minX,this.state.maxX],onChange:this.handleChangeRange}))),e.createElement("div",null,e.createElement("button",{onClick:this.setCategoriesFromScale},"Set Categories"," "))),e.createElement("div",null,e.createElement("label",null,"Label Interval:"," ",e.createElement(f,{useArrowKeys:!0,value:this.props.labelInterval,onChange:this.changeLabelInterval})),e.createElement(s,null,e.createElement("p",null,'Which ticks to display the labels for. For instance, setting this to "4" will only show every 4th label (plus the last one)'))),this.props.type==="pic"&&e.createElement("div",null,e.createElement("label",null,"Picture:"," ",e.createElement(C,{className:"pic-url",value:this.props.picUrl,onChange:this.changePicUrl}),e.createElement(s,null,e.createElement("p",null,'Use the default picture of Earth, or insert the URL for a different picture using the "Add image" function.'))),this.state.pic&&this.state.pic.width!==this.state.pic.height&&e.createElement("p",{className:"warning"},e.createElement("b",null,"Warning"),": You are using a picture which is not square. This means the image will get distorted. You should probably crop it to be square.")),e.createElement("div",null,e.createElement("label",null,"Categories:"," ",e.createElement(I,{ref:"categories",layout:"horizontal",options:this.props.categories,onChange:this.changeCategories}))),e.createElement("div",null,e.createElement("label",null,"Scale (y):"," ",e.createElement("input",{type:"text",onChange:this.changeScale,defaultValue:this.props.scaleY}))),e.createElement("div",null,e.createElement("label",null,"Max y:"," ",e.createElement("input",{type:"text",ref:"maxY",onChange:this.changeMax,defaultValue:this.props.maxY}))),n&&e.createElement("div",null,e.createElement("label",null,"Snaps per line:"," ",e.createElement("input",{type:"text",onChange:this.changeSnaps,defaultValue:this.props.snapsPerLine})),e.createElement(s,null,e.createElement("p",null,"Creates the specified number of divisions between the horizontal lines. Fewer snaps between lines makes the graph easier for the student to create correctly."))),e.createElement("div",null,"Editing values:"," ",q.map(a=>e.createElement("label",{key:a},e.createElement("input",{type:"radio",disabled:a===m&&this.props.static,checked:this.props.static?a===p:this.state.editing===a,onChange:i=>this.changeEditing(a)}),a)),e.createElement(s,null,e.createElement("p",null,"Use this toggle to switch between editing the correct answer (what the student will be graded on) and the starting values (what the student will see plotted when they start the problem). Note: These cannot be the same."),e.createElement("p",null,"In static mode, the starting values are rendered out to the displayed widget."))),e.createElement(A,{...r,starting:this.props[this.state.editing],onChange:this.handlePlotterChange}))}};d.widgetName="plotter",d.defaultProps=T.defaultWidgetOptions;let g=d;g.__docgenInfo={description:"",methods:[{name:"fetchPic",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null}],returns:null},{name:"handleChangeTickStep",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handleChangeRange",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"changeLabelInterval",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handlePlotterChange",docblock:null,modifiers:[],params:[{name:"newProps",optional:!1,type:null}],returns:null},{name:"changeType",docblock:null,modifiers:[],params:[{name:"type",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changePicUrl",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"changeCategories",docblock:null,modifiers:[],params:[{name:"categories",optional:!1,type:null}],returns:null},{name:"changeScale",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeMax",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeSnaps",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeEditing",docblock:null,modifiers:[],params:[{name:"editing",optional:!1,type:null}],returns:null},{name:"setCategoriesFromScale",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PlotterEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},type:{required:!1,tsType:{name:"unknown[number]",raw:'PerseusPlotterWidgetOptions["type"]'},description:"",defaultValue:{value:'"bar"',computed:!1}},labels:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"Array<string>"},description:"",defaultValue:{value:'["", ""]',computed:!1}},categories:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"},description:"",defaultValue:{value:'[""]',computed:!1}},scaleY:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},maxY:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},snapsPerLine:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},picSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"30",computed:!1}},picBoxHeight:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"36",computed:!1}},picUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"null",computed:!1}},plotDimensions:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[275, 200]",computed:!1}},labelInterval:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},starting:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[1]",computed:!1}},correct:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[1]",computed:!1}},static:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"any"},description:""}}};export{g as P};
