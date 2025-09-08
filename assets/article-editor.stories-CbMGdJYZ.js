import{r as o,j as e,A as d}from"./iframe-D2zhQ65D.js";import"./item-version-BBCzxQy0.js";import"./article-renderer-8yb5SZcs.js";import"./server-item-renderer-BCvJq6wh.js";import"./hints-renderer-C3Tbrrtj.js";import{A as u}from"./article-editor-B9wd324S.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B0Hj9BWr.js";import"./components-F2-4gBMo.js";import"./icon-paths-D4bwPppe.js";import"./editor-jsonify-BKT4fHo4.js";import"./blur-input-DfdbCwjP.js";import"./tex-error-view-DyJ_zi26.js";import"./free-response-editor-DOt17R9u.js";import"./input-number-editor-DwFXPxrg.js";import"./Popper-CAGTyY7S.js";import"./label-image-editor-C2JPVbN5.js";import"./matcher-editor-DNROWPlx.js";import"./number-line-editor-BJRVRBzi.js";import"./phet-simulation-editor-Bfx9_dyG.js";import"./plotter-editor-Bbfu0QAs.js";import"./python-program-editor-b3uQC66t.js";import"./sorter-editor-95VHN7xX.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
