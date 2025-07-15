import{j as r,A as g,r as t,V as v}from"./iframe-2mn_P961.js";import"./item-version-DM2DahxC.js";import"./article-renderer-BJ0ERF-7.js";import"./server-item-renderer-CZRgO9-K.js";import"./hints-renderer-Bi4cn4Bc.js";import"./index-Dnnuwz2S.js";import{S as W}from"./split-view-BKoINoFT.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-D5xla4Mx.js";import{E as f}from"./editor-C3JE3Suu.js";import"./article-editor-D7HfO-Pc.js";import"./components-Bu559I3z.js";import"./device-framer-DMUR0bu6.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BQp8nJDw.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BYs73qsk.js";import"./text-diff-BLTh9mFe.js";import"./editor-page-Dj_1NvOn.js";import"./toggleable-caret-B25jLAak.js";import"./trash-bold-CIICLN4v.js";import"./item-extras-editor-HfCuYW2l.js";import"./content-preview-BtHdZgmu.js";/* empty css                       */import"./main-C9gt-Nfi.js";import"./categorizer-editor-C4Yu-awy.js";import"./editor-jsonify-CuU25UUr.js";import"./blur-input-w5BznS3Q.js";import"./definition-editor-ChYmguHA.js";import"./dropdown-editor-BfNVfgeC.js";import"./explanation-editor-CprKoApW.js";import"./expression-editor-B8nXnfuQ.js";import"./free-response-editor-BxJ3nxcl.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CvfFR-F9.js";import"./image-editor-D952SNin.js";import"./input-number-editor-Tao7HMa2.js";import"./interaction-editor-BtKLz67J.js";import"./interactive-graph-editor-hxcoaTCS.js";import"./color-select-Bm3BgliV.js";import"./Popper-wTckCh2k.js";import"./util-C7EwdJhK.js";import"./heading-C7VOD2cr.js";import"./interactive-graph-settings-B6GjRKuL.js";import"./locked-figures-section-CUW_YxYT.js";import"./locked-ellipse-settings-5IKTjSPJ.js";import"./scrollless-number-text-field-CalUj8jR.js";import"./locked-label-settings-BYBFCU4w.js";import"./line-stroke-select-C1U6wmG4.js";import"./line-weight-select-Dk-mH1YW.js";import"./locked-figure-aria-C432q6hg.js";import"./locked-function-settings-Y-moHVZ3.js";import"./line-swatch-C9LjvkST.js";import"./locked-line-settings-CckEJ3Fa.js";import"./locked-point-settings-BpSrDWcD.js";import"./labeled-switch-BQddU1CS.js";import"./locked-polygon-settings-CCgQURro.js";import"./locked-vector-settings-Dl3Ukk_1.js";import"./label-image-editor-CM_gwgdi.js";import"./form-wrapped-text-field-Df9F0OF4.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-LRqK4NwG.js";import"./behavior-AhEUiMo8.js";import"./question-markers-CEQ_LC5f.js";import"./marker-LD3oPtM5.js";import"./select-image-CC6wfqaT.js";import"./matcher-editor-C535Ydig.js";import"./number-line-editor-HBD_RbL_.js";import"./numeric-input-editor-DL4Au1fV.js";import"./phet-simulation-editor-CETA9hy4.js";import"./plotter-editor-0IiI1EVq.js";import"./python-program-editor-BEIcjkNm.js";import"./editor-DyoxJJt_.js";import"./sorter-editor-T5BaNubj.js";import"./tex-error-view-rE7Der6k.js";const a={content:`A sequence is defined recursively as follows:


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
