import{r as o,j as e,A as d}from"./iframe-a55SfhnE.js";import"./item-version-DwllJm9Q.js";import"./article-renderer-C6c4yXez.js";import"./server-item-renderer-D9BD87iI.js";import"./hints-renderer-DCMmlGYF.js";import{A as u}from"./article-editor-BlgD5FIV.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B2YRPAP6.js";import"./components-XqNhEz7A.js";import"./icon-paths-Ch58QTow.js";import"./image-editor-Ble12KcX.js";import"./editor-jsonify-DnRS02Na.js";import"./blur-input-CMjhRFIh.js";import"./tex-error-view-D9JjdLFc.js";import"./free-response-editor-BfL-9gp7.js";import"./input-number-editor-Ba-oBuWt.js";import"./Popper-8XWiuF_d.js";import"./label-image-editor-CQHTtKaB.js";import"./matcher-editor-BkCZSj8v.js";import"./number-line-editor-F7KX3Xm6.js";import"./phet-simulation-editor-kpyZOn3o.js";import"./plotter-editor-BduSkmxW.js";import"./python-program-editor-CpSRjVsD.js";import"./sorter-editor-DVeFLomy.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
