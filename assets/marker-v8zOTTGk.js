import{j as s}from"./jsx-runtime-63Ea5SlK.js";import{V as w}from"./index-Cj1jPHW9.js";import{c as r}from"./index-dmcq622U.js";import{l as h}from"./index-awljIyHI.js";import{r as k}from"./index-6oxdNXpR.js";import{P as b}from"./i18n-context-ixQPsVqr.js";import{I as f}from"./icon-7RFbyLiL.js";import{a as T,b as A,c as V}from"./icon-paths-5JCXzGsq.js";import{A as q}from"./answer-pill-gVUoRVbg.js";function I(){if(typeof window.matchMedia!="function")return!0;const v=window.matchMedia("(prefers-reduced-motion: reduce)");return!v||v.matches}const n=24,p=class p extends k.Component{constructor(){super(...arguments),this._mounted=!1}componentDidMount(){this._mounted=!0}componentWillUnmount(){this._mounted=!1}renderIcon(){const{selected:d,showCorrectness:i,showSelected:c,showPulsate:o}=this.props,l=c,u=d;let t;const m={path:"",height:1,width:1};let a={size:n,color:r.white,icon:m};return i?(t=[e.markerGraded,i==="correct"?e.markerCorrect:e.markerIncorrect,l&&e.markerSelected],a={...a,icon:i==="correct"?T:A}):u&&u.length>0?t=[e.markerFilled,l&&e.markerSelected]:l?(t=[e.markerSelected],a={...a,icon:V,size:8}):o&&(t=[e.markerPulsateBase,this._mounted&&I()?o&&e.markerUnfilledPulsateOnce:o&&e.markerUnfilledPulsateInfinite]),s.jsx(w,{style:[e.markerIcon,t],ref:y=>this._icon=y,children:s.jsx(f,{...a})})}render(){const{showCorrectness:d,selected:i,showAnswer:c,answerSide:o,answerStyles:l,hovered:u,focused:t,label:m}=this.props,a=d==="correct",y=u||t;return s.jsxs(s.Fragment,{children:[s.jsx(w,{style:[e.marker,y&&!a&&e.markerActive],"aria-label":a?this.context.strings.correctExcited:m,children:this.renderIcon()}),!!i&&c&&s.jsx(q,{selectedAnswers:i,showCorrectness:d,side:o,style:l,markerRef:this._icon??void 0,hovered:u,focused:t})]})}};p.contextType=b,p.defaultProps={selected:[]};let g=p;const e=h.StyleSheet.create({marker:{position:"absolute",backgroundColor:r.white,borderRadius:n,width:n,height:n,marginLeft:n/-2,marginTop:n/-2,boxShadow:`0 8px 8px ${r.offBlack8}`},markerIcon:{display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",width:n,height:n,border:`2px solid ${r.offBlack64}`,borderRadius:n},markerPulsateBase:{animationName:{"0%":{transform:"scale(1)",backgroundColor:r.blue},"100%":{transform:"scale(1.3)",backgroundColor:r.blue}},animationDirection:"alternate",animationDuration:"0.8s",animationTimingFunction:"ease-in",transformOrigin:"50% 50%",animationIterationCount:"0"},markerUnfilledPulsateInfinite:{animationIterationCount:"infinite"},markerUnfilledPulsateOnce:{animationIterationCount:"2"},markerActive:{outline:`2px solid ${r.blue}`,outlineOffset:2},markerSelected:{boxShadow:`0 8px 8px ${r.offBlack8}`,border:`solid 4px ${r.white}`,backgroundColor:r.blue,borderRadius:n,transform:"rotate(180deg)"},markerFilled:{backgroundColor:"#ECF3FE",border:`4px solid ${r.blue}`},markerGraded:{width:n,height:n,justifyContent:"center",alignItems:"center",border:`2px solid ${r.white}`},markerCorrect:{background:"#00880b"},markerIncorrect:{background:r.offBlack64}});g.__docgenInfo={description:"",methods:[{name:"renderIcon",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Marker",props:{answers:{required:!0,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:""},label:{required:!0,tsType:{name:"string"},description:""},x:{required:!0,tsType:{name:"number"},description:""},y:{required:!0,tsType:{name:"number"},description:""},selected:{required:!1,tsType:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},description:"",defaultValue:{value:"[]",computed:!1}},showCorrectness:{required:!1,tsType:{name:"union",raw:'"correct" | "incorrect"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'}]},description:""},focused:{required:!0,tsType:{name:"boolean"},description:""},showSelected:{required:!0,tsType:{name:"boolean"},description:""},showPulsate:{required:!0,tsType:{name:"boolean"},description:""},answerSide:{required:!0,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:""},answerStyles:{required:!1,tsType:{name:"CSSProperties"},description:""},showAnswer:{required:!1,tsType:{name:"boolean"},description:""},analytics:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
| {
      type: "perseus:widget-rendering-error";
      payload: {
          widgetType: string;
          widgetId: string;
      };
  }
| {
      type: "perseus:interactive-graph-widget:rendered";
      payload: {
          type: string;
          widgetType: string;
          widgetId: string;
      };
  }
| {
      type: "perseus:label-image:toggle-answers-hidden";
      payload: null;
  }
| {
      type: "perseus:label-image:marker-interacted-with";
      payload: null;
  }
| {
      type: "perseus:label-image:choiced-interacted-with";
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
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:`| "MATH_INPUT_KEYPAD_V2"
| "REACT_NATIVE_KEYPAD"`,elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}},{key:"result",value:{name:"union",raw:'"correct" | "incorrect" | "invalid"',elements:[{name:"literal",value:'"correct"'},{name:"literal",value:'"incorrect"'},{name:"literal",value:'"invalid"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:expression-focused";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:expression-focused"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:widget-rendering-error";
    payload: {
        widgetType: string;
        widgetId: string;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:widget-rendering-error"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    widgetType: string;
    widgetId: string;
}`,signature:{properties:[{key:"widgetType",value:{name:"string",required:!0}},{key:"widgetId",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
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
    type: "perseus:label-image:toggle-answers-hidden";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:toggle-answers-hidden"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:marker-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:marker-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "perseus:label-image:choiced-interacted-with";
    payload: null;
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"perseus:label-image:choiced-interacted-with"',required:!0}},{key:"payload",value:{name:"null",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-closed";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-closed"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:`| "MATH_INPUT_KEYPAD_V2"
| "REACT_NATIVE_KEYPAD"`,elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: "math-input:keypad-opened";
    payload: {
        virtualKeypadVersion: VirtualKeypadVersion;
    };
}`,signature:{properties:[{key:"type",value:{name:"literal",value:'"math-input:keypad-opened"',required:!0}},{key:"payload",value:{name:"signature",type:"object",raw:`{
    virtualKeypadVersion: VirtualKeypadVersion;
}`,signature:{properties:[{key:"virtualKeypadVersion",value:{name:"union",raw:`| "MATH_INPUT_KEYPAD_V2"
| "REACT_NATIVE_KEYPAD"`,elements:[{name:"literal",value:'"MATH_INPUT_KEYPAD_V2"'},{name:"literal",value:'"REACT_NATIVE_KEYPAD"'}],required:!0}}]},required:!0}}]}}]},name:"event"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}},required:!0}}]}},description:""},hovered:{required:!0,tsType:{name:"boolean"},description:""}}};export{g as M};
