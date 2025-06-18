import{j as r,A as g,r as t,V as v}from"./iframe-CQulAyj4.js";import"./item-version-CiqeGUu5.js";import"./article-renderer-cQoZ0G63.js";import"./server-item-renderer-BZGqR-cd.js";import"./hints-renderer-BRKqsHiV.js";import"./index-D1qkc2KD.js";import{S as W}from"./split-view-Ci62yZ8H.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DGdf4QCo.js";import{E as f}from"./editor-D7ZMFinB.js";import"./article-editor-DLL2d31k.js";import"./components-KUKGpydJ.js";import"./device-framer-BAWMycLV.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Crh22jsm.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DXlA7yGb.js";import"./text-diff-CYD61xYb.js";import"./editor-page-BynJrPhZ.js";import"./toggleable-caret-DCZomvS1.js";import"./perseus-editor-accordion-C7a69MEy.js";import"./item-extras-editor-C82lypoA.js";import"./content-preview-C6HMWV1N.js";/* empty css                       */import"./main-BRWUwPOg.js";import"./categorizer-editor-CByBlz0z.js";import"./editor-jsonify-ptDBQzUI.js";import"./blur-input-BLZhfhRj.js";import"./definition-editor-CVDLXKBs.js";import"./dropdown-editor-DxbyeRrF.js";import"./explanation-editor-DI_Jh3n5.js";import"./expression-editor-DbtwVmwI.js";import"./free-response-editor-E_udmLdS.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-STf1OTzl.js";import"./image-editor-Cb4nrnl4.js";import"./input-number-editor-CF1BOSVw.js";import"./interaction-editor-Ah1lPSLV.js";import"./interactive-graph-editor-BMYk9qBh.js";import"./color-select-Cj4pSvu5.js";import"./Popper-DRqVFVaF.js";import"./util-BBrYuiGM.js";import"./heading-N15IAe5d.js";import"./interactive-graph-settings-Cvx9H5Zi.js";import"./locked-figures-section-C_UPWduT.js";import"./locked-ellipse-settings-Bnd4-631.js";import"./scrollless-number-text-field-BfM6FLRQ.js";import"./locked-label-settings-Be4tns3Y.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-CET08lfX.js";import"./locked-figure-aria-DGvSQblV.js";import"./locked-function-settings-BWsxWFDY.js";import"./line-swatch-C9uXrkjD.js";import"./locked-line-settings-DAUVdqUX.js";import"./locked-point-settings-bAJzXOoR.js";import"./labeled-switch-B0Mv8T0x.js";import"./locked-polygon-settings-DNiC2hpb.js";import"./locked-vector-settings-DsbYZdzz.js";import"./label-image-editor-CnsYRyLD.js";import"./form-wrapped-text-field-Bc6d7-Mf.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CSr7V5Pr.js";import"./behavior-Bhw3N0G_.js";import"./question-markers-BPDe9gtf.js";import"./marker-DZxM9FEi.js";import"./select-image-NbD0yrw5.js";import"./matcher-editor-CFi9No_Y.js";import"./number-line-editor-CV9n7bi2.js";import"./numeric-input-editor-B0uW_PqW.js";import"./phet-simulation-editor-CdXVUCO3.js";import"./plotter-editor-Boc3fyW5.js";import"./python-program-editor-BP8TmPBc.js";import"./editor-CrtKpElZ.js";import"./sorter-editor-43BAbnxa.js";import"./tex-error-view-BQaQw4If.js";const a={content:`A sequence is defined recursively as follows:


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
