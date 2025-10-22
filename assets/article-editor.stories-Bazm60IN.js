import{r,j as t,V as l,A as o,t as d}from"./iframe-P8a0QwVR.js";import"./changeable-2_-2l023.js";import"./article-renderer-c16ya0Fw.js";import"./server-item-renderer-BL8pKdky.js";import"./hints-renderer-CZfjqQ6B.js";import{A as u}from"./article-editor-BKgZnKZi.js";import{C as f}from"./content-preview-CE-VvkH-.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-Bg9gPSdS.js";import{P as v}from"./preview-panel-CAcaWMBV.js";import"./components-OQVGND3S.js";import"./editor-jsonify-DU8NPScO.js";import"./blur-input-PUox0wYq.js";import"./tex-error-view-BDPTkVrT.js";import"./free-response-editor-CpBM1B7A.js";import"./input-number-editor-DUOjklLd.js";import"./Popper-BR2hYYZN.js";import"./label-image-editor-C9iApMI6.js";import"./form-wrapped-text-field-CGTNxnfT.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-HN1-PvtF.js";import"./behavior-C4A5eemQ.js";import"./question-markers-CAKNKMOf.js";import"./marker-1cmjj7Uh.js";import"./select-image-ePcGyKe-.js";import"./matcher-editor-B35YOvDj.js";import"./number-line-editor-oGcon_v7.js";import"./phet-simulation-editor-DDNJRmeG.js";import"./plotter-editor-B-Rg7cLV.js";import"./python-program-editor-BDNyEZiB.js";import"./sorter-editor-BnuaPU49.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
