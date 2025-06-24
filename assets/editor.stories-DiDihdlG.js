import{j as r,A as g,r as t,V as v}from"./iframe-qfk1c0wx.js";import"./item-version-DXWFoSVz.js";import"./article-renderer-D2p-Zvlh.js";import"./server-item-renderer-vluqCfII.js";import"./hints-renderer-Dge91Vhi.js";import"./index-DaKVdgxL.js";import{S as W}from"./split-view-SICxKimz.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-utahF8vo.js";import{E as f}from"./editor-B2hXXLQ-.js";import"./article-editor-hzGog2tf.js";import"./components-5FeqireL.js";import"./device-framer-CgMns9VP.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BTn_JiUG.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-D4i_xm2y.js";import"./text-diff-DcuQGLWw.js";import"./editor-page-DfRefJYU.js";import"./toggleable-caret-67fJqbBC.js";import"./trash-bold-DuCFjCDF.js";import"./item-extras-editor-BoRSCCc4.js";import"./content-preview-BzCBlm5E.js";/* empty css                       */import"./main-CeE-OF9j.js";import"./categorizer-editor-CGKEZVgb.js";import"./editor-jsonify-3tib6xqH.js";import"./blur-input-CDloFL6w.js";import"./definition-editor-BBsswp4n.js";import"./dropdown-editor-BLi8eoJ-.js";import"./explanation-editor-CC91lasL.js";import"./expression-editor-CXsq1Qi3.js";import"./free-response-editor-4GjVi-5U.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DOBlt4Jp.js";import"./image-editor-BYxAz6uC.js";import"./input-number-editor-2BTGsRBE.js";import"./interaction-editor-DYfBr4n2.js";import"./interactive-graph-editor-CH4DIAW9.js";import"./color-select-t4VtVHAD.js";import"./Popper-B8EhtmUB.js";import"./util-D0aHefUI.js";import"./heading-y93LIM4t.js";import"./interactive-graph-settings-CxcVEZJu.js";import"./locked-figures-section-re1H2HHU.js";import"./locked-ellipse-settings-CyYcuIU5.js";import"./scrollless-number-text-field-BE8rQPwd.js";import"./locked-label-settings-BQj4t1JH.js";import"./line-stroke-select-ChX-B41Y.js";import"./locked-figure-aria-CBstWXJ_.js";import"./locked-function-settings-CljDkQvR.js";import"./line-swatch-D07cTGUs.js";import"./locked-line-settings-C6a981z-.js";import"./locked-point-settings-DOsxsXkq.js";import"./labeled-switch-DuZQMhFh.js";import"./locked-polygon-settings-BzBnEocU.js";import"./locked-vector-settings-050k27Fh.js";import"./label-image-editor-BYgOGTu2.js";import"./form-wrapped-text-field-CLFza334.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-wXj5kZRQ.js";import"./behavior--e4e26wb.js";import"./question-markers-DHBA87VW.js";import"./marker-DkqD3REt.js";import"./select-image-CbcBghc9.js";import"./matcher-editor-D6lVuvLK.js";import"./number-line-editor-CzQO05ZV.js";import"./numeric-input-editor-BR1gCkxo.js";import"./phet-simulation-editor-BRRFDiH6.js";import"./plotter-editor-W1znvS6E.js";import"./python-program-editor-LnRf3ZWK.js";import"./editor-CTk3JOhK.js";import"./sorter-editor-CgmQTnqB.js";import"./tex-error-view-DTYHe4Xp.js";const a={content:`A sequence is defined recursively as follows:


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
