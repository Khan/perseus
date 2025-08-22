import{r as o,j as e,A as d}from"./iframe-EWGmIh4C.js";import"./item-version-DJ0cjDAI.js";import"./article-renderer-BZV8qgGd.js";import"./server-item-renderer-IU-E4vSS.js";import"./hints-renderer-BpJVG8h4.js";import{A as u}from"./article-editor-DdQY5JG2.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-2i6I9PFf.js";import"./components-yUAMwI8R.js";import"./icon-paths-DcEBdnV1.js";import"./image-editor-jM9qHzQc.js";import"./editor-jsonify-CVlMUq2L.js";import"./blur-input-DekE0Gmr.js";import"./tex-error-view-CT8jTCOU.js";import"./free-response-editor-BOTNAwx2.js";import"./input-number-editor-CTr9EXSE.js";import"./Popper-CG3p9Bbt.js";import"./label-image-editor-Cb5taJvk.js";import"./matcher-editor-BkJ-naWn.js";import"./number-line-editor-D80_rl5E.js";import"./phet-simulation-editor-B1wHb-aM.js";import"./plotter-editor-9HzjNh-F.js";import"./python-program-editor-xSCzkHSK.js";import"./sorter-editor-Cr01NIv9.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
