import{j as r,A as g,r as t,V as v}from"./iframe-BrZ1H8ZK.js";import"./item-version-DFykEjDa.js";import"./article-renderer-BGqm1xOZ.js";import"./server-item-renderer-BFvp-8bw.js";import"./hints-renderer-CIxBRI6H.js";import"./index-BMPWq8RW.js";import{S as W}from"./split-view-TGSK-kAx.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-n4lZ9AEc.js";import{E as f}from"./editor-BPCxn8SW.js";import"./article-editor-Bj62-ox0.js";import"./components-CZOyNMWg.js";import"./device-framer-0aSv1REI.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CoewC2tM.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DNubgWQV.js";import"./text-diff-BptpzC29.js";import"./editor-page-ylYjjN0w.js";import"./toggleable-caret-DZEUx8d8.js";import"./trash-bold-DfvYDK3y.js";import"./item-extras-editor-BQocDdtS.js";import"./content-preview-B0SPCIF0.js";/* empty css                       */import"./main-CiUM6vVz.js";import"./categorizer-editor-CkyzvBi8.js";import"./editor-jsonify-DkeyoGPg.js";import"./blur-input-DaU0d739.js";import"./definition-editor-BPPnM4GO.js";import"./dropdown-editor-BLbNz2b2.js";import"./explanation-editor-BWXmQOrh.js";import"./expression-editor-QtMQkIxO.js";import"./free-response-editor-BsUaA2fy.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-D3Tdx5Pp.js";import"./image-editor-BM8eBFZW.js";import"./input-number-editor-CZqeAf7U.js";import"./interaction-editor-CivZKX2r.js";import"./interactive-graph-editor-D7sOCsr7.js";import"./color-select-Drqrxf9j.js";import"./Popper-El47U0sO.js";import"./util-BV9IRbPv.js";import"./heading-Dd5mYZzd.js";import"./interactive-graph-settings-BvfTjhxW.js";import"./locked-figures-section-BYxtfvJ6.js";import"./locked-ellipse-settings-Duig0Tr5.js";import"./scrollless-number-text-field-1eYC2IET.js";import"./locked-label-settings-DRY8G7F1.js";import"./line-stroke-select-CQ7mA6Xk.js";import"./locked-figure-aria-FozlI6ws.js";import"./locked-function-settings-D2Qk7O58.js";import"./line-swatch-BEK_bS3V.js";import"./locked-line-settings-BCPXBDJM.js";import"./locked-point-settings-6NYl--m6.js";import"./labeled-switch-q8D-dq2g.js";import"./locked-polygon-settings-C8nnjHoJ.js";import"./locked-vector-settings-DfVvfGi_.js";import"./label-image-editor-CuJ4kDdU.js";import"./form-wrapped-text-field-ZGIbKmEL.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DVinprsf.js";import"./behavior-BuCez7rU.js";import"./question-markers-J5PF3YaH.js";import"./marker-nbHGOXYq.js";import"./select-image-DA_bcft9.js";import"./matcher-editor-BCl0a2uS.js";import"./number-line-editor-B5lqkXQ8.js";import"./numeric-input-editor-BJjzUQ3G.js";import"./phet-simulation-editor-D_FDdd5T.js";import"./plotter-editor-B-95N2xS.js";import"./python-program-editor-DmbUvnBq.js";import"./editor-Dtx_JCvo.js";import"./sorter-editor-Cfdo7Bpc.js";import"./tex-error-view-B4-eoGwD.js";const a={content:`A sequence is defined recursively as follows:


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
