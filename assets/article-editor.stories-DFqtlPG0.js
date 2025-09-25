import{r as o,j as e,A as d}from"./iframe-CMcX3zU0.js";import"./changeable-Bm3djhYn.js";import"./article-renderer-C1sohMEB.js";import"./server-item-renderer-BgRLXmho.js";import"./hints-renderer-DzrKS6Dh.js";import{A as u}from"./article-editor-D23Ag4WC.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DgfMDbfi.js";import"./components-CF3dcVpn.js";import"./icon-paths-B3lUh7nI.js";import"./editor-jsonify-D-2u2_VZ.js";import"./blur-input-C-mWOH5h.js";import"./tex-error-view-SQu2msIG.js";import"./free-response-editor-eIfcvurR.js";import"./input-number-editor-k6aA8rNC.js";import"./Popper-DXhUiUZt.js";import"./label-image-editor-D80a3XIp.js";import"./matcher-editor-D9Bw5lbG.js";import"./number-line-editor-C9FkKufP.js";import"./phet-simulation-editor-DF31Js4N.js";import"./plotter-editor-BDUq8M_0.js";import"./python-program-editor-fyS1EmBA.js";import"./sorter-editor-DTA2D3xY.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
