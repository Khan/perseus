import{r as o,j as t,A as d}from"./iframe-DFbBIt0y.js";import"./item-version-DpOJMRSg.js";import"./article-renderer-Czhy2ZZS.js";import"./server-item-renderer-CqRBl6lr.js";import"./hints-renderer-BRb-J5Ky.js";import{A as u}from"./article-editor-ChvoN4u8.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-016jX_f0.js";import"./components-DyjAWM_u.js";import"./device-framer-C1xSnl_r.js";import"./editor-DJNT8Q_D.js";import"./tex-error-view-MLLNAwnL.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-Db3xrP9i.js";import"./editor-jsonify-d0gwr3x7.js";import"./blur-input-De4SVCnO.js";import"./definition-editor-BhZZXw0q.js";import"./dropdown-editor-02Djx0Wg.js";import"./explanation-editor-CiXWRiD0.js";import"./expression-editor-vjcXnaR1.js";import"./free-response-editor-BPEqi-Jt.js";import"./interaction-editor-D3DNA_ye.js";import"./image-editor-BmKyhjNA.js";import"./input-number-editor-FFgRvyl-.js";import"./Popper-BwdMEHnU.js";import"./numeric-input-editor-C-sQHfY6.js";import"./label-image-editor-D3CZ1gYT.js";import"./matcher-editor-Dk-Ji1dN.js";import"./number-line-editor-B_4DbnsP.js";import"./phet-simulation-editor-CsVjuQia.js";import"./plotter-editor-BYOp4gsq.js";import"./python-program-editor-BE8x3FXO.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-tFn16LUu.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const V=["Base"];export{e as Base,V as __namedExportsOrder,Q as default};
