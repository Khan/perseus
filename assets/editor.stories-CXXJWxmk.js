import{j as r,A as g,r as t,V as v}from"./iframe-Cn2sr9XL.js";import"./item-version-CTN-kA__.js";import"./article-renderer-Cb_B2GZZ.js";import"./server-item-renderer-Ba-JUrlz.js";import"./hints-renderer-Dp6eZWrp.js";import"./index-D31F2Q3H.js";import{S as W}from"./split-view-k1ARwNC6.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-C4DitOy9.js";import{E as f}from"./editor-BodsxdJm.js";import"./article-editor-hquIlUAg.js";import"./components-DoZqPXTQ.js";import"./device-framer-BKh1cIuF.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DYi_53rr.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BvzE9l75.js";import"./text-diff-BpiZTZIi.js";import"./editor-page-DtWysHjf.js";import"./toggleable-caret-Gl0fg2fC.js";import"./trash-bold-CxYA3pEV.js";import"./item-extras-editor-DeI_mwsI.js";import"./content-preview-CyXNkC9e.js";/* empty css                       */import"./main-vtU6t8bi.js";import"./categorizer-editor-DKrCyf0F.js";import"./editor-jsonify-MeD1TNub.js";import"./blur-input-DNyLMlvW.js";import"./definition-editor--sAEZiHj.js";import"./dropdown-editor-DjB7o-BN.js";import"./explanation-editor-DwYUoETq.js";import"./expression-editor-LhT7sZ8Z.js";import"./free-response-editor-Bt-KxGuc.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CwcHmjTB.js";import"./image-editor-C24s38e6.js";import"./input-number-editor-DNQ9D57J.js";import"./interaction-editor-DUz4lqlV.js";import"./interactive-graph-editor-CpwrOeqo.js";import"./color-select-DnTLIDUM.js";import"./Popper-B91G_J1J.js";import"./util-BxRJXdXY.js";import"./heading-CXFUpfLN.js";import"./interactive-graph-settings-DaYMhLXg.js";import"./locked-figures-section-CtGnz0KK.js";import"./locked-ellipse-settings-CetbMdPj.js";import"./scrollless-number-text-field-D33ovrgT.js";import"./locked-label-settings-CoxZeMn2.js";import"./line-stroke-select-Lqk_zGca.js";import"./line-weight-select-Dvy8Wfl1.js";import"./locked-figure-aria-DLdl6QaE.js";import"./locked-function-settings-mBnBupYa.js";import"./line-swatch-D7h7Kmaw.js";import"./locked-line-settings-BHE1-9el.js";import"./locked-point-settings-DdhmbWw7.js";import"./labeled-switch-lLcMj7Fp.js";import"./locked-polygon-settings-Djc4FPZO.js";import"./locked-vector-settings-Dlt4ix6_.js";import"./label-image-editor-B_eGwhUx.js";import"./form-wrapped-text-field-B_bSf_eG.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-e0TXcy1Q.js";import"./behavior-DBYo1Dvh.js";import"./question-markers-BXquL5f9.js";import"./marker-B3ucY-63.js";import"./select-image-2UJOVZcb.js";import"./matcher-editor-CXm9Kejj.js";import"./number-line-editor-BzG4LgOT.js";import"./numeric-input-editor-uidokxdW.js";import"./phet-simulation-editor-ANoUdcoa.js";import"./plotter-editor-BOtXeNYS.js";import"./python-program-editor-DEu2VLk8.js";import"./editor-D0GbNygM.js";import"./sorter-editor-cuydCywW.js";import"./tex-error-view-DQAL7Lmx.js";const a={content:`A sequence is defined recursively as follows:


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
