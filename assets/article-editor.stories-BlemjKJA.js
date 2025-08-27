import{r as o,j as e,A as d}from"./iframe-BEpDFuEi.js";import"./item-version-CjJ8BGV5.js";import"./article-renderer-CqL6Br8Y.js";import"./server-item-renderer-Cm8HzarJ.js";import"./hints-renderer-CMCzx8se.js";import{A as u}from"./article-editor-B8EDMjSz.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-XtosSAnm.js";import"./components-C6zBg3Ka.js";import"./icon-paths-BO0gJZqD.js";import"./editor-jsonify-CA5Rop9u.js";import"./blur-input-CRr_z9aa.js";import"./tex-error-view-DoxT3Mpc.js";import"./free-response-editor-Dd4hUHpG.js";import"./input-number-editor-CH8I8yXx.js";import"./Popper-CRVeJNUD.js";import"./label-image-editor-D8PaOC0o.js";import"./matcher-editor-CBedxN1a.js";import"./number-line-editor-vDANF-Zn.js";import"./phet-simulation-editor-oj4A8qBC.js";import"./plotter-editor-D3mmDFOG.js";import"./python-program-editor-vsiwzNKI.js";import"./sorter-editor-BzpelsAY.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
