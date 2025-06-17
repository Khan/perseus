import{j as r,A as g,r as t,V as v}from"./iframe-YKV31o64.js";import"./item-version-CXVZxRsh.js";import"./article-renderer-DqRsdQha.js";import"./server-item-renderer-UUlWUSLm.js";import"./hints-renderer-D-t2fIeV.js";import"./index-BXebMeMj.js";import{S as W}from"./split-view-DIDbSpB_.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-BYOIkP9V.js";import{E as f}from"./editor-pC6HJxy9.js";import"./article-editor-YReMIjuI.js";import"./components-DeHeXBes.js";import"./device-framer-msIdNRwo.js";import"./constants-kyOY0S4e.js";import"./section-control-button-BF5d8bO8.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-BtXeMnZ-.js";import"./text-diff-DnL3wtNY.js";import"./editor-page-BWWwTtBQ.js";import"./toggleable-caret-BuWd1xiK.js";import"./trash-bold-Deco_rzA.js";import"./item-extras-editor-CWtbEC1_.js";import"./content-preview-CFA0W7BF.js";/* empty css                       */import"./main-DHPKrE9m.js";import"./categorizer-editor-Afw8tmOQ.js";import"./editor-jsonify-Dj6EYETO.js";import"./blur-input-Rhn44VZP.js";import"./definition-editor-C-4X0fip.js";import"./dropdown-editor-s8pdEqHY.js";import"./explanation-editor-CUaUOoFv.js";import"./expression-editor-D0y-Betx.js";import"./free-response-editor-D7c612GC.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-DFOWEp6z.js";import"./image-editor-oYc2q2fu.js";import"./input-number-editor-CZS9S1If.js";import"./interaction-editor-Bp6eTuRt.js";import"./interactive-graph-editor-4xJk1S8O.js";import"./color-select-DuLtDjT7.js";import"./Popper-BWTOPqNy.js";import"./util-ckYU2rVO.js";import"./heading-DosG8RGd.js";import"./interactive-graph-settings-D7Pndhf_.js";import"./locked-figures-section-q7JAgwbH.js";import"./locked-ellipse-settings-DVp-Td5a.js";import"./scrollless-number-text-field-B-5jSEKO.js";import"./locked-label-settings-DUe-0Crc.js";import"./line-stroke-select-BQLttffs.js";import"./locked-figure-aria-DiyTbo2R.js";import"./locked-function-settings-BFJKx1yg.js";import"./line-swatch-BKhf-5GR.js";import"./locked-line-settings-1BcEgNlR.js";import"./locked-point-settings-Dv7vnQw2.js";import"./labeled-switch-BmEUZMli.js";import"./locked-polygon-settings-BECfC7y0.js";import"./locked-vector-settings-B0gd72Mg.js";import"./label-image-editor-DQTHFg4s.js";import"./form-wrapped-text-field-H0q8-hxP.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-D5qNFLKN.js";import"./behavior-DflibRLb.js";import"./question-markers-4llOqy34.js";import"./marker-B0tTGf9e.js";import"./select-image-D8Wkk4Em.js";import"./matcher-editor-CgHNaLBL.js";import"./number-line-editor-Bzj11XoA.js";import"./numeric-input-editor-Bz-i2DiO.js";import"./phet-simulation-editor-BAEA0Fpt.js";import"./plotter-editor-DrMKzK1o.js";import"./python-program-editor-o_1m_C6L.js";import"./editor-DQoZYU0J.js";import"./sorter-editor-CLPLogUs.js";import"./tex-error-view-C3ynUUhc.js";const a={content:`A sequence is defined recursively as follows:


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
