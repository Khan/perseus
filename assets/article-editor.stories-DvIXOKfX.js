import{r as o,j as e,A as d}from"./iframe-BI7ThRyc.js";import"./item-version-BVKo3DJh.js";import"./article-renderer-uNMUXAfC.js";import"./server-item-renderer-oHtYPjUS.js";import"./hints-renderer-BAzs3gFG.js";import{A as u}from"./article-editor-DIu-Ub_D.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CVaXPAvP.js";import"./components-CZZmius2.js";import"./icon-paths-BbI1o3NJ.js";import"./editor-jsonify-BG6UiNIG.js";import"./blur-input-Dw-drpzQ.js";import"./tex-error-view-BuZOFIYq.js";import"./free-response-editor-CW0GJMZU.js";import"./input-number-editor-acuHe7P3.js";import"./Popper-CBGIKV1E.js";import"./label-image-editor-C_qJSuY2.js";import"./matcher-editor-bsvaoWTV.js";import"./number-line-editor-D_zB_RZ4.js";import"./phet-simulation-editor-Bb_apFnr.js";import"./plotter-editor-N6jzVZbd.js";import"./python-program-editor-B_rVz_kK.js";import"./sorter-editor-CE1fwa1P.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
