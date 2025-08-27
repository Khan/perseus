import{r as o,j as e,A as d}from"./iframe-DrenmEsb.js";import"./item-version-DWOGl_3A.js";import"./article-renderer-DiAhqv4P.js";import"./server-item-renderer-Dk0InSHQ.js";import"./hints-renderer-EKE0ysCH.js";import{A as u}from"./article-editor-BIDsadct.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DqkDOcDz.js";import"./components-DRJtDzFc.js";import"./icon-paths-CjY0sQEg.js";import"./editor-jsonify-a0-cuTTe.js";import"./blur-input-Db4dJB3Q.js";import"./tex-error-view-IbvgHgaq.js";import"./free-response-editor-BN5ar-77.js";import"./input-number-editor-CIyioWhj.js";import"./Popper-DHgsclpW.js";import"./label-image-editor-7ELczuAW.js";import"./matcher-editor-CI1h_zZ_.js";import"./number-line-editor-Bk3xchmS.js";import"./phet-simulation-editor-DX-69Tbo.js";import"./plotter-editor-fGiKlehc.js";import"./python-program-editor-c-9K8szC.js";import"./sorter-editor-z2WlqZJi.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
