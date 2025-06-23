import{r as n,j as l}from"./iframe-B_16MRTp.js";import{I as h}from"./interaction-editor-CuwED8yg.js";import"./item-version-9W43G8cZ.js";import"./article-renderer-LUbgHaPn.js";import"./server-item-renderer-1LUmkp6m.js";import"./hints-renderer-B-q9yvuG.js";import"./editor-jsonify-3XOEdiIl.js";import"./graph-settings-OAu7RVBG.js";import"./components-CA-pBWcu.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
