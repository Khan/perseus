import{j as r,A as g,r as t,V as v}from"./iframe-CFgdDBZ0.js";import"./item-version-Cbo_E6qa.js";import"./article-renderer-C177145R.js";import"./server-item-renderer-C8TvH69k.js";import"./hints-renderer-C0YRMi4r.js";import"./index-C2eSd9Yq.js";import{S as W}from"./split-view-DnmzLpCh.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BQldoFYq.js";import{E as f}from"./editor-DhHkNdEo.js";import"./article-editor-95KHpC0h.js";import"./components-qkQE1Gjs.js";import"./device-framer-BlBRL5Dl.js";import"./constants-kyOY0S4e.js";import"./section-control-button-D1hJiKYr.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CkuVQp5K.js";import"./text-diff-Bkey6jkf.js";import"./editor-page-gADEdwOr.js";import"./toggleable-caret-4s52dE5l.js";import"./trash-bold-DQmEOG2F.js";import"./item-extras-editor-Pp5QNAsw.js";import"./content-preview-wp0TiDff.js";/* empty css                       */import"./main-urqDTkmg.js";import"./categorizer-editor-Cht_hLiZ.js";import"./editor-jsonify-ExY2yikD.js";import"./blur-input-DcpakGZn.js";import"./definition-editor-BesVIM85.js";import"./dropdown-editor-BxbNrdKR.js";import"./explanation-editor-Dy9uOOwE.js";import"./expression-editor-CVB6R8n5.js";import"./free-response-editor-DuJT_Di3.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-PFprSihx.js";import"./image-editor-U3buawpe.js";import"./input-number-editor-JAXZPSrl.js";import"./interaction-editor-Bm-hOOpY.js";import"./interactive-graph-editor-CVJn2E1J.js";import"./color-select-mhrIWUMy.js";import"./Popper-RzlI5AGI.js";import"./util-DGgsS3rj.js";import"./heading-C2QkgtWi.js";import"./interactive-graph-settings-CAjuRRyE.js";import"./locked-figures-section-Bvl4OzGE.js";import"./locked-ellipse-settings-Bh68K4SZ.js";import"./scrollless-number-text-field-Bz2JITFT.js";import"./locked-label-settings-UFG0Yv6e.js";import"./line-stroke-select-Bo7UPC9F.js";import"./locked-figure-aria-CuhFMhFA.js";import"./locked-function-settings-Tg4AxZkg.js";import"./line-swatch-CRTY19mr.js";import"./locked-line-settings-DyWeW6sl.js";import"./locked-point-settings-BtGPUiQH.js";import"./labeled-switch-CmIJnGxQ.js";import"./locked-polygon-settings-1duUcZhQ.js";import"./locked-vector-settings-BjaUH9il.js";import"./label-image-editor-Dm3WDAs9.js";import"./form-wrapped-text-field-D5-1Nidt.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-D420wMs4.js";import"./behavior-BE7pUAmK.js";import"./question-markers-CsLEO5w3.js";import"./marker-BnmBc3tG.js";import"./select-image-lR1nEi0t.js";import"./matcher-editor-BL67qQOh.js";import"./number-line-editor-BRLPAdU9.js";import"./numeric-input-editor-DThvv8tv.js";import"./phet-simulation-editor-RhozASET.js";import"./plotter-editor-DGBqxMLZ.js";import"./python-program-editor-JxkZjN21.js";import"./editor-957gCOLR.js";import"./sorter-editor-Dtx8dbQX.js";import"./tex-error-view-f8inlvXr.js";const a={content:`A sequence is defined recursively as follows:


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
