import{r as o,j as t,A as d}from"./iframe-DPME5Wfc.js";import"./item-version-Re2Bf6tc.js";import"./article-renderer-CLC0QY8e.js";import"./server-item-renderer-DYWMp5OE.js";import"./hints-renderer-CVWgBD1c.js";import{A as u}from"./article-editor-D_dIqEur.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DCczFlit.js";import"./components-5GyRNmEy.js";import"./device-framer-DbNaofD1.js";import"./editor-DZZDfSOt.js";import"./tex-error-view-D0-VWC5x.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-WGRxveuO.js";import"./editor-jsonify-kno1xt_7.js";import"./blur-input-D_zGUa6C.js";import"./definition-editor-DMVNHhVK.js";import"./dropdown-editor-UjNSwqT5.js";import"./explanation-editor-DgJj2Vwz.js";import"./expression-editor-B6BlOuk4.js";import"./free-response-editor---eyQqoY.js";import"./interaction-editor-Bs-ruuPW.js";import"./image-editor-BbRwJAJ-.js";import"./input-number-editor-CBelaCj3.js";import"./Popper-B3YXkp0W.js";import"./numeric-input-editor-BqQPpMKk.js";import"./label-image-editor-cG4F-F8R.js";import"./matcher-editor-cHvRGRgU.js";import"./number-line-editor-CaoQT-dW.js";import"./phet-simulation-editor-JkSYn6uC.js";import"./plotter-editor-DJP2X5Fp.js";import"./python-program-editor-CAqxatNu.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-C9-SgvsR.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
