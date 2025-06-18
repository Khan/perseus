import{j as r,A as g,r as t,V as v}from"./iframe-CTOs5xNT.js";import"./item-version-Cc_SfDGX.js";import"./article-renderer-DhN21r3O.js";import"./server-item-renderer-BDe2OHhV.js";import"./hints-renderer-DgXLEwYt.js";import"./index-CXoZoPsF.js";import{S as W}from"./split-view-CN3mpIRx.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-DMxxt75C.js";import{E as f}from"./editor-NDFLi_dH.js";import"./article-editor-Bw4-amAq.js";import"./components-DJE46TyK.js";import"./device-framer-9pwsI_lc.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BnFj4z92.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BHbV_tga.js";import"./text-diff-K_u_t2sC.js";import"./editor-page-CVvs0Ug3.js";import"./toggleable-caret-B969b4-6.js";import"./perseus-editor-accordion-XLuAycyM.js";import"./item-extras-editor-NwAMBlbB.js";import"./content-preview-Dr_NBGGj.js";/* empty css                       */import"./main-Du196aIC.js";import"./categorizer-editor-NBvpxiA0.js";import"./editor-jsonify-CxHQ8dNL.js";import"./blur-input-CFHc_n7h.js";import"./definition-editor-tbpujta3.js";import"./dropdown-editor-sA6LCeGV.js";import"./explanation-editor-DFw0cv3q.js";import"./expression-editor-BK-yV8Ci.js";import"./free-response-editor-zCbNaWy2.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CgqDyHfm.js";import"./image-editor-D-R_gJw9.js";import"./input-number-editor-PFKfU0MG.js";import"./interaction-editor-D0rFGinC.js";import"./interactive-graph-editor-DfhYv5os.js";import"./color-select-Dj6aF5hw.js";import"./Popper-CCxsJDV-.js";import"./util-SDpAv-jP.js";import"./heading-5bHVAc6V.js";import"./interactive-graph-settings-DV8UvBci.js";import"./locked-figures-section-B5X8Fo5m.js";import"./locked-ellipse-settings-DG6iiLj_.js";import"./scrollless-number-text-field-wERWZtL8.js";import"./locked-label-settings-CPlK9InF.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DWvz4J06.js";import"./locked-figure-aria-DVtYBv8e.js";import"./locked-function-settings-CTmou3-F.js";import"./line-swatch-DntDs-_C.js";import"./locked-line-settings-C2CV80su.js";import"./locked-point-settings-CyB5mzas.js";import"./labeled-switch-CirbpeVz.js";import"./locked-polygon-settings-Bao61V1i.js";import"./locked-vector-settings-Dnei8i9f.js";import"./label-image-editor-BrCho21R.js";import"./form-wrapped-text-field-CG2haeU4.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-B654qjt-.js";import"./behavior-D24Q5Isr.js";import"./question-markers-CaKWBLad.js";import"./marker-BKlcKCE5.js";import"./select-image-DUPvWB5D.js";import"./matcher-editor-BmoCaIs1.js";import"./number-line-editor-BsT6I3Ls.js";import"./numeric-input-editor-B3J5K5UL.js";import"./phet-simulation-editor-DeZEfOW-.js";import"./plotter-editor-sEyrIj_v.js";import"./python-program-editor-D1w5R5Ub.js";import"./editor-Csvmly8y.js";import"./sorter-editor-xuF1DmwS.js";import"./tex-error-view-uqYU7KbU.js";const a={content:`A sequence is defined recursively as follows:


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
