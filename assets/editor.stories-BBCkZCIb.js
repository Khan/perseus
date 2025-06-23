import{j as r,A as g,r as t,V as v}from"./iframe-B_16MRTp.js";import"./item-version-9W43G8cZ.js";import"./article-renderer-LUbgHaPn.js";import"./server-item-renderer-1LUmkp6m.js";import"./hints-renderer-B-q9yvuG.js";import"./index-C33FiOGF.js";import{S as W}from"./split-view-p32QcSZ6.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-Dr8q-00N.js";import{E as f}from"./editor-Dg3h3QOy.js";import"./article-editor-O1vz5ph8.js";import"./components-CA-pBWcu.js";import"./device-framer-D2HWzH74.js";import"./constants-kyOY0S4e.js";import"./section-control-button-lCRaX4Xb.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BoyOf4AY.js";import"./text-diff-IJhb4GF4.js";import"./editor-page-aIIBu_14.js";import"./toggleable-caret-DDqyWnhw.js";import"./perseus-editor-accordion-CUKo9tOI.js";import"./item-extras-editor-O9biz6M3.js";import"./content-preview-Dki0PgSI.js";/* empty css                       */import"./main-4uZ7eudv.js";import"./categorizer-editor-Cqy8j9Jl.js";import"./editor-jsonify-3XOEdiIl.js";import"./blur-input-DfbZkE91.js";import"./definition-editor-DgoxoqP7.js";import"./dropdown-editor-De5INjSI.js";import"./explanation-editor-GdoT1cWD.js";import"./expression-editor-D5m6Ja6Z.js";import"./free-response-editor-D7aLC8ZZ.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-OAu7RVBG.js";import"./image-editor-VcpoCbvG.js";import"./input-number-editor-CkBm6s8Q.js";import"./interaction-editor-CuwED8yg.js";import"./interactive-graph-editor-BYpqBZqN.js";import"./color-select-BSL8fz8E.js";import"./Popper-CMBk6tY9.js";import"./util-8jB5qdwX.js";import"./heading-BE5fl9Ha.js";import"./interactive-graph-settings-CcOUYPCk.js";import"./locked-figures-section-CTIBI8jX.js";import"./locked-ellipse-settings-DmWH0MUs.js";import"./scrollless-number-text-field-DUF2EDN8.js";import"./locked-label-settings-D9gsdh3s.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-Da6T46Zr.js";import"./locked-figure-aria-EX74BjUV.js";import"./locked-function-settings-D3vpoAaf.js";import"./line-swatch-DrIy6YmM.js";import"./locked-line-settings-CUkAfJLC.js";import"./locked-point-settings-DE1D1D7-.js";import"./labeled-switch-D8HPlhqM.js";import"./locked-polygon-settings-TMOUjLKb.js";import"./locked-vector-settings-Dyum1fSo.js";import"./label-image-editor-C2H4VNBa.js";import"./form-wrapped-text-field-BquZQhoi.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-Dvr_TYVj.js";import"./behavior-XzpVDD5X.js";import"./question-markers-D4Vmk_qO.js";import"./marker-BnM6cK-4.js";import"./select-image-Cg9se8A8.js";import"./matcher-editor-zkpRQV-r.js";import"./number-line-editor-Ds9oX61E.js";import"./numeric-input-editor-DafsKUOz.js";import"./phet-simulation-editor-D1fTeiKj.js";import"./plotter-editor-Cx-3LtuD.js";import"./python-program-editor-BDyjb30p.js";import"./editor-B187K2Uz.js";import"./sorter-editor-BnvxmALb.js";import"./tex-error-view-B3pRbBzP.js";const a={content:`A sequence is defined recursively as follows:


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
