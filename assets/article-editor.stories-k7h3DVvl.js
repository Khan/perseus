import{r as o,j as e,A as d}from"./iframe-BcUK2hYc.js";import"./item-version-DDS7dZSD.js";import"./article-renderer-jlYA3cTY.js";import"./server-item-renderer-_SCIumcW.js";import"./hints-renderer-EacNxn1w.js";import{A as u}from"./article-editor-CVkMIxHr.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DhIOgay4.js";import"./components-Cv7mMrXd.js";import"./icon-paths-TWGXQwCz.js";import"./image-editor-CO3RpZOc.js";import"./editor-jsonify-CFFswu14.js";import"./blur-input-Dor38g0g.js";import"./tex-error-view-BS_rdTYj.js";import"./free-response-editor-MzCl4IB-.js";import"./input-number-editor-B-JxfaMb.js";import"./Popper-D4lDcsfB.js";import"./label-image-editor-BwDntSvu.js";import"./matcher-editor-C17g6f0-.js";import"./number-line-editor-CPy-eLTv.js";import"./phet-simulation-editor-wUmrISQF.js";import"./plotter-editor-RC45O6sd.js";import"./python-program-editor-DkT8Zlac.js";import"./sorter-editor-9hy_VZGw.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
