var k=Object.defineProperty;var x=(l,d,e)=>d in l?k(l,d,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[d]=e;var r=(l,d,e)=>(x(l,typeof d!="symbol"?d+"":d,e),e);import{r as P,ce as T,aU as p,_ as o,aB as R,j as n,cf as C,cg as I,ch as j}from"./iframe-BT7dGlf3.js";import"./item-version-C7889Hsx.js";import"./article-renderer-5bctE__9.js";import"./server-item-renderer-DYK2JkIt.js";import"./hints-renderer-Btvs3bhD.js";import{c as A}from"./components-CvRtWeXJ.js";import{B as q}from"./blur-input-Bw18AfQQ.js";const{InfoTip:c,NumberInput:y,RangeInput:S,TextListEditor:F}=A,E=I.widget,m="starting",g="correct",N=[m,g];function b(l,d,e){const t=o.clone(l);t.length=d;for(let i=l.length;i<d;i++)t[i]=e;return t}const u={scaleY:1,maxY:10,snapsPerLine:2},w=l=>"$"+j(l,2)+"$";class f extends P.Component{constructor(){super(...arguments);r(this,"state",{editing:this.props.static?m:g,pic:null,loadedUrl:null,minX:null,maxX:null,tickStep:null});r(this,"fetchPic",e=>{if(this.state.loadedUrl!==e){const t=new Image;t.src=e,t.onload=()=>{this.setState({pic:t,loadedUrl:e})}}});r(this,"handleChangeTickStep",e=>{this.setState({tickStep:e})});r(this,"handleChangeRange",e=>{this.setState({minX:e[0],maxX:e[1]})});r(this,"changeLabelInterval",e=>{this.props.onChange({labelInterval:e})});r(this,"handlePlotterChange",e=>{const t={};t[this.state.editing]=e.values,this.props.onChange(t)});r(this,"changeType",e=>{let t;if(e==="histogram"?(t=[w(0)].concat(this.props.categories),this.props.onChange({type:e,categories:t})):this.props.type==="histogram"?(t=this.props.categories.slice(1),this.props.onChange({type:e,categories:t})):this.props.onChange({type:e}),t){const i=p.findDOMNode(this.refs.categories);i.value=t.join(", ")}});r(this,"changeLabel",(e,t)=>{const i=o.clone(this.props.labels);i[e]=t.target.value,this.props.onChange({labels:i})});r(this,"changePicUrl",e=>{const t=R.getRealImageUrl(e);this.props.onChange({picUrl:t})});r(this,"changeCategories",e=>{let t=e.length;this.props.type==="histogram"&&t--;const i=this.props.scaleY;this.props.onChange({categories:e,correct:b(this.props.correct,t,i),starting:b(this.props.starting,t,i)})});r(this,"changeScale",e=>{const t=this.props.scaleY,i=+e.target.value||u.scaleY,a=function(h){return h*i/t},s=a(this.props.maxY);this.props.onChange({scaleY:i,maxY:s,correct:o.map(this.props.correct,a),starting:o.map(this.props.starting,a)}),p.findDOMNode(this.refs.maxY).value=s});r(this,"changeMax",e=>{this.props.onChange({maxY:+e.target.value||u.maxY})});r(this,"changeSnaps",e=>{this.props.onChange({snapsPerLine:+e.target.value||u.snapsPerLine})});r(this,"changeEditing",e=>{this.setState({editing:e})});r(this,"setCategoriesFromScale",()=>{const e=this.state.tickStep||1,t=this.state.minX||0,i=this.state.maxX||0,a=Math.floor((i-t)/e)*e;let s;this.props.type==="histogram"||this.props.type==="dotplot"?s=o.range(0,a+e,e):s=o.range(e,a+e,e),s=o.map(s,v=>v+t),s=o.map(s,w),this.changeCategories(s);const h=p.findDOMNode(this.refs.categories);h.value=s.join(", ")});r(this,"serialize",()=>{const e=o.pick(this.props,"correct","starting","type","labels","categories","scaleY","maxY","snapsPerLine","labelInterval");return this.props.type==="pic"&&(e.picUrl=this.props.picUrl),e})}UNSAFE_componentWillMount(){this.fetchPic(this.props.picUrl)}UNSAFE_componentWillReceiveProps(e){this.fetchPic(e.picUrl),e.static&&this.setState({editing:"starting"})}render(){const e=o.contains(["line","histogram","dotplot"],this.props.type),t=!o.contains(["pic","dotplot"],this.props.type),i={...this.props,trackInteraction:()=>{},starting:this.props[this.state.editing],onChange:this.handlePlotterChange,userInput:this.props.correct,handleUserInput:a=>{this.props.onChange({correct:a})}};return n.jsxs("div",{className:"perseus-widget-plotter-editor",children:[n.jsxs("div",{children:["Chart type:"," ",C.map(a=>n.jsxs("label",{children:[n.jsx("input",{type:"radio",name:"chart-type",checked:this.props.type===a,onChange:o.partial(this.changeType,a)}),a]},a),this)]}),n.jsxs("div",{children:["Labels:"," ",["x","y"].map((a,s)=>n.jsxs("label",{children:[a+":",n.jsx("input",{type:"text",onChange:o.partial(this.changeLabel,s),defaultValue:this.props.labels[s]})]},a),this)]}),e&&n.jsxs("div",{className:"set-from-scale-box",children:[n.jsx("span",{className:"categories-title",children:"Set Categories From Scale"}),n.jsxs("div",{children:[n.jsxs("label",{children:["Tick Step:"," ",n.jsx(y,{placeholder:1,useArrowKeys:!0,value:this.state.tickStep,onChange:this.handleChangeTickStep})]}),n.jsx(c,{children:n.jsx("p",{children:"The difference between adjacent ticks."})})]}),n.jsx("div",{children:n.jsxs("label",{children:["Range:"," ",n.jsx(S,{placeholder:[0,10],useArrowKeys:!0,value:[this.state.minX,this.state.maxX],onChange:this.handleChangeRange})]})}),n.jsx("div",{children:n.jsxs("button",{onClick:this.setCategoriesFromScale,children:["Set Categories"," "]})})]}),n.jsxs("div",{children:[n.jsxs("label",{children:["Label Interval:"," ",n.jsx(y,{useArrowKeys:!0,value:this.props.labelInterval,onChange:this.changeLabelInterval})]}),n.jsx(c,{children:n.jsx("p",{children:'Which ticks to display the labels for. For instance, setting this to "4" will only show every 4th label (plus the last one)'})})]}),this.props.type==="pic"&&n.jsxs("div",{children:[n.jsxs("label",{children:["Picture:"," ",n.jsx(q,{className:"pic-url",value:this.props.picUrl,onChange:this.changePicUrl}),n.jsx(c,{children:n.jsx("p",{children:'Use the default picture of Earth, or insert the URL for a different picture using the "Add image" function.'})})]}),this.state.pic&&this.state.pic.width!==this.state.pic.height&&n.jsxs("p",{className:"warning",children:[n.jsx("b",{children:"Warning"}),": You are using a picture which is not square. This means the image will get distorted. You should probably crop it to be square."]})]}),n.jsx("div",{children:n.jsxs("label",{children:["Categories:"," ",n.jsx(F,{ref:"categories",layout:"horizontal",options:this.props.categories,onChange:this.changeCategories})]})}),n.jsx("div",{children:n.jsxs("label",{children:["Scale (y):"," ",n.jsx("input",{type:"text",onChange:this.changeScale,defaultValue:this.props.scaleY})]})}),n.jsx("div",{children:n.jsxs("label",{children:["Max y:"," ",n.jsx("input",{type:"text",ref:"maxY",onChange:this.changeMax,defaultValue:this.props.maxY})]})}),t&&n.jsxs("div",{children:[n.jsxs("label",{children:["Snaps per line:"," ",n.jsx("input",{type:"text",onChange:this.changeSnaps,defaultValue:this.props.snapsPerLine})]}),n.jsx(c,{children:n.jsx("p",{children:"Creates the specified number of divisions between the horizontal lines. Fewer snaps between lines makes the graph easier for the student to create correctly."})})]}),n.jsxs("div",{children:["Editing values:"," ",N.map(a=>n.jsxs("label",{children:[n.jsx("input",{type:"radio",disabled:a===g&&this.props.static,checked:this.props.static?a===m:this.state.editing===a,onChange:s=>this.changeEditing(a)}),a]},a)),n.jsxs(c,{children:[n.jsx("p",{children:"Use this toggle to switch between editing the correct answer (what the student will be graded on) and the starting values (what the student will see plotted when they start the problem). Note: These cannot be the same."}),n.jsx("p",{children:"In static mode, the starting values are rendered out to the displayed widget."})]})]}),n.jsx(E,{...i})]})}}r(f,"widgetName","plotter"),r(f,"defaultProps",T.defaultWidgetOptions);f.__docgenInfo={description:"",methods:[{name:"fetchPic",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null}],returns:null},{name:"handleChangeTickStep",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handleChangeRange",docblock:null,modifiers:[],params:[{name:"newValue",optional:!1,type:null}],returns:null},{name:"changeLabelInterval",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"handlePlotterChange",docblock:null,modifiers:[],params:[{name:"newProps",optional:!1,type:null}],returns:null},{name:"changeType",docblock:null,modifiers:[],params:[{name:"type",optional:!1,type:null}],returns:null},{name:"changeLabel",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"changePicUrl",docblock:null,modifiers:[],params:[{name:"value",optional:!1,type:null}],returns:null},{name:"changeCategories",docblock:null,modifiers:[],params:[{name:"categories",optional:!1,type:null}],returns:null},{name:"changeScale",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeMax",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeSnaps",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null},{name:"changeEditing",docblock:null,modifiers:[],params:[{name:"editing",optional:!1,type:null}],returns:null},{name:"setCategoriesFromScale",docblock:null,modifiers:[],params:[],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"PlotterEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
    /** Indicates whether or not to use mobile app styling. */
    isMobileApp?: boolean;
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
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     *
     * @deprecated [LEMS-3185] this is externalizing an internal implementation
     * detail similar to serialized state
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
keypadElementPropType from math-input/src/prop-types.js.`},{key:"isMobile",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile styling."},{key:"isMobileApp",value:{name:"boolean",required:!1},description:"Indicates whether or not to use mobile app styling."},{key:"setDrawingAreaAvailable",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1},description:`A function, called with a bool indicating whether use of the
drawing area (scratchpad) should be allowed/disallowed.

Previously handled by \`Khan.scratchpad.enable/disable\``},{key:"hintProgressColor",value:{name:"string",required:!1},description:"The color used for the hint progress indicator (eg. 1 / 3)"},{key:"canScrollPage",value:{name:"boolean",required:!1},description:`Whether this Renderer is allowed to auto-scroll the rest of the
page. For example, if this is enabled, the most recently used
radio widget will attempt to keep the "selected" answer in view
after entering review mode.

Defaults to \`false\`.`},{key:"editorChangeDelay",value:{name:"number",required:!1},description:`The value in milliseconds by which the local state of content
in a editor is delayed before propagated to a prop. For example,
when text is typed in the text area of an Editor component,
there will be a delay equal to the value of \`editorChangeDelay\`
before the change is propagated. This is added for better
responsiveness of the editor when used in certain contexts such
as StructuredItem exercises where constant re-rendering for each
keystroke caused text typed in the text area to appear in it
only after a good few seconds.`},{key:"flags",value:{name:"Record",elements:[{name:"unknown[number]",raw:"(typeof PerseusFeatureFlags)[number]"},{name:"boolean"}],raw:"Record<(typeof PerseusFeatureFlags)[number], boolean>",required:!1},description:`Feature flags that can be passed from consuming application.
Define the feature flag name in packages/perseus-core/src/feature-flags.ts`},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]}},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.

@deprecated [LEMS-3185] this is externalizing an internal implementation
detail similar to serialized state`}]}}],raw:`Readonly<{
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
    /** Indicates whether or not to use mobile app styling. */
    isMobileApp?: boolean;
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
     * Feature flags that can be passed from consuming application.
     * Define the feature flag name in packages/perseus-core/src/feature-flags.ts
     */
    flags?: Record<(typeof PerseusFeatureFlags)[number], boolean>;
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     *
     * @deprecated [LEMS-3185] this is externalizing an internal implementation
     * detail similar to serialized state
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}>`},description:""},type:{required:!1,tsType:{name:"unknown[number]",raw:'PerseusPlotterWidgetOptions["type"]'},description:"",defaultValue:{value:'"bar"',computed:!1}},labels:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"Array<string>"},description:"",defaultValue:{value:'["", ""]',computed:!1}},categories:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"ReadonlyArray<string | number>"},description:"",defaultValue:{value:'[""]',computed:!1}},scaleY:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},maxY:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"10",computed:!1}},snapsPerLine:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"2",computed:!1}},picSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"30",computed:!1}},picBoxHeight:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"36",computed:!1}},picUrl:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"null",computed:!1}},plotDimensions:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[275, 200]",computed:!1}},labelInterval:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},starting:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[1]",computed:!1}},correct:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>"},description:"",defaultValue:{value:"[1]",computed:!1}},static:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"any"},description:""}}};export{f as P};
