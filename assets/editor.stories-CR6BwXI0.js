import{j as r,A as g,r as t,V as v}from"./iframe-C_FVBbyS.js";import"./item-version-Dg33Ll3Y.js";import"./article-renderer-DaKBJR0u.js";import"./server-item-renderer-BY7itV5_.js";import"./hints-renderer-BBvEvVOB.js";import"./index-C9e6lFpG.js";import{S as W}from"./split-view-3bpfoo_y.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BDG-3dTm.js";import{E as f}from"./editor-DJqnDaKR.js";import"./article-editor-DEKibogV.js";import"./components-CxTrYglq.js";import"./device-framer-DPuzL4Im.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DX7jJOx2.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-Bg1UvwZu.js";import"./text-diff-D8z15gQw.js";import"./editor-page-BygaLmWO.js";import"./toggleable-caret-uYLhJBkC.js";import"./perseus-editor-accordion-BxZTU1MM.js";import"./item-extras-editor-DWuANDaN.js";import"./content-preview-DYj1qEzT.js";/* empty css                       */import"./main-DwHc-YzP.js";import"./categorizer-editor-BEYh0o95.js";import"./editor-jsonify-BIXP216I.js";import"./blur-input-ZfVa4arA.js";import"./definition-editor-D3TvPMR-.js";import"./dropdown-editor-RiIujXPE.js";import"./explanation-editor-DNjrh5OM.js";import"./expression-editor-CW3KpsOX.js";import"./free-response-editor-By1D8mji.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-C46PhpOj.js";import"./image-editor-2rcA78Jo.js";import"./input-number-editor-BgO_5_Gv.js";import"./interaction-editor-DyISQNtf.js";import"./interactive-graph-editor-B-6eoQqi.js";import"./color-select-D7CnjrnU.js";import"./Popper-B75AFG2E.js";import"./util-D5YmjnLD.js";import"./heading-6Fyy0Ud1.js";import"./interactive-graph-settings-Bg1VViyC.js";import"./locked-figures-section-BiMIFQD5.js";import"./locked-ellipse-settings-BKx5caJG.js";import"./scrollless-number-text-field-Bh3Kyziq.js";import"./locked-label-settings-4UK0K7-x.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-BOcFpz1T.js";import"./line-weight-select-Ct-1Whqg.js";import"./locked-figure-aria-BEZSJSoI.js";import"./locked-function-settings-QZaHlQiV.js";import"./line-swatch-CIkfAWQI.js";import"./locked-line-settings-DX5Yi11U.js";import"./locked-point-settings-Ctmf3gZd.js";import"./labeled-switch-4FqSKfWI.js";import"./locked-polygon-settings-CeduTbsJ.js";import"./locked-vector-settings-kYmSKH7S.js";import"./label-image-editor-BUDZfzBQ.js";import"./form-wrapped-text-field-DkJh_0Wm.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-zfrU8UZS.js";import"./behavior-DDPlnIIu.js";import"./question-markers-C-jxCcnv.js";import"./marker-C8hXBsG1.js";import"./select-image-CMXoNmbd.js";import"./matcher-editor-CXLqcoU8.js";import"./number-line-editor-D94by1ho.js";import"./numeric-input-editor-CUzpJhNg.js";import"./phet-simulation-editor-CNy7Gr4O.js";import"./plotter-editor-C9U3-VbQ.js";import"./python-program-editor-OCyrqQ5p.js";import"./editor-DphBGeBI.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-vsTzZnFo.js";import"./tex-error-view-CJoC1LvU.js";const a={content:`A sequence is defined recursively as follows:


$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} 
~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$


Find the term $a_3$ in the sequence.

[[☃ numeric-input 1]]`,images:{},widgets:{"numeric-input 1":{graded:!0,version:{major:0,minor:0},static:!1,type:"numeric-input",options:{coefficient:!1,static:!1,answers:[{status:"correct",maxError:null,strict:!1,value:.5,simplify:"required",message:""}],labelText:"What's the answer?",size:"normal"}}}},{action:_}=__STORYBOOK_MODULE_ACTIONS__;x();const He={title:"PerseusEditor/Editor"},i=()=>r.jsx(f,{apiOptions:g.defaults,content:a.content,placeholder:"",widgets:a.widgets,images:a.images,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!0,warnNoWidgets:!0,onChange:s=>{}}),o=()=>{const s=t.useRef(null),[h,w]=t.useState({}),[S,O]=t.useState("[[☃ interactive-graph 1]]"),[b,y]=t.useState({}),[E,R]=t.useState({"interactive-graph 1":{options:{labels:["x","y"],lockedFigures:[],range:[[-10,10],[-10,10]],gridStep:[1,1],snapStep:[1,1],step:[1,1],backgroundImage:{url:null},markings:"graph",showProtractor:!1,showTooltips:!1,graph:{type:"linear",coords:[[1,1],[5,5]]},correct:{type:"linear"}},type:"interactive-graph",version:{major:0,minor:0}}});return r.jsx("div",{className:"framework-perseus",children:r.jsx(W,{rendererTitle:"Editor",renderer:r.jsx(v,{style:{width:"360px",margin:"20px"},children:r.jsx(f,{ref:s,apiOptions:g.defaults,content:S,placeholder:"",widgets:E,images:b,disabled:!1,widgetEnabled:!0,immutableWidgets:!1,showWordCount:!0,warnNoPrompt:!1,warnNoWidgets:!0,onChange:e=>{_("onChange")(e),e.content?O(e.content):e.widgets?R(e.widgets):e.images&&y(e.images),setTimeout(()=>{var n;w(((n=s.current)==null?void 0:n.serialize())||{})},0)}})}),JSONTitle:"Serialized Widget Options",jsonObject:h})})};i.__docgenInfo={description:"",methods:[],displayName:"Demo"};o.__docgenInfo={description:"",methods:[],displayName:"DemoInteractiveGraph"};var p,m,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const Qe=["Demo","DemoInteractiveGraph"];export{i as Demo,o as DemoInteractiveGraph,Qe as __namedExportsOrder,He as default};
