import{j as e,r as i,V as S,n as R,L as E,s as O,A as _,g as k}from"./iframe-BA954KEO.js";import"./item-version-MqFis2bJ.js";import"./article-renderer-DST9ZdYu.js";import"./server-item-renderer-Q5okag7a.js";import"./hints-renderer-0xl2XLV0.js";import{E as P}from"./editor-page-with-storybook-preview-CFK4BkIa.js";import{I as w,r as W}from"./register-all-widgets-and-editors-for-testing-iiXRYmw2.js";import{g as x,a as D}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-guVbQQgW.js";import"./components-Bxw5Bkju.js";import"./icon-paths-Bv2E_CVR.js";import"./editor-page-CGAexRMZ.js";import"./tex-error-view-De9FYSNw.js";import"./item-extras-editor-DlxlhUVD.js";import"./editor-jsonify-DFjeklcf.js";import"./blur-input-BXvlJIki.js";import"./free-response-editor--cKqCa3N.js";import"./input-number-editor-zEnRimT-.js";import"./Popper-DNRse8BZ.js";import"./label-image-editor-wGw66lB1.js";import"./matcher-editor-BdZiv_hd.js";import"./number-line-editor-Bean9T87.js";import"./phet-simulation-editor-DpCMMvVF.js";import"./plotter-editor-CWttMj5v.js";import"./python-program-editor-CwV7vFk6.js";import"./sorter-editor-DQjIH21N.js";const{action:j}=__STORYBOOK_MODULE_ACTIONS__,I=330;W();const ie={title:"Widgets/Image/Editor Demo",component:w,tags:["!dev"],argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},T=j("onChange"),a={args:{}},r={render:function(){const n=i.useRef(null),[b,y]=i.useState({backgroundImage:{url:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png"}});return e.jsxs(S,{style:v.wrapper,children:[e.jsxs(E,{style:{fontStyle:"italic",marginBottom:O.small_12},children:[e.jsx("b",{children:"Note"})," that this editor has a known-issue where it does not calculate the image dimensions initially if they aren't provided. It does update the dimensions when you blur the 'Image url:' field."]}),e.jsx(w,{...b,apiOptions:_.defaults,onChange:o=>{var s;T(o),y({...(s=n.current)==null?void 0:s.serialize(),...o})},ref:n})]})}},t=()=>e.jsx("div",{style:{width:I},children:e.jsx(P,{question:k({content:"[[☃ image 1]]",widgets:{"image 1":x({options:D({backgroundImage:{url:"https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg"}})})}})})}),v=R.StyleSheet.create({wrapper:{width:I,margin:20}});t.__docgenInfo={description:"",methods:[],displayName:"WithinEditorPage"};var d,m,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
