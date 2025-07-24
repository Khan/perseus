import{r as n,j as l}from"./iframe-C-wjKudE.js";import{I as h}from"./interaction-editor-Dsr9JcTC.js";import"./item-version-a7DtHh5j.js";import"./article-renderer-B2JAE8o_.js";import"./server-item-renderer-DbBQSC2v.js";import"./hints-renderer-Dxk8feSH.js";import"./editor-jsonify-DhUAjaOE.js";import"./graph-settings-De8Oy22k.js";import"./components-Vk11JFRY.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
