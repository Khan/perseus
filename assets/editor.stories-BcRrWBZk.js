import{j as r,A as g,r as t,V as v}from"./iframe-BLnk7R3A.js";import"./item-version-BkF3W7GB.js";import"./article-renderer-BwUiNcPk.js";import"./server-item-renderer-IpHh8sRL.js";import"./hints-renderer-DEhrvpZS.js";import"./index-C5ZS2_14.js";import{S as W}from"./split-view-BG80KCyO.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-ugELp4_O.js";import{E as f}from"./editor-C_E7DRWg.js";import"./article-editor-DUug6gLD.js";import"./components-JIs2XqQb.js";import"./device-framer-_RpOkKjv.js";import"./constants-kyOY0S4e.js";import"./section-control-button-D3bJ8hzx.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DL5k8Cqn.js";import"./text-diff-m2Ck_fiY.js";import"./editor-page-BQoJ4YWo.js";import"./trash-bold-DEF6DLkZ.js";import"./item-extras-editor-Bz_cpphQ.js";import"./content-preview-5LTzFIlA.js";/* empty css                       */import"./categorizer-editor-CCxDGt4Y.js";import"./editor-jsonify-Dyzv4eIF.js";import"./blur-input-B3cwo6vr.js";import"./definition-editor-COya2r9e.js";import"./dropdown-editor-vtUEcjg4.js";import"./explanation-editor-DMTRVy1d.js";import"./expression-editor-Dx7kqGjx.js";import"./free-response-editor-DPdGsJQN.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CLmy9Uwv.js";import"./image-editor-CvMjQekx.js";import"./input-number-editor-CW0fkoUM.js";import"./interaction-editor-CkheaFnF.js";import"./interactive-graph-editor-BQ4FxJGE.js";import"./color-select-DrQkhqmR.js";import"./Popper-PxStMmPD.js";import"./util-ByHPnHME.js";import"./heading-ChdOy54R.js";import"./toggleable-caret-DhmlCuF3.js";import"./interactive-graph-settings-7symCR5c.js";import"./locked-figures-section-DBekbyGt.js";import"./locked-ellipse-settings-D0HNy1UI.js";import"./scrollless-number-text-field-WZRplWiT.js";import"./locked-label-settings-BPytXpa0.js";import"./line-stroke-select-DD6ds7lk.js";import"./locked-figure-aria-CC_kllJt.js";import"./locked-function-settings-DuVlIhUy.js";import"./line-swatch-BjBquZtr.js";import"./locked-line-settings-DHN6yIhs.js";import"./locked-point-settings-Bq35ueG2.js";import"./labeled-switch-Cia49jby.js";import"./locked-polygon-settings-CJKio2Pv.js";import"./locked-vector-settings-6ZUOgPtz.js";import"./label-image-editor-DKfup-2v.js";import"./form-wrapped-text-field-C_DFLGjx.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DPkCN7NQ.js";import"./behavior-D7cwYGRs.js";import"./question-markers-CSMZ1PpS.js";import"./marker-ffFYZHwE.js";import"./select-image-BUmwzJ6Z.js";import"./matcher-editor-D0z9oqUK.js";import"./number-line-editor-D6Waa-bt.js";import"./numeric-input-editor-CO0XdkVK.js";import"./phet-simulation-editor-DtOMZOjq.js";import"./plotter-editor-D4st1zI_.js";import"./python-program-editor-CV8cg4CN.js";import"./editor-CRMElU8K.js";import"./sorter-editor-BV7MBMhQ.js";import"./tex-error-view-CG6_cJEi.js";const a={content:`A sequence is defined recursively as follows:


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
