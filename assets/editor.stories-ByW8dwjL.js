import{j as r,A as g,r as t,V as v}from"./iframe-DGYxWGXi.js";import"./item-version-BXVugThI.js";import"./article-renderer-BO9ngR1F.js";import"./server-item-renderer-BaB5I2uk.js";import"./hints-renderer-yGCLgc6m.js";import"./index-f3OJ3ixO.js";import{S as W}from"./split-view-CnxQ2fOm.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Cp4TZs8q.js";import{E as f}from"./editor-B29Nwp-N.js";import"./article-editor-BAgE48PD.js";import"./components-s8nXXC3c.js";import"./device-framer-C-qs-ZSz.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Da-87-DW.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-C78fd7XH.js";import"./text-diff-D_RaI9X1.js";import"./editor-page-BdADK7gT.js";import"./toggleable-caret-BiQOXglo.js";import"./trash-bold-Cl2ZlcI8.js";import"./item-extras-editor-DcBbVQbT.js";import"./content-preview-DljND_Jb.js";/* empty css                       */import"./main-BX4O5LbE.js";import"./categorizer-editor-DjyyOSeb.js";import"./editor-jsonify-BKPfKVZ1.js";import"./blur-input-xqgzaHhE.js";import"./definition-editor-DpOhBw3V.js";import"./dropdown-editor-CjBlgQGB.js";import"./explanation-editor-_GL47zZU.js";import"./expression-editor-i2uVK8Bd.js";import"./free-response-editor-CU2tTL9G.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DxDScPG7.js";import"./image-editor-CfKif1Wh.js";import"./input-number-editor-CmOc2P1O.js";import"./interaction-editor-BGmu-VLy.js";import"./interactive-graph-editor-Ckm1PBsf.js";import"./color-select-qxpSuDK6.js";import"./Popper-Dv-xcPBL.js";import"./util-BK3DfBSJ.js";import"./heading-Bmwz1uJS.js";import"./interactive-graph-settings-BJwuHdYp.js";import"./locked-figures-section-4Q7ZtSw7.js";import"./locked-ellipse-settings-D7Z6THlv.js";import"./scrollless-number-text-field-B5cbdnio.js";import"./locked-label-settings-BwJBfJiH.js";import"./line-stroke-select-CZdq4v8S.js";import"./line-weight-select-DO6LI0tY.js";import"./locked-figure-aria-BuJD-gae.js";import"./locked-function-settings-O3DghSYZ.js";import"./line-swatch-CJEV8Hpu.js";import"./locked-line-settings-DFlRoSiS.js";import"./locked-point-settings-nHiLOGUl.js";import"./labeled-switch-BAAe-_eQ.js";import"./locked-polygon-settings-BOcYcv-B.js";import"./locked-vector-settings-W_OtwUUz.js";import"./label-image-editor-B1HZSSSr.js";import"./form-wrapped-text-field-DTnRT1XZ.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DPwMVSU-.js";import"./behavior-Dey4qYuN.js";import"./question-markers-he2mWti3.js";import"./marker-eK9hywxX.js";import"./select-image-3ZP_r3C0.js";import"./matcher-editor-BULcMvNK.js";import"./number-line-editor-DGOVJZf2.js";import"./numeric-input-editor-YYdxd7St.js";import"./phet-simulation-editor-DuOuli8S.js";import"./plotter-editor-BRKEcUGK.js";import"./python-program-editor-Couqy99m.js";import"./editor-BlAFpn59.js";import"./sorter-editor-ExQpgo6t.js";import"./tex-error-view-CHWPgJx_.js";const a={content:`A sequence is defined recursively as follows:


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
