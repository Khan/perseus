import{r,j as t,V as l,A as o,t as d}from"./iframe-DY2ryAtZ.js";import"./changeable-BnPcVnxi.js";import"./article-renderer-MjjZaD46.js";import"./server-item-renderer-RW67PJWA.js";import"./hints-renderer-tAg2QKhI.js";import{A as u}from"./article-editor-CNNIohaA.js";import{C as f}from"./content-preview-DBTv3Gmu.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-BlAaAGiv.js";import{P as v}from"./preview-panel-BD5uvvUI.js";import"./components-Cyz89qTa.js";import"./editor-jsonify-Bz8dW1My.js";import"./blur-input-pphnnzhb.js";import"./tex-error-view-B2N9kz5X.js";import"./free-response-editor-DMyQuJ6o.js";import"./input-number-editor-BBRn-vf8.js";import"./Popper-DXccmAIL.js";import"./label-image-editor-DzGO1zvj.js";import"./form-wrapped-text-field-BQRYEu1K.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-0fwJ1k9o.js";import"./behavior-ByVdUDI9.js";import"./question-markers-DyZoCZ1l.js";import"./marker-BeoE-3kZ.js";import"./select-image-BhmW-DaY.js";import"./matcher-editor-DReAakoi.js";import"./number-line-editor-D6KApo6i.js";import"./phet-simulation-editor-CyXnGNRc.js";import"./plotter-editor-Bjdn26Vh.js";import"./python-program-editor-CxGtSibh.js";import"./sorter-editor-Dz2PubXX.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
