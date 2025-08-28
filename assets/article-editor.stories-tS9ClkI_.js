import{r as o,j as e,A as d}from"./iframe-BUmzxHYu.js";import"./item-version-Ba3MbLqI.js";import"./article-renderer-C0cUZaDS.js";import"./server-item-renderer-9QXZoOik.js";import"./hints-renderer-CvoZhUOY.js";import{A as u}from"./article-editor-CIO28YlN.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D1MV4igD.js";import"./components-DQgEAj9X.js";import"./icon-paths-BMWE7B0u.js";import"./editor-jsonify-BBuuVl9W.js";import"./blur-input-s4KtoSiE.js";import"./tex-error-view-B7F658Ks.js";import"./free-response-editor-CzXJSiEh.js";import"./input-number-editor-C3wWWkd6.js";import"./Popper-BjhnvcWp.js";import"./label-image-editor-HRfrpotE.js";import"./matcher-editor-CdhZHseP.js";import"./number-line-editor-CtPnOYtS.js";import"./phet-simulation-editor-cRwDCfRI.js";import"./plotter-editor-Cl8r2mnX.js";import"./python-program-editor-DWcIeQo9.js";import"./sorter-editor-CYc_mrh3.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
