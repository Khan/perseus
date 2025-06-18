import{j as r,A as g,r as t,V as v}from"./iframe-CtkVBj09.js";import"./item-version-unCQtfPQ.js";import"./article-renderer-BH831tcc.js";import"./server-item-renderer-YruOpBiY.js";import"./hints-renderer-BQQsw2Qv.js";import"./index-DO41NPZm.js";import{S as W}from"./split-view-D1L9Jpzz.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DMzY-YFX.js";import{E as f}from"./editor-D9JtiiDV.js";import"./article-editor-CVFCk1hx.js";import"./components-D60z2x1D.js";import"./device-framer-C1LbnXiD.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Bj2okPYM.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CVNhr_17.js";import"./text-diff-CMNe9osS.js";import"./editor-page-jp871Trm.js";import"./toggleable-caret-C6f_Ng-G.js";import"./trash-bold-BIvm57Hv.js";import"./item-extras-editor-DX9oZdUF.js";import"./content-preview-3oGcP4hl.js";/* empty css                       */import"./main-CNj293Yw.js";import"./categorizer-editor-BMAoCwIi.js";import"./editor-jsonify-CjTcDQI_.js";import"./blur-input-CHce-Iwp.js";import"./definition-editor-dPpB5i7w.js";import"./dropdown-editor-DgeP4YXr.js";import"./explanation-editor-p1aHPitc.js";import"./expression-editor-C0ITni94.js";import"./free-response-editor-C1wOtLCK.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BgT5f1h0.js";import"./image-editor-JstNCqWF.js";import"./input-number-editor-BaBTZH8L.js";import"./interaction-editor-DpSBJajG.js";import"./interactive-graph-editor-DPmBNZsv.js";import"./color-select-DFG1IsSh.js";import"./Popper-5JZ0qURI.js";import"./util-tpfdoI9z.js";import"./heading-D0GW91F2.js";import"./interactive-graph-settings-DhZ_Y1EG.js";import"./locked-figures-section-DkHmwHUx.js";import"./locked-ellipse-settings-BIe2rvnQ.js";import"./scrollless-number-text-field-eExfWS4f.js";import"./locked-label-settings-C7mcF0XM.js";import"./line-stroke-select-CH_KcVnT.js";import"./locked-figure-aria-DAov9yY4.js";import"./locked-function-settings-DsVyltG3.js";import"./line-swatch-CZfSWwZv.js";import"./locked-line-settings-C2iWnUg9.js";import"./locked-point-settings-DPRVZ5Lf.js";import"./labeled-switch-DKESnjKt.js";import"./locked-polygon-settings-DiZ9OZ2A.js";import"./locked-vector-settings-m78Ryi1t.js";import"./label-image-editor-B0UWvopb.js";import"./form-wrapped-text-field-C40J3qOX.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BVUV6nRy.js";import"./behavior-Ca17iGu6.js";import"./question-markers-BTCQwAPS.js";import"./marker-DYx2QRfK.js";import"./select-image-BYCSguoV.js";import"./matcher-editor-Gbcbl2uC.js";import"./number-line-editor-CAU_vhOC.js";import"./numeric-input-editor-vgtwSZZp.js";import"./phet-simulation-editor-BllySij4.js";import"./plotter-editor-BeyCUcLz.js";import"./python-program-editor-B21gGRFV.js";import"./editor-DruvT7IS.js";import"./sorter-editor-CqCYRlot.js";import"./tex-error-view-CJiwMduJ.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const Ke={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
  return <Editor apiOptions={ApiOptions.defaults} content={question1.content} placeholder="" widgets={question1.widgets} images={question1.images} disabled={false} widgetEnabled={true} immutableWidgets={false} showWordCount={true} warnNoPrompt={true} warnNoWidgets={true} onChange={props => {}} />;
}`,...(d=(m=i.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var c,l,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`(): React.ReactElement => {
  const editorRef = React.useRef<Editor>(null);
  const [options, setOptions] = React.useState({});
  const [content, setContent] = React.useState("[[\\u2603 interactive-graph 1]]");
  const [images, setImages] = React.useState<PerseusRenderer["images"]>({});
  const [widgets, setWidgets] = React.useState<PerseusRenderer["widgets"]>({
    "interactive-graph 1": {
      options: {
        labels: ["x", "y"],
        lockedFigures: [],
        range: [[-10, 10], [-10, 10]],
        gridStep: [1, 1],
        snapStep: [1, 1],
        step: [1, 1],
        backgroundImage: {
          url: null
        },
        markings: "graph",
        showProtractor: false,
        showTooltips: false,
        graph: {
          type: "linear",
          coords: [[1, 1], [5, 5]]
        },
        correct: {
          type: "linear"
        }
      },
      type: "interactive-graph",
      version: {
        major: 0,
        minor: 0
      }
    }
  });
  return (
    // Many of the editor components use scoped CSS that requires this
    // class to be above it.
    // TODO: Refactor to aphrodite styles instead of scoped CSS in Less.
    <div className="framework-perseus">
            <SplitView rendererTitle="Editor" renderer={<View style={{
        width: "360px",
        margin: "20px"
      }}>
                        <Editor ref={editorRef} apiOptions={ApiOptions.defaults} content={content} placeholder="" widgets={widgets} images={images} disabled={false} widgetEnabled={true} immutableWidgets={false} showWordCount={true} warnNoPrompt={false} warnNoWidgets={true}
        // TODO(LEMS-2656): remove TS suppression
        onChange={((props: Partial<PerseusRenderer>) => {
          action("onChange")(props);
          if (props.content) {
            setContent(props.content);
          } else if (props.widgets) {
            setWidgets(props.widgets);
          } else if (props.images) {
            setImages(props.images);
          }
          // We need to wait for one tick so that the editor
          // has been re-rendered with the changed props. If
          // we don't wait, we get the values from the n-1
          // render and miss the latest change.
          setTimeout(() => {
            setOptions(editorRef.current?.serialize() || {});
          }, 0);
        }) as any} />
                    </View>} JSONTitle="Serialized Widget Options" jsonObject={options} />
        </div>
  );
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Ue=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Ue as __namedExportsOrder,Ke as default};
