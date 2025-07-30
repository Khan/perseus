import{r as o,j as e,A as d}from"./iframe-qpA9NB0p.js";import"./item-version-D83i3BdP.js";import"./article-renderer-DkgHKB4I.js";import"./server-item-renderer-CIFgUBjs.js";import"./hints-renderer-D_01Gx1V.js";import{A as u}from"./article-editor-Cu8gmBic.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DNBUpPFG.js";import"./components-BfcsuoGt.js";import"./icon-paths-BaYBoBYc.js";import"./image-editor-AO2aEzxq.js";import"./editor-jsonify-DYnWANNn.js";import"./blur-input-m09RzI1o.js";import"./tex-error-view-DaEW7TYe.js";import"./free-response-editor-CJ1mCgbF.js";import"./input-number-editor-Dgry3TGR.js";import"./Popper-BMl528ea.js";import"./label-image-editor-DnYDbw_C.js";import"./matcher-editor-OTYmwNqS.js";import"./number-line-editor-FlBJEohE.js";import"./phet-simulation-editor-iXvpX02p.js";import"./plotter-editor-ByAtvWNM.js";import"./python-program-editor-Zz3pwUYZ.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-CKB-q5cd.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
