import{j as r,A as g,r as t,V as v}from"./iframe-BfGmgqQL.js";import"./item-version-BDaxewFE.js";import"./article-renderer-CN8BN6YT.js";import"./server-item-renderer-D3LnnBfW.js";import"./hints-renderer-DT9PPkpF.js";import"./index-Dlq5YCXC.js";import{S as W}from"./split-view-ygYLQVoC.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BEmBbFfI.js";import{E as f}from"./editor-q1vFL8_x.js";import"./article-editor-C7NtYYMp.js";import"./components-B0sfFe2K.js";import"./device-framer--SDFNFYl.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Dij1TkUV.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-911TqiBv.js";import"./text-diff-BSLfeESM.js";import"./editor-page-Cp0qztdP.js";import"./toggleable-caret-BK0E61Ku.js";import"./trash-bold-Brgr7b7T.js";import"./item-extras-editor-DGhc5Ait.js";import"./content-preview-Jo2B_c_r.js";/* empty css                       */import"./main-DE26w2_6.js";import"./categorizer-editor-Ct-RWZCK.js";import"./editor-jsonify-hKOQG5IF.js";import"./blur-input-ScdO5EIY.js";import"./definition-editor-GO07-oqz.js";import"./dropdown-editor-CkwvdKoX.js";import"./explanation-editor-DJ5Jbx22.js";import"./expression-editor-WBGk8eLP.js";import"./free-response-editor-bkDfGhjl.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CLhcEQ9L.js";import"./image-editor-5OPOtLha.js";import"./input-number-editor-BWmhS4Or.js";import"./interaction-editor-CdSwD_om.js";import"./interactive-graph-editor-DJtHHWRU.js";import"./color-select-BL-iSzCn.js";import"./Popper-B6Qw_wGp.js";import"./util-ehWwi9-K.js";import"./heading-B1d5Xxfj.js";import"./interactive-graph-settings-npmiwlfk.js";import"./locked-figures-section-BbrwNqrV.js";import"./locked-ellipse-settings-BnvYtcfe.js";import"./scrollless-number-text-field-DuNqBrh9.js";import"./locked-label-settings-B2lUxUhK.js";import"./line-stroke-select-Ckyq44lU.js";import"./line-weight-select-BtJGrbfT.js";import"./locked-figure-aria-CFlU2oqz.js";import"./locked-function-settings-Bq1xenA5.js";import"./line-swatch-B3hM_3t_.js";import"./locked-line-settings-DqZmeCgR.js";import"./locked-point-settings-DA8w8tKn.js";import"./labeled-switch-CCJGdtN_.js";import"./locked-polygon-settings-DiMaEcSk.js";import"./locked-vector-settings-q7uCWSRi.js";import"./label-image-editor-Bj5_fpXi.js";import"./form-wrapped-text-field-DAmiHtFk.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CmVxJZ3r.js";import"./behavior-By0lk3HG.js";import"./question-markers-bIhogTji.js";import"./marker-BTDLYge_.js";import"./select-image-C0BC2xU8.js";import"./matcher-editor-B1xS62Br.js";import"./number-line-editor-BRU4JeWW.js";import"./numeric-input-editor-BPxR3Myp.js";import"./phet-simulation-editor-LhqH1pRy.js";import"./plotter-editor-DSkd_zwa.js";import"./python-program-editor-CbmYXBNv.js";import"./editor-BKRxCs_X.js";import"./sorter-editor-Sin-DnnE.js";import"./tex-error-view-BSwfOKYl.js";const a={content:`A sequence is defined recursively as follows:


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
