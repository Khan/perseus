import{j as r,A as u,r as t,V as v}from"./iframe-CrThTwIf.js";import"./item-version-B3SDESbL.js";import"./article-renderer-BDBd00io.js";import"./server-item-renderer-B3OBiMF2.js";import"./hints-renderer-DenSrkW5.js";import"./index-C0VzWho1.js";import{S as x}from"./split-view-DLhvpzkY.js";import{q as a}from"./numeric-input.testdata-BL4DSCiY.js";import{r as C}from"./register-all-widgets-and-editors-for-testing-DN-F-8hE.js";import{E as h}from"./image-editor-BQkyhiha.js";import"./article-editor-DdPIc4r6.js";import"./components-BSmwcjxJ.js";import"./icon-paths-BF14P1V2.js";import"./content-preview-CLTWKYtR.js";import"./editor-page-DPU-lU06.js";import"./tex-error-view-B7565g9e.js";import"./item-extras-editor-72aLsgXo.js";/* empty css                       */import"./main-yD4sQkxP.js";import"./editor-jsonify-DZ6iw_RM.js";import"./blur-input-B1Bu2OOc.js";import"./free-response-editor-CdgePqER.js";import"./input-number-editor-D93aeWf-.js";import"./Popper-XpUGNV3d.js";import"./label-image-editor-DoASivsN.js";import"./matcher-editor-BHn7mLY1.js";import"./number-line-editor-CXZW4ZML.js";import"./phet-simulation-editor-CL5O3rZ0.js";import"./plotter-editor-qlbAYlkL.js";import"./python-program-editor-YlwBWbjb.js";import"./sorter-editor-DKGjiLGV.js";const{action:y}=__STORYBOOK_MODULE_ACTIONS__;C();const ie={title:"Editors/Editor"},s=()=>r.jsx(h,{apiOptions:u.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:i=>{}}),o=()=>{const i=t.useRef(null),[f,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,E]=t.useState({}),[R,W]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(x,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(h,{ref:i,apiOptions:u.defaults,content:S,placeholder:"",widgets:R,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{y("onChange")(e),e.content?O(e.content):e.widgets?W(e.widgets):e.images&&E(e.images),setTimeout(()=>{var n;w(((n=i.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:f})})};s.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,d,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(g=(l=o.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const ae=["Demo","DemoInteractiveGraph"];export{s as Demo,o as DemoInteractiveGraph,ae as __namedExportsOrder,ie as default};
