import{j as r,A as g,r as t,V as v}from"./iframe-B8IXMsWE.js";import"./item-version-V3N3MGsj.js";import"./article-renderer-DmCYWJOM.js";import"./server-item-renderer-BpUAnMe6.js";import"./hints-renderer-DoCLgHSp.js";import"./index-DtAIgBa3.js";import{S as W}from"./split-view-8ofbiRlZ.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-IubWguzl.js";import{E as f}from"./editor-R-64GbT7.js";import"./article-editor-DSEI4LeE.js";import"./components-CgZt9zP1.js";import"./device-framer-Do4M-px2.js";import"./constants-kyOY0S4e.js";import"./section-control-button-D-QuZhUZ.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BwN_QicG.js";import"./text-diff-DZaGm0Se.js";import"./editor-page-DbWAyU8K.js";import"./toggleable-caret-E4w5hj3P.js";import"./trash-bold-pDoOHEMR.js";import"./item-extras-editor-D6fAbqks.js";import"./content-preview-arzxr5F3.js";/* empty css                       */import"./main-DYfBSATf.js";import"./categorizer-editor-DFLomW7E.js";import"./editor-jsonify-BhP44OwN.js";import"./blur-input-CcinVBwd.js";import"./definition-editor-BtrnJ3s_.js";import"./dropdown-editor-BF1TeOUA.js";import"./explanation-editor-CJtppd5D.js";import"./expression-editor-DlB2rOJZ.js";import"./free-response-editor-BZHVAwNU.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BeGP7pB-.js";import"./image-editor-DZ98l-vZ.js";import"./input-number-editor-UVIIWKiI.js";import"./interaction-editor-CTL5qkf6.js";import"./interactive-graph-editor-ZMHDVaz2.js";import"./color-select-Bu2dlagM.js";import"./Popper-BYaqK5oV.js";import"./util-TKfxggoo.js";import"./heading-XqC2bUZV.js";import"./interactive-graph-settings-BxdSZjzT.js";import"./locked-figures-section-D2TgYKCr.js";import"./locked-ellipse-settings-BZ4dYmbu.js";import"./scrollless-number-text-field-Cz9YSwRA.js";import"./locked-label-settings-0NnpLp7y.js";import"./line-stroke-select-BzZ1YSqw.js";import"./line-weight-select-DCHYlq0m.js";import"./locked-figure-aria-BTjQbEtV.js";import"./locked-function-settings-ruXayXYe.js";import"./line-swatch-Ditw9JDp.js";import"./locked-line-settings-0GTGxuvs.js";import"./locked-point-settings-CqWA_8nf.js";import"./labeled-switch-BKLbHPn3.js";import"./locked-polygon-settings-CCJfuIKy.js";import"./locked-vector-settings-DAgNUJZI.js";import"./label-image-editor-BMlX5fSr.js";import"./form-wrapped-text-field-CVSolFmI.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-dlRe9X8C.js";import"./behavior-zWU-tqsI.js";import"./question-markers-CmlWD-uU.js";import"./marker-NAmzuEE3.js";import"./select-image-BT6sjZsX.js";import"./matcher-editor-CvTfYJRn.js";import"./number-line-editor-CkGi0n5t.js";import"./numeric-input-editor-C9rdkia2.js";import"./phet-simulation-editor-BTvT2_C9.js";import"./plotter-editor-CH6vZ4hC.js";import"./python-program-editor-NaCcQ_8Y.js";import"./editor-BaDK9dWb.js";import"./sorter-editor-Z-QvNR7V.js";import"./tex-error-view-CxKa81Pk.js";const a={content:`A sequence is defined recursively as follows:


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
