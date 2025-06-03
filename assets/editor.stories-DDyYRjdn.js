import{j as r,A as g,r as t,V as v}from"./iframe-CiZ4rom4.js";import"./item-version-DIvEicZT.js";import"./article-renderer-DEKiL95x.js";import"./server-item-renderer-BPtEzFPN.js";import"./hints-renderer-DUBe4pQj.js";import"./index-CpCq0sn9.js";import{S as W}from"./split-view-CgYgUifl.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BPXEkmbm.js";import{E as f}from"./editor-IhBasgCP.js";import"./article-editor-ke5DoCxo.js";import"./components-zJqkJmyj.js";import"./device-framer-KY4WP1IA.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DxDtTu-a.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BbCz18w_.js";import"./text-diff-Do3E2aVM.js";import"./editor-page-DKXnnEjo.js";import"./item-extras-editor-H55H4See.js";import"./content-preview-DDM6UGkU.js";/* empty css                       */import"./categorizer-editor-jiKYE0h6.js";import"./editor-jsonify-DoWkSy1n.js";import"./blur-input-CPQS9bvz.js";import"./definition-editor-Cpkxel7E.js";import"./dropdown-editor-f1L6smwI.js";import"./explanation-editor-BbrJ1fjb.js";import"./expression-editor-DdO6tINS.js";import"./free-response-editor-TOR4bvOV.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BNyU0FrT.js";import"./image-editor-Tx5Mndzu.js";import"./input-number-editor-ycId5iCr.js";import"./interaction-editor-COe3Gk-L.js";import"./interactive-graph-editor-CkdCZDV-.js";import"./heading-wxXfEAgh.js";import"./toggleable-caret-DeF0TsVu.js";import"./interactive-graph-settings-B826YiGQ.js";import"./locked-figures-section-B0Dmj8Aq.js";import"./locked-ellipse-settings-DpmTb_t-.js";import"./scrollless-number-text-field-D9uDYSfu.js";import"./locked-label-settings-C_Cnfp2w.js";import"./trash-bold-CBNk1Rb_.js";import"./color-select-DEYIoEID.js";import"./util-H5sE61uR.js";import"./line-stroke-select-BqvcYVMh.js";import"./locked-figure-aria-DsPtqjuL.js";import"./locked-function-settings-Cfpc8u2u.js";import"./line-swatch-ICDQTLM-.js";import"./locked-line-settings-DoUmbb6i.js";import"./locked-point-settings-B0MdsZoC.js";import"./labeled-switch-BwqH28ms.js";import"./locked-polygon-settings-B17AF9_7.js";import"./locked-vector-settings-B-epqlxQ.js";import"./label-image-editor-BwNQgDe3.js";import"./form-wrapped-text-field-nHW-WChU.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CYRvnNER.js";import"./behavior-DR9LUVyH.js";import"./question-markers-6HK3s39y.js";import"./marker-BtD8VchM.js";import"./select-image-DpnyKoOS.js";import"./matcher-editor-Dwp41Ypf.js";import"./number-line-editor-CHBjJ4mV.js";import"./numeric-input-editor-CV-rmGh1.js";import"./phet-simulation-editor-B_NYCJpS.js";import"./plotter-editor-b2BrRMEQ.js";import"./python-program-editor-D1CjGvVx.js";import"./editor-sUn49f_O.js";import"./sorter-editor-CWeSeWxb.js";import"./tex-error-view-BvrrFsxI.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const Je={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Be=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Be as __namedExportsOrder,Je as default};
