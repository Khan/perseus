import{r,j as t,V as l,A as o,t as d}from"./iframe-CvGQi9qb.js";import"./changeable-B_DQ3EPK.js";import"./article-renderer-DZLC-LFO.js";import"./server-item-renderer-C6vuhUwR.js";import"./hints-renderer-C1LnFr0S.js";import{A as u}from"./article-editor-6SQFDqz0.js";import{C as f}from"./content-preview-DCU-cJ76.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-Ck9VN6fm.js";import{P as v}from"./preview-panel-B7Dr-blm.js";import"./components-Bj1gWnMG.js";import"./editor-jsonify-BhkfWAvM.js";import"./blur-input-BqgwGOMV.js";import"./tex-error-view-LoFUx7hp.js";import"./free-response-editor-D4HLO1rk.js";import"./input-number-editor-OIFGzcte.js";import"./Popper-DZEietj4.js";import"./label-image-editor-TLNikHmY.js";import"./form-wrapped-text-field-DDPA_S32.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-C3AFPXFR.js";import"./behavior-DrMRdfHi.js";import"./question-markers-M0khflTp.js";import"./marker-CJ39afxP.js";import"./select-image-Dq9gJufW.js";import"./matcher-editor-CkaxJe9k.js";import"./number-line-editor-FpaYQplr.js";import"./phet-simulation-editor-D_A_VcQ1.js";import"./plotter-editor-7vkuztpT.js";import"./python-program-editor-CjqfnLTi.js";import"./sorter-editor--rw7wUwS.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
