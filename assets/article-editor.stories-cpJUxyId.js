import{r as o,j as e,A as d}from"./iframe-B-YbJrpL.js";import"./item-version-DWuaT6Dp.js";import"./article-renderer-C9d66jzF.js";import"./server-item-renderer-DpP8Wvrh.js";import"./hints-renderer-tP8TvJtv.js";import{A as u}from"./article-editor-BH9ANzOE.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BHccCyt0.js";import"./components-B2xlT8XQ.js";import"./icon-paths-CqVqAUCv.js";import"./editor-jsonify-BrST9XXc.js";import"./blur-input-viKADifv.js";import"./tex-error-view-Pe8Bm6Od.js";import"./free-response-editor-CNe9SLVw.js";import"./input-number-editor-BWHp8_SV.js";import"./Popper-D0xjopZW.js";import"./label-image-editor-BhYqhzz7.js";import"./matcher-editor-CNNI6zSx.js";import"./number-line-editor-CBPql9EF.js";import"./phet-simulation-editor-DF3DDcEU.js";import"./plotter-editor-zTtTAKDZ.js";import"./python-program-editor-BQwsm-0Z.js";import"./sorter-editor-BtehrS5u.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
