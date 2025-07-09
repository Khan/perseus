import{j as r,A as g,r as t,V as v}from"./iframe-oVdCiwLc.js";import"./item-version-DOq5lPyi.js";import"./article-renderer-BghgEmMn.js";import"./server-item-renderer-B19zWJQi.js";import"./hints-renderer-JZ7chtEs.js";import"./index-B9ABVwga.js";import{S as W}from"./split-view-B66xwFKa.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Cu2NKEly.js";import{E as f}from"./editor-DCuS8iBs.js";import"./article-editor-D9MbEmvP.js";import"./components-Xo-rMjfd.js";import"./device-framer-Cfp4OPPR.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CnGNASwf.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-RsPYoQQi.js";import"./text-diff-D1u3Kqm1.js";import"./editor-page-GQA4vtWg.js";import"./toggleable-caret-YYbn8vgR.js";import"./trash-bold-CGZ-cXVd.js";import"./item-extras-editor-s6Cyz8BD.js";import"./content-preview-NRMkERXp.js";/* empty css                       */import"./main-BPFjcemI.js";import"./categorizer-editor-BqTOCY-n.js";import"./editor-jsonify-B_5p1pfq.js";import"./blur-input-CQQrehYb.js";import"./definition-editor-BoOQ7hWd.js";import"./dropdown-editor-Dc4vfxgn.js";import"./explanation-editor-Dp3CW_vW.js";import"./expression-editor-CYVkO24C.js";import"./free-response-editor-CPTuPlVI.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-vLVdFnaF.js";import"./image-editor-BIHcdI8P.js";import"./input-number-editor-EmMOJgZl.js";import"./interaction-editor-CKhUoP1i.js";import"./interactive-graph-editor-B1l8AfKB.js";import"./color-select-CtVpOXsy.js";import"./Popper-CVgS00Y6.js";import"./util-DKG8wQoS.js";import"./heading-BjpdwqK_.js";import"./interactive-graph-settings-DAgJ3X0F.js";import"./locked-figures-section-CwHc0KyB.js";import"./locked-ellipse-settings-CqqmzdEa.js";import"./scrollless-number-text-field-DjivOxeE.js";import"./locked-label-settings-C6MT0prM.js";import"./line-stroke-select-Dru8Hikp.js";import"./line-weight-select-CSKwZ6CJ.js";import"./locked-figure-aria-BalhOl75.js";import"./locked-function-settings-BebRpkdA.js";import"./line-swatch-Bov0nPD6.js";import"./locked-line-settings-nGTOQoH8.js";import"./locked-point-settings-DlgCWgs2.js";import"./labeled-switch-DDDgPoho.js";import"./locked-polygon-settings-DpwxYpMd.js";import"./locked-vector-settings-CGA6NEFL.js";import"./label-image-editor-D2r1oP1k.js";import"./form-wrapped-text-field-CEzHZfPm.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BIrJ_9IQ.js";import"./behavior-DOJ0xJYI.js";import"./question-markers-CWS8ShnT.js";import"./marker-DvTF_-lM.js";import"./select-image-BEbLwO6-.js";import"./matcher-editor-ILP-n7IP.js";import"./number-line-editor-CjH8rdBz.js";import"./numeric-input-editor-CI-Q_9rp.js";import"./phet-simulation-editor-RvN59WMo.js";import"./plotter-editor-CD_Dnkm-.js";import"./python-program-editor-C8gPjuWU.js";import"./editor-Du-ELvBS.js";import"./sorter-editor-BApDmLXE.js";import"./tex-error-view-CyyuDgKy.js";const a={content:`A sequence is defined recursively as follows:


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
