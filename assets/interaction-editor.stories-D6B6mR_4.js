import{r as n,j as l}from"./iframe-BLnk7R3A.js";import{I as h}from"./interaction-editor-CkheaFnF.js";import"./item-version-BkF3W7GB.js";import"./article-renderer-BwUiNcPk.js";import"./server-item-renderer-IpHh8sRL.js";import"./hints-renderer-DEhrvpZS.js";import"./editor-jsonify-Dyzv4eIF.js";import"./graph-settings-CLmy9Uwv.js";import"./components-JIs2XqQb.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
