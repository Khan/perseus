import{j as r,A as g,r as t,V as v}from"./iframe-dtRUXA0K.js";import"./item-version-DMJCE50v.js";import"./article-renderer-Byw2HVqp.js";import"./server-item-renderer-qMN3rKYq.js";import"./hints-renderer-vaNkg7zC.js";import"./index-UG9Puh5_.js";import{S as W}from"./split-view-C6cAczSB.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Bswx9S4K.js";import{E as f}from"./editor-DPBb9hbb.js";import"./article-editor-C0YVRBKV.js";import"./components-sXKLdkR2.js";import"./device-framer-CVPngQcS.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CAN7GaYt.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BUvGZ_2q.js";import"./text-diff-v-TePf6A.js";import"./editor-page-DgNCuXDV.js";import"./toggleable-caret-FKh2f3cJ.js";import"./trash-bold-jwHsoyvY.js";import"./item-extras-editor-B5phcCki.js";import"./content-preview-D-y8gAOF.js";/* empty css                       */import"./main-DAJre5IF.js";import"./categorizer-editor-Nvm-Rge-.js";import"./editor-jsonify-BK2puvMH.js";import"./blur-input-GikePJ4F.js";import"./definition-editor-IAKdLVkD.js";import"./dropdown-editor-C_AGkCUu.js";import"./explanation-editor-Cohofm0w.js";import"./expression-editor-CVoq22FZ.js";import"./free-response-editor-BX7LQqPG.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BFawUweO.js";import"./image-editor-Dg0iR2jZ.js";import"./input-number-editor-CJ_urFnO.js";import"./interaction-editor-Bhz_z4-Y.js";import"./interactive-graph-editor-Bop4JAOf.js";import"./color-select-BzE4WvfI.js";import"./Popper-C2-c6jHx.js";import"./util-CfvQLB2H.js";import"./heading-COfVQ2wF.js";import"./interactive-graph-settings-CMTEbS4c.js";import"./locked-figures-section-DoYotTrq.js";import"./locked-ellipse-settings-ChHN6Ppf.js";import"./scrollless-number-text-field-D0lIy96v.js";import"./locked-label-settings-DtT-Xtg4.js";import"./line-stroke-select-iLpAr8tM.js";import"./line-weight-select-D-rkj1hD.js";import"./locked-figure-aria-Dw1In3RR.js";import"./locked-function-settings-DJU3WB-P.js";import"./line-swatch-Ao22XXhz.js";import"./locked-line-settings-C4KQpR7W.js";import"./locked-point-settings-DIR5ME7l.js";import"./labeled-switch-DhF5QZEX.js";import"./locked-polygon-settings-Dk9DD4Yd.js";import"./locked-vector-settings-CsYKgRQH.js";import"./label-image-editor-D8waL1Vb.js";import"./form-wrapped-text-field-CU_j1fz1.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CjlycIN-.js";import"./behavior-UAd_bjJw.js";import"./question-markers-MZacQpg_.js";import"./marker-eqRrQpXR.js";import"./select-image-CAkyRsam.js";import"./matcher-editor-CAAjAhSt.js";import"./number-line-editor-DR-L3oLf.js";import"./numeric-input-editor-DiY72Sgk.js";import"./phet-simulation-editor-cTKoJI0U.js";import"./plotter-editor-D9-o9dDh.js";import"./python-program-editor-CytqBLCj.js";import"./editor-BZam6nXV.js";import"./sorter-editor-0td1Cn32.js";import"./tex-error-view-CN1dxX8R.js";const a={content:`A sequence is defined recursively as follows:


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
