import{r as o,j as e,A as d}from"./iframe-jmhP5DYq.js";import"./item-version-CarLLTCT.js";import"./article-renderer-DbyR3z_i.js";import"./server-item-renderer-CabVEdQ3.js";import"./hints-renderer-CreeJyil.js";import{A as u}from"./article-editor-Cjdkxyjd.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CShlJfC2.js";import"./components-DJy5K9pR.js";import"./icon-paths-CGxyq9E3.js";import"./image-editor-C7Pw-XRY.js";import"./editor-jsonify-D0x1XTp0.js";import"./blur-input-C5UoUL_f.js";import"./tex-error-view-UlL4RxFt.js";import"./free-response-editor-DFrnwkaJ.js";import"./input-number-editor-B7zM6mNw.js";import"./Popper-D9H0qOEa.js";import"./label-image-editor-B3YQfoRw.js";import"./matcher-editor-Bl88b9qj.js";import"./number-line-editor-YlqNXkXk.js";import"./phet-simulation-editor-DD5Y2-YW.js";import"./plotter-editor-CJexhDUw.js";import"./python-program-editor-DEIPntXQ.js";import"./sorter-editor-CsRbIQ_G.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
