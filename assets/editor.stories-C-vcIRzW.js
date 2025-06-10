import{j as r,A as g,r as t,V as v}from"./iframe-DUcWS4Kc.js";import"./item-version-DV7ga0wE.js";import"./article-renderer-DapLuozo.js";import"./server-item-renderer-C1A2hIGM.js";import"./hints-renderer-B13fU_rg.js";import"./index-BoXst6Mu.js";import{S as W}from"./split-view-CvDZe8wx.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Btnhyc8C.js";import{E as f}from"./editor-DJBNyscd.js";import"./article-editor-DyNZkm9Q.js";import"./components-CLfYsQvP.js";import"./device-framer---aWE8DD.js";import"./constants-kyOY0S4e.js";import"./section-control-button-yxQS9UxO.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-Dnsvj2LA.js";import"./text-diff-C2BQGCRG.js";import"./editor-page-BNZAqKCt.js";import"./trash-bold-BnijkUIo.js";import"./item-extras-editor-CRO3oQqt.js";import"./content-preview-BEBzZ8J2.js";/* empty css                       */import"./categorizer-editor-ClHBZKY0.js";import"./editor-jsonify-BxIPNJg-.js";import"./blur-input-Drea-u4c.js";import"./definition-editor-DLv5Nor6.js";import"./dropdown-editor-IdGNpzXS.js";import"./explanation-editor-CaQeatF_.js";import"./expression-editor-DarP9miR.js";import"./free-response-editor-UkfJtaVq.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CbNziDU6.js";import"./image-editor-DiFuTMob.js";import"./input-number-editor-C5RmOtyS.js";import"./interaction-editor-BiboXMIP.js";import"./interactive-graph-editor-uhfMoLM2.js";import"./color-select-a9Nobr8o.js";import"./Popper-btofQ6dp.js";import"./util-Bgzv3KDE.js";import"./heading-DbiXbMlM.js";import"./toggleable-caret-BqGbLwc2.js";import"./interactive-graph-settings-yLzHc-OS.js";import"./locked-figures-section-C5oM7EE_.js";import"./locked-ellipse-settings-Cc-VH33U.js";import"./scrollless-number-text-field-CAZq5pC7.js";import"./locked-label-settings-BGs6d-EP.js";import"./line-stroke-select-DyrQ6tIM.js";import"./locked-figure-aria-B2iyYikD.js";import"./locked-function-settings-eBk5WRI1.js";import"./line-swatch-CIZIpUw7.js";import"./locked-line-settings-BwL_yfk3.js";import"./locked-point-settings-BPTcuBKa.js";import"./labeled-switch-k93kJtW2.js";import"./locked-polygon-settings-CX_vXa_S.js";import"./locked-vector-settings-BlxZu4IU.js";import"./label-image-editor-C-yqO0dQ.js";import"./form-wrapped-text-field-Dt6Q3g63.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BlhtN9wh.js";import"./behavior-kElxdn92.js";import"./question-markers-DAXqbRDR.js";import"./marker-irIT6hn3.js";import"./select-image-COkhTSCR.js";import"./matcher-editor-Fw2mR70Y.js";import"./number-line-editor-C1CUIBjc.js";import"./numeric-input-editor-DrGMOEem.js";import"./phet-simulation-editor-D3CUq2Al.js";import"./plotter-editor-Ci5LrNK5.js";import"./python-program-editor-fOJ6Dut9.js";import"./editor-CrH1m6F7.js";import"./sorter-editor-Cbq8gDIU.js";import"./tex-error-view-DIHr5dvx.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const Be={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Ke=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Ke as __namedExportsOrder,Be as default};
