import{a as X,j as b}from"./jsx-runtime-5BUNAZ9W.js";import{l as v}from"./index-awljIyHI.js";import{c as C}from"./index-dnMhQZ-1.js";import{r as x}from"./index-4g5l5LRQ.js";import{R as M}from"./index-jmm5gWkb.js";import{_ as Z}from"./index-default-4_ZsnO94.js";import{u as ee}from"./i18n-context-3gTlIcWM.js";import{C as j}from"./perseus-api-cFDIds9P.js";import{h as re,r as z,n as N,s as U}from"./constants-I_nlPaPx.js";import{m as E}from"./media-queries-MaBBbpNq.js";import{s as te}from"./shared-3pf9YZIg.js";import{U as ne}from"./util-Q3BXsyUV.js";import{C as ae}from"./choice--TeDH0lH.js";import{C as ie}from"./choice-none-above-DUqMbpvD.js";typeof HTMLElement<"u"&&!HTMLElement.prototype.scrollTo&&(HTMLElement.prototype.scrollTo=function(e,n){this.scrollLeft=e,this.scrollTop=n});const S=(e,n)=>{typeof e.scrollTo=="function"?e.scrollTo(0,n):"scrollTop"in e&&(e.scrollTop=n)},se=(e,n,i=0,t)=>{const o=e===window?window.pageYOffset:e.scrollTop,d=n,h=d-o,u=17,q=i/u;let p=0;const w=setInterval(function(){if(p<q){const W=p/q,T=(-Math.cos(Math.PI*W)+1)/2,f=o+h*T;S(e,f),p+=1}else S(e,d),clearInterval(w),t&&t()},u)},D=e=>e===document.body||e==null?window:e.scrollHeight>e.clientHeight?e:D(e.parentElement),oe=750,le=(e,n)=>{setTimeout(()=>{const i=D(e),t=e.getBoundingClientRect(),o=i===window?{top:0,bottom:window.innerHeight}:i.getBoundingClientRect();let d=0;const h=i===window?window.scrollY:i.scrollTop;if(t.bottom>o.bottom){let u=t.bottom-o.bottom;t.top+u<o.top&&(u=t.top-o.top),d=h+u}else if(t.top<o.top){const u=t.top-o.top;d=h+u}se(i,d,oe,n)},0)},{captureScratchpadTouchStart:ue}=ne;function de(e,n,i,t){return e?n?t.chooseNumAnswers({numCorrect:String(i)}):t.chooseAllAnswers:t.chooseOneAnswer}const H=function(e){const{apiOptions:n,reviewModeRubric:i,choices:t,editMode:o,multipleSelect:d,labelWrap:h,countChoices:u,numCorrect:q,isLastUsedWidget:p,registerFocusFunction:w}=e,{strings:W}=ee(),T=x.useRef(),f=x.useRef([]);x.useEffect(()=>{if(n.canScrollPage&&p&&i&&!T.current){const r=t.findIndex(a=>a.checked);if(r>=0){const a=f.current[r],l=M.findDOMNode(a.current);l&&le(l)}}T.current=i},[n,t,p,i]);function L(r,a){const{multipleSelect:c,choices:l,onChange:A}=e;let m;a.checked&&!c?m=l.map(g=>!1):m=l.map(g=>g.checked);const O=l.map(g=>g.crossedOut);m[r]=a.checked,O[r]=a.crossedOut,A({checked:m,crossedOut:O})}w==null||w(r=>{const a=f.current[r||0],l=M.findDOMNode(a.current);if(l)l.focus();else return!1;return!0});const R=!!i,I=n.isMobile,V=t[0].highlighted,G=t[t.length-1].highlighted,K=C("perseus-widget-radio",!o&&"perseus-rendered-radio",v.css(s.radio,s.responsiveRadioContainer,V&&I&&s.radioContainerFirstHighlighted,G&&I&&s.radioContainerLastHighlighted)),B=C("instructions",v.css(s.instructions,I&&s.instructionsMobile)),_=de(d,u,q,W),Y=v.css(s.responsiveFieldset),Q=X("fieldset",{className:`perseus-widget-radio-fieldset ${Y}`,children:[b("legend",{className:"perseus-sr-only",children:_}),b("div",{className:B,"aria-hidden":"true",children:_}),b("ul",{className:K,style:{listStyle:"none"},children:t.map((r,a)=>{let c=ae;const l=x.createRef();f.current[a]=l;const A={apiOptions:n,multipleSelect:d,checked:r.checked,crossedOut:r.crossedOut,previouslyAnswered:r.previouslyAnswered,reviewMode:R,correct:r.correct,rationale:r.rationale,content:r.content,disabled:n.readOnly||r.disabled,showCorrectness:R||!!r.showCorrectness,showRationale:r.hasRationale&&(R||r.showRationale),pos:a,onChange:y=>{o||L(a,y)}};r.isNoneOfTheAbove&&(c=ie,Z.extend(A,{showContent:r.revealNoneOfTheAbove}));const m=t[a+1],O=!!m&&m.highlighted,g=y=>v.css(te.aboveScratchpad,s.item,s.responsiveItem,y&&s.selectedItem,y&&r.highlighted&&s.aboveBackdrop,y&&r.highlighted&&n.isMobile&&s.aboveBackdropMobile,O&&n.isMobile&&s.nextHighlighted);g(!0);let P;R&&i&&(P=i.choices[a].correct?j.CORRECT:j.INCORRECT);const J=C(g(r.checked),j.RADIO.OPTION,r.checked&&j.RADIO.SELECTED,P);let $=null,F=null;return o&&(F=y=>{let k=y.target;for(;k&&k!==$;){if(k.getAttribute("data-is-radio-icon")){L(a,{checked:!r.checked,crossedOut:r.crossedOut});return}k=k.parentNode}}),b("li",{ref:y=>$=y,className:J,onClick:F,onTouchStart:h?ue:null,children:b(c,{...A,ref:l})},a)})})]});return b("div",{className:v.css(s.responsiveContainer),children:Q})};H.defaultProps={editMode:!1,multipleSelect:!1};const s=v.StyleSheet.create({instructions:{display:"block",color:re,fontSize:14,lineHeight:1.25,fontFamily:"inherit",fontStyle:"normal",fontWeight:"bold",marginBottom:16},instructionsMobile:{fontSize:18,[E.smOrSmaller]:{fontSize:16},[E.xl]:{fontSize:20}},radio:{padding:0},responsiveRadioContainer:{borderBottom:`1px solid ${z}`,borderTop:`1px solid ${z}`,width:"auto",[E.smOrSmaller]:{marginLeft:N,marginRight:N}},radioContainerFirstHighlighted:{borderTop:"1px solid rgba(0, 0, 0, 0)"},radioContainerLastHighlighted:{borderBottom:"1px solid rgba(0, 0, 0, 0)"},item:{marginLeft:20},responsiveItem:{marginLeft:0,padding:0,":not(:last-child)":{borderBottom:`1px solid ${z}`}},selectedItem:{background:"white"},aboveBackdrop:{position:"relative",zIndex:1062},aboveBackdropMobile:{boxShadow:"0 0 4px 0 rgba(0, 0, 0, 0.2),0 0 2px 0 rgba(0, 0, 0, 0.1)",":not(:last-child)":{borderBottom:"1px solid rgba(0, 0, 0, 0)"}},nextHighlighted:{":not(:last-child)":{borderBottom:"1px solid rgba(0, 0, 0, 0)"}},responsiveContainer:{overflow:"auto",marginLeft:N,paddingLeft:U},responsiveFieldset:{paddingRight:U,minWidth:"auto"}});H.__docgenInfo={description:"",methods:[],displayName:"BaseRadio",props:{apiOptions:{required:!0,tsType:{name:"Readonly",elements:[{name:"signature",type:"object",raw:`{
    isArticle?: boolean;
    onInputError?: (
        widgetId: any,
        value: string,
        message?: string | null | undefined,
    ) => unknown;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
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
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              } & {
                  [Key in (typeof InteractiveGraphEditorFlags)[number]]?: boolean;
              });
    };
    /**
     * This is a callback function that returns all of the Widget props
     * after they have been transformed by the widget's transform function.
     * This is useful for when we need to know how a widget has shuffled its
     * the available choices.
     */
    onWidgetStartProps?: (widgets: PerseusWidgetsMap) => void;
}`,signature:{properties:[{key:"isArticle",value:{name:"boolean",required:!1}},{key:"onInputError",value:{name:"signature",type:"function",raw:`(
    widgetId: any,
    value: string,
    message?: string | null | undefined,
) => unknown`,signature:{arguments:[{type:{name:"any"},name:"widgetId"},{type:{name:"string"},name:"value"},{type:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]},name:"message"}],return:{name:"unknown"}},required:!1}},{key:"onFocusChange",value:{name:"signature",type:"function",raw:`(
    newFocusPath: FocusPath,
    oldFocusPath: FocusPath,
    keypadHeight?: number,
    focusedElement?: HTMLElement,
) => unknown`,signature:{arguments:[{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"newFocusPath"},{type:{name:"union",raw:"ReadonlyArray<string> | null | undefined",elements:[{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"null"},{name:"undefined"}]},name:"oldFocusPath"},{type:{name:"number"},name:"keypadHeight"},{type:{name:"HTMLElement"},name:"focusedElement"}],return:{name:"unknown"}},required:!1}},{key:"GroupMetadataEditor",value:{name:"ReactComponentType",raw:"React.ComponentType<StubTagEditorType>",elements:[{name:"any"}],required:!1}},{key:"showAlignmentOptions",value:{name:"boolean",required:!1}},{key:"readOnly",value:{name:"boolean",required:!1}},{key:"answerableCallback",value:{name:"signature",type:"function",raw:"(arg1: boolean) => unknown",signature:{arguments:[{type:{name:"boolean"},name:"arg1"}],return:{name:"unknown"}},required:!1}},{key:"getAnotherHint",value:{name:"signature",type:"function",raw:"() => unknown",signature:{arguments:[],return:{name:"unknown"}},required:!1}},{key:"interactionCallback",value:{name:"signature",type:"function",raw:"(widgetData: {[widgetId: string]: any}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{[widgetId: string]: any}",signature:{properties:[{key:{name:"string"},value:{name:"any",required:!0}}]}},name:"widgetData"}],return:{name:"void"}},required:!1}},{key:"groupAnnotator",value:{name:"signature",type:"function",raw:"(groupNumber: number, widgetId: string) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"groupNumber"},{type:{name:"string"},name:"widgetId"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:`A function that takes in the relative problem number (starts at
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
    mafs?:
        | false
        | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
              [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
          } & {
              [Key in (typeof InteractiveGraphEditorFlags)[number]]?: boolean;
          });
}`,signature:{properties:[{key:"mafs",value:{name:"union",raw:`| false
| ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
      [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
  } & {
      [Key in (typeof InteractiveGraphEditorFlags)[number]]?: boolean;
  })`,elements:[{name:"literal",value:"false"},{name:"unknown"}],required:!1},description:`Flags related to the interactive-graph Mafs migration.

Add values to the relevant array to create new flags.`}]},required:!1},description:"Feature flags that can be passed from consuming application."},{key:"onWidgetStartProps",value:{name:"signature",type:"function",raw:"(widgets: PerseusWidgetsMap) => void",signature:{arguments:[{type:{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `example-widget ${number}`]: ExampleWidget;\n} & {\n    [key in `example-graphie-widget ${number}`]: ExampleGraphieWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `simple-markdown-tester ${number}`]: SimpleMarkdownTesterWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `cs-program ${number}`]: CSProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`cs-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `definition ${number}`]: DefinitionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`definition ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `dropdown ${number}`]: DropdownWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`dropdown ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `example-widget ${number}`]: ExampleWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`example-widget ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `example-graphie-widget ${number}`]: ExampleGraphieWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`example-graphie-widget ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `explanation ${number}`]: ExplanationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`explanation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `expression ${number}`]: ExpressionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`expression ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `grapher ${number}`]: GrapherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`grapher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `group ${number}`]: GroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group-set ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `iframe ${number}`]: IFrameWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`iframe ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `image ${number}`]: ImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `input-number ${number}`]: InputNumberWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`input-number ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interaction ${number}`]: InteractionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interaction ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interactive-graph ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `label-image ${number}`]: LabelImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`label-image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matcher ${number}`]: MatcherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matcher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matrix ${number}`]: MatrixWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matrix ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `measurer ${number}`]: MeasurerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`measurer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`molecule-renderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `number-line ${number}`]: NumberLineWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`number-line ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`numeric-input ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `orderer ${number}`]: OrdererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`orderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage ${number}`]: PassageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref-target ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `plotter ${number}`]: PlotterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`plotter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `python-program ${number}`]: PythonProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`python-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `radio ${number}`]: RadioWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`radio ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `simple-markdown-tester ${number}`]: SimpleMarkdownTesterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`simple-markdown-tester ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `sorter ${number}`]: SorterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`sorter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `table ${number}`]: TableWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`table ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `video ${number}`]: VideoWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`video ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}]},name:"widgets"}],return:{name:"void"}},required:!1},description:`This is a callback function that returns all of the Widget props
after they have been transformed by the widget's transform function.
This is useful for when we need to know how a widget has shuffled its
the available choices.`}]}}],raw:`Readonly<{
    isArticle?: boolean;
    onInputError?: (
        widgetId: any,
        value: string,
        message?: string | null | undefined,
    ) => unknown;
    onFocusChange?: (
        newFocusPath: FocusPath,
        oldFocusPath: FocusPath,
        keypadHeight?: number,
        focusedElement?: HTMLElement,
    ) => unknown;
    GroupMetadataEditor?: React.ComponentType<StubTagEditorType>;
    showAlignmentOptions?: boolean;
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
        mafs?:
            | false
            | ({[Key in (typeof MafsGraphTypeFlags)[number]]?: boolean} & {
                  [Key in (typeof InteractiveGraphLockedFeaturesFlags)[number]]?: boolean;
              } & {
                  [Key in (typeof InteractiveGraphEditorFlags)[number]]?: boolean;
              });
    };
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
}`,signature:{properties:[{key:"checked",value:{name:"boolean",required:!0}},{key:"crossedOut",value:{name:"boolean",required:!0}},{key:"content",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"rationale",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"hasRationale",value:{name:"boolean",required:!0}},{key:"showRationale",value:{name:"boolean",required:!0}},{key:"showCorrectness",value:{name:"boolean",required:!0}},{key:"correct",value:{name:"boolean",required:!0}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!0}},{key:"highlighted",value:{name:"boolean",required:!0}},{key:"previouslyAnswered",value:{name:"boolean",required:!0}},{key:"revealNoneOfTheAbove",value:{name:"boolean",required:!0}},{key:"disabled",value:{name:"boolean",required:!0}}]}}],raw:"ReadonlyArray<ChoiceType>"},description:""},deselectEnabled:{required:!1,tsType:{name:"boolean"},description:""},editMode:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},labelWrap:{required:!0,tsType:{name:"boolean"},description:""},countChoices:{required:!0,tsType:{name:"union",raw:"boolean | null | undefined",elements:[{name:"boolean"},{name:"null"},{name:"undefined"}]},description:""},numCorrect:{required:!0,tsType:{name:"number"},description:""},multipleSelect:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},reviewModeRubric:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0}},{key:"clue",value:{name:"string",required:!1}},{key:"correct",value:{name:"boolean",required:!1}},{key:"isNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"widgets",value:{name:"intersection",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n} & {\n    [key in `cs-program ${number}`]: CSProgramWidget;\n} & {\n    [key in `definition ${number}`]: DefinitionWidget;\n} & {\n    [key in `dropdown ${number}`]: DropdownWidget;\n} & {\n    [key in `example-widget ${number}`]: ExampleWidget;\n} & {\n    [key in `example-graphie-widget ${number}`]: ExampleGraphieWidget;\n} & {\n    [key in `explanation ${number}`]: ExplanationWidget;\n} & {\n    [key in `expression ${number}`]: ExpressionWidget;\n} & {\n    [key in `grapher ${number}`]: GrapherWidget;\n} & {\n    [key in `group ${number}`]: GroupWidget;\n} & {\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n} & {\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n} & {\n    [key in `iframe ${number}`]: IFrameWidget;\n} & {\n    [key in `image ${number}`]: ImageWidget;\n} & {\n    [key in `input-number ${number}`]: InputNumberWidget;\n} & {\n    [key in `interaction ${number}`]: InteractionWidget;\n} & {\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n} & {\n    [key in `label-image ${number}`]: LabelImageWidget;\n} & {\n    [key in `matcher ${number}`]: MatcherWidget;\n} & {\n    [key in `matrix ${number}`]: MatrixWidget;\n} & {\n    [key in `measurer ${number}`]: MeasurerWidget;\n} & {\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n} & {\n    [key in `number-line ${number}`]: NumberLineWidget;\n} & {\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n} & {\n    [key in `orderer ${number}`]: OrdererWidget;\n} & {\n    [key in `passage ${number}`]: PassageWidget;\n} & {\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n} & {\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n} & {\n    [key in `plotter ${number}`]: PlotterWidget;\n} & {\n    [key in `python-program ${number}`]: PythonProgramWidget;\n} & {\n    [key in `radio ${number}`]: RadioWidget;\n} & {\n    [key in `simple-markdown-tester ${number}`]: SimpleMarkdownTesterWidget;\n} & {\n    [key in `sorter ${number}`]: SorterWidget;\n} & {\n    [key in `table ${number}`]: TableWidget;\n} & {\n    [key in `video ${number}`]: VideoWidget;\n}",elements:[{name:"signature",type:"object",raw:"{\n    [key in `categorizer ${number}`]: CategorizerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`categorizer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `cs-program ${number}`]: CSProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`cs-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `definition ${number}`]: DefinitionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`definition ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `dropdown ${number}`]: DropdownWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`dropdown ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `example-widget ${number}`]: ExampleWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`example-widget ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `example-graphie-widget ${number}`]: ExampleGraphieWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`example-graphie-widget ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `explanation ${number}`]: ExplanationWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`explanation ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `expression ${number}`]: ExpressionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`expression ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `grapher ${number}`]: GrapherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`grapher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `group ${number}`]: GroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group ${number}`]: GradedGroupWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `graded-group-set ${number}`]: GradedGroupSetWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`graded-group-set ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `iframe ${number}`]: IFrameWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`iframe ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `image ${number}`]: ImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `input-number ${number}`]: InputNumberWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`input-number ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interaction ${number}`]: InteractionWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interaction ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `interactive-graph ${number}`]: InteractiveGraphWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`interactive-graph ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `label-image ${number}`]: LabelImageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`label-image ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matcher ${number}`]: MatcherWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matcher ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `matrix ${number}`]: MatrixWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`matrix ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `measurer ${number}`]: MeasurerWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`measurer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `molecule-renderer ${number}`]: MoleculeRendererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`molecule-renderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `number-line ${number}`]: NumberLineWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`number-line ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `numeric-input ${number}`]: NumericInputWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`numeric-input ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `orderer ${number}`]: OrdererWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`orderer ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage ${number}`]: PassageWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `passage-ref-target ${number}`]: PassageRefWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`passage-ref-target ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `plotter ${number}`]: PlotterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`plotter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `python-program ${number}`]: PythonProgramWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`python-program ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `radio ${number}`]: RadioWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`radio ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `simple-markdown-tester ${number}`]: SimpleMarkdownTesterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`simple-markdown-tester ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `sorter ${number}`]: SorterWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`sorter ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `table ${number}`]: TableWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`table ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}},{name:"signature",type:"object",raw:"{\n    [key in `video ${number}`]: VideoWidget;\n}",signature:{properties:[{key:{name:"literal",value:"`video ${number}`",required:!0},value:{name:"signature",type:"object",raw:`{
    // The "type" of widget which will define what the Options field looks like
    type: Type;
    // Whether this widget is displayed with the values and is immutable.  For display only
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    static?: boolean;
    // Whether a widget is scored.  Usually true except for IFrame widgets (deprecated)
    // Default: true
    graded?: boolean;
    // The HTML alignment of the widget.  "default" or "block"
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    alignment?: string;
    // Options specific to the type field of the widget.  See Perseus*WidgetOptions for more details
    options: Options;
    // Only used by interactive child widgets (line, point, etc) to identify the components
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    key?: number;
    // The version of the widget data spec.  Used to differentiate between newer and older content data.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    version?: Version;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'categorizer'",required:!0}},{key:"static",value:{name:"boolean",required:!1}},{key:"graded",value:{name:"boolean",required:!1}},{key:"alignment",value:{name:"string",required:!1}},{key:"options",value:{name:"signature",type:"object",raw:`{
    // Translatable text; a list of items to categorize. e.g. ["banana", "yellow", "apple", "purple", "shirt"]
    items: ReadonlyArray<string>;
    // Translatable text; a list of categories. e.g. ["fruits", "colors", "clothing"]
    categories: ReadonlyArray<string>;
    // Whether the items should be randemized
    randomizeItems: boolean;
    // Whether this widget is displayed with the results and immutable
    static: boolean;
    // The correct answers where index relates to the items and value relates to the category.  e.g. [0, 1, 0, 1, 2]
    values: ReadonlyArray<number>;
    // Whether we should highlight i18n linter errors found on this widget
    highlightLint?: boolean;
    // Internal editor configuration. Can be ignored by consumers.
    linterContext?: PerseusLinterContext;
}`,signature:{properties:[{key:"items",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"categories",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"randomizeItems",value:{name:"boolean",required:!0}},{key:"static",value:{name:"boolean",required:!0}},{key:"values",value:{name:"ReadonlyArray",elements:[{name:"number"}],raw:"ReadonlyArray<number>",required:!0}},{key:"highlightLint",value:{name:"boolean",required:!1}},{key:"linterContext",value:{name:"signature",type:"object",raw:`{
    contentType: string;
    paths: ReadonlyArray<string>;
    stack: ReadonlyArray<string>;
}`,signature:{properties:[{key:"contentType",value:{name:"string",required:!0}},{key:"paths",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}},{key:"stack",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!0}}]},required:!1}}]},required:!0}},{key:"key",value:{name:"number",required:!1}},{key:"version",value:{name:"signature",type:"object",raw:`{
    // The major part of the version
    major: number;
    // The minor part of the version
    minor: number;
}`,signature:{properties:[{key:"major",value:{name:"number",required:!0}},{key:"minor",value:{name:"number",required:!0}}]},required:!1}}]}}}]}}],required:!1}}]}}],raw:"ReadonlyArray<PerseusRadioChoice>",required:!0}},{key:"hasNoneOfTheAbove",value:{name:"boolean",required:!1}},{key:"countChoices",value:{name:"boolean",required:!1}},{key:"randomize",value:{name:"boolean",required:!1}},{key:"multipleSelect",value:{name:"boolean",required:!1}},{key:"deselectEnabled",value:{name:"boolean",required:!1}},{key:"onePerLine",value:{name:"boolean",required:!1}},{key:"displayCount",value:{name:"any",required:!1}},{key:"noneOfTheAbove",value:{name:"literal",value:"false",required:!1}}]}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(newValues: {
    checked: ReadonlyArray<boolean>;
    crossedOut: ReadonlyArray<boolean>;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    checked: ReadonlyArray<boolean>;
    crossedOut: ReadonlyArray<boolean>;
}`,signature:{properties:[{key:"checked",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}},{key:"crossedOut",value:{name:"ReadonlyArray",elements:[{name:"boolean"}],raw:"ReadonlyArray<boolean>",required:!0}}]}},name:"newValues"}],return:{name:"void"}}},description:""},registerFocusFunction:{required:!1,tsType:{name:"signature",type:"function",raw:"(arg1: FocusFunction) => void",signature:{arguments:[{type:{name:"signature",type:"function",raw:`(
    choiceIndex?: number | null | undefined,
) => boolean`,signature:{arguments:[{type:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},name:"choiceIndex"}],return:{name:"boolean"}}},name:"arg1"}],return:{name:"void"}}},description:""},isLastUsedWidget:{required:!1,tsType:{name:"boolean"},description:""}}};export{H as B};
