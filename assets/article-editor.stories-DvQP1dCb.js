import{r as o,j as e,A as d}from"./iframe-DCipDCEt.js";import"./item-version-DmiFt0GP.js";import"./article-renderer-DUv9J2ur.js";import"./server-item-renderer-PlJdvQeK.js";import"./hints-renderer-qE_acjt-.js";import{A as u}from"./article-editor-C7y9zejW.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CIQlnL9H.js";import"./components-CGOdNBpA.js";import"./icon-paths-BP_YvOqK.js";import"./image-editor-DiaE1Rri.js";import"./editor-jsonify-Cp0Z2zPq.js";import"./blur-input-DCN4lEIY.js";import"./tex-error-view-DI1RVsjh.js";import"./free-response-editor-CaEe51ng.js";import"./input-number-editor-C0EZ1PRo.js";import"./Popper-BkXTuEJF.js";import"./label-image-editor-DdDSxizj.js";import"./matcher-editor-GTcHE-r0.js";import"./number-line-editor-Cb2nVW0V.js";import"./phet-simulation-editor-DGCbqBrj.js";import"./plotter-editor-B89V4S5d.js";import"./python-program-editor-Df3oAI6z.js";import"./sorter-editor-B7QlwjV6.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
