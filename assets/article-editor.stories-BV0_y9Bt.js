import{r as o,j as e,A as d}from"./iframe-CP-zQJ4F.js";import"./changeable-CjqAqEVY.js";import"./article-renderer-D4qfPA-R.js";import"./server-item-renderer-DsZI4mLS.js";import"./hints-renderer-fXYeMMVS.js";import{A as u}from"./article-editor-CtApz_UQ.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Dd2vjF87.js";import"./components-k4nJQ0qy.js";import"./icon-paths-CVznYdNt.js";import"./editor-jsonify-BXNpLk4Q.js";import"./blur-input-bgaSN98S.js";import"./tex-error-view-mXx-Lxrg.js";import"./free-response-editor-D-57GQxa.js";import"./input-number-editor-i2FTfofw.js";import"./Popper-bA2i84KG.js";import"./label-image-editor-H2KVFOYO.js";import"./matcher-editor-Dk-kYUJu.js";import"./number-line-editor-D05YSWRq.js";import"./phet-simulation-editor-s3_NphIQ.js";import"./plotter-editor-DUW69QCD.js";import"./python-program-editor-j58H3se8.js";import"./sorter-editor-BwaFDsW4.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
