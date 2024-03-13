import{j as r}from"./jsx-runtime-BGVbfQ2Z.js";import{l as p}from"./index-awljIyHI.js";import{r as w}from"./index-qhcEwEpg.js";import{Q as b}from"./question-markers-KqoZuUxj.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-vMRtAXx5.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-Gn33kjDK.js";import"./index-hYQ6Pa3_.js";import"./index-V35CFGao.js";import"./index-J2t_5nK1.js";import"./index-E09jvG0x.js";import"./index-S-YHCjun.js";import"./index-eZ2N530f.js";import"./tabbar-IAxGP4dM.js";import"./item-fHYIN_c3.js";import"./index-4JcgVDnF.js";import"./index-tvtfaFq4.js";import"./index-ACL0N2lY.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-qf5RMNu9.js";import"./operators-page-xJJKH4dX.js";import"./navigation-pad-cRy775HL.js";import"./index-uu39Elyn.js";import"./key-translator-M5qX6vAz.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-kLXXIAmW.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-A3RqGh-W.js";import"./index-e6QWP3dX.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-1QHV8SS2.js";import"./fixed-to-responsive-X0KGwmEJ.js";import"./constants-5iWyYZaE.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-yitF-R_f.js";import"./index-rfwWDdTV.js";import"./index-k69q8Cna.js";import"./index-A0DvNMpb.js";import"./index-K7FSCCGN.js";import"./index-G0tWdZ0L.js";import"./index-SM3muJE2.js";import"./Popper-2p8US95Y.js";import"./math-input-IJNf1C8H.js";import"./unit-tpB2tohZ.js";import"./input-with-examples-vp0qMeuZ.js";import"./math-output-o5-UebzW.js";import"./text-input-37dJrLjB.js";import"./index-nBjQKcUJ.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-9ElZ8vOy.js";import"./base-radio-YjOuhPVd.js";import"./media-queries-4x-ifIrJ.js";import"./shared-cRfnFlyj.js";import"./choice-PWPuseLZ.js";import"./icon-HbAIhp4d.js";import"./choice-icon-bFtFAuec.js";import"./focus-ring-XJLNkFEA.js";import"./option-status--OOacwxI.js";import"./choice-none-above-8OXjFciS.js";import"./video-transcript-link-ZVuMBlt5.js";import"./answer-choices-w9z4CUYw.js";import"./button-group-eBTrRsKy.js";import"./graph-rCRaakrI.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-J4t6ihs4.js";import"./info-tip-Lk8Jr-mP.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-z5dO9Uz4.js";import"./prop-check-box-Msevz2ZD.js";import"./range-input-J32YkzGG.js";import"./marker-f6UsUoR-.js";import"./answer-pill-g3pXvFXe.js";import"./sortable-oBAYwvTX.js";import"./multi-renderer-EYoqxMys.js";import"./hints-renderer-gHUQzNmX.js";import"./marker-1MOwCtQp.js";import"./components-NtPXL24S.js";import"./form-wrapped-text-field-bltEp6vL.js";const st={title:"Perseus/Editor/Widgets/Label Image/Question Markers"},k=p.StyleSheet.create({wrapper:{width:338}}),W=t=>r("div",{className:p.css(k.wrapper),children:r(b,{...t})});class S extends w.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(k.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:f=>this.setState({markers:f})})})}}const o=t=>r(W,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(W,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(S,{});var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    choices: [],
    imageUrl: "",
    imageWidth: 0,
    imageHeight: 0,
    markers: [],
    onChange: () => {}
  } as const);
  return <Wrapper {...props} />;
}`,...(n=(a=o.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var c,g,h;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const props = ({
    choices: [],
    imageUrl: "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
    imageWidth: 1280,
    imageHeight: 1024,
    markers: [{
      answers: [],
      label: "",
      x: 50,
      y: 50
    }],
    onChange: () => {}
  } as const);
  return <Wrapper {...props} />;
}`,...(h=(g=e.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var l,d,u;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <WithState />;
}`,...(u=(d=i.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const at=["Empty","Filled","Interactive"];export{o as Empty,e as Filled,i as Interactive,at as __namedExportsOrder,st as default};
