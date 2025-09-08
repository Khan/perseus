import{r as o,j as e,A as d}from"./iframe-CCSQELdq.js";import"./item-version-yhIV_aFF.js";import"./article-renderer-8-sdCFmH.js";import"./server-item-renderer-CdP5DtPN.js";import"./hints-renderer-yLYlsK1Z.js";import{A as u}from"./article-editor-CX1KHs5J.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BYzMDPcY.js";import"./components-BcK5iVfR.js";import"./icon-paths-CaNega6S.js";import"./editor-jsonify-D0F8WVBz.js";import"./blur-input-DEYa_-kC.js";import"./tex-error-view-BN0MeDo0.js";import"./free-response-editor-Btu8is1w.js";import"./input-number-editor-CD4MZ-oh.js";import"./Popper-Cj038LVJ.js";import"./label-image-editor-DnICutIr.js";import"./matcher-editor-BPkwGN0Y.js";import"./number-line-editor-BjyyGUS5.js";import"./phet-simulation-editor-DQMGZQF1.js";import"./plotter-editor-CW7olGbw.js";import"./python-program-editor-hP-w1LVr.js";import"./sorter-editor-akkW1HVP.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
