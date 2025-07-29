import{r as o,j as t,A as d}from"./iframe-BDxKU4CJ.js";import"./item-version-r9T2CwCj.js";import"./article-renderer-DhPqGkN_.js";import"./server-item-renderer-cSbYfIXY.js";import"./hints-renderer-g8uXB3Ge.js";import{A as u}from"./article-editor-Dfdbgcqk.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DrKQBIiE.js";import"./components-3wg4Cc1O.js";import"./device-framer-DiDp8KmC.js";import"./editor-HrfTWkUB.js";import"./tex-error-view-DqECc49X.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-B-387Yh-.js";import"./editor-jsonify-B8jiuHJk.js";import"./blur-input-Di4n51bc.js";import"./definition-editor-CbXy4eZM.js";import"./dropdown-editor-WqlYBLC5.js";import"./explanation-editor-Bk2oScb5.js";import"./expression-editor-Ox-Hft_Q.js";import"./free-response-editor-NzgVqGvl.js";import"./interaction-editor-YJztUS7H.js";import"./image-editor-CVs7hoFW.js";import"./input-number-editor-B-HmbYEt.js";import"./Popper-B4jhFkGh.js";import"./numeric-input-editor-DiOb0OeV.js";import"./label-image-editor-DqB01_v6.js";import"./matcher-editor-CKATO8Wr.js";import"./number-line-editor-CXJBgg2H.js";import"./phet-simulation-editor-BsMXg8Cz.js";import"./plotter-editor-C3mSRKZQ.js";import"./python-program-editor-DFAE662Z.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-CS3rqsmu.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
