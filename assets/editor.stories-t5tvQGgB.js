import{j as r,A as g,r as t,V as v}from"./iframe-fUEXi0re.js";import"./item-version-DOxEkpQr.js";import"./article-renderer-6DecqqJL.js";import"./server-item-renderer-C9k6fabb.js";import"./hints-renderer-DbnyAC28.js";import"./index-CxkQWctj.js";import{S as W}from"./split-view-D0L_Alxq.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BEpW_29O.js";import{E as f}from"./editor-WPmjxZYv.js";import"./article-editor-D8QVeDuc.js";import"./components-DKKKr1Z9.js";import"./device-framer-Dt9yzNSB.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CnXS4rnY.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CBjaD9D7.js";import"./text-diff-yXQrQIVz.js";import"./editor-page-CrEegQt3.js";import"./toggleable-caret-DBQDNPyQ.js";import"./trash-bold-D6_Q64QE.js";import"./item-extras-editor-DG5FISV2.js";import"./content-preview-Cp1WopBC.js";/* empty css                       */import"./main-DhxLq5Kn.js";import"./categorizer-editor-WhJog9MK.js";import"./editor-jsonify-DcTIkSTq.js";import"./blur-input-DAuIq3eJ.js";import"./definition-editor-C3zKlmfE.js";import"./dropdown-editor-B4tK6TOK.js";import"./explanation-editor-CfjUxLrW.js";import"./expression-editor-BVfvqa0x.js";import"./free-response-editor-CvbVGeQX.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BxVOGfv5.js";import"./image-editor-CH7kd6Yt.js";import"./input-number-editor-DlYku8-3.js";import"./interaction-editor-GMs2EKfU.js";import"./interactive-graph-editor-Dlf2F3dE.js";import"./color-select-B7QP3UMD.js";import"./Popper-CM_zqNf8.js";import"./util-CGoQxivr.js";import"./heading-D79Qv17Y.js";import"./interactive-graph-settings-DMSXrtK7.js";import"./locked-figures-section-CqmIMDAu.js";import"./locked-ellipse-settings-6xPNzxye.js";import"./scrollless-number-text-field-QDcrfemU.js";import"./locked-label-settings-Coy7R8en.js";import"./line-stroke-select-MHC5-s2h.js";import"./line-weight-select-DFFYofUA.js";import"./locked-figure-aria-x0z2SrV0.js";import"./locked-function-settings-B-bnh3EX.js";import"./line-swatch-Dpxx5fpI.js";import"./locked-line-settings-C6cNCW5C.js";import"./locked-point-settings-BXZepLNQ.js";import"./labeled-switch-DYdBkrQe.js";import"./locked-polygon-settings-DIQacP7t.js";import"./locked-vector-settings-DfnTFAc2.js";import"./label-image-editor-4QdTk-6l.js";import"./form-wrapped-text-field-CPekV-ZP.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CvhnhwOR.js";import"./behavior-BvYAYhZC.js";import"./question-markers-DXGm_wih.js";import"./marker-CFRdLRYD.js";import"./select-image-uqvC9pxN.js";import"./matcher-editor-fyTXcIOE.js";import"./number-line-editor-BmolwJ-h.js";import"./numeric-input-editor-CXtacH84.js";import"./phet-simulation-editor-Dg8MSE2d.js";import"./plotter-editor-0HHKLdVp.js";import"./python-program-editor-Dj_LN3Gv.js";import"./editor-nelL3xnp.js";import"./sorter-editor-Djc18PO6.js";import"./tex-error-view-BYtiuT2y.js";const a={content:`A sequence is defined recursively as follows:


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
