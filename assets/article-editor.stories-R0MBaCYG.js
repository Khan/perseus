import{r as o,j as e,A as d}from"./iframe-CyaMcHXZ.js";import"./item-version-CpFDh9zS.js";import"./article-renderer-fFuMDBLs.js";import"./server-item-renderer-RD683Umq.js";import"./hints-renderer-DyNQzPo6.js";import{A as u}from"./article-editor-CX6gIA91.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DnK73_Xo.js";import"./components-CeADTnW2.js";import"./icon-paths-BBokJ0yk.js";import"./editor-jsonify-BVn9NTGH.js";import"./blur-input-DkAiQDAG.js";import"./tex-error-view-DyRGKk71.js";import"./free-response-editor-BD9d-4nq.js";import"./input-number-editor-BPf13ik1.js";import"./Popper-CWwY0hmD.js";import"./label-image-editor-fx5PQsZa.js";import"./matcher-editor-CbQj5bKR.js";import"./number-line-editor-B1VXTyI_.js";import"./phet-simulation-editor-CF5RJBj4.js";import"./plotter-editor-cOLo9f4D.js";import"./python-program-editor-DChfzIat.js";import"./sorter-editor-DSOpxY6w.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
