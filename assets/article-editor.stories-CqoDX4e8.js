import{r as o,j as e,A as d}from"./iframe-BTBckUoD.js";import"./changeable-DSDYKS7d.js";import"./article-renderer-Dpuge1GM.js";import"./server-item-renderer-Cz7-yTIH.js";import"./hints-renderer-Cpo2FC22.js";import{A as u}from"./article-editor-IhARZwob.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DQwAWU5u.js";import"./components-DkAg5gEr.js";import"./icon-paths-nHU7Sxie.js";import"./editor-jsonify-DSmfnO5x.js";import"./blur-input-BAc9xy_x.js";import"./tex-error-view-CtwPiDj3.js";import"./free-response-editor-Df35LZaE.js";import"./input-number-editor-D8v1aCHR.js";import"./Popper-D-SyXLHh.js";import"./label-image-editor-DaYMnYvj.js";import"./matcher-editor-DMBiBf_z.js";import"./number-line-editor-DSd3zhYc.js";import"./phet-simulation-editor-Bkivdjnn.js";import"./plotter-editor-CRJf5v0C.js";import"./python-program-editor-C0x1W8iz.js";import"./sorter-editor-Dm8-lQVQ.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
