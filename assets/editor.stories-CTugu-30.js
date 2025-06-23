import{j as r,A as g,r as t,V as v}from"./iframe-AqpKHAY9.js";import"./item-version-B8Toki3N.js";import"./article-renderer-CMSUfeiO.js";import"./server-item-renderer-BJjmxO8L.js";import"./hints-renderer-BTjqbEcf.js";import"./index-UJc9zfSj.js";import{S as W}from"./split-view-DpdWbagr.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-rWwZ6KLV.js";import{E as f}from"./editor-BH0T4CqP.js";import"./article-editor-Cl_M1n4u.js";import"./components-B4KlTTTG.js";import"./device-framer-WYNgXC60.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BVPf2ryq.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-OH5Jvq5-.js";import"./text-diff-BuN2vY2f.js";import"./editor-page-PTd5em_G.js";import"./toggleable-caret-Dm3_NyAl.js";import"./perseus-editor-accordion-BNn5RI9j.js";import"./item-extras-editor-C7OgawK3.js";import"./content-preview-CplqfjJK.js";/* empty css                       */import"./main-MDGghvqt.js";import"./categorizer-editor-WU02X_hb.js";import"./editor-jsonify-B6gKo7k4.js";import"./blur-input-BT2w_lIn.js";import"./definition-editor-4iCUDbw_.js";import"./dropdown-editor-KpE9cmav.js";import"./explanation-editor-B_TiLkvF.js";import"./expression-editor-C5_XRPjH.js";import"./free-response-editor-CRmX5fGM.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-C9hIKsS3.js";import"./image-editor-CQ6kPaCQ.js";import"./input-number-editor-CxE9vX2t.js";import"./interaction-editor-B8H5uanj.js";import"./interactive-graph-editor-BNvi2lFw.js";import"./color-select-MR3llq9r.js";import"./Popper-1Z0P4ALo.js";import"./util-ClB3_ScO.js";import"./heading-DXAMLT5x.js";import"./interactive-graph-settings-DpUYdofQ.js";import"./locked-figures-section-RZ55f2WZ.js";import"./locked-ellipse-settings-BUSXOvrb.js";import"./scrollless-number-text-field-CEqWsi5k.js";import"./locked-label-settings-DyGpqt7a.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DPZWkXCk.js";import"./locked-figure-aria-Cv1mfy-e.js";import"./locked-function-settings-B_LmJBhr.js";import"./line-swatch-BCp0Lzna.js";import"./locked-line-settings-FnEyip1a.js";import"./locked-point-settings-vt6XeiJ0.js";import"./labeled-switch-DaKhQMcD.js";import"./locked-polygon-settings-B_xzHcfP.js";import"./locked-vector-settings-DoTHQlet.js";import"./label-image-editor-CIfr04iA.js";import"./form-wrapped-text-field-DgfgyIOZ.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CZzoO1nk.js";import"./behavior-Bl5bKpXg.js";import"./question-markers-B_waASaj.js";import"./marker-DQ8H5mPk.js";import"./select-image-CBl5qF0R.js";import"./matcher-editor-DZC8V6vx.js";import"./number-line-editor-IlJ8oZkb.js";import"./numeric-input-editor-CKwvFZ7H.js";import"./phet-simulation-editor-DzQi2Jc-.js";import"./plotter-editor-GQmBvr17.js";import"./python-program-editor-B4NoFfbA.js";import"./editor-D_BVLEdN.js";import"./sorter-editor-Bf2qPccJ.js";import"./tex-error-view-_uICm6S_.js";const a={content:`A sequence is defined recursively as follows:


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
