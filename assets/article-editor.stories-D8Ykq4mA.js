import{r as o,j as e,A as d}from"./iframe-_ho5rIkE.js";import"./changeable-iRg-pmTW.js";import"./article-renderer-Cnk2QXUs.js";import"./server-item-renderer-D8GnBry4.js";import"./hints-renderer-Ed-7ec7R.js";import{A as u}from"./article-editor-73gbcgjV.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-aJskSbGL.js";import"./components-B4IUH5Uo.js";import"./icon-paths-0mZLeTul.js";import"./editor-jsonify-BJOz5Kar.js";import"./blur-input-BQ9cCQmG.js";import"./tex-error-view-DJD7p411.js";import"./free-response-editor-_inE2Juh.js";import"./input-number-editor-C3UhCIZu.js";import"./Popper-5y0cmH8o.js";import"./label-image-editor-BPY06MHV.js";import"./matcher-editor-MkOiKa3S.js";import"./number-line-editor-B2aXRvQS.js";import"./phet-simulation-editor-ft4U2MCM.js";import"./plotter-editor-CjPb-mQN.js";import"./python-program-editor-pGLjXJeX.js";import"./sorter-editor-DgT5MjbU.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
