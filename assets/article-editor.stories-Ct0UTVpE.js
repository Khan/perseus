import{r as o,j as e,A as d}from"./iframe-DuyLhNDL.js";import"./changeable-Cte12Kon.js";import"./article-renderer-WLfEIjFg.js";import"./server-item-renderer-DUbxMv6R.js";import"./hints-renderer-Bky06awl.js";import{A as u}from"./article-editor-BpLX1GlH.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BEy2LY3z.js";import"./components-BZLqjw0k.js";import"./icon-paths-pDtP2kcP.js";import"./editor-jsonify-Bbs-1Z-T.js";import"./blur-input-C3o5vSeT.js";import"./tex-error-view-BCALdYpA.js";import"./free-response-editor-BMW3P_mE.js";import"./input-number-editor-XMY4ia1z.js";import"./Popper-D8Xs7c5G.js";import"./label-image-editor-Ctp-xBfw.js";import"./matcher-editor-uc3pL26m.js";import"./number-line-editor-C9Q9SGSk.js";import"./phet-simulation-editor-DgIpZSvm.js";import"./plotter-editor-BymFeERy.js";import"./python-program-editor-RoxVl1E6.js";import"./sorter-editor-CKwGI6NQ.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
