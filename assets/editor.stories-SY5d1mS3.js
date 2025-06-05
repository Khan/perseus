import{j as r,A as g,r as t,V as v}from"./iframe-C4cY5clK.js";import"./item-version-CZ0mLQQR.js";import"./article-renderer-Djd7mAf7.js";import"./server-item-renderer-DdPpHRSE.js";import"./hints-renderer-BDOxnyqW.js";import"./index-idyHvdgw.js";import{S as W}from"./split-view-BZzz49iD.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BzzeRcxt.js";import{E as f}from"./editor-DgzA9eA7.js";import"./article-editor-J9rqUcfO.js";import"./components-D8CCxqCC.js";import"./device-framer-BN4b_j85.js";import"./constants-kyOY0S4e.js";import"./section-control-button-B5RIskko.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-yE5IHvTe.js";import"./text-diff-iugS5_sA.js";import"./editor-page-BrTEfjID.js";import"./item-extras-editor-FGzzcT7w.js";import"./content-preview-DjGDrwEu.js";/* empty css                       */import"./categorizer-editor-Bq9ITWcS.js";import"./editor-jsonify-BeR8Zz6n.js";import"./blur-input-DjAXsdSw.js";import"./definition-editor-fYtbQ0sI.js";import"./dropdown-editor-DlhdcRNM.js";import"./explanation-editor-BCoNBP8l.js";import"./expression-editor-C22Kvttk.js";import"./free-response-editor-eG17Fig9.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CQrj_1sg.js";import"./image-editor-Ue7sDHbp.js";import"./input-number-editor-m_gnKw99.js";import"./interaction-editor-D5tIXEnj.js";import"./interactive-graph-editor-B2s8Z8SY.js";import"./color-select-ABqHavGI.js";import"./Popper-D_cGwkbc.js";import"./util-BEcl2r--.js";import"./heading-DlOA5ss5.js";import"./toggleable-caret-BzFfB686.js";import"./interactive-graph-settings-BFJZrVUg.js";import"./locked-figures-section-DzORbLOA.js";import"./locked-ellipse-settings-Cow1Dw7F.js";import"./scrollless-number-text-field-B49y4ib4.js";import"./locked-label-settings-B1ouRST8.js";import"./trash-bold-DQ-OIgnD.js";import"./line-stroke-select-iQ3ndms_.js";import"./locked-figure-aria-CjevxjQV.js";import"./locked-function-settings-DivOoz5g.js";import"./line-swatch-DpULGd0p.js";import"./locked-line-settings-ChoaNzVZ.js";import"./locked-point-settings-Biolqgtc.js";import"./labeled-switch-ivubFUJF.js";import"./locked-polygon-settings-DG_eeewZ.js";import"./locked-vector-settings-DPVB_3Y3.js";import"./label-image-editor-B2Kdx4x8.js";import"./form-wrapped-text-field-BTMgJ8n2.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-DTTwz2I4.js";import"./behavior-DnH_p6i4.js";import"./question-markers-DtqTHvqu.js";import"./marker-C8cHuXKP.js";import"./select-image-C4U4_Pbp.js";import"./matcher-editor-DQQZR5LG.js";import"./number-line-editor-DoTOylqb.js";import"./numeric-input-editor-DXqKUwHR.js";import"./phet-simulation-editor-CXLU4k_9.js";import"./plotter-editor-CV7m5CBZ.js";import"./python-program-editor-CIkfu_5q.js";import"./editor-Lmj4246N.js";import"./sorter-editor-BYXIwWVE.js";import"./tex-error-view-C8Ju4Dak.js";const a={content:`A sequence is defined recursively as follows:


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
