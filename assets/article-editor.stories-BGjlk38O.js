import{r as o,j as e,A as d}from"./iframe-D63BQX-M.js";import"./item-version-CXOfxVCP.js";import"./article-renderer-BxcGfNlJ.js";import"./server-item-renderer-BKH_W4Eq.js";import"./hints-renderer-CWHWRquC.js";import{A as u}from"./article-editor-oswwyBgF.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BkxAZAan.js";import"./components-CMAcGlD9.js";import"./icon-paths-CI_krsjO.js";import"./image-editor-Cd1EfFAH.js";import"./editor-jsonify-CH7LEOWU.js";import"./blur-input-DGrL3JLL.js";import"./tex-error-view-3oEtQmaJ.js";import"./free-response-editor-jJnWYljQ.js";import"./input-number-editor-vsXTprRX.js";import"./Popper-CQJtVtxl.js";import"./label-image-editor-B39NVWcp.js";import"./matcher-editor-E-U2wvqt.js";import"./number-line-editor-sfNK9RAp.js";import"./phet-simulation-editor-tyIaJQXW.js";import"./plotter-editor-1xw5k_dN.js";import"./python-program-editor-D5C8W7Tr.js";import"./sorter-editor-DAoQb1Mz.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
