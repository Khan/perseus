import{r as o,j as e,A as d}from"./iframe-BwpIMEHU.js";import"./item-version-CHyDTu75.js";import"./article-renderer-BhD35V-t.js";import"./server-item-renderer-ChSVvydf.js";import"./hints-renderer-fofKlBJi.js";import{A as u}from"./article-editor-CpNTLfkQ.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BeG94vPg.js";import"./components-BY_vVbSe.js";import"./icon-paths-CYCmhJ5d.js";import"./image-editor-CJj5NK38.js";import"./editor-jsonify-BWCfRIyt.js";import"./blur-input-DIWDg8kw.js";import"./tex-error-view-DQQiYASp.js";import"./free-response-editor-CrmFFYcI.js";import"./input-number-editor-CtKsQUn3.js";import"./Popper-t9NiSK0W.js";import"./label-image-editor-Dk5QMoT3.js";import"./matcher-editor-DiORBu5t.js";import"./number-line-editor-DNBKI2Ai.js";import"./phet-simulation-editor-DpEP5iZi.js";import"./plotter-editor-DtcZjVui.js";import"./python-program-editor-BW1Ws2Wp.js";import"./sorter-editor-zajr8hSX.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
