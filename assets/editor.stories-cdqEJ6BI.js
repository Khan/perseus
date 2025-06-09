import{j as r,A as g,r as t,V as v}from"./iframe-DTktfcfm.js";import"./item-version-BvWhgKyI.js";import"./article-renderer-D4VzMFep.js";import"./server-item-renderer-CJUvzYwm.js";import"./hints-renderer-Dab54eyk.js";import"./index-CvMmWB1T.js";import{S as W}from"./split-view-EcbTNUFI.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BEcL9Qui.js";import{E as f}from"./editor-BHRTv0WF.js";import"./article-editor-Dt382L0t.js";import"./components-B5t7-my3.js";import"./device-framer-DbEg85nH.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CKIU6YCn.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-V1FNWrrW.js";import"./text-diff-DXkYckQm.js";import"./editor-page-xHu2I5oW.js";import"./trash-bold-CHhxdmM7.js";import"./item-extras-editor-CZ0ndoV-.js";import"./content-preview-BFXDsC2r.js";/* empty css                       */import"./categorizer-editor-DII5f4yZ.js";import"./editor-jsonify-BUUM_9jw.js";import"./blur-input-BvoTar4Q.js";import"./definition-editor-Dob_HGoe.js";import"./dropdown-editor-DkXHKtbh.js";import"./explanation-editor-CQ49zMSU.js";import"./expression-editor-Dug8rAgT.js";import"./free-response-editor-D56MEebY.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CC2rCcf2.js";import"./image-editor-BI-NLRPX.js";import"./input-number-editor-CKExyiDn.js";import"./interaction-editor-DGgOLBTU.js";import"./interactive-graph-editor-DYDpNPSd.js";import"./color-select-DgKfqFoq.js";import"./Popper-DlaF0ENk.js";import"./util-Bn69jzv6.js";import"./heading-ch1yxYo0.js";import"./toggleable-caret-DTKWgYtv.js";import"./interactive-graph-settings-D7Lo1Sfj.js";import"./locked-figures-section-BVWCUJHa.js";import"./locked-ellipse-settings-CVHmlFPX.js";import"./scrollless-number-text-field-B54fnWRI.js";import"./locked-label-settings-mKUISBaq.js";import"./line-stroke-select-BYns5wdv.js";import"./locked-figure-aria-CQfizhEc.js";import"./locked-function-settings-D_Zqd-ho.js";import"./line-swatch-DfW98qhs.js";import"./locked-line-settings-BhXd-jii.js";import"./locked-point-settings-tIq3Ieev.js";import"./labeled-switch-DJTlJ4P5.js";import"./locked-polygon-settings-CNGFe6tu.js";import"./locked-vector-settings-BP82AbKh.js";import"./label-image-editor-BknXZWpv.js";import"./form-wrapped-text-field-DnuWsUTw.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BDYjpegh.js";import"./behavior-C3gLXQi5.js";import"./question-markers-Ctlqccyu.js";import"./marker-CDpYqQ4C.js";import"./select-image-Ed7tw-je.js";import"./matcher-editor-CZ0URFE1.js";import"./number-line-editor-yYyP91u0.js";import"./numeric-input-editor-Ds-dTIRp.js";import"./phet-simulation-editor-CNcAwQEG.js";import"./plotter-editor-D7A547B_.js";import"./python-program-editor-BtTsGnvR.js";import"./editor-GbQZC5Vd.js";import"./sorter-editor-i-sqmkSw.js";import"./tex-error-view-BT4r6Ozi.js";const a={content:`A sequence is defined recursively as follows:


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
