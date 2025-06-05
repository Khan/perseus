import{j as r,A as g,r as t,V as v}from"./iframe-Df1l_qdN.js";import"./item-version-n2dIChhg.js";import"./article-renderer-DUFs70BB.js";import"./server-item-renderer-a7Aw--JL.js";import"./hints-renderer-D3j6BERN.js";import"./index-BGDarwkb.js";import{S as W}from"./split-view-BxXq15AD.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-CWGr5rzU.js";import{E as f}from"./editor-DM_RxyDg.js";import"./article-editor-BBRzbnXK.js";import"./components-BXvGFzmc.js";import"./device-framer-d57WL-b8.js";import"./constants-kyOY0S4e.js";import"./section-control-button-D563mGvF.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BR4C4o3Z.js";import"./text-diff-Dd0A5bg1.js";import"./editor-page-B7Bl0dQ1.js";import"./item-extras-editor-eR_FF6Pa.js";import"./content-preview-D3-NJmAk.js";/* empty css                       */import"./categorizer-editor-DRshKFVx.js";import"./editor-jsonify-Dzs829uB.js";import"./blur-input-BcnwqOgn.js";import"./definition-editor-C47hQzGn.js";import"./dropdown-editor-CqhKpKDj.js";import"./explanation-editor-ESvjBR-_.js";import"./expression-editor-CnP1ZjmG.js";import"./free-response-editor-yu4gaHJ6.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Dntn-p1a.js";import"./image-editor-DBVk0brX.js";import"./input-number-editor-8BoEmDH5.js";import"./interaction-editor-ByZhB9YO.js";import"./interactive-graph-editor-CQpcuv7t.js";import"./color-select-Do5_PlVz.js";import"./Popper-D68LALif.js";import"./util-v0xq8fOo.js";import"./heading-CMOT-Oya.js";import"./toggleable-caret-Cf92G3WI.js";import"./interactive-graph-settings-C4qSixiZ.js";import"./locked-figures-section-RY736MJo.js";import"./locked-ellipse-settings-UZuxz1nD.js";import"./scrollless-number-text-field-C2i4TLpi.js";import"./locked-label-settings-BnIatLc3.js";import"./trash-bold-DWZJ7XkV.js";import"./line-stroke-select-Dh5WI0RA.js";import"./locked-figure-aria-Epm04XIR.js";import"./locked-function-settings-CVaTWKs0.js";import"./line-swatch-C9mImIo-.js";import"./locked-line-settings-D0Eqs_9B.js";import"./locked-point-settings-COSR2AfL.js";import"./labeled-switch-CmHlPrYt.js";import"./locked-polygon-settings-ZlAtUUr9.js";import"./locked-vector-settings-CoDK_2yA.js";import"./label-image-editor-B-r1k_hF.js";import"./form-wrapped-text-field-Bp1dIedE.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-N7o3Von4.js";import"./behavior-DuNjygxu.js";import"./question-markers-BY2FwoNU.js";import"./marker-D67uYefD.js";import"./select-image-mezjhAME.js";import"./matcher-editor-BnM69gxZ.js";import"./number-line-editor-BIH_jzEO.js";import"./numeric-input-editor-Dmq59eAA.js";import"./phet-simulation-editor-BiIhSSGH.js";import"./plotter-editor-CIRvuQst.js";import"./python-program-editor-DvnxwYGy.js";import"./editor-cCi5fImm.js";import"./sorter-editor-BpKNPr0G.js";import"./tex-error-view-CdJxUiF5.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const Be={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Ke=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Ke as __namedExportsOrder,Be as default};
