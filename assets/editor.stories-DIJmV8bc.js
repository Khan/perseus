import{j as r,A as g,r as t,V as v}from"./iframe-C7PW0sis.js";import"./item-version-DIeKpaj3.js";import"./article-renderer-BQoFzl2S.js";import"./server-item-renderer-DD0DwK9e.js";import"./hints-renderer-Ccd9Ou7K.js";import"./index-DjEbgNl6.js";import{S as W}from"./split-view-cK_hxM3Y.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-ICqIKN3i.js";import{E as f}from"./editor-tt209xxK.js";import"./article-editor-DDHAszEY.js";import"./components-B6sji5Cj.js";import"./device-framer-Bge3dGLf.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BpwquGIm.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-CROVXKXM.js";import"./text-diff-C0pnDfu-.js";import"./editor-page-gKnYAdXh.js";import"./toggleable-caret-Ca_NQ1rT.js";import"./perseus-editor-accordion-C1gIZO7M.js";import"./item-extras-editor-FWUdGAsh.js";import"./content-preview-QOrYJSU1.js";/* empty css                       */import"./main-C53qK5mJ.js";import"./categorizer-editor-BYN7Xx6r.js";import"./editor-jsonify-DH_VdMvG.js";import"./blur-input-Csyk4WGw.js";import"./definition-editor-0dbAWRv_.js";import"./dropdown-editor-CX739Szr.js";import"./explanation-editor-CK5rSDii.js";import"./expression-editor-BdJwWb0f.js";import"./free-response-editor-C1JuC6pX.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-CfCKRJ6x.js";import"./image-editor-DFT9UPxP.js";import"./input-number-editor-CpSNPLTa.js";import"./interaction-editor-CFsEDqHJ.js";import"./interactive-graph-editor-BNcjxdfX.js";import"./color-select-D6FTkYE6.js";import"./Popper-ChXQ5gks.js";import"./util-CZ-1dilU.js";import"./heading-CPkfh8c0.js";import"./interactive-graph-settings-h_p0Wv40.js";import"./locked-figures-section-CL7WjbmT.js";import"./locked-ellipse-settings-BG8J04k_.js";import"./scrollless-number-text-field-5HwE-YEH.js";import"./locked-label-settings-CG5lhsLI.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-B7G4JZ0N.js";import"./locked-figure-aria-BJchdu7I.js";import"./locked-function-settings-CCJS1dQ6.js";import"./line-swatch-CEPKNkkj.js";import"./locked-line-settings-ji0VnhxO.js";import"./locked-point-settings-BGE5MPk9.js";import"./labeled-switch-CHdK5mnq.js";import"./locked-polygon-settings-BflHKkJq.js";import"./locked-vector-settings-8s5b6Iq9.js";import"./label-image-editor-CxABNmxR.js";import"./form-wrapped-text-field-DqJAcBGG.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-BiG2tOkq.js";import"./behavior--hiKIvUP.js";import"./question-markers-DYInGl5D.js";import"./marker-hJn9WThL.js";import"./select-image-OUN8pmFt.js";import"./matcher-editor-CvRZKx9x.js";import"./number-line-editor-Cli-rb0N.js";import"./numeric-input-editor-rkOvslOQ.js";import"./phet-simulation-editor-CmExpv4p.js";import"./plotter-editor-CSy8uOLX.js";import"./python-program-editor-CQcySajo.js";import"./editor-DK4PCgAn.js";import"./sorter-editor-Bo8tBq2E.js";import"./tex-error-view-CNhUmosT.js";const a={content:`A sequence is defined recursively as follows:


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
