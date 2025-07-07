import{j as r,A as g,r as t,V as v}from"./iframe-Fv9__JIn.js";import"./item-version-Bq0Objmq.js";import"./article-renderer-UejcvxLK.js";import"./server-item-renderer-B5MufK4m.js";import"./hints-renderer-KmMPHYF1.js";import"./index-Bfe4J2uc.js";import{S as W}from"./split-view-Bkr4-wZg.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Bz8omImD.js";import{E as f}from"./editor-CqrL32IR.js";import"./article-editor-CljxL4VA.js";import"./components-D5IfPqjC.js";import"./device-framer-RIfzD3dz.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DskKrz7c.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-7BwTjtBo.js";import"./text-diff-CbE1Yr10.js";import"./editor-page-DhIcr8yS.js";import"./toggleable-caret-wjA8lorm.js";import"./trash-bold-BXOwgqOZ.js";import"./item-extras-editor-vw0gh2yQ.js";import"./content-preview-Do9-ARUK.js";/* empty css                       */import"./main-DA8rAVXf.js";import"./categorizer-editor-CdK92xD5.js";import"./editor-jsonify-Ba9Oddd3.js";import"./blur-input-CvHR3ctD.js";import"./definition-editor-B3rmB7Ql.js";import"./dropdown-editor-BZ2I3YE0.js";import"./explanation-editor-BC1C5nQv.js";import"./expression-editor-BMBk8JMD.js";import"./free-response-editor-Bs9Fmwf3.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings--GiFxtjY.js";import"./image-editor-DPpppcIQ.js";import"./input-number-editor-DP8ZYx_Z.js";import"./interaction-editor-IJ49_SdX.js";import"./interactive-graph-editor-DJ3YNJe_.js";import"./color-select-jDOn1p5o.js";import"./Popper-CbrqrQ01.js";import"./util-DTnki1AO.js";import"./heading-IrYSvwQL.js";import"./interactive-graph-settings-atxTMWV_.js";import"./locked-figures-section-Bwn059-w.js";import"./locked-ellipse-settings-BXjcohGf.js";import"./scrollless-number-text-field-C1cCFdIL.js";import"./locked-label-settings-DK-HYlXZ.js";import"./line-stroke-select-DuSL_BD5.js";import"./locked-figure-aria-BVGR8kkY.js";import"./locked-function-settings-Dwb_D8nc.js";import"./line-swatch-DQ_Eq31u.js";import"./locked-line-settings-Ccov66B6.js";import"./line-weight-select-Cqor9uhN.js";import"./locked-point-settings-K_ekoSNo.js";import"./labeled-switch-B1k5rKl3.js";import"./locked-polygon-settings-BPdgU_lx.js";import"./locked-vector-settings-C7lJMm0q.js";import"./label-image-editor-MYriBtDA.js";import"./form-wrapped-text-field-D1CIosMx.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-my3MeIXf.js";import"./behavior-OX0MO8Xm.js";import"./question-markers-CwO1_4mT.js";import"./marker-Cfyyjjq5.js";import"./select-image-B9lFjxeO.js";import"./matcher-editor-COgE6Bql.js";import"./number-line-editor-Dn6B3lzP.js";import"./numeric-input-editor-BKu4IYN1.js";import"./phet-simulation-editor-zndSJ7yy.js";import"./plotter-editor-BDtD1f_W.js";import"./python-program-editor-Er1-PXna.js";import"./editor-Dby-GK2Z.js";import"./sorter-editor-C9Ef9fbn.js";import"./tex-error-view-D5Rffe7k.js";const a={content:`A sequence is defined recursively as follows:


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
