import{r as o,j as e,A as d}from"./iframe-CARR3CRw.js";import"./item-version-jpbmxoyV.js";import"./article-renderer-DIfYlISB.js";import"./server-item-renderer-CMrkfZ4J.js";import"./hints-renderer-CKEH7T-_.js";import{A as u}from"./article-editor-QVc2YAGm.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Bsr0TZ-9.js";import"./components-C7O69W5k.js";import"./icon-paths-EzJJVk3X.js";import"./editor-jsonify-DIGChwnb.js";import"./blur-input-D4FBy9WU.js";import"./tex-error-view-CnFvQUxB.js";import"./free-response-editor-DMbi68df.js";import"./input-number-editor-DS9Lz0jX.js";import"./Popper-C984f46g.js";import"./label-image-editor-BjBPVxMC.js";import"./matcher-editor-CUwaROGM.js";import"./number-line-editor-CHYr6asi.js";import"./phet-simulation-editor-DPwzpWgR.js";import"./plotter-editor-BZeiUC2I.js";import"./python-program-editor-BuKMmY8v.js";import"./sorter-editor-o6yBEmmr.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
