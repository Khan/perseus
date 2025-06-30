import{j as r,A as g,r as t,V as v}from"./iframe-BFBE40jw.js";import"./item-version-DPPrvkrd.js";import"./article-renderer-CEcI6UIH.js";import"./server-item-renderer-McPgKEqx.js";import"./hints-renderer-C00xdREK.js";import"./index-CilG1rTY.js";import{S as W}from"./split-view-D_S1VYfb.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-xWXj1Fe6.js";import{E as f}from"./editor-DeQ6VXZ8.js";import"./article-editor-DnZeQAZO.js";import"./components-BKDWucW4.js";import"./device-framer-DN_ISEFT.js";import"./constants-kyOY0S4e.js";import"./section-control-button-zn5lOq6i.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DhzBeoTo.js";import"./text-diff-DiNLJHsi.js";import"./editor-page-D7Uboqsh.js";import"./toggleable-caret-D3ue1a8q.js";import"./trash-bold-Bkx6RHOP.js";import"./item-extras-editor-Cz1zCols.js";import"./content-preview-C_IoGVam.js";/* empty css                       */import"./main-D-xQUaR-.js";import"./categorizer-editor-CPwcp4_7.js";import"./editor-jsonify-JY1yjbF3.js";import"./blur-input-BI9sm2LS.js";import"./definition-editor-Gk0GXflM.js";import"./dropdown-editor-ip0JAo8r.js";import"./explanation-editor-BOSyRlH-.js";import"./expression-editor-Be3uPOoS.js";import"./free-response-editor-hx5xfEW6.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-3Xe2UA_j.js";import"./image-editor-BipYV6hD.js";import"./input-number-editor-Dzvcs1K_.js";import"./interaction-editor-DljR6n3Z.js";import"./interactive-graph-editor-BYh6yG1k.js";import"./color-select-BFqrC3IC.js";import"./Popper-iHmo5qQ4.js";import"./util-DpNWkRrm.js";import"./heading-mZNtMeZl.js";import"./interactive-graph-settings-BupGFKi7.js";import"./locked-figures-section-CzWMPM_y.js";import"./locked-ellipse-settings-BgYz8i8m.js";import"./scrollless-number-text-field-9Q1LO1WF.js";import"./locked-label-settings-BD8wS156.js";import"./line-stroke-select-q8ljRCik.js";import"./locked-figure-aria-CFUE7Qjc.js";import"./locked-function-settings-ghjHOhKE.js";import"./line-swatch-BI4vYFVC.js";import"./locked-line-settings-9-A2oz8G.js";import"./locked-point-settings-CfJHaqW5.js";import"./labeled-switch-1-0SuBBy.js";import"./locked-polygon-settings-D4U-362l.js";import"./locked-vector-settings-kUJvDPfR.js";import"./label-image-editor-B-nnchFq.js";import"./form-wrapped-text-field-BHQcwVue.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DAvDn3BK.js";import"./behavior-qo43fJzo.js";import"./question-markers-50ZKTLaj.js";import"./marker-vIMVp0nR.js";import"./select-image-BKQKN9E3.js";import"./matcher-editor-jx3-Xjgb.js";import"./number-line-editor-BVPe66Mc.js";import"./numeric-input-editor-D8Gcw5Kr.js";import"./phet-simulation-editor-CDRKUWtl.js";import"./plotter-editor-q9aE9qco.js";import"./python-program-editor-3w6r1cM1.js";import"./editor-1z_ojSc3.js";import"./sorter-editor-YXSoO_I2.js";import"./tex-error-view-CYobFMqi.js";const a={content:`A sequence is defined recursively as follows:


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
