import{j as r,A as g,r as t,V as v}from"./iframe-DCWh3-Gk.js";import"./item-version-xCn4KfKi.js";import"./article-renderer-CUBxJhO5.js";import"./server-item-renderer-NjuUIoy7.js";import"./hints-renderer-U5A_Kgj2.js";import"./index-DLs565P_.js";import{S as W}from"./split-view-DCZpJIVc.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-D4hT9feT.js";import{E as f}from"./editor-fv9erP1x.js";import"./article-editor-BZjnP6QA.js";import"./components-BwjcOWjH.js";import"./device-framer-CzJ36t60.js";import"./constants-kyOY0S4e.js";import"./section-control-button-I8C_pmIF.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-D2fn8T8M.js";import"./text-diff-BrRX4BM9.js";import"./editor-page-DpQSmPub.js";import"./toggleable-caret-V2pIG45n.js";import"./trash-bold-ByhvThuc.js";import"./item-extras-editor-CCBR3XtV.js";import"./content-preview-DV_BbKW6.js";/* empty css                       */import"./main-DnAzaLZ8.js";import"./categorizer-editor-DN73Z_gd.js";import"./editor-jsonify-DZrlZhV3.js";import"./blur-input-D2zLOUux.js";import"./definition-editor-BCI-CBp7.js";import"./dropdown-editor-OxB8-fRx.js";import"./explanation-editor-BP-OMCmD.js";import"./expression-editor-D8B3tKs8.js";import"./free-response-editor-DR-yWC0c.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-Dk-fSd4O.js";import"./image-editor-BkWPba84.js";import"./input-number-editor-KZ4J28-Y.js";import"./interaction-editor-yKFgtrHz.js";import"./interactive-graph-editor-Joj9GSpg.js";import"./color-select-j3WTv9KL.js";import"./Popper-BOPsS5hJ.js";import"./util-DE9sHTJp.js";import"./heading-BwOR8Uj5.js";import"./interactive-graph-settings-D-DgUm4h.js";import"./locked-figures-section--frAz08n.js";import"./locked-ellipse-settings-DbKE4uNW.js";import"./scrollless-number-text-field-C9Z6HyDo.js";import"./locked-label-settings-nt3uwhKw.js";import"./line-stroke-select-BUJeuVVG.js";import"./locked-figure-aria-DEXq6EY6.js";import"./locked-function-settings-2N49a1am.js";import"./line-swatch-w1hJp8uj.js";import"./locked-line-settings-DK_9s9Jk.js";import"./locked-point-settings-D1wk7mnn.js";import"./labeled-switch-Dzu1YvJ5.js";import"./locked-polygon-settings-Dh4UXUWa.js";import"./locked-vector-settings-cl6YY-d7.js";import"./label-image-editor-DDbYMkGv.js";import"./form-wrapped-text-field-BieAOT6H.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-Cn6UObnf.js";import"./behavior-DJwElaGW.js";import"./question-markers-Bcr0a7nV.js";import"./marker-DGxpIAxx.js";import"./select-image-BLo8cLmw.js";import"./matcher-editor-B9F63ifr.js";import"./number-line-editor-DyHu2gSc.js";import"./numeric-input-editor-ClvKyhaY.js";import"./phet-simulation-editor-Dygh5EqS.js";import"./plotter-editor-VM1gosFk.js";import"./python-program-editor-BzkMNFD0.js";import"./editor-DGGzQTEJ.js";import"./sorter-editor-DQ2fv6Dc.js";import"./tex-error-view-KSUhL5W_.js";const a={content:`A sequence is defined recursively as follows:


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
