import{j as r,A as g,r as t,V as v}from"./iframe-BXVA8BYU.js";import"./item-version-BykZ0nru.js";import"./article-renderer-CvpNpo6i.js";import"./server-item-renderer-CWYIQbo4.js";import"./hints-renderer-BHzQDwYd.js";import"./index-C2obMp8m.js";import{S as W}from"./split-view-BCFINb48.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BS8jt9WU.js";import{E as f}from"./editor-BMo-uP_j.js";import"./article-editor-C2zvZLzf.js";import"./components-DNWlZddO.js";import"./device-framer-Icvl44cZ.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BLDLe3Yy.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DDDEUarN.js";import"./text-diff-BbFODq_G.js";import"./editor-page-BxyAWeoB.js";import"./trash-bold-B_PZD8ch.js";import"./item-extras-editor-BzBF9zMo.js";import"./content-preview-D0cp20le.js";/* empty css                       */import"./categorizer-editor-3g1K5sc9.js";import"./editor-jsonify-CBmMHNMs.js";import"./blur-input-DhNqEOwO.js";import"./definition-editor-BGErQagG.js";import"./dropdown-editor-B4AgL-Ia.js";import"./explanation-editor-rrPKa49i.js";import"./expression-editor-DSDRBhqG.js";import"./free-response-editor-DKkMUhsl.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BL4tjPN6.js";import"./image-editor-ClVy-cwy.js";import"./input-number-editor-cydByZLu.js";import"./interaction-editor-lCfh46dK.js";import"./interactive-graph-editor-N87yrtd1.js";import"./color-select-CzJhIei-.js";import"./Popper-4-x9NNzV.js";import"./util-kqF8lh1e.js";import"./heading-UhUR0X8F.js";import"./toggleable-caret-CGOxoAAR.js";import"./interactive-graph-settings-Dm7cdpt8.js";import"./locked-figures-section-CmFMOqEz.js";import"./locked-ellipse-settings-C5oKYy-w.js";import"./scrollless-number-text-field-CcvSl_B0.js";import"./locked-label-settings-YbstwhQv.js";import"./line-stroke-select-C12wfR4Q.js";import"./locked-figure-aria-DHRNV88Q.js";import"./locked-function-settings-mFzjTNNF.js";import"./line-swatch-BrskSQWx.js";import"./locked-line-settings-CTC8djzp.js";import"./locked-point-settings-CDidnsVM.js";import"./labeled-switch-BZBo7SES.js";import"./locked-polygon-settings-_aw64op8.js";import"./locked-vector-settings-sYYUeXYq.js";import"./label-image-editor-93jIdTQx.js";import"./form-wrapped-text-field-CPCkSVL0.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DrE341xG.js";import"./behavior-CxPYokWu.js";import"./question-markers-B7cPG_i1.js";import"./marker-BEfAfxDN.js";import"./select-image-BJrik8rH.js";import"./matcher-editor-yOeFdrgO.js";import"./number-line-editor-C8D0gtEV.js";import"./numeric-input-editor-CXI9FDUg.js";import"./phet-simulation-editor-DhEALrIJ.js";import"./plotter-editor-bUcBO5SS.js";import"./python-program-editor-zfCCtJOE.js";import"./editor-DMJIogvI.js";import"./sorter-editor-CeZ-Yj11.js";import"./tex-error-view-SiwKV6tf.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const Be={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Ke=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Ke as __namedExportsOrder,Be as default};
