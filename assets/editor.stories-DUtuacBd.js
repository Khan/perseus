import{j as r,A as g,r as t,V as v}from"./iframe-2g4VQTYH.js";import"./item-version-BJeOYaNJ.js";import"./article-renderer-DrqxFyKt.js";import"./server-item-renderer-CeFddfkI.js";import"./hints-renderer-B15MfxEL.js";import"./index-Di9JXfnG.js";import{S as W}from"./split-view-C7VySM-K.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DplRKOF0.js";import{E as f}from"./editor-B49PPKIJ.js";import"./article-editor-GrBm2H19.js";import"./components-Dw4odbRc.js";import"./device-framer-_1AKVvrN.js";import"./constants-kyOY0S4e.js";import"./section-control-button-5m-UNcBR.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-iCpKOoX4.js";import"./text-diff-DcA6erXC.js";import"./editor-page-xA-6gfBW.js";import"./toggleable-caret-Ci5tFpiQ.js";import"./trash-bold-BPEssxMr.js";import"./item-extras-editor-CdB32So_.js";import"./content-preview-BPLF_5Vx.js";/* empty css                       */import"./main-XnTWIwtN.js";import"./categorizer-editor-DYeShnZs.js";import"./editor-jsonify-DeSUH5k-.js";import"./blur-input-DmBDRrf_.js";import"./definition-editor-C37dWxxv.js";import"./dropdown-editor-_9X7tbDu.js";import"./explanation-editor-CRomJyX3.js";import"./expression-editor-Cxjszcm4.js";import"./free-response-editor-BCqIS_cE.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-B2tZn9iY.js";import"./image-editor-D2NVh0MR.js";import"./input-number-editor-9BC9Qe9_.js";import"./interaction-editor-DNrgD6HH.js";import"./interactive-graph-editor-B6RuBaDB.js";import"./color-select-BAY9bjzo.js";import"./Popper-Dw-YncXa.js";import"./util-B2DTO1is.js";import"./heading-CNSMZpjp.js";import"./interactive-graph-settings-BQrM8jIR.js";import"./locked-figures-section-DdR9V0Cb.js";import"./locked-ellipse-settings-Cs-1dwRj.js";import"./scrollless-number-text-field-CBCI2Rrr.js";import"./locked-label-settings-BXQTDNpJ.js";import"./line-stroke-select-CiaDu7Ic.js";import"./locked-figure-aria-CYDIGRDZ.js";import"./locked-function-settings-Mk1C3Kkc.js";import"./line-swatch-BWcUvxRe.js";import"./locked-line-settings-BOj7JG8N.js";import"./locked-point-settings-DIkXAgK2.js";import"./labeled-switch-B3xTOLnw.js";import"./locked-polygon-settings-BzUmK2-Z.js";import"./locked-vector-settings-DImK8g_H.js";import"./label-image-editor-CZFXi_yo.js";import"./form-wrapped-text-field-OyPzmaOV.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-C0jiRy_N.js";import"./behavior-BmUknLmQ.js";import"./question-markers-BiVTvmq2.js";import"./marker-DJ0M2xlR.js";import"./select-image-cyOrubH2.js";import"./matcher-editor-vYrJeYtn.js";import"./number-line-editor-bCwu1_VI.js";import"./numeric-input-editor-eQcN0eHQ.js";import"./phet-simulation-editor-BgD83WUq.js";import"./plotter-editor-DJlb7Yfz.js";import"./python-program-editor-C8LSJ1r4.js";import"./editor-BIh_4m2f.js";import"./sorter-editor-C6gWPp3v.js";import"./tex-error-view-BF8zegZT.js";const a={content:`A sequence is defined recursively as follows:


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
