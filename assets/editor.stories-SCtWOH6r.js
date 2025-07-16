import{j as r,A as g,r as t,V as v}from"./iframe-Av__LOls.js";import"./item-version-CHgavrtG.js";import"./article-renderer-C0sZ0ydP.js";import"./server-item-renderer-aIl7SK8E.js";import"./hints-renderer-C2VM9sFD.js";import"./index-DU1ehN_x.js";import{S as W}from"./split-view-Cr_NQcWy.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BTFy8vm6.js";import{E as f}from"./editor-CZTflWyc.js";import"./article-editor-8GBZ97NW.js";import"./components-BrYWmJxs.js";import"./device-framer-QpvgHk4r.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Cqgha94p.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-B0oj_rcP.js";import"./text-diff-CSn_LD0y.js";import"./editor-page-4AyFeaM9.js";import"./toggleable-caret-DNzgtAzx.js";import"./trash-bold-rRr2v9fV.js";import"./item-extras-editor-BjCKEgvn.js";import"./content-preview-CxBpCb1v.js";/* empty css                       */import"./main-CTBJZJrS.js";import"./categorizer-editor-CAePWXFd.js";import"./editor-jsonify-Km9FFX7g.js";import"./blur-input-D8BetfC-.js";import"./definition-editor-BvoW593d.js";import"./dropdown-editor-B9g4NQst.js";import"./explanation-editor-DXvvTjYo.js";import"./expression-editor-Bn2DghcH.js";import"./free-response-editor-D0GwIGkl.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-UAOQk8xT.js";import"./image-editor-I9NkqvDS.js";import"./input-number-editor-CGGptDls.js";import"./interaction-editor-vrkY6mJ1.js";import"./interactive-graph-editor-pb-ovI4S.js";import"./color-select-02PaXCTn.js";import"./Popper-CA1_56rf.js";import"./util-CCGhTNPr.js";import"./heading-CiiG0P4q.js";import"./interactive-graph-settings-DeKFrGDV.js";import"./locked-figures-section-Dv79jiaI.js";import"./locked-ellipse-settings-CO5LjbDH.js";import"./scrollless-number-text-field-2FORyDxz.js";import"./locked-label-settings-CTtUMaUi.js";import"./line-stroke-select-CWY0Jjok.js";import"./line-weight-select-BPcx5QYg.js";import"./locked-figure-aria-dMeY4YzW.js";import"./locked-function-settings-DwzeAX5N.js";import"./line-swatch-5AzRRd-X.js";import"./locked-line-settings-D38duLHV.js";import"./locked-point-settings-CfvJO6PA.js";import"./labeled-switch-x2dzRBB-.js";import"./locked-polygon-settings-C3jGkoiF.js";import"./locked-vector-settings-M2V_1T4-.js";import"./label-image-editor-MoYBSErp.js";import"./form-wrapped-text-field-BglACEl8.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-0bPJ3O20.js";import"./behavior-B0OnLTZm.js";import"./question-markers-CZw4nU8n.js";import"./marker-Chd1XQHL.js";import"./select-image-BVkBGP9I.js";import"./matcher-editor-9kRWj0IF.js";import"./number-line-editor-BXPBAOPD.js";import"./numeric-input-editor-DHmNbSbU.js";import"./phet-simulation-editor-CwPqTwIp.js";import"./plotter-editor-DtxlTk8e.js";import"./python-program-editor-C80nXyv2.js";import"./editor-DKjDlydn.js";import"./sorter-editor-B16-AAao.js";import"./tex-error-view-BXdy8aFD.js";const a={content:`A sequence is defined recursively as follows:


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
