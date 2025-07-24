import{r as o,j as t,A as d}from"./iframe-xqgRcQf_.js";import"./item-version-CrkFurkW.js";import"./article-renderer-Div8t3tJ.js";import"./server-item-renderer-CB58Q2z9.js";import"./hints-renderer-B51OzCed.js";import{A as u}from"./article-editor-BBTkkhrF.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-smoiE-Lo.js";import"./components-BxL5YMMF.js";import"./device-framer-tT-8i0vv.js";import"./editor-FZNudshh.js";import"./tex-error-view-CE9OLSJp.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-BNxktKqh.js";import"./editor-jsonify-B0uKPUzN.js";import"./blur-input-Y1ya2ieR.js";import"./definition-editor-DjPjjrLB.js";import"./dropdown-editor-CxiLsNsK.js";import"./explanation-editor-eVmWGoNf.js";import"./expression-editor-BvlCQDrT.js";import"./free-response-editor-CRj0wgYP.js";import"./interaction-editor-DDKr_Abg.js";import"./image-editor-BBfV78kM.js";import"./input-number-editor-6UU9n2sb.js";import"./Popper-TbAU-DzE.js";import"./numeric-input-editor-DAvuzuJs.js";import"./label-image-editor-CojwZyuC.js";import"./matcher-editor-C4vOLjj2.js";import"./number-line-editor-BcOXWJXf.js";import"./phet-simulation-editor-giDI7aov.js";import"./plotter-editor-CIPU-pf8.js";import"./python-program-editor-DMXQu1yl.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-o9tCwoT-.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
