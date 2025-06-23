import{j as r,A as g,r as t,V as v}from"./iframe-JwIKGAjj.js";import"./item-version-ARiCEFOU.js";import"./article-renderer-9ES78zh7.js";import"./server-item-renderer-Ck3ZIC3R.js";import"./hints-renderer-B78aTo8X.js";import"./index-CjnQ8-1-.js";import{S as W}from"./split-view-BvE3nnTd.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-AGnMG9fx.js";import{E as f}from"./editor-D0vMHvgt.js";import"./article-editor-CcNfGOdA.js";import"./components-B97u6owF.js";import"./device-framer-Bf4b7-pg.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CdArE95J.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-TgRtCoTJ.js";import"./text-diff-m-DKoKPg.js";import"./editor-page-zrDg3y35.js";import"./toggleable-caret-DV9XSWWj.js";import"./trash-bold-CB0SclRT.js";import"./item-extras-editor-DwAPElET.js";import"./content-preview-CiWjkVUO.js";/* empty css                       */import"./main-xg19YKug.js";import"./categorizer-editor-C3bA4j_5.js";import"./editor-jsonify-wZCcAgKc.js";import"./blur-input-DHwuACjU.js";import"./definition-editor-Da7tVhuv.js";import"./dropdown-editor-Dtu7Czq3.js";import"./explanation-editor-COsoildn.js";import"./expression-editor-2Omj4zTH.js";import"./free-response-editor-DGIY10ct.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CfXoYthr.js";import"./image-editor-D25iVG10.js";import"./input-number-editor-2tXHJlKg.js";import"./interaction-editor-DxUEy-Gs.js";import"./interactive-graph-editor-u0AMHmd2.js";import"./color-select-DAvFGwVO.js";import"./Popper-FXiokIzt.js";import"./util-COBBksVd.js";import"./heading-D2iov7oc.js";import"./interactive-graph-settings-CgAz0dQa.js";import"./locked-figures-section--gZ_fCt_.js";import"./locked-ellipse-settings-CHz66PGx.js";import"./scrollless-number-text-field-COsXlPuF.js";import"./locked-label-settings-CiSqCmqO.js";import"./line-stroke-select-wq2TFoSn.js";import"./locked-figure-aria-B91BmKgj.js";import"./locked-function-settings-yB0EkluS.js";import"./line-swatch-BAzH_MiP.js";import"./locked-line-settings-BeAiIkN5.js";import"./locked-point-settings-CiijpLaU.js";import"./labeled-switch-CtB3yO7C.js";import"./locked-polygon-settings-CU-D6jl5.js";import"./locked-vector-settings-B8I14FLE.js";import"./label-image-editor-_InDTwiE.js";import"./form-wrapped-text-field-CNVcpY8v.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-jboR_gXM.js";import"./behavior-yy-cRj9W.js";import"./question-markers-DoSrZdfn.js";import"./marker-D2NTHoAk.js";import"./select-image-DfKYJw7U.js";import"./matcher-editor-DnU9dK6J.js";import"./number-line-editor-CVHpdG6J.js";import"./numeric-input-editor-ByBKJ7gd.js";import"./phet-simulation-editor-CyoRM3Rk.js";import"./plotter-editor-9IOkjYWZ.js";import"./python-program-editor-BA04KR_r.js";import"./editor-BzxBGek5.js";import"./sorter-editor-0ZXU_utw.js";import"./tex-error-view-CwcGQtu8.js";const a={content:`A sequence is defined recursively as follows:


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
