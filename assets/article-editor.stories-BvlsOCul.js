import{r as o,j as e,A as d}from"./iframe-NVJvwbvw.js";import"./item-version-DHCsOv-B.js";import"./article-renderer-DmYL4VFP.js";import"./server-item-renderer-DoeTImg2.js";import"./hints-renderer-B9C9wf2Y.js";import{A as u}from"./article-editor-NrbsGZ6f.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-C_FUZPHg.js";import"./components-DN4iXMBj.js";import"./icon-paths-C0XmobQM.js";import"./image-editor-rS8nvBYB.js";import"./editor-jsonify-C8M7X46l.js";import"./blur-input-D4tp4vlQ.js";import"./tex-error-view-DmrseUtF.js";import"./free-response-editor-YBUumjDq.js";import"./input-number-editor-CIuXu7_m.js";import"./Popper-Dp201jSZ.js";import"./label-image-editor-BZnKAo5h.js";import"./matcher-editor-tbuYoToV.js";import"./number-line-editor-CFqvXLTi.js";import"./phet-simulation-editor-BQBS3ngk.js";import"./plotter-editor-BB5VL0Jr.js";import"./python-program-editor-8BrfoJ2n.js";import"./sorter-editor-Bmh9fGJq.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const W=["Base"];export{t as Base,W as __namedExportsOrder,T as default};
