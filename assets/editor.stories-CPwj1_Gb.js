import{j as r,A as g,r as t,V as v}from"./iframe-ClpJ2tSX.js";import"./item-version-CQubXDjk.js";import"./article-renderer-swXFKa55.js";import"./server-item-renderer-DLm0hFtk.js";import"./hints-renderer-m5to_iUG.js";import"./index-O5DagZcq.js";import{S as W}from"./split-view-WcodXH99.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-C24dvxwr.js";import{E as f}from"./editor-yDWGm2qN.js";import"./article-editor-DYq3PcLn.js";import"./components-BTpdromP.js";import"./device-framer-CBuSYyEv.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BQ23aPeR.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-wXfLTHQZ.js";import"./text-diff-BuHcjqeP.js";import"./editor-page-D4yoYc_-.js";import"./toggleable-caret-XcTMhoc0.js";import"./trash-bold-CF2loVbk.js";import"./item-extras-editor-beaTXa8E.js";import"./content-preview-DlqG8uxo.js";/* empty css                       */import"./main-CMy0IVsM.js";import"./categorizer-editor-BgfjftKJ.js";import"./editor-jsonify-BQhPQ9vB.js";import"./blur-input-BVXr7sW3.js";import"./definition-editor-BMiQ56LI.js";import"./dropdown-editor-BeBIjlKt.js";import"./explanation-editor-QMMxOzmO.js";import"./expression-editor-C07NV5Ub.js";import"./free-response-editor-CSemjumg.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DzLlGJkF.js";import"./image-editor-DwL22e3A.js";import"./input-number-editor-x5Ru7dmS.js";import"./interaction-editor-DBXvejiA.js";import"./interactive-graph-editor-78YzKd3Y.js";import"./color-select-C92XDuV1.js";import"./Popper-UOVHR52E.js";import"./util-CjYOiRFR.js";import"./heading-DsU2hfzh.js";import"./interactive-graph-settings-BAFIXh2a.js";import"./locked-figures-section-S8WEH9JN.js";import"./locked-ellipse-settings-BWuhXiI-.js";import"./scrollless-number-text-field-B4A8hgv0.js";import"./locked-label-settings-CxVe76wq.js";import"./line-stroke-select-Dgim2eOA.js";import"./line-weight-select-PhK6FtRb.js";import"./locked-figure-aria-Cw_mXcqZ.js";import"./locked-function-settings-PD8k23BE.js";import"./line-swatch-B2RHZ_Sz.js";import"./locked-line-settings-B66nWiBu.js";import"./locked-point-settings-BmnJnbvL.js";import"./labeled-switch-kS7yDyia.js";import"./locked-polygon-settings-D9khRmA6.js";import"./locked-vector-settings-D6FnpZDZ.js";import"./label-image-editor-DBRxGx8t.js";import"./form-wrapped-text-field-B5niEkIT.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BoyyrGrM.js";import"./behavior-Il5_xuON.js";import"./question-markers-BTMcIImW.js";import"./marker-9xdKpYxj.js";import"./select-image-bDlOkLZQ.js";import"./matcher-editor-Cq3uRN6Q.js";import"./number-line-editor-DDICvu6x.js";import"./numeric-input-editor-CDhSYnAt.js";import"./phet-simulation-editor-C2kNYPox.js";import"./plotter-editor-Buy93Cd6.js";import"./python-program-editor-BLw3Niqb.js";import"./editor-CMo_b-D7.js";import"./sorter-editor-3iCOMMh3.js";import"./tex-error-view-BTNtDsVe.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const Ue={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Ye=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Ye as __namedExportsOrder,Ue as default};
