import{r as o,j as e,A as d}from"./iframe-6XrUlqeQ.js";import"./item-version-CbuYwno6.js";import"./article-renderer-Cmgg8ycl.js";import"./server-item-renderer-DInPrT9z.js";import"./hints-renderer-DAbHopwt.js";import{A as u}from"./article-editor-DNF--q2w.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CPSKyzHg.js";import"./components-ByFKNKK9.js";import"./icon-paths-D5hWskTp.js";import"./editor-jsonify-D9Ic8d08.js";import"./blur-input-qQZbWfOy.js";import"./tex-error-view-QD4pafET.js";import"./free-response-editor-Cnd4qllz.js";import"./input-number-editor-BWfLt2A7.js";import"./Popper-UI7PxSXR.js";import"./label-image-editor-0QDvReg2.js";import"./matcher-editor-Dz6OaIM5.js";import"./number-line-editor-DwxlC54z.js";import"./phet-simulation-editor-DK0KftBs.js";import"./plotter-editor-C0ybJnBA.js";import"./python-program-editor-C-IcLfN2.js";import"./sorter-editor-D90ZEpnY.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
