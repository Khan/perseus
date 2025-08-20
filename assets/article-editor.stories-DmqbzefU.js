import{r as o,j as e,A as d}from"./iframe-DMYzKZaM.js";import"./item-version-D5OK3muV.js";import"./article-renderer-BumrXCpq.js";import"./server-item-renderer-16SzcDUP.js";import"./hints-renderer-DiIhNC9S.js";import{A as u}from"./article-editor-BuTwZJT1.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D-gmVJ5c.js";import"./components-BWESQxhk.js";import"./icon-paths-BUez6vzv.js";import"./image-editor-BIuGcGfS.js";import"./editor-jsonify-zOQT-8vr.js";import"./blur-input-By0ekldv.js";import"./tex-error-view-DJQG4Zdi.js";import"./free-response-editor-5NT9_jIO.js";import"./input-number-editor-CyLlG5Ev.js";import"./Popper-CIZhP22T.js";import"./label-image-editor-9UqycxJn.js";import"./matcher-editor-Bs3tvVap.js";import"./number-line-editor-Bad5Bn33.js";import"./phet-simulation-editor--YWmih5u.js";import"./plotter-editor-Cx9fjp23.js";import"./python-program-editor-B5ARev8c.js";import"./sorter-editor-B7nEoalm.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
