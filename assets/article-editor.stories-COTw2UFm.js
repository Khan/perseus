import{r as o,j as e,A as d}from"./iframe-BnSSG4sW.js";import"./item-version-Ce4RjSBo.js";import"./article-renderer-BJYuoQxt.js";import"./server-item-renderer-CWzbm4vh.js";import"./hints-renderer-CPkN2nZt.js";import{A as u}from"./article-editor-Dm-mBIhA.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DUcoP3kX.js";import"./components-Da_1M7sF.js";import"./icon-paths-CAoRJaXU.js";import"./editor-jsonify-DF3jrBud.js";import"./blur-input-iQpe74wH.js";import"./tex-error-view-D6EEUqDV.js";import"./free-response-editor-BG42A9zD.js";import"./input-number-editor-9Gj1dSMP.js";import"./Popper-Yt2JR4df.js";import"./label-image-editor-B44Wo_x5.js";import"./matcher-editor-BRJixPzh.js";import"./number-line-editor-zkENUOPk.js";import"./phet-simulation-editor-CH8Qu0Ul.js";import"./plotter-editor-u69l_SMD.js";import"./python-program-editor-CKxSCMXr.js";import"./sorter-editor-B6dD5N5_.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
