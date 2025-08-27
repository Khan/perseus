import{r as o,j as e,A as d}from"./iframe-gu7QJpVr.js";import"./item-version-ChL0vYrm.js";import"./article-renderer-CvA7JRmk.js";import"./server-item-renderer-vwLRbWIF.js";import"./hints-renderer-CTKjKrIl.js";import{A as u}from"./article-editor-BiiUJ0Ox.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CMjVf4Aa.js";import"./components-BVAb0C6v.js";import"./icon-paths-B84Loksh.js";import"./editor-jsonify-BnAj1IWF.js";import"./blur-input-geVJ2f_o.js";import"./tex-error-view-CwiHi_ZX.js";import"./free-response-editor-Rw2k8QHQ.js";import"./input-number-editor-CAGqMT-S.js";import"./Popper-Csl3jZNQ.js";import"./label-image-editor-BOYoFIKA.js";import"./matcher-editor-_JOsbhZO.js";import"./number-line-editor-CQDcG1Do.js";import"./phet-simulation-editor-DCirQEH3.js";import"./plotter-editor-bes8P2iS.js";import"./python-program-editor-CGyYDJEm.js";import"./sorter-editor-DQcZt6k7.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
