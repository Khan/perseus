import{r as o,j as e,A as d}from"./iframe-C7r_V3A-.js";import"./item-version-Dp7EepHS.js";import"./article-renderer-B8rxj9lD.js";import"./server-item-renderer-fFaUHM7b.js";import"./hints-renderer-Cn-VWBYq.js";import{A as u}from"./article-editor-BAGAdvQU.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BlrUKoSv.js";import"./components-i0uJlaFJ.js";import"./icon-paths-DUcqOpm-.js";import"./image-editor-D3I4OVya.js";import"./editor-jsonify-CeWDWSYp.js";import"./blur-input-BKjw29-U.js";import"./tex-error-view-CihWTIwY.js";import"./free-response-editor-hJ6dN2Ea.js";import"./input-number-editor-DUtH9wpS.js";import"./Popper-BjTwEEqs.js";import"./label-image-editor-CKwXqGgw.js";import"./matcher-editor-KJmJLGcA.js";import"./number-line-editor-C702JRP4.js";import"./phet-simulation-editor-CmKUFey_.js";import"./plotter-editor-DecKok4-.js";import"./python-program-editor-D-p5p7f1.js";import"./sorter-editor-C0i6emr0.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
