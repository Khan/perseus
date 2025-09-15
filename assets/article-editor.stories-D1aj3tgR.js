import{r as o,j as e,A as d}from"./iframe-CuR3KNJy.js";import"./changeable-DppTJ5Sz.js";import"./article-renderer-C538LY9g.js";import"./server-item-renderer-CYGlTWET.js";import"./hints-renderer-BFgXZv_8.js";import{A as u}from"./article-editor-h3jpJnnB.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DOj5_j8C.js";import"./components-BQkhYxBC.js";import"./icon-paths-xgSKFl2u.js";import"./editor-jsonify-Bk_nc3aX.js";import"./blur-input-BiLnDF-a.js";import"./tex-error-view-DqmwLGpn.js";import"./free-response-editor-NoE8PKKT.js";import"./input-number-editor-DLnk0ioH.js";import"./Popper-Cz2vcuP0.js";import"./label-image-editor-BsXEBVbc.js";import"./matcher-editor-B8ZFKAfo.js";import"./number-line-editor-BWsYG4HB.js";import"./phet-simulation-editor-D-NbB2Ls.js";import"./plotter-editor-DgRaxLDm.js";import"./python-program-editor-D06pnDQm.js";import"./sorter-editor-C7R9qT1M.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
