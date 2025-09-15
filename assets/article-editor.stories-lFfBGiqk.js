import{r as o,j as e,A as d}from"./iframe-DmIxUJgN.js";import"./changeable-CB5_noCv.js";import"./article-renderer-B2JZyrlB.js";import"./server-item-renderer-DsZho_2j.js";import"./hints-renderer-C3mln8wE.js";import{A as u}from"./article-editor-Dl7WJsZk.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-JdQAVI3b.js";import"./components-CzW8WRg9.js";import"./icon-paths-BewN0enG.js";import"./editor-jsonify-B_e0vgHi.js";import"./blur-input-Doq-6fD1.js";import"./tex-error-view-CrxiomtQ.js";import"./free-response-editor-gqHkCBO6.js";import"./input-number-editor-8BMkHaRd.js";import"./Popper-CrA_sk69.js";import"./label-image-editor-DfF6RiG9.js";import"./matcher-editor-B9raiGXV.js";import"./number-line-editor-DMBqsx_s.js";import"./phet-simulation-editor-kXNd5k0H.js";import"./plotter-editor-TpqJzB4l.js";import"./python-program-editor-DVfpO--U.js";import"./sorter-editor-BsUA1ung.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
