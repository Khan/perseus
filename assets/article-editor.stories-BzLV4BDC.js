import{r as o,j as e,A as d}from"./iframe-3hb076BO.js";import"./item-version-Bdpm_HQi.js";import"./article-renderer-DKu7MGU_.js";import"./server-item-renderer-BIEks0VV.js";import"./hints-renderer-CoakVpcE.js";import{A as u}from"./article-editor-UWE_PXqU.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D_jjt1rR.js";import"./components-DBinYojL.js";import"./icon-paths-BsAPaswM.js";import"./editor-jsonify-7QY0pyve.js";import"./blur-input-DhXYlAxY.js";import"./tex-error-view-Du-uB-Bk.js";import"./free-response-editor-B79FNboU.js";import"./input-number-editor-D1SP5ihL.js";import"./Popper-BmY6TTDj.js";import"./label-image-editor-CStMYJUC.js";import"./matcher-editor-BUE23TiH.js";import"./number-line-editor-CF3MWCoA.js";import"./phet-simulation-editor-1tAbGGWB.js";import"./plotter-editor-DrHwtcKt.js";import"./python-program-editor-DqYeUjft.js";import"./sorter-editor-BAYsNly5.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
