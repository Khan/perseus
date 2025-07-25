import{r as o,j as t,A as d}from"./iframe-wjYrW4ez.js";import"./item-version-CRWZBURm.js";import"./article-renderer-Cdi5PjQJ.js";import"./server-item-renderer-BgAmqVz9.js";import"./hints-renderer-C1eJwggo.js";import{A as u}from"./article-editor-BsOQH4YY.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-C6Fdrvhm.js";import"./components-wgz9aVGz.js";import"./device-framer-CjA4PdY4.js";import"./editor-sVYsoIfM.js";import"./tex-error-view-Dp59Ie5r.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-CkA3Wpfg.js";import"./editor-jsonify-7_TGx9bn.js";import"./blur-input-BfkU7FaT.js";import"./definition-editor-B5FoL26y.js";import"./dropdown-editor-DDT28X-O.js";import"./explanation-editor-z-6hJNQ8.js";import"./expression-editor-NcM-fbjj.js";import"./free-response-editor-DjWmffn6.js";import"./interaction-editor-DKt3dgDx.js";import"./image-editor-3bT19j8L.js";import"./input-number-editor-DJ0KF7BQ.js";import"./Popper-DJ9tQh-2.js";import"./numeric-input-editor-6r88P9wC.js";import"./label-image-editor-B6WsgzOA.js";import"./matcher-editor-1-e73xCA.js";import"./number-line-editor-C-El_TMs.js";import"./phet-simulation-editor-CfpJ1puX.js";import"./plotter-editor-DNgV9a3f.js";import"./python-program-editor-CWUj63ZQ.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-Bwo685bP.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
