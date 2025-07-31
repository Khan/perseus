import{r as o,j as e,A as d}from"./iframe-CLPXYnSD.js";import"./item-version-CzQ-GdRC.js";import"./article-renderer-BxzuHob4.js";import"./server-item-renderer-CJ0Z_TY2.js";import"./hints-renderer-oRyt3OBE.js";import{A as u}from"./article-editor-B-b73Asm.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DKR1-Jri.js";import"./components-CizHm1Fc.js";import"./icon-paths-Cpv04_aH.js";import"./image-editor-B0EwzCNI.js";import"./editor-jsonify-IIgxAHB1.js";import"./blur-input-lfhKadSG.js";import"./tex-error-view-DYpm2ybK.js";import"./free-response-editor-CJySJpkK.js";import"./input-number-editor-DSRTztD0.js";import"./Popper-BzocqVXl.js";import"./label-image-editor-BrlYKh-M.js";import"./matcher-editor-B9gf-f41.js";import"./number-line-editor--M36Yk_-.js";import"./phet-simulation-editor-IgixW_eA.js";import"./plotter-editor-DcrGpsks.js";import"./python-program-editor-C4KUdTp2.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BgOgD35e.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
