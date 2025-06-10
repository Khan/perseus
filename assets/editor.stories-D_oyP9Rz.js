import{j as r,A as g,r as t,V as v}from"./iframe-B7jCOty_.js";import"./item-version-0aj83p6L.js";import"./article-renderer-rVLmfG8X.js";import"./server-item-renderer-DsVgY6_U.js";import"./hints-renderer-CEDzZJBN.js";import"./index-DrYHUgj-.js";import{S as W}from"./split-view-DShA4TOb.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DdoVG7XQ.js";import{E as f}from"./editor-fPcA8qHi.js";import"./article-editor-CBkNtQDs.js";import"./components-DOungNYC.js";import"./device-framer-C7xkd7yt.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BzrdBIL-.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-B1dr_i0I.js";import"./text-diff-VaWi0Txg.js";import"./editor-page-CeDZmDqv.js";import"./trash-bold-C7MUjCib.js";import"./item-extras-editor-BqjUV8UK.js";import"./content-preview-CCylAC1Y.js";/* empty css                       */import"./categorizer-editor-3oCdiQM-.js";import"./editor-jsonify-CSsC4UIm.js";import"./blur-input-BP6EfLZr.js";import"./definition-editor-BNhlaju1.js";import"./dropdown-editor-N_m8o0LP.js";import"./explanation-editor-D60Z9j7A.js";import"./expression-editor-CNWrQmNH.js";import"./free-response-editor-CB028NuU.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Bem8dhKP.js";import"./image-editor-CK2zoEE5.js";import"./input-number-editor-Dk3igtKF.js";import"./interaction-editor-CNm3MxGN.js";import"./interactive-graph-editor-BD-WOV0A.js";import"./color-select-DiYttdaI.js";import"./Popper-MSVxpL3K.js";import"./util-0icrRHBP.js";import"./heading-a2CEOSMP.js";import"./toggleable-caret-es7niPTO.js";import"./interactive-graph-settings-Cu3fpa2x.js";import"./locked-figures-section-N1T3Jn9-.js";import"./locked-ellipse-settings-ie-t1-cn.js";import"./scrollless-number-text-field-C0mYEJt4.js";import"./locked-label-settings-DGu1IJNB.js";import"./line-stroke-select-CdUcdpE8.js";import"./locked-figure-aria-RRUk1hsX.js";import"./locked-function-settings-DrzW3xS-.js";import"./line-swatch-D5l0a2EV.js";import"./locked-line-settings-BLSi5tPM.js";import"./locked-point-settings-CfOpNlyO.js";import"./labeled-switch-Bjvzwaf3.js";import"./locked-polygon-settings-B2lqxd9U.js";import"./locked-vector-settings-BjI_Ri_b.js";import"./label-image-editor-CSgQRzg8.js";import"./form-wrapped-text-field-ClfClPA0.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CRSOQUIu.js";import"./behavior-80YXDnga.js";import"./question-markers-uEPJu3fb.js";import"./marker-Do-mcXwE.js";import"./select-image-CPt0OiTB.js";import"./matcher-editor-CP0BqHpz.js";import"./number-line-editor-F53wumiE.js";import"./numeric-input-editor-CqLf6NFJ.js";import"./phet-simulation-editor-D_SzOJ17.js";import"./plotter-editor-BBGMKQd6.js";import"./python-program-editor-BVkUAEY-.js";import"./editor-BslrMTu-.js";import"./sorter-editor-ByoUkWt0.js";import"./tex-error-view-DFQkaPar.js";const a={content:`A sequence is defined recursively as follows:


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
