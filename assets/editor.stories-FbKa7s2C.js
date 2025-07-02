import{j as r,A as g,r as t,V as v}from"./iframe-Bhupwh5w.js";import"./item-version-BvnWmnrc.js";import"./article-renderer-BOD8X9FD.js";import"./server-item-renderer-B4bVe63V.js";import"./hints-renderer-BRXn_qM1.js";import"./index-Cu_Awx2Q.js";import{S as W}from"./split-view-BmGxlntO.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-dw5zWjY5.js";import{E as f}from"./editor-BkiO6-Ks.js";import"./article-editor-QAsbHG0n.js";import"./components-CTVSIdpE.js";import"./device-framer-DIYyVAPR.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BPXwmXx7.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DVO0Wpus.js";import"./text-diff-DJBWGoBa.js";import"./editor-page-XUKMXLhI.js";import"./toggleable-caret-DkN-dMzj.js";import"./trash-bold-BCH5dp9w.js";import"./item-extras-editor-Btj0TU3U.js";import"./content-preview-CIuhzPKk.js";/* empty css                       */import"./main-iUSelAu0.js";import"./categorizer-editor-CIF7wUUu.js";import"./editor-jsonify-DmhinUEb.js";import"./blur-input-CLBFf32p.js";import"./definition-editor-ohiV6c90.js";import"./dropdown-editor-DZljE50C.js";import"./explanation-editor-hw1eOvWI.js";import"./expression-editor-DW1HS1cr.js";import"./free-response-editor-BU9x9Na-.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BnG3kMpJ.js";import"./image-editor-B2KGl9nx.js";import"./input-number-editor-ZOQeh4hs.js";import"./interaction-editor-Cjura4GX.js";import"./interactive-graph-editor-ByiaJYRN.js";import"./color-select-BY5hSW6z.js";import"./Popper-jfYSIreo.js";import"./util-CrHNlbRq.js";import"./heading-QAIlcDVb.js";import"./interactive-graph-settings-Dv3r3bJS.js";import"./locked-figures-section-B_3jSUO6.js";import"./locked-ellipse-settings-CV8s95WG.js";import"./scrollless-number-text-field-CzO1RTfR.js";import"./locked-label-settings-upXbDCQt.js";import"./line-stroke-select-BLhijXgP.js";import"./locked-figure-aria-DBme-zk4.js";import"./locked-function-settings-CtjvI7RX.js";import"./line-swatch-C7zGSE1Q.js";import"./locked-line-settings-Cto846ZH.js";import"./locked-point-settings-Cby0M-k0.js";import"./labeled-switch-MOY2Lort.js";import"./locked-polygon-settings-BVWDdurX.js";import"./locked-vector-settings-DtMk7jkO.js";import"./label-image-editor-DJ4lQ2qT.js";import"./form-wrapped-text-field-D0N6z0p3.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DuMkH-2j.js";import"./behavior-DsKtaHDt.js";import"./question-markers-Cuq7cyx_.js";import"./marker-CjUGB6LX.js";import"./select-image-DdgKmTzP.js";import"./matcher-editor-BE3incP-.js";import"./number-line-editor-GTHge-Mx.js";import"./numeric-input-editor-BJfRUNaC.js";import"./phet-simulation-editor-seumQ8HF.js";import"./plotter-editor-CiI-215O.js";import"./python-program-editor-B5xrl39h.js";import"./editor-DE8BT2nB.js";import"./sorter-editor-Bkx9mzWW.js";import"./tex-error-view-CbQxz6qN.js";const a={content:`A sequence is defined recursively as follows:


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
