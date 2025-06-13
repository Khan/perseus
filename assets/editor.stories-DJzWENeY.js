import{j as r,A as g,r as t,V as v}from"./iframe-ZFgYqQyF.js";import"./item-version-DlZtwoiJ.js";import"./article-renderer-JA5_WgFZ.js";import"./server-item-renderer-jYLlYdnt.js";import"./hints-renderer-CpFykfe9.js";import"./index-Bzz3O8IE.js";import{S as W}from"./split-view-DS5Lefld.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-P20u4sF6.js";import{E as f}from"./editor-BnUMpiq6.js";import"./article-editor-D679q-Ce.js";import"./components-DUZEt7jG.js";import"./device-framer-DB31ZYa5.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DwerMYyl.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-xxwuL6wo.js";import"./text-diff-DeqyYwb1.js";import"./editor-page-CiREezYj.js";import"./trash-bold-Bvu4MXin.js";import"./item-extras-editor-cjUGr3-x.js";import"./content-preview-Bnz7CW8S.js";/* empty css                       */import"./main-DDVX-R62.js";import"./categorizer-editor-Dk4PNjXY.js";import"./editor-jsonify-CH557lJF.js";import"./blur-input-LLwD8UIy.js";import"./definition-editor-D51kYvi4.js";import"./dropdown-editor-Bf7EWVy6.js";import"./explanation-editor-IBDoxMkE.js";import"./expression-editor-n-2tsmi-.js";import"./free-response-editor-ez_pjzQI.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DjddpNAm.js";import"./image-editor-BN8h9eni.js";import"./input-number-editor-DVBAykQ5.js";import"./interaction-editor-BuC-L3Dz.js";import"./interactive-graph-editor-CrytIQbG.js";import"./color-select-Clrxd-hW.js";import"./Popper-CQ-YRHq8.js";import"./util-hPLuWl9N.js";import"./heading-MJqREhF6.js";import"./toggleable-caret-DP52IPrH.js";import"./interactive-graph-settings-HmxYUVZd.js";import"./locked-figures-section-DXVnHIGA.js";import"./locked-ellipse-settings-D3cZ4alQ.js";import"./scrollless-number-text-field-DO39ZtnD.js";import"./locked-label-settings-bv-VCU_i.js";import"./line-stroke-select-BmoMxyaO.js";import"./locked-figure-aria-CUcjdw6F.js";import"./locked-function-settings-BF5qB3At.js";import"./line-swatch-vQoM0xDs.js";import"./locked-line-settings-D1qj47N6.js";import"./locked-point-settings-6cQBouRK.js";import"./labeled-switch-CnBOUinv.js";import"./locked-polygon-settings-B80vEw15.js";import"./locked-vector-settings-C-9cFlAY.js";import"./label-image-editor-DDEfaI3K.js";import"./form-wrapped-text-field-Cua-DY6B.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CNVwrUY3.js";import"./behavior-C2bjMRyk.js";import"./question-markers-BsyaAkIt.js";import"./marker-BBOp5gvw.js";import"./select-image-DRkxm8Ze.js";import"./matcher-editor-Dz21dr3r.js";import"./number-line-editor-DJS7Krt8.js";import"./numeric-input-editor-CEO6v5tI.js";import"./phet-simulation-editor-qsGlPZ_s.js";import"./plotter-editor-BgciFefB.js";import"./python-program-editor-B2fwqW4B.js";import"./editor-BTid-m0s.js";import"./sorter-editor-B1Egh1aq.js";import"./tex-error-view-86IgoXQR.js";const a={content:`A sequence is defined recursively as follows:


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
