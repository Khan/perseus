import{j as r,A as g,r as t,V as v}from"./iframe-CIFRGchV.js";import"./item-version-LGKaA1ST.js";import"./article-renderer-B42KUb76.js";import"./server-item-renderer-Cs9PsFu1.js";import"./hints-renderer-GxUEtri3.js";import"./index-OvsMkWjk.js";import{S as W}from"./split-view-C6P7nWjw.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DcSvjgue.js";import{E as f}from"./editor-Bd6MQoMx.js";import"./article-editor-BHx7jUjx.js";import"./components-DnWpo-Sg.js";import"./device-framer-BYtZrhGl.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BnmOo5__.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CW6BKJym.js";import"./text-diff-B1vz1MPU.js";import"./editor-page-D7AAOXXq.js";import"./trash-bold-Dhlat321.js";import"./item-extras-editor-C9KYAP43.js";import"./content-preview-Cv2ZypEi.js";/* empty css                       */import"./main-DZMKdgEC.js";import"./categorizer-editor-DW6nyuVx.js";import"./editor-jsonify-DyMprQSz.js";import"./blur-input-itIUHVOY.js";import"./definition-editor-afthKT2o.js";import"./dropdown-editor-BoIoQPJR.js";import"./explanation-editor-C9eiftlw.js";import"./expression-editor-DZFYJ8HY.js";import"./free-response-editor-CbGHj54s.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DX2g19hI.js";import"./image-editor-CZyDqgFC.js";import"./input-number-editor-n_T3WVXQ.js";import"./interaction-editor-CXuWR_7H.js";import"./interactive-graph-editor-CEIb87YL.js";import"./color-select-D8K0bsbR.js";import"./Popper-DR6QQEUk.js";import"./util-DinHn52X.js";import"./heading-vdE-ZblU.js";import"./toggleable-caret-CO5EEiwK.js";import"./interactive-graph-settings-CN9_6Xa2.js";import"./locked-figures-section-ClhgZZYK.js";import"./locked-ellipse-settings-osAN811j.js";import"./scrollless-number-text-field-CaV3jg60.js";import"./locked-label-settings-DGCu5b5U.js";import"./line-stroke-select-DRXovVrk.js";import"./locked-figure-aria-D6OXVxRN.js";import"./locked-function-settings-CP7MJyii.js";import"./line-swatch-BuEAShIg.js";import"./locked-line-settings-Db8TaTvR.js";import"./locked-point-settings-BnjKP6N6.js";import"./labeled-switch-CSWBlz6J.js";import"./locked-polygon-settings-BieihMM5.js";import"./locked-vector-settings-VgZpHFVL.js";import"./label-image-editor-DS3Minh_.js";import"./form-wrapped-text-field-Di-CsorX.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DsZyqV4-.js";import"./behavior-C4KpYe-R.js";import"./question-markers-CneE6pXe.js";import"./marker-BdJgZeSx.js";import"./select-image-C3R1g3zB.js";import"./matcher-editor-C8PRSKiZ.js";import"./number-line-editor-CZZNZNK4.js";import"./numeric-input-editor-Dt3MPsXK.js";import"./phet-simulation-editor-ClhXqmqp.js";import"./plotter-editor-CF4l8Lsb.js";import"./python-program-editor-CJrNrbma.js";import"./editor-Cmn13PUd.js";import"./sorter-editor-8sbomlcl.js";import"./tex-error-view-C42wiiS4.js";const a={content:`A sequence is defined recursively as follows:


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
