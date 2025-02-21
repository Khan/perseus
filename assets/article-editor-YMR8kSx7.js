import"./all-widgets-UbNvf8Lw.js";import"./phet-simulation-Sua1c876.js";import{_ as g}from"./underscore-885MUNGo.js";import"./random-util-g9RgnkPR.js";import{P as c,E as u}from"./perseus-error-l3K_anoI.js";import"./dependencies-CP7Uh8Kq.js";import{A as p}from"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-l6FMiMu3.js";import"./article-renderer-E0xKSLoG.js";import"./hints-renderer-U7yoitaB.js";import"./renderer-IIGnnjEs.js";import"./base-radio-biJvF5YX.js";import{c as y}from"./components-cU7oGhwm.js";import{i as w}from"./icon-paths-5JCXzGsq.js";import"./i18n-context-jir6aF-r.js";import"./util-WQRabdk_.js";import"./svg-image-XSbIxrin.js";import"./jquery-5v7aFUvu.js";import"./index-smZ6iCr_.js";import{r as t}from"./index-6oxdNXpR.js";import{D as f}from"./device-framer-C3twM9Ra.js";import{I as b,J as v}from"./register-all-widgets-and-editors-for-testing-8NknpiWm.js";import{S as i}from"./section-control-button-mItbni-c.js";import{E as k}from"./editor-R8V2s_5u.js";import{i as m,a as R,b as P}from"./icon-paths-naSxOxXw.js";const{HUD:T,InlineIcon:A}=y,l=class l extends t.Component{constructor(){super(...arguments),this.state={highlightLint:!0},this._handleJsonChange=n=>{this.props.onChange({json:n})},this._handleEditorChange=(n,e)=>{const a=[...this._sections()];a[n]={...a[n],...e},this.props.onChange({json:a})}}componentDidMount(){this._updatePreviewFrames()}componentDidUpdate(){this._updatePreviewFrames()}_updatePreviewFrames(){this.props.mode==="preview"?this.refs["frame-all"].sendNewData({type:"article-all",data:this._sections().map((n,e)=>this._apiOptionsForSection(n,e))}):this.props.mode==="edit"&&this._sections().forEach((n,e)=>{this.refs["frame-"+e].sendNewData({type:"article",data:this._apiOptionsForSection(n,e)})})}_apiOptionsForSection(n,e){const a=this.refs[`editor${e}`];return{apiOptions:{...p.defaults,...this.props.apiOptions,showAlignmentOptions:!0,isArticle:!0},json:n,useNewStyles:this.props.useNewStyles,linterContext:{contentType:"article",highlightLint:this.state.highlightLint,paths:this.props.contentPaths},legacyPerseusLint:a?a.getSaveWarnings():[]}}_sections(){return Array.isArray(this.props.json)?this.props.json:[this.props.json]}_renderEditor(){const{imageUploader:n,sectionImageUploadGenerator:e}=this.props,a={...p.defaults,...this.props.apiOptions,showAlignmentOptions:!0,isArticle:!0},d=this._sections();return t.createElement("div",{className:"perseus-editor-table"},d.map((h,r)=>[t.createElement("div",{className:"perseus-editor-row",key:r},t.createElement("div",{className:"perseus-editor-left-cell"},t.createElement("div",{className:"pod-title"},"Section ",r+1,t.createElement("div",{style:{display:"inline-block",float:"right"}},e(r),t.createElement(i,{icon:m,onClick:()=>{this._handleAddSectionAfter(r)},title:"Add a new section after this one"}),r+1<d.length&&t.createElement(i,{icon:R,onClick:()=>{this._handleMoveSectionLater(r)},title:"Move this section down"}),r>0&&t.createElement(i,{icon:P,onClick:()=>{this._handleMoveSectionEarlier(r)},title:"Move this section up"}),t.createElement(i,{icon:w,onClick:()=>{const o="Are you sure you want to delete section "+(r+1)+"?";confirm(o)&&this._handleRemoveSection(r)},title:"Delete this section"}))),t.createElement(k,{...h,apiOptions:a,imageUploader:n,onChange:o=>this._handleEditorChange(r,o),placeholder:"Type your section text here...",ref:"editor"+r})),t.createElement("div",{className:"editor-preview"},this._renderIframePreview(r,!0)))]),this._renderAddSection(),this._renderLinterHUD())}_renderAddSection(){return t.createElement("div",{className:"perseus-editor-row"},t.createElement("div",{className:"perseus-editor-left-cell"},t.createElement("a",{href:"#",className:"simple-button orange",onClick:()=>{this._handleAddSectionAfter(this._sections().length-1)}},t.createElement(A,{...m})," Add a section")))}_renderLinterHUD(){return t.createElement(T,{message:"Style warnings",enabled:this.state.highlightLint,onClick:()=>{this.setState({highlightLint:!this.state.highlightLint})}})}_renderIframePreview(n,e){const a=this.props.screen==="phone"||this.props.screen==="tablet";return t.createElement(f,{deviceType:this.props.screen,nochrome:e},t.createElement(b,{ref:"frame-"+n,key:this.props.screen,datasetKey:"mobile",datasetValue:a,seamless:e,url:this.props.previewURL}))}_renderPreviewMode(){return t.createElement("div",{className:"standalone-preview"},this._renderIframePreview("all",!1))}_handleMoveSectionEarlier(n){if(n===0)return;const e=[...this._sections()],a=e[n];e.splice(n,1),e.splice(n-1,0,a),this.props.onChange({json:e})}_handleMoveSectionLater(n){const e=[...this._sections()];if(n+1===e.length)return;const a=e[n];e.splice(n,1),e.splice(n+1,0,a),this.props.onChange({json:e})}_handleAddSectionAfter(n){const e=g.clone(this.serialize()),a=n>=0?{widgets:e[n].widgets}:{};e.splice(n+1,0,a),this.props.onChange({json:e})}_handleRemoveSection(n){const e=[...this._sections()];e.splice(n,1),this.props.onChange({json:e})}serialize(){if(this.props.mode==="edit")return this._sections().map((n,e)=>this.refs["editor"+e].serialize());if(this.props.mode==="preview"||this.props.mode==="json")return this.props.json;throw new c("Could not serialize; mode "+this.props.mode+" not found",u.Internal)}getSaveWarnings(){if(this.props.mode!=="edit")throw new c("Can only get save warnings in edit mode.",u.NotAllowed);return this._sections().map((n,e)=>this.refs["editor"+e].getSaveWarnings())}render(){return t.createElement("div",{className:"framework-perseus perseus-article-editor"},this.props.mode==="edit"&&this._renderEditor(),this.props.mode==="preview"&&this._renderPreviewMode(),this.props.mode==="json"&&t.createElement("div",{className:"json-editor"},t.createElement("div",{className:"json-editor-warning"},t.createElement("span",null,"Warning: Editing in this mode can lead to broken articles!")),t.createElement(v,{multiLine:!0,onChange:this._handleJsonChange,value:this.props.json})))}};l.defaultProps={contentPaths:[],json:[{}],mode:"edit",screen:"desktop",sectionImageUploadGenerator:()=>t.createElement("span",null),useNewStyles:!1};let s=l;s.__docgenInfo={description:"",methods:[{name:"_updatePreviewFrames",docblock:null,modifiers:[],params:[],returns:null},{name:"_apiOptionsForSection",docblock:null,modifiers:[],params:[{name:"section",optional:!1,type:{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]},alias:"RendererProps"}},{name:"sectionIndex",optional:!1,type:{name:"number"}}],returns:{type:{name:"any"}}},{name:"_sections",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}}},{name:"_renderEditor",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"div">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"div">',elements:[{name:"literal",value:'"div"'}]}]}}},{name:"_renderAddSection",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"div">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"div">',elements:[{name:"literal",value:'"div"'}]}]}}},{name:"_renderLinterHUD",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},{name:"_renderIframePreview",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]}},{name:"nochrome",optional:!1,type:{name:"boolean"}}],returns:{type:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},{name:"_renderPreviewMode",docblock:null,modifiers:[],params:[],returns:{type:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"div">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"div">',elements:[{name:"literal",value:'"div"'}]}]}}},{name:"_handleJsonChange",docblock:null,modifiers:[],params:[{name:"newJson",optional:!1,type:null}],returns:null},{name:"_handleEditorChange",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:null},{name:"newProps",optional:!1,type:null}],returns:null},{name:"_handleMoveSectionEarlier",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"_handleMoveSectionLater",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"_handleAddSectionAfter",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"_handleRemoveSection",docblock:null,modifiers:[],params:[{name:"i",optional:!1,type:{name:"number"}}],returns:null},{name:"serialize",docblock:null,modifiers:[],params:[],returns:{type:{name:"union",raw:"RendererProps | ReadonlyArray<RendererProps>",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}]}}},{name:"getSaveWarnings",docblock:`Returns an array, with one element be section.
Each element is an array of lint warnings present in that section.

This function can currently only be called in edit mode.`,modifiers:[],params:[],returns:{type:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}},description:`Returns an array, with one element be section.
Each element is an array of lint warnings present in that section.

This function can currently only be called in edit mode.`}],displayName:"ArticleEditor",props:{contentPaths:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"",defaultValue:{value:"[]",computed:!1}},json:{required:!1,tsType:{name:"union",raw:"RendererProps | ReadonlyArray<RendererProps>",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}},{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    content?: string;
    widgets?: any;
    images?: any;
}`,signature:{properties:[{key:"content",value:{name:"string",required:!1}},{key:"widgets",value:{name:"any",required:!1}},{key:"images",value:{name:"any",required:!1}}]}}],raw:"ReadonlyArray<RendererProps>"}]},description:"",defaultValue:{value:"[{}]",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:'"diff" | "edit" | "json" | "preview"',elements:[{name:"literal",value:'"diff"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"json"'},{name:"literal",value:'"preview"'}]},description:"",defaultValue:{value:'"edit"',computed:!1}},screen:{required:!1,tsType:{name:"union",raw:'"phone" | "tablet" | "desktop"',elements:[{name:"literal",value:'"phone"'},{name:"literal",value:'"tablet"'},{name:"literal",value:'"desktop"'}]},description:"",defaultValue:{value:'"desktop"',computed:!1}},sectionImageUploadGenerator:{required:!1,tsType:{name:"signature",type:"function",raw:`(
    i: number,
) => React.ReactElement<React.ComponentProps<"span">>`,signature:{arguments:[{type:{name:"number"},name:"i"}],return:{name:"ReactReactElement",raw:'React.ReactElement<React.ComponentProps<"span">>',elements:[{name:"ReactComponentProps",raw:'React.ComponentProps<"span">',elements:[{name:"literal",value:'"span"'}]}]}}},description:"",defaultValue:{value:"() => <span />",computed:!1}},useNewStyles:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},apiOptions:{required:!1,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},imageUploader:{required:!1,tsType:{name:"signature",type:"function",raw:`(
    file: File,
    callback: (url: string) => unknown,
) => unknown`,signature:{arguments:[{type:{name:"File"},name:"file"},{type:{name:"signature",type:"function",raw:"(url: string) => unknown",signature:{arguments:[{type:{name:"string"},name:"url"}],return:{name:"unknown"}}},name:"callback"}],return:{name:"unknown"}}},description:""},previewURL:{required:!0,tsType:{name:"string"},description:""}}};export{s as A};
