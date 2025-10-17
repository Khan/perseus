import{j as r,A as u,r as t,V as y}from"./iframe-Bqs4JwNG.js";import"./changeable-C7GyetS0.js";import"./article-renderer-eSUBpUdX.js";import"./server-item-renderer-BO69CDoX.js";import"./hints-renderer-DSrX6IHN.js";import"./index-CAS-nrRL.js";import{S as W}from"./split-view-DqaHetDd.js";import{q as a}from"./numeric-input.testdata-BL4DSCiY.js";import{E as h,r as v}from"./register-all-widgets-and-editors-for-testing-7hg65zsv.js";import"./article-editor-DNyfUBO1.js";import"./components-4KueNKIN.js";import"./content-preview-n_lWhwaj.js";import"./viewport-resizer-B9wtjcOi.js";import"./editor-page-NcHF4sIz.js";import"./image-widget-generator-BkbJOfbU.js";import"./tex-error-view-Cdv2aUt1.js";import"./item-extras-editor-C4CaeNCp.js";/* empty css                       */import"./main-Dz0MS1Jq.js";import"./editor-jsonify-GOu-Zov7.js";import"./blur-input-DEt50EG6.js";import"./free-response-editor-BYqVubOi.js";import"./input-number-editor-TVDeIueT.js";import"./Popper-Ci__VWDA.js";import"./label-image-editor-DYXXK4D7.js";import"./form-wrapped-text-field-qaS3UYJu.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BXRa_Il6.js";import"./behavior-BQCeE9Qn.js";import"./question-markers-CbsqbR-Q.js";import"./marker-B0HEqX07.js";import"./select-image-Caac9vc-.js";import"./matcher-editor-DL9LnaPi.js";import"./number-line-editor-Djs_7jSM.js";import"./phet-simulation-editor-Dm9G1Wpo.js";import"./plotter-editor-Cpyv7Khc.js";import"./python-program-editor-DFI6twQc.js";import"./sorter-editor-B8kTfqAP.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__;v();const le={title:"Editors/Editor"},s=()=>r.jsx(h,{apiOptions:u.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:i=>{}}),o=()=>{const i=t.useRef(null),[w,f]=t.useState({}),[S,x]=t.useState("[[☃ interactive-graph 1]]"),[O,b]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],showAxisArrows:{xMin:!0,xMax:!0,yMin:!0,yMax:!0},gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(y,{style:{width:"360px",margin:"20px"},children:r.jsx(h,{ref:i,apiOptions:u.defaults,content:S,placeholder:"",widgets:E,images:O,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{C("onChange")(e),e.content?x(e.content):e.widgets?R(e.widgets):e.images&&b(e.images),setTimeout(()=>{var n;f(((n=i.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:w})})};s.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,d,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
  return <Editor apiOptions={ApiOptions.defaults} content={question1.content} placeholder="" widgets={question1.widgets} images={question1.images} disabled={false} widgetEnabled={true} immutableWidgets={false} showWordCount={true} warnNoPrompt={true} warnNoWidgets={true} onChange={props => {}} />;
}`,...(m=(d=s.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var c,l,g;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`(): React.ReactElement => {
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
        showAxisArrows: {
          xMin: true,
          xMax: true,
          yMin: true,
          yMax: true
        },
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
}`,...(g=(l=o.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const ge=["Demo","DemoInteractiveGraph"];export{s as Demo,o as DemoInteractiveGraph,ge as __namedExportsOrder,le as default};
