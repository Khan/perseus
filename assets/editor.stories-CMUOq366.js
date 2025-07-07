import{j as r,A as g,r as t,V as v}from"./iframe-BILzkKRO.js";import"./item-version-C8UhxAl3.js";import"./article-renderer-CVOzbHwq.js";import"./server-item-renderer-BupeiuMF.js";import"./hints-renderer-BGUZEZ3V.js";import"./index-_A3CgMj_.js";import{S as W}from"./split-view-CsU0ijNY.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BTZ-H2Ye.js";import{E as f}from"./editor-CyIC1f7y.js";import"./article-editor-DExNlHex.js";import"./components-Cj7GY96Z.js";import"./device-framer-C5z_bcPM.js";import"./constants-kyOY0S4e.js";import"./section-control-button-B3AjsJJS.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-Der3bX_3.js";import"./text-diff-hTXJRhRg.js";import"./editor-page-CgweR3EE.js";import"./toggleable-caret-QZfatxQ4.js";import"./trash-bold-Co_9nyHz.js";import"./item-extras-editor-7DPfML2u.js";import"./content-preview-D7pkI2eC.js";/* empty css                       */import"./main-CzrGIgb2.js";import"./categorizer-editor-Cu-DFECU.js";import"./editor-jsonify-Ba2AjJpJ.js";import"./blur-input-VYcP-8ay.js";import"./definition-editor-D92Kfh2n.js";import"./dropdown-editor-BDqfwoE6.js";import"./explanation-editor-KcgmsLit.js";import"./expression-editor-DGOX6Zg_.js";import"./free-response-editor-vP01j7-0.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DMXTbaPY.js";import"./image-editor--UEllt8-.js";import"./input-number-editor-DvKcNQAG.js";import"./interaction-editor-CvTpxkJw.js";import"./interactive-graph-editor-LjFqUPVw.js";import"./color-select-BprMzO6O.js";import"./Popper-CLpPPWl3.js";import"./util-rMrxO8bv.js";import"./heading-0oNVnUkx.js";import"./interactive-graph-settings-CbX50LFX.js";import"./locked-figures-section-pvK-ghgP.js";import"./locked-ellipse-settings-CAp-JtI0.js";import"./scrollless-number-text-field-BQQxkNQ1.js";import"./locked-label-settings-UcW8xMYx.js";import"./line-stroke-select-T_1rvKa4.js";import"./locked-figure-aria-BdRLl7Iq.js";import"./locked-function-settings-COxAGdNi.js";import"./line-swatch-CymnLI0i.js";import"./locked-line-settings-CIQ0PHcp.js";import"./line-weight-select-DKvNhGry.js";import"./locked-point-settings-Bs6OCZVY.js";import"./labeled-switch-BGgmZ_Mw.js";import"./locked-polygon-settings-C0JnfDRc.js";import"./locked-vector-settings-QO35Hiix.js";import"./label-image-editor-dbt6nIje.js";import"./form-wrapped-text-field-MJLQYJQ7.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CLV6kwVd.js";import"./behavior-D4vr7NqP.js";import"./question-markers-D-6VYrGI.js";import"./marker-_acXbbPK.js";import"./select-image-BRufCab7.js";import"./matcher-editor-0O8qcbkS.js";import"./number-line-editor-D_vFW7W8.js";import"./numeric-input-editor-uJoXUUEp.js";import"./phet-simulation-editor-aRJuvRU7.js";import"./plotter-editor-DTy-ZQjp.js";import"./python-program-editor-BgPddLjO.js";import"./editor-ClvfNrVi.js";import"./sorter-editor-Bb959V2y.js";import"./tex-error-view-G27IY_RD.js";const a={content:`A sequence is defined recursively as follows:


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
