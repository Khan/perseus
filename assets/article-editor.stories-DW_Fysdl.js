import{r as o,j as e,A as d}from"./iframe-DC0ACJJa.js";import"./item-version-BvOlSWEl.js";import"./article-renderer-BoZfYhe-.js";import"./server-item-renderer-DZIAKksD.js";import"./hints-renderer-BTCG3uDe.js";import{A as u}from"./article-editor-0CzeZWHa.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D-x2irJF.js";import"./components-VnBN92nb.js";import"./icon-paths-Dp8D0WvL.js";import"./image-editor-BZOi5SZP.js";import"./editor-jsonify-Cr4KNOwF.js";import"./blur-input-C-q-KNye.js";import"./tex-error-view-VFwcM3Zy.js";import"./free-response-editor-Boq6n_At.js";import"./input-number-editor-B74rkGrj.js";import"./Popper-dB0rP6K1.js";import"./label-image-editor-ChpLkDoM.js";import"./matcher-editor-DZ0kaRUW.js";import"./number-line-editor-BtBsuEAL.js";import"./phet-simulation-editor-D4lZI0zk.js";import"./plotter-editor-Cy-VxSGn.js";import"./python-program-editor-Bu5jsWR2.js";import"./sorter-editor-C1ABcwTs.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
