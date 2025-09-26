import{r as o,j as e,A as d}from"./iframe-qGQC3xuz.js";import"./changeable-BMMydLvM.js";import"./article-renderer-5PaB1tNQ.js";import"./server-item-renderer-CDmqexzN.js";import"./hints-renderer-ObU-I4_V.js";import{A as u}from"./article-editor-CViOc9fc.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B8MjJMr4.js";import"./components-BSPmM4Yc.js";import"./icon-paths-BjW2Ex1R.js";import"./editor-jsonify-Bw1tKiSA.js";import"./blur-input-u9JUpphA.js";import"./tex-error-view-DI6aFLg8.js";import"./free-response-editor-BxaFdeiB.js";import"./input-number-editor-Cy2Ml5ps.js";import"./Popper-DxAq55fs.js";import"./label-image-editor-Dc9VH-Xq.js";import"./matcher-editor-D_aJaUhk.js";import"./number-line-editor-CNyArEZZ.js";import"./phet-simulation-editor-C-VGjcG4.js";import"./plotter-editor-D4Afr0OC.js";import"./python-program-editor-DWjEfezT.js";import"./sorter-editor-BV26w8Df.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
