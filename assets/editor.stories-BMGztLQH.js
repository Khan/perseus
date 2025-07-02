import{j as r,A as g,r as t,V as v}from"./iframe-D3VzT3LL.js";import"./item-version-m_0hhLH7.js";import"./article-renderer-CT6n8g1l.js";import"./server-item-renderer-TtIqDjpg.js";import"./hints-renderer-C7KhoaEn.js";import"./index-IQQod4mB.js";import{S as W}from"./split-view-fKS7hnOu.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-C86sXSUI.js";import{E as f}from"./editor-CfzVnbml.js";import"./article-editor-DDib_Xjz.js";import"./components-DRJn21hJ.js";import"./device-framer-D3mp9Ot9.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Bf3sMsDa.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CCqwTebh.js";import"./text-diff-BKAn4YiY.js";import"./editor-page-Dbeq6ERF.js";import"./toggleable-caret-CcWTVfgu.js";import"./trash-bold-BVYeKEKD.js";import"./item-extras-editor-CEJ3TaJK.js";import"./content-preview-BJv2u92X.js";/* empty css                       */import"./main-CHsiF85S.js";import"./categorizer-editor-DtCvV0-v.js";import"./editor-jsonify-BM6nI3-k.js";import"./blur-input-j6qqir-9.js";import"./definition-editor-Ds-Azlaq.js";import"./dropdown-editor-CmemC89a.js";import"./explanation-editor-RpK_v3Ih.js";import"./expression-editor-Bnn0e9EQ.js";import"./free-response-editor-CLWHYIYI.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-D04WE0Ad.js";import"./image-editor-DfsGPGHm.js";import"./input-number-editor-DPL6a2Iv.js";import"./interaction-editor-D8oNPsob.js";import"./interactive-graph-editor-DxiLK1g1.js";import"./color-select-fF9B68dj.js";import"./Popper-BINN5MFU.js";import"./util-BqQaeTdh.js";import"./heading-BysWKNzT.js";import"./interactive-graph-settings-D_9QWWWw.js";import"./locked-figures-section-UeO4_pGX.js";import"./locked-ellipse-settings-2uxhlZ0d.js";import"./scrollless-number-text-field-Xh5HxFDA.js";import"./locked-label-settings-BUQcaqGP.js";import"./line-stroke-select-JKM01Ujq.js";import"./locked-figure-aria-BUFjaQOM.js";import"./locked-function-settings-zti7lYgy.js";import"./line-swatch-DVjpz481.js";import"./locked-line-settings-B9SuCdY4.js";import"./locked-point-settings-DYC2PvzW.js";import"./labeled-switch-Bf0lvwtt.js";import"./locked-polygon-settings-BQ4bB-Xe.js";import"./locked-vector-settings-Cu8RS0Zd.js";import"./label-image-editor-IOBtbcou.js";import"./form-wrapped-text-field-C5P256AT.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-B8VKMCJa.js";import"./behavior-RSAQjYCB.js";import"./question-markers-2HtKqAoi.js";import"./marker-CbfECfu0.js";import"./select-image-CSIrob_I.js";import"./matcher-editor-D5MMgi6L.js";import"./number-line-editor-CS3orXOf.js";import"./numeric-input-editor-DBmF8Po7.js";import"./phet-simulation-editor-BQUCxNTX.js";import"./plotter-editor-DYMe3GiH.js";import"./python-program-editor-t9NBDKZj.js";import"./editor-CNBtSSXa.js";import"./sorter-editor-D70IgDb_.js";import"./tex-error-view-DBBNKyVC.js";const a={content:`A sequence is defined recursively as follows:


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
