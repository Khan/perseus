import{j as r,A as g,r as t,V as v}from"./iframe-DNbQgjGT.js";import"./item-version-BiARHrCi.js";import"./article-renderer-E8oLjVIL.js";import"./server-item-renderer-DT6HFeiY.js";import"./hints-renderer-DRWGABRz.js";import"./index-CNgPJ3zO.js";import{S as W}from"./split-view-Cy8U3IsT.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-CMc5Cf_m.js";import{E as f}from"./editor-Bg_DIKBE.js";import"./article-editor-DKfn78qk.js";import"./components-CGVS3hVu.js";import"./device-framer-CPKqNLh9.js";import"./constants-kyOY0S4e.js";import"./section-control-button-sYP7HYX9.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BBqT526c.js";import"./text-diff-CwUCy0Eg.js";import"./editor-page-CpX9K1-n.js";import"./trash-bold-DV2DLnq_.js";import"./item-extras-editor-BUebJjdE.js";import"./content-preview-BAy-PSSC.js";/* empty css                       */import"./main-CEdgXFZS.js";import"./categorizer-editor-C8EIGhtw.js";import"./editor-jsonify-qO9n1QOJ.js";import"./blur-input-Bwuw7nN3.js";import"./definition-editor-CL_HwGnS.js";import"./dropdown-editor-J2fr5pdO.js";import"./explanation-editor-IpPQhbfx.js";import"./expression-editor-VTTTuKNu.js";import"./free-response-editor-3018TyBW.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CErRgari.js";import"./image-editor-BNjxynyQ.js";import"./input-number-editor-BubWyuyF.js";import"./interaction-editor-BpSgDie1.js";import"./interactive-graph-editor-5gpboqA4.js";import"./color-select-2hjirrCw.js";import"./Popper-DUrDoNvt.js";import"./util-oQyb-f4h.js";import"./heading-Dz-mBSNl.js";import"./toggleable-caret-DkIB0fYY.js";import"./interactive-graph-settings-CJwEh02B.js";import"./locked-figures-section-STaurz6w.js";import"./locked-ellipse-settings-B6mDVGr_.js";import"./scrollless-number-text-field-aTts9tEH.js";import"./locked-label-settings-B6HjpmLH.js";import"./line-stroke-select-CaxWSCYy.js";import"./locked-figure-aria-Bs0LHmQW.js";import"./locked-function-settings-BQMWWSbN.js";import"./line-swatch-B1RmQghm.js";import"./locked-line-settings-CcbYebo9.js";import"./locked-point-settings-6_It75v-.js";import"./labeled-switch-49CHyqIx.js";import"./locked-polygon-settings-CcBmaVmp.js";import"./locked-vector-settings-D9f_zCBC.js";import"./label-image-editor-zsRm0vkH.js";import"./form-wrapped-text-field-mqky7jJi.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-Bwd4lbcs.js";import"./behavior-xPszhtRU.js";import"./question-markers-C5kglJxJ.js";import"./marker-CjGzhb2-.js";import"./select-image-BW5YDlg-.js";import"./matcher-editor-BOqpostU.js";import"./number-line-editor-CdJfc8aD.js";import"./numeric-input-editor-VI7ZAlAu.js";import"./phet-simulation-editor-5aSf9Xpx.js";import"./plotter-editor-Bnl6-W4c.js";import"./python-program-editor-Cb9kGlVY.js";import"./editor-DElL2_DR.js";import"./sorter-editor-5sQ7kWlQ.js";import"./tex-error-view-CdRTbgbW.js";const a={content:`A sequence is defined recursively as follows:


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
