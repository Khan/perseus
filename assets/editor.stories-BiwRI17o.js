import{j as r,A as g,r as t,V as v}from"./iframe-DhYGLGdk.js";import"./item-version-aCyemDon.js";import"./article-renderer-DmqwZkiO.js";import"./server-item-renderer-P-lmrzRz.js";import"./hints-renderer-Cf1oFcBH.js";import"./index-D7Qg9SlJ.js";import{S as W}from"./split-view-BZULNzmT.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-C7weGwNP.js";import{E as f}from"./editor-C2KimYYW.js";import"./article-editor-DIpp9v5o.js";import"./components-CQdW-ezA.js";import"./device-framer-hOduD2n_.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BNEt5S6G.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-kQC_bX1A.js";import"./text-diff-DJsMiLOy.js";import"./editor-page-DiKmkeYQ.js";import"./toggleable-caret-B1j-PB6s.js";import"./trash-bold-BDZM3Sb7.js";import"./item-extras-editor-DTWIiP4b.js";import"./content-preview-DL-opKa3.js";/* empty css                       */import"./main-D2iYrMm2.js";import"./categorizer-editor-SZSQwGA1.js";import"./editor-jsonify-DGKfhoHl.js";import"./blur-input-DSGgIHuv.js";import"./definition-editor-Ce25_hqH.js";import"./dropdown-editor-DFsMc85e.js";import"./explanation-editor-CA-z2lpM.js";import"./expression-editor-CqDjqxMf.js";import"./free-response-editor-9JR0Lsce.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-qW1Z7JS7.js";import"./image-editor-BrO8It8h.js";import"./input-number-editor-Ca2dA4JG.js";import"./interaction-editor-41b2bdwd.js";import"./interactive-graph-editor-CCkW7IEy.js";import"./color-select-Dq9jCQAs.js";import"./Popper-jQ5tTMby.js";import"./util-BRk0WVpw.js";import"./heading-4RYOD5ao.js";import"./interactive-graph-settings-Dz_YddIB.js";import"./locked-figures-section-UG100dyK.js";import"./locked-ellipse-settings-6bpCBIiI.js";import"./scrollless-number-text-field-B4LD_kBv.js";import"./locked-label-settings-Di2IrFV7.js";import"./line-stroke-select-Cm7qUQPp.js";import"./locked-figure-aria-DHwus-9w.js";import"./locked-function-settings-DK9mdH1M.js";import"./line-swatch-5OEkWn7N.js";import"./locked-line-settings-DFXwjZRr.js";import"./locked-point-settings-K4Spr5MZ.js";import"./labeled-switch-D0dQBFuq.js";import"./locked-polygon-settings-CLZiBN_s.js";import"./locked-vector-settings-DQ8XQ2Ua.js";import"./label-image-editor-C8WnD4iE.js";import"./form-wrapped-text-field-BSXdC_UG.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BFwUZrdk.js";import"./behavior-DWoVLRZI.js";import"./question-markers-CNwRmBPd.js";import"./marker-DK4M4wmS.js";import"./select-image-BzhUspj_.js";import"./matcher-editor-DnqJ2KPy.js";import"./number-line-editor-DTum_nuz.js";import"./numeric-input-editor-ClJSe5Kk.js";import"./phet-simulation-editor-DyYnlxqG.js";import"./plotter-editor-i_b3k0T9.js";import"./python-program-editor-Ca9hJyib.js";import"./editor-DmIP_vt8.js";import"./sorter-editor-C-pPIexg.js";import"./tex-error-view-Ci1mWBuz.js";const a={content:`A sequence is defined recursively as follows:


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
