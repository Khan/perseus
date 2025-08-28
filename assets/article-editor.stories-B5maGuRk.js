import{r as o,j as e,A as d}from"./iframe-Bskf6_5k.js";import"./item-version-C2wb0nUj.js";import"./article-renderer-RuBL_5ml.js";import"./server-item-renderer-CPvhlrYN.js";import"./hints-renderer-D60vmVCX.js";import{A as u}from"./article-editor-fAjBgM4A.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DNawvt2b.js";import"./components-Mdj1yu65.js";import"./icon-paths-Ce9bc5yE.js";import"./editor-jsonify-Cs4OpxO_.js";import"./blur-input-CUyL1V-Q.js";import"./tex-error-view-CoNAzxsh.js";import"./free-response-editor-D-3TE6FN.js";import"./input-number-editor-hkRcDnxl.js";import"./Popper-BvX9w4l5.js";import"./label-image-editor-ByVUnPMv.js";import"./matcher-editor-C6QF-EVD.js";import"./number-line-editor-Bym42sfk.js";import"./phet-simulation-editor-MD0vFBP_.js";import"./plotter-editor-DKUuR5Mj.js";import"./python-program-editor-CypGZy3e.js";import"./sorter-editor-D9cD9tyK.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
