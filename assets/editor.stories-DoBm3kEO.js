import{j as r,A as g,r as t,V as v}from"./iframe-DDS5SomD.js";import"./item-version-sYlQ00Hh.js";import"./article-renderer-kfe8qSSt.js";import"./server-item-renderer-OPOrIXJf.js";import"./hints-renderer-tAOY0Yso.js";import"./index-DIWIn6Q9.js";import{S as W}from"./split-view-EuIGsmDW.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-7V3Qbp1m.js";import{E as f}from"./editor-CBkKMwfU.js";import"./article-editor-tX4BC6p4.js";import"./components-6Tmmsdhc.js";import"./device-framer-hZpHgrgl.js";import"./constants-kyOY0S4e.js";import"./section-control-button-unW4R5p2.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-DzYgdnmk.js";import"./text-diff-Bs_8TYom.js";import"./editor-page-DJoWJAXn.js";import"./toggleable-caret-B7SIXqxc.js";import"./trash-bold-CjCUhiBv.js";import"./item-extras-editor-aHweZ8z6.js";import"./content-preview-Bk4xvX7b.js";/* empty css                       */import"./main-CtXcLVSf.js";import"./categorizer-editor-Y1sp-_K6.js";import"./editor-jsonify-B07BS6EV.js";import"./blur-input-CnNFF9Iu.js";import"./definition-editor-DupwoEWy.js";import"./dropdown-editor-CVbUDO7A.js";import"./explanation-editor-BQ-XgAg_.js";import"./expression-editor-NaJeQjc2.js";import"./free-response-editor-Ca_IA9fd.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DFMfpWbI.js";import"./image-editor-CKuWK8f0.js";import"./input-number-editor-CeNZ7xlN.js";import"./interaction-editor-6luWXMC4.js";import"./interactive-graph-editor-4ZYyb48-.js";import"./color-select-DGh29EQo.js";import"./Popper-DY556ZEG.js";import"./util-D1FA_FJ6.js";import"./heading-CW26vpiV.js";import"./interactive-graph-settings-CTMmJiHH.js";import"./locked-figures-section-Tcvwhy9v.js";import"./locked-ellipse-settings-CZEDXeXk.js";import"./scrollless-number-text-field-BdrkQ7Fg.js";import"./locked-label-settings-cyQ6PLze.js";import"./line-stroke-select-DQnvcSQd.js";import"./locked-figure-aria-DGdDhiyJ.js";import"./locked-function-settings-DPT84udQ.js";import"./line-swatch-5lxr_aAd.js";import"./locked-line-settings-CJvrmJYn.js";import"./locked-point-settings-D0-5uNk6.js";import"./labeled-switch-BfXYfVx1.js";import"./locked-polygon-settings-D_-BAsO8.js";import"./locked-vector-settings-DLfdvAd8.js";import"./label-image-editor-DnYGSYLn.js";import"./form-wrapped-text-field-TiRxIRdm.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-CXLkWmnc.js";import"./behavior-CYo3D-qm.js";import"./question-markers-BzeLEjAn.js";import"./marker-BxXZ8Trg.js";import"./select-image-D7OJCJGF.js";import"./matcher-editor-DQ2n_bie.js";import"./number-line-editor-D4en1LUF.js";import"./numeric-input-editor-Cax5Mrwk.js";import"./phet-simulation-editor-CqTs2EuN.js";import"./plotter-editor-Cdw9nTWc.js";import"./python-program-editor-BnFTGuGs.js";import"./editor-V3rRShFR.js";import"./sorter-editor-SNxVSDxP.js";import"./tex-error-view-D4lcH7sq.js";const a={content:`A sequence is defined recursively as follows:


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
