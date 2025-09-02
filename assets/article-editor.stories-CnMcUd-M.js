import{r as o,j as e,A as d}from"./iframe-3GGxRJhQ.js";import"./item-version-BEu79Ulj.js";import"./article-renderer-DRaAA58b.js";import"./server-item-renderer-DNwTl69h.js";import"./hints-renderer-yDRR9REL.js";import{A as u}from"./article-editor-CAaw5HEu.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Dea0u4Gn.js";import"./components-Dvp3BuUs.js";import"./icon-paths-CqL_w7ML.js";import"./editor-jsonify-BfVaLICj.js";import"./blur-input-BZiOa47b.js";import"./tex-error-view-CCgNe8wz.js";import"./free-response-editor-gPyhZuf7.js";import"./input-number-editor-BQkQ20dC.js";import"./Popper-CK6FMInW.js";import"./label-image-editor-XFSfndFh.js";import"./matcher-editor-BH9P2kpH.js";import"./number-line-editor-D9v_qlyy.js";import"./phet-simulation-editor-DtlpJp_y.js";import"./plotter-editor-B0kJRUyM.js";import"./python-program-editor-B5TsbxA9.js";import"./sorter-editor-zd5tZ3HV.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
