import{j as r,A as g,r as t,V as v}from"./iframe-B9Y7vzCP.js";import"./item-version-DjfTV3sU.js";import"./article-renderer-Qt00rsy4.js";import"./server-item-renderer-qvZIhmuu.js";import"./hints-renderer-DMpno9jz.js";import"./index-CYqXA2wi.js";import{S as W}from"./split-view-E5QCRLdp.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-D6RhJqqC.js";import{E as f}from"./editor-C1iXmNPW.js";import"./article-editor-DkPYNAhf.js";import"./components-DPPD5gWW.js";import"./device-framer-mjXEwg-q.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CNuQg-3l.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CoHKwV2k.js";import"./text-diff-hYZbKavH.js";import"./editor-page-CycYBLJz.js";import"./trash-bold-D-mo8Y8i.js";import"./item-extras-editor-CXQEqaqQ.js";import"./content-preview-_4HGb5kr.js";/* empty css                       */import"./categorizer-editor-BDK9kMJ4.js";import"./editor-jsonify-heu2TgjN.js";import"./blur-input-FRq-hvRz.js";import"./definition-editor-BTguPXHc.js";import"./dropdown-editor-CIxs2zRQ.js";import"./explanation-editor-DiKahrBh.js";import"./expression-editor-BgbXJdfU.js";import"./free-response-editor-DapsndTQ.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Dp_HewrK.js";import"./image-editor-lo1cYeHN.js";import"./input-number-editor-BZ7-ksGG.js";import"./interaction-editor-BSTBe827.js";import"./interactive-graph-editor-C5ppdBbo.js";import"./color-select-fRo4Scor.js";import"./Popper-CPg4ycx6.js";import"./util-B5dMkSHv.js";import"./heading-CTbg6Otk.js";import"./toggleable-caret-CICFKSdT.js";import"./interactive-graph-settings-BptcImPl.js";import"./locked-figures-section-Dv-8u3O0.js";import"./locked-ellipse-settings-DKmfb8gK.js";import"./scrollless-number-text-field-mQ-e5vcd.js";import"./locked-label-settings-BTe4ZWYt.js";import"./line-stroke-select-BW8aVZ0a.js";import"./locked-figure-aria-CVbdorZ1.js";import"./locked-function-settings-Bi34T8mt.js";import"./line-swatch-DqttLEPb.js";import"./locked-line-settings-Dc7RUPdQ.js";import"./locked-point-settings-BWFE5M0x.js";import"./labeled-switch-D6W1hgog.js";import"./locked-polygon-settings-CSBJts-F.js";import"./locked-vector-settings-DG7wF9A1.js";import"./label-image-editor-tAYRVZPV.js";import"./form-wrapped-text-field-IXiZgiB_.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DL7k2GYS.js";import"./behavior-D7MNN3-r.js";import"./question-markers-DAvrcsRO.js";import"./marker-BtemB_RP.js";import"./select-image-1oFueZZM.js";import"./matcher-editor-DfHM4jNs.js";import"./number-line-editor-DI-5zqmT.js";import"./numeric-input-editor-BvRp5niw.js";import"./phet-simulation-editor-GoqX2QiO.js";import"./plotter-editor-DN3SdwsP.js";import"./python-program-editor-BWw-mcc8.js";import"./editor-DErh2V1L.js";import"./sorter-editor-C2DnkxmN.js";import"./tex-error-view-Dt_xnm2K.js";const a={content:`A sequence is defined recursively as follows:


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
