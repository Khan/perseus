import{j as r,A as g,r as t,V as v}from"./iframe-8K8iPrpx.js";import"./item-version-FZDypMGe.js";import"./article-renderer-CR1fMGzP.js";import"./server-item-renderer-KPt9k4Nr.js";import"./hints-renderer-1O0YE-j9.js";import"./index-CACR9Ryv.js";import{S as W}from"./split-view-DUfEELIt.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-pHhs_QUT.js";import{E as f}from"./editor-DeVR3L1y.js";import"./article-editor-Vpc2t1fP.js";import"./components-B9E5XdeO.js";import"./device-framer-yC4dBCa4.js";import"./constants-kyOY0S4e.js";import"./section-control-button-5Z6MxhWZ.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-D9HYI8cI.js";import"./text-diff-CCx0IZU4.js";import"./editor-page-DvYBHcbJ.js";import"./toggleable-caret-m_JH6YZ5.js";import"./trash-bold-D694LOwc.js";import"./item-extras-editor-DfttJKn3.js";import"./content-preview-ES5-btMk.js";/* empty css                       */import"./main-CbQhiXlW.js";import"./categorizer-editor-CH6jaL4T.js";import"./editor-jsonify-pVTZRTA_.js";import"./blur-input-Bte1lp2g.js";import"./definition-editor-m338D0UL.js";import"./dropdown-editor-ZeQUHZ4z.js";import"./explanation-editor-C-asCSgi.js";import"./expression-editor-0NLuGK1E.js";import"./free-response-editor-CbNcRHWf.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CfF921NL.js";import"./image-editor-D9cdePrI.js";import"./input-number-editor-CzznpfVT.js";import"./interaction-editor-DBtP4jaC.js";import"./interactive-graph-editor-DEgT49GR.js";import"./color-select-C0km1Y9B.js";import"./Popper-hPDgkMc9.js";import"./util-Db-GkxCq.js";import"./heading-DrDZst5C.js";import"./interactive-graph-settings-CcuZuLRw.js";import"./locked-figures-section-B_wsAgoi.js";import"./locked-ellipse-settings-BSrscMpg.js";import"./scrollless-number-text-field-0vBP349P.js";import"./locked-label-settings-BybDvbi_.js";import"./line-stroke-select-CSgjJZG8.js";import"./line-weight-select-BF8rCezy.js";import"./locked-figure-aria-BKhuoMhS.js";import"./locked-function-settings-DxzlmQTQ.js";import"./line-swatch-Dmh6rfEs.js";import"./locked-line-settings-BanRpHwE.js";import"./locked-point-settings-D5dLSWtN.js";import"./labeled-switch-CU5ryvh5.js";import"./locked-polygon-settings-DOQjRatq.js";import"./locked-vector-settings-p_dQ5_Sf.js";import"./label-image-editor-BYsP3guy.js";import"./form-wrapped-text-field-9gNHHqir.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-C3PkPF3L.js";import"./behavior-s8msKsNh.js";import"./question-markers-CzukQpCf.js";import"./marker-CZ2QH2m9.js";import"./select-image-fLyfHRVp.js";import"./matcher-editor-nNrUYdW1.js";import"./number-line-editor-BB5JXf1P.js";import"./numeric-input-editor-B80HFlb1.js";import"./phet-simulation-editor-BfP6OVGW.js";import"./plotter-editor-jZYoFbdW.js";import"./python-program-editor-cgUlUvdI.js";import"./editor-DXKoNbeN.js";import"./sorter-editor-BpQx0bO4.js";import"./tex-error-view-DbGAoWDT.js";const a={content:`A sequence is defined recursively as follows:


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
