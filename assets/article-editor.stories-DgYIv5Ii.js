import{r as o,j as e,A as d}from"./iframe-CWJkr1U4.js";import"./item-version-D8G3i7Zs.js";import"./article-renderer-CdA9oXxs.js";import"./server-item-renderer-CcMdrtbV.js";import"./hints-renderer-DwV_d7ve.js";import{A as u}from"./article-editor-C0jnrX1N.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-4qjBxark.js";import"./components-0zCOIzsj.js";import"./icon-paths-CQbG7TCf.js";import"./editor-jsonify-IJtzgw23.js";import"./blur-input-D38-D_IX.js";import"./tex-error-view-DvLQ35Bz.js";import"./free-response-editor-DwbtUo_V.js";import"./input-number-editor-BBRCzMCc.js";import"./Popper-CH9FXscx.js";import"./label-image-editor-Drb4tVNa.js";import"./matcher-editor-DZCGJEL2.js";import"./number-line-editor-C4eHd2m7.js";import"./phet-simulation-editor-BMBgpgX0.js";import"./plotter-editor-BG1WDbgD.js";import"./python-program-editor-DUnBuQp3.js";import"./sorter-editor-YZecxHNp.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
