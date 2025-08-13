import{r as o,j as e,A as d}from"./iframe-DcX1XJ3d.js";import"./item-version-BffZXVI6.js";import"./article-renderer-Dz7rM-jh.js";import"./server-item-renderer-CaSs5YoB.js";import"./hints-renderer-9Xuo14yo.js";import{A as u}from"./article-editor-pRGapRxj.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CACD2caG.js";import"./components-DKx5fh1N.js";import"./icon-paths-BlkAgb9b.js";import"./image-editor-_0Sed8Di.js";import"./editor-jsonify-CjGAy360.js";import"./blur-input-h3uV8RCt.js";import"./tex-error-view-C_P0-Kwe.js";import"./free-response-editor-C0U8YgW9.js";import"./input-number-editor-CvjIUnnH.js";import"./Popper-0wesHLxV.js";import"./label-image-editor-l5CjTL-L.js";import"./matcher-editor-DHtmlJFM.js";import"./number-line-editor-BlFzSoou.js";import"./phet-simulation-editor-Bp0rsdPE.js";import"./plotter-editor-BuJ96YgZ.js";import"./python-program-editor-C6Ci8ZuC.js";import"./sorter-editor-_waYDqQp.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
