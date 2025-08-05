import{r as o,j as e,A as d}from"./iframe-BIABMJtR.js";import"./item-version-BKUr-fPJ.js";import"./article-renderer-CE9w3OlL.js";import"./server-item-renderer-DEESoUDs.js";import"./hints-renderer-Bh92iuMv.js";import{A as u}from"./article-editor-Ch9lQbLp.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CjY7Ze6C.js";import"./components-DCMguumq.js";import"./icon-paths-Qsf27BpV.js";import"./image-editor-ADMdB3TQ.js";import"./editor-jsonify-f8pHmYBa.js";import"./blur-input-Dl8BVPhu.js";import"./tex-error-view-CDvM-Jm6.js";import"./free-response-editor-Bschd7ii.js";import"./input-number-editor-BR3InMZ-.js";import"./Popper-CTpnpkp6.js";import"./label-image-editor-CUJt8uc7.js";import"./matcher-editor-B9au0ahu.js";import"./number-line-editor-CRbnpyX-.js";import"./phet-simulation-editor-BVhqIMRG.js";import"./plotter-editor-BUpAkGHs.js";import"./python-program-editor-DqHf0RE1.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BHw-aJfA.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const q=["Base"];export{t as Base,q as __namedExportsOrder,W as default};
