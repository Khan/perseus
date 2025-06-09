import{j as r,A as g,r as t,V as v}from"./iframe-vtNTHGDv.js";import"./item-version-BWxdKDJ6.js";import"./article-renderer-6IuYt5fY.js";import"./server-item-renderer-DTmnVKjc.js";import"./hints-renderer-CKfy0FDV.js";import"./index-BQXweJGL.js";import{S as W}from"./split-view-D2V0K5dM.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DEfXxK5j.js";import{E as f}from"./editor-BDJ_U3wK.js";import"./article-editor-B54iSDGs.js";import"./components-DwN7FnWB.js";import"./device-framer-BKwGcDb_.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Cz22d95X.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DWXYk7_3.js";import"./text-diff-BmammWdR.js";import"./editor-page-h560YoqK.js";import"./trash-bold-Dnc91Nih.js";import"./item-extras-editor-87sMix3o.js";import"./content-preview-C3SQsieS.js";/* empty css                       */import"./categorizer-editor-CcaoP-jc.js";import"./editor-jsonify-BaW-vmsp.js";import"./blur-input-21fFJ09r.js";import"./definition-editor-CtkMZkSW.js";import"./dropdown-editor-Bjk4Zvyl.js";import"./explanation-editor-DRwXzTlU.js";import"./expression-editor-b0eUCPII.js";import"./free-response-editor-DWeAev_t.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-vvKiVWo8.js";import"./image-editor-DivmqiBB.js";import"./input-number-editor-Bobm3LRR.js";import"./interaction-editor-CYA54OK-.js";import"./interactive-graph-editor-CmnRMB7S.js";import"./color-select-xMp51Mzj.js";import"./Popper-DqUqJOM7.js";import"./util-CjbfVMCM.js";import"./heading-rsFzD0cV.js";import"./toggleable-caret-5q3XEKFn.js";import"./interactive-graph-settings-o-C6SaMl.js";import"./locked-figures-section-BG3K8ePu.js";import"./locked-ellipse-settings-B6ES2yaN.js";import"./scrollless-number-text-field-C02XBNh2.js";import"./locked-label-settings-C1kmmuEe.js";import"./line-stroke-select-t57VhVFi.js";import"./locked-figure-aria-CFWSg9Uy.js";import"./locked-function-settings-BUV4vAbq.js";import"./line-swatch-BJRrT8vC.js";import"./locked-line-settings-Bl6TGzYb.js";import"./locked-point-settings-uigXOr2L.js";import"./labeled-switch-BV_x3_qs.js";import"./locked-polygon-settings-Dv7Bia8n.js";import"./locked-vector-settings-BzQfo7nG.js";import"./label-image-editor-BLJI_h4m.js";import"./form-wrapped-text-field-DLAFL-yJ.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-B9NxOvAg.js";import"./behavior-HFJNGUPz.js";import"./question-markers-C8VUgqd9.js";import"./marker-DiP7SpWu.js";import"./select-image-BOV-JfSq.js";import"./matcher-editor-DrF7e6yo.js";import"./number-line-editor-CCfMSxR1.js";import"./numeric-input-editor-Cb0Ym9p_.js";import"./phet-simulation-editor-DnOikHyL.js";import"./plotter-editor-BIqz0WML.js";import"./python-program-editor-BtPk1S1N.js";import"./editor-_Zdobair.js";import"./sorter-editor-1-al7Vb3.js";import"./tex-error-view-dQplNoln.js";const a={content:`A sequence is defined recursively as follows:


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
