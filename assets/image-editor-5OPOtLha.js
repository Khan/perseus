var g=Object.defineProperty;var f=(s,r,e)=>r in s?g(s,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[r]=e;var o=(s,r,e)=>(f(s,typeof r!="symbol"?r+"":r,e),e);import{r as w,bC as b,j as n,$ as y,ad as k,_ as d,aB as c}from"./iframe-BfGmgqQL.js";import"./item-version-BDaxewFE.js";import"./article-renderer-CN8BN6YT.js";import"./server-item-renderer-D3LnnBfW.js";import"./hints-renderer-DT9PPkpF.js";import{c as v}from"./components-B0sfFe2K.js";import{E as x}from"./editor-jsonify-hKOQG5IF.js";import{B as R}from"./blur-input-ScdO5EIY.js";import{E as h}from"./editor-q1vFL8_x.js";const{InfoTip:p,InlineIcon:T,RangeInput:P}=v,I="(ka-.*.s3.amazonaws.com|(fastly|cdn).kastatic.org|khanacademy.org|kasandbox.org)",A=new RegExp("^(https?|web\\+graphie)://[^/]*"+I),C=["center","above","above right","right","below right","below","below left","left","above left"];class u extends w.Component{constructor(){super(...arguments);o(this,"_isMounted",!1);o(this,"state",{backgroundImageError:""});o(this,"change",(...e)=>k.apply(this,e))}componentDidMount(){this._isMounted=!0}componentWillUnmount(){this._isMounted=!1}_renderRowForLabel(e,a){return n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(P,{value:e.coordinates,onChange:this.onCoordinateChange.bind(this,a)})}),n.jsx("td",{style:{verticalAlign:"bottom",width:"5px"},children:n.jsx("input",{type:"text",className:"graph-settings-axis-label",value:e.content,onChange:this.onContentChange.bind(this,a)})}),n.jsx("td",{children:n.jsx("select",{className:"perseus-widget-dropdown",value:e.alignment,onChange:this.onAlignmentChange.bind(this,a),children:C.map(function(t,i){return n.jsx("option",{value:t,children:t},""+i)},this)})}),n.jsx("td",{children:n.jsx("a",{href:"#",className:"simple-button orange delete-label",title:"Remove this label",onClick:this.removeLabel.bind(this,a),children:n.jsx(T,{...y})})})]},a)}removeLabel(e,a){a.preventDefault();const t=[...this.props.labels];t.splice(e,1),this.props.onChange({labels:t})}onCoordinateChange(e,a){const t=this.props.labels.slice();t[e]=d.extend({},t[e],{coordinates:a}),this.props.onChange({labels:t})}onContentChange(e,a){const t=a.target.value,i=this.props.labels.slice();i[e]=d.extend({},i[e],{content:t}),this.props.onChange({labels:i})}onAlignmentChange(e,a){const t=a.target.value,i=this.props.labels.slice();i[e]=d.extend({},i[e],{alignment:t}),this.props.onChange({labels:i})}setUrl(e,a,t,i){if(!this._isMounted)return;const l=d.clone(this.props.backgroundImage);l.url=e,l.width=a,l.height=t;const m=[l.width,l.height];this.props.onChange({backgroundImage:l,box:m},null,i)}async onUrlChange(e,a){if(!e){this.setUrl(e,0,0,a);return}if(!A.test(e)){this.setState({backgroundImageError:"Images must be from sites hosted by Khan Academy. Please input a Khan Academy-owned address, or use the Add Image tool to rehost an existing image"});return}this.setState({backgroundImageError:""});try{const t=await c.getImageSizeModern(e);this.setUrl(e,t[0],t[1],!0)}catch(t){this.setState({backgroundImageError:`There was an error loading the image URL: ${JSON.stringify(t,null,2)}`})}}onRangeChange(e,a){const t=this.props.range.slice();t[e]=a,this.props.onChange({range:t})}serialize(){return x.serialize.call(this)}render(){const e=this.props.backgroundImage,a=n.jsxs("div",{className:"image-settings",children:[!c.isLabeledSVG(e.url)&&n.jsx("div",{children:n.jsxs("label",{children:[n.jsx("div",{children:"Preview:"}),n.jsx("img",{alt:"Editor preview of image",src:e.url,style:{width:"100%"}})]})}),n.jsx("div",{children:n.jsxs("label",{children:[n.jsx("div",{children:"Dimensions:"}),n.jsxs("p",{children:[e.width,"x",e.height]})]})}),n.jsx("div",{children:n.jsxs("label",{children:[n.jsxs("div",{children:["Alt text:",n.jsx(p,{children:"This is important for screenreaders. The content of this alt text will be formatted as markdown (tables, emphasis, etc. are supported)."})]}),n.jsx(h,{apiOptions:this.props.apiOptions,content:this.props.alt,onChange:i=>{i.content!=null&&this.change("alt",i.content)},widgetEnabled:!1})]})}),n.jsx("div",{children:n.jsxs("label",{children:[n.jsx("div",{children:"Caption:"}),n.jsx(h,{apiOptions:this.props.apiOptions,content:this.props.caption,onChange:i=>{i.content!=null&&this.change("caption",i.content)},widgetEnabled:!1})]})})]}),t=n.jsx("div",{className:"renderer-widget-error",children:this.state.backgroundImageError});return n.jsxs("div",{className:"perseus-image-editor",children:[n.jsxs("label",{children:["Image url:",n.jsx(p,{children:"Paste an image or graphie image URL."}),this.state.backgroundImageError&&t,n.jsx(R,{value:e.url||"",style:{width:332},onChange:i=>this.onUrlChange(i,!1)})]}),e.url&&a]})}}o(u,"displayName","ImageEditor"),o(u,"widgetName","image"),o(u,"defaultProps",b.defaultWidgetOptions);u.__docgenInfo={description:"",methods:[{name:"_renderRowForLabel",docblock:null,modifiers:[],params:[{name:"label",optional:!1,type:null},{name:"i",optional:!1,type:null}],returns:null},{name:"change",docblock:null,modifiers:[],params:[{name:"...args",optional:!1,type:null}],returns:null},{name:"removeLabel",docblock:null,modifiers:[],params:[{name:"labelIndex",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"onCoordinateChange",docblock:null,modifiers:[],params:[{name:"labelIndex",optional:!1,type:null},{name:"newCoordinates",optional:!1,type:null}],returns:null},{name:"onContentChange",docblock:null,modifiers:[],params:[{name:"labelIndex",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"onAlignmentChange",docblock:null,modifiers:[],params:[{name:"labelIndex",optional:!1,type:null},{name:"e",optional:!1,type:null}],returns:null},{name:"setUrl",docblock:null,modifiers:[],params:[{name:"url",optional:!1,type:null},{name:"width",optional:!1,type:null},{name:"height",optional:!1,type:null},{name:"silent",optional:!1,type:null}],returns:null},{name:"onUrlChange",docblock:null,modifiers:["async"],params:[{name:"url",optional:!1,type:{name:"union",raw:"string | undefined | null",elements:[{name:"string"},{name:"undefined"},{name:"null"}]}},{name:"silent",optional:!1,type:{name:"boolean"}}],returns:null},{name:"onRangeChange",docblock:null,modifiers:[],params:[{name:"type",optional:!1,type:null},{name:"newRange",optional:!1,type:null}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:null}],displayName:"ImageEditor",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},range:{required:!1,tsType:{name:"tuple",raw:"[Readonly<Range>, Readonly<Range>]",elements:[{name:"Readonly",elements:[{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]}],raw:"Readonly<Range>"},{name:"Readonly",elements:[{name:"tuple",raw:"[min: number, max: number]",elements:[{name:"unknown"},{name:"unknown"}]}],raw:"Readonly<Range>"}]},description:"",defaultValue:{value:`[
    [0, 10],
    [0, 10],
]`,computed:!1}},box:{required:!1,tsType:{name:"tuple",raw:"[width: number, height: number]",elements:[{name:"unknown"},{name:"unknown"}]},description:"",defaultValue:{value:"[400, 400]",computed:!1}},backgroundImage:{required:!1,tsType:{name:"any"},description:"",defaultValue:{value:`{
    url: null,
    width: 0,
    height: 0,
}`,computed:!1}},labels:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"",defaultValue:{value:"[]",computed:!1}},alt:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},caption:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};export{u as I};
