import{r as o,j as e,A as d}from"./iframe-DNLuwkSX.js";import"./changeable-BrYV8FQc.js";import"./article-renderer-BSdFCchD.js";import"./server-item-renderer-mFeDoWZb.js";import"./hints-renderer-Cn-czULo.js";import{A as u}from"./article-editor-skftV5ad.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DvQZOPJI.js";import"./components-BowdbxD5.js";import"./icon-paths-FQZmsGYJ.js";import"./editor-jsonify-BWtoc_lf.js";import"./blur-input-Cvztuer2.js";import"./tex-error-view-CaXzdqyn.js";import"./free-response-editor-C01VQv8-.js";import"./input-number-editor-BZTISK9Q.js";import"./Popper-D_WENJOx.js";import"./label-image-editor-DNAz82sa.js";import"./matcher-editor-CTL6_J4F.js";import"./number-line-editor-Dd9pryvD.js";import"./phet-simulation-editor-bNc94zcp.js";import"./plotter-editor-DylFrKrX.js";import"./python-program-editor-SJ41GCai.js";import"./sorter-editor-B8L6xGvX.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
