import{j as r,A as g,r as t,V as v}from"./iframe-DWRR6BFw.js";import"./item-version-BHjGM5GU.js";import"./article-renderer-C2WikEUN.js";import"./server-item-renderer-BumdbWFr.js";import"./hints-renderer-DByUCtLg.js";import"./index-BKrW7B4L.js";import{S as W}from"./split-view-C7YIjyAt.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-CPisZIlI.js";import{E as f}from"./editor-DmgCOp_1.js";import"./article-editor-Bb5CM_nx.js";import"./components-BWKRvEJb.js";import"./device-framer-pxB-eHkz.js";import"./constants-kyOY0S4e.js";import"./section-control-button-nVv65QyF.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BkrTF0Is.js";import"./text-diff-xoj1LGB5.js";import"./editor-page-CEFgVb1c.js";import"./toggleable-caret-hsDWg430.js";import"./trash-bold-Dh12O6KF.js";import"./item-extras-editor-Ccvf9yaR.js";import"./content-preview-CFKcO2XF.js";/* empty css                       */import"./main-BKeSz-7c.js";import"./categorizer-editor-Cz4C2s1Q.js";import"./editor-jsonify-BEG1d6_e.js";import"./blur-input-B_viuECU.js";import"./definition-editor-d7ANTEMl.js";import"./dropdown-editor-BPqCfDG5.js";import"./explanation-editor-Bg9igRn5.js";import"./expression-editor-6uPd5sJ7.js";import"./free-response-editor-BQrVcQNb.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Bg-r-bP7.js";import"./image-editor-Bl6JgNVq.js";import"./input-number-editor-BRUVqFhL.js";import"./interaction-editor-BYLprYkk.js";import"./interactive-graph-editor-CaGMDrRY.js";import"./color-select-DnNbNLuK.js";import"./Popper-B-Np5sTy.js";import"./util-4W5ASnJz.js";import"./heading-Bs35lpys.js";import"./interactive-graph-settings-CKrOFC3a.js";import"./locked-figures-section-DOJwlLgK.js";import"./locked-ellipse-settings-CuejEwcb.js";import"./scrollless-number-text-field-le9_pGiy.js";import"./locked-label-settings-CxMjvVOC.js";import"./line-stroke-select-CaJlU0pu.js";import"./line-weight-select-CRqA4PrF.js";import"./locked-figure-aria-DGGVFtIK.js";import"./locked-function-settings-pHVs0SGT.js";import"./line-swatch--NqT3a1_.js";import"./locked-line-settings-D8hxcNAc.js";import"./locked-point-settings-BjYbTSCM.js";import"./labeled-switch-45nTthMz.js";import"./locked-polygon-settings-BKJ-37tz.js";import"./locked-vector-settings-CtZ6duQo.js";import"./label-image-editor-BV_8crsk.js";import"./form-wrapped-text-field-_EG_nq3G.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CTmmAXCD.js";import"./behavior-B6X6bTmf.js";import"./question-markers-JhexvH6n.js";import"./marker-CvMUErBZ.js";import"./select-image-BOmbpmpz.js";import"./matcher-editor-8yUbnP-C.js";import"./number-line-editor-CfSwlx8P.js";import"./numeric-input-editor-BUIP8Qn7.js";import"./phet-simulation-editor-Cnk49FWh.js";import"./plotter-editor-DUnw_SlI.js";import"./python-program-editor-B6UQO0ir.js";import"./editor-y5nZtqDF.js";import"./sorter-editor-DXb8tdUB.js";import"./tex-error-view-DOX0_a9J.js";const a={content:`A sequence is defined recursively as follows:


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
