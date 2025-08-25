import{j as e,r as i,V as S,n as R,L as E,s as O,A as _,g as k}from"./iframe-B2hu0tZ_.js";import"./item-version-D3c6rWbT.js";import"./article-renderer-8QWoh6h6.js";import"./server-item-renderer-Ci7Rcf2U.js";import"./hints-renderer-b7aJGfad.js";import{E as P}from"./editor-page-with-storybook-preview-DunG-ges.js";import{I as w,r as W}from"./register-all-widgets-and-editors-for-testing-DrlR7nzK.js";import{g as x,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-DQmGUWNG.js";import"./components-CTheKtDN.js";import"./icon-paths-D9So1rHt.js";import"./editor-page-CZJEOdgd.js";import"./tex-error-view-DUKrTGX-.js";import"./item-extras-editor-DhxRByop.js";import"./editor-jsonify-C1AEi0FO.js";import"./blur-input-xRh_o3bS.js";import"./free-response-editor-D73aJ9Gk.js";import"./input-number-editor-CQvqWoZ7.js";import"./Popper-Dnnmjsr_.js";import"./label-image-editor-Q14mqdFB.js";import"./matcher-editor-CjH-n29Q.js";import"./number-line-editor-BQkL0Kws.js";import"./phet-simulation-editor-D8czq2x-.js";import"./plotter-editor-DTF0s76u.js";import"./python-program-editor-DgeRp-N_.js";import"./sorter-editor-C9VHjoCv.js";const{action:j}=__STORYBOOK_MODULE_ACTIONS__,I=330;W();const ie={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},T=j("onChange"),a={args:{}},r={render:function(){const n=i.useRef(null),[b,y]=i.useState({backgroundImage:{url:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png"}});return e.jsxs(S,{style:v.wrapper,children:[e.jsxs(E,{style:{fontStyle:"italic",marginBottom:O.small_12},children:[e.jsx("b",{children:"Note"})," that this editor has a known-issue where it does not calculate the image dimensions initially if they aren't provided. It does update the dimensions when you blur the 'Image url:' field."]}),e.jsx(w,{...b,apiOptions:_.defaults,onChange:o=>{var s;T(o),y({...(s=n.current)==null?void 0:s.serialize(),...o})},ref:n})]})}},t=()=>e.jsx("div",{style:{width:I},children:e.jsx(P,{question:k({content:"[[☃ image 1]]",widgets:{"image 1":x({options:D({backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"}})})}})})}),v=R.StyleSheet.create({wrapper:{width:I,margin:20}});t.__docgenInfo={description:"",methods:[],displayName:"WithinEditorPage"};var d,m,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {}
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,g,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: function Render() {
    const widgetRef = React.useRef<ImageEditor>(null);
    const [state, setState] = React.useState<Partial<PropsFor<typeof ImageEditor>>>({
      backgroundImage: {
        url: "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png"
      }
    });
    return <View style={styles.wrapper}>
                <LabelSmall style={{
        fontStyle: "italic",
        marginBottom: spacing.small_12
      }}>
                    <b>Note</b> that this editor has a known-issue where it does
                    not calculate the image dimensions initially if they
                    aren&apos;t provided. It does update the dimensions when you
                    blur the &apos;Image url:&apos; field.
                </LabelSmall>
                <ImageEditor {...state} apiOptions={ApiOptions.defaults} onChange={props => {
        onChangeAction(props);
        setState({
          ...widgetRef.current?.serialize(),
          ...props
        });
      }} ref={widgetRef} />
            </View>;
  }
}`,...(l=(g=r.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var u,h,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`(): React.ReactElement => <div style={{
  width: PROD_EDITOR_WIDTH
}}>
        <EditorPageWithStorybookPreview question={generateTestPerseusRenderer({
    content: "[[☃ image 1]]",
    widgets: {
      "image 1": generateImageWidget({
        options: generateImageOptions({
          backgroundImage: {
            url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"
          }
        })
      })
    }
  })} />
    </div>`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const de=["Default","WithState","WithinEditorPage"];export{a as Default,r as WithState,t as WithinEditorPage,de as __namedExportsOrder,ie as default};
