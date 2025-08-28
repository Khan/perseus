import{r as o,j as e,A as d}from"./iframe-C-IGMVYf.js";import"./item-version-DSQwKEG9.js";import"./article-renderer-SrkGKa-j.js";import"./server-item-renderer-hAlr0pYo.js";import"./hints-renderer-CG8tYlpF.js";import{A as u}from"./article-editor-BSzr9hPN.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-62e_KTGa.js";import"./components-CujFx4BJ.js";import"./icon-paths-C0BeeNZa.js";import"./editor-jsonify-CzAiaVhY.js";import"./blur-input-DeLcU0nh.js";import"./tex-error-view-CYyNueBl.js";import"./free-response-editor-BXBY85yO.js";import"./input-number-editor-Bw-Suxkg.js";import"./Popper-BG5_QyHy.js";import"./label-image-editor-D_ZTkS_M.js";import"./matcher-editor-n5q-JMhW.js";import"./number-line-editor-eLvpPMCB.js";import"./phet-simulation-editor-COeFHZsM.js";import"./plotter-editor-U2N2bc7F.js";import"./python-program-editor-DhEvNzga.js";import"./sorter-editor-D5d_qu_L.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
