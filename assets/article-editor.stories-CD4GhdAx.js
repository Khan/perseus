import{r as o,j as e,A as d}from"./iframe-CLVBQWE0.js";import"./changeable-CkOVyCZQ.js";import"./article-renderer-C32vzjm7.js";import"./server-item-renderer-CAuBpTLE.js";import"./hints-renderer-CPnbZ6Id.js";import{A as u}from"./article-editor-BanH9_f5.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-poBMDCFc.js";import"./components-C-mYuU4u.js";import"./icon-paths-D3q2A7gI.js";import"./editor-jsonify-B7xLxkDZ.js";import"./blur-input-CWGzGMpT.js";import"./tex-error-view-Bjptu1ic.js";import"./free-response-editor-BN1oTx_b.js";import"./input-number-editor-DRdAFWZk.js";import"./Popper-DLmKkyLY.js";import"./label-image-editor-DVXMoJq2.js";import"./matcher-editor-BSd6L62s.js";import"./number-line-editor-Cw-p9Y61.js";import"./phet-simulation-editor-BDt4z7jH.js";import"./plotter-editor-D44KEYDt.js";import"./python-program-editor-B9GBwkv6.js";import"./sorter-editor-CGKYLGEc.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
