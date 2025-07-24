import{j as r,A as g,r as t,V as v}from"./iframe-B7rrjhX-.js";import"./item-version-C71bDQee.js";import"./article-renderer-CKpNj7Wm.js";import"./server-item-renderer-CzC3QTOf.js";import"./hints-renderer-B1JL43nH.js";import"./index-TdwKDsvt.js";import{S as W}from"./split-view-C_9Okdij.js";import{r as x}from"./register-all-widgets-and-editors-for-testing-CxUlHJe4.js";import{E as f}from"./editor-B1geKalv.js";import"./article-editor-DU7wtn9k.js";import"./components-Dr_1lztj.js";import"./device-framer-D6pm4RHN.js";import"./constants-kyOY0S4e.js";import"./section-control-button-DFnpskug.js";import"./icon-paths-BU5otBoc.js";import"./viewport-resizer-oP0KaCYT.js";import"./text-diff-B6ttn6M-.js";import"./editor-page-CDj5IJ-t.js";import"./toggleable-caret-BpIVJqTO.js";import"./perseus-editor-accordion-CN6XVc66.js";import"./item-extras-editor-B8MNI2ep.js";import"./content-preview-Bsw2cIrz.js";/* empty css                       */import"./main-Ddk32iNL.js";import"./categorizer-editor-CxhFToWM.js";import"./editor-jsonify-DIeMlM0a.js";import"./blur-input-BYk90EV0.js";import"./definition-editor-BOioqial.js";import"./dropdown-editor-CEqRYA2t.js";import"./explanation-editor-DLbyFOmE.js";import"./expression-editor-CIvjCJt0.js";import"./free-response-editor-CNYNMg87.js";import"./plus-circle-DsgEZe2H.js";import"./graph-settings-BzVTGnMq.js";import"./image-editor-BPorfiM6.js";import"./input-number-editor-CSol-UjE.js";import"./interaction-editor-C2n_l6kd.js";import"./interactive-graph-editor-C774j4RP.js";import"./color-select-rH8ph09C.js";import"./Popper-BIyp_Cbc.js";import"./util-DpBZvdzG.js";import"./heading-Bd-IZBo_.js";import"./interactive-graph-settings-C9Itp2Yq.js";import"./locked-figures-section-DnMXAiSZ.js";import"./locked-ellipse-settings-Dmhx5y3T.js";import"./scrollless-number-text-field-DbOJ7h5p.js";import"./locked-label-settings-BK3uwQNs.js";import"./trash-bold-BLGUig5L.js";import"./line-stroke-select-DtYh1ZyJ.js";import"./line-weight-select-Dy0ziK87.js";import"./locked-figure-aria-BnZcOiY1.js";import"./locked-function-settings-CagGTrka.js";import"./line-swatch-BYnZZCki.js";import"./locked-line-settings-CRIapeIF.js";import"./locked-point-settings-GmclWHrC.js";import"./labeled-switch-3rtrXmxF.js";import"./locked-polygon-settings-HS3-tLTF.js";import"./locked-vector-settings-BE-ykiZt.js";import"./label-image-editor-DzwYxNit.js";import"./form-wrapped-text-field--eDbzYi4.js";import"./global-colors-BJx09mFA.js";import"./answer-choices-e8OPRx--.js";import"./behavior-C6zF09Q8.js";import"./question-markers-Dfm0EURI.js";import"./marker-B8z4KjYn.js";import"./select-image-CF4-uuUd.js";import"./matcher-editor-BuxSJddq.js";import"./number-line-editor-BBL1Ok4X.js";import"./numeric-input-editor-CWX6Impp.js";import"./phet-simulation-editor-DdH1FHVX.js";import"./plotter-editor-DwuEyirx.js";import"./python-program-editor-Cw1TH7i6.js";import"./editor-yRa-mn_q.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-CSMj1OZe.js";import"./tex-error-view-B6H1MyTc.js";const a={content:`A sequence is defined recursively as follows:


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
