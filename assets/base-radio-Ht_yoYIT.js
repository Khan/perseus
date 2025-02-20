import{n as f}from"./no-important-xCWWYXQR.js";import{c as C}from"./index-dnMhQZ-1.js";import{r as d}from"./index-6oxdNXpR.js";import{F as H}from"./index-9gkyvru-.js";import{_ as Q}from"./underscore-885MUNGo.js";import{u as J}from"./i18n-context-jir6aF-r.js";import{C as T}from"./perseus-api-Y55S7ZPk.js";import{g as X,r as N,n as I,l as W}from"./constants-vGHYchdS.js";import{m as x}from"./media-queries-OayJ4KsJ.js";import{U as Z}from"./util-BNjKZr9R.js";import{C as ee}from"./choice-Vg4d2GtX.js";import{C as ne}from"./choice-none-above-mVJRvzDw.js";typeof HTMLElement<"u"&&!HTMLElement.prototype.scrollTo&&(HTMLElement.prototype.scrollTo=function(e,o){this.scrollLeft=e,this.scrollTop=o});const B=(e,o)=>{typeof e.scrollTo=="function"?e.scrollTo(0,o):"scrollTop"in e&&(e.scrollTop=o)},te=(e,o,r=0,t)=>{const s=e===window?window.pageYOffset:e.scrollTop,u=o,g=u-s,c=17,v=r/c;let y=0;const R=setInterval(function(){if(y<v){const b=y/v,P=(-Math.cos(Math.PI*b)+1)/2,k=s+g*P;B(e,k),y+=1}else B(e,u),clearInterval(R),t==null||t()},c)},j=e=>e===document.body||e==null?window:e.scrollHeight>e.clientHeight?e:j(e.parentElement),ae=750,oe=(e,o)=>{setTimeout(()=>{const r=j(e),t=e.getBoundingClientRect(),s=r===window?{top:0,bottom:window.innerHeight}:r.getBoundingClientRect();let u=0;const g=r===window?window.scrollY:r.scrollTop;if(t.bottom>s.bottom){let c=t.bottom-s.bottom;t.top+c<s.top&&(c=t.top-s.top),u=g+c}else if(t.top<s.top){const c=t.top-s.top;u=g+c}te(r,u,ae,o)},0)},{captureScratchpadTouchStart:re}=Z;function ie(e,o,r,t){return e?o?t.chooseNumAnswers({numCorrect:String(r)}):t.chooseAllAnswers:t.chooseOneAnswer}const se=function({apiOptions:e,reviewModeRubric:o,reviewMode:r,choices:t,editMode:s=!1,multipleSelect:u=!1,labelWrap:g,countChoices:c,numCorrect:v,isLastUsedWidget:y,onChange:R,registerFocusFunction:b}){const{strings:P}=J(),k=d.useRef(),q=d.useRef([]);d.useEffect(()=>{if(e.canScrollPage&&y&&o&&!k.current){const n=t.findIndex(a=>a.checked);if(n>=0){const a=q.current[n],l=H.findDOMNode(a.current);l&&oe(l)}}k.current=o},[e,t,y,o]);function E(n,a){let h;a.checked&&!u?h=t.map(m=>!1):h=t.map(m=>m.checked);const l=t.map(m=>m.crossedOut);h[n]=a.checked,l[n]=a.crossedOut,R({checked:h,crossedOut:l})}b==null||b(n=>{const a=q.current[n||0],l=H.findDOMNode(a.current);if(l)l.focus();else return!1;return!0});const A=e.isMobile,_=t[0].highlighted,K=t[t.length-1].highlighted,G=C("perseus-widget-radio",!s&&"perseus-rendered-radio",f.css(i.radio,i.responsiveRadioContainer,_&&A&&i.radioContainerFirstHighlighted,K&&A&&i.radioContainerLastHighlighted)),z=C("instructions",f.css(i.instructions,A&&i.instructionsMobile)),O=ie(u,c,v,P),$=f.css(i.responsiveFieldset),U=d.createElement("fieldset",{className:`perseus-widget-radio-fieldset ${$}`},d.createElement("legend",{className:"perseus-sr-only"},O),d.createElement("div",{className:z,"aria-hidden":"true"},O),d.createElement("ul",{className:G,style:{listStyle:"none"}},t.map((n,a)=>{let h=ee;const l=d.createRef();q.current[a]=l;const m={apiOptions:e,multipleSelect:u,checked:n.checked,crossedOut:n.crossedOut,previouslyAnswered:n.previouslyAnswered,reviewMode:r,correct:n.correct,rationale:n.rationale,content:n.content,disabled:e.readOnly||n.disabled,showCorrectness:r||!!n.showCorrectness,showRationale:n.hasRationale&&(r||n.showRationale),pos:a,onChange:p=>{s||E(a,p)}};n.isNoneOfTheAbove&&(h=ne,Q.extend(m,{showContent:n.revealNoneOfTheAbove}));const S=t[a+1],V=!!S&&S.highlighted,M=p=>f.css(i.item,i.responsiveItem,p&&i.selectedItem,p&&n.highlighted&&i.aboveBackdrop,p&&n.highlighted&&e.isMobile&&i.aboveBackdropMobile,V&&e.isMobile&&i.nextHighlighted);M(!0);let D;r&&o&&(D=o.choices[a].correct?T.CORRECT:T.INCORRECT);const Y=C(M(n.checked),T.RADIO.OPTION,n.checked&&T.RADIO.SELECTED,D);let F=null,L;return s&&(L=p=>{let w=p.target;for(;w&&w!==F;){if(w.getAttribute("data-is-radio-icon")){E(a,{checked:!n.checked,crossedOut:n.crossedOut});return}w=w.parentNode}}),d.createElement("li",{key:a,ref:p=>F=p,className:Y,onClick:L,onTouchStart:g?void 0:re},d.createElement(h,{...m,ref:l}))})));return d.createElement("div",{className:f.css(i.responsiveContainer)},U)},i=f.StyleSheet.create({instructions:{display:"block",color:X,fontSize:14,lineHeight:1.25,fontFamily:"inherit",fontStyle:"normal",fontWeight:"bold",marginBottom:16},instructionsMobile:{fontSize:18,[x.smOrSmaller]:{fontSize:16},[x.xl]:{fontSize:20}},radio:{padding:0},responsiveRadioContainer:{borderBottom:`1px solid ${N}`,borderTop:`1px solid ${N}`,width:"auto",[x.smOrSmaller]:{marginLeft:I,marginRight:I}},radioContainerFirstHighlighted:{borderTop:"1px solid rgba(0, 0, 0, 0)"},radioContainerLastHighlighted:{borderBottom:"1px solid rgba(0, 0, 0, 0)"},item:{marginLeft:20},responsiveItem:{marginLeft:0,padding:0,":not(:last-child)":{borderBottom:`1px solid ${N}`}},selectedItem:{background:"white"},aboveBackdrop:{position:"relative",zIndex:1062},aboveBackdropMobile:{boxShadow:"0 0 4px 0 rgba(0, 0, 0, 0.2),0 0 2px 0 rgba(0, 0, 0, 0.1)",":not(:last-child)":{borderBottom:"1px solid rgba(0, 0, 0, 0)"}},nextHighlighted:{":not(:last-child)":{borderBottom:"1px solid rgba(0, 0, 0, 0)"}},responsiveContainer:{overflow:"auto",marginLeft:I,paddingLeft:W},responsiveFieldset:{paddingRight:W,minWidth:"auto"}});se.__docgenInfo={description:"",methods:[],displayName:"BaseRadio",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
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
}>`},description:""},choices:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"signature",type:"object",raw:`{
    checked: boolean;
    crossedOut: boolean;
    content: React.ReactNode;
    rationale: React.ReactNode;
    hasRationale: boolean;
    showRationale: boolean;
    showCorrectness: boolean;
    correct: boolean;
    isNoneOfTheAbove: boolean;
    highlighted: boolean;
    previouslyAnswered: boolean;
    revealNoneOfTheAbove: boolean;
    disabled: boolean;
}`,signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"content",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"rationale",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"hasRationale",value:{name:"boolean",required:!0}},{key:"showRationale",value:{name:"boolean",required:!0}},{key:"showCorrectness",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"revealNoneOfTheAbove",value:{name:"boolean",required:!0}},{key:"disabled",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceType>"},description:""},deselectEnabled:{required:!1,tsType:{name:"boolean"},description:""},editMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelWrap:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},numCorrect:{required:!0,tsType:{name:"number"},description:""},multipleSelect:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewModeRubric:{required:!1,tsType:{name:"union",raw:"PerseusRadioWidgetOptions | null",elements:[{name:"signature",type:"object",raw:`{
    // The choices provided to the user.
    choices: ReadonlyArray<PerseusRadioChoice>;
    // Does this have a "none of the above" option?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    hasNoneOfTheAbove?: boolean;
    // If multipleSelect is enabled, Specify the number expected to be correct.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    countChoices?: boolean;
    // Randomize the order of the options or keep them as defined
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    randomize?: boolean;
    // Does this set allow for multiple selections to be correct?
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    multipleSelect?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    deselectEnabled?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    onePerLine?: boolean;
    // deprecated
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    displayCount?: any;
    // v0 props
    // \`noneOfTheAbove\` is still in use (but only set to \`false\`).
    noneOfTheAbove?: false;
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
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"clue",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!1}}]}}],raw:"ReadonlyArray<PerseusRadioChoice>",required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"countChoices",value:{name:"boolean",required:!1}},{key:"randomize",value:{name:"boolean",required:!1}},{key:"multipleSelect",value:{name:"boolean",required:!1}},{key:"deselectEnabled",value:{name:"boolean",required:!1}},{key:"onePerLine",value:{name:"boolean",required:!1}},{key:"displayCount",value:{name:"any",required:!1}},{key:"noneOfTheAbove",value:{name:"literal",value:"false",required:!1}}]}},{name:"null"}]},description:""},reviewMode:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(newValues: {
    checked: ReadonlyArray<boolean>;
    crossedOut: ReadonlyArray<boolean>;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    checked: ReadonlyArray<boolean>;
    crossedOut: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"checked",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}},{key:"crossedOut",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""},registerFocusFunction:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: FocusFunction) => void",signature:{arguments:[{type:{name:"signature",type:"function",raw:`(
    choiceIndex?: number | null | undefined,
) => boolean`,signature:{arguments:[{type:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},name:"choiceIndex"}],return:{name:"boolean"}}},name:"arg1"}],return:{name:"void"}}},description:""},isLastUsedWidget:{required:!1,tsType:{name:"boolean"},description:""}}};export{se as B};
