import{j as r,A as g,r as t,V as v}from"./iframe-gHPTgJAT.js";import"./item-version-BiEcwQw5.js";import"./article-renderer-CJgVKQva.js";import"./server-item-renderer-CKnw9Tcb.js";import"./hints-renderer-pWFvPMC8.js";import"./index-Dfmrhb_y.js";import{S as W}from"./split-view-ChN9x5rQ.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-jJVX8biO.js";import{E as f}from"./editor-M3hkfjU5.js";import"./article-editor-CRZotShC.js";import"./components-WUX2y3_o.js";import"./device-framer-Wy8P7HmI.js";import"./constants-kyOY0S4e.js";import"./section-control-button-LZW-c1S1.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-Hl18EkoU.js";import"./text-diff-DCBGUzv4.js";import"./editor-page-DIH8uyFe.js";import"./toggleable-caret-FnYowP9e.js";import"./trash-bold-BOD_tO_K.js";import"./item-extras-editor-BcZP38za.js";import"./content-preview-C3U4w9G4.js";/* empty css                       */import"./main-C1F-SGdi.js";import"./categorizer-editor-BeGI08GE.js";import"./editor-jsonify-CV0kLWK-.js";import"./blur-input-Cd0dEqSs.js";import"./definition-editor-CC034_x1.js";import"./dropdown-editor-BUGTMhcn.js";import"./explanation-editor-DxinP2be.js";import"./expression-editor-D-ITsy1_.js";import"./free-response-editor-HGQOpGWW.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DznEG2bQ.js";import"./image-editor-CTvORfPb.js";import"./input-number-editor-BxgWzEDA.js";import"./interaction-editor-caw7kNwW.js";import"./interactive-graph-editor-ouK501ha.js";import"./color-select-Dh8aaETA.js";import"./Popper-cacjySX8.js";import"./util-DlVOUldk.js";import"./heading-C-UaFYDX.js";import"./interactive-graph-settings-C22jluta.js";import"./locked-figures-section-B_lzwLDf.js";import"./locked-ellipse-settings-9CgcgQoB.js";import"./scrollless-number-text-field-BXijIN6q.js";import"./locked-label-settings-Scaahz01.js";import"./line-stroke-select-aWYlh_Nv.js";import"./locked-figure-aria-CQS-WfIm.js";import"./locked-function-settings-CZp3Xq9-.js";import"./line-swatch-CNwVtvMF.js";import"./locked-line-settings-Db0BiRGk.js";import"./locked-point-settings-CnVF4FnJ.js";import"./labeled-switch-ClRWyayb.js";import"./locked-polygon-settings-D4GD3ZWo.js";import"./locked-vector-settings-D4CYS0WT.js";import"./label-image-editor-Dhe3fi_C.js";import"./form-wrapped-text-field-DIYaLf34.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BqVFx-5h.js";import"./behavior-BB1cOo_w.js";import"./question-markers-C8d1e5gh.js";import"./marker-CAKZTk_t.js";import"./select-image-BYsmI1Ht.js";import"./matcher-editor-CGCeC3C8.js";import"./number-line-editor-ClmcFII_.js";import"./numeric-input-editor-CWKoOhfl.js";import"./phet-simulation-editor-_We-Pg1z.js";import"./plotter-editor-Duaz0zhx.js";import"./python-program-editor-k5HWEz1J.js";import"./editor-CoH9iLUK.js";import"./sorter-editor-DiTyGxdU.js";import"./tex-error-view-D57qchmm.js";const a={content:`A sequence is defined recursively as follows:


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
