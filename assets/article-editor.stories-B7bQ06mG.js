import{r as i,j as e,A as d,t as u}from"./iframe-MEhIakqK.js";import"./changeable-YuXjjBKi.js";import"./article-renderer-CSGzOeo4.js";import"./server-item-renderer-CloFckl8.js";import"./hints-renderer-dh5_1Uk0.js";import{A as f}from"./article-editor-C0l903Ju.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-BMkgKJ5u.js";import"./components-DgVtQ3UE.js";import"./icon-paths-Dx1tA4tt.js";import"./editor-jsonify-OcV1NR_q.js";import"./blur-input-CEsUHBpV.js";import"./tex-error-view-oZBlEeVD.js";import"./free-response-editor-BV2CrJ1-.js";import"./input-number-editor-DC_Kyx2w.js";import"./Popper-kOFu604f.js";import"./label-image-editor-5Nf5ryTF.js";import"./matcher-editor-CyGzAsn-.js";import"./number-line-editor-Deh5klHg.js";import"./phet-simulation-editor-B1iJk1Dy.js";import"./plotter-editor-Bz5835LL.js";import"./python-program-editor-CYzhwb5o.js";import"./sorter-editor-Ez-EI2x1.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
