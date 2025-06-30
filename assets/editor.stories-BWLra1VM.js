import{j as r,A as g,r as t,V as v}from"./iframe-Bcg17xLF.js";import"./item-version-Cq6y6B1E.js";import"./article-renderer-CkfdpRoI.js";import"./server-item-renderer-CUMfm4hX.js";import"./hints-renderer-CrMQM1rf.js";import"./index-C5Yj62rc.js";import{S as W}from"./split-view-BupKQDHn.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DKBY4pWA.js";import{E as f}from"./editor-BfjHW8gu.js";import"./article-editor-CxLcJEBi.js";import"./components-z5lU3uB1.js";import"./device-framer-BN6v1je7.js";import"./constants-kyOY0S4e.js";import"./section-control-button-Dxx-9te1.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BcN-nXJp.js";import"./text-diff-G9_dpSR4.js";import"./editor-page-DssmpDp6.js";import"./toggleable-caret-EIsqGJ2g.js";import"./trash-bold-VOo_FpSm.js";import"./item-extras-editor-DRo9AhgH.js";import"./content-preview-KJeamHo2.js";/* empty css                       */import"./main-CxuAGmz8.js";import"./categorizer-editor-Db0NcFe0.js";import"./editor-jsonify-nu7l0T_m.js";import"./blur-input-B3YnJjmb.js";import"./definition-editor-DKBBv0iA.js";import"./dropdown-editor-B3HVmGUi.js";import"./explanation-editor-DKHobHQl.js";import"./expression-editor-gnGR4dZP.js";import"./free-response-editor-tRwK2whz.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DXFUtCdY.js";import"./image-editor-2vvLLxF7.js";import"./input-number-editor-D5AjbUtS.js";import"./interaction-editor-B63yHUxR.js";import"./interactive-graph-editor-k-azKzbE.js";import"./color-select-B5Js-S1X.js";import"./Popper-Bksjufvv.js";import"./util-Dg7Zt9il.js";import"./heading-Eu3LUtzl.js";import"./interactive-graph-settings-B3Q-j4zj.js";import"./locked-figures-section-CWDToVw_.js";import"./locked-ellipse-settings-BYIH_cOB.js";import"./scrollless-number-text-field-D6QHuXR4.js";import"./locked-label-settings-Dof-jKA5.js";import"./line-stroke-select-dKlzNf26.js";import"./locked-figure-aria-DlJDjBMQ.js";import"./locked-function-settings-C93XwnMM.js";import"./line-swatch-BoPfg3Ut.js";import"./locked-line-settings-BsAiw3de.js";import"./locked-point-settings-CsAFNTfd.js";import"./labeled-switch-BgeUIb4I.js";import"./locked-polygon-settings-2I91X3B9.js";import"./locked-vector-settings-sIBGqgnk.js";import"./label-image-editor-BJqneing.js";import"./form-wrapped-text-field-hdvSW8SS.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-YoAtn-1S.js";import"./behavior-B91Hwsfg.js";import"./question-markers-yIUkSg30.js";import"./marker-DbEPeerE.js";import"./select-image-zNfCyBVt.js";import"./matcher-editor-D3SFDXtB.js";import"./number-line-editor-DrD5RA5h.js";import"./numeric-input-editor-BBsZiNsP.js";import"./phet-simulation-editor-B2EdowI3.js";import"./plotter-editor-DcxHINju.js";import"./python-program-editor-C3N9Q3f1.js";import"./editor-BAopyFJS.js";import"./sorter-editor-D6Kz3ZIb.js";import"./tex-error-view-BsmXNoSK.js";const a={content:`A sequence is defined recursively as follows:


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
