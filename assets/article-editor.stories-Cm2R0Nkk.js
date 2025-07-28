import{r as o,j as t,A as d}from"./iframe-Dj55CS30.js";import"./item-version-D67BNdCM.js";import"./article-renderer-BW55wHa-.js";import"./server-item-renderer-CKbs9Utm.js";import"./hints-renderer-PYjpjTlK.js";import{A as u}from"./article-editor-BIE677HM.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DqO0eTh5.js";import"./components-1sa-rXiw.js";import"./device-framer-Bmv1R65U.js";import"./editor-o9KRuQFh.js";import"./tex-error-view-DlRgggSi.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-BwNc-KoZ.js";import"./editor-jsonify-Dmmg0hbz.js";import"./blur-input-cMQS2byo.js";import"./definition-editor-Hg_j7zsg.js";import"./dropdown-editor-DImMISEb.js";import"./explanation-editor-CKcUCGtE.js";import"./expression-editor-CpSwgLH6.js";import"./free-response-editor-CEYqSOdI.js";import"./interaction-editor-BgXe3hJs.js";import"./image-editor-CmkmV7ZN.js";import"./input-number-editor-CQMPAHdl.js";import"./Popper-CXF1ckt5.js";import"./numeric-input-editor-CCaDhL-3.js";import"./label-image-editor-bN8n5Ai7.js";import"./matcher-editor-t_bo_TK-.js";import"./number-line-editor-Bb5cdNpr.js";import"./phet-simulation-editor-Cc8_JBTw.js";import"./plotter-editor-B-bJLCIg.js";import"./python-program-editor-DJOf9sdP.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-DgycQz3S.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
