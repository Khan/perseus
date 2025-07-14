import{j as r,A as g,r as t,V as v}from"./iframe-C-YZwPnJ.js";import"./item-version-OzlzzROo.js";import"./article-renderer-CmWwmVzJ.js";import"./server-item-renderer-DHiEvEo0.js";import"./hints-renderer-CSsTWbgg.js";import"./index-CgIYZauJ.js";import{S as W}from"./split-view-Dw36UAWP.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-YS4pqvva.js";import{E as f}from"./editor-ubR_Ccbc.js";import"./article-editor-DsZSqgC8.js";import"./components-Bva_OheH.js";import"./device-framer-CXdSaXkF.js";import"./constants-kyOY0S4e.js";import"./section-control-button-gS7MHXdV.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-B3ZGuYgU.js";import"./text-diff-DV69SoC0.js";import"./editor-page-BENQSikb.js";import"./toggleable-caret-B7wbmvFn.js";import"./trash-bold-BDudMrDq.js";import"./item-extras-editor-C3i-P_sm.js";import"./content-preview-DIsoTnhP.js";/* empty css                       */import"./main-CXiizIfV.js";import"./categorizer-editor-C1mM4SCg.js";import"./editor-jsonify-CeazrAxZ.js";import"./blur-input-DuX76x9h.js";import"./definition-editor-CpkHNTx7.js";import"./dropdown-editor-Bm2CodkL.js";import"./explanation-editor-DMEAVEZJ.js";import"./expression-editor-wfbO_Riq.js";import"./free-response-editor-BkAMdfi8.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-0izPzAzl.js";import"./image-editor-D0RwUhLh.js";import"./input-number-editor-Dgc0TVwd.js";import"./interaction-editor-DrTRdOsr.js";import"./interactive-graph-editor-BkH181Jj.js";import"./color-select-DW3ntfE2.js";import"./Popper-CXH154Pb.js";import"./util-A4MrrFAC.js";import"./heading-BHkqyD8v.js";import"./interactive-graph-settings-B8qG6ksL.js";import"./locked-figures-section-DBuhbXPL.js";import"./locked-ellipse-settings-C2elm4ja.js";import"./scrollless-number-text-field-C4giiXWl.js";import"./locked-label-settings-CTTx_5Ib.js";import"./line-stroke-select-DYPNiWkK.js";import"./line-weight-select-BnnK0xFp.js";import"./locked-figure-aria-BfJCw69Z.js";import"./locked-function-settings-BVf0Ayry.js";import"./line-swatch-CPbvusn6.js";import"./locked-line-settings-DtFtkLX4.js";import"./locked-point-settings-9-czYM1g.js";import"./labeled-switch-DGIS2mfZ.js";import"./locked-polygon-settings-BozYejbU.js";import"./locked-vector-settings-IPiG_LkP.js";import"./label-image-editor-C9jDXsbx.js";import"./form-wrapped-text-field-Q1uIJiBa.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BJM4Pclh.js";import"./behavior-9p9NtKtN.js";import"./question-markers-CZra4Jhl.js";import"./marker-6BuZ8O7P.js";import"./select-image-CSUBmE7v.js";import"./matcher-editor-3ujF3FhD.js";import"./number-line-editor-CeIBiwoc.js";import"./numeric-input-editor-DGECtp8M.js";import"./phet-simulation-editor-_7oFCgNG.js";import"./plotter-editor-Dk1XZFE3.js";import"./python-program-editor-D-i4fmt4.js";import"./editor-Dd9afoHt.js";import"./sorter-editor-B2BrEsm_.js";import"./tex-error-view-DmzVw3wE.js";const a={content:`A sequence is defined recursively as follows:


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
