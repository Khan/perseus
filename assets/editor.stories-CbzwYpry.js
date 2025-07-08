import{j as r,A as g,r as t,V as v}from"./iframe-BGwaWJut.js";import"./item-version-CPsKRKIp.js";import"./article-renderer-DYIe-t54.js";import"./server-item-renderer-C9rE-tAG.js";import"./hints-renderer-DFM3F4Tx.js";import"./index-DaPCS1dw.js";import{S as W}from"./split-view-BGoy-VKx.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BEycBdVt.js";import{E as f}from"./editor-jznOpeWO.js";import"./article-editor-DdIeiku-.js";import"./components-Bji0qxmY.js";import"./device-framer-BgvVoCEY.js";import"./constants-kyOY0S4e.js";import"./section-control-button-F7G2AWM_.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CytVcKBb.js";import"./text-diff-oyJJRhna.js";import"./editor-page-xeghMpoH.js";import"./toggleable-caret-BEvCiUC8.js";import"./trash-bold-GTBLaCgY.js";import"./item-extras-editor-Q-BPTdW-.js";import"./content-preview-C_4uFJty.js";/* empty css                       */import"./main-CQNAlEWr.js";import"./categorizer-editor-D_6ubi82.js";import"./editor-jsonify-C5OgcCVS.js";import"./blur-input-BcFQZvU5.js";import"./definition-editor-CMvoQph_.js";import"./dropdown-editor-COeaDjBP.js";import"./explanation-editor-CjawESLL.js";import"./expression-editor-B_9vpjxy.js";import"./free-response-editor-DC3vJ4ES.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DTcsjlv6.js";import"./image-editor-DAK0Cevf.js";import"./input-number-editor-DOPNswtD.js";import"./interaction-editor-DAlwRPiV.js";import"./interactive-graph-editor-C0gsWkwa.js";import"./color-select-BaW2XMCt.js";import"./Popper-CLUC9pHF.js";import"./util-BWylIJC3.js";import"./heading-Dqn5b5gU.js";import"./interactive-graph-settings-C7eIpUok.js";import"./locked-figures-section-Dq9mTtyD.js";import"./locked-ellipse-settings-BFl5Nfk2.js";import"./scrollless-number-text-field-C9nyfk9m.js";import"./locked-label-settings-BRDon7mi.js";import"./line-stroke-select-ZI0HPcLq.js";import"./line-weight-select-Cz9w8qCF.js";import"./locked-figure-aria-EHOrVog0.js";import"./locked-function-settings-Bt6-tbm_.js";import"./line-swatch-BaJwOEQ2.js";import"./locked-line-settings-bj4ybmC6.js";import"./locked-point-settings-jnQFOBbn.js";import"./labeled-switch-CQiC_HN7.js";import"./locked-polygon-settings-Djs3IzK3.js";import"./locked-vector-settings-Dl4OpBb4.js";import"./label-image-editor-D_XZ1-dc.js";import"./form-wrapped-text-field-ISCsdBjt.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BN49Yabp.js";import"./behavior-CZ2kcbWT.js";import"./question-markers-v2adB9Hj.js";import"./marker-DBRGsWJM.js";import"./select-image-D-vJH9J6.js";import"./matcher-editor-4xwQlR2i.js";import"./number-line-editor-P9h9D0Ny.js";import"./numeric-input-editor-D_bhUT6y.js";import"./phet-simulation-editor-CWjBANKo.js";import"./plotter-editor-DV8KuwtC.js";import"./python-program-editor-D22F_RqT.js";import"./editor-z2E9hCQF.js";import"./sorter-editor-BTVV49e0.js";import"./tex-error-view-CaA9UrNb.js";const a={content:`A sequence is defined recursively as follows:


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
