import{j as r,A as g,r as t,V as v}from"./iframe-C0-lSMGx.js";import"./item-version-CMQ17jd8.js";import"./article-renderer-CuBmqWtm.js";import"./server-item-renderer-DBHmEuGj.js";import"./hints-renderer-BhBsNahl.js";import"./index-BrYuBv5P.js";import{S as W}from"./split-view-CEkCrBpa.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BcFirdpn.js";import{E as f}from"./editor-2CaoDnmj.js";import"./article-editor-D4oWrR8J.js";import"./components-BU12cmMr.js";import"./device-framer-DPF7vdbd.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CrdRGjjx.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-Cs9o129A.js";import"./text-diff-BVBtTtdV.js";import"./editor-page-D_-FS6CN.js";import"./toggleable-caret-9YO25AlX.js";import"./trash-bold-XSHKwhL_.js";import"./item-extras-editor-BZtDC7Iy.js";import"./content-preview-D127-U8n.js";/* empty css                       */import"./main-DeFE9cWI.js";import"./categorizer-editor-DklRLgMf.js";import"./editor-jsonify-C2_ZAJxW.js";import"./blur-input-C_Yj8TbJ.js";import"./definition-editor-CAD8Cp_M.js";import"./dropdown-editor-BTCOXOft.js";import"./explanation-editor-B-fomXce.js";import"./expression-editor-CF8MsbXG.js";import"./free-response-editor-D0s3PPHE.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CQdEBVjc.js";import"./image-editor-D9phtCfU.js";import"./input-number-editor-BLlndamo.js";import"./interaction-editor-CRV81VqJ.js";import"./interactive-graph-editor-DfLyptBV.js";import"./color-select-BPgsHWmK.js";import"./Popper-rOL93a94.js";import"./util-CgJKHNIC.js";import"./heading-wUF4X-H3.js";import"./interactive-graph-settings-DaJFF1bj.js";import"./locked-figures-section-puewLuGT.js";import"./locked-ellipse-settings-C2UGwawP.js";import"./scrollless-number-text-field-Beibnikl.js";import"./locked-label-settings-D9JKk2gR.js";import"./line-stroke-select-DYlFfY7F.js";import"./locked-figure-aria-DOBaW10N.js";import"./locked-function-settings-BVgo1WeV.js";import"./line-swatch-C-xrTZle.js";import"./locked-line-settings-jjjWeF9H.js";import"./locked-point-settings-D-b2VOR7.js";import"./labeled-switch-Xf6BhCt4.js";import"./locked-polygon-settings-DTQPjWVv.js";import"./locked-vector-settings-BqIVsx2R.js";import"./label-image-editor-PFBVQumq.js";import"./form-wrapped-text-field-C2QL6XDA.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-rKY_sxy-.js";import"./behavior-DQOc0wr1.js";import"./question-markers-IBMO-sxw.js";import"./marker-CPcpRztO.js";import"./select-image-ByEAA7Et.js";import"./matcher-editor-C7OyMOhL.js";import"./number-line-editor-DFpF7u6z.js";import"./numeric-input-editor-CvnQR4vp.js";import"./phet-simulation-editor-kEM4zklj.js";import"./plotter-editor-Bq5c1H3d.js";import"./python-program-editor-hQtRMYS3.js";import"./editor-DPVAaL2B.js";import"./sorter-editor-DB3PkXl1.js";import"./tex-error-view-DEF1YyV7.js";const a={content:`A sequence is defined recursively as follows:


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
