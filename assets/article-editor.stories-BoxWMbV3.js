import{r as o,j as e,A as d}from"./iframe-O9iTnbIO.js";import"./item-version-BmFQ1h55.js";import"./article-renderer-4kATc_PY.js";import"./server-item-renderer-BYLxd-41.js";import"./hints-renderer-B_n3FZ3M.js";import{A as u}from"./article-editor-Xm92gmEF.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-xreaZayL.js";import"./components-DdF25-Tu.js";import"./icon-paths-CUN3jE7y.js";import"./editor-jsonify-BvsXn6iQ.js";import"./blur-input-FXvUOfuK.js";import"./tex-error-view-B1nK9Hgs.js";import"./free-response-editor-B9GCcy4J.js";import"./input-number-editor-CN8TYB1B.js";import"./Popper-wL8TAtQp.js";import"./label-image-editor-CcLSkBCY.js";import"./matcher-editor-DR0FFKlY.js";import"./number-line-editor-CQAbms78.js";import"./phet-simulation-editor-BPqb6OlX.js";import"./plotter-editor-CQAhK_sw.js";import"./python-program-editor-OK6vhCV_.js";import"./sorter-editor-njOoVoHg.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
