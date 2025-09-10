import{r as o,j as e,A as d}from"./iframe-cDHDOnQ7.js";import"./changeable-DIGIHkf0.js";import"./article-renderer-DFdJkqIc.js";import"./server-item-renderer-CGjrLG_Z.js";import"./hints-renderer-BunYbRKl.js";import{A as u}from"./article-editor-Eyaihfx5.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B-XYIbSk.js";import"./components-EanL_1Vm.js";import"./icon-paths-CMo6vUFz.js";import"./editor-jsonify-CRkCTmWW.js";import"./blur-input-CoOkcrOS.js";import"./tex-error-view-Y55W0eaS.js";import"./free-response-editor-C7nYXi7-.js";import"./input-number-editor-GbAPQwtH.js";import"./Popper-CqtdNG-b.js";import"./label-image-editor-CLNFyZxc.js";import"./matcher-editor-Du43d4Vw.js";import"./number-line-editor-C7nVZylR.js";import"./phet-simulation-editor-DxZYsRPe.js";import"./plotter-editor-B-Hk5bOx.js";import"./python-program-editor-CLhL4o68.js";import"./sorter-editor-BXBGp9O5.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
