import{r,j as t,V as l,A as o,t as d}from"./iframe-pO6GGAuj.js";import"./changeable-BgQi80HA.js";import"./article-renderer-DZq4xfLR.js";import"./server-item-renderer-LNXGqjDS.js";import"./hints-renderer-BJT36Vgf.js";import{A as u}from"./article-editor-BWsVyOxz.js";import{C as f}from"./content-preview-CFQlcFfV.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-CGQv5Ips.js";import{P as v}from"./preview-panel-D_cIWTaF.js";import"./components-CLhFe2Jf.js";import"./editor-jsonify-KQ7ZXPwe.js";import"./blur-input-DDW436w6.js";import"./tex-error-view-QZtg2UEJ.js";import"./free-response-editor-BE_72zCA.js";import"./input-number-editor-Z6HrxqZn.js";import"./Popper-DBCtMdFS.js";import"./label-image-editor-BygJLwSd.js";import"./form-wrapped-text-field-q3sXR6Ek.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-qgWJkkTC.js";import"./behavior-BiY7BECl.js";import"./question-markers-sElca_Nq.js";import"./marker-Dy-Psvgy.js";import"./select-image-CXmlpjd7.js";import"./matcher-editor-D30DW9Pm.js";import"./number-line-editor-C8F8ngRG.js";import"./phet-simulation-editor-DYjYSQHR.js";import"./plotter-editor-CO-S-2XR.js";import"./python-program-editor-KbfI0LcM.js";import"./sorter-editor-BPragO3E.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
  const [article, setArticle] = useState(undefined);
  const articleEditorRef = useRef();
  return <View>
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={{
      ...ApiOptions.defaults,
      isArticle: true
    }} imageUploader={() => {}} json={article} onChange={value => {
      setArticle(value.json[0]);
    }} previewURL="about:blank" ref={articleEditorRef as any} />
            <PreviewPanel openButtonText="Open preview (storybook only)">
                <ContentPreview question={article} apiOptions={{
        ...ApiOptions.defaults,
        isArticle: true,
        showAlignmentOptions: true
      }} linterContext={{
        contentType: "article",
        highlightLint: true,
        paths: [],
        stack: []
      }} previewDevice={"desktop"} />
            </PreviewPanel>
        </View>;
}`,...(p=(s=e.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const M=["Demo"];export{e as Demo,M as __namedExportsOrder,K as default};
