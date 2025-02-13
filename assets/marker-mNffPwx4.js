import{j as s}from"./jsx-runtime-63Ea5SlK.js";import{V as v}from"./index-_3CKOwHy.js";import{c as r}from"./index-QHkT31Yt.js";import{n as k}from"./no-important-xCWWYXQR.js";import{r as h}from"./index-6oxdNXpR.js";import{P as b}from"./i18n-context-60QTaC0J.js";import{I as T}from"./icon-7RFbyLiL.js";import{a as f,b as q,c as A}from"./icon-paths-5JCXzGsq.js";import{A as I}from"./answer-pill-GFH-sue-.js";function E(){if(typeof window.matchMedia!="function")return!0;const w=window.matchMedia("(prefers-reduced-motion: reduce)");return!w||w.matches}const t=24,p=class p extends h.Component{constructor(){super(...arguments),this._mounted=!1}componentDidMount(){this._mounted=!0}componentWillUnmount(){this._mounted=!1}renderIcon(){const{selected:d,showCorrectness:i,showSelected:y,showPulsate:u}=this.props,l=y,o=d;let n;const g={path:"",height:1,width:1};let a={size:t,color:r.white,icon:g};return i?(n=[e.markerGraded,i==="correct"?e.markerCorrect:e.markerIncorrect,l&&e.markerSelected],a={...a,icon:i==="correct"?f:q}):o&&o.length>0?n=[e.markerFilled,l&&e.markerSelected]:l?(n=[e.markerSelected],a={...a,icon:A,size:8}):u&&(n=[e.markerPulsateBase,this._mounted&&E()?u&&e.markerUnfilledPulsateOnce:u&&e.markerUnfilledPulsateInfinite]),s.jsx(v,{style:[e.markerIcon,n],ref:m=>this._icon=m,children:s.jsx(T,{...a})})}render(){const{showCorrectness:d,selected:i,showAnswer:y,answerSide:u,answerStyles:l,hovered:o,focused:n,label:g}=this.props,a=d==="correct",m=o||n;return s.jsxs(s.Fragment,{children:[s.jsx(v,{style:[e.marker,m&&!a&&e.markerActive],"aria-label":a?this.context.strings.correctExcited:g,children:this.renderIcon()}),!!i&&y&&s.jsx(I,{selectedAnswers:i,showCorrectness:d,side:u,style:l,markerRef:this._icon??void 0,hovered:o,focused:n})]})}};p.contextType=b,p.defaultProps={selected:[]};let c=p;const e=k.StyleSheet.create({marker:{position:"absolute",backgroundColor:r.white,borderRadius:t,width:t,height:t,marginLeft:t/-2,marginTop:t/-2,boxShadow:`0 8px 8px ${r.offBlack8}`},markerIcon:{display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",width:t,height:t,border:`2px solid ${r.offBlack64}`,borderRadius:t},markerPulsateBase:{animationName:{"0%":{transform:"scale(1)",backgroundColor:r.blue},"100%":{transform:"scale(1.3)",backgroundColor:r.blue}},animationDirection:"alternate",animationDuration:"0.8s",animationTimingFunction:"ease-in",transformOrigin:"50% 50%",animationIterationCount:"0"},markerUnfilledPulsateInfinite:{animationIterationCount:"infinite"},markerUnfilledPulsateOnce:{animationIterationCount:"2"},markerActive:{outline:`2px solid ${r.blue}`,outlineOffset:2},markerSelected:{boxShadow:`0 8px 8px ${r.offBlack8}`,border:`solid 4px ${r.white}`,backgroundColor:r.blue,borderRadius:t,transform:"rotate(180deg)"},markerFilled:{backgroundColor:"#ECF3FE",border:`4px solid ${r.blue}`},markerGraded:{width:t,height:t,justifyContent:"center",alignItems:"center",border:`2px solid ${r.white}`},markerCorrect:{background:"#00880b"},markerIncorrect:{background:r.offBlack64}});c.__docgenInfo={description:"",methods:[{name:"renderIcon",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Marker",props:{answers:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},label:{required:!0,tsType:{name:"string"},description:""},x:{required:!0,tsType:{name:"number"},description:""},y:{required:!0,tsType:{name:"number"},description:""},selected:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"",defaultValue:{value:"[]",computed:!1}},showCorrectness:{required:!1,tsType:{name:"union",raw:'"correct" | "incorrect"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'}]},description:""},focused:{required:!0,tsType:{name:"boolean"},description:""},showSelected:{required:!0,tsType:{name:"boolean"},description:""},showPulsate:{required:!0,tsType:{name:"boolean"},description:""},answerSide:{required:!0,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},answerStyles:{required:!1,tsType:{name:"CSSProperties"},description:""},showAnswer:{required:!1,tsType:{name:"boolean"},description:""},analytics:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    onAnalyticsEvent: AnalyticsEventHandlerFn;
}`,signature:{properties:[{key:"onAnalyticsEvent",value:{name:"signature",type:"function",raw:`(
    event: PerseusAnalyticsEvent,
) => Promise<void>`,signature:{arguments:[{type:{name:"union",raw:`| {
      type: "perseus:expression-evaluated";
      payload: {
          virtualKeypadVersion: VirtualKeypadVersion;
          result: "correct" | "incorrect" | "invalid";
      };
  }
| {
      type: "perseus:expression-focused";
      payload: null;
  }
// TODO(LEMS-2826): Remove this error type in LEMS-2826
| {
      type: "perseus:widget-rendering-error";
      payload: {
          widgetSubType: string;
          widgetType: string;
          widgetId: string;
          message: string;
          userAgent: string;
      };
  }
| {
      type: "perseus:widget-rendering-error:ti";
      payload: {
          widgetSubType: string;
          widgetType: string;
          widgetId: string;
          message: string;
          userAgent: string;
      };
  }
// TODO(LEMS-2827): Remove this error type in LEMS-2827
| {
      type: "perseus:interactive-graph-widget:rendered";
      payload: {
          type: string;
          widgetType: string;
          widgetId: string;
      };
  }
| {
      type: "perseus:widget:rendered:ti";
      payload: {
          widgetSubType: string;
          widgetType: string;
          widgetId: string;
      };
  }
// TODO(LEMS-2831): Remove this error type in LEMS-2831
| {
      type: "perseus:label-image:toggle-answers-hidden";
      payload: null;
  }
// TODO(LEMS-2830): Remove this error type in LEMS-2830
| {
      type: "perseus:label-image:marker-interacted-with";
      payload: null;
  }
// TODO(LEMS-2829): Remove this error type in LEMS-2829
| {
      type: "perseus:label-image:choiced-interacted-with";
      payload: null;
  }
| {
      type: "perseus:label-image:toggle-answers-hidden:ti";
      payload: null;
  }
| {
      type: "perseus:label-image:marker-interacted-with:ti";
      payload: null;
  }
| {
      type: "perseus:label-image:choiced-interacted-with:ti";
      payload: null;
  }
| {
      type: "math-input:keypad-closed";
      payload: {
          virtualKeypadVersion: VirtualKeypadVersion;
      };
  }
| {
      type: "math-input:keypad-opened";
      payload: {
          virtualKeypadVersion: VirtualKeypadVersion;
      };
  }`,elements:[{name:"signature",type:"object",raw:`{
    type: "perseus:expression-evaluated";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
        result: "correct" | "incorrect" | "invalid";
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:expression-evaluated"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
    result: "correct" | "incorrect" | "invalid";
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}},{key:"result",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:expression-focused";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:expression-focused"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget-rendering-error";
    payload: {
        widgetSubType: string;
        widgetType: string;
        widgetId: string;
        message: string;
        userAgent: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget-rendering-error"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetSubType: string;
    widgetType: string;
    widgetId: string;
    message: string;
    userAgent: string;
}`,signature:{properties:[{key:"widgetSubType",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}},{key:"message",value:{name:"string",required:!0}},{key:"userAgent",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget-rendering-error:ti";
    payload: {
        widgetSubType: string;
        widgetType: string;
        widgetId: string;
        message: string;
        userAgent: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget-rendering-error:ti"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetSubType: string;
    widgetType: string;
    widgetId: string;
    message: string;
    userAgent: string;
}`,signature:{properties:[{key:"widgetSubType",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}},{key:"message",value:{name:"string",required:!0}},{key:"userAgent",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:interactive-graph-widget:rendered";
    payload: {
        type: string;
        widgetType: string;
        widgetId: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:interactive-graph-widget:rendered"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    type: string;
    widgetType: string;
    widgetId: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget:rendered:ti";
    payload: {
        widgetSubType: string;
        widgetType: string;
        widgetId: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget:rendered:ti"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetSubType: string;
    widgetType: string;
    widgetId: string;
}`,signature:{properties:[{key:"widgetSubType",value:{name:"string",required:!0}},{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:toggle-answers-hidden";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:toggle-answers-hidden"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:marker-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:marker-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:choiced-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:choiced-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:toggle-answers-hidden:ti";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:toggle-answers-hidden:ti"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:marker-interacted-with:ti";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:marker-interacted-with:ti"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:choiced-interacted-with:ti";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:choiced-interacted-with:ti"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-closed";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-closed"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-opened";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-opened"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:'"MATH_INPUT_KEYPAD_V2" | "REACT_NATIVE_KEYPAD"',elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}},required:!0}}]}},description:""},hovered:{required:!0,tsType:{name:"boolean"},description:""}}};export{c as M};
