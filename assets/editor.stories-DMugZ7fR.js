import{j as r,A as g,r as t,V as v}from"./iframe-Bn4eIUvs.js";import"./item-version-DeXeNc9j.js";import"./article-renderer-De3DbS1j.js";import"./server-item-renderer-dzpsa8GX.js";import"./hints-renderer-Wq2tBpaB.js";import"./index-CK8lkyQV.js";import{S as W}from"./split-view-Xqg-OBDl.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Oj5vncdf.js";import{E as f}from"./editor-DDqA3k9J.js";import"./article-editor-CRmfSxW7.js";import"./components-CMUWUArR.js";import"./device-framer-CqWEuanA.js";import"./icon-paths-Cfjy_uoj.js";import"./content-preview-B5e2Yj74.js";import"./editor-page-Dk-C1fUm.js";import"./tex-error-view-CbBf_Hlc.js";import"./numeric-input-editor-Brk53AGU.js";import"./editor-jsonify-CNLLiPSj.js";import"./item-extras-editor-D_2O8H62.js";/* empty css                       */import"./main-Bkq2FLDV.js";import"./categorizer-editor-C8z9ltAn.js";import"./blur-input-BKMz5GfU.js";import"./definition-editor-BKbtltzp.js";import"./dropdown-editor-CxZXi43T.js";import"./explanation-editor-CS4idt9a.js";import"./expression-editor-Bqo8jV6_.js";import"./free-response-editor-DAujeROR.js";import"./interaction-editor-p_d3DTNI.js";import"./image-editor-NrL3phBL.js";import"./input-number-editor-PkcuryYa.js";import"./Popper-Dl2z8Wek.js";import"./label-image-editor-BpVMLwZD.js";import"./matcher-editor-DItdQP61.js";import"./number-line-editor-C58xywii.js";import"./phet-simulation-editor-BMwFMmnc.js";import"./plotter-editor-Cu920euc.js";import"./python-program-editor-DZciZ_sp.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-DvSFDCM6.js";const a={content:`A sequence is defined recursively as follows:


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
