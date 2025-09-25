import{r as o,j as e,A as d}from"./iframe-BJkvuOOC.js";import"./changeable-Dc77fJKV.js";import"./article-renderer-Bos98SGZ.js";import"./server-item-renderer-ByDd7Y54.js";import"./hints-renderer-CcXR8Emr.js";import{A as u}from"./article-editor-BcNXmQ1u.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-ChaxuhEb.js";import"./components-BmaHnPJ2.js";import"./icon-paths-Ccp7PnUQ.js";import"./editor-jsonify-DtaPk0VJ.js";import"./blur-input-quAEPlnY.js";import"./tex-error-view-BWs8h77f.js";import"./free-response-editor-C3jzMFcc.js";import"./input-number-editor-eIdQpm4R.js";import"./Popper-0CtRCVK-.js";import"./label-image-editor-2QyQVefB.js";import"./matcher-editor-lOltfeo7.js";import"./number-line-editor-ukMFLsq5.js";import"./phet-simulation-editor-BGvgUFO-.js";import"./plotter-editor-V70bSFZP.js";import"./python-program-editor-CiZNU6UT.js";import"./sorter-editor-C9r2P_u2.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
