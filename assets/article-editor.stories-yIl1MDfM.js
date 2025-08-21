import{r as o,j as e,A as d}from"./iframe-0zUPoAZ7.js";import"./item-version-CFI0kdch.js";import"./article-renderer-BN9pbrUK.js";import"./server-item-renderer-BeIdW-PA.js";import"./hints-renderer-zVIJgcy_.js";import{A as u}from"./article-editor-LD9p5qBd.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D5zrTw3j.js";import"./components-D0hA4O2N.js";import"./icon-paths-CX3jK57z.js";import"./image-editor-C5bEIzrH.js";import"./editor-jsonify-C4CFFXrb.js";import"./blur-input-TVvXRCdM.js";import"./tex-error-view-I3eIea6D.js";import"./free-response-editor-add_Uy2O.js";import"./input-number-editor-D_vVPjZH.js";import"./Popper-DSXSwtwl.js";import"./label-image-editor-1rJJoLMi.js";import"./matcher-editor-BCC-RLIR.js";import"./number-line-editor-C92LmNTJ.js";import"./phet-simulation-editor-Big2fCIH.js";import"./plotter-editor-CohcQ28i.js";import"./python-program-editor-BeWoCnuO.js";import"./sorter-editor-XDaECAAI.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
