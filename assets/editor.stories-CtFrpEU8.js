import{j as r,A as g,r as t,V as v}from"./iframe-iAiOm5Ap.js";import"./item-version-C5i0v7iA.js";import"./article-renderer-p79UJ7Qj.js";import"./server-item-renderer-dGwu8wgv.js";import"./hints-renderer-Brs_fc6P.js";import"./index-D6aV0KZ0.js";import{S as W}from"./split-view-rHDElSr3.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-pKQzwCs8.js";import{E as f}from"./editor-CcLHbrVo.js";import"./article-editor-D7-20yHI.js";import"./components-CdSEnTNx.js";import"./device-framer-C7Q_HRs7.js";import"./constants-kyOY0S4e.js";import"./section-control-button-5jprH73U.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CEahYhOK.js";import"./text-diff-CBa8-bwW.js";import"./editor-page-D2F0_aU7.js";import"./toggleable-caret-mZJGKGBd.js";import"./trash-bold-BGuWDQ7Q.js";import"./item-extras-editor-CJkGxTnK.js";import"./content-preview-CXZI-T80.js";/* empty css                       */import"./main-CHsH8fVM.js";import"./categorizer-editor-BJ_e6R11.js";import"./editor-jsonify-BRqjKFub.js";import"./blur-input-DnA60ZYr.js";import"./definition-editor-ByDc69v1.js";import"./dropdown-editor-6xFXVtiI.js";import"./explanation-editor-eOw7ACDZ.js";import"./expression-editor-G7Q45F1x.js";import"./free-response-editor-BxnFEAlF.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-hpi6jqxc.js";import"./image-editor-CfAXApnn.js";import"./input-number-editor-upkxb_sf.js";import"./interaction-editor-_3XYyl_S.js";import"./interactive-graph-editor-BFhZt2BX.js";import"./color-select-CTDtn5_B.js";import"./Popper-Bt_XS3y4.js";import"./util-yGxPFB_n.js";import"./heading-2hgOZEuI.js";import"./interactive-graph-settings-C0PqTOME.js";import"./locked-figures-section-Cr8rLN-h.js";import"./locked-ellipse-settings-MyFGeREm.js";import"./scrollless-number-text-field-BrgzPkPA.js";import"./locked-label-settings-CY6O8gkz.js";import"./line-stroke-select-RIsl9SSu.js";import"./line-weight-select-BJxwmXG1.js";import"./locked-figure-aria-CLcyVw6I.js";import"./locked-function-settings-BYHVSgAp.js";import"./line-swatch-Cn9oZD9h.js";import"./locked-line-settings-C5rS8XS8.js";import"./locked-point-settings-BDqqJGq9.js";import"./labeled-switch-B6qccixh.js";import"./locked-polygon-settings-Mcud45N7.js";import"./locked-vector-settings-YPjc3lhh.js";import"./label-image-editor-v3AFVySp.js";import"./form-wrapped-text-field-CDYJ0_zR.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DD4UXtuu.js";import"./behavior-DgWZ9qLC.js";import"./question-markers-DgYAcR2B.js";import"./marker-JV_kdhuK.js";import"./select-image-CKW8VrxE.js";import"./matcher-editor-BN6a8tYj.js";import"./number-line-editor-dqdkxEl-.js";import"./numeric-input-editor-CrgCowhP.js";import"./phet-simulation-editor-zAmWzfCX.js";import"./plotter-editor-Cs6zZdQs.js";import"./python-program-editor-DNRRwQrA.js";import"./editor-DmPltlOM.js";import"./sorter-editor-C8M3ooTj.js";import"./tex-error-view-CfHsWoqN.js";const a={content:`A sequence is defined recursively as follows:


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
