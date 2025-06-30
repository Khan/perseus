import{j as r,A as g,r as t,V as v}from"./iframe-CvVOl_wM.js";import"./item-version-CM-vdOGJ.js";import"./article-renderer-ifo9MFST.js";import"./server-item-renderer-BWrjrsdx.js";import"./hints-renderer-vP4aZU-y.js";import"./index-v-VWq8-3.js";import{S as W}from"./split-view-D-Y-P68z.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-CbCkArqL.js";import{E as f}from"./editor-v1UkS15F.js";import"./article-editor-UEdD-D1P.js";import"./components-v5t4oZhn.js";import"./device-framer-B6bLvFxp.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DlNh3yQ6.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BDSjgVl-.js";import"./text-diff-BdqAmvIL.js";import"./editor-page-LbiItecH.js";import"./toggleable-caret-CoiMk4BN.js";import"./trash-bold-rI1QN0T5.js";import"./item-extras-editor-AjaypOkT.js";import"./content-preview-OK8A1wHE.js";/* empty css                       */import"./main-3WVzNcIy.js";import"./categorizer-editor-h1gxKqid.js";import"./editor-jsonify-CH1GmI8C.js";import"./blur-input-jBcNmRI8.js";import"./definition-editor-BqNNfCK9.js";import"./dropdown-editor-DdYjRUsO.js";import"./explanation-editor-CuRRmr0Q.js";import"./expression-editor-Bw3sKybe.js";import"./free-response-editor-Bd-sWtvz.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Bw9iq5Lq.js";import"./image-editor-DnhuTgIL.js";import"./input-number-editor-C6eyebt6.js";import"./interaction-editor-CKjKXZpd.js";import"./interactive-graph-editor-B7tBgXCl.js";import"./color-select-DR8bHOOP.js";import"./Popper-BXFGUwWp.js";import"./util-B4a-q7sG.js";import"./heading-B0GVhEW2.js";import"./interactive-graph-settings-CQu-jHaC.js";import"./locked-figures-section-VoRYrzNa.js";import"./locked-ellipse-settings-DaVfBeWm.js";import"./scrollless-number-text-field-Bu6NCVBV.js";import"./locked-label-settings-D9Za8aYj.js";import"./line-stroke-select-D0k0wPGq.js";import"./locked-figure-aria-DplTfXtS.js";import"./locked-function-settings-_mMHyQIG.js";import"./line-swatch-B6aoiWSV.js";import"./locked-line-settings-DnWqJw17.js";import"./locked-point-settings-D4LDCX5f.js";import"./labeled-switch-UIHuEqCp.js";import"./locked-polygon-settings-BKvOI_33.js";import"./locked-vector-settings-DD8F39Nv.js";import"./label-image-editor-L1N3cPAR.js";import"./form-wrapped-text-field-BBq21htE.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-2Ya9JF1O.js";import"./behavior-BXGAXCZZ.js";import"./question-markers-DI9ry3Ma.js";import"./marker-BQjxy6eD.js";import"./select-image-D3Byr4Rq.js";import"./matcher-editor-BcAa3Boi.js";import"./number-line-editor-B5jleULF.js";import"./numeric-input-editor-DROnFXmC.js";import"./phet-simulation-editor-BYdo4me7.js";import"./plotter-editor-YKwwduvO.js";import"./python-program-editor-CIt2Sdr0.js";import"./editor-DcRtOFbu.js";import"./sorter-editor-vU71ebdK.js";import"./tex-error-view-Bc5LSqsh.js";const a={content:`A sequence is defined recursively as follows:


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
