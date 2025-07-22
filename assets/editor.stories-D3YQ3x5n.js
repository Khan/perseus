import{j as r,A as g,r as t,V as v}from"./iframe-DnQciuiI.js";import"./item-version-BNtEaiNh.js";import"./article-renderer-CNsp64T0.js";import"./server-item-renderer-Dl6dULhI.js";import"./hints-renderer-C71IX-9-.js";import"./index-DrLyNieF.js";import{S as W}from"./split-view-XNAL2oOZ.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-fGS-pcdA.js";import{E as f}from"./editor-BhZvQrXF.js";import"./article-editor-BeBdzLQf.js";import"./components-BXD-d-sH.js";import"./device-framer-DJAg3nUX.js";import"./constants-kyOY0S4e.js";import"./section-control-button-29uzAJlx.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CrUMWspY.js";import"./text-diff-C49T72E3.js";import"./editor-page-DV59PVol.js";import"./toggleable-caret-Bca1cQAv.js";import"./perseus-editor-accordion-C3tUVgCs.js";import"./item-extras-editor-CCGktNnP.js";import"./content-preview-OnvqBtJZ.js";/* empty css                       */import"./main-neYK94TM.js";import"./categorizer-editor-k-sTP_UI.js";import"./editor-jsonify-D6FPugY_.js";import"./blur-input-Kq7iZlCR.js";import"./definition-editor-4pt-jBvA.js";import"./dropdown-editor-CbdCWgIP.js";import"./explanation-editor-CKmaUphc.js";import"./expression-editor-B8lJZS8_.js";import"./free-response-editor-DjBC_LzV.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DrhC03Bu.js";import"./image-editor-CPgfMOfI.js";import"./input-number-editor-wIaWJXP5.js";import"./interaction-editor-ytLWl7BQ.js";import"./interactive-graph-editor-BpyHyyOd.js";import"./color-select-RFupFcUT.js";import"./Popper-DGJtFqDw.js";import"./util-5qZ517jZ.js";import"./heading-BCnTbhPq.js";import"./interactive-graph-settings-DzRjiF_3.js";import"./locked-figures-section-DU4exi5O.js";import"./locked-ellipse-settings-BJfZfj_s.js";import"./scrollless-number-text-field-p-xp318c.js";import"./locked-label-settings-DXuXiqp4.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-Cqjx3TNo.js";import"./line-weight-select-CwVCvAGf.js";import"./locked-figure-aria-fySmZlel.js";import"./locked-function-settings-ZIDUtnWq.js";import"./line-swatch-D34LTaMV.js";import"./locked-line-settings-DQiTCeAA.js";import"./locked-point-settings-DR-0fy-5.js";import"./labeled-switch-DzuUFEhV.js";import"./locked-polygon-settings-cDxVPo4w.js";import"./locked-vector-settings-XZoTofCF.js";import"./label-image-editor-BU7e2tJQ.js";import"./form-wrapped-text-field-YYQSgiX6.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BlikpMGu.js";import"./behavior-OZlt_Eik.js";import"./question-markers-CuVm8ZYk.js";import"./marker-DCi48NC8.js";import"./select-image-ClTZUtiO.js";import"./matcher-editor-DDO5XItr.js";import"./number-line-editor-Dgk6vHEX.js";import"./numeric-input-editor-BHKqXo-D.js";import"./phet-simulation-editor-DKS2ZvCn.js";import"./plotter-editor-BjAXjyPI.js";import"./python-program-editor-CFWGcT40.js";import"./editor-C7z3TwAa.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-B5eIWkLE.js";import"./tex-error-view-DDKrOe5_.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const He={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Qe=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Qe as __namedExportsOrder,He as default};
