import{r as o,j as e,A as d}from"./iframe-DEsRcbaN.js";import"./item-version-oo7QNaUX.js";import"./article-renderer-pfikFLIx.js";import"./server-item-renderer-BeQNbDtb.js";import"./hints-renderer-DqE_eCvF.js";import{A as u}from"./article-editor-FY4dDIAD.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-zHGNa4Eg.js";import"./components-CDlHODTc.js";import"./icon-paths-BQfJPJcl.js";import"./editor-jsonify-KJPreVaX.js";import"./blur-input-lDJhmjfG.js";import"./tex-error-view-BgRzAEyN.js";import"./free-response-editor-Doz5PgCJ.js";import"./input-number-editor-BcW3FcA5.js";import"./Popper-BW_Im_ZP.js";import"./label-image-editor-4yB1f6lB.js";import"./matcher-editor-B9LjcSNB.js";import"./number-line-editor-Bug1StFN.js";import"./phet-simulation-editor-DEL_rjcQ.js";import"./plotter-editor-eb5tLEd8.js";import"./python-program-editor-Bzz7I-YJ.js";import"./sorter-editor-D1Qzqr1R.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
