import{j as r,A as g,r as t,V as v}from"./iframe-UtCD2W5C.js";import"./item-version-BOeu8wCo.js";import"./article-renderer-JYZYc9Wg.js";import"./server-item-renderer-BpR8JcK3.js";import"./hints-renderer-D-7KbmbH.js";import"./index-DLyGhXnW.js";import{S as W}from"./split-view-C7Rbj4ko.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-CgxZSwlK.js";import{E as f}from"./editor-DHYAMuoO.js";import"./article-editor-CbdkjVkl.js";import"./components-B51QW2vZ.js";import"./device-framer-BhgwemGn.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BTv3oklu.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-qzG2980R.js";import"./text-diff-BFgztrRa.js";import"./editor-page-D6Mfkz_Y.js";import"./trash-bold-DGSeolNx.js";import"./item-extras-editor-B6E9l35J.js";import"./content-preview-DHjNhq7A.js";/* empty css                       */import"./main-ABZwWlYU.js";import"./categorizer-editor-NBBgRsOL.js";import"./editor-jsonify-CImgnPN7.js";import"./blur-input-C3FqrUqb.js";import"./definition-editor-BwOMpSQX.js";import"./dropdown-editor-P1VJX8kq.js";import"./explanation-editor-C0mphfGQ.js";import"./expression-editor-DQMUUlST.js";import"./free-response-editor-CxskhFtL.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BiczoDOm.js";import"./image-editor-Bh2wl-PY.js";import"./input-number-editor-DZk_nXeM.js";import"./interaction-editor-CaSDjXF2.js";import"./interactive-graph-editor-cU3YJyjQ.js";import"./color-select-DaJ-5oKH.js";import"./Popper-BRWITGIn.js";import"./util-CB4Pe0pT.js";import"./heading-OJBrjHUC.js";import"./toggleable-caret-BDwtV4OF.js";import"./interactive-graph-settings-Dhx0v1pA.js";import"./locked-figures-section-C_ZY5ALM.js";import"./locked-ellipse-settings-DKSXiM1c.js";import"./scrollless-number-text-field-D5FzczQ5.js";import"./locked-label-settings-C4AqLBdw.js";import"./line-stroke-select-DvMr95SV.js";import"./locked-figure-aria-Ck54ZwxV.js";import"./locked-function-settings-DZMj3qqx.js";import"./line-swatch-d3_PU6Jt.js";import"./locked-line-settings-GcDnK1RX.js";import"./locked-point-settings-CAYywr6m.js";import"./labeled-switch-CNvB_GoZ.js";import"./locked-polygon-settings-T0IfB8sn.js";import"./locked-vector-settings-yzMkVeIJ.js";import"./label-image-editor-B02LRZY5.js";import"./form-wrapped-text-field-Bvn5vNVV.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BbLKcB32.js";import"./behavior-CufmRlil.js";import"./question-markers-C_GiR3XN.js";import"./marker-D3AFX9fQ.js";import"./select-image-CBX3Ia02.js";import"./matcher-editor-D58Irmzd.js";import"./number-line-editor-C2unna8u.js";import"./numeric-input-editor-B3nUYCTt.js";import"./phet-simulation-editor-BhuIFDBN.js";import"./plotter-editor-CSly64X0.js";import"./python-program-editor-BL4eqAyK.js";import"./editor-C725xRRJ.js";import"./sorter-editor-r8OREEk0.js";import"./tex-error-view-oLP3Tyvr.js";const a={content:`A sequence is defined recursively as follows:


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
