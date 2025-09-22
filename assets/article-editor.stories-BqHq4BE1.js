import{r as o,j as e,A as d}from"./iframe-Bs0680DQ.js";import"./changeable-8-ECgKAd.js";import"./article-renderer-B2RUnVv_.js";import"./server-item-renderer-Cl2DFJ5h.js";import"./hints-renderer-74VnI3Mi.js";import{A as u}from"./article-editor-B-9fJ9vD.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BIDxG2YE.js";import"./components-CsAmRibY.js";import"./icon-paths-CE6HmnNM.js";import"./editor-jsonify-B8RpmSYm.js";import"./blur-input-zunoP0_d.js";import"./tex-error-view-xADJuHSa.js";import"./free-response-editor-2txeYnMj.js";import"./input-number-editor-CxOrU4SW.js";import"./Popper-CkbgcNVe.js";import"./label-image-editor-DN5PHFuM.js";import"./matcher-editor-CmfHIqTL.js";import"./number-line-editor-CdE_Y9vr.js";import"./phet-simulation-editor-BH-SbZB1.js";import"./plotter-editor-CabBjapK.js";import"./python-program-editor-CPaJrpqt.js";import"./sorter-editor-D5D0BLRN.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
