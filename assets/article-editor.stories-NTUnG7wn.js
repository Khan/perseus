import{r as i,j as e,A as d,t as u}from"./iframe-CE3NtP5L.js";import"./changeable-DwduNT8j.js";import"./article-renderer-BASSpE1N.js";import"./server-item-renderer-DaNYm8hP.js";import"./hints-renderer-D5-b75Ob.js";import{A as f}from"./article-editor-DeYbBZvB.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-EAfzgyQl.js";import"./components-YB-zxKPE.js";import"./icon-paths-gQMXLUCl.js";import"./editor-jsonify-CQ_3wDe8.js";import"./blur-input-Ci_Tl5qK.js";import"./tex-error-view-GhmKUKNI.js";import"./free-response-editor-COly_dwl.js";import"./input-number-editor-MwphhRN9.js";import"./Popper-BJVmXmDi.js";import"./label-image-editor-BE1cI9FI.js";import"./matcher-editor-Ccjh1225.js";import"./number-line-editor-BcL7W3m9.js";import"./phet-simulation-editor-D9JBUUwj.js";import"./plotter-editor-eLwO-Lu0.js";import"./python-program-editor-wYykOW8R.js";import"./sorter-editor-CE-_nrEa.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={ApiOptions.defaults} imageUploader={() => {}} json={state} onChange={handleChange} previewURL="/perseus/frame" ref={articleEditorRef as any} />
        </>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const N=["Base"];export{t as Base,N as __namedExportsOrder,I as default};
