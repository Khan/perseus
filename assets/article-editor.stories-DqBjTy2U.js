import{r as i,j as e,A as d,t as u}from"./iframe-BnR2CVlk.js";import"./changeable-Cs5R8WQC.js";import"./article-renderer-BDeAmHcF.js";import"./server-item-renderer-CVkwPyWY.js";import"./hints-renderer-CJq1w6aN.js";import{A as f}from"./article-editor-BcZs3hJi.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-CxQJxN7z.js";import"./components-CGgHTwyb.js";import"./icon-paths-BuhQPCr2.js";import"./editor-jsonify-CFS3iLUM.js";import"./blur-input-BdK6OW6B.js";import"./tex-error-view-BamCS-X4.js";import"./free-response-editor-DT1RMxKd.js";import"./input-number-editor-BXsAyk7G.js";import"./Popper-DTGSAPpT.js";import"./label-image-editor-MW6g5w8w.js";import"./matcher-editor-BkRJ8pV4.js";import"./number-line-editor-m7ouKPg1.js";import"./phet-simulation-editor-Cftgsm38.js";import"./plotter-editor-B11uq4k7.js";import"./python-program-editor-B5KDqgAo.js";import"./sorter-editor-PX6c-a56.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
