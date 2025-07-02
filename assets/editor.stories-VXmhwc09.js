import{j as r,A as g,r as t,V as v}from"./iframe-Dp3THxR6.js";import"./item-version-BB7FzkBy.js";import"./article-renderer-DOJdkHN2.js";import"./server-item-renderer-Dp8rjiTI.js";import"./hints-renderer-BYuLKa6p.js";import"./index-C7kl2BcQ.js";import{S as W}from"./split-view-75eh-6LA.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DvtfUEZ4.js";import{E as f}from"./editor-BJBBPkVb.js";import"./article-editor-cvLbbTT9.js";import"./components-Byo4uxsz.js";import"./device-framer-CvPloavt.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DcW5K5kH.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-B9hKU_uB.js";import"./text-diff-C5uS9Zsq.js";import"./editor-page-BTRKUlBF.js";import"./toggleable-caret-KfCeec3g.js";import"./trash-bold-DI6m6am-.js";import"./item-extras-editor-BtCic_V6.js";import"./content-preview-B5FQ8AkO.js";/* empty css                       */import"./main-ALB351Jw.js";import"./categorizer-editor-C9jbX4Fe.js";import"./editor-jsonify-CY-A1SFJ.js";import"./blur-input-BAT9ADtX.js";import"./definition-editor-8vBOYnMv.js";import"./dropdown-editor-BPcY_JCC.js";import"./explanation-editor-DqLNmYHf.js";import"./expression-editor-EjNKWgh6.js";import"./free-response-editor-NB4zjUUJ.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-D2BZ3k72.js";import"./image-editor-C_VqgbTY.js";import"./input-number-editor-Dx5XXarv.js";import"./interaction-editor-F_edY8bi.js";import"./interactive-graph-editor-BJQijjb4.js";import"./color-select-C4Km4AoD.js";import"./Popper-DSSrLSMR.js";import"./util-DZQ-LJrp.js";import"./heading-B1u9elva.js";import"./interactive-graph-settings-64CCKgbT.js";import"./locked-figures-section-BshZd9nL.js";import"./locked-ellipse-settings-Cr_1Uf3r.js";import"./scrollless-number-text-field-D9b-3Ltb.js";import"./locked-label-settings-LD-N73Wb.js";import"./line-stroke-select-Dtn1TdRT.js";import"./locked-figure-aria-BUfEC-nh.js";import"./locked-function-settings-CZLDdQTV.js";import"./line-swatch-inrEzYvI.js";import"./locked-line-settings-B3KfUmLu.js";import"./locked-point-settings-hjIC_T9o.js";import"./labeled-switch-r7LdRFDe.js";import"./locked-polygon-settings-DAozMkGw.js";import"./locked-vector-settings-ClfSWE4Y.js";import"./label-image-editor-kDA87Qsk.js";import"./form-wrapped-text-field-Dghbiy5e.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DP5AZa5I.js";import"./behavior-CJcSewi3.js";import"./question-markers-DdYX47Ij.js";import"./marker-C8ECT9Nf.js";import"./select-image-D8guD5Kl.js";import"./matcher-editor-BAHsE80S.js";import"./number-line-editor-uLaHU9a_.js";import"./numeric-input-editor-BWDe9E_d.js";import"./phet-simulation-editor-DP4EljUn.js";import"./plotter-editor-BHRg5lGi.js";import"./python-program-editor-B3Eqf6s5.js";import"./editor-D_TB3jAL.js";import"./sorter-editor-Ztd1rkcu.js";import"./tex-error-view-qD2E9INX.js";const a={content:`A sequence is defined recursively as follows:


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
