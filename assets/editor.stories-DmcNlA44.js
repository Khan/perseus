import{j as r,A as g,r as t,V as v}from"./iframe-CdKw17cY.js";import"./item-version-M67OA0Xz.js";import"./article-renderer-CR-MsTDv.js";import"./server-item-renderer-DDcQhKB2.js";import"./hints-renderer-AS4jLqdB.js";import"./index-uZqMbc_N.js";import{S as W}from"./split-view-CCl84zTM.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-eIQ6DMz2.js";import{E as f}from"./editor-ViTUHXyc.js";import"./article-editor-DX8Pk7lJ.js";import"./components-B_aY1Nxk.js";import"./device-framer-GdrE3JZm.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Bq-hVZSe.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-EQYXRNsU.js";import"./text-diff-B7c99kjg.js";import"./editor-page-BpggF5Nd.js";import"./trash-bold-Cu5qKUK7.js";import"./item-extras-editor-BLqiTJYv.js";import"./content-preview-CQYhctOk.js";/* empty css                       */import"./categorizer-editor-9_ylcWgu.js";import"./editor-jsonify-C0ah60Sh.js";import"./blur-input-CPAtg01L.js";import"./definition-editor-BBvpJphj.js";import"./dropdown-editor-BsZK7xtP.js";import"./explanation-editor-Bt6N7dLO.js";import"./expression-editor-BiNIeC4u.js";import"./free-response-editor-CwKsrFF6.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Dt0phxF3.js";import"./image-editor-ofDdeQWN.js";import"./input-number-editor-CpoRhESL.js";import"./interaction-editor-BUyOQ9Pk.js";import"./interactive-graph-editor-C3rBq3Q5.js";import"./color-select-B6jgMiF9.js";import"./Popper-COwVOKD4.js";import"./util-0cUl0iG6.js";import"./heading-jLdVa31z.js";import"./toggleable-caret-DMRl3lzz.js";import"./interactive-graph-settings-DN4Xzcqp.js";import"./locked-figures-section-ByLRV-5i.js";import"./locked-ellipse-settings-CB0_0MVs.js";import"./scrollless-number-text-field-DRln1rGy.js";import"./locked-label-settings-C_7KH_kA.js";import"./line-stroke-select-BuvoEUAG.js";import"./locked-figure-aria-DPcPcm5I.js";import"./locked-function-settings-gw0b0hu4.js";import"./line-swatch-D9cX1W51.js";import"./locked-line-settings-DJzfZbhz.js";import"./locked-point-settings-C6AzVMBC.js";import"./labeled-switch-gTe-eJA1.js";import"./locked-polygon-settings-Bt6UAIF2.js";import"./locked-vector-settings-BBq57NxO.js";import"./label-image-editor-BMEFcqlA.js";import"./form-wrapped-text-field-6_Az_uhK.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-SgUeftlL.js";import"./behavior-CJ_WssR5.js";import"./question-markers-CZ1a2jof.js";import"./marker-HfSttW6L.js";import"./select-image-DZufjHDI.js";import"./matcher-editor-BVx9P8hc.js";import"./number-line-editor-CV54OpTT.js";import"./numeric-input-editor-3Fj8Xxg6.js";import"./phet-simulation-editor-7oVKRxam.js";import"./plotter-editor-Dw7Mve5c.js";import"./python-program-editor-CYKpwthj.js";import"./editor-BsLb98yC.js";import"./sorter-editor-BhYyXOyC.js";import"./tex-error-view-BiW5aYUL.js";const a={content:`A sequence is defined recursively as follows:


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
