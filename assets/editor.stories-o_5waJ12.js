import{j as r,A as g,r as t,V as v}from"./iframe-DLWI6uzF.js";import"./item-version-BmTx6a5n.js";import"./article-renderer-qnvGESzG.js";import"./server-item-renderer-D4lOQ3Yn.js";import"./hints-renderer-BKzF6YmD.js";import"./index-ta9OaYq_.js";import{S as W}from"./split-view-ByQkDtH1.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-L7O7eeKy.js";import{E as f}from"./editor-B4UhWicj.js";import"./article-editor-DhGa_3Vr.js";import"./components-CTYeY55B.js";import"./device-framer-BXiSg476.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BgatVsCE.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-uuDNTh_D.js";import"./text-diff-BaL6Vx8z.js";import"./editor-page-WI0sq3pe.js";import"./toggleable-caret-BrVuGfNB.js";import"./trash-bold-CACcza_X.js";import"./item-extras-editor-Bkf0UagZ.js";import"./content-preview-ov04akT-.js";/* empty css                       */import"./main-B_LJzS2O.js";import"./categorizer-editor-CAJJGNA9.js";import"./editor-jsonify-B1kp5g4-.js";import"./blur-input-DWDskjsm.js";import"./definition-editor-BhWzvt8u.js";import"./dropdown-editor-BiERwPcN.js";import"./explanation-editor-DrUjZKqT.js";import"./expression-editor-BRiYMu45.js";import"./free-response-editor-B3hQgwaW.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-rYfRAc71.js";import"./image-editor-CzfE0DHH.js";import"./input-number-editor-Dk3Z5ZVO.js";import"./interaction-editor-Btm4hNVJ.js";import"./interactive-graph-editor-Ds0QsTUj.js";import"./color-select-BWkKt7so.js";import"./Popper-Bq9O6c5f.js";import"./util-B7doZQq0.js";import"./heading-Nodwu4tg.js";import"./interactive-graph-settings-D4nt5zC5.js";import"./locked-figures-section-BziV-CNA.js";import"./locked-ellipse-settings-BSuA_CGn.js";import"./scrollless-number-text-field-BRbqCNc2.js";import"./locked-label-settings-BercU7fK.js";import"./line-stroke-select-CUqfxfHP.js";import"./line-weight-select-DcBGbIXv.js";import"./locked-figure-aria-J7X9XKLu.js";import"./locked-function-settings-FxmTafMQ.js";import"./line-swatch-DYTqmqYy.js";import"./locked-line-settings-B_h5ExAB.js";import"./locked-point-settings-DESIHqxq.js";import"./labeled-switch-QwjASxSN.js";import"./locked-polygon-settings-DdthoWqL.js";import"./locked-vector-settings-Cj9dxy8R.js";import"./label-image-editor-DglMmcFd.js";import"./form-wrapped-text-field-C9C2FBzO.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BVwcn-Hw.js";import"./behavior-N9NJ7VSi.js";import"./question-markers-CeSXt-gW.js";import"./marker-DnFMx1dM.js";import"./select-image-ChX-3iYQ.js";import"./matcher-editor-D-czbRTg.js";import"./number-line-editor-BsmfAEmv.js";import"./numeric-input-editor-Ca7gxfmj.js";import"./phet-simulation-editor-DOJ3X8gm.js";import"./plotter-editor-xrxM72Vj.js";import"./python-program-editor-CgmMrqMw.js";import"./editor-CWtbiHEM.js";import"./sorter-editor-DD3dvNLi.js";import"./tex-error-view-DaT1Qtpd.js";const a={content:`A sequence is defined recursively as follows:


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
