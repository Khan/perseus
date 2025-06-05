import{r as n,j as l}from"./iframe-C4cY5clK.js";import{I as h}from"./interaction-editor-D5tIXEnj.js";import"./item-version-CZ0mLQQR.js";import"./article-renderer-Djd7mAf7.js";import"./server-item-renderer-DdPpHRSE.js";import"./hints-renderer-BDOxnyqW.js";import"./editor-jsonify-BeR8Zz6n.js";import"./graph-settings-CQrj_1sg.js";import"./components-D8CCxqCC.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const [elements, setElements] = useState();
  const [graph, setGraph] = useState();
  function handleChange(next) {
    if (next.graph) {
      setGraph(next.graph);
    }
    if (next.elements) {
      setElements(next.elements);
    }
  }
  return <InteractionEditor onChange={handleChange} elements={elements} graph={graph} />;
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const G=["Default"];export{e as Default,G as __namedExportsOrder,D as default};
