import{j as i,g as T,A as y}from"./iframe-4salNE05.js";import"./changeable-C4tOo2lz.js";import"./article-renderer-CpwiPyMK.js";import"./server-item-renderer-Dy4WjDAc.js";import"./hints-renderer-CCNA6GhL.js";import{g as D}from"./feature-flags-util-Vxq3J9D8.js";import{e as a}from"./utils-CfhUZX9z.js";import{r as j}from"./radio-question-builder-Dx1IeYvx.js";import{E as R}from"./editor-page-with-storybook-preview-BbEFH2D3.js";import{I as A,r as F}from"./register-all-widgets-and-editors-for-testing-BFXtB4pE.js";import{g as O,a as M}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-C_aacY4z.js";import"./editor-page-DgXf0dWJ.js";import"./components-BmA7lRq8.js";import"./viewport-resizer-CldhUAbt.js";import"./tex-error-view-CyFv28D4.js";import"./item-extras-editor-CYj9UQoa.js";import"./preview-panel-BuKo4jKq.js";import"./editor-jsonify-C3fiY463.js";import"./blur-input-DxS_gtcQ.js";import"./free-response-editor-BlWN590T.js";import"./input-number-editor-CPpOrUp7.js";import"./Popper-CEr9frsU.js";import"./label-image-editor-Dmlw6dYO.js";import"./form-wrapped-text-field-rlh4Pfbn.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BaZZZigc.js";import"./behavior-NJs_z-QD.js";import"./question-markers-Dij-Sexq.js";import"./marker-OrxLv--I.js";import"./select-image-Be6NP9o3.js";import"./matcher-editor-CMVtcbJ5.js";import"./number-line-editor-DRXs2MZA.js";import"./phet-simulation-editor-L9KNSALq.js";import"./plotter-editor-BaD3XOgF.js";import"./python-program-editor-YIuhg-y6.js";import"./sorter-editor-uFj-CSkh.js";const v=330,x=(S,{args:_})=>i.jsx("div",{style:{width:v},children:i.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:"[[☃ image 1]]",widgets:{"image 1":O({options:M({..._})})}})})});F();const Pe={title:"Widgets/Image/Editor Demo",component:A,argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[x],args:{backgroundImage:{}}},r={name:"Populated (Within Editor Page)",decorators:[x],args:{backgroundImage:a,alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}},t={render:function(){return i.jsx("div",{style:{width:v},children:i.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:`Widget
[[☃ image 1]]

Markdown
![Earth and moon](${a.url})

Radio
[[☃ radio 1]]`,widgets:{"image 1":O({options:M({backgroundImage:a,alt:"Earth and moon"})}),"radio 1":j().addChoice(`![Earth and moon](${a.url})`).build().widgets["radio 1"]}})})})}};var n,s,d;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(d=(s=o.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var m,g,p,c,u;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Empty (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {}
  }
}`,...(p=(g=e.parameters)==null?void 0:g.docs)==null?void 0:p.source},description:{story:"This Image widget editor does not have any options set.",...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.description}}};var l,h,w,E,I;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Populated (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: earthMoonImage,
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(w=(h=r.parameters)==null?void 0:h.docs)==null?void 0:w.source},description:{story:"This Image widget editor has all options set.",...(I=(E=r.parameters)==null?void 0:E.docs)==null?void 0:I.description}}};var f,P,W,b,k;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      width: PROD_EDITOR_WIDTH
    }}>
                <EditorPageWithStorybookPreview apiOptions={{
        ...ApiOptions.defaults,
        flags: getFeatureFlags({
          "image-widget-upgrade": true
        })
      }} question={generateTestPerseusRenderer({
        // Render Widget, Markdown, Radio
        content: \`Widget\\n[[☃ image 1]]\\n\\nMarkdown\\n![Earth and moon](\${earthMoonImage.url})\\n\\nRadio\\n[[☃ radio 1]]\`,
        widgets: {
          "image 1": generateImageWidget({
            options: generateImageOptions({
              backgroundImage: earthMoonImage,
              alt: "Earth and moon"
            })
          }),
          "radio 1": radioQuestionBuilder().addChoice(\`![Earth and moon](\${earthMoonImage.url})\`).build().widgets["radio 1"]
        }
      })} />
            </div>;
  }
}`,...(W=(P=t.parameters)==null?void 0:P.docs)==null?void 0:W.source},description:{story:`Only the markdown image in the main content should be flagged with a linter
warning. The Image widget and Radio widget containing a markdown image
should not be flagged.`,...(k=(b=t.parameters)==null?void 0:b.docs)==null?void 0:k.description}}};const We=["Default","Empty","Populated","WithMarkdownImageLinterWarning"];export{o as Default,e as Empty,r as Populated,t as WithMarkdownImageLinterWarning,We as __namedExportsOrder,Pe as default};
