import{j as r,A as g,r as t,V as v}from"./iframe-rTh-qpeb.js";import"./item-version-BoPwVzYW.js";import"./article-renderer-BMePpXSB.js";import"./server-item-renderer-CMOhgjPp.js";import"./hints-renderer-Ced41RaC.js";import"./index-BUMRdVbf.js";import{S as W}from"./split-view-BCM47jDL.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Bo5kWJTS.js";import{E as f}from"./editor-BbAYZ4ht.js";import"./article-editor-DPxgNxKx.js";import"./components-xEihcWtl.js";import"./device-framer-65DljmDZ.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CGw_CK0M.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BpWD8bv-.js";import"./text-diff-1Xpw0lZe.js";import"./editor-page-BZIdnNin.js";import"./toggleable-caret-BNjvLEqZ.js";import"./trash-bold-CFPyNgOF.js";import"./item-extras-editor-2C5nbEIB.js";import"./content-preview-DaJokHJ_.js";/* empty css                       */import"./main-DIwaG8I8.js";import"./categorizer-editor-DYjC6VKK.js";import"./editor-jsonify-Bqt1TztE.js";import"./blur-input-C2oohI7Q.js";import"./definition-editor-CyalNb27.js";import"./dropdown-editor-CMsygQit.js";import"./explanation-editor-BkbTxIb3.js";import"./expression-editor-DVHtFMl9.js";import"./free-response-editor-BLd1WqyE.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CK1rKxHI.js";import"./image-editor-CUWSm9_T.js";import"./input-number-editor-BkLRN2Hr.js";import"./interaction-editor-1jlAkhtu.js";import"./interactive-graph-editor-C43BHoku.js";import"./color-select-ZLI54ust.js";import"./Popper-BPNXaN-S.js";import"./util-DjjtM5U6.js";import"./heading-riR7FstB.js";import"./interactive-graph-settings-B0av7Bt0.js";import"./locked-figures-section-DdhQ0kzB.js";import"./locked-ellipse-settings-ZMKmd0G1.js";import"./scrollless-number-text-field-CW8TMcoB.js";import"./locked-label-settings-Cv_EQp5n.js";import"./line-stroke-select-BAw8Ybd0.js";import"./locked-figure-aria-BxXAeiIZ.js";import"./locked-function-settings-_s4kHVZr.js";import"./line-swatch-HtsxTl2t.js";import"./locked-line-settings-CVip7JuM.js";import"./locked-point-settings-w9rhbGF3.js";import"./labeled-switch-B1FkQnSY.js";import"./locked-polygon-settings-CK8slwhq.js";import"./locked-vector-settings-B3ckyeix.js";import"./label-image-editor--Nz_7Mje.js";import"./form-wrapped-text-field-DPYYhfvJ.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DHwPFyvr.js";import"./behavior-BLmwvVIl.js";import"./question-markers-BGP9iXV9.js";import"./marker-C1VbuH89.js";import"./select-image-mcnglDHF.js";import"./matcher-editor-DhKeqs_D.js";import"./number-line-editor-ry5pXomY.js";import"./numeric-input-editor-CMec8Ef6.js";import"./phet-simulation-editor-BsTOFCz0.js";import"./plotter-editor-CdTvuwzN.js";import"./python-program-editor-TiZZHps1.js";import"./editor-BpStJxy2.js";import"./sorter-editor-BbYNjz5v.js";import"./tex-error-view-Dh6SdBPg.js";const a={content:`A sequence is defined recursively as follows:


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
