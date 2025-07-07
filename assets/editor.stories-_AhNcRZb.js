import{j as r,A as g,r as t,V as v}from"./iframe-BrZki5aV.js";import"./item-version-CZs_lB4_.js";import"./article-renderer-DluLuKbE.js";import"./server-item-renderer-DQT5DUvS.js";import"./hints-renderer-BIjefl_K.js";import"./index-q7P1OMo-.js";import{S as W}from"./split-view-CF0t6oEl.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DWymOV9y.js";import{E as f}from"./editor-BAGabD_Z.js";import"./article-editor-gOoHGQbj.js";import"./components-CkzJH8Q9.js";import"./device-framer-CBZtCUh7.js";import"./constants-kyOY0S4e.js";import"./section-control-button-D3fVW1EQ.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DNxXRIRf.js";import"./text-diff-BM460Eir.js";import"./editor-page-k1s29zDW.js";import"./toggleable-caret--dRH_Me5.js";import"./trash-bold-BNSzINQh.js";import"./item-extras-editor-D5ulXMV3.js";import"./content-preview-CZht63sk.js";/* empty css                       */import"./main-CXg4tTBp.js";import"./categorizer-editor-CRRG4hQx.js";import"./editor-jsonify-D6FltxMf.js";import"./blur-input-9OE0SfVD.js";import"./definition-editor-mvyaxIUm.js";import"./dropdown-editor-K7ej_0N0.js";import"./explanation-editor-4yj1LtIf.js";import"./expression-editor-CdKa93kZ.js";import"./free-response-editor-BFqE2_f_.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DxXf6wqK.js";import"./image-editor-BpqakdZh.js";import"./input-number-editor-BT9JSgSs.js";import"./interaction-editor-CvYGhutY.js";import"./interactive-graph-editor-BSIBgjBN.js";import"./color-select-C8WhaQ1B.js";import"./Popper-DabCz0PI.js";import"./util-D3bF6ycH.js";import"./heading-C3ommlNE.js";import"./interactive-graph-settings-BO46XidU.js";import"./locked-figures-section-BKHxE7xj.js";import"./locked-ellipse-settings-CNJKibaC.js";import"./scrollless-number-text-field-DKPOyT2t.js";import"./locked-label-settings-DCDEiNAK.js";import"./line-stroke-select-dNppHcxV.js";import"./line-weight-select-gV90JqXx.js";import"./locked-figure-aria-4DYBVJsn.js";import"./locked-function-settings-B25VeWrA.js";import"./line-swatch-apgWy0aW.js";import"./locked-line-settings-KljKSiqR.js";import"./locked-point-settings-DHgOonGP.js";import"./labeled-switch-DVvuYrTK.js";import"./locked-polygon-settings-CfiGYnsM.js";import"./locked-vector-settings-CsLJJSge.js";import"./label-image-editor-alSUydD-.js";import"./form-wrapped-text-field-BCi6ikV7.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CT5ABOTB.js";import"./behavior-CCorh8mk.js";import"./question-markers-BGOHBExF.js";import"./marker-DjyQoQEP.js";import"./select-image-BTZDitmw.js";import"./matcher-editor-CYV5eCkN.js";import"./number-line-editor-Dw0FH9-o.js";import"./numeric-input-editor-DqbQDfOJ.js";import"./phet-simulation-editor-MjZTsX7P.js";import"./plotter-editor-oEmt0KDl.js";import"./python-program-editor-yh1RQseu.js";import"./editor-jj0sqao1.js";import"./sorter-editor-B5xOJ_QW.js";import"./tex-error-view-CpsDlhdY.js";const a={content:`A sequence is defined recursively as follows:


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
