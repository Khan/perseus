import{r as o,j as e,A as d}from"./iframe-PTfoOlLs.js";import"./item-version-CdzAaUYX.js";import"./article-renderer-ESjVA1Ne.js";import"./server-item-renderer-dZxXIULY.js";import"./hints-renderer-Bp8123xH.js";import{A as u}from"./article-editor-C9Dr2uxj.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-YMhd0US3.js";import"./components-Dvb_OkNI.js";import"./icon-paths-DO3d0BKo.js";import"./image-editor-DEFccKah.js";import"./editor-jsonify-BdRFl78w.js";import"./blur-input-vpjKDWPI.js";import"./tex-error-view-BsiYT55U.js";import"./free-response-editor-BSces_4D.js";import"./input-number-editor-jk2FvyEN.js";import"./Popper-aJVJ3TdR.js";import"./label-image-editor-DvqimSiH.js";import"./matcher-editor-2RQ1Wdse.js";import"./number-line-editor-D1CQCkMa.js";import"./phet-simulation-editor-BDoP8fPM.js";import"./plotter-editor-ZFTOR1hA.js";import"./python-program-editor-BHdkLaqZ.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BKFLSIqZ.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const q=["Base"];export{t as Base,q as __namedExportsOrder,W as default};
