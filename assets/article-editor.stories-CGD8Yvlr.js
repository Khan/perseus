import{r as o,j as e,A as d}from"./iframe-4uQEbDMh.js";import"./item-version-DatYEWf7.js";import"./article-renderer-DhVQGZs3.js";import"./server-item-renderer-DGa6cRBh.js";import"./hints-renderer-B1AYVrGg.js";import{A as u}from"./article-editor-CMi-4Qof.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CC2A4seS.js";import"./components-BeSkLA48.js";import"./icon-paths-DDuR-EXH.js";import"./image-editor-CpyETj-T.js";import"./editor-jsonify-YmxYUrj2.js";import"./blur-input-D9pdEjwZ.js";import"./tex-error-view-C4tk8LLC.js";import"./free-response-editor-BepJXjnI.js";import"./input-number-editor-DY-xKQ8H.js";import"./Popper-DSbxk4o-.js";import"./label-image-editor-CP3W7llK.js";import"./matcher-editor-BaWnluIg.js";import"./number-line-editor-BMM_vTdP.js";import"./phet-simulation-editor-iBBr8cna.js";import"./plotter-editor-BmAbNUaM.js";import"./python-program-editor-4ZBm9YjF.js";import"./sorter-editor-DUp1P4za.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const W=["Base"];export{t as Base,W as __namedExportsOrder,T as default};
