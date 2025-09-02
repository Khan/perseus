import{r as o,j as e,A as d}from"./iframe-CMpwY_lu.js";import"./item-version-CYNhGz34.js";import"./article-renderer-z8s2ZpAo.js";import"./server-item-renderer-D8qksYpA.js";import"./hints-renderer-C7fKmlXx.js";import{A as u}from"./article-editor-B2a7iQ1g.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BHmmxzc3.js";import"./components-BxqPaA1W.js";import"./icon-paths-Bm_PT7ys.js";import"./editor-jsonify-BAQ7nwBC.js";import"./blur-input-BUZ_M12_.js";import"./tex-error-view-B1SopAc8.js";import"./free-response-editor-BdQ8zHZS.js";import"./input-number-editor-DwCdK2Oq.js";import"./Popper-DRHVdZhy.js";import"./label-image-editor-BlGXwXMq.js";import"./matcher-editor-yp1dSaI_.js";import"./number-line-editor-bsK6t0oI.js";import"./phet-simulation-editor-DDM1aMAz.js";import"./plotter-editor-mMn9uxj1.js";import"./python-program-editor-Bq7uCvWB.js";import"./sorter-editor-B5n-ysP0.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
