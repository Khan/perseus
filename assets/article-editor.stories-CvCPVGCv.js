import{r as i,j as e,A as d,t as u}from"./iframe-BRRXc9Qf.js";import"./changeable-Y1AgwDPJ.js";import"./article-renderer-Do1TdVLh.js";import"./server-item-renderer-sVF9rCGW.js";import"./hints-renderer-CBS4qmP1.js";import{A as f}from"./article-editor-SnoFrNgL.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-C1zjv4Pp.js";import"./components-STZo5d38.js";import"./icon-paths-BEyp8wAc.js";import"./editor-jsonify-lgBPHaY7.js";import"./blur-input-9pCVACAN.js";import"./tex-error-view-DW_h2_l1.js";import"./free-response-editor-DO1Oixda.js";import"./input-number-editor-BM4bXEyW.js";import"./Popper-C374ZHB_.js";import"./label-image-editor-ByyAVAnD.js";import"./matcher-editor-DCmPXbUY.js";import"./number-line-editor-BKmIFK9V.js";import"./phet-simulation-editor-DKg7iHcQ.js";import"./plotter-editor-BcNZ-l1N.js";import"./python-program-editor-o7Q-alnA.js";import"./sorter-editor-YCqG2kAd.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={ApiOptions.defaults} imageUploader={() => {}} json={state} onChange={handleChange} previewURL="/perseus/frame" ref={articleEditorRef as any} />
        </>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const N=["Base"];export{t as Base,N as __namedExportsOrder,I as default};
