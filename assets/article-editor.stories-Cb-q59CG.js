import{r as o,j as e,A as d}from"./iframe-B2hu0tZ_.js";import"./item-version-D3c6rWbT.js";import"./article-renderer-8QWoh6h6.js";import"./server-item-renderer-Ci7Rcf2U.js";import"./hints-renderer-b7aJGfad.js";import{A as u}from"./article-editor-rvpdQtnQ.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DrlR7nzK.js";import"./components-CTheKtDN.js";import"./icon-paths-D9So1rHt.js";import"./editor-jsonify-C1AEi0FO.js";import"./blur-input-xRh_o3bS.js";import"./tex-error-view-DUKrTGX-.js";import"./free-response-editor-D73aJ9Gk.js";import"./input-number-editor-CQvqWoZ7.js";import"./Popper-Dnnmjsr_.js";import"./label-image-editor-Q14mqdFB.js";import"./matcher-editor-CjH-n29Q.js";import"./number-line-editor-BQkL0Kws.js";import"./phet-simulation-editor-D8czq2x-.js";import"./plotter-editor-DTF0s76u.js";import"./python-program-editor-DgeRp-N_.js";import"./sorter-editor-C9VHjoCv.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
