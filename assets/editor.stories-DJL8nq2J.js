import{j as r,A as g,r as t,V as v}from"./iframe-CTGSzrNH.js";import"./item-version-BsSM4L11.js";import"./article-renderer-BA1u0GL-.js";import"./server-item-renderer-5SrB5Xy-.js";import"./hints-renderer-DPlBwx24.js";import"./index-C4F-ixAI.js";import{S as W}from"./split-view-Cx_VHRoh.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Dhq6fcN9.js";import{E as f}from"./editor-CVsnQm89.js";import"./article-editor-DioAMRxg.js";import"./components-bjs_Jbog.js";import"./device-framer-CgFOOUA1.js";import"./constants-kyOY0S4e.js";import"./section-control-button-XUkSE_ln.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CzGsmVAj.js";import"./text-diff-DHFC2nD_.js";import"./editor-page-DGnZzhra.js";import"./item-extras-editor-DqBXm7hQ.js";import"./content-preview-DdPee8O2.js";/* empty css                       */import"./categorizer-editor-Bad_IxYo.js";import"./editor-jsonify-CrErXNos.js";import"./blur-input-CYelS3-I.js";import"./definition-editor-C23y-3PX.js";import"./dropdown-editor-BB-pIiTw.js";import"./explanation-editor-DX34n3kB.js";import"./expression-editor-dOwOZwuO.js";import"./free-response-editor-CIo56Cbl.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-B-nuDSS6.js";import"./image-editor-DwpGVeR6.js";import"./input-number-editor-BugrwzgO.js";import"./interaction-editor-tmtzqBya.js";import"./interactive-graph-editor-u3Sv-LOu.js";import"./color-select-B_Vw5xlX.js";import"./Popper-RYu6c3xB.js";import"./util-C9DwK49w.js";import"./heading-ByNJiuzm.js";import"./toggleable-caret-DCPtMmYb.js";import"./interactive-graph-settings-CNbjT_gk.js";import"./locked-figures-section-G4XU04cQ.js";import"./locked-ellipse-settings-CMXZKibI.js";import"./scrollless-number-text-field-CYjEuSuP.js";import"./locked-label-settings-CaelBZJW.js";import"./trash-bold-c-akrhsS.js";import"./line-stroke-select-CLCHQF7o.js";import"./locked-figure-aria-DA36Dn4i.js";import"./locked-function-settings-BGab0sj2.js";import"./line-swatch-CCPDgrwm.js";import"./locked-line-settings-GHlqIisr.js";import"./locked-point-settings-BIZ3V85Y.js";import"./labeled-switch-D9e-Q2_x.js";import"./locked-polygon-settings-f5B-T-XR.js";import"./locked-vector-settings-DPhb7HC2.js";import"./label-image-editor-DaJh50MR.js";import"./form-wrapped-text-field-exO8OkAT.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CrWDFNNI.js";import"./behavior-DKTRsEdm.js";import"./question-markers--QThyrqy.js";import"./marker-De8s1tAm.js";import"./select-image-BBJOLhct.js";import"./matcher-editor-ohGrFqaF.js";import"./number-line-editor-BMOm2rNE.js";import"./numeric-input-editor-BOz58Fn8.js";import"./phet-simulation-editor-C93rsuD5.js";import"./plotter-editor-DKbpsXnt.js";import"./python-program-editor-Ba2bB6OJ.js";import"./editor-DWksMzKE.js";import"./sorter-editor-B6qjqIuW.js";import"./tex-error-view-BVbEq0lP.js";const a={content:`A sequence is defined recursively as follows:


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
