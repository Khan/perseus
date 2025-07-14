import{j as r,A as g,r as t,V as v}from"./iframe-UKFlrubJ.js";import"./item-version-DsSHwW-f.js";import"./article-renderer-Dnf1WoEY.js";import"./server-item-renderer-Bw0y83Z9.js";import"./hints-renderer-A5pw74Cg.js";import"./index-DP54872U.js";import{S as W}from"./split-view-DYWZznwc.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-vgkVkd3S.js";import{E as f}from"./editor-CU1QMdvd.js";import"./article-editor-Bi-UZyih.js";import"./components-Db1Gg-Ik.js";import"./device-framer-DGQPb5zq.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BImDsQF3.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-C_i8fF7T.js";import"./text-diff-I5mGcWJB.js";import"./editor-page-BJwHzeI_.js";import"./toggleable-caret-DPLA7cPa.js";import"./trash-bold-DFoW-t4p.js";import"./item-extras-editor-W_2viecf.js";import"./content-preview-Bxn7oCRz.js";/* empty css                       */import"./main-B-mbm--i.js";import"./categorizer-editor-COLBGIbw.js";import"./editor-jsonify-C8bAqxHT.js";import"./blur-input-C8qKrojM.js";import"./definition-editor-DleqVPsU.js";import"./dropdown-editor-CCDwJkmS.js";import"./explanation-editor-DOBzp--k.js";import"./expression-editor-CiZTp2ev.js";import"./free-response-editor-BNmoQOuH.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DzqK6rrC.js";import"./image-editor-Dh7DgqRx.js";import"./input-number-editor-BP4eZJfj.js";import"./interaction-editor-D-rqG6L6.js";import"./interactive-graph-editor-CJJBHdWz.js";import"./color-select-TWunj21a.js";import"./Popper-lX8H-Sow.js";import"./util-CPyI0Cd4.js";import"./heading-CUPRy0FH.js";import"./interactive-graph-settings-BXiL6zEM.js";import"./locked-figures-section-l7_OwjU-.js";import"./locked-ellipse-settings-D0O0Js6N.js";import"./scrollless-number-text-field-5mWAIYps.js";import"./locked-label-settings-U9yGjtyp.js";import"./line-stroke-select-kOrlu0__.js";import"./line-weight-select-DNiWP4wy.js";import"./locked-figure-aria-Ctiqr5wR.js";import"./locked-function-settings-MmWose6g.js";import"./line-swatch-Bdx8CXpm.js";import"./locked-line-settings-B1e_9632.js";import"./locked-point-settings-DPqyjs87.js";import"./labeled-switch-BANmlvi_.js";import"./locked-polygon-settings-B_0qtRxo.js";import"./locked-vector-settings-Cii0kG2T.js";import"./label-image-editor-DfDxr9wA.js";import"./form-wrapped-text-field-Bp98QfK3.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-cGxJaiW3.js";import"./behavior-DTqez34R.js";import"./question-markers-D2cUYapr.js";import"./marker-CT4XFc1x.js";import"./select-image-B2s8vynh.js";import"./matcher-editor-CHKUdt_B.js";import"./number-line-editor-PUHV1KWO.js";import"./numeric-input-editor-D5YP5Mmd.js";import"./phet-simulation-editor-wEbFLnAQ.js";import"./plotter-editor-BdvU_7GD.js";import"./python-program-editor-CPrXDZC8.js";import"./editor-BFp8Kw6k.js";import"./sorter-editor-DEIRiTGR.js";import"./tex-error-view-9yD6M6_Y.js";const a={content:`A sequence is defined recursively as follows:


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
