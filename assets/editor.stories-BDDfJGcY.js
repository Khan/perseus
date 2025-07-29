import{j as r,A as g,r as t,V as v}from"./iframe-DPME5Wfc.js";import"./item-version-Re2Bf6tc.js";import"./article-renderer-CLC0QY8e.js";import"./server-item-renderer-DYWMp5OE.js";import"./hints-renderer-CVWgBD1c.js";import"./index-BaTAGxuE.js";import{S as W}from"./split-view-DmDISlPm.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DCczFlit.js";import{E as f}from"./editor-DZZDfSOt.js";import"./article-editor-D_dIqEur.js";import"./components-5GyRNmEy.js";import"./device-framer-DbNaofD1.js";import"./icon-paths-Cfjy_uoj.js";import"./content-preview-Cz9qtGGl.js";import"./editor-page-BVD4zlpu.js";import"./tex-error-view-D0-VWC5x.js";import"./numeric-input-editor-BqQPpMKk.js";import"./editor-jsonify-kno1xt_7.js";import"./item-extras-editor-DCptclZi.js";/* empty css                       */import"./main-DFWlcaUo.js";import"./categorizer-editor-WGRxveuO.js";import"./blur-input-D_zGUa6C.js";import"./definition-editor-DMVNHhVK.js";import"./dropdown-editor-UjNSwqT5.js";import"./explanation-editor-DgJj2Vwz.js";import"./expression-editor-B6BlOuk4.js";import"./free-response-editor---eyQqoY.js";import"./interaction-editor-Bs-ruuPW.js";import"./image-editor-BbRwJAJ-.js";import"./input-number-editor-CBelaCj3.js";import"./Popper-B3YXkp0W.js";import"./label-image-editor-cG4F-F8R.js";import"./matcher-editor-cHvRGRgU.js";import"./number-line-editor-CaoQT-dW.js";import"./phet-simulation-editor-JkSYn6uC.js";import"./plotter-editor-DJP2X5Fp.js";import"./python-program-editor-CAqxatNu.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-C9-SgvsR.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const ge={title:"Editors/Editor"},s=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:o=>{}}),i=()=>{const o=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:o,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=o.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};s.__docgenInfo={description:"",methods:[],displayName:"Demo"};i.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,d,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
  return <Editor apiOptions={ApiOptions.defaults} content={question1.content} placeholder="" widgets={question1.widgets} images={question1.images} disabled={false} widgetEnabled={true} immutableWidgets={false} showWordCount={true} warnNoPrompt={true} warnNoWidgets={true} onChange={props => {}} />;
}`,...(m=(d=s.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var c,l,u;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=i.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const fe=["Demo","DemoInteractiveGraph"];export{s as Demo,i as DemoInteractiveGraph,fe as __namedExportsOrder,ge as default};
