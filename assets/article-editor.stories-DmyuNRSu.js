import{r as o,j as e,A as d}from"./iframe-D5ZxZp1t.js";import"./item-version-Ce5hORdX.js";import"./article-renderer-BwaA8jYv.js";import"./server-item-renderer-B6NtoC1Z.js";import"./hints-renderer-lA5Bszlv.js";import{A as u}from"./article-editor-CJnISNgn.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-poQa_Ioa.js";import"./components-G_uGf2E0.js";import"./icon-paths-DUlALo5j.js";import"./image-editor-DvZZGHbP.js";import"./editor-jsonify-BrMcoYYj.js";import"./blur-input-BM37zQRj.js";import"./tex-error-view-BaX1rI7p.js";import"./free-response-editor-BhJPUhw0.js";import"./input-number-editor-BS_8BDzV.js";import"./Popper-ClraSgaN.js";import"./label-image-editor-Cdf2yDUz.js";import"./matcher-editor-DJ13o3IT.js";import"./number-line-editor-BxQDAPmi.js";import"./phet-simulation-editor-CNBKSWwD.js";import"./plotter-editor-BgjAva1w.js";import"./python-program-editor-Cuui956c.js";import"./sorter-editor-BtQQLGXw.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
