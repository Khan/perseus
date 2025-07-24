import{j as r,A as g,r as t,V as v}from"./iframe-C-wjKudE.js";import"./item-version-a7DtHh5j.js";import"./article-renderer-B2JAE8o_.js";import"./server-item-renderer-DbBQSC2v.js";import"./hints-renderer-Dxk8feSH.js";import"./index-BND-ehRr.js";import{S as W}from"./split-view-BCkjQHMs.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-C9GnRWxb.js";import{E as f}from"./editor-DLHhGIr8.js";import"./article-editor-BZymaA82.js";import"./components-Vk11JFRY.js";import"./device-framer-C0ihaR6S.js";import"./constants-kyOY0S4e.js";import"./section-control-button-CgLcrYl5.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-UpeivfWI.js";import"./text-diff-CiZokXbz.js";import"./editor-page-DmCPOXlx.js";import"./toggleable-caret-p13zq2nY.js";import"./perseus-editor-accordion-hoHt6nwA.js";import"./item-extras-editor-BjpzIih5.js";import"./content-preview-BdeYLDkP.js";/* empty css                       */import"./main-r_iJmxr-.js";import"./categorizer-editor-8UgEMQea.js";import"./editor-jsonify-DhUAjaOE.js";import"./blur-input-UEd9yfMd.js";import"./definition-editor-Dg5mO1r4.js";import"./dropdown-editor-CLgDZ6TZ.js";import"./explanation-editor-wumSNPm3.js";import"./expression-editor-tL5MPT0q.js";import"./free-response-editor-6iZuGUQd.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-De8Oy22k.js";import"./image-editor-DLwOLaA-.js";import"./input-number-editor-nccipXV3.js";import"./interaction-editor-Dsr9JcTC.js";import"./interactive-graph-editor-C5U3GDS5.js";import"./color-select-BQfLMAlG.js";import"./Popper-CzCRypv7.js";import"./util-llrT9vA5.js";import"./heading-BCQLsfto.js";import"./interactive-graph-settings-D7Kh3NWi.js";import"./locked-figures-section-CPRmkUMN.js";import"./locked-ellipse-settings-0ZCIZeCI.js";import"./scrollless-number-text-field-C3KDqXp5.js";import"./locked-label-settings-Dr-Kty07.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-CjbrhS0j.js";import"./line-weight-select-4PRs8gwm.js";import"./locked-figure-aria-Dd4TxHDD.js";import"./locked-function-settings-Dx6g5RIE.js";import"./line-swatch-DE7CwASx.js";import"./locked-line-settings-BrqEne5N.js";import"./locked-point-settings-geSabJ92.js";import"./labeled-switch-CNTXkYv7.js";import"./locked-polygon-settings-D0WwRKRV.js";import"./locked-vector-settings-Bmjy4PBT.js";import"./label-image-editor-BZ9-ndk4.js";import"./form-wrapped-text-field-JwDZAQvr.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-fVNCwVed.js";import"./behavior-o675Zgv6.js";import"./question-markers-wt0hiR81.js";import"./marker-Huf8gOfb.js";import"./select-image-DwGmRI7t.js";import"./matcher-editor-d2JuOw_D.js";import"./number-line-editor-DhVFXd95.js";import"./numeric-input-editor-DEP4y0no.js";import"./phet-simulation-editor-C4k9BoAO.js";import"./plotter-editor-XKOSdCrx.js";import"./python-program-editor-4J1kNgbz.js";import"./editor-CeRfw9tk.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-DhWXCZD6.js";import"./tex-error-view-DpagAYSa.js";const a={content:`A sequence is defined recursively as follows:


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
