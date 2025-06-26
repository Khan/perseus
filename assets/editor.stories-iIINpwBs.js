import{j as r,A as g,r as t,V as v}from"./iframe-Oo-GQJqP.js";import"./item-version-BT0M_TQO.js";import"./article-renderer-CbFZ1AVI.js";import"./server-item-renderer-JT-oBpKQ.js";import"./hints-renderer-DVunkuAj.js";import"./index-lB4hdB9d.js";import{S as W}from"./split-view-DCsWBZH8.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-l1B3hJ_I.js";import{E as f}from"./editor-L6XSI-go.js";import"./article-editor-DdpdGzWY.js";import"./components-R-BMGwjI.js";import"./device-framer-DqcJydUu.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CpaSz-4d.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-pa5BZFHK.js";import"./text-diff-CZgINVqL.js";import"./editor-page-vDssfQQM.js";import"./toggleable-caret-Cdx6rZJ2.js";import"./trash-bold-D7huKe_N.js";import"./item-extras-editor-CLm5C05p.js";import"./content-preview-DGze4TjO.js";/* empty css                       */import"./main-CpB1_QFM.js";import"./categorizer-editor-BU3fkbSb.js";import"./editor-jsonify-BtSJGItS.js";import"./blur-input-Da8jVaeC.js";import"./definition-editor-5Zkduf5g.js";import"./dropdown-editor-BIDp3O8r.js";import"./explanation-editor-B6Vz4WIY.js";import"./expression-editor-DU-nywIb.js";import"./free-response-editor-Cf7ZrTug.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-C5H5IJAD.js";import"./image-editor-CqO6QU78.js";import"./input-number-editor-SEpc7y5d.js";import"./interaction-editor-DppRvPZs.js";import"./interactive-graph-editor-B-2Fxb_C.js";import"./color-select-Bo66qpBQ.js";import"./Popper-CO3y_-vH.js";import"./util-DNCTHf5V.js";import"./heading-CyX26RGU.js";import"./interactive-graph-settings-DvBleVld.js";import"./locked-figures-section-smlgpT_W.js";import"./locked-ellipse-settings-CrFpHhih.js";import"./scrollless-number-text-field-nVVbuiMx.js";import"./locked-label-settings-Dx2grI4a.js";import"./line-stroke-select-2BfDZABu.js";import"./locked-figure-aria-TgWQ4miM.js";import"./locked-function-settings-CPehXeQ6.js";import"./line-swatch-BKCG3M_O.js";import"./locked-line-settings-BivuhmX_.js";import"./locked-point-settings-DxZyomC_.js";import"./labeled-switch-OtnITxvl.js";import"./locked-polygon-settings-TXNezX_1.js";import"./locked-vector-settings-BQc4BxPc.js";import"./label-image-editor-H_-916Dd.js";import"./form-wrapped-text-field-BJRE9_xF.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CnTeA8Co.js";import"./behavior-CqlHToU2.js";import"./question-markers-BpZ38uYZ.js";import"./marker-B2EreDz2.js";import"./select-image-DFuf2z78.js";import"./matcher-editor-C2qBMLn8.js";import"./number-line-editor-D7Yqd5Pz.js";import"./numeric-input-editor-BReDMbtz.js";import"./phet-simulation-editor-DQBzSsHy.js";import"./plotter-editor-9zCzH4CN.js";import"./python-program-editor-ZCGFG9sx.js";import"./editor-BkkfX5yL.js";import"./sorter-editor-CDgr-8n7.js";import"./tex-error-view-CtQOIxjq.js";const a={content:`A sequence is defined recursively as follows:


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
