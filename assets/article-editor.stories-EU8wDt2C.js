import{r as o,j as e,A as d}from"./iframe-D2B-WNnt.js";import"./changeable-DpCEeNNp.js";import"./article-renderer-CSvygoT0.js";import"./server-item-renderer-hg0Rxt4F.js";import"./hints-renderer-DypTrDzm.js";import{A as u}from"./article-editor-BkpV3gDS.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CxFiihsB.js";import"./components-CweT6quV.js";import"./icon-paths-VAMmt5bn.js";import"./editor-jsonify-DlS2FFph.js";import"./blur-input-BqgNtyin.js";import"./tex-error-view-BzG7ypY-.js";import"./free-response-editor-HrvP9wGT.js";import"./input-number-editor-Lz64HDFH.js";import"./Popper-DcRilstM.js";import"./label-image-editor-CZy3RY6q.js";import"./matcher-editor-6wT3OdaC.js";import"./number-line-editor-tOqMAiCr.js";import"./phet-simulation-editor-B9sz9FMW.js";import"./plotter-editor-Bx69mrmJ.js";import"./python-program-editor-B7-U6ZrN.js";import"./sorter-editor-CKxRwvf5.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
