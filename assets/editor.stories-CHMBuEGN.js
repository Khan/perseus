import{j as r,A as g,r as t,V as v}from"./iframe-BDVJISiT.js";import"./item-version-rBwLKTlF.js";import"./article-renderer-BTwqu2s8.js";import"./server-item-renderer-Vgm5yKO_.js";import"./hints-renderer-BpiauPQE.js";import"./index-CgzkRSMY.js";import{S as W}from"./split-view-jjPAfUld.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-ijPRjgDh.js";import{E as f}from"./editor-C13nLdlt.js";import"./article-editor-gdf_tJkc.js";import"./components-Cyxr-qtA.js";import"./device-framer-L5DECGwv.js";import"./constants-kyOY0S4e.js";import"./section-control-button-y_xCHlHI.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BDhaL1Nx.js";import"./text-diff-DpUD1Dau.js";import"./editor-page-BZfwFgbG.js";import"./trash-bold-Br1SAYQH.js";import"./item-extras-editor-J064gPBo.js";import"./content-preview-CXjpjBMx.js";/* empty css                       */import"./categorizer-editor-DbOyxV8U.js";import"./editor-jsonify-Db_eXDuO.js";import"./blur-input-BlTATVu8.js";import"./definition-editor-CAWO5vPA.js";import"./dropdown-editor-DUKXPuBW.js";import"./explanation-editor-D4EulPEq.js";import"./expression-editor-vjxQ2SBh.js";import"./free-response-editor-DJhdmaLs.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-n0ysE5tC.js";import"./image-editor-DooI6-eD.js";import"./input-number-editor-yuyycrPe.js";import"./interaction-editor-cItdpTKu.js";import"./interactive-graph-editor-DlACykCX.js";import"./color-select-CPHaHaV9.js";import"./Popper-D6gtNNrd.js";import"./util-BFVF9o4I.js";import"./heading-CBjodYFy.js";import"./toggleable-caret-I5R8h03X.js";import"./interactive-graph-settings-Bije5WOi.js";import"./locked-figures-section-k4XC8mNH.js";import"./locked-ellipse-settings-BAzZ0V3H.js";import"./scrollless-number-text-field-jBEEntx6.js";import"./locked-label-settings-CvwUphhc.js";import"./line-stroke-select-Obg_bq70.js";import"./locked-figure-aria-B5_7h-gu.js";import"./locked-function-settings-CZqTlViL.js";import"./line-swatch-CWxs9vmP.js";import"./locked-line-settings-D3JGC-1C.js";import"./locked-point-settings-BNRRw4IW.js";import"./labeled-switch-BRTsq9tn.js";import"./locked-polygon-settings-DxT5tDnV.js";import"./locked-vector-settings-DMSDDaji.js";import"./label-image-editor-ClTFD251.js";import"./form-wrapped-text-field-ow5rCqxr.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CLb4XJMA.js";import"./behavior-BJfzu4UA.js";import"./question-markers-BD4NqH2S.js";import"./marker-QNEKjPiz.js";import"./select-image-C196UKos.js";import"./matcher-editor-Cey_AvO5.js";import"./number-line-editor-Cj9n5dwg.js";import"./numeric-input-editor-CAEWVBwl.js";import"./phet-simulation-editor-DpD8p9XV.js";import"./plotter-editor-DxGU1p9T.js";import"./python-program-editor-C70rWirF.js";import"./editor-lQ6BdIMt.js";import"./sorter-editor-CRquJ6sU.js";import"./tex-error-view-BXIMpyTx.js";const a={content:`A sequence is defined recursively as follows:


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
