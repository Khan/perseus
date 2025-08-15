import{r as o,j as e,A as d}from"./iframe-Clm9i0Cj.js";import"./item-version-BpJf2pk1.js";import"./article-renderer-B87WTxaD.js";import"./server-item-renderer-CGTn08AO.js";import"./hints-renderer-CSjH4BnA.js";import{A as u}from"./article-editor-BFBL7kEp.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B_pznS5A.js";import"./components-Cld4qBvX.js";import"./icon-paths-DbJ4vfJC.js";import"./image-editor-CLO7614Q.js";import"./editor-jsonify-C1LGqRJV.js";import"./blur-input-Dt4MJbXq.js";import"./tex-error-view-DM_X-vGN.js";import"./free-response-editor-D7RnPsc6.js";import"./input-number-editor-Byc4fDrD.js";import"./Popper-BCoo0HPc.js";import"./label-image-editor-B7OcdZ8x.js";import"./matcher-editor-BrTFlAkE.js";import"./number-line-editor-ChY8iSJZ.js";import"./phet-simulation-editor-CrHBYbv7.js";import"./plotter-editor-B-bCzttK.js";import"./python-program-editor-5w50I1hx.js";import"./sorter-editor-DgfmGusR.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
