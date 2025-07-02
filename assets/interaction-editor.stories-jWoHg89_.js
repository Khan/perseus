import{r as n,j as l}from"./iframe-Dp3THxR6.js";import{I as h}from"./interaction-editor-F_edY8bi.js";import"./item-version-BB7FzkBy.js";import"./article-renderer-DOJdkHN2.js";import"./server-item-renderer-Dp8rjiTI.js";import"./hints-renderer-BYuLKa6p.js";import"./editor-jsonify-CY-A1SFJ.js";import"./graph-settings-D2BZ3k72.js";import"./components-Byo4uxsz.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
