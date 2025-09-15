import{r as o,j as e,A as d}from"./iframe-Dxi_7cS6.js";import"./changeable-CkfSkSc0.js";import"./article-renderer-BJ8itBRI.js";import"./server-item-renderer-DJVITHBn.js";import"./hints-renderer-K-yvR1ip.js";import{A as u}from"./article-editor-ChgxH5nd.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-4s6Trjk-.js";import"./components-DpvDCiF_.js";import"./icon-paths-B7UJYAoe.js";import"./editor-jsonify-DjfbxRCu.js";import"./blur-input-DIqrscLv.js";import"./tex-error-view-DBq1I-Nx.js";import"./free-response-editor-BhjSuF7T.js";import"./input-number-editor-D4Hd71Bj.js";import"./Popper-Czy8iEXb.js";import"./label-image-editor-CaRy7hxE.js";import"./matcher-editor-CpbfepkI.js";import"./number-line-editor-Cu4NRD0j.js";import"./phet-simulation-editor-DuPjI3q4.js";import"./plotter-editor-BqClXYVu.js";import"./python-program-editor-X4JabCjA.js";import"./sorter-editor-BBGTNy3y.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
