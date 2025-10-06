import{r as i,j as e,A as d,t as u}from"./iframe-CWALGMeL.js";import"./changeable-Cofc6APC.js";import"./article-renderer-C3qc8_-8.js";import"./server-item-renderer-DO1beWR7.js";import"./hints-renderer-DQ6RBTDt.js";import{A as f}from"./article-editor-CiA8qv9F.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-Bua-YzQz.js";import"./components-BlmQ54dN.js";import"./icon-paths-CKRqeZyq.js";import"./editor-jsonify-RjMlH4rF.js";import"./blur-input-DE4McZNG.js";import"./tex-error-view-DljeqxgT.js";import"./free-response-editor-D003hSpU.js";import"./input-number-editor-C--EBmja.js";import"./Popper-C7kbDKRW.js";import"./label-image-editor-DaRZ4Z6k.js";import"./matcher-editor-Bf_7Qygo.js";import"./number-line-editor-DeInwrL_.js";import"./phet-simulation-editor-CR10u54U.js";import"./plotter-editor-DwU7mmZ1.js";import"./python-program-editor-C3y1ZaAY.js";import"./sorter-editor-DZfe87Gi.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
