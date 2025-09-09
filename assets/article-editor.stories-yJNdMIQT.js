import{r as o,j as e,A as d}from"./iframe-BlaVeZ39.js";import"./changeable-BC4l_XWb.js";import"./article-renderer-BMKPdclk.js";import"./server-item-renderer-eObpF2B_.js";import"./hints-renderer-C5J5gysr.js";import{A as u}from"./article-editor-CGBls59p.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D4UOjRYA.js";import"./components-phdiDwe-.js";import"./icon-paths-DH7JIVt4.js";import"./editor-jsonify-_GFufwN_.js";import"./blur-input-BRXUj7AE.js";import"./tex-error-view-Bcz87FNJ.js";import"./free-response-editor-3T-rHx6l.js";import"./input-number-editor-Cz2sdCMa.js";import"./Popper-CWt_rvVt.js";import"./label-image-editor-0MgE9mgC.js";import"./matcher-editor-DasyA75G.js";import"./number-line-editor-4X7MaAGZ.js";import"./phet-simulation-editor-Banfddf6.js";import"./plotter-editor-BdGZ7eeu.js";import"./python-program-editor-Caiimr7m.js";import"./sorter-editor-DUkzipxV.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
  const [state, setState] = useState();
  const articleEditorRef = useRef();
  function handleChange(value) {
    setState(value.json);
  }
  function serialize() {
    // eslint-disable-next-line no-console
    console.log((articleEditorRef.current as any).serialize());
  }
  return <>
            <button onClick={serialize}>Serialize</button>
            <hr />
            <ArticleEditor apiOptions={ApiOptions.defaults} imageUploader={() => {}} json={state} onChange={handleChange} previewURL="/perseus/frame" ref={articleEditorRef as any} />
        </>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const T=["Base"];export{t as Base,T as __namedExportsOrder,N as default};
