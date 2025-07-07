import{j as r,A as g,r as t,V as v}from"./iframe-FixlUAlH.js";import"./item-version-ZIBcJGu4.js";import"./article-renderer-CUboaJ7C.js";import"./server-item-renderer-Q94llRYT.js";import"./hints-renderer-DwEQF4ur.js";import"./index-BdbdOhlG.js";import{S as W}from"./split-view-CpJnyWOG.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-C6lYd7hx.js";import{E as f}from"./editor-BmhKPkfE.js";import"./article-editor-MoX13GdD.js";import"./components-ON4HqAvU.js";import"./device-framer-CaeBzHwb.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BpjtE1NH.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CiapJrkH.js";import"./text-diff-nMhp62UD.js";import"./editor-page-B1zDLQIn.js";import"./toggleable-caret-Dd2P7Mt9.js";import"./trash-bold-BIp54dEC.js";import"./item-extras-editor-B2-qMdzn.js";import"./content-preview-DHMD8oZ-.js";/* empty css                       */import"./main-Bd_jAsGV.js";import"./categorizer-editor-D-ao7vp3.js";import"./editor-jsonify-BgNwOTsb.js";import"./blur-input-DYERrsyl.js";import"./definition-editor-CrxiQ40M.js";import"./dropdown-editor-BFJPGgC5.js";import"./explanation-editor-BsiigSa2.js";import"./expression-editor-B9lJ4vT4.js";import"./free-response-editor-Cqx4qgcS.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DZpNxPI_.js";import"./image-editor-BzuoA0Lq.js";import"./input-number-editor-Da79PkJG.js";import"./interaction-editor-CcWBcmrj.js";import"./interactive-graph-editor-DFup92aN.js";import"./color-select-BoHWxGqp.js";import"./Popper-CFF_Yah7.js";import"./util-DUtup_cr.js";import"./heading-golU4dre.js";import"./interactive-graph-settings-CawTaQnO.js";import"./locked-figures-section-29CSykRI.js";import"./locked-ellipse-settings-BRI3ss1x.js";import"./scrollless-number-text-field-BmNpxMBf.js";import"./locked-label-settings-BKK7QXSi.js";import"./line-stroke-select-D4WZ6L1D.js";import"./locked-figure-aria-DZR5qwvP.js";import"./locked-function-settings-nbTCBdYO.js";import"./line-swatch-BuBAC-Pw.js";import"./locked-line-settings-B-612OHi.js";import"./locked-point-settings-CSeTgF0s.js";import"./labeled-switch-CETROBiF.js";import"./locked-polygon-settings-CkP61Szu.js";import"./locked-vector-settings-YtrqsOpi.js";import"./label-image-editor-Ce_h_HWb.js";import"./form-wrapped-text-field-BO2Gh4kn.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CcGdTd4t.js";import"./behavior-DXvtkd8l.js";import"./question-markers-DLrUXAhm.js";import"./marker-CZstRIkf.js";import"./select-image-DWhrrEm0.js";import"./matcher-editor-DP9AMmu3.js";import"./number-line-editor-D4tlaSX_.js";import"./numeric-input-editor-BB6lbJPJ.js";import"./phet-simulation-editor-UwtULS3k.js";import"./plotter-editor-mZ9tlhlf.js";import"./python-program-editor-BYOYV_eR.js";import"./editor-C_HHptZZ.js";import"./sorter-editor-YVMSLEN0.js";import"./tex-error-view-CO69lGPh.js";const a={content:`A sequence is defined recursively as follows:


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
