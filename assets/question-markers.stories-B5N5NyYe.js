import{j as r}from"./jsx-runtime-BGVbfQ2Z.js";import{l as p}from"./index-awljIyHI.js";import{r as w}from"./index-qhcEwEpg.js";import{Q as b}from"./question-markers-t84P_Jay.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./article-renderer-7iOuYZyi.js";import"./compare-VLxlEkSV.js";import"./version-akiLXZts.js";import"./index-default-4_ZsnO94.js";import"./prop-types-ax1AYuB3.js";import"./index-mdqImiHB.js";import"./index-V35CFGao.js";import"./index-sjmtTzi4.js";import"./index-E09jvG0x.js";import"./index-WaOzG1Ar.js";import"./index-eZ2N530f.js";import"./tabbar-mLybaP46.js";import"./item-q5VEoFtv.js";import"./index-FNX3GwpG.js";import"./index-tvtfaFq4.js";import"./button-assets-K2ZoY3Yc.js";import"./keypad-button-rYY5VIp2.js";import"./operators-page-pgHIcrjU.js";import"./navigation-pad-nnktsHUY.js";import"./index-uu39Elyn.js";import"./key-translator--aXlYrr4.js";import"./_commonjs-dynamic-modules-h-SxKiO4.js";import"./enums-x5qaTru7.js";import"./renderer-Y-r37Tvv.js";import"./index-awCzqCwC.js";import"./jquery-5v7aFUvu.js";import"./asset-context-pmjKTqqL.js";import"./svg-image-O4Zh6lWM.js";import"./index-iPN1eFIx.js";import"./dependencies-fnqF3NiV.js";import"./perseus-error-OpXxk17X.js";import"./util-G-g1AweO.js";import"./fixed-to-responsive-X0KGwmEJ.js";import"./constants-5iWyYZaE.js";import"./inline-icon-MJBS_-2U.js";import"./icon-paths-fAaGW1jp.js";import"./image-loader-BrzYBUzY.js";import"./tex-SwZEYYPF.js";import"./zoomable-QW77xrsT.js";import"./zoomable-tex-LJgLrbXQ.js";import"./perseus-api-Ly41NhN4.js";import"./stub-tag-editor-CaJYfBue.js";import"./text-list-editor-bJphcq85.js";import"./lint-yitF-R_f.js";import"./index-BH4Zx_EU.js";import"./index-ObSi-eBV.js";import"./Popper-FSPFYGkT.js";import"./index-SM3muJE2.js";import"./index-ouXaYoW-.js";import"./index-K7FSCCGN.js";import"./math-input-HGKhnj9M.js";import"./unit-tpB2tohZ.js";import"./input-with-examples-Q1IyqHpU.js";import"./math-output-o5-UebzW.js";import"./text-input-dyr-RWux.js";import"./index-s56UOS9p.js";import"./tooltip-K2JbXmT6.js";import"./simple-keypad-input-WECRmbnm.js";import"./base-radio-ceh1uvp2.js";import"./media-queries-4x-ifIrJ.js";import"./shared-cRfnFlyj.js";import"./choice-wvBsaMTt.js";import"./index-GVhAzXpB.js";import"./icon-HbAIhp4d.js";import"./choice-icon-UvDvB5O3.js";import"./focus-ring-XJLNkFEA.js";import"./option-status-TK8KGDE4.js";import"./choice-none-above-neIJSFiL.js";import"./video-transcript-link-7IHhb-72.js";import"./answer-choices-nCF4MMce.js";import"./button-group-eBTrRsKy.js";import"./graph-HZ4jbR1b.js";import"./bundle.esm-3RuEOGQS.js";import"./hud-J4t6ihs4.js";import"./info-tip-8U9pfYW-.js";import"./multi-button-group-rHU9dGVb.js";import"./number-input-fy1LqA4g.js";import"./prop-check-box-PZNxg3Pm.js";import"./range-input-qgKts6Pq.js";import"./marker-N3KCo3Mu.js";import"./answer-pill-nPJ9bwuS.js";import"./sortable-JGhtlYWP.js";import"./multi-renderer-tEXe9shJ.js";import"./hints-renderer-nOIGY2RX.js";import"./marker-u3DpQuKE.js";import"./components-p6juvHvY.js";import"./form-wrapped-text-field-M-GVycU7.js";const pt={title:"Perseus/Editor/Widgets/Label Image/Question Markers"},k=p.StyleSheet.create({wrapper:{width:338}}),W=t=>r("div",{className:p.css(k.wrapper),children:r(b,{...t})});class S extends w.Component{constructor(){super(...arguments),this.state={markers:[{answers:[],label:"",x:50,y:50}]}}render(){const{markers:m}=this.state;return r("div",{className:p.css(k.wrapper),children:r(b,{choices:["Lamborghini","BMW","Volkswagen","Fiat","Porsche","Ferrari"],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:m,onChange:f=>this.setState({markers:f})})})}}const o=t=>r(W,{...{choices:[],imageUrl:"",imageWidth:0,imageHeight:0,markers:[],onChange:()=>{}}}),e=t=>r(W,{...{choices:[],imageUrl:"https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",imageWidth:1280,imageHeight:1024,markers:[{answers:[],label:"",x:50,y:50}],onChange:()=>{}}}),i=t=>r(S,{});var s,a,n;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(u=(d=i.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const st=["Empty","Filled","Interactive"];export{o as Empty,e as Filled,i as Interactive,st as __namedExportsOrder,pt as default};
