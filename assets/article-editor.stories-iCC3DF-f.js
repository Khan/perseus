import{r as o,j as e,A as d}from"./iframe-VfLzbn0l.js";import"./item-version-DiAl8tNG.js";import"./article-renderer-DOOwSq8O.js";import"./server-item-renderer-BFDttC8D.js";import"./hints-renderer-DyYakdhL.js";import{A as u}from"./article-editor-DNSc6_zb.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-qzeCSa1m.js";import"./components-mlAVB5BN.js";import"./icon-paths-zhZ88CTh.js";import"./image-editor-z92noryO.js";import"./editor-jsonify-B-V7PntW.js";import"./blur-input-NXTvRu2F.js";import"./tex-error-view-s4FR7AaM.js";import"./free-response-editor-CA4JazhE.js";import"./input-number-editor-C4dGZlOx.js";import"./Popper-BjvzWg7q.js";import"./label-image-editor-pnvrbq11.js";import"./matcher-editor-Bq_KJkST.js";import"./number-line-editor-48eOolz2.js";import"./phet-simulation-editor-BBlVJUbd.js";import"./plotter-editor-BMxVmN1t.js";import"./python-program-editor-Kqn0ZbvV.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-CbB1AZkV.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const q=["Base"];export{t as Base,q as __namedExportsOrder,W as default};
