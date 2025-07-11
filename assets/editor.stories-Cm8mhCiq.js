import{j as r,A as g,r as t,V as v}from"./iframe-Cm8NUS_Y.js";import"./item-version-D5C1uYsd.js";import"./article-renderer-B5DIoItv.js";import"./server-item-renderer-CT3U3M3v.js";import"./hints-renderer-pQxN6z_3.js";import"./index-DUpEf3IN.js";import{S as W}from"./split-view-dLhCMdyW.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-PYOnOU4K.js";import{E as f}from"./editor-QW1y6e8g.js";import"./article-editor-DxUqszSU.js";import"./components-FB5QV9Xg.js";import"./device-framer-Bf5rnEVb.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DknWiL09.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-ZBv61foO.js";import"./text-diff-5SDRft8s.js";import"./editor-page-EZOdz6IY.js";import"./toggleable-caret-BuB5VTGR.js";import"./trash-bold-DXAzIJnp.js";import"./item-extras-editor-CoBqQ24J.js";import"./content-preview-D7AzW578.js";/* empty css                       */import"./main-CHMyK9Fk.js";import"./categorizer-editor-CUJsqhfF.js";import"./editor-jsonify-C39bv3gR.js";import"./blur-input-BZzhcKcU.js";import"./definition-editor-CAShFmG0.js";import"./dropdown-editor-DUGwkE9u.js";import"./explanation-editor-BqEfzCwZ.js";import"./expression-editor-0CCLzN63.js";import"./free-response-editor-CvxYJcBX.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DZmz1qGo.js";import"./image-editor-Dwcw3tdC.js";import"./input-number-editor-BTA_W5Kz.js";import"./interaction-editor-DFwFY1_H.js";import"./interactive-graph-editor-BB47d-xM.js";import"./color-select-ib9pDJUU.js";import"./Popper-TtfX7zON.js";import"./util-MBvzIVar.js";import"./heading-54Lzuy1e.js";import"./interactive-graph-settings--ka2LZLN.js";import"./locked-figures-section-gXiZvymq.js";import"./locked-ellipse-settings-C9HqjicY.js";import"./scrollless-number-text-field-BFQ29XtH.js";import"./locked-label-settings-DGpBy2gv.js";import"./line-stroke-select-C2XCPfSu.js";import"./line-weight-select-CaQM5dex.js";import"./locked-figure-aria-D5CR-BDF.js";import"./locked-function-settings-COrdBNJr.js";import"./line-swatch-feBghyu-.js";import"./locked-line-settings-B2LxnyXC.js";import"./locked-point-settings-D8NcEzim.js";import"./labeled-switch-DImy_17E.js";import"./locked-polygon-settings-D2HJcfzF.js";import"./locked-vector-settings-B31AkyQk.js";import"./label-image-editor-BwXX1WG6.js";import"./form-wrapped-text-field-DVTmJCel.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BgaIEy59.js";import"./behavior-DSc40aYk.js";import"./question-markers-T7Dfrg3G.js";import"./marker-CTJq7FdK.js";import"./select-image-BWnuahLA.js";import"./matcher-editor-advdLHt3.js";import"./number-line-editor-BDYQm9Lw.js";import"./numeric-input-editor-Dy4S01Ow.js";import"./phet-simulation-editor-2j_ism4Z.js";import"./plotter-editor-uaV8USCT.js";import"./python-program-editor-C6bfV4iD.js";import"./editor-Cs5FYbxK.js";import"./sorter-editor-CiQr56UY.js";import"./tex-error-view-g-0BwbGu.js";const a={content:`A sequence is defined recursively as follows:


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
